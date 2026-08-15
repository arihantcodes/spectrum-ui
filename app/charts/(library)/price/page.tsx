import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultPriceChartDemo from './demos/default';
import StockPriceChartDemo from './demos/stock';
import TvlPriceChartDemo from './demos/tvl';
import ComparePriceChartDemo from './demos/compare';

const chart = findChartBySlug('price');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'token price', 'stock chart', 'TVL', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/price`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="price"
      examples={[
        {
          title: 'SOL',
          path: 'app/charts/(library)/price/demos/default.tsx',
          node: <DefaultPriceChartDemo />,
        },
        {
          title: 'NVDA',
          path: 'app/charts/(library)/price/demos/stock.tsx',
          node: <StockPriceChartDemo />,
        },
        {
          title: 'Solana TVL',
          path: 'app/charts/(library)/price/demos/tvl.tsx',
          node: <TvlPriceChartDemo />,
        },
        {
          title: 'SOL vs ETH',
          path: 'app/charts/(library)/price/demos/compare.tsx',
          node: <ComparePriceChartDemo />,
        },
      ]}
    />
  );
}
