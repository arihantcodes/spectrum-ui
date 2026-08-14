/**
 * Spectrum UI — Period Compare
 *
 * This period vs last, with a timeframe that morphs the data.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { cn } from '@/lib/utils';
import {
  AnimatedNumber,
  ChartEyebrow,
  ChartGlowFilter,
  ChartGradient,
  ChartReveal,
  ChartSurface,
  ChartTooltipContent,
  DeltaBadge,
  EdgeFade,
  GlowDot,
  PlotTexture,
  RechartsCursor,
  TimeRangeToggle,
  formatCompact,
} from './chart-kit';

export type CompareRange = '7D' | '30D' | '90D';

export interface ComparePoint {
  label: string;
  current: number;
  previous: number;
  delta: number;
}

export interface PeriodCompareChartProps {
  series?: Record<CompareRange, ComparePoint[]>;
  className?: string;
}

const RANGES = [
  { value: '7D', label: '7D' },
  { value: '30D', label: '30D' },
  { value: '90D', label: '90D' },
] as const;

function buildSeries(length: number, seed: number, label: (i: number) => string): ComparePoint[] {
  const points: ComparePoint[] = [];
  let current = 40 + (seed % 12);
  let previous = 36 + (seed % 9);
  for (let i = 0; i < length; i++) {
    current = current + Math.sin(i / 2.4 + seed) * 4 + (i % 5) - 1.5;
    previous = previous + Math.cos(i / 2.8 + seed) * 3.2 + ((i + 2) % 4) - 1.2;
    const now = Math.round(Math.max(8, current));
    const then = Math.round(Math.max(8, previous));
    points.push({
      label: label(i),
      current: now,
      previous: then,
      delta: Math.max(now, then) - Math.min(now, then),
    });
  }
  return points;
}

const SAMPLE: Record<CompareRange, ComparePoint[]> = {
  '7D': buildSeries(7, 1, (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] ?? `${i}`),
  '30D': buildSeries(30, 3, (i) => `${i + 1}`),
  '90D': buildSeries(24, 7, (i) => `W${i + 1}`),
};

export function PeriodCompareChart({ series = SAMPLE, className }: PeriodCompareChartProps) {
  const [range, setRange] = React.useState<CompareRange>('7D');
  const data = series[range];
  const currentTotal = data.reduce((sum, point) => sum + point.current, 0);
  const previousTotal = data.reduce((sum, point) => sum + point.previous, 0);
  const delta = previousTotal === 0 ? 0 : ((currentTotal - previousTotal) / previousTotal) * 100;
  const id = React.useId().replace(/:/g, '');

  return (
    <ChartSurface
      palette="heat"
      className={cn('flex flex-col', className)}
      aria-label="Period comparison"
    >
      <div className="relative isolate min-h-[19rem] sm:min-h-[20.5rem]">
        <ChartReveal className="absolute inset-0">
          <PlotTexture />
          <EdgeFade side="top" className="h-32" />
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 108, right: 12, left: 4, bottom: 12 }}>
              <defs>
                <ChartGlowFilter id={`pc-glow-${id}`} />
                <ChartGradient
                  id={`pc-fill-${id}`}
                  fromOpacity={0.34}
                  midOpacity={0.1}
                  toOpacity={0}
                />
              </defs>
              <XAxis
                dataKey="label"
                hide={range !== '7D'}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#a3a3a3' }}
              />
              <Tooltip
                cursor={<RechartsCursor />}
                content={<ChartTooltipContent />}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="previous"
                name="Last"
                stroke="none"
                fill="currentColor"
                fillOpacity={0.08}
                className="text-neutral-500"
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="current"
                name="This"
                stroke="none"
                fill={`url(#pc-fill-${id})`}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="Last"
                stroke="currentColor"
                className="text-neutral-300 dark:text-neutral-600"
                strokeWidth={1.75}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="var(--chart-solid)"
                strokeWidth={6}
                strokeOpacity={0.18}
                dot={false}
                isAnimationActive={false}
                filter={`url(#pc-glow-${id})`}
                tooltipType="none"
              />
              <Line
                type="monotone"
                dataKey="current"
                name="This"
                stroke="var(--chart-solid)"
                strokeWidth={2.25}
                dot={false}
                isAnimationActive={false}
                activeDot={<GlowDot />}
                legendType="none"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartReveal>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="pointer-events-auto flex items-start justify-between gap-3">
            <ChartEyebrow>Sessions</ChartEyebrow>
            <TimeRangeToggle
              layoutId="period-compare-range"
              options={RANGES}
              value={range}
              onChange={(value) => setRange(value as CompareRange)}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">This {range}</p>
              <p className="text-[1.85rem] font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
                <AnimatedNumber value={currentTotal} format={formatCompact} />
              </p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Last {range}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-[1.85rem] font-semibold tracking-tighter text-neutral-400 dark:text-neutral-500">
                  <AnimatedNumber value={previousTotal} format={formatCompact} />
                </p>
                <DeltaBadge value={delta} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartSurface>
  );
}
