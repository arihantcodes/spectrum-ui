'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartDataTable,
  ChartState,
  DOWN,
  EASE,
  Keyframes,
  Stat,
  formatCount,
  mulberry32,
  niceTicks,
  seriesVarsClassName,
  useElementWidth,
  useHoverIndexKeys,
  usePrefersReducedMotion,
} from './chart-engine';

function generateLatency(seed: number, n: number, mu: number, sigma: number): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const u1 = Math.max(1e-9, rand());
    const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    out.push(Math.exp(mu + sigma * z));
  }
  return out;
}

export const LATENCY_MS = generateLatency(0xd1ce, 900, 3.4, 0.55);
export const ORDER_VALUES = generateLatency(0xcafe, 700, 4.05, 0.42);

function niceStep(raw: number) {
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  return (norm >= 7.5 ? 10 : norm >= 3.5 ? 5 : norm >= 2.25 ? 2.5 : norm >= 1.5 ? 2 : 1) * mag;
}

export type Bin = { from: number; to: number; count: number };

export function buildBins(samples: number[], target = 26): Bin[] {
  if (!samples.length) return [];
  let min = Infinity;
  let max = -Infinity;
  for (const v of samples) {
    min = Math.min(min, v);
    max = Math.max(max, v);
  }
  const step = niceStep((max - min) / target || 1);
  const lo = Math.floor(min / step) * step;
  const count = Math.max(1, Math.ceil((max - lo) / step));
  const bins: Bin[] = Array.from({ length: count }, (_, i) => ({
    from: lo + i * step,
    to: lo + (i + 1) * step,
    count: 0,
  }));
  for (const v of samples) {
    const index = Math.min(count - 1, Math.floor((v - lo) / step));
    bins[index].count += 1;
  }
  return bins;
}

export function percentile(samples: number[], k: number): number {
  if (!samples.length) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((k / 100) * (sorted.length - 1)))];
}

const PAD = { top: 30, right: 46, bottom: 26, left: 12 };

const PIN_COLORS: Record<number, string> = {
  50: 'var(--spectrum-series-1)',
  95: 'var(--spectrum-series-2)',
  99: DOWN,
};

export interface HistogramChartProps {
  className?: string;
  data?: number[];
  label?: string;
  format?: (value: number) => string;
  percentiles?: number[];
  bins?: number;
  height?: number;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function HistogramChart({
  className,
  data = LATENCY_MS,
  label = 'API latency',
  format = (v) => `${Math.round(v)}ms`,
  percentiles = [50, 95, 99],
  bins: binTarget = 26,
  height = 320,
  status = 'ready',
  onRetry,
}: HistogramChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  const binsData = React.useMemo(() => buildBins(data, binTarget), [data, binTarget]);
  const n = binsData.length;
  const total = data.length;
  const maxCount = React.useMemo(() => Math.max(1, ...binsData.map((b) => b.count)), [binsData]);
  const pins = React.useMemo(
    () => percentiles.map((k) => ({ k, value: percentile(data, k) })),
    [data, percentiles],
  );

  const w = Math.max(width, 300);
  const h = height;
  const x0 = PAD.left;
  const x1 = w - PAD.right;
  const y0 = PAD.top;
  const y1 = h - PAD.bottom;
  const plotW = Math.max(1, x1 - x0);

  const domainLo = binsData[0]?.from ?? 0;
  const domainHi = binsData[n - 1]?.to ?? 1;
  const xOf = React.useCallback(
    (v: number) => x0 + ((v - domainLo) / (domainHi - domainLo || 1)) * plotW,
    [x0, plotW, domainLo, domainHi],
  );
  const yOf = React.useCallback(
    (count: number) => y1 - (count / maxCount) * (y1 - y0),
    [y0, y1, maxCount],
  );

  const countTicks = React.useMemo(() => niceTicks(0, maxCount, 3), [maxCount]);
  const edgeTicks = React.useMemo(
    () => niceTicks(domainLo, domainHi, 5),
    [domainLo, domainHi],
  );

  const onMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((clientX - box.left) / box.width) * w;
    setHover(Math.max(0, Math.min(n - 1, Math.floor(((x - x0) / plotW) * n))));
  };
  const onKeyDown = useHoverIndexKeys({ count: n, setIndex: setHover });

  const active = hover != null ? binsData[hover] : null;
  const ready = width > 0;
  const binW = plotW / Math.max(n, 1);
  const barW = Math.max(2, binW - 2);

  return (
    <div
      ref={wrapRef}
      className={cn(
        'flex w-full flex-col text-neutral-400 dark:text-neutral-500',
        seriesVarsClassName,
        className,
      )}
    >
      <Keyframes />

      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {label}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
            <Stat ready={status === 'ready'}>
              {formatCount(total)} samples · {n} bins
            </Stat>
          </p>
        </div>
        <p className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
          <Stat ready={status === 'ready'}>
            {pins.map((pin, index) => (
              <span key={pin.k}>
                {index > 0 ? ' · ' : ''}p{pin.k}{' '}
                <span className="font-medium" style={{ color: PIN_COLORS[pin.k] ?? 'currentColor' }}>
                  {format(pin.value)}
                </span>
              </span>
            ))}
          </Stat>
        </p>
      </div>

      <ChartState
        status={status}
        height={height}
        variant="bars"
        empty={{
          title: 'No samples yet',
          description: 'Send the first measurements and the distribution will take shape.',
        }}
        onRetry={onRetry}
      >
      <div className="relative w-full" style={{ height }}>
        {!ready ? null : (
          <svg
            ref={svgRef}
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            className="block w-full touch-pan-y select-none overflow-visible focus-visible:outline-hidden"
            role="img"
            aria-label={`${label} distribution: ${formatCount(total)} samples across ${n} bins. ${pins
              .map((p) => `p${p.k} ${format(p.value)}`)
              .join(', ')}.`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onBlur={() => setHover(null)}
            onPointerMove={(e) => onMove(e.clientX)}
            onPointerDown={(e) => onMove(e.clientX)}
            onPointerLeave={() => setHover(null)}
          >
            <g shapeRendering="crispEdges">
              {countTicks.map((tick) =>
                tick === 0 ? null : (
                  <line
                    key={tick}
                    x1={x0}
                    x2={x1}
                    y1={yOf(tick)}
                    y2={yOf(tick)}
                    stroke="currentColor"
                    strokeOpacity={0.12}
                    strokeDasharray="2 4"
                  />
                ),
              )}
            </g>
            <g className="font-mono">
              {countTicks.map((tick) =>
                tick === 0 ? null : (
                  <text
                    key={tick}
                    x={x1 + 8}
                    y={yOf(tick)}
                    dominantBaseline="middle"
                    fontSize={10.5}
                    fill="currentColor"
                    className="tabular-nums"
                  >
                    {formatCount(tick)}
                  </text>
                ),
              )}
              {edgeTicks.map((tick) => {
                const x = xOf(tick);
                if (x < x0 - 1 || x > x1 + 1) return null;
                return (
                  <text
                    key={tick}
                    x={x}
                    y={y1 + 15}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill="currentColor"
                    className="tabular-nums"
                  >
                    {format(tick)}
                  </text>
                );
              })}
            </g>

            {binsData.map((bin, index) => {
              const barH = Math.max(bin.count > 0 ? 1.5 : 0, (bin.count / maxCount) * (y1 - y0));
              const dim = hover != null && hover !== index;
              return (
                <g key={bin.from}>
                  <rect
                    x={xOf(bin.from)}
                    y={y0}
                    width={binW}
                    height={y1 - y0}
                    fill="transparent"
                  />
                  {bin.count > 0 ? (
                    <rect
                      x={xOf(bin.from) + (binW - barW) / 2}
                      y={y1 - barH}
                      width={barW}
                      height={barH}
                      rx={Math.min(2.5, barW * 0.3)}
                      fill="var(--spectrum-series-1)"
                      opacity={dim ? 0.28 : 0.82}
                      style={{
                        transition: reduce ? undefined : 'opacity 150ms ease-out',
                        transformBox: 'fill-box',
                        transformOrigin: 'bottom center',
                        animation: reduce
                          ? undefined
                          : `spectrum-mc-rise 420ms ${EASE} ${(index / Math.max(1, n - 1)) * 300}ms both`,
                      }}
                    />
                  ) : null}
                </g>
              );
            })}

            {pins.map((pin) => {
              const text = `p${pin.k} ${format(pin.value)}`;
              const pillW = text.length * 5.9 + 12;
              const x = Math.max(x0 + pillW / 2, Math.min(x1 - pillW / 2, xOf(pin.value)));
              const color = PIN_COLORS[pin.k] ?? 'currentColor';
              return (
                <g
                  key={pin.k}
                  style={reduce ? undefined : { animation: `spectrum-mc-fade 400ms ease-out 380ms both` }}
                >
                  <line
                    x1={xOf(pin.value)}
                    x2={xOf(pin.value)}
                    y1={y0 - 4}
                    y2={y1}
                    stroke={color}
                    strokeOpacity={0.6}
                    strokeDasharray="3 3"
                  />
                  <g transform={`translate(${x}, ${y0 - 8})`}>
                    <rect x={-pillW / 2} y={-13} width={pillW} height={15} rx={4} fill={color} />
                    <text
                      x={0}
                      y={-5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9.5}
                      fontWeight={600}
                      fill="var(--spectrum-chart-surface)"
                      className="font-mono tabular-nums"
                    >
                      {text}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        )}
      </div>
      </ChartState>

      <p
        className="mt-2 h-4 font-mono text-[11px] tabular-nums text-neutral-600 transition-opacity duration-150 dark:text-neutral-300"
        style={{ opacity: active ? 1 : 0 }}
        aria-live="polite"
      >
        {active
          ? `${format(active.from)} – ${format(active.to)} · ${formatCount(active.count)} ${active.count === 1 ? 'sample' : 'samples'} · ${((active.count / Math.max(1, total)) * 100).toFixed(1)}%`
          : ' '}
      </p>

      <ChartDataTable
        caption={`${label} — sample count by bin`}
        columns={['Range', 'Count', 'Share']}
        rows={binsData.map((bin) => [
          `${format(bin.from)} – ${format(bin.to)}`,
          bin.count,
          `${((bin.count / Math.max(1, total)) * 100).toFixed(1)}%`,
        ])}
      />
    </div>
  );
}

export function DefaultHistogramChart(props: HistogramChartProps) {
  return <HistogramChart {...props} />;
}

export function OrderValueHistogram(props: HistogramChartProps) {
  return (
    <HistogramChart
      data={ORDER_VALUES}
      label="Order value"
      format={(v) => `$${Math.round(v)}`}
      percentiles={[50, 95]}
      {...props}
    />
  );
}
