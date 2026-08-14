/**
 * Spectrum UI — Live Traffic
 *
 * A line that is still arriving. Hover pauses the stream.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AnimatedNumber,
  ChartEyebrow,
  ChartGlowFilter,
  ChartGradient,
  ChartReveal,
  ChartSurface,
  ChartTooltipContent,
  EdgeFade,
  PingDot,
  PlotTexture,
  RechartsCursor,
  SPRING_SNAPPY,
  useChartMotion,
} from './chart-kit';

export interface TrafficPoint {
  t: number;
  rps: number;
}

export interface LiveTrafficChartProps {
  data?: TrafficPoint[];
  intervalMs?: number;
  windowSize?: number;
  className?: string;
}

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seedWindow(size: number): TrafficPoint[] {
  const rand = mulberry32(42);
  const now = 1_704_067_200_000;
  const points: TrafficPoint[] = [];
  let value = 42;
  for (let i = size; i > 0; i--) {
    value = clamp(value + (rand() - 0.42) * 8, 12, 96);
    points.push({ t: now - i * 800, rps: Math.round(value) });
  }
  return points;
}

function nextPoint(prev: TrafficPoint): TrafficPoint {
  return {
    t: Date.now(),
    rps: Math.round(clamp(prev.rps + (Math.random() - 0.42) * 8, 12, 96)),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function LiveTrafficChart({
  data,
  intervalMs = 800,
  windowSize = 40,
  className,
}: LiveTrafficChartProps) {
  const { reduce, spring, duration } = useChartMotion();
  const [paused, setPaused] = React.useState(false);
  const [points, setPoints] = React.useState<TrafficPoint[]>(() => data ?? seedWindow(windowSize));
  const current = points[points.length - 1]?.rps ?? 0;
  const prev = points[points.length - 2]?.rps ?? current;
  const id = React.useId().replace(/:/g, '');
  const lastIndex = points.length - 1;

  React.useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => {
      setPoints((history) => {
        const next = [
          ...history,
          nextPoint(history[history.length - 1] ?? { t: Date.now(), rps: 40 }),
        ];
        return next.slice(-windowSize);
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [paused, reduce, intervalMs, windowSize]);

  return (
    <ChartSurface
      palette="signal"
      className={cn('flex flex-col', className)}
      aria-label={`Live traffic ${current} requests per second${paused ? ', paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative isolate min-h-[16.5rem] sm:min-h-[17.5rem]">
        <ChartReveal className="absolute inset-0">
          <PlotTexture />
          <EdgeFade side="top" className="h-24" />
          <EdgeFade side="left" className="w-10" />
          <EdgeFade side="right" className="w-12" />
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={points} margin={{ top: 88, right: 18, left: 0, bottom: 28 }}>
              <defs>
                <ChartGlowFilter id={`live-glow-${id}`} stdDeviation={6} />
                <ChartGradient
                  id={`live-fill-${id}`}
                  fromOpacity={0.42}
                  midOpacity={0.1}
                  toOpacity={0}
                />
              </defs>
              <YAxis hide domain={['dataMin - 8', 'dataMax + 8']} />
              <Tooltip
                cursor={<RechartsCursor />}
                content={
                  <ChartTooltipContent
                    label="RPS"
                    formatter={(value) => Number(value).toFixed(0)}
                  />
                }
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="rps"
                stroke="none"
                fill={`url(#live-fill-${id})`}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="rps"
                stroke="var(--chart-solid)"
                strokeWidth={7}
                strokeOpacity={0.22}
                dot={false}
                isAnimationActive={false}
                filter={`url(#live-glow-${id})`}
                tooltipType="none"
              />
              <Line
                type="monotone"
                dataKey="rps"
                stroke="var(--chart-solid)"
                strokeWidth={2.15}
                isAnimationActive={false}
                activeDot={false}
                dot={(props) => {
                  const index = Number(props.index ?? -1);
                  if (index !== lastIndex) return <g key={props.key} />;
                  return <PingDot key={props.key} cx={props.cx} cy={props.cy} />;
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartReveal>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            <ChartEyebrow>Requests / sec</ChartEyebrow>
            <p className="mt-2 text-[2.75rem] leading-none font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
              <AnimatedNumber value={current} />
            </p>
            <p className="mt-2 text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
              {current >= prev ? '+' : ''}
              {current - prev} vs last sample
            </p>
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em]',
              paused
                ? 'border-neutral-200/80 bg-white/70 text-neutral-400 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-neutral-500'
                : 'border-cyan-400/35 bg-cyan-400/12 text-cyan-700 shadow-[0_0_24px_-8px_#22d3ee] dark:text-cyan-300',
            )}
          >
            <motion.span
              aria-hidden="true"
              className={cn(
                'size-1.5 rounded-full',
                paused ? 'bg-neutral-400' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]',
              )}
              animate={
                reduce || paused
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1, 1.55, 1], opacity: [1, 0.5, 1] }
              }
              transition={
                reduce || paused
                  ? spring(SPRING_SNAPPY)
                  : { duration: duration(1.35), repeat: Infinity, ease: 'easeInOut' }
              }
            />
            {paused ? 'PAUSED' : 'LIVE'}
          </span>
        </div>

        <p className="absolute inset-x-0 bottom-0 z-20 px-5 pb-4 text-[11px] text-neutral-400 sm:px-6 dark:text-neutral-500">
          Trailing {windowSize} samples · hover pauses the stream
        </p>
      </div>
    </ChartSurface>
  );
}
