CREATE TABLE IF NOT EXISTS topup_review_logs (
  id TEXT PRIMARY KEY,
  topup_request_id TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  amount_hkd INTEGER NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topup_request_id) REFERENCES topup_requests(id)
);

CREATE INDEX IF NOT EXISTS idx_topup_review_logs_request_created
  ON topup_review_logs(topup_request_id, created_at);
