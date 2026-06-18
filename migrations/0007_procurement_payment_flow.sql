PRAGMA foreign_keys = ON;

CREATE TABLE procurement_order_packages (
  id TEXT PRIMARY KEY,
  procurement_order_id TEXT NOT NULL REFERENCES procurement_orders(id),
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(procurement_order_id, package_id),
  UNIQUE(package_id)
);

INSERT OR IGNORE INTO exchange_rates (
  id, source_currency, target_currency, rate, effective_from, created_by
) VALUES (
  'rate-jpy-hkd-default',
  'JPY',
  'HKD',
  0.055,
  '2026-06-18T00:00:00.000Z',
  'staff-admin-demo'
);

CREATE INDEX idx_procurement_order_packages_order ON procurement_order_packages(procurement_order_id);
CREATE INDEX idx_procurement_order_packages_package ON procurement_order_packages(package_id);
