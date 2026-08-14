/**
 * Spectrum UI — Line Chart
 *
 * Multi-series Recharts lines with solid / dashed strokes, bump and step
 * curves, gradient strokes, and optional glow.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import {
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
  useChartId,
  useChartMotion,
} from './chart-kit';

export type LineCurve = 'monotone' | 'bump' | 'step' | 'linear';

export interface SpectrumLineChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  curveType?: LineCurve;
  strokeVariant?: StrokeVariant;
  desktopStroke?: StrokeVariant;
  mobileStroke?: StrokeVariant;
  glowing?: boolean;
  gradientStroke?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
  showDots?: boolean;
}

export function LineChart({
  className,
  data = MONTHLY_TRAFFIC,
  curveType = 'monotone',
  strokeVariant = 'solid',
  desktopStroke,
  mobileStroke,
  glowing = false,
  gradientStroke = false,
  isLoading = false,
  showLegend = true,
  showDots = false,
}: SpectrumLineChartProps) {
  const id = useChartId('line');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const glowId = `${id}-glow`;
  const dash = (variant: StrokeVariant) => (variant === 'dashed' ? '5 5' : undefined);

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                {gradientStroke ? (
                  <>
                    <linearGradient id={`${id}-desktop-stroke`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={SERIES.desktop.color} />
                      <stop offset="100%" stopColor={SERIES.mobile.color} />
                    </linearGradient>
                    <linearGradient id={`${id}-mobile-stroke`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={SERIES.mobile.color} />
                      <stop offset="100%" stopColor={SERIES.desktop.color} />
                    </linearGradient>
                  </>
                ) : null}
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
              </defs>
              <ChartGrid />
              <ChartXAxis dataKey="month" />
              <ChartYAxis />
              <Tooltip
                cursor={{ stroke: 'currentColor', strokeOpacity: 0.2, strokeDasharray: '4 4' }}
                content={<ChartTooltipContent />}
              />
              <Line
                type={curveType}
                dataKey="desktop"
                name={SERIES.desktop.label}
                stroke={
                  gradientStroke ? `url(#${id}-desktop-stroke)` : SERIES.desktop.color
                }
                strokeWidth={2.25}
                strokeDasharray={dash(desktopStroke ?? strokeVariant)}
                dot={showDots ? { r: 3, fill: SERIES.desktop.color, strokeWidth: 0 } : false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                filter={glowing ? `url(#${glowId})` : undefined}
              />
              <Line
                type={curveType}
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={gradientStroke ? `url(#${id}-mobile-stroke)` : SERIES.mobile.color}
                strokeWidth={2.25}
                strokeDasharray={dash(mobileStroke ?? strokeVariant)}
                dot={showDots ? { r: 3, fill: SERIES.mobile.color, strokeWidth: 0 } : false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartFrame>
  );
}

export function DefaultLineChart(props: SpectrumLineChartProps) {
  return <LineChart {...props} />;
}

export function DashedLineChart(props: SpectrumLineChartProps) {
  return <LineChart strokeVariant="dashed" {...props} />;
}

export function BumpLineChart(props: SpectrumLineChartProps) {
  return <LineChart curveType="bump" {...props} />;
}

export function StepLineChart(props: SpectrumLineChartProps) {
  return <LineChart curveType="step" {...props} />;
}

export function GlowingLineChart(props: SpectrumLineChartProps) {
  return <LineChart glowing {...props} />;
}

export function GradientLineChart(props: SpectrumLineChartProps) {
  return <LineChart gradientStroke {...props} />;
}
