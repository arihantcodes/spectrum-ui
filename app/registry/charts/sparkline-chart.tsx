/**
 * Spectrum UI — Sparkline
 *
 * Compact price marks for watchlists, token tables, and portfolio rows.
 * Color follows the series direction using the ink / zinc pair.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Area, Line, LineChart as RechartsLineChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import {
  AreaFillDefs,
  ChartFrame,
  ChartGlowFilter,
  type SparkPoint,
  RevealMask,
  SOL_PRICE,
  WATCHLIST,
  type WatchlistRow,
  areaFillUrl,
  formatPct,
  formatUsd,
  seriesDelta,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from './chart-kit';

export interface SpectrumSparklineProps {
  className?: string;
  data?: SparkPoint[] | { price: number }[];
  filled?: boolean;
  glowing?: boolean;
  framed?: boolean;
}

function toSparkData(data: SparkPoint[] | { price: number }[]): SparkPoint[] {
  if (!data.length) return [];
  const first = data[0];
  if (first && 'value' in first) return data as SparkPoint[];
  return (data as { price: number }[]).map((row, i) => ({ i, value: row.price }));
}

export function Sparkline({
  className,
  data,
  filled = false,
  glowing = false,
  framed = true,
}: SpectrumSparklineProps) {
  const id = useChartId('spark');
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const rows = toSparkData(data ?? SOL_PRICE);
  const delta = seriesDelta(rows.map((row) => row.value));
  const up = delta >= 0;
  const color = up ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)';
  const glowId = `${id}-glow`;
  const maskId = `${id}-reveal`;
  const maskStyle = reduce ? undefined : { mask: `url(#${maskId})` };

  const plot = (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={rows} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
        <defs>
          {filled ? <AreaFillDefs id={`${id}-fill`} color={color} variant="gradient" /> : null}
          {glowing ? <ChartGlowFilter id={glowId} /> : null}
          <RevealMask id={maskId} introStartedAt={introStartedAt} reduce={reduce} />
        </defs>
        {filled ? (
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.75}
            fill={areaFillUrl(`${id}-fill`, 'gradient', color)}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
            filter={glowing ? `url(#${glowId})` : undefined}
            style={maskStyle}
          />
        ) : (
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.75}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
            filter={glowing ? `url(#${glowId})` : undefined}
            style={maskStyle}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );

  if (!framed) {
    return <div className={cn('h-8 w-full', className)}>{plot}</div>;
  }

  return <ChartFrame className={cn('h-16', className)}>{plot}</ChartFrame>;
}

export function DefaultSparkline(props: SpectrumSparklineProps) {
  return <Sparkline {...props} />;
}

export function AreaSparkline(props: SpectrumSparklineProps) {
  return <Sparkline filled {...props} />;
}

export function GlowingSparkline(props: SpectrumSparklineProps) {
  return <Sparkline glowing filled {...props} />;
}

export function Watchlist({
  className,
  rows = WATCHLIST,
}: {
  className?: string;
  rows?: WatchlistRow[];
}) {
  return (
    <ChartFrame className={cn('flex h-[280px] flex-col justify-center gap-0 py-1', className)}>
      <ul className="flex h-full flex-col justify-evenly">
        {rows.map((row) => {
          const up = row.change >= 0;
          return (
            <li key={row.symbol} className="flex items-center gap-3 px-1">
              <div className="w-14 shrink-0">
                <p className="font-mono text-[11px] font-medium text-neutral-950 dark:text-white">
                  {row.symbol}
                </p>
                <p className="truncate text-[10px] text-neutral-400">{row.name}</p>
              </div>
              <Sparkline data={row.series} framed={false} className="h-8 min-w-0 flex-1" />
              <div className="w-[4.75rem] shrink-0 text-right">
                <p className="font-mono text-[11px] tabular-nums text-neutral-950 dark:text-white">
                  {formatUsd(row.price)}
                </p>
                <p
                  className={cn(
                    'font-mono text-[10px] tabular-nums',
                    up ? 'text-neutral-950 dark:text-white' : 'text-neutral-500',
                  )}
                >
                  {formatPct(row.change)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </ChartFrame>
  );
}
