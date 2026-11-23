-- lunch-radar D1 schema (Stage 0). Soft-delete via deleted_at; menus/themes as JSON.

CREATE TABLE IF NOT EXISTS places (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT,
  district TEXT,
  area TEXT,
  in_office INTEGER NOT NULL DEFAULT 0,
  in_region INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  subcategory TEXT,
  category_source TEXT CHECK (category_source IN ('rule', 'manual') OR category_source IS NULL),
  naver_category TEXT,
  address TEXT,
  lat REAL,
  lng REAL,
  naver_place_id TEXT,
  naver_url TEXT,
  naver_address TEXT,
  naver_reviews INTEGER,
  naver_score REAL,
  naver_checked_at TEXT,
  kakao_id TEXT,
  kakao_url TEXT,
  kakao_address TEXT,
  rating_score REAL,
  rating_count INTEGER,
  rating_source TEXT,
  rating_url TEXT,
  rating_fetched_at TEXT,
  rating_checked_at TEXT,
  menu TEXT,
  hours TEXT,
  collections TEXT,
  tags TEXT,
  price_range TEXT,
  notes TEXT,
  curated_by TEXT,
  curated_url TEXT,
  walk_meters REAL,
  walk_minutes REAL,
  walk_from_map INTEGER,
  mention_count INTEGER NOT NULL DEFAULT 0,
  legacy_slugs TEXT,
  added_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  deleted_reason TEXT,
  row_version INTEGER NOT NULL DEFAULT 1,
  row_hash TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS places_naver_place_id_uq
  ON places (naver_place_id)
  WHERE naver_place_id IS NOT NULL AND deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS places_kakao_id_uq
  ON places (kakao_id)
  WHERE kakao_id IS NOT NULL AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS places_region_idx ON places (region) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS places_in_office_idx ON places (in_office) WHERE deleted_at IS NULL AND in_office = 1;

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL,
  summary TEXT
);

CREATE TABLE IF NOT EXISTS place_changes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  op TEXT NOT NULL,
  before_hash TEXT,
  after_hash TEXT,
  before_json TEXT,
  after_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES runs (id)
);

CREATE INDEX IF NOT EXISTS place_changes_run_idx ON place_changes (run_id);
CREATE INDEX IF NOT EXISTS place_changes_slug_idx ON place_changes (slug);
