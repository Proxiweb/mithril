use serde::{Deserialize, Serialize};
use std::error::Error;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::RwLock;

use mithril_common::store::adapter::JsonFileStoreAdapter;

use crate::dependency::{SnapshotStoreWrapper, SnapshotUploaderWrapper};
use crate::snapshot_stores::LocalSnapshotStore;
use crate::tools::GcpFileUploader;
use crate::{LocalSnapshotUploader, RemoteSnapshotStore, RemoteSnapshotUploader};

// TODO: 'LIST_SNAPSHOTS_MAX_ITEMS' keep as const or in config, or add a parameter to `list_snapshots`?
const LIST_SNAPSHOTS_MAX_ITEMS: usize = 5;

/// Aggregator configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    /// Cardano network
    pub network: String,

    /// Snapshots manifest location
    pub url_snapshot_manifest: String,

    /// Type of snapshot store to use
    pub snapshot_store_type: SnapshotStoreType,

    /// Type of snapshot uploader to use
    pub snapshot_uploader_type: SnapshotUploaderType,

    /// Server listening IP
    pub server_url: String,

    /// Directory to snapshot
    pub db_directory: PathBuf,

    /// Directory to store snapshot
    pub snapshot_directory: PathBuf,

    /// Directory to store snapshot records
    pub snapshot_store_directory: PathBuf,

    /// Directory to store pending certificates
    pub pending_certificate_store_directory: PathBuf,

    /// Directory to store certificates
    pub certificate_store_directory: PathBuf,

    /// Directory to store verification keys
    pub verification_key_store_directory: PathBuf,

    /// Directory to store stakes
    pub stake_store_directory: PathBuf,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum SnapshotStoreType {
    Gcp,
    Local,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum SnapshotUploaderType {
    Gcp,
    Local,
}

impl Config {
    pub fn build_snapshot_store(&self) -> Result<SnapshotStoreWrapper, Box<dyn Error>> {
        match self.snapshot_store_type {
            SnapshotStoreType::Gcp => Ok(Arc::new(RwLock::new(RemoteSnapshotStore::new(
                Box::new(GcpFileUploader::default()),
                self.url_snapshot_manifest.clone(),
            )))),
            SnapshotStoreType::Local => Ok(Arc::new(RwLock::new(LocalSnapshotStore::new(
                Box::new(JsonFileStoreAdapter::new(
                    self.snapshot_store_directory.clone(),
                )?),
                LIST_SNAPSHOTS_MAX_ITEMS,
            )))),
        }
    }

    pub fn build_snapshot_uploader(&self) -> SnapshotUploaderWrapper {
        match self.snapshot_uploader_type {
            SnapshotUploaderType::Gcp => Arc::new(RwLock::new(RemoteSnapshotUploader::new(
                Box::new(GcpFileUploader::default()),
            ))),
            SnapshotUploaderType::Local => Arc::new(RwLock::new(LocalSnapshotUploader::new(
                self.server_url.clone(),
            ))),
        }
    }
}
