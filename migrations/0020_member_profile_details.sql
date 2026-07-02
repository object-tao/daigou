CREATE TABLE IF NOT EXISTS member_profile_details (
  member_id TEXT PRIMARY KEY REFERENCES members(id),
  real_name TEXT,
  phone TEXT,
  whatsapp TEXT,
  country_region TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'zh-Hant',
  notes TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO member_profile_details (
  member_id, real_name, phone, whatsapp, country_region, preferred_language, notes
) VALUES (
  'demo-member', '', '', '', '香港', 'zh-Hant', ''
);
