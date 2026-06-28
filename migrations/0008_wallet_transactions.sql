CREATE TABLE IF NOT EXISTS wallet_transactions (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  direction TEXT NOT NULL,
  category TEXT NOT NULL,
  amount_hkd INTEGER NOT NULL,
  balance_after_hkd INTEGER,
  related_type TEXT,
  related_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'posted',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wallet_tx_member_created ON wallet_transactions(member_id, created_at);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_category_created ON wallet_transactions(category, created_at);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_status_created ON wallet_transactions(status, created_at);
