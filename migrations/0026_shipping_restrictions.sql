CREATE TABLE IF NOT EXISTS shipping_restrictions (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  scope_type TEXT NOT NULL DEFAULT 'global',
  destination_country_code TEXT,
  destination_country_name TEXT,
  logistics_product_id TEXT,
  logistics_product_code TEXT,
  logistics_product_name TEXT,
  cargo_categories TEXT NOT NULL DEFAULT '[]',
  keywords TEXT,
  restriction_type TEXT NOT NULL DEFAULT 'prohibited',
  max_weight_kg REAL,
  max_length_cm REAL,
  max_width_cm REAL,
  max_height_cm REAL,
  customer_message TEXT,
  internal_note TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (logistics_product_id) REFERENCES logistics_products(id)
);

CREATE INDEX IF NOT EXISTS idx_shipping_restrictions_status ON shipping_restrictions (status);
CREATE INDEX IF NOT EXISTS idx_shipping_restrictions_scope ON shipping_restrictions (scope_type, destination_country_code, logistics_product_id);
