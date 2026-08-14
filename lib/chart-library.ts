export interface ChartLibraryItem {
  slug: string;
  name: string;
  description: string;
  registryName: string;
}

/** Chart types live on `/charts/<slug>`, not under `/docs`. */
export const CHART_LIBRARY: readonly ChartLibraryItem[] = [
  {
    slug: 'bar',
    name: 'Bar Chart',
    description:
      'Vertical and horizontal bars with hatch, duotone, gradient, stripe, stack, and glow fills.',
    registryName: 'bar-chart',
  },
  {
    slug: 'line',
    name: 'Line Chart',
    description: 'Multi-series lines with solid, dashed, bump, step, gradient, and glow strokes.',
    registryName: 'line-chart',
  },
  {
    slug: 'area',
    name: 'Area Chart',
    description: 'Filled areas with gradient, hatch, dotted, stacked, and dashed-stroke variants.',
    registryName: 'area-chart',
  },
  {
    slug: 'pie',
    name: 'Pie Chart',
    description: 'Pie and donut charts with padded sectors, labels, and optional sector glow.',
    registryName: 'pie-chart',
  },
  {
    slug: 'radar',
    name: 'Radar Chart',
    description: 'Radar plots with filled or outline series, circle grids, and glow.',
    registryName: 'radar-chart',
  },
  {
    slug: 'radial',
    name: 'Radial Chart',
    description: 'Full and semi-circle radial bars for share and progress.',
    registryName: 'radial-chart',
  },
  {
    slug: 'composed',
    name: 'Composed Chart',
    description: 'Bars, lines, and areas on one plot — mix fills, dashes, and glow per series.',
    registryName: 'composed-chart',
  },
];

export function chartLibraryPath(slug: string) {
  return `/charts/${slug}`;
}

export function findChartBySlug(slug: string) {
  return CHART_LIBRARY.find((chart) => chart.slug === slug);
}

export function findChartByRegistryName(name: string) {
  return CHART_LIBRARY.find((chart) => chart.registryName === name);
}
