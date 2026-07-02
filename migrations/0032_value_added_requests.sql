CREATE TABLE IF NOT EXISTS value_added_requests (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  warehouse_id TEXT NOT NULL,
  member_id TEXT,
  service_code TEXT NOT NULL,
  service_name TEXT NOT NULL,
  amount_hkd REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  request_note TEXT,
  process_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  FOREIGN KEY (package_id) REFERENCES inbound_packages(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE INDEX IF NOT EXISTS idx_value_added_package ON value_added_requests(package_id, status);
CREATE INDEX IF NOT EXISTS idx_value_added_warehouse ON value_added_requests(warehouse_id, status, updated_at);
