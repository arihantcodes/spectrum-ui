import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultIndicatorChartDemo from './demos/default';
import StockIndicatorChartDemo from './demos/stock';

const chart = findChartBySlug('indicators');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'RSI chart',
    'MACD chart',
    'technical indicators React',
    'multi-pane chart',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/indicators`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="indicators"
      examples={[
        {
          title: 'Price · RSI · MACD',
          path: 'app/charts/(library)/indicators/demos/default.tsx',
          node: <DefaultIndicatorChartDemo />,
        },
        {
          title: 'Equities',
          path: 'app/charts/(library)/indicators/demos/stock.tsx',
          node: <StockIndicatorChartDemo />,
        },
      ]}
    />
  );
}
