-- Spectrum Design — gallery schema
-- Run this in Supabase before enabling the /design section.
--
-- Design notes (deliberate departures from the original Prisma sketch):
--
--  * Categories and facets are NOT tables. The taxonomy lives in code at
--    content/design-taxonomy.ts so that category routes are statically
--    generatable and every /design/c/<slug> page renders (with its SEO intro
--    copy) before a single row exists. Items reference them as text[] slugs,
--    which Postgres indexes well with GIN and which removes four join tables.
--
--  * Enums are CHECK constraints rather than Postgres ENUM types. Adding a
--    value to a real ENUM requires ALTER TYPE and cannot run inside a
--    transaction on older Postgres; a CHECK is edited with one statement.
--
--  * Media lives in its own table because a single item can be an ordered
--    slide set (app store screenshots, carousels).

CREATE TABLE IF NOT EXISTS design_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  short_id        TEXT NOT NULL UNIQUE,            -- 7-char nanoid, prefixes the slug
  section         TEXT NOT NULL CHECK (section IN (
                    'feed','websites','og-images','app-screenshots','app-icons','showcase'
                  )),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,                   -- 1-3 original sentences, indexable
  status          TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','published','hidden')),
  staff_pick      BOOLEAN NOT NULL DEFAULT FALSE,
  published_at    TIMESTAMPTZ,

  -- Attribution. Never publish without it.
  author_name     TEXT NOT NULL,
  author_handle   TEXT,
  author_avatar   TEXT,
  author_url      TEXT,
  source_url      TEXT NOT NULL,
  source_platform TEXT NOT NULL DEFAULT 'web'
                    CHECK (source_platform IN ('x','instagram','dribbble','web','other')),

  -- Taxonomy: slugs validated against content/design-taxonomy.ts, not the DB.
  categories      TEXT[] NOT NULL DEFAULT '{}',
  facet_style     TEXT[] NOT NULL DEFAULT '{}',
  facet_color     TEXT[] NOT NULL DEFAULT '{}',
  facet_interaction TEXT[] NOT NULL DEFAULT '{}',

  -- The wedge: which Spectrum UI components could rebuild this.
  related_components TEXT[] NOT NULL DEFAULT '{}',

  impressions     INTEGER NOT NULL DEFAULT 0,
  outbound_clicks INTEGER NOT NULL DEFAULT 0,
  score           DOUBLE PRECISION NOT NULL DEFAULT 0,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Feed reads are always (section, status) filtered then ordered. These two
-- cover "Recent" and "Popular"; the partial predicate keeps drafts out of the
-- index entirely so it stays small as the draft queue grows.
CREATE INDEX IF NOT EXISTS idx_design_items_recent
  ON design_items (section, published_at DESC)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_design_items_score
  ON design_items (section, score DESC)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_design_items_categories
  ON design_items USING GIN (categories);

CREATE INDEX IF NOT EXISTS idx_design_items_slug ON design_items (slug);

CREATE TABLE IF NOT EXISTS design_media (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id        UUID NOT NULL REFERENCES design_items(id) ON DELETE CASCADE,
  position       INTEGER NOT NULL DEFAULT 0,
  kind           TEXT NOT NULL DEFAULT 'image' CHECK (kind IN ('image','video')),

  -- width/height are REQUIRED: the feed reserves space from the stored aspect
  -- ratio, which is what makes CLS ~0. Never insert media without them.
  width          INTEGER NOT NULL,
  height         INTEGER NOT NULL,
  blurhash       TEXT,
  dominant_color TEXT,

  -- R2 public URLs. src_set maps width -> url, e.g. {"480":"...","1080":"..."}
  src_set        JSONB NOT NULL DEFAULT '{}'::jsonb,
  video_url      TEXT,
  video_webm     TEXT,
  poster_url     TEXT,
  duration_ms    INTEGER,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (item_id, position)
);

CREATE INDEX IF NOT EXISTS idx_design_media_item ON design_media (item_id, position);

-- Tracked outbound redirects for /go/[code].
CREATE TABLE IF NOT EXISTS design_outbound_links (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code       TEXT NOT NULL UNIQUE,
  target     TEXT NOT NULL,
  kind       TEXT NOT NULL CHECK (kind IN ('sponsor','tool','job','source','item')),
  ref_id     UUID,
  clicks     INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_design_outbound_code ON design_outbound_links (code);

-- Admin gating. NextAuth owns sessions; this column is read in the jwt callback
-- and surfaced on the session, the same way github_username already is.
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
  CHECK (role IN ('user','admin'));

-- Row Level Security: the app reads through the service-role key server-side,
-- so RLS is a backstop against the anon key ever being pointed at these tables.
ALTER TABLE design_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_outbound_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS design_items_public_read ON design_items;
CREATE POLICY design_items_public_read ON design_items
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS design_media_public_read ON design_media;
CREATE POLICY design_media_public_read ON design_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM design_items i
      WHERE i.id = design_media.item_id AND i.status = 'published'
    )
  );
