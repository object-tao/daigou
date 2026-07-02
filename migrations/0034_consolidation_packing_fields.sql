ALTER TABLE consolidation_batches ADD COLUMN weight_kg REAL;
ALTER TABLE consolidation_batches ADD COLUMN length_cm REAL;
ALTER TABLE consolidation_batches ADD COLUMN width_cm REAL;
ALTER TABLE consolidation_batches ADD COLUMN height_cm REAL;
ALTER TABLE consolidation_batches ADD COLUMN international_tracking_no TEXT;
ALTER TABLE consolidation_batches ADD COLUMN logistics_product_name TEXT;
ALTER TABLE consolidation_batches ADD COLUMN shipping_fee_hkd REAL NOT NULL DEFAULT 0;
