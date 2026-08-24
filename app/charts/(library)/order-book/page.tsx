import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultOrderBookDemo from './demos/default';
import LiveOrderBookDemo from './demos/live';
import EthereumOrderBookDemo from './demos/ethereum';

const chart = findChartBySlug('order-book');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'order book',
    'trading ladder',
    'React order book component',
    'bid ask',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/order-book`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="order-book"
      examples={[
        {
          title: 'Ladder',
          path: 'app/charts/(library)/order-book/demos/default.tsx',
          node: <DefaultOrderBookDemo />,
        },
        {
          title: 'live — flashing updates',
          path: 'app/charts/(library)/order-book/demos/live.tsx',
          node: <LiveOrderBookDemo />,
        },
        {
          title: 'ETH',
          path: 'app/charts/(library)/order-book/demos/ethereum.tsx',
          node: <EthereumOrderBookDemo />,
        },
      ]}
    />
  );
}
