import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultMarketChartDemo from './demos/default';
import StockMarketChartDemo from './demos/stock';
import BitcoinMarketChartDemo from './demos/bitcoin';
import AreaMarketChartDemo from './demos/area';
import LiveMarketChartDemo from './demos/live';
import CompactMarketChartDemo from './demos/compact';

const chart = findChartBySlug('market');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [
    'React candlestick chart',
    'trading chart component',
    'stock chart React',
    'OHLC chart',
    'crypto price chart',
    'Spectrum UI',
  ],
  canonicalUrl: `https://ui.spectrumhq.in/charts/market`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="market"
      examples={[
        {
          title: 'Candles, volume, and a range selector',
          path: 'app/charts/(library)/market/demos/default.tsx',
          node: <DefaultMarketChartDemo />,
        },
        {
          title: "variant='area' — baseline shading",
          path: 'app/charts/(library)/market/demos/area.tsx',
          node: <AreaMarketChartDemo />,
        },
        {
          title: 'live — streaming ticks',
          path: 'app/charts/(library)/market/demos/live.tsx',
          node: <LiveMarketChartDemo />,
        },
        {
          title: 'Equities',
          path: 'app/charts/(library)/market/demos/stock.tsx',
          node: <StockMarketChartDemo />,
        },
        {
          title: 'hollowUp — Bitcoin',
          path: 'app/charts/(library)/market/demos/bitcoin.tsx',
          node: <BitcoinMarketChartDemo />,
        },
        {
          title: 'Compact — no volume, no range selector',
          path: 'app/charts/(library)/market/demos/compact.tsx',
          node: <CompactMarketChartDemo />,
        },
      ]}
    />
  );
}
