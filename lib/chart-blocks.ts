import { LIVE_BLOCKS, blockPath, blockRegistryName } from '@/lib/block-catalog';

/**
 * The chart library, read out of the block catalog.
 *
 * Charts used to be their own section under /charts, with lib/chart-library.ts
 * as a second catalog beside the blocks one. They are blocks now — anchored
 * specimens on /blocks/charts — so the catalog is the only source, and nav,
 * search and llms.txt all derive from it rather than from a parallel list.
 */
export const CHART_BLOCKS = LIVE_BLOCKS.filter((block) => block.category === 'charts');

export const CHARTS_CATEGORY_PATH = '/blocks/charts';

export function chartBlockPath(slug: string) {
  return blockPath('charts', slug);
}

export function findChartBlock(slug: string) {
  return CHART_BLOCKS.find((block) => block.slug === slug);
}

/** Resolves a registry item name — `area-chart` — back to its anchor on the page. */
export function chartPathForRegistryName(name: string) {
  const block = CHART_BLOCKS.find((chart) => blockRegistryName(chart) === name);
  return block ? chartBlockPath(block.slug) : null;
}
