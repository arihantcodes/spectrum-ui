'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  AreaFillDefs,
  ChartActiveDot,
  ChartFrame,
  ChartGlowFilter,
  chartGrid,
  ChartLoadingBars,
  ChartPlotSurface,
  chartXAxis,
  chartYAxis,
  type ChartDotRenderProps,
  ETH_PRICE,
  EASE_OUT,
  NVDA_PRICE,
  type PricePoint,
  RevealMask,
  SOL_PRICE,
  SOLANA_TVL,
  areaFillUrl,
  formatPct,
  formatUsd,
  seriesDelta,
  strokeDasharray,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from './chart-kit';

export interface SpectrumPriceChartProps {
  className?: string;
  data?: PricePoint[];
  symbol?: string;
  name?: string;
  compact?: boolean;
  format?: 'usd' | 'compact' | 'index';
  compare?: { label: string; data: PricePoint[] };
  glowing?: boolean;
  isLoading?: boolean;
}

function formatPrice(value: number, format: 'usd' | 'compact' | 'index') {
  if (format === 'index') return value.toFixed(1);
  return formatUsd(value, format === 'compact');
}

function rebase(data: PricePoint[]): PricePoint[] {
  const base = data[0]?.price ?? 1;
  return data.map((row) => ({ time: row.time, price: (row.price / base) * 100 }));
}

function mergeCompare(data: PricePoint[], compare?: SpectrumPriceChartProps['compare']) {
  if (!compare) return data.map((row) => ({ ...row }));
  const byTime = new Map(compare.data.map((row) => [row.time, row.price]));
  return data.map((row) => ({ ...row, compare: byTime.get(row.time) }));
}

function PriceTooltip({
  active,
  payload,
  compact,
  symbol,
  compareLabel,
  format,
}: {
  active?: boolean;
  payload?: { dataKey?: string | number; name?: string; value?: number; color?: string }[];
  compact?: boolean;
  symbol: string;
  compareLabel?: string;
  format: 'usd' | 'compact' | 'index';
}) {
  if (!active || !payload?.length) {
    return <span className="invisible block h-10 w-28" aria-hidden />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'scale(0.97)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      transition={{ duration: 0.16, ease: EASE_OUT }}
      className="min-w-[7.5rem] rounded-lg border border-neutral-200/70 bg-white/75 px-3 py-2 text-xs shadow-xl backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/70"
    >
      <ul className="flex flex-col gap-1">
        {payload
          .filter((item) => item.value != null && item.dataKey !== undefined)
          .map((item) => (
            <li key={String(item.dataKey)} className="flex items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-[3px] ring-1 ring-black/5 dark:ring-white/10"
                style={{ background: String(item.color) }}
              />
              <span className="text-neutral-500">
                {item.dataKey === 'compare' ? compareLabel : symbol}
              </span>
              <span className="ml-auto font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                {formatPrice(Number(item.value), format)}
              </span>
            </li>
          ))}
      </ul>
    </motion.div>
  );
}

export function PriceChart({
  className,
  data = SOL_PRICE,
  symbol = 'SOL',
  name = 'Solana',
  compact = false,
  format,
  compare,
  glowing = false,
  isLoading = false,
}: SpectrumPriceChartProps) {
  const id = useChartId('price');
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const glowId = `${id}-glow`;
  const maskId = `${id}-reveal`;
  const maskStyle = reduce ? undefined : { mask: `url(#${maskId})` };
  const resolvedFormat = format ?? (compact ? 'compact' : 'usd');
  const prices = data.map((row) => row.price);
  const last = prices[prices.length - 1] ?? 0;
  const delta = seriesDelta(prices);
  const up = delta >= 0;
  const color = up ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)';
  const rows = mergeCompare(data, compare);

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      <div className="mb-1 flex items-end justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-wide text-neutral-500">
            {symbol}
            <span className="ml-1.5 text-neutral-400 dark:text-neutral-500">{name}</span>
          </p>
          <p className="font-mono text-lg font-medium tabular-nums text-neutral-950 dark:text-white">
            {formatPrice(last, resolvedFormat)}
          </p>
        </div>
        <p
          className={cn(
            'mb-0.5 font-mono text-[12px] tabular-nums',
            up ? 'text-neutral-950 dark:text-white' : 'text-neutral-500',
          )}
        >
          {formatPct(delta)}
        </p>
      </div>
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <ChartPlotSurface>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <AreaFillDefs id={`${id}-fill`} color={color} variant="gradient" />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
                <RevealMask id={maskId} introStartedAt={introStartedAt} reduce={reduce} />
              </defs>
              <CartesianGrid {...chartGrid} />
              <XAxis {...chartXAxis} dataKey="time" tickFormatter={() => ''} height={8} />
              <YAxis
                {...chartYAxis}
                domain={([min, max]: [number, number]) => {
                  const pad = (max - min) * 0.18 || Math.abs(max) * 0.02 || 1;
                  return [min - pad, max + pad];
                }}
                tickFormatter={(value: number) => formatPrice(value, resolvedFormat)}
                width={64}
              />
              <Tooltip
                cursor={{ stroke: 'currentColor', strokeOpacity: 0.22, strokeDasharray: '4 4' }}
                content={
                  <PriceTooltip
                    compact={compact}
                    symbol={symbol}
                    compareLabel={compare?.label}
                    format={resolvedFormat}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="price"
                name={symbol}
                stroke={color}
                strokeWidth={2}
                fill={areaFillUrl(`${id}-fill`, 'gradient', color)}
                isAnimationActive={false}
                activeDot={(props: ChartDotRenderProps) => (
                  <ChartActiveDot cx={props.cx} cy={props.cy} color={color} />
                )}
                filter={glowing ? `url(#${glowId})` : undefined}
                style={maskStyle}
              />
              {compare ? (
                <Line
                  type="monotone"
                  dataKey="compare"
                  name={compare.label}
                  stroke="var(--spectrum-chart-2)"
                  strokeWidth={1.75}
                  strokeDasharray={strokeDasharray('dashed')}
                  dot={false}
                  activeDot={(props: ChartDotRenderProps) => (
                    <ChartActiveDot cx={props.cx} cy={props.cy} color="var(--spectrum-chart-2)" />
                  )}
                  isAnimationActive={false}
                  style={maskStyle}
                />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultPriceChart(props: SpectrumPriceChartProps) {
  return <PriceChart {...props} />;
}

export function StockPriceChart(props: SpectrumPriceChartProps) {
  return <PriceChart data={NVDA_PRICE} symbol="NVDA" name="NVIDIA" {...props} />;
}

export function TvlPriceChart(props: SpectrumPriceChartProps) {
  return <PriceChart data={SOLANA_TVL} symbol="TVL" name="Solana DeFi" compact {...props} />;
}

export function ComparePriceChart(props: SpectrumPriceChartProps) {
  return (
    <PriceChart
      data={rebase(SOL_PRICE)}
      symbol="SOL"
      name="vs ETH · rebased 100"
      format="index"
      compare={{ label: 'ETH', data: rebase(ETH_PRICE) }}
      {...props}
    />
  );
}

export function GlowingPriceChart(props: SpectrumPriceChartProps) {
  return <PriceChart glowing {...props} />;
}
