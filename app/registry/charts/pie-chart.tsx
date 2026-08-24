'use client';

import * as React from 'react';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';
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

export interface SpectrumPieChartProps {
  className?: string;
  data?: typeof BROWSER_SHARE;
  innerRadius?: number;
  paddingAngle?: number;
  cornerRadius?: number;
  showLabels?: boolean;
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function PieChart({
  className,
  data = BROWSER_SHARE,
  innerRadius = 0,
  paddingAngle = 2,
  cornerRadius = 6,
  showLabels = false,
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumPieChartProps) {
  const id = useChartId('pie');
  const { isAnimationActive, animationDuration } = useChartMotion();
  const [activeName, setActiveName] = React.useState<string | null>(null);
  const glowId = `${id}-glow`;
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
            <RechartsPieChart>
              <defs>{glowing ? <ChartGlowFilter id={glowId} /> : null}</defs>
              <Tooltip content={<ChartTooltipContent />} />
              <Pie
                data={rows}
                dataKey="value"
                nameKey="name"
                innerRadius={innerRadius}
                outerRadius="78%"
                paddingAngle={paddingAngle}
                cornerRadius={cornerRadius}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                animationEasing="ease-out"
                label={
                  showLabels
                    ? ({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`
                    : false
                }
                labelLine={showLabels}
                filter={glowing ? `url(#${glowId})` : undefined}
                onMouseLeave={() => setActiveName(null)}
              >
                {rows.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.fill}
                    stroke="var(--spectrum-chart-surface)"
                    strokeWidth={1.5}
                    style={{
                      opacity: markOpacity(activeName, item.name),
                      transition: HOVER_TRANSITION,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setActiveName(item.name)}
                  />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultPieChart(props: SpectrumPieChartProps) {
  return <PieChart {...props} />;
}

export function DonutPieChart(props: SpectrumPieChartProps) {
  return <PieChart innerRadius={62} {...props} />;
}

export function PaddedPieChart(props: SpectrumPieChartProps) {
  return <PieChart innerRadius={58} paddingAngle={6} cornerRadius={10} {...props} />;
}

export function LabeledPieChart(props: SpectrumPieChartProps) {
  return <PieChart innerRadius={54} showLabels {...props} />;
}

export function GlowingPieChart(props: SpectrumPieChartProps) {
  return <PieChart innerRadius={62} glowing {...props} />;
}
