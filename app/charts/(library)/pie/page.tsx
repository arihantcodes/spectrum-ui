import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultPieChartDemo from './demos/default';
import DonutPieChartDemo from './demos/donut';
import PaddedPieChartDemo from './demos/padded';
import LabeledPieChartDemo from './demos/labels';
import GlowingPieChartDemo from './demos/glowing';

const chart = findChartBySlug('pie');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/pie`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='pie'
      examples={[
    {
      title: 'Basic chart',
      path: 'app/charts/(library)/pie/demos/default.tsx',
      node: <DefaultPieChartDemo />,
    },
    {
      title: 'innerRadius={62}',
      path: 'app/charts/(library)/pie/demos/donut.tsx',
      node: <DonutPieChartDemo />,
    },
    {
      title: 'paddingAngle={6} cornerRadius={10}',
      path: 'app/charts/(library)/pie/demos/padded.tsx',
      node: <PaddedPieChartDemo />,
    },
    {
      title: 'showLabels',
      path: 'app/charts/(library)/pie/demos/labels.tsx',
      node: <LabeledPieChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/pie/demos/glowing.tsx',
      node: <GlowingPieChartDemo />,
    }
      ]}
    />
  );
}
