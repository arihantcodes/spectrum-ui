import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultSparklineDemo from './demos/default';
import AreaSparklineDemo from './demos/area';
import WatchlistDemo from './demos/watchlist';

const chart = findChartBySlug('sparkline');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'watchlist', 'token table', 'React sparkline', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/sparkline`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="sparkline"
      examples={[
        {
          title: 'Line',
          path: 'app/charts/(library)/sparkline/demos/default.tsx',
          node: <DefaultSparklineDemo />,
        },
        {
          title: 'filled',
          path: 'app/charts/(library)/sparkline/demos/area.tsx',
          node: <AreaSparklineDemo />,
        },
        {
          title: 'Watchlist',
          path: 'app/charts/(library)/sparkline/demos/watchlist.tsx',
          node: <WatchlistDemo />,
        },
      ]}
    />
  );
}
