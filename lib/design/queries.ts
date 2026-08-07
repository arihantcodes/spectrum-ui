import "server-only";

import { unstable_cache } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase-admin";
import type { DesignSectionSlug } from "@/content/design-taxonomy";
import type {
  DesignItem,
  DesignMedia,
  FeedQuery,
  FeedResult,
} from "./types";

export const DESIGN_PAGE_SIZE = 60;

/**
 * "The gallery isn't provisioned yet" rather than "something is broken", so
 * /design renders a setup state instead of a 500 before design-schema.sql has
 * been applied.
 *
 * Two families of code matter here: raw Postgres (42P01 undefined_table, 42703
 * undefined_column) and PostgREST's own schema-cache miss (PGRST205), which is
 * what Supabase actually returns for a missing table — it never surfaces 42P01.
 */
const NOT_PROVISIONED = new Set(["42P01", "42703", "PGRST205", "PGRST204"]);

function isNotProvisioned(error: { code?: string; message?: string }): boolean {
  if (error.code && NOT_PROVISIONED.has(error.code)) return true;
  return /could not find the table|schema cache|does not exist/i.test(
    error.message ?? "",
  );
}

const ITEM_COLUMNS = `
  id, slug, short_id, section, title, description, status, staff_pick, published_at,
  author_name, author_handle, author_avatar, author_url, source_url, source_platform,
  categories, facet_style, facet_color, facet_interaction, related_components,
  impressions, outbound_clicks, score
`;

function mapMedia(row: any): DesignMedia {
  return {
    id: row.id,
    itemId: row.item_id,
    position: row.position ?? 0,
    kind: row.kind ?? "image",
    width: row.width,
    height: row.height,
    blurhash: row.blurhash ?? null,
    dominantColor: row.dominant_color ?? null,
    srcSet: (row.src_set ?? {}) as Record<string, string>,
    videoUrl: row.video_url ?? null,
    videoWebm: row.video_webm ?? null,
    posterUrl: row.poster_url ?? null,
    durationMs: row.duration_ms ?? null,
  };
}

function mapItem(row: any, media: DesignMedia[]): DesignItem {
  return {
    id: row.id,
    slug: row.slug,
    shortId: row.short_id,
    section: row.section as DesignSectionSlug,
    title: row.title,
    description: row.description,
    status: row.status,
    staffPick: !!row.staff_pick,
    publishedAt: row.published_at ?? null,
    authorName: row.author_name,
    authorHandle: row.author_handle ?? null,
    authorAvatar: row.author_avatar ?? null,
    authorUrl: row.author_url ?? null,
    sourceUrl: row.source_url,
    sourcePlatform: row.source_platform ?? "web",
    categories: row.categories ?? [],
    facetStyle: row.facet_style ?? [],
    facetColor: row.facet_color ?? [],
    facetInteraction: row.facet_interaction ?? [],
    relatedComponents: row.related_components ?? [],
    impressions: row.impressions ?? 0,
    outboundClicks: row.outbound_clicks ?? 0,
    score: row.score ?? 0,
    media,
  };
}

/** Attach ordered media to a set of items in one round trip (no N+1). */
async function attachMedia(rows: any[]): Promise<DesignItem[]> {
  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.id);
  const { data: mediaRows, error } = await supabaseAdmin
    .from("design_media")
    .select("*")
    .in("item_id", ids)
    .order("position", { ascending: true });

  if (error && !isNotProvisioned(error)) {
    console.error("[design] media fetch failed:", error.message);
  }

  const byItem = new Map<string, DesignMedia[]>();
  for (const m of mediaRows ?? []) {
    const mapped = mapMedia(m);
    const list = byItem.get(mapped.itemId);
    if (list) list.push(mapped);
    else byItem.set(mapped.itemId, [mapped]);
  }

  return rows.map((r) => mapItem(r, byItem.get(r.id) ?? []));
}

/**
 * Cursor-paginated feed.
 *
 * Note on the cursor: Supabase/PostgREST has no keyset-pagination helper, so
 * this uses `.range()` with an offset encoded in the cursor. That is correct
 * and cheap at the page depths a gallery actually reaches; if the feed ever
 * gets deep enough for offset scanning to hurt, switch to a keyset predicate
 * on (published_at, id).
 */
const getFeedUncached = async (
  section: DesignSectionSlug,
  category: string | undefined,
  sort: NonNullable<FeedQuery["sort"]>,
  cursor: string | undefined,
  limit: number,
): Promise<FeedResult> => {
  const offset = cursor ? Number.parseInt(cursor, 10) || 0 : 0;

  try {
    let q = supabaseAdmin
      .from("design_items")
      .select(ITEM_COLUMNS)
      .eq("section", section)
      .eq("status", "published");

    if (category) {
      // GIN-indexed array containment.
      q = q.contains("categories", [category]);
    }

    if (sort === "popular") {
      q = q.order("score", { ascending: false });
    } else if (sort === "staff") {
      q = q
        .order("staff_pick", { ascending: false })
        .order("published_at", { ascending: false, nullsFirst: false });
    } else {
      q = q.order("published_at", { ascending: false, nullsFirst: false });
    }

    // Fetch one extra row to know whether another page exists.
    const { data, error } = await q.range(offset, offset + limit);

    if (error) {
      if (isNotProvisioned(error)) {
        // Expected before design-schema.sql is applied — not an error.
        return { items: [], nextCursor: null, unavailable: true };
      }
      console.error("[design] feed query failed:", error.message);
      return { items: [], nextCursor: null, unavailable: false };
    }

    const rows = data ?? [];
    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;
    const items = await attachMedia(page);

    return {
      items,
      nextCursor: hasMore ? String(offset + limit) : null,
      unavailable: false,
    };
  } catch (err) {
    console.error("[design] feed query threw:", err);
    return { items: [], nextCursor: null, unavailable: true };
  }
};

/**
 * Cached feed reader. unstable_cache keys on the argument list, so each
 * (section, category, sort, page) combination gets its own entry.
 *
 * This wrapper is what keeps the gallery routes statically renderable: an
 * uncached Supabase call inside a page opts that route out of ISR entirely.
 * Publishing an item should call revalidateTag("design-items").
 */
const getFeedCached = unstable_cache(getFeedUncached, ["design-feed"], {
  revalidate: 300,
  tags: ["design-items"],
});

export async function getFeed(query: FeedQuery): Promise<FeedResult> {
  const {
    section,
    category,
    sort = "recent",
    cursor,
    limit = DESIGN_PAGE_SIZE,
  } = query;
  return getFeedCached(section, category, sort, cursor, limit);
}

/** Single item by slug, for /design/i/[slug]. */
export async function getItemBySlug(slug: string): Promise<DesignItem | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("design_items")
      .select(ITEM_COLUMNS)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    const [item] = await attachMedia([data]);
    return item ?? null;
  } catch {
    return null;
  }
}

/** Published slugs for sitemap + generateStaticParams. Never throws. */
export async function getPublishedSlugs(): Promise<
  { slug: string; publishedAt: string | null }[]
> {
  try {
    const { data, error } = await supabaseAdmin
      .from("design_items")
      .select("slug, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data.map((r) => ({ slug: r.slug, publishedAt: r.published_at ?? null }));
  } catch {
    return [];
  }
}

/**
 * Section counts for the sidebar.
 *
 * Wrapped in unstable_cache because this runs in the /design layout, and an
 * uncached async call there opts the entire subtree out of static rendering —
 * every gallery route would become dynamic and lose ISR. Caching it keeps the
 * feed and all category pages statically renderable, which the LCP budget needs.
 */
export const getSectionCounts = unstable_cache(
  async (): Promise<Record<string, number>> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("design_items")
        .select("section")
        .eq("status", "published");

      if (error || !data) return {};
      return data.reduce<Record<string, number>>((acc, r) => {
        acc[r.section] = (acc[r.section] ?? 0) + 1;
        return acc;
      }, {});
    } catch {
      return {};
    }
  },
  ["design-section-counts"],
  { revalidate: 300, tags: ["design-items"] },
);
