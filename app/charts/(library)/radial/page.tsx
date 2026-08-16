import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultRadialChartDemo from './demos/default';
import SemiRadialChartDemo from './demos/semi';
import GlowingRadialChartDemo from './demos/glowing';

const chart = findChartBySlug('radial');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/radial`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='radial'
      examples={[
    {
      title: "variant='full'",
      path: 'app/charts/(library)/radial/demos/default.tsx',
      node: <DefaultRadialChartDemo />,
    },
    {
      title: "variant='semi'",
      path: 'app/charts/(library)/radial/demos/semi.tsx',
      node: <SemiRadialChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/radial/demos/glowing.tsx',
      node: <GlowingRadialChartDemo />,
    }
      ]}
    />
  );
}
