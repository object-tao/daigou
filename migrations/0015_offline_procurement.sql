ALTER TABLE procurement_orders ADD COLUMN order_type TEXT NOT NULL DEFAULT 'online';
ALTER TABLE procurement_orders ADD COLUMN store_name TEXT;
ALTER TABLE procurement_orders ADD COLUMN store_contact TEXT;
ALTER TABLE procurement_orders ADD COLUMN store_phone TEXT;
ALTER TABLE procurement_orders ADD COLUMN store_address TEXT;
ALTER TABLE procurement_orders ADD COLUMN currency TEXT NOT NULL DEFAULT 'JPY';

CREATE TABLE IF NOT EXISTS procurement_order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES procurement_orders(id),
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL,
  spec TEXT,
  color TEXT,
  unit_price_jpy INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  image_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_procurement_items_order ON procurement_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_procurement_order_type_updated ON procurement_orders(order_type, updated_at);
