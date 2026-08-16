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
  /** ISO date the block shipped. Drives the self-expiring New badge. */
  addedAt: string;
  /**
   * `planned` entries are the roadmap: they exist in the catalog so ordering and
   * numbering stay stable, but no page or card renders for them. Flip to `live`
   * in the same commit that adds the block, its preview, and its registry item —
   * that way the site never advertises something you cannot install.
   */
  status: 'live' | 'planned';
  /**
   * Path to the installable source, relative to the repo root. Defaults to
   * `components/spectrumui/blocks/{category}/{slug}.tsx`.
   */
  sourceFile?: string;
  /**
   * How the specimen stage should present this block. `full-bleed` is for
   * page-width sections (footers) with a per-preview device toolbar.
   */
  stage?: 'centered' | 'full-bleed';
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

/** The install command shown on cards and detail pages. */
export function blockCliCommand(blockSlug: string) {
  return `npx shadcn@latest add @spectrumui/${blockSlug}`;
}

/** File the CLI copies — used by the specimen source reader and code drawer. */
export function blockSourcePath(block: BlockCatalogItem) {
  return (
    block.sourceFile ??
    `components/spectrumui/blocks/${block.category}/${block.slug}.tsx`
  );
}

export function categoryHasFullBleed(categorySlug: string) {
  return blocksInCategory(categorySlug).some((block) => block.stage === 'full-bleed');
}

export function findBlockCategory(categorySlug: string) {
  return BLOCK_CATEGORIES.find((category) => category.slug === categorySlug);
}

/** Only resolves live blocks, so planned slugs 404 rather than render empty. */
export function findBlock(categorySlug: string, blockSlug: string) {
  return LIVE_BLOCKS.find(
    (block) => block.category === categorySlug && block.slug === blockSlug,
  );
}

/** Every block that is actually installable. This is what pages render. */
export const LIVE_BLOCKS: readonly BlockCatalogItem[] = BLOCK_CATALOG.filter(
  (block) => block.status === 'live',
);

export function blocksInCategory(categorySlug: string) {
  return LIVE_BLOCKS.filter((block) => block.category === categorySlug);
}

/** How long a block wears its New badge. */
const NEW_FOR_DAYS = 30;

/**
 * Blocks that shipped recently enough to badge.
 *
 * Returns nothing when *every* block is new — during a launch the badge marks
 * all 27 and therefore distinguishes none, so it is only noise. It starts
 * earning its place the moment some blocks are older than others, and expires
 * on its own so the catalog never accumulates stale badges the way the
 * component sidebar did.
 */
export function newBlockSlugs(now: Date = new Date()): ReadonlySet<string> {
  const cutoff = now.getTime() - NEW_FOR_DAYS * 24 * 60 * 60 * 1000;
  const recent = LIVE_BLOCKS.filter(
    (block) => new Date(`${block.addedAt}T00:00:00Z`).getTime() >= cutoff,
  );
  if (recent.length === LIVE_BLOCKS.length) return new Set();
  return new Set(recent.map((block) => block.slug));
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
