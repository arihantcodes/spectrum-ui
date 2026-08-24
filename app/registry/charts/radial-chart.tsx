'use client';

import * as React from 'react';
import {
  Cell,
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
  ChartPlotSurface,
  ChartTooltipContent,
  HOVER_TRANSITION,
  markOpacity,
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
  const [activeName, setActiveName] = React.useState<string | null>(null);
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
        <ChartPlotSurface>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadialBarChart
              data={rows}
              innerRadius="18%"
              outerRadius="88%"
              startAngle={semi ? 180 : 90}
              endAngle={semi ? 0 : -270}
              cy={semi ? '64%' : '50%'}
              onMouseLeave={() => setActiveName(null)}
            >
              <defs>{glowing ? <ChartGlowFilter id={glowId} /> : null}</defs>
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="currentColor"
                strokeOpacity={0.14}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <RadialBar
                dataKey="value"
                name="Share"
                background={{ fill: 'currentColor', fillOpacity: 0.07 }}
                cornerRadius={6}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                animationEasing="ease-out"
                filter={glowing ? `url(#${glowId})` : undefined}
              >
                {rows.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.fill}
                    stroke="var(--spectrum-chart-surface)"
                    strokeWidth={1}
                    style={{
                      opacity: markOpacity(activeName, item.name),
                      transition: HOVER_TRANSITION,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setActiveName(item.name)}
                  />
                ))}
              </RadialBar>
            </RechartsRadialBarChart>
          </ResponsiveContainer>
        </ChartPlotSurface>
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
