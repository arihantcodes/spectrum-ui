/**
 * Spectrum UI — Composed Chart
 *
 * Bars, a line, and an area on one plot. Mix bar fills, line dashes, and glow.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import {
  Area,
  Bar,
  ComposedChart as RechartsComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  AreaFillDefs,
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
  type StrokeVariant,
  areaFillUrl,
  barFillUrl,
  useChartId,
  useChartMotion,
} from './chart-kit';

export interface SpectrumComposedChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  barVariant?: BarFillVariant;
  lineStroke?: StrokeVariant;
  lineCurve?: 'monotone' | 'bump' | 'step';
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function ComposedChart({
  className,
  data = MONTHLY_TRAFFIC,
  barVariant = 'default',
  lineStroke = 'solid',
  lineCurve = 'monotone',
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumComposedChartProps) {
  const id = useChartId('composed');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const glowId = `${id}-glow`;

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <BarFillDefs id={`${id}-bar`} color={SERIES.desktop.color} variant={barVariant} />
                <AreaFillDefs id={`${id}-area`} color={SERIES.mobile.color} variant="gradient" />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
              </defs>
              <ChartGrid />
              <ChartXAxis dataKey="month" />
              <ChartYAxis />
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.06 }}
                content={<ChartTooltipContent />}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={SERIES.mobile.color}
                strokeWidth={1.5}
                fill={areaFillUrl(`${id}-area`, 'gradient', SERIES.mobile.color)}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
              />
              <Bar
                dataKey="desktop"
                name={SERIES.desktop.label}
                fill={barFillUrl(`${id}-bar`, barVariant, SERIES.desktop.color)}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                filter={glowing ? `url(#${glowId})` : undefined}
              />
              <Line
                type={lineCurve}
                dataKey="mobile"
                name={`${SERIES.mobile.label} trend`}
                stroke={SERIES.mobile.color}
                strokeWidth={2.25}
                strokeDasharray={lineStroke === 'dashed' ? '5 5' : undefined}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                legendType="none"
              />
            </RechartsComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartFrame>
  );
}

export function DefaultComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart {...props} />;
}

export function HatchedComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart barVariant="hatched" {...props} />;
}

export function DuotoneComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart barVariant="duotone" {...props} />;
}

export function DashedComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart lineStroke="dashed" {...props} />;
}

export function GlowingComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart glowing {...props} />;
}
