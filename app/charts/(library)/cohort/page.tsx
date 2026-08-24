import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultCohortChartDemo from './demos/default';
import WeeklyCohortChartDemo from './demos/weekly';

const chart = findChartBySlug('cohort');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'cohort retention chart',
    'retention grid React',
    'cohort analysis',
    'SaaS analytics chart',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/cohort`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="cohort"
      examples={[
        {
          title: 'Monthly cohorts',
          path: 'app/charts/(library)/cohort/demos/default.tsx',
          node: <DefaultCohortChartDemo />,
        },
        {
          title: 'Weekly activation',
          path: 'app/charts/(library)/cohort/demos/weekly.tsx',
          node: <WeeklyCohortChartDemo />,
        },
      ]}
    />
  );
}
