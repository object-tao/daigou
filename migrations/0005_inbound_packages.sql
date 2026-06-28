CREATE TABLE IF NOT EXISTS inbound_packages (
  id TEXT PRIMARY KEY,
  member_id TEXT REFERENCES members(id),
  source_type TEXT NOT NULL DEFAULT 'member_forecast',
  warehouse_id TEXT NOT NULL,
  warehouse_name TEXT NOT NULL,
  japanese_tracking_no TEXT NOT NULL,
  warehouse_inbound_no TEXT NOT NULL UNIQUE,
  customer_package_no TEXT NOT NULL UNIQUE,
  consolidation_batch_no TEXT,
  international_tracking_no TEXT,
  platform TEXT,
  sender_name TEXT,
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  recipient_code TEXT,
  status TEXT NOT NULL DEFAULT 'forecasted',
  weight_kg REAL,
  length_cm INTEGER,
  width_cm INTEGER,
  height_cm INTEGER,
  shelf_code TEXT,
  remarks TEXT,
  admin_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  inbounded_at TEXT,
  claimed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_inbound_member_updated ON inbound_packages(member_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_inbound_status_updated ON inbound_packages(status, updated_at);
CREATE INDEX IF NOT EXISTS idx_inbound_tracking ON inbound_packages(japanese_tracking_no);
CREATE INDEX IF NOT EXISTS idx_inbound_recipient_code ON inbound_packages(recipient_code);
