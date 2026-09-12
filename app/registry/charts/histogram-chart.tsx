'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartDataTable,
  ChartState,
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

/**
 * A long-tailed distribution binned to its maximum spends most of the plot on
 * air: 900 latency samples put 97% of the mass in the first fifth and one
 * straggler at the far right. So bin up to `tailCutoff` and fold everything past
 * it into a single overflow bin, drawn detached and labelled with what it holds.
 * Pass `tailCutoff: 100` to bin the full range instead.
 */
export function splitTail(samples: number[], cutoffPercentile: number) {
  if (cutoffPercentile >= 100 || !samples.length) {
    return { body: samples, tail: [] as number[], cutoff: Infinity };
  }
  const cutoff = percentile(samples, cutoffPercentile);
  const body: number[] = [];
  const tail: number[] = [];
  for (const value of samples) (value <= cutoff ? body : tail).push(value);
  return body.length ? { body, tail, cutoff } : { body: samples, tail: [], cutoff: Infinity };
}

const PAD = { top: 34, right: 46, bottom: 26, left: 12 };

/**
 * Percentiles are one ordered quantity, so they ride one hue that darkens with
 * k rather than three unrelated colours — red on p99 read as "p99 is bad",
 * which is a judgement the chart has no business making.
 */
function pinInk(index: number, count: number) {
  const weight = 45 + (count <= 1 ? 55 : (index / (count - 1)) * 55);
  return `color-mix(in srgb, var(--spectrum-series-1) ${weight.toFixed(0)}%, var(--spectrum-chart-surface))`;
}

export interface HistogramChartProps {
  className?: string;
  data?: number[];
  label?: string;
  format?: (value: number) => string;
  percentiles?: number[];
  /** Percentile past which samples fold into one overflow bin. 100 disables it. */
  tailCutoff?: number;
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
  tailCutoff = 99,
  bins: binTarget = 26,
  height = 320,
  status = 'ready',
  onRetry,
}: HistogramChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  const { body, tail, cutoff } = React.useMemo(
    () => splitTail(data, tailCutoff),
    [data, tailCutoff],
  );
  const binsData = React.useMemo(() => buildBins(body, binTarget), [body, binTarget]);
  const n = binsData.length;
  const total = data.length;
  const maxCount = React.useMemo(
    () => Math.max(1, ...binsData.map((bin) => bin.count), tail.length),
    [binsData, tail.length],
  );
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

  // The overflow bin sits past a gap, so the break in the axis is visible
  // rather than implied.
  const hasTail = tail.length > 0;
  const tailGap = 16;
  const tailW = hasTail ? Math.max(12, plotW * 0.04) : 0;
  const bodyW = Math.max(1, plotW - (hasTail ? tailW + tailGap : 0));
  const tailX = x0 + bodyW + tailGap;

  const domainLo = binsData[0]?.from ?? 0;
  const domainHi = binsData[n - 1]?.to ?? 1;
  const xOf = React.useCallback(
    (v: number) => x0 + ((v - domainLo) / (domainHi - domainLo || 1)) * bodyW,
    [x0, bodyW, domainLo, domainHi],
  );
  const yOf = React.useCallback(
    (count: number) => y1 - (count / maxCount) * (y1 - y0),
    [y0, y1, maxCount],
  );

  const countTicks = React.useMemo(() => niceTicks(0, maxCount, 3), [maxCount]);
  const edgeTicks = React.useMemo(() => niceTicks(domainLo, domainHi, 5), [domainLo, domainHi]);

  const onMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((clientX - box.left) / box.width) * w;
    if (hasTail && x >= tailX - tailGap / 2) {
      setHover(n);
      return;
    }
    setHover(Math.max(0, Math.min(n - 1, Math.floor(((x - x0) / bodyW) * n))));
  };
  const onKeyDown = useHoverIndexKeys({ count: hasTail ? n + 1 : n, setIndex: setHover });

  const active = hover != null && hover < n ? binsData[hover] : null;
  const tailActive = hasTail && hover === n;
  const ready = width > 0;
  const binW = bodyW / Math.max(n, 1);
  // Bins are a continuous range: they touch, separated by a hairline of surface
  // rather than by a gap that would read as categories.
  const barW = Math.max(1, binW - 1);

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
              {hasTail ? ` · ${formatCount(tail.length)} past ${format(cutoff)}` : ''}
            </Stat>
          </p>
        </div>
        <p className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
          <Stat ready={status === 'ready'}>
            {pins.map((pin, index) => (
              <span key={pin.k} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{ background: pinInk(index, pins.length) }}
                />
                p{pin.k}{' '}
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
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
              aria-label={`${label} distribution: ${formatCount(total)} samples across ${n} bins${
                hasTail
                  ? `, with ${formatCount(tail.length)} samples at or above ${format(cutoff)} in an overflow bin`
                  : ''
              }. ${pins.map((p) => `p${p.k} ${format(p.value)}`).join(', ')}.`}
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
                      strokeOpacity={0.14}
                    />
                  ),
                )}
                <line x1={x0} x2={x1} y1={y1} y2={y1} stroke="currentColor" strokeOpacity={0.28} />
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
                        fill="var(--spectrum-series-1)"
                        opacity={dim ? 0.55 : 1}
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

              {hasTail ? (
                <g>
                  <rect x={tailX} y={y0} width={tailW} height={y1 - y0} fill="transparent" />
                  {/* Two strokes across the baseline: the axis breaks here, and
                      a reader should see that rather than infer it from a gap. */}
                  <g stroke="currentColor" strokeOpacity={0.45} strokeWidth={1}>
                    <line
                      x1={tailX - tailGap / 2 - 3}
                      x2={tailX - tailGap / 2 + 1}
                      y1={y1 + 4}
                      y2={y1 - 4}
                    />
                    <line
                      x1={tailX - tailGap / 2 + 1}
                      x2={tailX - tailGap / 2 + 5}
                      y1={y1 + 4}
                      y2={y1 - 4}
                    />
                  </g>
                  <rect
                    x={tailX}
                    y={y1 - Math.max(1.5, (tail.length / maxCount) * (y1 - y0))}
                    width={tailW}
                    height={Math.max(1.5, (tail.length / maxCount) * (y1 - y0))}
                    fill="var(--spectrum-series-1)"
                    opacity={hover != null && !tailActive ? 0.4 : 0.72}
                    style={{
                      transition: reduce ? undefined : 'opacity 150ms ease-out',
                      transformBox: 'fill-box',
                      transformOrigin: 'bottom center',
                      animation: reduce ? undefined : `spectrum-mc-rise 420ms ${EASE} 300ms both`,
                    }}
                  />
                  <text
                    x={tailX + tailW / 2}
                    y={y1 + 15}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill="currentColor"
                    className="font-mono tabular-nums"
                  >
                    ≥{format(cutoff)}
                  </text>
                </g>
              ) : null}

              {pins.map((pin, index) => {
                const text = `p${pin.k} ${format(pin.value)}`;
                const half = text.length * 3.1;
                const rule = Math.min(x0 + bodyW, xOf(pin.value));
                const x = Math.max(x0 + half, Math.min(x0 + bodyW - half, rule));
                const ink = pinInk(index, pins.length);
                return (
                  <g
                    key={pin.k}
                    style={
                      reduce
                        ? undefined
                        : { animation: `spectrum-mc-fade 400ms ease-out 380ms both` }
                    }
                  >
                    <line x1={rule} x2={rule} y1={y0 - 6} y2={y1} stroke={ink} strokeWidth={1.25} />
                    <circle cx={rule} cy={y0 - 6} r={2.5} fill={ink} />
                    <text
                      x={x}
                      y={y0 - 14}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={500}
                      fill="currentColor"
                      className="font-mono tabular-nums text-neutral-600 dark:text-neutral-300"
                    >
                      {text}
                    </text>
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
        {tailActive
          ? `${format(cutoff)} and above · ${formatCount(tail.length)} ${tail.length === 1 ? 'sample' : 'samples'} · ${((tail.length / Math.max(1, total)) * 100).toFixed(1)}% · the tail`
          : active
            ? `${format(active.from)} – ${format(active.to)} · ${formatCount(active.count)} ${active.count === 1 ? 'sample' : 'samples'} · ${((active.count / Math.max(1, total)) * 100).toFixed(1)}%`
            : ' '}
      </p>

      <ChartDataTable
        caption={`${label} — sample count by bin`}
        columns={['Range', 'Count', 'Share']}
        rows={[
          ...binsData.map((bin) => [
            `${format(bin.from)} – ${format(bin.to)}`,
            bin.count,
            `${((bin.count / Math.max(1, total)) * 100).toFixed(1)}%`,
          ]),
          ...(hasTail
            ? [
                [
                  `${format(cutoff)} and above`,
                  tail.length,
                  `${((tail.length / Math.max(1, total)) * 100).toFixed(1)}%`,
                ],
              ]
            : []),
        ]}
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
