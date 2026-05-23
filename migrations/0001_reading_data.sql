-- Reading-data tables for the `finnoybu-com` D1.
-- Mirrors finnoybu-trilogy/src/db/schema.ts so fiction.finnoybu.com and
-- memoirs.finnoybu.com can rebind to this D1 in place of the legacy
-- `finnoybu-trilogy` D1 without their app code changing. Tables are FK-linked
-- to `user.id` (created in 0000_init.sql) so deleting a user cascades.

-- Reading progress — one row per (user, chapter). Synced from localStorage
-- for logged-in users so they can resume across devices.
CREATE TABLE reading_progress (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  chapter_slug TEXT NOT NULL,
  scroll_position REAL NOT NULL DEFAULT 0,
  percent REAL NOT NULL DEFAULT 0,
  last_read_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX reading_progress_user_chapter_uniq
  ON reading_progress (user_id, chapter_slug);
CREATE INDEX reading_progress_user_idx ON reading_progress (user_id);

-- Bookmarks — saved positions inside a chapter. Multi-bookmark per chapter.
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  chapter_slug TEXT NOT NULL,
  scroll_position REAL NOT NULL,
  selection_start INTEGER,
  label TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX bookmarks_user_idx ON bookmarks (user_id);
CREATE INDEX bookmarks_user_chapter_idx ON bookmarks (user_id, chapter_slug);

-- Annotations — personal notes on a text selection.
CREATE TABLE annotations (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  chapter_slug TEXT NOT NULL,
  text_selection TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  selection_start INTEGER,
  selection_end INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX annotations_user_idx ON annotations (user_id);
CREATE INDEX annotations_user_chapter_idx ON annotations (user_id, chapter_slug);

-- Errata reports — readers flagging typos / factual issues / etc.
CREATE TABLE errata_reports (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  chapter_slug TEXT NOT NULL,
  text_selection TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at INTEGER NOT NULL
);
CREATE INDEX errata_user_idx ON errata_reports (user_id);

-- Purchases — Stripe-backed digital downloads. `product_id` is the catalog
-- slug (e.g. `salt-and-silence`, `reminiscences`).
CREATE TABLE purchases (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  created_at INTEGER NOT NULL
);
CREATE INDEX purchases_user_idx ON purchases (user_id);
CREATE INDEX purchases_user_product_idx ON purchases (user_id, product_id);
