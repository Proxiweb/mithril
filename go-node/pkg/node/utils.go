package node

import (
	"context"
	"github.com/input-output-hk/mithril/go-node/internal/pg"
	"github.com/input-output-hk/mithril/go-node/pkg/cardano"
	"github.com/input-output-hk/mithril/go-node/pkg/cardano/mt"
	"github.com/jackc/pgx/v4"
)

func GetBlockMTHash(conn *pgx.Conn, blockNumber uint64) ([]byte, []byte, error) {
	var hash, blockHash []byte
	tree := mt.NewMerkleTree()

	err := pg.WithTX(context.Background(), conn, func(ctx context.Context, tx pgx.Tx) error {
		var err error
		hash, blockHash, err = cardano.ProcessUTXO(ctx, tx, tree, blockNumber)
		return err
	})

	return hash, blockHash, err
}