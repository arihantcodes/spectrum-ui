import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultComposedChartDemo from './demos/default';
import HatchedComposedChartDemo from './demos/hatched';
import DuotoneComposedChartDemo from './demos/duotone';
import DashedComposedChartDemo from './demos/dashed';
import GlowingComposedChartDemo from './demos/glowing';

const chart = findChartBySlug('composed');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/composed`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='composed'
      examples={[
    {
      title: 'Basic chart',
      path: 'app/charts/(library)/composed/demos/default.tsx',
      node: <DefaultComposedChartDemo />,
    },
    {
      title: "barVariant='hatched'",
      path: 'app/charts/(library)/composed/demos/hatched.tsx',
      node: <HatchedComposedChartDemo />,
    },
    {
      title: "barVariant='duotone'",
      path: 'app/charts/(library)/composed/demos/duotone.tsx',
      node: <DuotoneComposedChartDemo />,
    },
    {
      title: "lineStroke='animated-dashed'",
      path: 'app/charts/(library)/composed/demos/dashed.tsx',
      node: <DashedComposedChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/composed/demos/glowing.tsx',
      node: <GlowingComposedChartDemo />,
    }
      ]}
    />
  );
}
