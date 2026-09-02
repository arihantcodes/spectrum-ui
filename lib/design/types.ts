import type { DesignSectionSlug } from "@/content/design-taxonomy";

export type DesignStatus = "draft" | "published" | "hidden";
export type DesignSourcePlatform = "x" | "instagram" | "dribbble" | "web" | "other";
export type DesignMediaKind = "image" | "video";

/** Map of rendered width -> public R2 URL, e.g. { "480": "https://…" }. */
export type SrcSet = Record<string, string>;

export interface DesignMedia {
  id: string;
  itemId: string;
  position: number;
  kind: DesignMediaKind;
  /** Required. The feed reserves space from this ratio, which is what keeps CLS at ~0. */
  width: number;
  height: number;
  blurhash: string | null;
  dominantColor: string | null;
  srcSet: SrcSet;
  videoUrl: string | null;
  videoWebm: string | null;
  posterUrl: string | null;
  durationMs: number | null;
}

export interface DesignItem {
  id: string;
  slug: string;
  shortId: string;
  section: DesignSectionSlug;
  title: string;
  description: string;
  status: DesignStatus;
  staffPick: boolean;
  publishedAt: string | null;

  authorName: string;
  authorHandle: string | null;
  authorAvatar: string | null;
  authorUrl: string | null;
  sourceUrl: string;
  sourcePlatform: DesignSourcePlatform;

  categories: string[];
  facetStyle: string[];
  facetColor: string[];
  facetInteraction: string[];
  relatedComponents: string[];

  impressions: number;
  outboundClicks: number;
  score: number;

  media: DesignMedia[];
}

export type DesignSort = "recent" | "staff" | "popular";

export interface FeedQuery {
  section: DesignSectionSlug;
  category?: string;
  sort?: DesignSort;
  /** Cursor is the previous page's last item id. */
  cursor?: string;
  limit?: number;
}

export interface FeedResult {
  items: DesignItem[];
  nextCursor: string | null;
  /** True when the gallery tables are not provisioned yet. Lets the UI show
   *  a setup state instead of an error, so /design renders before any data. */
  unavailable: boolean;
}
