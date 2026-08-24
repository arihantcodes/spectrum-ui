'use client';

import * as React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  BarFillDefs,
  type BarFillVariant,
  ChartFrame,
  ChartGlowFilter,
  chartGrid,
  ChartLegend,
  ChartLoadingBars,
  ChartPlotSurface,
  ChartTooltipContent,
  chartXAxis,
  chartYAxis,
  MONTHLY_TRAFFIC,
  SERIES,
  barFillUrl,
  createGrowBarShape,
  HoverIndexProvider,
  readActiveTooltipIndex,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from './chart-kit';

export type { BarFillVariant };

export type BarStackType = 'none' | 'stacked' | 'percent';
export type BarLayout = 'vertical' | 'horizontal';

const VERTICAL_RADIUS = [4, 4, 0, 0] as [number, number, number, number];
const HORIZONTAL_RADIUS = [0, 4, 4, 0] as [number, number, number, number];

export interface SpectrumBarChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  variant?: BarFillVariant;
  desktopVariant?: BarFillVariant;
  mobileVariant?: BarFillVariant;
  stackType?: BarStackType;
  layout?: BarLayout;
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
}

export function BarChart({
  className,
  data = MONTHLY_TRAFFIC,
  variant = 'default',
  desktopVariant,
  mobileVariant,
  stackType = 'none',
  layout = 'vertical',
  glowing = false,
  isLoading = false,
  showLegend = true,
  showGrid = true,
}: SpectrumBarChartProps) {
  const id = useChartId('bar');
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const desktopFill = desktopVariant ?? variant;
  const mobileFill = mobileVariant ?? variant;
  const stacked = stackType !== 'none';
  const horizontal = layout === 'horizontal';
  const categoryKey = 'month';
  const glowId = `${id}-glow`;
  const radius = horizontal ? HORIZONTAL_RADIUS : VERTICAL_RADIUS;

  const desktopShape = React.useMemo(
    () =>
      createGrowBarShape({
        horizontal,
        introStartedAt,
        dataLength: data.length,
        reduce,
        radius,
        stripped: desktopFill === 'stripped',
        glowId: glowing ? glowId : undefined,
      }),
    [horizontal, introStartedAt, data.length, reduce, radius, desktopFill, glowing, glowId],
  );

  const mobileShape = React.useMemo(
    () =>
      createGrowBarShape({
        horizontal,
        introStartedAt,
        dataLength: data.length,
        reduce,
        radius,
        stripped: mobileFill === 'stripped',
      }),
    [horizontal, introStartedAt, data.length, reduce, radius, mobileFill],
  );

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <ChartPlotSurface>
          <HoverIndexProvider value={activeIndex}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={horizontal ? 'vertical' : 'horizontal'}
              stackOffset={stackType === 'percent' ? 'expand' : undefined}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              barCategoryGap="18%"
              barGap={4}
              onMouseMove={(state) => {
                const next = readActiveTooltipIndex(state);
                setActiveIndex((current) => (current === next ? current : next));
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <defs>
                <BarFillDefs id={`${id}-desktop`} color={SERIES.desktop.color} variant={desktopFill} />
                <BarFillDefs id={`${id}-mobile`} color={SERIES.mobile.color} variant={mobileFill} />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
              </defs>
              {showGrid ? (
                <CartesianGrid {...chartGrid} horizontal={!horizontal} vertical={horizontal} />
              ) : null}
              <XAxis
                {...chartXAxis}
                {...(horizontal
                  ? { type: 'number' as const, hide: stackType === 'percent' }
                  : { dataKey: categoryKey })}
              />
              <YAxis
                {...chartYAxis}
                {...(horizontal
                  ? { dataKey: categoryKey, type: 'category' as const, width: 44 }
                  : { hide: stackType === 'percent' })}
              />
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.05 }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="desktop"
                name={SERIES.desktop.label}
                fill={barFillUrl(`${id}-desktop`, desktopFill, SERIES.desktop.color)}
                radius={radius}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={false}
                shape={desktopShape}
                maxBarSize={36}
              />
              <Bar
                dataKey="mobile"
                name={SERIES.mobile.label}
                fill={barFillUrl(`${id}-mobile`, mobileFill, SERIES.mobile.color)}
                radius={radius}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={false}
                shape={mobileShape}
                maxBarSize={36}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
          </HoverIndexProvider>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="default" {...props} />;
}

export function HatchedBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="hatched" {...props} />;
}

export function DuotoneBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="duotone" {...props} />;
}

export function DuotoneReverseBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="duotone-reverse" {...props} />;
}

export function GradientBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="gradient" {...props} />;
}

export function StrippedBarChart(props: SpectrumBarChartProps) {
  return <BarChart variant="stripped" {...props} />;
}

export function StackedBarChart(props: SpectrumBarChartProps) {
  return <BarChart stackType="stacked" {...props} />;
}

export function PercentBarChart(props: SpectrumBarChartProps) {
  return <BarChart stackType="percent" {...props} />;
}

export function HorizontalBarChart(props: SpectrumBarChartProps) {
  return <BarChart layout="horizontal" {...props} />;
}

export function GlowingBarChart(props: SpectrumBarChartProps) {
  return <BarChart glowing {...props} />;
}
