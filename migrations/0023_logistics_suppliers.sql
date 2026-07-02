CREATE TABLE IF NOT EXISTS logistics_suppliers (
  id TEXT PRIMARY KEY,
  supplier_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  login_email TEXT UNIQUE,
  password_hash TEXT,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  city TEXT,
  settlement_currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_logistics_suppliers_status
  ON logistics_suppliers(status);

CREATE INDEX IF NOT EXISTS idx_logistics_suppliers_country
  ON logistics_suppliers(country_code);

INSERT OR IGNORE INTO logistics_suppliers (
  id, supplier_code, name, contact_name, contact_phone, contact_email,
  login_email, password_hash, country_code, country_name, city,
  settlement_currency, status, remarks
) VALUES (
  'supplier-demo-tianyi',
  'SUP24527834',
  '深圳天翼通电商物流有限公司',
  '',
  '',
  '',
  '',
  NULL,
  'GB',
  '英國 United Kingdom',
  '',
  'GBP',
  'active',
  '示例供应商'
);
