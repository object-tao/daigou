PRAGMA foreign_keys = ON;

CREATE TABLE members (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'zh-Hant',
  settlement_currency TEXT NOT NULL DEFAULT 'HKD',
  level_code TEXT NOT NULL DEFAULT 'LV1',
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE member_tags (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  tag TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE staff_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  role_id TEXT NOT NULL REFERENCES roles(id),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exchange_rates (
  id TEXT PRIMARY KEY,
  source_currency TEXT NOT NULL,
  target_currency TEXT NOT NULL,
  rate REAL NOT NULL,
  effective_from TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES staff_users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallets (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL UNIQUE REFERENCES members(id),
  balance_hkd INTEGER NOT NULL DEFAULT 0,
  commission_balance_hkd INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_requests (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  method TEXT NOT NULL DEFAULT 'bank_transfer',
  amount_hkd INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  proof_url TEXT,
  reviewed_by TEXT REFERENCES staff_users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT
);

CREATE TABLE procurement_orders (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  platform TEXT NOT NULL,
  product_url TEXT NOT NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending_quote',
  item_amount_jpy INTEGER,
  local_shipping_jpy INTEGER,
  service_fee_hkd INTEGER,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auction_orders (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  platform TEXT NOT NULL DEFAULT 'Yahoo Auctions',
  lot_url TEXT NOT NULL,
  title TEXT NOT NULL,
  max_bid_jpy INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'manual_bid_setup',
  authorization_limit_jpy INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE warehouses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT 'JP',
  is_final_dispatch INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE inbound_packages (
  id TEXT PRIMARY KEY,
  member_id TEXT REFERENCES members(id),
  warehouse_id TEXT NOT NULL REFERENCES warehouses(id),
  tracking_no TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  owner_status TEXT NOT NULL DEFAULT 'identified',
  weight_gram INTEGER,
  volume_cm3 INTEGER,
  free_storage_until TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipments (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  line_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'packing',
  carton_fee_hkd INTEGER NOT NULL DEFAULT 0,
  freight_fee_hkd INTEGER,
  tracking_no TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE value_added_services (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  fee_hkd INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aftersales_requests (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  order_type TEXT NOT NULL,
  order_id TEXT NOT NULL,
  request_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT
);

CREATE INDEX idx_procurement_member_status ON procurement_orders(member_id, status);
CREATE INDEX idx_auction_member_status ON auction_orders(member_id, status);
CREATE INDEX idx_packages_member_status ON inbound_packages(member_id, status);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
