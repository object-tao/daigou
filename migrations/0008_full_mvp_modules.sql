PRAGMA foreign_keys = ON;

CREATE TABLE auth_credentials (
  id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL CHECK(actor_type IN ('member', 'staff')),
  actor_id TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(actor_type, actor_id)
);

CREATE TABLE auth_sessions (
  id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL CHECK(actor_type IN ('member', 'staff')),
  actor_id TEXT NOT NULL,
  role_name TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_role_permissions (
  id TEXT PRIMARY KEY,
  role_name TEXT NOT NULL,
  module_key TEXT NOT NULL,
  can_read INTEGER NOT NULL DEFAULT 1,
  can_write INTEGER NOT NULL DEFAULT 0,
  UNIQUE(role_name, module_key)
);

CREATE TABLE storage_objects (
  id TEXT PRIMARY KEY,
  owner_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  storage_key TEXT NOT NULL,
  public_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auction_order_packages (
  id TEXT PRIMARY KEY,
  auction_order_id TEXT NOT NULL REFERENCES auction_orders(id),
  package_id TEXT NOT NULL REFERENCES inbound_packages(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(auction_order_id, package_id)
);

CREATE TABLE consolidation_requests (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  requested_by TEXT NOT NULL DEFAULT 'member',
  package_ids_json TEXT NOT NULL,
  options_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending_review',
  shipment_id TEXT REFERENCES shipments(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE freight_quotes (
  id TEXT PRIMARY KEY,
  shipment_id TEXT NOT NULL REFERENCES shipments(id),
  actual_weight_gram INTEGER NOT NULL DEFAULT 0,
  volumetric_weight_gram INTEGER NOT NULL DEFAULT 0,
  billing_weight_gram INTEGER NOT NULL DEFAULT 0,
  rate_per_kg_hkd INTEGER NOT NULL DEFAULT 0,
  freight_fee_hkd INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupon_redemptions (
  id TEXT PRIMARY KEY,
  coupon_id TEXT NOT NULL REFERENCES coupons(id),
  member_id TEXT NOT NULL REFERENCES members(id),
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  discount_hkd INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE point_redemptions (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id),
  bucket TEXT NOT NULL,
  points INTEGER NOT NULL,
  reward_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO auth_credentials (
  id, actor_type, actor_id, email, password_salt, password_hash
) VALUES
  ('cred-member-demo', 'member', 'demo-member', 'demo@droppilot.net', 'member-demo-salt', '752da39b262aa2b6f853ce8b8eff11e598062686dfc6395264428dc9dd7e5c40'),
  ('cred-admin-demo', 'staff', 'staff-admin-demo', 'admin@droppilot.net', 'admin-demo-salt', 'f96355bd16dcb1b9303a56d6aa91bd6b69fd9927ef778a3817f9a5b33fdd5d9a'),
  ('cred-finance-demo', 'staff', 'staff-finance-demo', 'finance@droppilot.net', 'finance-demo-salt', 'ead0eefefa37b45c853d346d5ea85301429087a5c66a39e5e9f93ee889346112');

INSERT OR IGNORE INTO staff_users (id, email, display_name, role_id, status) VALUES
  ('staff-warehouse-demo', 'warehouse@droppilot.net', 'Demo Warehouse', 'role-warehouse', 'active');

INSERT OR IGNORE INTO auth_credentials (
  id, actor_type, actor_id, email, password_salt, password_hash
) VALUES
  ('cred-warehouse-demo', 'staff', 'staff-warehouse-demo', 'warehouse@droppilot.net', 'warehouse-demo-salt', '80c24b09d54b27fe5d0b31708da2e4f135429d0244fdf5d3a63e3bb25b799890');

INSERT OR IGNORE INTO admin_role_permissions (id, role_name, module_key, can_read, can_write) VALUES
  ('perm-super-all', 'super_admin', '*', 1, 1),
  ('perm-cs-members', 'customer_service', 'members', 1, 1),
  ('perm-cs-procurement', 'customer_service', 'procurement', 1, 1),
  ('perm-cs-auction', 'customer_service', 'auction', 1, 1),
  ('perm-cs-support', 'customer_service', 'support', 1, 1),
  ('perm-cs-aftersales', 'customer_service', 'aftersales', 1, 1),
  ('perm-wh-warehouse', 'warehouse', 'warehouse', 1, 1),
  ('perm-wh-shipments', 'warehouse', 'shipments', 1, 1),
  ('perm-wh-value-added', 'warehouse', 'value_added', 1, 1),
  ('perm-finance', 'finance', 'finance', 1, 1),
  ('perm-finance-procurement', 'finance', 'procurement', 1, 1),
  ('perm-operator-content', 'operator', 'content', 1, 1),
  ('perm-operator-growth', 'operator', 'growth', 1, 1),
  ('perm-operator-rules', 'operator', 'rules', 1, 1);

INSERT OR IGNORE INTO coupons (id, code, name, rule_json, status) VALUES
  ('coupon-demo-30', 'WELCOME30', 'Welcome HKD 30', '{"discountHkd":30,"minimumSpendHkd":300}', 'active');

INSERT OR IGNORE INTO group_buy_campaigns (
  id, title, supplier_name, target_quantity, current_quantity, organizer_member_id, reward_rule_json, status
) VALUES (
  'gb-demo-1',
  'Demo supplier group buy',
  'Tokyo supplier',
  10,
  3,
  'demo-member',
  '{"organizerReward":"free_item_after_target","couponLimitedAfterJoin":true}',
  'active'
);

CREATE INDEX idx_auth_sessions_actor ON auth_sessions(actor_type, actor_id, expires_at);
CREATE INDEX idx_auth_sessions_expiry ON auth_sessions(expires_at);
CREATE INDEX idx_consolidation_member_status ON consolidation_requests(member_id, status);
CREATE INDEX idx_freight_quotes_shipment ON freight_quotes(shipment_id, status);
CREATE INDEX idx_storage_owner ON storage_objects(owner_type, owner_id);
