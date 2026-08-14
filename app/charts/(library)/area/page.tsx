import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultAreaChartDemo from './demos/default';
import HatchedAreaChartDemo from './demos/hatched';
import DottedAreaChartDemo from './demos/dotted';
import SolidAreaChartDemo from './demos/solid';
import StackedAreaChartDemo from './demos/stacked';
import BumpAreaChartDemo from './demos/bump';
import DashedAreaChartDemo from './demos/dashed';

const chart = findChartBySlug('area');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/area`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='area'
      examples={[
    {
      title: "variant='gradient'",
      path: 'app/charts/(library)/area/demos/default.tsx',
      node: <DefaultAreaChartDemo />,
    },
    {
      title: "variant='hatched'",
      path: 'app/charts/(library)/area/demos/hatched.tsx',
      node: <HatchedAreaChartDemo />,
    },
    {
      title: "variant='dotted'",
      path: 'app/charts/(library)/area/demos/dotted.tsx',
      node: <DottedAreaChartDemo />,
    },
    {
      title: "variant='solid'",
      path: 'app/charts/(library)/area/demos/solid.tsx',
      node: <SolidAreaChartDemo />,
    },
    {
      title: "stackType='stacked'",
      path: 'app/charts/(library)/area/demos/stacked.tsx',
      node: <StackedAreaChartDemo />,
    },
    {
      title: "curveType='bump'",
      path: 'app/charts/(library)/area/demos/bump.tsx',
      node: <BumpAreaChartDemo />,
    },
    {
      title: "strokeVariant='dashed'",
      path: 'app/charts/(library)/area/demos/dashed.tsx',
      node: <DashedAreaChartDemo />,
    }
      ]}
    />
  );
}
