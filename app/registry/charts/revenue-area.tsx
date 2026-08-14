/**
 * Spectrum UI — Revenue Area
 *
 * The number is the chart. Hover-scrubbing rewinds the KPI to that month.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AnimatedNumber,
  ChartEndCap,
  ChartEyebrow,
  ChartGlowFilter,
  ChartGradient,
  ChartReveal,
  ChartSurface,
  ChartTooltip,
  DeltaBadge,
  EdgeFade,
  GRID_OPACITY,
  GRID_STROKE,
  PlotTexture,
  RechartsCursor,
  SPRING_FLUID,
  formatCurrency,
  useChartMotion,
} from './chart-kit';

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface RevenueAreaChartProps {
  data?: RevenuePoint[];
  currency?: string;
  className?: string;
}

const SAMPLE: RevenuePoint[] = [
  { month: 'Jan', revenue: 48210 },
  { month: 'Feb', revenue: 51340 },
  { month: 'Mar', revenue: 49880 },
  { month: 'Apr', revenue: 56120 },
  { month: 'May', revenue: 60440 },
  { month: 'Jun', revenue: 58710 },
  { month: 'Jul', revenue: 64290 },
  { month: 'Aug', revenue: 69150 },
  { month: 'Sep', revenue: 67380 },
  { month: 'Oct', revenue: 74820 },
  { month: 'Nov', revenue: 81240 },
  { month: 'Dec', revenue: 84291 },
];

function PillTooltip({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: { payload: RevenuePoint }[];
  currency: string;
}) {
  if (!active || !payload?.[0]) return null;
  const point = payload[0].payload;
  return (
    <ChartTooltip>
      <div className="flex items-baseline gap-2">
        <span className="text-[11px] tracking-wide text-neutral-500 dark:text-neutral-400">
          {point.month}
        </span>
        <span className="text-sm font-semibold tracking-tight">
          {formatCurrency(point.revenue, currency)}
        </span>
      </div>
    </ChartTooltip>
  );
}

export function RevenueAreaChart({
  data = SAMPLE,
  currency = 'USD',
  className,
}: RevenueAreaChartProps) {
  const { spring } = useChartMotion();
  const last = data[data.length - 1];
  const first = data[0];
  const [active, setActive] = React.useState<RevenuePoint>(last);
  const peak = React.useMemo(
    () => data.reduce((best, point) => (point.revenue > best.revenue ? point : best), data[0]),
    [data],
  );
  const delta = first.revenue === 0 ? 0 : ((active.revenue - first.revenue) / first.revenue) * 100;
  const id = React.useId().replace(/:/g, '');
  const scrubbing = active.month !== last.month;

  return (
    <ChartSurface
      palette="signal"
      className={cn('flex flex-col', className)}
      aria-label={`Revenue ${formatCurrency(active.revenue, currency)} in ${active.month}`}
    >
      <figcaption className="sr-only">
        Monthly revenue from {data[0].month} to {last.month}. Hover the chart to inspect a month.
      </figcaption>

      <div className="relative isolate min-h-[20rem] sm:min-h-[22rem]">
        <ChartReveal className="absolute inset-0">
          <PlotTexture />
          <EdgeFade side="top" className="h-28" />
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 96, right: 12, left: 4, bottom: 36 }}
              onMouseMove={(state) => {
                const point = state?.activePayload?.[0]?.payload as RevenuePoint | undefined;
                if (point) setActive(point);
              }}
              onMouseLeave={() => setActive(last)}
            >
              <defs>
                <ChartGlowFilter id={`rev-glow-${id}`} stdDeviation={7} />
                <ChartGradient
                  id={`rev-fill-${id}`}
                  fromOpacity={0.58}
                  midOpacity={0.16}
                  toOpacity={0}
                />
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 12"
                stroke={GRID_STROKE}
                strokeOpacity={GRID_OPACITY}
              />
              <Tooltip
                cursor={<RechartsCursor />}
                content={<PillTooltip currency={currency} />}
                isAnimationActive={false}
              />
              {peak.month !== last.month ? (
                <ReferenceLine
                  x={peak.month}
                  stroke="var(--chart-solid)"
                  strokeDasharray="3 5"
                  strokeOpacity={0.28}
                />
              ) : null}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="none"
                fill={`url(#rev-fill-${id})`}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-from)"
                strokeWidth={8}
                strokeOpacity={0.22}
                dot={false}
                isAnimationActive={false}
                filter={`url(#rev-glow-${id})`}
                tooltipType="none"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-solid)"
                strokeWidth={2.4}
                dot={false}
                isAnimationActive={false}
                activeDot={false}
              />
              <ReferenceDot
                x={active.month}
                y={active.revenue}
                r={0}
                ifOverflow="visible"
                shape={
                  <ChartEndCap
                    label={scrubbing ? formatCurrency(active.revenue, currency) : undefined}
                  />
                }
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartReveal>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="pointer-events-auto flex items-end justify-between gap-3">
            <div>
              <ChartEyebrow>Revenue</ChartEyebrow>
              <p className="mt-2 text-[2.85rem] leading-none font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
                <AnimatedNumber
                  value={active.revenue}
                  format={(value) => formatCurrency(value, currency)}
                />
              </p>
              <p className="mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                {scrubbing ? `Reading ${active.month}` : `${first.month} → ${last.month}`}
              </p>
            </div>
            <DeltaBadge value={delta} className="mb-8" />
          </div>
        </div>

        {peak.month !== last.month ? (
          <div className="pointer-events-none absolute top-[5.75rem] right-5 z-20 rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-[10px] font-medium text-neutral-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/75 dark:text-neutral-300">
            Peak {peak.month}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-between px-5 pb-4 sm:px-6">
          {data.map((point) => {
            const on = point.month === active.month;
            return (
              <button
                key={point.month}
                type="button"
                onMouseEnter={() => setActive(point)}
                onFocus={() => setActive(point)}
                className={cn(
                  'relative px-0.5 text-[10px] tracking-wide transition-colors',
                  on
                    ? 'font-semibold text-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400',
                )}
              >
                {on ? (
                  <motion.span
                    layoutId={`rev-axis-${id}`}
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-neutral-900 dark:bg-neutral-100"
                    transition={spring(SPRING_FLUID)}
                  />
                ) : null}
                {point.month}
              </button>
            );
          })}
        </div>
      </div>
    </ChartSurface>
  );
}
