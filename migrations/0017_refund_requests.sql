CREATE TABLE IF NOT EXISTS refund_requests (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  amount_hkd INTEGER NOT NULL,
  refund_method TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_account TEXT NOT NULL,
  bank_name TEXT,
  phone TEXT,
  reason TEXT NOT NULL,
  remarks TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  admin_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT,
  paid_at TEXT,
  cancelled_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_refund_requests_member_updated
  ON refund_requests(member_id, updated_at);

CREATE INDEX IF NOT EXISTS idx_refund_requests_status_updated
  ON refund_requests(status, updated_at);
