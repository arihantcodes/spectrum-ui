import blockCatalog from '@/content/block-catalog.json';

/**
 * Blocks are the tier above components: composed interface sections built from
 * several components, installed whole.
 *
 * This file is the single source of truth for the Blocks section, the same way
 * lib/component-catalog.ts is for components. Categories are derived from the
 * data — never hardcode a category list in a page.
 */

export interface BlockCategory {
  slug: string;
  name: string;
  /** One line, used under the category heading. */
  tagline: string;
  /** Prose for the category page and its meta description. */
  description: string;
  order: number;
  /**
   * `wide` widens the specimen column past 760px and switches the stage to a
   * bleed — no padding, no centring. Page-width sections (pricing tables,
   * footers, navbars) read as cards when floated in a padded letterbox.
   */
  layout?: 'default' | 'wide';
}

export interface BlockCatalogItem {
  slug: string;
  name: string;
  /** Slug of a BlockCategory. */
  category: string;
  subcategory: string;
  /** One line, used on cards and in meta descriptions. */
  description: string;
  /** Two or three sentences for the detail page and JSON-LD. */
  summary: string;
  /** What makes this hard to build well — the reason to copy ours. */
  hardParts: string[];
  variants: string[];
  complexity: 'simple' | 'composed' | 'advanced';
  /** Spectrum or shadcn components this block is built from. */
  composedOf: string[];
  dependencies: string[];
  /**
   * Written for a model, not a reader: when to reach for this block and what it
   * does not do. Surfaced through the MCP server.
   */
  aiHints: string;
  /** Stable catalog number — drives the "01 / 08" label on cards. */
  index: number;
  /** ISO date the block shipped. Feeds JSON-LD dateCreated and llms.txt. */
  addedAt: string;
  /**
   * `planned` entries are the roadmap: they exist in the catalog so ordering and
   * numbering stay stable, but no page or card renders for them. Flip to `live`
   * in the same commit that adds the block, its preview, and its registry item —
   * that way the site never advertises something you cannot install.
   */
  status: 'live' | 'planned';
}

const catalog = blockCatalog as {
  categories: BlockCategory[];
  blocks: BlockCatalogItem[];
};

export const BLOCK_CATEGORIES: readonly BlockCategory[] = [...catalog.categories].sort(
  (a, b) => a.order - b.order,
);

export const BLOCK_CATALOG: readonly BlockCatalogItem[] = [...catalog.blocks].sort(
  (a, b) => a.index - b.index,
);

export function blocksIndexPath() {
  return '/blocks';
}

export function blockCategoryPath(categorySlug: string) {
  return `/blocks/${categorySlug}`;
}

/**
 * Blocks live as anchored sections on their category's specimen page — one
 * scrolling page of live, full-size previews — not as separate routes.
 */
export function blockPath(categorySlug: string, blockSlug: string) {
  return `/blocks/${categorySlug}#${blockSlug}`;
}

export function findBlockCategory(categorySlug: string) {
  return BLOCK_CATEGORIES.find((category) => category.slug === categorySlug);
}

/** Only resolves live blocks, so planned slugs 404 rather than render empty. */
export function findBlock(categorySlug: string, blockSlug: string) {
  return LIVE_BLOCKS.find((block) => block.category === categorySlug && block.slug === blockSlug);
}

/** Every block that is actually installable. This is what pages render. */
export const LIVE_BLOCKS: readonly BlockCatalogItem[] = BLOCK_CATALOG.filter(
  (block) => block.status === 'live',
);

export function blocksInCategory(categorySlug: string) {
  return LIVE_BLOCKS.filter((block) => block.category === categorySlug);
}

/** Includes planned entries — for roadmap copy, not for cards. */
export function allBlocksInCategory(categorySlug: string) {
  return BLOCK_CATALOG.filter((block) => block.category === categorySlug);
}

/**
 * Anchor id for a subcategory heading.
 *
 * Lives here rather than beside the rail: the rail is a client component, and a
 * function exported from a `'use client'` module becomes a client reference, so
 * calling it during server render throws.
 */
export function subcategoryAnchor(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Subcategories in the order their first block appears, for in-page grouping. */
export function subcategoriesInCategory(categorySlug: string) {
  const seen: string[] = [];
  for (const block of blocksInCategory(categorySlug)) {
    if (!seen.includes(block.subcategory)) seen.push(block.subcategory);
  }
  return seen;
}

/** Previous and next block within a category, for the detail-page pager. */
export function blockNeighbours(categorySlug: string, blockSlug: string) {
  const siblings = blocksInCategory(categorySlug);
  const position = siblings.findIndex((block) => block.slug === blockSlug);
  if (position === -1) return { previous: undefined, next: undefined };
  return {
    previous: position > 0 ? siblings[position - 1] : undefined,
    next: position < siblings.length - 1 ? siblings[position + 1] : undefined,
  };
}
