/**
 * Spectrum UI — Latency Bands
 *
 * Percentiles as stacked bands against an SLO zone.
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
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  ChartEyebrow,
  ChartGlowFilter,
  ChartPattern,
  ChartReveal,
  ChartSurface,
  ChartTooltipContent,
  GRID_OPACITY,
  GRID_STROKE,
  GlowDot,
  PlotTexture,
  RechartsCursor,
} from './chart-kit';

export interface LatencyPoint {
  t: string;
  p50: number;
  p95: number;
  p99: number;
}

export interface LatencyBandsChartProps {
  data?: LatencyPoint[];
  sloMs?: number;
  className?: string;
}

const SAMPLE: LatencyPoint[] = [
  { t: '00', p50: 42, p95: 118, p99: 164 },
  { t: '04', p50: 38, p95: 102, p99: 148 },
  { t: '08', p50: 61, p95: 154, p99: 210 },
  { t: '12', p50: 88, p95: 198, p99: 268 },
  { t: '16', p50: 74, p95: 176, p99: 232 },
  { t: '20', p50: 55, p95: 142, p99: 188 },
  { t: '24', p50: 47, p95: 121, p99: 171 },
];

const BANDS = [
  { key: 'p99', label: 'P99', fill: 'color-mix(in oklab, var(--chart-from) 28%, transparent)' },
  { key: 'p95', label: 'P95', fill: 'color-mix(in oklab, var(--chart-mid) 42%, transparent)' },
  { key: 'p50', label: 'P50', fill: 'color-mix(in oklab, var(--chart-solid) 22%, transparent)' },
] as const;

export function LatencyBandsChart({
  data = SAMPLE,
  sloMs = 200,
  className,
}: LatencyBandsChartProps) {
  const [hidden, setHidden] = React.useState<string[]>([]);
  const id = React.useId().replace(/:/g, '');
  const latest = data[data.length - 1];

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ChartSurface
      palette="signal"
      className={cn('flex flex-col', className)}
      aria-label={`Latency percentiles against a ${sloMs} millisecond SLO`}
    >
      <div className="relative z-10 flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <ChartEyebrow>Latency</ChartEyebrow>
          <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            SLO {sloMs}ms
          </p>
        </div>
        <div className="flex gap-1.5">
          {BANDS.map((band) => {
            const off = hidden.includes(band.key);
            const value = latest[band.key];
            const breach = value > sloMs;
            return (
              <button
                key={band.key}
                type="button"
                onClick={() => toggle(band.key)}
                aria-pressed={!off}
                className={cn(
                  'min-w-[3.5rem] rounded-2xl border px-2.5 py-1.5 text-left transition-all',
                  'border-white/60 bg-white/55 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/55',
                  'focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300',
                  off && 'opacity-40',
                )}
              >
                <span className="block text-[10px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
                  {band.label}
                </span>
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums tracking-tight',
                    breach
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-neutral-900 dark:text-neutral-100',
                  )}
                >
                  {value}
                  <span className="ml-0.5 text-[10px] font-medium text-neutral-400">ms</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ChartReveal className="mt-3 h-52 sm:h-56">
        <PlotTexture />
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 18, right: 12, left: 4, bottom: 0 }}>
            <defs>
              <ChartGlowFilter id={`lat-glow-${id}`} />
              <ChartPattern id={`slo-hatch-${id}`} variant="hatch" color="#fb7185" />
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 12"
              stroke={GRID_STROKE}
              strokeOpacity={GRID_OPACITY}
            />
            <XAxis
              dataKey="t"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#a3a3a3' }}
            />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent formatter={(value) => `${value}ms`} />}
              isAnimationActive={false}
            />
            <ReferenceArea
              y1={sloMs}
              y2={320}
              fill={`url(#slo-hatch-${id})`}
              ifOverflow="extendDomain"
            />
            <ReferenceLine
              y={sloMs}
              stroke="#fb7185"
              strokeDasharray="4 4"
              label={{
                value: `${sloMs}ms`,
                position: 'insideTopRight',
                fontSize: 10,
                fill: '#fb7185',
              }}
            />
            {BANDS.map((band) =>
              hidden.includes(band.key) ? null : (
                <Area
                  key={band.key}
                  type="monotone"
                  dataKey={band.key}
                  name={band.label}
                  stroke="none"
                  fill={band.fill}
                  isAnimationActive={false}
                />
              ),
            )}
            {hidden.includes('p50') ? null : (
              <Line
                type="monotone"
                dataKey="p50"
                name="P50"
                stroke="var(--chart-solid)"
                strokeWidth={2.15}
                dot={false}
                isAnimationActive={false}
                filter={`url(#lat-glow-${id})`}
                activeDot={<GlowDot />}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartReveal>
    </ChartSurface>
  );
}
