import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import ChartStatusSwitcherDemo from './demos/default';
import ChartSkeletonGalleryDemo from './demos/skeletons';
import ChartEmptyAndErrorDemo from './demos/empty';
import ChartStateUsageDemo from './demos/usage';

const chart = findChartBySlug('states');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'chart loading state',
    'chart empty state React',
    'chart skeleton',
    'chart error state',
    'dashboard empty state',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/states`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="states"
      examples={[
        {
          title: 'Every state, same frame height',
          path: 'app/charts/(library)/states/demos/default.tsx',
          node: <ChartStatusSwitcherDemo />,
        },
        {
          title: 'Skeleton variants',
          path: 'app/charts/(library)/states/demos/skeletons.tsx',
          node: <ChartSkeletonGalleryDemo />,
        },
        {
          title: 'Empty and error',
          path: 'app/charts/(library)/states/demos/empty.tsx',
          node: <ChartEmptyAndErrorDemo />,
        },
        {
          title: 'Wrapping your own chart',
          path: 'app/charts/(library)/states/demos/usage.tsx',
          node: <ChartStateUsageDemo />,
        },
      ]}
    />
  );
}
