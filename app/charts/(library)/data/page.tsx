import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import FetchRecipeDemo from './demos/fetch';
import QueryRecipeDemo from './demos/query';
import StreamRecipeDemo from './demos/stream';

const chart = findChartBySlug('data');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'React chart API data',
    'chart with SWR',
    'chart server component',
    'websocket chart React',
    'chart loading error state',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/data`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="data"
      examples={[
        {
          title: 'fetch in an effect — all four outcomes',
          path: 'app/charts/(library)/data/demos/fetch.tsx',
          node: <FetchRecipeDemo />,
        },
        {
          title: 'SWR / React Query — one status expression',
          path: 'app/charts/(library)/data/demos/query.tsx',
          node: <QueryRecipeDemo />,
        },
        {
          title: 'Streaming — seed, append, bound the window',
          path: 'app/charts/(library)/data/demos/stream.tsx',
          node: <StreamRecipeDemo />,
        },
      ]}
    />
  );
}
