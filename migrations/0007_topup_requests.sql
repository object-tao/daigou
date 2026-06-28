CREATE TABLE IF NOT EXISTS topup_requests (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  topup_type TEXT NOT NULL,
  amount_hkd INTEGER NOT NULL,
  payment_method TEXT,
  bank_account_id TEXT,
  bank_account_name TEXT,
  transfer_serial_no TEXT,
  remitter_name TEXT,
  remitter_phone TEXT,
  voucher_file_name TEXT,
  remitted_at TEXT,
  remarks TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_topup_member_updated ON topup_requests(member_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_topup_status_updated ON topup_requests(status, updated_at);
