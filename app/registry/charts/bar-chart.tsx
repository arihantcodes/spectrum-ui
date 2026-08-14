/**
 * Spectrum UI — Bar Chart
 *
 * Recharts bars with per-series fill variants: default, hatched, duotone,
 * gradient, and stripped. Supports stacked / percent stacks, horizontal
 * layout, and a soft glow.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import {
  BarFillDefs,
  type BarFillVariant,
  ChartFrame,
  ChartGlowFilter,
  ChartGrid,
  ChartLegend,
  ChartLoadingBars,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  MONTHLY_TRAFFIC,
  SERIES,
  barFillUrl,
  useChartId,
  useChartMotion,
} from './chart-kit';

export type { BarFillVariant };

export type BarStackType = 'none' | 'stacked' | 'percent';
export type BarLayout = 'vertical' | 'horizontal';

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
  const { isAnimationActive, animationDuration } = useChartMotion();
  const desktopFill = desktopVariant ?? variant;
  const mobileFill = mobileVariant ?? variant;
  const stacked = stackType !== 'none';
  const horizontal = layout === 'horizontal';
  const categoryKey = 'month';
  const glowId = `${id}-glow`;

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={horizontal ? 'vertical' : 'horizontal'}
              stackOffset={stackType === 'percent' ? 'expand' : undefined}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              barCategoryGap="18%"
              barGap={4}
            >
              <defs>
                <BarFillDefs id={`${id}-desktop`} color={SERIES.desktop.color} variant={desktopFill} />
                <BarFillDefs id={`${id}-mobile`} color={SERIES.mobile.color} variant={mobileFill} />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
              </defs>
              {showGrid ? (
                <ChartGrid horizontal={!horizontal} vertical={horizontal} />
              ) : null}
              {horizontal ? (
                <>
                  <ChartYAxis dataKey={categoryKey} type="category" width={36} />
                  <ChartXAxis type="number" hide={stackType === 'percent'} />
                </>
              ) : (
                <>
                  <ChartXAxis dataKey={categoryKey} />
                  <ChartYAxis hide={stackType === 'percent'} />
                </>
              )}
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.06 }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="desktop"
                name={SERIES.desktop.label}
                fill={barFillUrl(`${id}-desktop`, desktopFill, SERIES.desktop.color)}
                radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                filter={glowing ? `url(#${glowId})` : undefined}
                maxBarSize={36}
              />
              <Bar
                dataKey="mobile"
                name={SERIES.mobile.label}
                fill={barFillUrl(`${id}-mobile`, mobileFill, SERIES.mobile.color)}
                radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                maxBarSize={36}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
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
