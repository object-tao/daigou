CREATE TABLE IF NOT EXISTS staff_departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff_roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  permissions_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff_accounts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  department_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES staff_departments(id),
  FOREIGN KEY (role_id) REFERENCES staff_roles(id)
);

CREATE INDEX IF NOT EXISTS idx_staff_accounts_department ON staff_accounts(department_id);
CREATE INDEX IF NOT EXISTS idx_staff_accounts_role ON staff_accounts(role_id);
CREATE INDEX IF NOT EXISTS idx_staff_accounts_status ON staff_accounts(status);

INSERT OR IGNORE INTO staff_departments (id, name) VALUES
  ('customer-service', '客服部'),
  ('warehouse', '倉庫部'),
  ('finance', '財務部'),
  ('operations', '營運管理部');

INSERT OR IGNORE INTO staff_roles (id, name, description, permissions_json) VALUES
  ('super-admin', '超級管理員', '擁有全部後台菜單權限', '["admin:dashboard","admin:procurement","admin:reports","admin:quote","admin:purchase","admin:auction","admin:negotiation","admin:refund-review","admin:inbound-scan","admin:claim","admin:shelving","admin:consolidation","admin:packing","admin:orphan","admin:value-added","admin:routes","admin:tracking","admin:restrictions","admin:shipping-fees","admin:members","admin:levels","admin:verification","admin:tickets","admin:notifications","admin:topup-review","admin:wallet-adjust","admin:exchange-rate","admin:fee-settings","admin:commission-points","admin:finance-ledger","admin:group-buying","admin:coupons","admin:referral","admin:i18n","admin:seo","admin:staff","admin:roles","admin:audit","admin:dictionary","admin:migration"]'),
  ('customer-service', '客服', '處理會員、工單與通知', '["admin:dashboard","admin:members","admin:tickets","admin:notifications"]'),
  ('warehouse-operator', '倉庫', '處理入庫、認領、上架、合箱與出庫', '["admin:dashboard","admin:inbound-scan","admin:claim","admin:shelving","admin:consolidation","admin:packing","admin:orphan","admin:value-added","admin:tracking"]'),
  ('finance-operator', '財務', '處理充值、退款、費用與財務流水', '["admin:dashboard","admin:topup-review","admin:wallet-adjust","admin:exchange-rate","admin:fee-settings","admin:finance-ledger"]');

INSERT OR IGNORE INTO staff_accounts (id, email, display_name, department_id, role_id, status) VALUES
  ('staff-admin-demo', 'admin@droppilot.net', 'Demo Admin', 'operations', 'super-admin', 'active');
