import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultCalendarHeatmapDemo from './demos/default';
import DeploysCalendarHeatmapDemo from './demos/deploys';

const chart = findChartBySlug('calendar');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'calendar heatmap',
    'contributions graph React',
    'activity grid',
    'GitHub contribution chart',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/calendar`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="calendar"
      examples={[
        {
          title: 'A year of activity',
          path: 'app/charts/(library)/calendar/demos/default.tsx',
          node: <DefaultCalendarHeatmapDemo />,
        },
        {
          title: 'Deploys',
          path: 'app/charts/(library)/calendar/demos/deploys.tsx',
          node: <DeploysCalendarHeatmapDemo />,
        },
      ]}
    />
  );
}
