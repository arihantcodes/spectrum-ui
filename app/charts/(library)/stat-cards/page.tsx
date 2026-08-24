import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultStatCardsDemo from './demos/default';
import BudgetStatCardsDemo from './demos/budget';

const chart = findChartBySlug('stat-cards');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'KPI cards React',
    'stat card sparkline',
    'dashboard metric tiles',
    'delta badge',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/stat-cards`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="stat-cards"
      examples={[
        {
          title: 'KPI row',
          path: 'app/charts/(library)/stat-cards/demos/default.tsx',
          node: <DefaultStatCardsDemo />,
        },
        {
          title: 'previous + progress — the budget pair',
          path: 'app/charts/(library)/stat-cards/demos/budget.tsx',
          node: <BudgetStatCardsDemo />,
        },
      ]}
    />
  );
}
