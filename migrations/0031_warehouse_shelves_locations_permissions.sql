CREATE TABLE IF NOT EXISTS warehouse_shelves (
  id TEXT PRIMARY KEY,
  warehouse_id TEXT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  area_code TEXT,
  shelf_no TEXT,
  location_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 100,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_warehouse_shelves_unique_code ON warehouse_shelves(warehouse_id, code);
CREATE INDEX IF NOT EXISTS idx_warehouse_shelves_warehouse ON warehouse_shelves(warehouse_id, status, sort_order);

CREATE TABLE IF NOT EXISTS warehouse_locations (
  id TEXT PRIMARY KEY,
  warehouse_id TEXT NOT NULL,
  shelf_id TEXT NOT NULL,
  code TEXT NOT NULL,
  area_code TEXT,
  shelf_no TEXT,
  layer_no INTEGER,
  slot_no INTEGER,
  location_type TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'active',
  max_packages INTEGER,
  max_weight_kg REAL,
  max_volume_cm3 REAL,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (shelf_id) REFERENCES warehouse_shelves(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_warehouse_locations_unique_code ON warehouse_locations(warehouse_id, code);
CREATE INDEX IF NOT EXISTS idx_warehouse_locations_shelf ON warehouse_locations(shelf_id, status);
CREATE INDEX IF NOT EXISTS idx_warehouse_locations_warehouse ON warehouse_locations(warehouse_id, status, location_type);

CREATE TABLE IF NOT EXISTS staff_warehouse_permissions (
  staff_id TEXT NOT NULL,
  warehouse_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (staff_id, warehouse_id),
  FOREIGN KEY (staff_id) REFERENCES staff_accounts(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE INDEX IF NOT EXISTS idx_staff_warehouse_permissions_warehouse ON staff_warehouse_permissions(warehouse_id);

UPDATE staff_roles
   SET permissions_json = REPLACE(permissions_json, '"admin:warehouses"', '"admin:warehouses","admin:shelves","admin:locations"')
 WHERE permissions_json LIKE '%"admin:warehouses"%'
   AND permissions_json NOT LIKE '%"admin:shelves"%';
