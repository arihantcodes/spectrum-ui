import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultHistogramChartDemo from './demos/default';
import OrderValueHistogramDemo from './demos/orders';

const chart = findChartBySlug('histogram');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'histogram React',
    'latency distribution chart',
    'p95 p99 chart',
    'percentile chart',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/histogram`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="histogram"
      examples={[
        {
          title: 'Latency with p50 / p95 / p99',
          path: 'app/charts/(library)/histogram/demos/default.tsx',
          node: <DefaultHistogramChartDemo />,
        },
        {
          title: 'Order values',
          path: 'app/charts/(library)/histogram/demos/orders.tsx',
          node: <OrderValueHistogramDemo />,
        },
      ]}
    />
  );
}
