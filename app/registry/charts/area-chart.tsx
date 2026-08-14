/**
 * Spectrum UI — Area Chart
 *
 * Filled Recharts areas with gradient, reverse-gradient, solid, hatched, and
 * dotted fills. Supports stacked / expanded stacks and dashed strokes.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import {
  AreaFillDefs,
  type AreaFillVariant,
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
  type StrokeVariant,
  areaFillUrl,
  useChartId,
  useChartMotion,
} from './chart-kit';

export type { AreaFillVariant };

export type AreaCurve = 'monotone' | 'bump' | 'step' | 'linear';
export type AreaStackType = 'none' | 'stacked' | 'expanded';

export interface SpectrumAreaChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  variant?: AreaFillVariant;
  desktopVariant?: AreaFillVariant;
  mobileVariant?: AreaFillVariant;
  curveType?: AreaCurve;
  stackType?: AreaStackType;
  strokeVariant?: StrokeVariant;
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function AreaChart({
  className,
  data = MONTHLY_TRAFFIC,
  variant = 'gradient',
  desktopVariant,
  mobileVariant,
  curveType = 'monotone',
  stackType = 'none',
  strokeVariant = 'solid',
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumAreaChartProps) {
  const id = useChartId('area');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const desktopFill = desktopVariant ?? variant;
  const mobileFill = mobileVariant ?? variant;
  const stacked = stackType !== 'none';
  const glowId = `${id}-glow`;

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={data}
              stackOffset={stackType === 'expanded' ? 'expand' : undefined}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <AreaFillDefs id={`${id}-desktop`} color={SERIES.desktop.color} variant={desktopFill} />
                <AreaFillDefs id={`${id}-mobile`} color={SERIES.mobile.color} variant={mobileFill} />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
              </defs>
              <ChartGrid />
              <ChartXAxis dataKey="month" />
              <ChartYAxis hide={stackType === 'expanded'} />
              <Tooltip
                cursor={{ stroke: 'currentColor', strokeOpacity: 0.2, strokeDasharray: '4 4' }}
                content={<ChartTooltipContent />}
              />
              <Area
                type={curveType}
                dataKey="desktop"
                name={SERIES.desktop.label}
                stroke={SERIES.desktop.color}
                strokeWidth={2}
                strokeDasharray={strokeVariant === 'dashed' ? '5 5' : undefined}
                fill={areaFillUrl(`${id}-desktop`, desktopFill, SERIES.desktop.color)}
                fillOpacity={desktopFill === 'solid' ? 0.28 : 1}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                filter={glowing ? `url(#${glowId})` : undefined}
              />
              <Area
                type={curveType}
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={SERIES.mobile.color}
                strokeWidth={2}
                strokeDasharray={strokeVariant === 'dashed' ? '5 5' : undefined}
                fill={areaFillUrl(`${id}-mobile`, mobileFill, SERIES.mobile.color)}
                fillOpacity={mobileFill === 'solid' ? 0.28 : 1}
                stackId={stacked ? 'traffic' : undefined}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartFrame>
  );
}

export function DefaultAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart variant="gradient" {...props} />;
}

export function HatchedAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart variant="hatched" {...props} />;
}

export function DottedAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart variant="dotted" {...props} />;
}

export function SolidAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart variant="solid" {...props} />;
}

export function StackedAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart stackType="stacked" {...props} />;
}

export function BumpAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart curveType="bump" {...props} />;
}

export function DashedAreaChart(props: SpectrumAreaChartProps) {
  return <AreaChart strokeVariant="dashed" {...props} />;
}
