CREATE TABLE IF NOT EXISTS warehouses (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '日本',
  postal_code TEXT,
  address TEXT NOT NULL,
  phone TEXT,
  contact_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  is_default INTEGER NOT NULL DEFAULT 0,
  allow_inbound INTEGER NOT NULL DEFAULT 1,
  allow_outbound INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 100,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_warehouses_status ON warehouses(status);
CREATE INDEX IF NOT EXISTS idx_warehouses_sort ON warehouses(sort_order, created_at);

INSERT OR IGNORE INTO warehouses (
  id, code, name, type, country, postal_code, address, phone, contact_name,
  status, is_default, allow_inbound, allow_outbound, sort_order, remarks
) VALUES
  ('funabashi', 'FUNABASHI', '船橋集運倉', '集運倉', '日本', '273-0000', '千葉県船橋市', '', '倉庫主管', 'active', 1, 1, 1, 10, '默認最終出發集運倉'),
  ('tokyo', 'TOKYO01', '東京新橋門市', '門市', '日本', '105-0000', '東京都港区新橋', '', '門市主管', 'active', 0, 1, 0, 20, '東京門市，可按需停用或調整');

UPDATE staff_roles
   SET permissions_json = REPLACE(permissions_json, '"admin:inbound-scan"', '"admin:warehouses","admin:inbound-scan"')
 WHERE permissions_json LIKE '%"admin:inbound-scan"%'
   AND permissions_json NOT LIKE '%"admin:warehouses"%';
