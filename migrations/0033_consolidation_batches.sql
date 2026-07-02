CREATE TABLE IF NOT EXISTS consolidation_batches (
  id TEXT PRIMARY KEY,
  batch_no TEXT NOT NULL UNIQUE,
  warehouse_id TEXT NOT NULL,
  member_id TEXT,
  package_count INTEGER NOT NULL DEFAULT 0,
  carton_type TEXT,
  carton_fee_hkd REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'created',
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  packed_at TEXT,
  outbounded_at TEXT,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE INDEX IF NOT EXISTS idx_consolidation_batches_warehouse ON consolidation_batches(warehouse_id, status, updated_at);
CREATE INDEX IF NOT EXISTS idx_consolidation_batches_member ON consolidation_batches(member_id, updated_at);
