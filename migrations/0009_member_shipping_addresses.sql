CREATE TABLE IF NOT EXISTS shipping_addresses (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  label TEXT,
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  region TEXT,
  city TEXT,
  district TEXT,
  postal_code TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  is_default INTEGER NOT NULL DEFAULT 0,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE INDEX IF NOT EXISTS idx_shipping_addresses_member_updated
  ON shipping_addresses(member_id, updated_at);

CREATE INDEX IF NOT EXISTS idx_shipping_addresses_member_default
  ON shipping_addresses(member_id, is_default);
