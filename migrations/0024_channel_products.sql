CREATE TABLE IF NOT EXISTS channel_products (
  id TEXT PRIMARY KEY,
  channel_product_code TEXT NOT NULL UNIQUE,
  supplier_id TEXT NOT NULL,
  supplier_code TEXT NOT NULL,
  supplier_name TEXT NOT NULL,
  name TEXT NOT NULL,
  carrier_name TEXT,
  service_name TEXT,
  origin_country_code TEXT NOT NULL,
  origin_country_name TEXT NOT NULL,
  origin_city TEXT,
  destination_country_code TEXT NOT NULL,
  destination_country_name TEXT NOT NULL,
  destination_city TEXT,
  transit_time TEXT,
  cost_currency TEXT NOT NULL,
  first_weight_kg REAL NOT NULL DEFAULT 1,
  first_weight_price REAL NOT NULL DEFAULT 0,
  additional_weight_unit_kg REAL NOT NULL DEFAULT 0.5,
  additional_weight_price REAL NOT NULL DEFAULT 0,
  max_weight_kg REAL,
  status TEXT NOT NULL DEFAULT 'active',
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES logistics_suppliers(id)
);

CREATE INDEX IF NOT EXISTS idx_channel_products_supplier ON channel_products (supplier_id);
CREATE INDEX IF NOT EXISTS idx_channel_products_status ON channel_products (status);
