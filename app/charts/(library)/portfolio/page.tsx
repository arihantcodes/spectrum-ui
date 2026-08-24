import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultPortfolioChartDemo from './demos/default';
import FlatPortfolioChartDemo from './demos/flat';

const chart = findChartBySlug('portfolio');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'portfolio chart',
    'P&L chart React',
    'drawdown chart',
    'cost basis',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/portfolio`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="portfolio"
      examples={[
        {
          title: 'Value, basis, and drawdown',
          path: 'app/charts/(library)/portfolio/demos/default.tsx',
          node: <DefaultPortfolioChartDemo />,
        },
        {
          title: 'showDrawdown={false}',
          path: 'app/charts/(library)/portfolio/demos/flat.tsx',
          node: <FlatPortfolioChartDemo />,
        },
      ]}
    />
  );
}
