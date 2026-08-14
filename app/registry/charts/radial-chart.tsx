/**
 * Spectrum UI — Radial Chart
 *
 * Full and semi-circle radial bars for share and progress.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import {
  PolarGrid,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  BROWSER_SHARE,
  CHART_COLORS,
  ChartFrame,
  ChartGlowFilter,
  ChartLegend,
  ChartLoadingBars,
  ChartTooltipContent,
  useChartId,
  useChartMotion,
} from './chart-kit';

export type RadialVariant = 'full' | 'semi';

export interface SpectrumRadialChartProps {
  className?: string;
  data?: typeof BROWSER_SHARE;
  variant?: RadialVariant;
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function RadialChart({
  className,
  data = BROWSER_SHARE,
  variant = 'full',
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumRadialChartProps) {
  const id = useChartId('radial');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const glowId = `${id}-glow`;
  const semi = variant === 'semi';
  const rows = data.map((item, index) => ({
    ...item,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? (
        <ChartLegend items={rows.map((item) => ({ label: item.name, color: item.fill }))} />
      ) : null}
      {isLoading ? (
        <ChartLoadingBars count={6} />
      ) : (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadialBarChart
              data={rows}
              innerRadius="18%"
              outerRadius="88%"
              startAngle={semi ? 180 : 90}
              endAngle={semi ? 0 : -270}
              cy={semi ? '64%' : '50%'}
            >
              <defs>{glowing ? <ChartGlowFilter id={glowId} /> : null}</defs>
              <PolarGrid gridType="circle" radialLines={false} stroke="currentColor" strokeOpacity={0.16} />
              <Tooltip content={<ChartTooltipContent />} />
              <RadialBar
                dataKey="value"
                name="Share"
                background={{ fill: 'currentColor', fillOpacity: 0.08 }}
                cornerRadius={6}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                filter={glowing ? `url(#${glowId})` : undefined}
              />
            </RechartsRadialBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartFrame>
  );
}

export function DefaultRadialChart(props: SpectrumRadialChartProps) {
  return <RadialChart variant="full" {...props} />;
}

export function SemiRadialChart(props: SpectrumRadialChartProps) {
  return <RadialChart variant="semi" {...props} />;
}

export function GlowingRadialChart(props: SpectrumRadialChartProps) {
  return <RadialChart glowing {...props} />;
}
