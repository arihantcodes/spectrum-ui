import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultBarChartDemo from './demos/default';
import HatchedBarChartDemo from './demos/hatched';
import DuotoneBarChartDemo from './demos/duotone';
import DuotoneReverseBarChartDemo from './demos/duotone-reverse';
import GradientBarChartDemo from './demos/gradient';
import StrippedBarChartDemo from './demos/stripped';
import StackedBarChartDemo from './demos/stacked';
import PercentBarChartDemo from './demos/percent';
import HorizontalBarChartDemo from './demos/horizontal';
import GlowingBarChartDemo from './demos/glowing';

const chart = findChartBySlug('bar');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/bar`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='bar'
      examples={[
    {
      title: "variant='default'",
      path: 'app/charts/(library)/bar/demos/default.tsx',
      node: <DefaultBarChartDemo />,
    },
    {
      title: "variant='hatched'",
      path: 'app/charts/(library)/bar/demos/hatched.tsx',
      node: <HatchedBarChartDemo />,
    },
    {
      title: "variant='duotone'",
      path: 'app/charts/(library)/bar/demos/duotone.tsx',
      node: <DuotoneBarChartDemo />,
    },
    {
      title: "variant='duotone-reverse'",
      path: 'app/charts/(library)/bar/demos/duotone-reverse.tsx',
      node: <DuotoneReverseBarChartDemo />,
    },
    {
      title: "variant='gradient'",
      path: 'app/charts/(library)/bar/demos/gradient.tsx',
      node: <GradientBarChartDemo />,
    },
    {
      title: "variant='stripped'",
      path: 'app/charts/(library)/bar/demos/stripped.tsx',
      node: <StrippedBarChartDemo />,
    },
    {
      title: "stackType='stacked'",
      path: 'app/charts/(library)/bar/demos/stacked.tsx',
      node: <StackedBarChartDemo />,
    },
    {
      title: "stackType='percent'",
      path: 'app/charts/(library)/bar/demos/percent.tsx',
      node: <PercentBarChartDemo />,
    },
    {
      title: "layout='horizontal'",
      path: 'app/charts/(library)/bar/demos/horizontal.tsx',
      node: <HorizontalBarChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/bar/demos/glowing.tsx',
      node: <GlowingBarChartDemo />,
    }
      ]}
    />
  );
}
