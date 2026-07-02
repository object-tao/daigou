ALTER TABLE warehouses ADD COLUMN free_storage_days INTEGER NOT NULL DEFAULT 30;
ALTER TABLE warehouses ADD COLUMN storage_fee_hkd_per_day INTEGER NOT NULL DEFAULT 0;
