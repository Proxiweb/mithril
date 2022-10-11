"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[335],{7385:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2022/10/11/keys-certification-badge","metadata":{"permalink":"/doc/dev-blog/2022/10/11/keys-certification-badge","source":"@site/blog/2022-10-11-keys-certification-badge/index.md","title":"Mihtril Keys Certification","description":"The way the Mithril nodes handle the Certification of the SPOs is evolving","date":"2022-10-11T00:00:00.000Z","formattedDate":"October 11, 2022","tags":[{"label":"cardano","permalink":"/doc/dev-blog/tags/cardano"},{"label":"poolId","permalink":"/doc/dev-blog/tags/pool-id"},{"label":"operational-certificate","permalink":"/doc/dev-blog/tags/operational-certificate"},{"label":"kes-keys","permalink":"/doc/dev-blog/tags/kes-keys"},{"label":"mithril-keys","permalink":"/doc/dev-blog/tags/mithril-keys"},{"label":"hybrid-mode","permalink":"/doc/dev-blog/tags/hybrid-mode"}],"readingTime":2.215,"hasTruncateMarker":false,"authors":[{"name":"Mithril Team"}],"frontMatter":{"title":"Mihtril Keys Certification","authors":[{"name":"Mithril Team"}],"tags":["cardano","poolId","operational-certificate","kes-keys","mithril-keys","hybrid-mode"]},"nextItem":{"title":"Mithril internal stores switch to SQLite.","permalink":"/doc/dev-blog/2022/09/14/sqlite-stores"}},"content":"### The way the Mithril nodes handle the Certification of the SPOs is evolving\\n\\n**PR**: `New STM registration procedure` [#433](https://github.com/input-output-hk/mithril/pull/433)\\n\\n**Issues**: `Implement Certification of the Mithril Verification Keys in Signer/Aggregator` [#455](https://github.com/input-output-hk/mithril/issues/455)\\n\\nWe have released a new Mithril Signer Verification Keys Certification mechanism:\\n\\n- Mithril Signer nodes running the previous version are still able to interact with the network without any further intervention\\n- Mithril Signer nodes that are updated from a previous version must migrate some of their stores\\n- This mechanism is **experimental** and can be activated on demand by the SPOs\\n\\n#### Upgrade a Mithril Signer running a previous version\\n\\nThe SPOs need to recompile their Signer node (as in this [guide](https://mithril.network/doc/manual/getting-started/run-signer-node)).\\n\\nThe data stores of the node need to be updated by running the following command:\\n\\n```bash\\n# The path to your data stores directory, which defaults to:\\nDATA_STORES_DIRECTORY=/opt/mithril/mithril-signer/stores\\n\\n# Run this command to upgrade your stores:\\nsqlite3 ${DATA_STORES_DIRECTORY}/signer.sqlite3 \\"UPDATE protocol_initializer SET value = json_object(\'stm_initializer\', json(value), \'kes_signature\', null) WHERE json_extract(value, \'$.stm_initializer\') IS NULL;\\"\\n```\\n\\n:warning: If you don\'t update your data stores with this procedure, your node will not be able to register to the Aggregator temporarily. It should then take up to `3` epochs before it is able to successfully register its individual signatures with the Aggregator.\\n\\n#### Hybrid Certification mode in the Mithril network\\n\\nFrom now, SPOs can either run their node by:\\n\\n- **Declaring their Cardano `PoolId`**:\\n\\n  - This is the mode that all nodes were running prior to this release\\n  - This mode is still the **stable** mode\\n  - We intend to deprecate this mode in the near future\\n\\n- **Certifying their Cardano `PoolId`**:\\n\\n  - The certification is done by providing the Mithril Signer node with `KES Secret Key Path` and `Operational Certificate Path`\\n  - This is an **experimental** mode\\n  - We intend to make this mode the only way of providing a `PoolId` in the near future\\n  - These `PoolIds` will be marked with a `Verified Signer` green badge in the [Mithril Explorer](https://mithril.network/explorer/) (`2` epochs after activating the Certification mode)\\n\\nThe setup of a Mithril Signer node with these two modes is available in this [guide](https://mithril.network/doc/manual/getting-started/run-signer-node).\\n\\nHere is an example of the `Verified Signer` badge displayed in the Certificate details popin:\\n![](./img/badge.png)\\n\\n#### How Keys Certification works\\n\\nWe rely on the Cardano `KES Keys` and `Operational Certificate` to be able to:\\n\\n- Compute automatically the `PoolId` from a valid `Operational Certificate`\\n- Sign the `Mithril Signer Verification Key` with the `KES Secret Key`\\n- Verify that the `Mithril Signer Verification Key` is associated to the owner of the pool\\n\\n![](./img/schema.jpg)\\n\\nFeel free to reach out to us on the [Discord channel](https://discord.gg/5kaErDKDRq) for questions and/or help."},{"id":"/2022/09/14/sqlite-stores","metadata":{"permalink":"/doc/dev-blog/2022/09/14/sqlite-stores","source":"@site/blog/2022-09-14-sqlite-stores.md","title":"Mithril internal stores switch to SQLite.","description":"What is that?","date":"2022-09-14T00:00:00.000Z","formattedDate":"September 14, 2022","tags":[{"label":"store","permalink":"/doc/dev-blog/tags/store"},{"label":"sqlite","permalink":"/doc/dev-blog/tags/sqlite"},{"label":"breaking-change","permalink":"/doc/dev-blog/tags/breaking-change"}],"readingTime":3.005,"hasTruncateMarker":false,"authors":[{"name":"Mithril Team"}],"frontMatter":{"title":"Mithril internal stores switch to SQLite.","authors":[{"name":"Mithril Team"}],"tags":["store","sqlite","breaking-change"]},"prevItem":{"title":"Mihtril Keys Certification","permalink":"/doc/dev-blog/2022/10/11/keys-certification-badge"},"nextItem":{"title":"Stake Distribution retrieval fixed","permalink":"/doc/dev-blog/2022/09/13/stake-distribution-retrieval"}},"content":"## What is that?\\n\\nSince almost the beginning of the Mithril project, the software used to rely on a store mechanism to save its different states allowing Signers and Aggregators to resume on correct state when switched on and off. This internal store mechanism used to be a bunch of JSON files saved in a given directory. Even though this does the job it still presents flaws: data are hard to query when debugging especially when crossing data (which signers have participated in this multi-signature?). Also, data are stored in different places which can be a problem when moving these files from one place to another. We also had to imagine what would be a migration scenario in case of a structure change. Switching to a file based SQL database solves these issues.\\n\\nThe new release now uses SQLite stores in place of JSON file storage. This means that to continue running a Signer or an Aggregator node it is necessary to migrate from the old storage system to SQLite. This release comes with a tool to perform the migration which should be as straightforward as launching a command line (read below). The migration tool will be available only for a limited time in order to make Mithril beta testers able to migrate their existing data.\\n\\n## How to migrate data from old storage system to SQLite stores?\\n\\nThere are 2 ways of getting the new version and the associated migration tool. Either downloading binaries from Github or compiling them yourself.\\n\\n### Downloading\\n\\nDownload the new `mithril-signer` and `mithril-signer-migrate` files from the [nightly builds page](https://github.com/input-output-hk/mithril/releases/tag/nightly). Make them executable:\\n\\n```\\n$> chmod +x mithril-signer*\\n$> ls -1F mithril-signer*\\nmithril-signer*\\nmithril-signer-migrate*\\n```\\n\\n_note_: the suffix `*` appended to the the entries output above indicates the file is executable. If it is not present, ensure the `chmod` command does not produce any error.\\n\\n### Compiling\\n\\nIf you used to compile your node as stated in the [guide](https://mithril.network/doc/manual/getting-started/run-signer-node), you have to compile the migration tool as well:\\n\\n```\\n$> cd mithril-signer\\n$> cargo build --all-targets --release\\n  Compiling mithril-signer v0.1.0 (/home/somebody/shared/mithril/mithril-signer)\\n    Finished release [optimized] target(s) in 4.56s\\n$> ls -1F ../target/release/mithril-signer*\\n../target/release/mithril-signer*\\n../target/release/mithril-signer.d\\n../target/release/mithril-signer-migrate*\\n../target/release/mithril-signer-migrate.d\\n```\\n\\n### Running the migration\\n\\nThe first step is to stop the running Mithril node if any. The `mithril-signer-migrate` executable can perform the migration automatically once you know where your actual JSON files are located. Have a look in your configuration file (default `/opt/mithril/mithril-signer/service.env`), check the value associated with the `DATA_STORES_DIRECTORY` key (default to `/opt/mithril/mithril-signer/stores`) and copy the path indicated here. Copy this path after the `--db-dir` option on the following command line:\\n\\n```\\n$> ./mithril-signer-migrate automatic --db-dir /paste/the/data/stores/directory/here\\nMithril Aggregator JSON \u2192 SQLite migration tool.\\nMigrating protocol_initializer_store data\u2026\\nOK \u2713\\nMigrating stake_store data\u2026\\nOK \u2713\\n```\\n\\nAt the end of this command, a file `signer.sqlite3` (or `aggregator.sqlite3` if you run an Aggregator) should be present in the specified base directory. \\n\\nThat should be enough, launch your upgraded mithril node.\\n\\n**Note:** The migration executable does not remove the old JSON files from the disk. \\n\\n### Manual migration process\\n\\nThe executable also provides a `manual` switch for migrating Mithril JSON store directories placed in custom directories. This is mainly intended for developers who work on tweaked environments. Each internal store has its own data structure. In order to correctly migrate and process data, the type of the store has to be given on the command line.\\n\\n```\\n$> ./mithril-signer-migrate manual --help\\n```\\n\\nThe command above should give you all informations needed to run a custom store migration. \\n\\nFeel free to reach out to us on the [Discord channel](https://discord.gg/5kaErDKDRq) for questions and/or help."},{"id":"/2022/09/13/stake-distribution-retrieval","metadata":{"permalink":"/doc/dev-blog/2022/09/13/stake-distribution-retrieval","source":"@site/blog/2022-09-13-stake-distribution-retrieval.md","title":"Stake Distribution retrieval fixed","description":"The way the Mithril nodes retrieve the Stake Distribution is changing","date":"2022-09-13T00:00:00.000Z","formattedDate":"September 13, 2022","tags":[{"label":"stake-distribution","permalink":"/doc/dev-blog/tags/stake-distribution"},{"label":"certificate","permalink":"/doc/dev-blog/tags/certificate"}],"readingTime":1.64,"hasTruncateMarker":false,"authors":[{"name":"Mithril Team"}],"frontMatter":{"title":"Stake Distribution retrieval fixed","authors":[{"name":"Mithril Team"}],"tags":["stake-distribution","certificate"]},"prevItem":{"title":"Mithril internal stores switch to SQLite.","permalink":"/doc/dev-blog/2022/09/14/sqlite-stores"},"nextItem":{"title":"Signers list computation in Certificates","permalink":"/doc/dev-blog/2022/09/12/certificate-signers-list"}},"content":"### The way the Mithril nodes retrieve the Stake Distribution is changing\\n\\n**PR**: `Fix Stake Distribution retrieval` [#499](https://github.com/input-output-hk/mithril/pull/499)\\n\\n**Issue**: `Stake distribution discrepancy` [#497](https://github.com/input-output-hk/mithril/issues/497)\\n\\nWe have noticed that the way the Mithril nodes computed the `Stake Distribution` was erroneous: the epoch that was used to make the computation was the **current epoch** instead of the **previous epoch**. This has lead to some de-synchronization between the Signers and the hosted GCP Aggregator for a few epochs.\\n\\nIndeed, the `Stake Distribution` retrieved from the Cardano node depended on the time at which it was done: the nodes where having differents values that prevented them from being able to work together to produce valid multi-signatures. The problem is related to the epoch that is used (**current epoch**) to make the computation of the `Stake Distribution` when the `cardano-cli query stake-distribution` command is ran, whereas the Mithril protocol needs to work with the **previous epoch**.\\n\\nA workaround is being implemented in this fix that will compute differently the `Stake Distribution` to target the **previous epoch**. To do so, the Stake value that is now retrieved sequentially for each pool available in the `cardano-cli query stake-distribution` by using the command `cardano-cli query stake-snapshot --stake-pool-id **pool-id*`. This guarantees that the `Stake Distribution` is computed deterministically on all nodes of the Mithril Network.\\n\\nWe will continue our efforts to enhance the way the `Stake Distribution` is retrieved in the future, and so that it works smoothly on the `mainnet` (where the numbers of pools is bigger `~3,000` vs `~100` on the `preview` network).\\n\\nThe SPOs need to recompile their Signer node in order to compute correctly the `Stake Distributions` on their node (as in this [guide](https://mithril.network/doc/manual/getting-started/run-signer-node)).\\nIt should then take up to `2` epochs before they are able to successfully register their individual signatures with the Aggregator.\\n\\nMore information about the `Certificate Chain` and the epochs retrieval requirements is available [here](https://mithril.network/doc/mithril/mithril-protocol/certificates).\\n\\nFeel free to reach out to us on the [Discord channel](https://discord.gg/5kaErDKDRq) for questions and/or help."},{"id":"/2022/09/12/certificate-signers-list","metadata":{"permalink":"/doc/dev-blog/2022/09/12/certificate-signers-list","source":"@site/blog/2022-09-12-certificate-signers-list.md","title":"Signers list computation in Certificates","description":"The way the Signers list is computed inside a Certificate on the Mithril Aggregator is changing","date":"2022-09-12T00:00:00.000Z","formattedDate":"September 12, 2022","tags":[{"label":"certificate","permalink":"/doc/dev-blog/tags/certificate"}],"readingTime":0.825,"hasTruncateMarker":false,"authors":[{"name":"Mithril Team"}],"frontMatter":{"title":"Signers list computation in Certificates","authors":[{"name":"Mithril Team"}],"tags":["certificate"]},"prevItem":{"title":"Stake Distribution retrieval fixed","permalink":"/doc/dev-blog/2022/09/13/stake-distribution-retrieval"},"nextItem":{"title":"Genesis Certificate support added","permalink":"/doc/dev-blog/2022/09/07/genesis-certificate-feature"}},"content":"### The way the Signers list is computed inside a Certificate on the Mithril Aggregator is changing\\n\\n**PR**: `Implement filtered Signers in Certificate` [#494](https://github.com/input-output-hk/mithril/pull/494)\\n\\n**Issue**: `Record \'contributing\' Signers only in Certificate` [#495](https://github.com/input-output-hk/mithril/issues/495)\\n\\nBefore this change, the list of Signers displayed in the `Certificate` detail of the [Mithril Explorer](https://mithril.network/explorer/) was the list of **all eligible** Signers of the epoch used for signing (those who have successfully registered with the Mithril Aggregator `2` epochs earlier).\\n\\nNow that this change has been merged, the list of Signers displayed will only include the **contributing** Signers, which means only those who have successfully sent individual signatures.\\n\\nNote that the already existing `Certificates` will not be updated as this would break the `Certificate Chain` and therefore would involve the bootstraping of a new `Genesis Certificate`.\\n\\nThis change is transparent to the Signer nodes runned by the SPOs and does not require any specific action from them.\\n\\nFeel free to reach out to us on the [Discord channel](https://discord.gg/5kaErDKDRq) for questions and/or help."},{"id":"/2022/09/07/genesis-certificate-feature","metadata":{"permalink":"/doc/dev-blog/2022/09/07/genesis-certificate-feature","source":"@site/blog/2022-09-07-genesis-certificate-feature.md","title":"Genesis Certificate support added","description":"Update: The PR has been merged and the feature is being deployed on the GCP Mithril Aggregator.","date":"2022-09-07T00:00:00.000Z","formattedDate":"September 7, 2022","tags":[{"label":"genesis","permalink":"/doc/dev-blog/tags/genesis"},{"label":"certificate","permalink":"/doc/dev-blog/tags/certificate"},{"label":"breaking-change","permalink":"/doc/dev-blog/tags/breaking-change"}],"readingTime":1.12,"hasTruncateMarker":false,"authors":[{"name":"Mithril Team"}],"frontMatter":{"title":"Genesis Certificate support added","authors":[{"name":"Mithril Team"}],"tags":["genesis","certificate","breaking-change"]},"prevItem":{"title":"Signers list computation in Certificates","permalink":"/doc/dev-blog/2022/09/12/certificate-signers-list"}},"content":"**Update**: The PR has been merged and the feature is being deployed on the GCP Mithril Aggregator.\\n\\n### This afternoon, we plan to merge the PR that activates the Genesis Certificate feature on the GCP Mithril Aggregator\\n\\n**PR**: `Implement Real Genesis Certificate` [#438](https://github.com/input-output-hk/mithril/pull/438)\\n\\n**Issue**: `Bootstrap Certificate Chain w/ Genesis Certificate` [#364](https://github.com/input-output-hk/mithril/issues/364)\\n\\nThis will involve some manual operations that will prevent temporarily the service to be running:\\n\\n* We will have to reset the stores of the `Snapshots` and `Certificates`. This means that the [Mithril Explorer](https://mithril.network/explorer/) will display a `No snapshot available` message.\\n\\n* The Mithril Signers will have to wait until the next epoch `#30` to be able to sign. This means that we should see the first available `Snapshot` 1 hour after the epoch transition.\\n\\nThe SPOs that are currently running a Mithril Signer will have to recompile their node in order ot take advantage of the latest improvements (such as the registration of the nodes that will take few minutes instead of few hours). However, the previously compiled node will be able to contribute to signatures.\\n\\nIn order to restore a Mithril Snapshot, a Mithril Client will now need access to the `Genesis Verification Key` by adding an environment variable when running: `GENESIS_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/TEST_ONLY_genesis.vkey)`.\\n\\nFeel free to reach out to us on the [Discord channel](https://discord.gg/5kaErDKDRq) for questions and/or help."}]}')}}]);