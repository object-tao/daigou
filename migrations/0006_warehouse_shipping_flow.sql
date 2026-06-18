PRAGMA foreign_keys = ON;

CREATE TABLE shipment_packages (
  id TEXT PRIMARY KEY,
  shipment_id TEXT NOT NULL REFERENCES shipments(id),
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  added_by TEXT REFERENCES staff_users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(shipment_id, package_id)
);

INSERT OR IGNORE INTO shipment_packages (id, shipment_id, package_id, added_by) VALUES
  ('ship-pkg-demo-10001', 'DP-SH-10001', 'DP-PK-10003', 'staff-admin-demo');

INSERT OR IGNORE INTO logistics_tracking_events (
  id, shipment_id, status, location, description, occurred_at
) VALUES (
  'track-demo-packed',
  'DP-SH-10001',
  'packed',
  'Funabashi warehouse',
  'Shipment packed and waiting for outbound scan.',
  '2026-06-18T12:00:00.000Z'
);

CREATE INDEX idx_shipment_packages_shipment ON shipment_packages(shipment_id);
CREATE INDEX idx_shipment_packages_package ON shipment_packages(package_id);
CREATE UNIQUE INDEX idx_shipment_packages_unique_package ON shipment_packages(package_id);
