use async_trait::async_trait;
use chrono::Utc;
use mithril_common::entities::Epoch;
use mithril_common::entities::PartyId;
use mithril_common::store::StakeStorer;
use slog_scope::{debug, info, warn};
use std::path::Path;
use std::path::PathBuf;
use std::sync::Arc;

use mithril_common::crypto_helper::ProtocolStakeDistribution;
use mithril_common::entities::{
    Beacon, Certificate, CertificatePending, ProtocolMessage, ProtocolMessagePartKey, Snapshot,
};
use mithril_common::CardanoNetwork;

use crate::runtime::WorkingCertificate;
use crate::snapshot_uploaders::SnapshotLocation;
use crate::snapshotter::OngoingSnapshot;
use crate::store::SingleSignatureStorer;
use crate::CertificateCreator;
use crate::MithrilCertificateCreator;
use crate::{DependencyManager, ProtocolError, SnapshotError};

#[cfg(test)]
use mockall::automock;

use super::RuntimeError;

/// Configuration structure dedicated to the AggregatorRuntime.
#[derive(Debug, Clone)]
pub struct AggregatorConfig {
    /// Interval between each snapshot, in ms
    pub interval: u64,

    /// Cardano network
    pub network: CardanoNetwork,

    /// DB directory to snapshot
    pub db_directory: PathBuf,
}

impl AggregatorConfig {
    /// Create a new instance of AggregatorConfig.
    pub fn new(interval: u64, network: CardanoNetwork, db_directory: &Path) -> Self {
        Self {
            interval,
            network,
            db_directory: db_directory.to_path_buf(),
        }
    }
}

/// This trait is intended to allow mocking the AggregatorRunner in tests.
/// It exposes all the methods needed by the state machine.
#[async_trait]
pub trait AggregatorRunnerTrait: Sync + Send {
    /// Return the current beacon from the chain
    async fn get_beacon_from_chain(&self) -> Result<Beacon, RuntimeError>;

    /// Check if a certificate already have been issued for a given beacon.
    async fn does_certificate_exist_for_beacon(
        &self,
        beacon: &Beacon,
    ) -> Result<bool, RuntimeError>;

    /// Check if a certificate chain is valid.
    async fn is_certificate_chain_valid(&self) -> Result<bool, RuntimeError>;

    /// Compute the digest of the last immutable file of the node.
    async fn compute_digest(&self, new_beacon: &Beacon) -> Result<String, RuntimeError>;

    /// Update the multisigner with the given beacon.
    async fn update_beacon(&self, new_beacon: &Beacon) -> Result<(), RuntimeError>;

    /// Read the stake distribution from the blockchain and store it.
    async fn update_stake_distribution(&self, new_beacon: &Beacon) -> Result<(), RuntimeError>;

    /// Open the signer registration round for an epoch.
    async fn open_signer_registration_round(&self, new_beacon: &Beacon)
        -> Result<(), RuntimeError>;

    /// Update the multisigner with the protocol parameters from configuration.
    async fn update_protocol_parameters_in_multisigner(
        &self,
        new_beacon: &Beacon,
    ) -> Result<(), RuntimeError>;

    /// Set the message to sign in the multisigner. The digest is only one part
    /// of the message, the next signing stake distribution must also be signed
    /// as part of the message.
    async fn update_message_in_multisigner(&self, digest: String) -> Result<(), RuntimeError>;

    /// Return the actual pending certificate from the multisigner.
    async fn create_new_pending_certificate_from_multisigner(
        &self,
        beacon: Beacon,
    ) -> Result<CertificatePending, RuntimeError>;

    /// Return the actual working certificate from the multisigner.
    async fn create_new_working_certificate(
        &self,
        certificate_pending: &CertificatePending,
    ) -> Result<WorkingCertificate, RuntimeError>;

    /// Store the given pending certificate.
    async fn save_pending_certificate(
        &self,
        pending_certificate: CertificatePending,
    ) -> Result<(), RuntimeError>;

    /// Drop the multisigner's actual pending certificate.
    async fn drop_pending_certificate(&self) -> Result<Option<CertificatePending>, RuntimeError>;

    /// Check if the multisigner has issued a multi-signature.
    async fn is_multisig_created(&self) -> Result<bool, RuntimeError>;

    /// Create an archive of the cardano node db directory naming it after the given beacon.
    ///
    /// Returns the path of the created archive and the archive size as byte.
    async fn create_snapshot_archive(
        &self,
        beacon: &Beacon,
    ) -> Result<OngoingSnapshot, RuntimeError>;

    /// Upload the snapshot at the given location using the configured uploader(s).
    ///
    /// **Important**: the snapshot is removed after the upload succeeded.
    async fn upload_snapshot_archive(
        &self,
        ongoing_snapshot: &OngoingSnapshot,
    ) -> Result<Vec<SnapshotLocation>, RuntimeError>;

    /// Create a signed certificate.
    async fn create_and_save_certificate(
        &self,
        working_certificate: &WorkingCertificate,
    ) -> Result<Certificate, RuntimeError>;

    /// Create a snapshot and save it to the given locations.
    async fn create_and_save_snapshot(
        &self,
        certificate: Certificate,
        ongoing_snapshot: &OngoingSnapshot,
        remote_locations: Vec<String>,
    ) -> Result<Snapshot, RuntimeError>;
}

/// The runner responsibility is to expose a code API for the state machine. It
/// holds services and configuration.
pub struct AggregatorRunner {
    config: AggregatorConfig,
    dependencies: Arc<DependencyManager>,
}

impl AggregatorRunner {
    /// Create a new instance of the Aggrergator Runner.
    pub fn new(config: AggregatorConfig, dependencies: Arc<DependencyManager>) -> Self {
        Self {
            config,
            dependencies,
        }
    }

    fn get_previous_hash_from_last_two_certificates<'a>(
        beacon: &Beacon,
        last_certificate: Option<&'a Certificate>,
        penultimate_certificate: Option<&'a Certificate>,
    ) -> Result<&'a str, RuntimeError> {
        match (penultimate_certificate, last_certificate) {
            (Some(penultimate_certificate), Some(last_certificate)) => {
                // Check if last certificate is exactly at most one epoch before current epoch
                if beacon.epoch - last_certificate.beacon.epoch > Epoch(1) {
                    return Err(RuntimeError::CertificateChainEpochGap(
                        beacon.epoch,
                        last_certificate.beacon.epoch,
                    ));
                }
                // Check if last certificate is first certificate of its epoch
                if penultimate_certificate.beacon.epoch != last_certificate.beacon.epoch {
                    Ok(&last_certificate.hash)
                } else {
                    Ok(&last_certificate.previous_hash)
                }
            }
            (None, Some(last_certificate)) => Ok(&last_certificate.hash),
            _ => Ok(""),
        }
    }
}

#[cfg_attr(test, automock)]
#[async_trait]
impl AggregatorRunnerTrait for AggregatorRunner {
    /// Return the current beacon from the chain
    async fn get_beacon_from_chain(&self) -> Result<Beacon, RuntimeError> {
        debug!("RUNNER: get beacon from chain");
        Ok(self
            .dependencies
            .beacon_provider
            .get_current_beacon()
            .await?)
    }

    async fn does_certificate_exist_for_beacon(
        &self,
        beacon: &Beacon,
    ) -> Result<bool, RuntimeError> {
        debug!("RUNNER: does_certificate_exist_for_beacon");
        let certificate_exist = self
            .dependencies
            .certificate_store
            .get_from_beacon(beacon)
            .await?
            .is_some();
        Ok(certificate_exist)
    }

    async fn is_certificate_chain_valid(&self) -> Result<bool, RuntimeError> {
        debug!("RUNNER: is_certificate_chain_valid");
        let certificate_store = self.dependencies.certificate_store.clone();
        let latest_certificates = certificate_store.get_list(1).await?;
        let latest_certificate = latest_certificates.first();
        if latest_certificate.is_none() {
            return Ok(false);
        }

        match self
            .dependencies
            .certificate_verifier
            .verify_certificate_chain(
                latest_certificate.unwrap().to_owned(),
                certificate_store.clone(),
                &self.dependencies.genesis_verifier,
            )
            .await
        {
            Ok(()) => Ok(true),
            Err(error) => {
                warn!(" > invalid certificate chain"; "error" => ?error);
                Ok(false)
            }
        }
    }

    async fn compute_digest(&self, new_beacon: &Beacon) -> Result<String, RuntimeError> {
        debug!("RUNNER: compute_digest");
        let digester = self.dependencies.digester.clone();

        debug!(" > computing digest"; "cardano_db_directory" => self.config.db_directory.display());

        debug!(" > launching digester thread");
        let digest = digester
            .compute_digest(new_beacon)
            .await
            .map_err(|e| RuntimeError::General(e.into()))?;
        debug!(" > computed digest: {}", digest);

        Ok(digest)
    }

    async fn update_beacon(&self, new_beacon: &Beacon) -> Result<(), RuntimeError> {
        debug!("RUNNER: update beacon"; "beacon" => #?new_beacon);
        self.dependencies
            .multi_signer
            .write()
            .await
            .update_current_beacon(new_beacon.to_owned())
            .await?;
        Ok(())
    }

    async fn update_stake_distribution(&self, new_beacon: &Beacon) -> Result<(), RuntimeError> {
        debug!("RUNNER: update stake distribution"; "beacon" => #?new_beacon);
        let stake_distribution = self
            .dependencies
            .chain_observer
            .get_current_stake_distribution()
            .await?
            .ok_or_else(|| RuntimeError::General("no epoch was returned".to_string().into()))?;
        let stake_distribution = stake_distribution
            .iter()
            .map(|(party_id, stake)| (party_id.to_owned(), *stake))
            .collect::<ProtocolStakeDistribution>();

        Ok(self
            .dependencies
            .multi_signer
            .write()
            .await
            .update_stake_distribution(&stake_distribution)
            .await?)
    }

    async fn open_signer_registration_round(
        &self,
        new_beacon: &Beacon,
    ) -> Result<(), RuntimeError> {
        debug!("RUNNER: open signer registration round"; "beacon" => #?new_beacon);
        let registration_epoch = new_beacon.epoch.offset_to_recording_epoch();

        let stakes = self
            .dependencies
            .stake_store
            .get_stakes(registration_epoch)
            .await?
            .unwrap_or_default();

        self.dependencies
            .signer_registration_round_opener
            .open_registration_round(registration_epoch, stakes)
            .await?;

        Ok(())
    }

    async fn update_protocol_parameters_in_multisigner(
        &self,
        new_beacon: &Beacon,
    ) -> Result<(), RuntimeError> {
        debug!("RUNNER: update protocol parameters"; "beacon" => #?new_beacon);
        let protocol_parameters = self.dependencies.config.protocol_parameters.clone();
        Ok(self
            .dependencies
            .multi_signer
            .write()
            .await
            .update_protocol_parameters(&protocol_parameters.into())
            .await?)
    }

    async fn update_message_in_multisigner(&self, digest: String) -> Result<(), RuntimeError> {
        debug!("RUNNER: update message in multisigner");
        let mut multi_signer = self.dependencies.multi_signer.write().await;
        let mut protocol_message = ProtocolMessage::new();
        protocol_message.set_message_part(ProtocolMessagePartKey::SnapshotDigest, digest);
        protocol_message.set_message_part(
            ProtocolMessagePartKey::NextAggregateVerificationKey,
            multi_signer
                .compute_next_stake_distribution_aggregate_verification_key()
                .await
                .map_err(RuntimeError::MultiSigner)?
                .unwrap_or_default(),
        );
        multi_signer
            .update_current_message(protocol_message)
            .await
            .map_err(RuntimeError::MultiSigner)
    }

    async fn create_new_pending_certificate_from_multisigner(
        &self,
        beacon: Beacon,
    ) -> Result<CertificatePending, RuntimeError> {
        debug!("RUNNER: create new pending certificate from multisigner");
        let multi_signer = self.dependencies.multi_signer.read().await;

        let signers = match multi_signer.get_signers().await {
            Ok(signers) => signers,
            Err(ProtocolError::Beacon(_)) => vec![],
            Err(e) => return Err(e.into()),
        };
        let next_signers = match multi_signer.get_next_signers_with_stake().await {
            Ok(signers) => signers,
            Err(ProtocolError::Beacon(_)) => vec![],
            Err(e) => return Err(e.into()),
        };

        let protocol_parameters = multi_signer
            .get_protocol_parameters()
            .await?
            .ok_or_else(|| RuntimeError::General("no protocol parameters".to_string().into()))?;
        let next_protocol_parameters = multi_signer
            .get_next_protocol_parameters()
            .await?
            .ok_or_else(|| {
                RuntimeError::General("no next protocol parameters".to_string().into())
            })?;

        let pending_certificate = CertificatePending::new(
            beacon,
            protocol_parameters.into(),
            next_protocol_parameters.into(),
            signers,
            next_signers.into_iter().map(|s| s.into()).collect(),
        );

        Ok(pending_certificate)
    }

    async fn create_new_working_certificate(
        &self,
        certificate_pending: &CertificatePending,
    ) -> Result<WorkingCertificate, RuntimeError> {
        debug!("RUNNER: create new working certificate");
        let multi_signer = self.dependencies.multi_signer.read().await;

        let signers = match multi_signer.get_signers_with_stake().await {
            Ok(signers) => signers,
            Err(ProtocolError::Beacon(_)) => vec![],
            Err(e) => return Err(e.into()),
        };
        let protocol_message = multi_signer.get_current_message().await.ok_or_else(|| {
            RuntimeError::General("Can't create a working certificate without a message".into())
        })?;
        let aggregate_verification_key = multi_signer
            .compute_stake_distribution_aggregate_verification_key()
            .await?
            .ok_or_else(|| {
                RuntimeError::General("Can't create a working certificate without an AVK".into())
            })?;

        let certificate_store = self.dependencies.certificate_store.clone();
        let latest_certificates = certificate_store.get_list(2).await?;
        let last_certificate = latest_certificates.get(0);
        let penultimate_certificate = latest_certificates.get(1);
        let previous_hash = AggregatorRunner::get_previous_hash_from_last_two_certificates(
            &certificate_pending.beacon,
            last_certificate,
            penultimate_certificate,
        )?;

        Ok(WorkingCertificate::from_pending_certificate(
            certificate_pending,
            &signers,
            &protocol_message,
            &aggregate_verification_key,
            &Utc::now(),
            previous_hash,
        ))
    }

    async fn save_pending_certificate(
        &self,
        pending_certificate: CertificatePending,
    ) -> Result<(), RuntimeError> {
        debug!("RUNNER: saving pending certificate");

        self.dependencies
            .certificate_pending_store
            .save(pending_certificate)
            .await
            .map_err(|e| e.into())
    }

    async fn drop_pending_certificate(&self) -> Result<Option<CertificatePending>, RuntimeError> {
        debug!("RUNNER: drop pending certificate");

        let certificate_pending = self.dependencies.certificate_pending_store.remove().await?;
        if certificate_pending.is_none() {
            warn!(" > drop_pending_certificate::no certificate pending in store, did the previous loop crashed ?");
        }

        Ok(certificate_pending)
    }

    /// Is a multi-signature ready?
    /// Can we create a multi-signature.
    async fn is_multisig_created(&self) -> Result<bool, RuntimeError> {
        debug!("RUNNER: check if we can create a multi-signature");
        let has_multisig = self
            .dependencies
            .multi_signer
            .write()
            .await
            .create_multi_signature()
            .await?
            .is_some();

        if has_multisig {
            debug!(" > new multi-signature created");
        } else {
            info!(" > no multi-signature created");
        }
        Ok(has_multisig)
    }

    async fn create_snapshot_archive(
        &self,
        beacon: &Beacon,
    ) -> Result<OngoingSnapshot, RuntimeError> {
        debug!("RUNNER: create snapshot archive");

        let snapshotter = self.dependencies.snapshotter.clone();
        let protocol_message = self
            .dependencies
            .multi_signer
            .read()
            .await
            .get_current_message()
            .await
            .ok_or_else(|| RuntimeError::General("no message found".to_string().into()))?;
        let snapshot_digest = protocol_message
            .get_message_part(&ProtocolMessagePartKey::SnapshotDigest)
            .ok_or_else(|| {
                RuntimeError::General("no snapshot digest message part found".to_string().into())
            })?;
        let snapshot_name = format!(
            "{}-e{}-i{}.{}.tar.gz",
            beacon.network, beacon.epoch.0, beacon.immutable_file_number, snapshot_digest
        );
        // spawn a separate thread to prevent blocking
        let ongoing_snapshot =
            tokio::task::spawn_blocking(move || -> Result<OngoingSnapshot, SnapshotError> {
                snapshotter.snapshot(&snapshot_name)
            })
            .await
            .map_err(|e| RuntimeError::General(e.into()))??;

        debug!(" > snapshot created: '{:?}'", ongoing_snapshot);

        Ok(ongoing_snapshot)
    }

    async fn upload_snapshot_archive(
        &self,
        ongoing_snapshot: &OngoingSnapshot,
    ) -> Result<Vec<SnapshotLocation>, RuntimeError> {
        debug!("RUNNER: upload snapshot archive");
        let location = self
            .dependencies
            .snapshot_uploader
            .upload_snapshot(ongoing_snapshot.get_file_path())
            .await
            .map_err(RuntimeError::SnapshotUploader)?;

        if let Err(error) = tokio::fs::remove_file(ongoing_snapshot.get_file_path()).await {
            warn!(
                " > Post upload ongoing snapshot file removal failure: {}",
                error
            );
        }

        Ok(vec![location])
    }

    async fn create_and_save_certificate(
        &self,
        working_certificate: &WorkingCertificate,
    ) -> Result<Certificate, RuntimeError> {
        debug!("RUNNER: create and save certificate");
        let certificate_store = self.dependencies.certificate_store.clone();
        let multisigner = self.dependencies.multi_signer.read().await;
        let signatures_party_ids: Vec<PartyId> = self
            .dependencies
            .single_signature_store
            .get_single_signatures(&working_certificate.beacon)
            .await?
            .unwrap_or_default()
            .into_keys()
            .collect::<Vec<_>>();
        let multi_signature = multisigner.get_multi_signature().await?.ok_or_else(|| {
            RuntimeError::General("no multi signature generated".to_string().into())
        })?;

        let certificate = MithrilCertificateCreator::create_certificate(
            working_certificate,
            &signatures_party_ids,
            multi_signature,
        )?;

        self.dependencies
            .certificate_verifier
            .verify_certificate(
                &certificate,
                certificate_store.clone(),
                &self.dependencies.genesis_verifier,
            )
            .await?;
        let _ = certificate_store.save(certificate.clone()).await?;

        Ok(certificate)
    }

    async fn create_and_save_snapshot(
        &self,
        certificate: Certificate,
        ongoing_snapshot: &OngoingSnapshot,
        remote_locations: Vec<String>,
    ) -> Result<Snapshot, RuntimeError> {
        debug!("RUNNER: create and save snapshot");
        let snapshot_digest = certificate
            .protocol_message
            .get_message_part(&ProtocolMessagePartKey::SnapshotDigest)
            .ok_or_else(|| RuntimeError::General("message part not found".to_string().into()))?
            .to_owned();
        let snapshot = Snapshot::new(
            snapshot_digest,
            certificate.beacon,
            certificate.hash,
            *ongoing_snapshot.get_file_size(),
            format!("{:?}", Utc::now()),
            remote_locations,
        );

        self.dependencies
            .snapshot_store
            .add_snapshot(snapshot.clone())
            .await?;

        Ok(snapshot)
    }
}

#[cfg(test)]
pub mod tests {
    use crate::dependency::SimulateFromChainParams;
    use crate::multi_signer::MockMultiSigner;
    use crate::runtime::{RuntimeError, WorkingCertificate};
    use crate::snapshotter::OngoingSnapshot;
    use crate::{
        initialize_dependencies,
        runtime::{AggregatorRunner, AggregatorRunnerTrait},
    };
    use crate::{MithrilSignerRegisterer, ProtocolParametersStorer, SignerRegistrationRound};
    use mithril_common::chain_observer::FakeObserver;
    use mithril_common::crypto_helper::{
        key_decode_hex, tests_setup::setup_certificate_chain, ProtocolMultiSignature,
    };
    use mithril_common::digesters::DumbImmutableFileObserver;
    use mithril_common::entities::{
        Beacon, CertificatePending, Epoch, HexEncodedKey, ProtocolMessage, StakeDistribution,
    };
    use mithril_common::test_utils::MithrilFixtureBuilder;
    use mithril_common::{
        entities::ProtocolMessagePartKey, store::StakeStorer, test_utils::fake_data,
    };
    use mithril_common::{BeaconProviderImpl, CardanoNetwork};
    use std::collections::HashMap;
    use std::path::Path;
    use std::sync::Arc;
    use tempfile::NamedTempFile;
    use tokio::sync::RwLock;

    #[tokio::test]
    async fn test_get_beacon_from_chain() {
        let expected_beacon = Beacon::new("private".to_string(), 2, 17);
        let (mut dependencies, config) = initialize_dependencies().await;
        let immutable_file_observer = Arc::new(DumbImmutableFileObserver::default());
        immutable_file_observer
            .shall_return(Some(expected_beacon.immutable_file_number))
            .await;
        let beacon_provider = Arc::new(BeaconProviderImpl::new(
            Arc::new(FakeObserver::new(Some(expected_beacon.clone()))),
            immutable_file_observer,
            CardanoNetwork::TestNet(42),
        ));
        dependencies.beacon_provider = beacon_provider;
        let runner = AggregatorRunner::new(config, Arc::new(dependencies));

        // Retrieves the expected beacon
        let res = runner.get_beacon_from_chain().await;
        assert_eq!(expected_beacon, res.unwrap());
    }

    #[tokio::test]
    async fn test_does_certificate_exist_for_beacon() {
        let (dependencies, config) = initialize_dependencies().await;
        let certificate_store = dependencies.certificate_store.clone();
        let runner = AggregatorRunner::new(config, Arc::new(dependencies));

        let beacon = fake_data::beacon();
        let mut certificate = fake_data::certificate("certificate_hash".to_string());
        certificate.beacon = beacon.clone();

        assert!(!runner
            .does_certificate_exist_for_beacon(&beacon)
            .await
            .unwrap());
        certificate_store.save(certificate).await.unwrap();
        assert!(runner
            .does_certificate_exist_for_beacon(&beacon)
            .await
            .unwrap());
    }

    #[tokio::test]
    async fn test_update_beacon() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        let res = runner.update_beacon(&beacon).await;

        assert!(res.is_ok());
        let stored_beacon = deps
            .multi_signer
            .read()
            .await
            .get_current_beacon()
            .await
            .unwrap();

        assert_eq!(beacon, stored_beacon);
    }

    #[tokio::test]
    async fn test_update_stake_distribution() {
        let (mut deps, config) = initialize_dependencies().await;
        let chain_observer = Arc::new(FakeObserver::default());
        deps.chain_observer = chain_observer.clone();
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        let fixture = MithrilFixtureBuilder::default().with_signers(5).build();
        let expected = fixture.stake_distribution();

        chain_observer
            .set_signers(fixture.signers_with_stake())
            .await;
        runner
            .update_beacon(&beacon)
            .await
            .expect("setting the beacon should not fail");
        runner
            .update_stake_distribution(&beacon)
            .await
            .expect("updating stake distribution should not return an error");

        let saved_stake_distribution = deps
            .stake_store
            .get_stakes(beacon.epoch.offset_to_recording_epoch())
            .await
            .unwrap()
            .unwrap_or_else(|| {
                panic!(
                    "I should have a stake distribution for the epoch {:?}",
                    beacon.epoch
                )
            });

        assert_eq!(expected, saved_stake_distribution);
    }

    #[tokio::test]
    async fn test_open_signer_registration_round() {
        let (mut deps, config) = initialize_dependencies().await;
        let signer_registration_round_opener = Arc::new(MithrilSignerRegisterer::new(
            deps.chain_observer.clone(),
            deps.verification_key_store.clone(),
        ));
        deps.signer_registration_round_opener = signer_registration_round_opener.clone();
        let stake_store = deps.stake_store.clone();
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());

        let beacon = fake_data::beacon();
        let recording_epoch = beacon.epoch.offset_to_recording_epoch();
        let stake_distribution: StakeDistribution =
            HashMap::from([("a".to_string(), 5), ("b".to_string(), 10)]);

        stake_store
            .save_stakes(recording_epoch, stake_distribution.clone())
            .await
            .expect("Save Stake distribution should not fail");

        runner
            .open_signer_registration_round(&beacon)
            .await
            .expect("opening signer registration should not return an error");

        let saved_current_round = signer_registration_round_opener.get_current_round().await;

        let expected_signer_registration_round =
            SignerRegistrationRound::dummy(recording_epoch, stake_distribution);

        assert_eq!(
            Some(expected_signer_registration_round),
            saved_current_round,
        );
    }

    #[tokio::test]
    async fn test_update_protocol_parameters_in_multisigner() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner
            .update_beacon(&beacon)
            .await
            .expect("setting the beacon should not fail");
        runner
            .update_protocol_parameters_in_multisigner(&beacon)
            .await
            .expect("updating protocol parameters should not return an error");

        let current_protocol_parameters = deps.config.protocol_parameters.clone();

        let saved_protocol_parameters = deps
            .protocol_parameters_store
            .get_protocol_parameters(beacon.epoch.offset_to_protocol_parameters_recording_epoch())
            .await
            .unwrap()
            .unwrap_or_else(|| {
                panic!(
                    "should have protocol parameters for the epoch {:?}",
                    beacon.epoch
                )
            });

        assert_eq!(current_protocol_parameters, saved_protocol_parameters);
    }

    #[tokio::test]
    async fn test_create_new_pending_certificate_from_multisigner() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner.update_beacon(&beacon).await.unwrap();

        let fixture = MithrilFixtureBuilder::default().with_signers(5).build();
        let current_signers = fixture.signers_with_stake()[1..3].to_vec();
        let next_signers = fixture.signers_with_stake()[2..5].to_vec();
        let protocol_parameters = fake_data::protocol_parameters();
        deps.prepare_for_genesis(
            current_signers.clone(),
            next_signers.clone(),
            &protocol_parameters.clone(),
        )
        .await;

        let mut certificate = runner
            .create_new_pending_certificate_from_multisigner(beacon.clone())
            .await
            .unwrap();
        certificate.signers.sort_by_key(|s| s.party_id.clone());
        certificate.next_signers.sort_by_key(|s| s.party_id.clone());
        let mut expected = CertificatePending::new(
            beacon,
            protocol_parameters.clone(),
            protocol_parameters,
            current_signers.into_iter().map(|s| s.into()).collect(),
            next_signers.into_iter().map(|s| s.into()).collect(),
        );
        expected.signers.sort_by_key(|s| s.party_id.clone());
        expected.next_signers.sort_by_key(|s| s.party_id.clone());

        assert_eq!(expected, certificate);
    }

    #[tokio::test]
    async fn test_create_new_working_certificate() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner.update_beacon(&beacon).await.unwrap();

        let fixture = MithrilFixtureBuilder::default().with_signers(5).build();

        deps.prepare_for_genesis(
            fixture.signers_with_stake(),
            fixture.signers_with_stake(),
            &fixture.protocol_parameters(),
        )
        .await;

        runner
            .update_message_in_multisigner("a digest".to_string())
            .await
            .expect("update_message_in_multisigner should not fail");
        let message = deps
            .multi_signer
            .read()
            .await
            .get_current_message()
            .await
            .unwrap();

        let aggregate_verification_key = deps
            .multi_signer
            .read()
            .await
            .compute_stake_distribution_aggregate_verification_key()
            .await
            .expect("")
            .unwrap();

        let certificate_pending = runner
            .create_new_pending_certificate_from_multisigner(beacon.clone())
            .await
            .unwrap();

        let mut sut = runner
            .create_new_working_certificate(&certificate_pending)
            .await
            .expect("create_new_working_certificate should not fail");
        sut.signers
            .sort_by(|left, right| left.party_id.cmp(&right.party_id));

        let mut expected = WorkingCertificate::from_pending_certificate(
            &certificate_pending,
            &fixture.signers_with_stake(),
            &message,
            &aggregate_verification_key,
            &sut.initiated_at,
            "",
        );
        expected
            .signers
            .sort_by(|left, right| left.party_id.cmp(&right.party_id));

        assert_eq!(expected, sut);
    }

    #[tokio::test]
    async fn test_create_new_working_certificate_ko_epoch_gap() {
        let (deps, config) = initialize_dependencies().await;
        let (certificate_chain, _) = setup_certificate_chain(5, 1);
        let mut beacon = certificate_chain.first().unwrap().beacon.clone();
        beacon.epoch += 2;

        deps.init_state_from_chain(
            &certificate_chain,
            vec![SimulateFromChainParams::SetupMultiSigner],
        )
        .await;
        let runner = AggregatorRunner::new(config, Arc::new(deps));
        let total_certificates = 5;
        runner
            .update_message_in_multisigner("a digest".to_string())
            .await
            .expect("update_message_in_multisigner should not fail");

        let certificate_pending = CertificatePending {
            beacon: beacon.clone(),
            ..fake_data::certificate_pending()
        };

        let certificate = runner
            .create_new_working_certificate(&certificate_pending)
            .await;
        assert!(certificate.is_err());
        let err = certificate.unwrap_err();
        assert_eq!(
            RuntimeError::CertificateChainEpochGap(beacon.epoch, Epoch(total_certificates))
                .to_string(),
            err.to_string()
        );
    }

    #[tokio::test]
    async fn test_update_message_in_multisigner() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let digest = "1+2+3+4=10".to_string();
        runner.update_beacon(&fake_data::beacon()).await.unwrap();
        let fixture = MithrilFixtureBuilder::default().build();
        deps.prepare_for_genesis(
            fixture.signers_with_stake(),
            fixture.signers_with_stake(),
            &fixture.protocol_parameters(),
        )
        .await;

        runner
            .update_message_in_multisigner(digest)
            .await
            .expect("update_message_in_multisigner should not fail");
        let message = deps
            .multi_signer
            .read()
            .await
            .get_current_message()
            .await
            .unwrap();

        assert_eq!(
            "1+2+3+4=10",
            message
                .get_message_part(&ProtocolMessagePartKey::SnapshotDigest)
                .unwrap()
        );
    }

    #[tokio::test]
    async fn test_save_pending_certificate() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner.update_beacon(&beacon).await.unwrap();
        let pending_certificate = fake_data::certificate_pending();

        runner
            .save_pending_certificate(pending_certificate.clone())
            .await
            .expect("save_pending_certificate should not fail");

        let saved_cert = deps.certificate_pending_store.get().await.unwrap().unwrap();
        assert_eq!(pending_certificate, saved_cert);
    }

    #[tokio::test]
    async fn test_drop_pending_certificate() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner.update_beacon(&beacon).await.unwrap();
        let pending_certificate = fake_data::certificate_pending();
        deps.certificate_pending_store
            .save(pending_certificate.clone())
            .await
            .unwrap();

        let cert = runner.drop_pending_certificate().await.unwrap();
        assert_eq!(Some(pending_certificate), cert);
        let maybe_saved_cert = deps.certificate_pending_store.get().await.unwrap();
        assert_eq!(None, maybe_saved_cert);
    }

    #[tokio::test]
    async fn test_drop_pending_no_certificate() {
        let (deps, config) = initialize_dependencies().await;
        let deps = Arc::new(deps);
        let runner = AggregatorRunner::new(config, deps.clone());
        let beacon = runner.get_beacon_from_chain().await.unwrap();
        runner.update_beacon(&beacon).await.unwrap();

        let cert = runner.drop_pending_certificate().await.unwrap();
        assert_eq!(None, cert);
        let maybe_saved_cert = deps.certificate_pending_store.get().await.unwrap();
        assert_eq!(None, maybe_saved_cert);
    }

    #[tokio::test]
    async fn test_create_and_save_certificate_ok() {
        let (certificate_chain, _) = setup_certificate_chain(5, 1);
        let first_certificate = certificate_chain[0].clone();
        let multi_signature: ProtocolMultiSignature =
            key_decode_hex(&first_certificate.multi_signature as &HexEncodedKey).unwrap();
        let working_certificate = WorkingCertificate {
            beacon: first_certificate.beacon.clone(),
            signers: first_certificate.metadata.signers.clone(),
            aggregate_verification_key: first_certificate.aggregate_verification_key.clone(),
            protocol_parameters: first_certificate.metadata.protocol_parameters.clone(),
            previous_hash: certificate_chain[1].hash.clone(),
            message: first_certificate.protocol_message.clone(),
            ..WorkingCertificate::fake()
        };
        let (mut deps, config) = initialize_dependencies().await;
        let mut mock_multi_signer = MockMultiSigner::new();
        mock_multi_signer
            .expect_get_multi_signature()
            .return_once(move || Ok(Some(multi_signature)));
        deps.multi_signer = Arc::new(RwLock::new(mock_multi_signer));
        deps.init_state_from_chain(&certificate_chain, vec![]).await;
        let runner = AggregatorRunner::new(config, Arc::new(deps));

        let certificate = runner
            .create_and_save_certificate(&working_certificate)
            .await;
        certificate.expect("a certificate should have been created and saved");
    }

    #[tokio::test]
    async fn test_remove_snapshot_archive_after_upload() {
        let (deps, config) = initialize_dependencies().await;
        let runner = AggregatorRunner::new(config, Arc::new(deps));
        let file = NamedTempFile::new().unwrap();
        let file_path = file.path();
        let snapshot = OngoingSnapshot::new(file_path.to_path_buf(), 7331);

        runner
            .upload_snapshot_archive(&snapshot)
            .await
            .expect("Snapshot upload should not fail");

        assert!(
            !file_path.exists(),
            "Ongoing snapshot file should have been removed after upload"
        );
    }

    #[tokio::test]
    async fn test_create_snapshot_archive_name_archive_after_beacon() {
        let beacon = Beacon::new("network".to_string(), 20, 145);
        let mut message = ProtocolMessage::new();
        message.set_message_part(
            ProtocolMessagePartKey::SnapshotDigest,
            "test+digest".to_string(),
        );
        let mut mock_multi_signer = MockMultiSigner::new();
        mock_multi_signer
            .expect_get_current_message()
            .return_once(move || Some(message));
        let (mut deps, config) = initialize_dependencies().await;
        deps.multi_signer = Arc::new(RwLock::new(mock_multi_signer));
        let runner = AggregatorRunner::new(config, Arc::new(deps));

        let ongoing_snapshot = runner
            .create_snapshot_archive(&beacon)
            .await
            .expect("create_snapshot_archive should not fail");

        assert_eq!(
            Path::new(
                format!(
                    "{}-e{}-i{}.{}.tar.gz",
                    beacon.network, beacon.epoch.0, beacon.immutable_file_number, "test+digest"
                )
                .as_str()
            ),
            ongoing_snapshot.get_file_path()
        );
    }
}
