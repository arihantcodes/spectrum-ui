import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultMarketHeatmapDemo from './demos/default';
import SectorMarketHeatmapDemo from './demos/sectors';

const chart = findChartBySlug('heatmap');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'market heatmap',
    'treemap React',
    'sector performance',
    'finviz style map',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/heatmap`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="heatmap"
      examples={[
        {
          title: 'Crypto market map',
          path: 'app/charts/(library)/heatmap/demos/default.tsx',
          node: <DefaultMarketHeatmapDemo />,
        },
        {
          title: 'S&P 500 sectors',
          path: 'app/charts/(library)/heatmap/demos/sectors.tsx',
          node: <SectorMarketHeatmapDemo />,
        },
      ]}
    />
  );
}
