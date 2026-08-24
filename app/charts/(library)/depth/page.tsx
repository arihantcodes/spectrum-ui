import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultDepthChartDemo from './demos/default';
import BitcoinDepthChartDemo from './demos/bitcoin';

const chart = findChartBySlug('depth');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'depth chart',
    'order book depth',
    'React SVG chart',
    'DEX liquidity',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/depth`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="depth"
      examples={[
        {
          title: 'Cumulative book',
          path: 'app/charts/(library)/depth/demos/default.tsx',
          node: <DefaultDepthChartDemo />,
        },
        {
          title: 'BTC · wider tick',
          path: 'app/charts/(library)/depth/demos/bitcoin.tsx',
          node: <BitcoinDepthChartDemo />,
        },
      ]}
    />
  );
}
