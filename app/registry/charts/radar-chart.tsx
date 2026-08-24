'use client';

import * as React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  ChartFrame,
  ChartGlowFilter,
  ChartLegend,
  ChartLoadingBars,
  ChartPlotSurface,
  ChartTooltipContent,
  HOVER_TRANSITION,
  RADAR_METRICS,
  SERIES,
  axisTick,
  markOpacity,
  useChartId,
  useChartMotion,
} from './chart-kit';

export type RadarFillVariant = 'filled' | 'lines';
export type RadarGridType = 'polygon' | 'circle';

export interface SpectrumRadarChartProps {
  className?: string;
  data?: typeof RADAR_METRICS;
  variant?: RadarFillVariant;
  gridType?: RadarGridType;
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function RadarChart({
  className,
  data = RADAR_METRICS,
  variant = 'filled',
  gridType = 'polygon',
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumRadarChartProps) {
  const id = useChartId('radar');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const glowId = `${id}-glow`;
  const filled = variant === 'filled';

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars count={8} />
      ) : (
        <ChartPlotSurface>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="72%"
              onMouseLeave={() => setActiveKey(null)}
            >
              <defs>{glowing ? <ChartGlowFilter id={glowId} /> : null}</defs>
              <PolarGrid gridType={gridType} stroke="currentColor" strokeOpacity={0.18} />
              <PolarAngleAxis dataKey="metric" tick={axisTick} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Tooltip content={<ChartTooltipContent />} />
              <Radar
                dataKey="desktop"
                name={SERIES.desktop.label}
                stroke={SERIES.desktop.color}
                fill={SERIES.desktop.color}
                fillOpacity={filled ? 0.22 : 0}
                strokeWidth={2}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                animationEasing="ease-out"
                filter={glowing ? `url(#${glowId})` : undefined}
                style={{
                  opacity: markOpacity(activeKey, 'desktop'),
                  transition: HOVER_TRANSITION,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveKey('desktop')}
              />
              <Radar
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={SERIES.mobile.color}
                fill={SERIES.mobile.color}
                fillOpacity={filled ? 0.16 : 0}
                strokeWidth={2}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                animationEasing="ease-out"
                style={{
                  opacity: markOpacity(activeKey, 'mobile'),
                  transition: HOVER_TRANSITION,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveKey('mobile')}
              />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultRadarChart(props: SpectrumRadarChartProps) {
  return <RadarChart variant="filled" {...props} />;
}

export function LinesRadarChart(props: SpectrumRadarChartProps) {
  return <RadarChart variant="lines" {...props} />;
}

export function CircleGridRadarChart(props: SpectrumRadarChartProps) {
  return <RadarChart gridType="circle" {...props} />;
}

export function GlowingRadarChart(props: SpectrumRadarChartProps) {
  return <RadarChart glowing {...props} />;
}
