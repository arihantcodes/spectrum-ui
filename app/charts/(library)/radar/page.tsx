import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultRadarChartDemo from './demos/default';
import LinesRadarChartDemo from './demos/lines';
import CircleGridRadarChartDemo from './demos/circle';
import GlowingRadarChartDemo from './demos/glowing';

const chart = findChartBySlug('radar');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/radar`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='radar'
      examples={[
    {
      title: "variant='filled'",
      path: 'app/charts/(library)/radar/demos/default.tsx',
      node: <DefaultRadarChartDemo />,
    },
    {
      title: "variant='lines'",
      path: 'app/charts/(library)/radar/demos/lines.tsx',
      node: <LinesRadarChartDemo />,
    },
    {
      title: "gridType='circle'",
      path: 'app/charts/(library)/radar/demos/circle.tsx',
      node: <CircleGridRadarChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/radar/demos/glowing.tsx',
      node: <GlowingRadarChartDemo />,
    }
      ]}
    />
  );
}
