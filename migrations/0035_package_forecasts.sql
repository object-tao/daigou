CREATE TABLE IF NOT EXISTS package_forecasts (
  id TEXT PRIMARY KEY,
  forecast_no TEXT NOT NULL UNIQUE,
  member_id TEXT NOT NULL REFERENCES members(id),
  tracking_no TEXT NOT NULL,
  carrier_name TEXT NOT NULL,
  source_type TEXT,
  source_name TEXT,
  item_name TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  remarks TEXT,
  expected_arrival_date TEXT,
  status TEXT NOT NULL DEFAULT 'forecasted',
  matched_inbound_package_id TEXT REFERENCES inbound_packages(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TEXT,
  matched_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_package_forecasts_member_updated ON package_forecasts(member_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_package_forecasts_tracking ON package_forecasts(tracking_no);
CREATE INDEX IF NOT EXISTS idx_package_forecasts_status ON package_forecasts(status, updated_at);
