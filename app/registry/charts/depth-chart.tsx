'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartDataTable,
  ChartState,
  type BookLevel,
  DOWN,
  EASE,
  Keyframes,
  type OrderBook,
  SURFACE,
  UP,
  formatAxisPrice,
  formatMoney,
  generateOrderBook,
  marketVarsClassName,
  niceTicks,
  useElementWidth,
  usePrefersReducedMotion,
} from './chart-engine';

export const SOL_BOOK = generateOrderBook({ mid: 245.85, seed: 90_210, levels: 16, depth: 820 });
export const BTC_BOOK = generateOrderBook({
  mid: 96_480,
  seed: 771_204,
  levels: 16,
  tick: 12,
  depth: 26,
});

const PAD = { top: 14, right: 58, bottom: 24, left: 12 };

function formatSpread(spread: number, mid: number) {
  const digits = mid >= 100 ? 2 : mid >= 1 ? 3 : 5;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(spread);
}

function compactSize(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 100 ? 1 : 2,
  }).format(value);
}

function stepPath(
  levels: BookLevel[],
  xOf: (price: number) => number,
  yOf: (total: number) => number,
  midX: number,
  baseY: number,
) {
  if (!levels.length) return '';
  let d = `M${midX.toFixed(2)},${baseY.toFixed(2)}`;
  let prevY = baseY;
  for (const level of levels) {
    const x = xOf(level.price);
    const y = yOf(level.total);
    d += `L${x.toFixed(2)},${prevY.toFixed(2)}L${x.toFixed(2)},${y.toFixed(2)}`;
    prevY = y;
  }
  const lastX = xOf(levels[levels.length - 1].price);
  d += `L${lastX.toFixed(2)},${baseY.toFixed(2)}Z`;
  return d;
}

export interface DepthChartProps {
  className?: string;
  book?: OrderBook;
  symbol?: string;
  name?: string;
  height?: number;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function DepthChart({
  className,
  book = SOL_BOOK,
  symbol = 'SOL',
  name = 'Solana · USDC',
  height = 320,
  status = 'ready',
  onRetry,
}: DepthChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [hoverX, setHoverX] = React.useState<number | null>(null);

  const w = Math.max(width, 260);
  const h = height;
  const x0 = PAD.left;
  const x1 = w - PAD.right;
  const y0 = PAD.top;
  const y1 = h - PAD.bottom;

  const lowPrice = book.bids[book.bids.length - 1]?.price ?? book.mid;
  const highPrice = book.asks[book.asks.length - 1]?.price ?? book.mid;
  const halfSpan = Math.max(book.mid - lowPrice, highPrice - book.mid) || 1;
  const domainLo = book.mid - halfSpan;
  const domainHi = book.mid + halfSpan;

  const maxTotal = Math.max(
    book.bids[book.bids.length - 1]?.total ?? 0,
    book.asks[book.asks.length - 1]?.total ?? 0,
    1,
  );

  const xOf = React.useCallback(
    (price: number) => x0 + ((price - domainLo) / (domainHi - domainLo)) * (x1 - x0),
    [x0, x1, domainLo, domainHi],
  );
  const yOf = React.useCallback(
    (total: number) => y1 - (total / maxTotal) * (y1 - y0),
    [y0, y1, maxTotal],
  );
  const priceAt = React.useCallback(
    (x: number) => domainLo + ((x - x0) / (x1 - x0)) * (domainHi - domainLo),
    [x0, x1, domainLo, domainHi],
  );

  const midX = xOf(book.mid);
  const bidPath = stepPath(book.bids, xOf, yOf, midX, y1);
  const askPath = stepPath(book.asks, xOf, yOf, midX, y1);

  const priceTicks = React.useMemo(
    () => niceTicks(domainLo, domainHi, 5).filter((t) => Math.abs(xOf(t) - midX) > 26),
    [domainLo, domainHi, xOf, midX],
  );
  const sizeTicks = React.useMemo(() => niceTicks(0, maxTotal, 4), [maxTotal]);

  const probe = React.useMemo(() => {
    if (hoverX == null) return null;
    const price = priceAt(hoverX);
    const isBid = price < book.mid;
    const side = isBid ? book.bids : book.asks;
    let level: BookLevel | null = null;
    for (const candidate of side) {
      const reached = isBid ? price <= candidate.price : price >= candidate.price;
      if (reached) level = candidate;
    }
    return { price, isBid, total: level?.total ?? 0 };
  }, [hoverX, priceAt, book]);

  const onMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((clientX - box.left) / box.width) * w;
    setHoverX(Math.max(x0, Math.min(x1, x)));
  };

  const spreadPct = (book.spread / book.mid) * 100;
  const uid = React.useId().replace(/:/g, '');
  const ready = width > 0;

  return (
    <div
      ref={wrapRef}
      className={cn(
        'flex w-full flex-col text-neutral-400 dark:text-neutral-500',
        marketVarsClassName,
        className,
      )}
    >
      <Keyframes />

      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
              {symbol}
            </span>
            <span className="text-[12px] text-neutral-500 dark:text-neutral-400">{name}</span>
          </div>
          <p className="mt-1 font-mono text-[22px] font-medium leading-none tabular-nums text-neutral-950 dark:text-white">
            {formatMoney(book.mid)}
          </p>
        </div>
        <dl className="flex items-end gap-4 font-mono text-[11px] tabular-nums">
          <div className="text-right">
            <dt className="text-neutral-400 dark:text-neutral-500">Spread</dt>
            <dd className="text-neutral-950 dark:text-white">
              {formatSpread(book.spread, book.mid)}{' '}
              <span className="text-neutral-400">({spreadPct.toFixed(3)}%)</span>
            </dd>
          </div>
          <div className="text-right">
            <dt className="text-neutral-400 dark:text-neutral-500">Bid depth</dt>
            <dd style={{ color: UP }}>{compactSize(book.bids[book.bids.length - 1]?.total ?? 0)}</dd>
          </div>
          <div className="text-right">
            <dt className="text-neutral-400 dark:text-neutral-500">Ask depth</dt>
            <dd style={{ color: DOWN }}>
              {compactSize(book.asks[book.asks.length - 1]?.total ?? 0)}
            </dd>
          </div>
        </dl>
      </div>

      <ChartState

        status={status}

        height={height}

        variant="line"

        empty={{ title: 'Empty book', description: 'No resting orders on either side of the mid right now.' }}

        onRetry={onRetry}

      >

      <div className="relative w-full" style={{ height }}>
        {!ready ? null : (
          <svg
            ref={svgRef}
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            className="block w-full touch-pan-y select-none overflow-visible"
            role="img"
            aria-label={`${symbol} order book depth. Mid ${formatMoney(book.mid)}, spread ${formatSpread(book.spread, book.mid)}.`}
            tabIndex={0}
            onPointerMove={(e) => onMove(e.clientX)}
            onPointerDown={(e) => onMove(e.clientX)}
            onPointerLeave={() => setHoverX(null)}
          >
            <defs>
              <linearGradient id={`${uid}-bid`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={UP} stopOpacity={0.4} />
                <stop offset="100%" stopColor={UP} stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id={`${uid}-ask`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={DOWN} stopOpacity={0.4} />
                <stop offset="100%" stopColor={DOWN} stopOpacity={0.04} />
              </linearGradient>
            </defs>

            <g shapeRendering="crispEdges">
              {sizeTicks.map((tick) => (
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
              ))}
            </g>

            <g
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'bottom center',
                animation: reduce ? undefined : `spectrum-mc-rise 620ms ${EASE} both`,
              }}
            >
              <path d={bidPath} fill={`url(#${uid}-bid)`} stroke={UP} strokeWidth={1.5} />
              <path d={askPath} fill={`url(#${uid}-ask)`} stroke={DOWN} strokeWidth={1.5} />
            </g>

            <line
              x1={midX}
              x2={midX}
              y1={y0 - 4}
              y2={y1}
              stroke="currentColor"
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <g transform={`translate(${midX}, ${y0 - 4})`}>
              <rect x={-40} y={-13} width={80} height={15} rx={4} className="fill-neutral-900 dark:fill-white" />
              <text
                x={0}
                y={-5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9.5}
                fontWeight={600}
                className="fill-white font-mono tabular-nums dark:fill-neutral-950"
              >
                MID {formatAxisPrice(book.mid)}
              </text>
            </g>

            <g className="font-mono">
              {sizeTicks.map((tick) =>
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
                    {compactSize(tick)}
                  </text>
                ),
              )}
            </g>

            <g className="font-mono">
              {priceTicks.map((tick) => (
                <text
                  key={tick}
                  x={Math.max(x0 + 18, Math.min(x1 - 18, xOf(tick)))}
                  y={y1 + 15}
                  textAnchor="middle"
                  fontSize={10.5}
                  fill="currentColor"
                  className="tabular-nums"
                >
                  {formatAxisPrice(tick)}
                </text>
              ))}
            </g>

            {hoverX != null && probe ? (
              <g>
                <line
                  x1={hoverX}
                  x2={hoverX}
                  y1={y0}
                  y2={y1}
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeDasharray="3 3"
                  style={{ transition: reduce ? undefined : `all 90ms ${EASE}` }}
                />
                <line
                  x1={x0}
                  x2={x1}
                  y1={yOf(probe.total)}
                  y2={yOf(probe.total)}
                  stroke={probe.isBid ? UP : DOWN}
                  strokeOpacity={0.55}
                  strokeDasharray="3 3"
                />
                <circle
                  cx={hoverX}
                  cy={yOf(probe.total)}
                  r={4}
                  fill={SURFACE}
                  stroke={probe.isBid ? UP : DOWN}
                  strokeWidth={2}
                />
                <g transform={`translate(${Math.max(x0 + 46, Math.min(x1 - 46, hoverX))}, ${y1 + 3})`}>
                  <rect x={-46} y={0} width={92} height={16} rx={4} className="fill-neutral-900 dark:fill-white" />
                  <text
                    x={0}
                    y={8.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9.5}
                    fontWeight={600}
                    className="fill-white font-mono tabular-nums dark:fill-neutral-950"
                  >
                    {formatAxisPrice(probe.price)} · {compactSize(probe.total)}
                  </text>
                </g>
              </g>
            ) : null}
          </svg>
        )}
      </div>
      </ChartState>
      <ChartDataTable
        caption={`${symbol} order book depth — cumulative size by price`}
        columns={['Price', 'Side', 'Size', 'Cumulative']}
        rows={[
          ...book.asks.map((l) => [formatAxisPrice(l.price), 'Ask', l.size, l.total]),
          ...book.bids.map((l) => [formatAxisPrice(l.price), 'Bid', l.size, l.total]),
        ]}
      />
    </div>
  );
}

export function DefaultDepthChart(props: DepthChartProps) {
  return <DepthChart {...props} />;
}

export function BitcoinDepthChart(props: DepthChartProps) {
  return <DepthChart book={BTC_BOOK} symbol="BTC" name="Bitcoin · USDT" {...props} />;
}
