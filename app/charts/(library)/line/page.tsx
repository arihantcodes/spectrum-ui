import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartTypePage } from '../chart-type-page';
import DefaultLineChartDemo from './demos/default';
import DashedLineChartDemo from './demos/dashed';
import BumpLineChartDemo from './demos/bump';
import StepLineChartDemo from './demos/step';
import GradientLineChartDemo from './demos/gradient';
import GlowingLineChartDemo from './demos/glowing';

const chart = findChartBySlug('line');

export const metadata: Metadata = baseMetadata({
  title: chart?.name ?? 'Chart',
  description: chart?.description,
  keywords: [chart?.name ?? 'chart', 'React chart', 'Recharts', 'Spectrum UI'],
  canonicalUrl: `https://ui.spectrumhq.in/charts/line`,
});

export default function Page() {
  return (
    <ChartTypePage
      slug='line'
      examples={[
    {
      title: 'Basic chart',
      path: 'app/charts/(library)/line/demos/default.tsx',
      node: <DefaultLineChartDemo />,
    },
    {
      title: "strokeVariant='dashed'",
      path: 'app/charts/(library)/line/demos/dashed.tsx',
      node: <DashedLineChartDemo />,
    },
    {
      title: "curveType='bump'",
      path: 'app/charts/(library)/line/demos/bump.tsx',
      node: <BumpLineChartDemo />,
    },
    {
      title: "curveType='step'",
      path: 'app/charts/(library)/line/demos/step.tsx',
      node: <StepLineChartDemo />,
    },
    {
      title: 'gradient colors',
      path: 'app/charts/(library)/line/demos/gradient.tsx',
      node: <GradientLineChartDemo />,
    },
    {
      title: 'glowing',
      path: 'app/charts/(library)/line/demos/glowing.tsx',
      node: <GlowingLineChartDemo />,
    }
      ]}
    />
  );
}
