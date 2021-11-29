initSidebarItems({"enum":[["AggregationFailure","Error types for aggregation."],["MultiVerificationFailure","Error types for multisignature verification"],["VerificationFailure","Error types for single signature verification"]],"fn":[["ev_lt_phi","Compares the output of `phi` (a real) to the output of `ev` (a hash). Used to determine winning lottery tickets."]],"struct":[["MTValue","The values that are represented in the Merkle Tree."],["StmClerk","`StmClerk` can verify and aggregate `StmSig`s and verify `StmMultiSig`s. Clerks can only be generated with the registration closed. This avoids that a Merkle Tree is computed before all parties have registered."],["StmInitializer","Initializer for `StmSigner`. This is the data that is used during the key registration procedure. One the latter is finished, this instance is consumed into an `StmSigner`."],["StmMultiSig","Aggregated signature of many parties. Contains proof that it is well-formed."],["StmParameters","Used to set protocol parameters."],["StmSig","Signature created by a single party who has won the lottery."],["StmSigner","Participant in the protocol. Can sign messages. This instance can only be generated out of an `StmInitializer` and a closed `KeyReg`. This ensures that a `MerkleTree` root is not computed before all participants have registered."]],"type":[["Index","Quorum index for signatures. An aggregate signature (`StmMultiSig`) must have at least `k` unique indices."],["PartyId","Party identifier, unique for each participant in the protocol."],["Stake","The quantity of stake held by a party, represented as a `u64`."]]});