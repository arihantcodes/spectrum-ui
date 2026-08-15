import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultCandlestickChartDemo from './demos/default';
import StockCandlestickChartDemo from './demos/stock';
import VolumeCandlestickChartDemo from './demos/volume';
import HollowCandlestickChartDemo from './demos/hollow';

const chart = findChartBySlug('candlestick');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React candlestick', 'OHLC', 'Solana chart', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/candlestick`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug="candlestick"
      examples={[
        {
          title: 'SOL / USD',
          path: 'app/charts/(library)/candlestick/demos/default.tsx',
          node: <DefaultCandlestickChartDemo />,
        },
        {
          title: 'AAPL',
          path: 'app/charts/(library)/candlestick/demos/stock.tsx',
          node: <StockCandlestickChartDemo />,
        },
        {
          title: 'showVolume',
          path: 'app/charts/(library)/candlestick/demos/volume.tsx',
          node: <VolumeCandlestickChartDemo />,
        },
        {
          title: 'hollowUp',
          path: 'app/charts/(library)/candlestick/demos/hollow.tsx',
          node: <HollowCandlestickChartDemo />,
        },
      ]}
    />
  );
}
