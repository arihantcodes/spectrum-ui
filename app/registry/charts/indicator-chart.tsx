'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartDataTable,
  ChartState,
  AAPL_MARKET,
  type Candle,
  DATE_SHORT,
  DOWN,
  EASE,
  Keyframes,
  MARKET_RANGES,
  type MarketRange,
  RangeSelector,
  SOL_MARKET,
  SURFACE,
  UP,
  formatAxisPrice,
  formatMoney,
  formatSignedPct,
  marketVarsClassName,
  monotonePath,
  niceTicks,
  useElementWidth,
  useHoverIndexKeys,
  usePrefersReducedMotion,
  useTween,
} from './chart-engine';

export function rsi(closes: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = new Array(closes.length).fill(null);
  if (closes.length <= period) return out;

  let gain = 0;
  let loss = 0;
  for (let i = 1; i <= period; i += 1) {
    const change = closes[i] - closes[i - 1];
    if (change >= 0) gain += change;
    else loss -= change;
  }
  gain /= period;
  loss /= period;
  out[period] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);

  for (let i = period + 1; i < closes.length; i += 1) {
    const change = closes[i] - closes[i - 1];
    gain = (gain * (period - 1) + Math.max(0, change)) / period;
    loss = (loss * (period - 1) + Math.max(0, -change)) / period;
    out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
  }
  return out;
}

function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const out: number[] = [];
  let prev = values[0] ?? 0;
  for (let i = 0; i < values.length; i += 1) {
    prev = i === 0 ? values[0] : values[i] * k + prev * (1 - k);
    out.push(prev);
  }
  return out;
}

export function macd(closes: number[], fast = 12, slow = 26, signalPeriod = 9) {
  const fastEma = ema(closes, fast);
  const slowEma = ema(closes, slow);
  const line = closes.map((_, i) => fastEma[i] - slowEma[i]);
  const signal = ema(line, signalPeriod);
  return { line, signal, histogram: line.map((v, i) => v - signal[i]) };
}

const PAD = { top: 12, right: 58, bottom: 22, left: 12 };
const GAP = 14;
const PANE_SHARE = { price: 0.54, rsi: 0.22, macd: 0.24 };

export interface IndicatorChartProps {
  className?: string;
  data?: Candle[];
  symbol?: string;
  name?: string;
  ranges?: MarketRange[];
  defaultRange?: string;
  height?: number;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function IndicatorChart({
  className,
  data = SOL_MARKET,
  symbol = 'SOL',
  name = 'Solana',
  ranges = MARKET_RANGES,
  defaultRange = '3M',
  height = 460,
  status = 'ready',
  onRetry,
}: IndicatorChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [rangeLabel, setRangeLabel] = React.useState(
    () => ranges.find((r) => r.label === defaultRange)?.label ?? ranges[ranges.length - 1].label,
  );
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const range = ranges.find((r) => r.label === rangeLabel) ?? ranges[ranges.length - 1];

  const closesAll = React.useMemo(() => data.map((c) => c.close), [data]);
  const rsiAll = React.useMemo(() => rsi(closesAll), [closesAll]);
  const macdAll = React.useMemo(() => macd(closesAll), [closesAll]);

  const start = React.useMemo(() => {
    const bars = range.bars;
    if (bars == null || bars >= data.length) return 0;
    return data.length - bars;
  }, [data.length, range.bars]);

  const view = React.useMemo(() => data.slice(start), [data, start]);
  const rsiView = React.useMemo(() => rsiAll.slice(start), [rsiAll, start]);
  const macdView = React.useMemo(
    () => ({
      line: macdAll.line.slice(start),
      signal: macdAll.signal.slice(start),
      histogram: macdAll.histogram.slice(start),
    }),
    [macdAll, start],
  );

  const n = view.length;

  const w = Math.max(width, 260);
  const h = height;
  const x0 = PAD.left;
  const x1 = w - PAD.right;
  const plotW = Math.max(1, x1 - x0);
  const innerTop = PAD.top;
  const innerBottom = h - PAD.bottom;
  const usable = innerBottom - innerTop - GAP * 2;

  const priceTop = innerTop;
  const priceBottom = priceTop + usable * PANE_SHARE.price;
  const rsiTop = priceBottom + GAP;
  const rsiBottom = rsiTop + usable * PANE_SHARE.rsi;
  const macdTop = rsiBottom + GAP;
  const macdBottom = macdTop + usable * PANE_SHARE.macd;

  const step = plotW / Math.max(n, 1);
  const cx = React.useCallback((i: number) => x0 + step * (i + 0.5), [x0, step]);
  const barW = Math.max(1, Math.min(step * 0.62, 12));

  const rawPriceDomain = React.useMemo(() => {
    if (!n) return [0, 1] as const;
    let lo = Infinity;
    let hi = -Infinity;
    for (const c of view) {
      if (c.low < lo) lo = c.low;
      if (c.high > hi) hi = c.high;
    }
    const pad = (hi - lo) * 0.1 || 1;
    return [lo - pad, hi + pad] as const;
  }, [view, n]);

  const [pLo, pHi] = useTween([rawPriceDomain[0], rawPriceDomain[1]], {
    duration: 520,
    enabled: !reduce,
  });
  const priceY = React.useCallback(
    (v: number) => priceBottom - ((v - pLo) / (pHi - pLo || 1)) * (priceBottom - priceTop),
    [pLo, pHi, priceBottom, priceTop],
  );

  const rsiY = React.useCallback(
    (v: number) => rsiBottom - (v / 100) * (rsiBottom - rsiTop),
    [rsiBottom, rsiTop],
  );

  const macdMax = React.useMemo(() => {
    let max = 1e-6;
    for (let i = 0; i < macdView.line.length; i += 1) {
      max = Math.max(
        max,
        Math.abs(macdView.line[i]),
        Math.abs(macdView.signal[i]),
        Math.abs(macdView.histogram[i]),
      );
    }
    return max * 1.15;
  }, [macdView]);

  const macdZero = (macdTop + macdBottom) / 2;
  const macdY = React.useCallback(
    (v: number) => macdZero - (v / macdMax) * ((macdBottom - macdTop) / 2),
    [macdZero, macdMax, macdBottom, macdTop],
  );

  const closeLine = React.useMemo(
    () => monotonePath(view.map((c, i) => ({ x: cx(i), y: priceY(c.close) }))),
    [view, cx, priceY],
  );
  const rsiLine = React.useMemo(() => {
    const points = rsiView
      .map((v, i) => (v == null ? null : { x: cx(i), y: rsiY(v) }))
      .filter((p): p is { x: number; y: number } => p != null);
    return monotonePath(points);
  }, [rsiView, cx, rsiY]);
  const macdLine = React.useMemo(
    () => monotonePath(macdView.line.map((v, i) => ({ x: cx(i), y: macdY(v) }))),
    [macdView.line, cx, macdY],
  );
  const signalLine = React.useMemo(
    () => monotonePath(macdView.signal.map((v, i) => ({ x: cx(i), y: macdY(v) }))),
    [macdView.signal, cx, macdY],
  );

  const priceTicks = React.useMemo(() => niceTicks(pLo, pHi, 4), [pLo, pHi]);
  const timeTicks = React.useMemo(() => {
    if (!n) return [];
    const want = Math.max(2, Math.min(6, Math.floor(plotW / 96)));
    const gap = Math.max(1, Math.floor((n - 1) / (want - 1 || 1)));
    const out: number[] = [];
    for (let i = 0; i < n; i += gap) out.push(i);
    const minGap = 62;
    if (out[out.length - 1] !== n - 1) {
      while (out.length && cx(n - 1) - cx(out[out.length - 1]) < minGap) out.pop();
      out.push(n - 1);
    }
    return out;
  }, [n, plotW, cx]);

  const onKeyDown = useHoverIndexKeys({ count: n, setIndex: setHoverIndex });

  const onMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((clientX - box.left) / box.width) * w;
    setHoverIndex(Math.max(0, Math.min(n - 1, Math.floor((x - x0) / step))));
  };

  const last = view[n - 1];
  const activeIndex = hoverIndex ?? n - 1;
  const active = view[activeIndex];
  const activeRsi = rsiView[activeIndex];
  const activeMacd = macdView.line[activeIndex];
  const activeSignal = macdView.signal[activeIndex];
  const base = view[0]?.close ?? 0;
  const delta = base ? (((active?.close ?? 0) - base) / base) * 100 : 0;
  const rangeDelta = base ? (((last?.close ?? 0) - base) / base) * 100 : 0;
  const readoutColor = delta >= 0 ? UP : DOWN;
  const dirColor = rangeDelta >= 0 ? UP : DOWN;

  const uid = React.useId().replace(/:/g, '');
  const ready = width > 0;
  const introKey = rangeLabel;

  const paneLabel = (text: string, y: number) => (
    <text
      x={x0 + 2}
      y={y + 10}
      fontSize={9.5}
      fontWeight={600}
      fill="currentColor"
      opacity={0.55}
      className="font-mono uppercase tracking-wider"
    >
      {text}
    </text>
  );

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

      <div className="mb-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
              {symbol}
            </span>
            <span className="text-[12px] text-neutral-500 dark:text-neutral-400">{name}</span>
          </div>
          <div className="mt-1 flex items-end gap-2.5">
            <span className="font-mono text-[24px] font-medium leading-none tabular-nums text-neutral-950 dark:text-white">
              {formatMoney(active?.close ?? 0)}
            </span>
            <span className="mb-0.5 font-mono text-[12px] tabular-nums" style={{ color: readoutColor }}>
              {formatSignedPct(delta)}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 font-mono text-[10.5px] tabular-nums">
            <span className="text-neutral-400 dark:text-neutral-500">
              {active ? DATE_SHORT.format(active.t) : ''}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              RSI{' '}
              <span
                className="text-neutral-950 dark:text-white"
                style={{
                  color:
                    activeRsi == null ? undefined : activeRsi >= 70 ? DOWN : activeRsi <= 30 ? UP : undefined,
                }}
              >
                {activeRsi == null ? '—' : activeRsi.toFixed(1)}
              </span>
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              MACD{' '}
              <span className="text-neutral-950 dark:text-white">
                {activeMacd == null ? '—' : activeMacd.toFixed(2)}
              </span>
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              Signal{' '}
              <span className="text-neutral-950 dark:text-white">
                {activeSignal == null ? '—' : activeSignal.toFixed(2)}
              </span>
            </span>
          </div>
        </div>

        <RangeSelector
          ranges={ranges}
          value={rangeLabel}
          onChange={setRangeLabel}
          reduce={reduce}
        />
      </div>

      <ChartState

        status={status}

        height={height}

        variant="line"

        empty={{ title: 'No price data', description: 'Indicators need at least 26 candles before MACD can be computed.' }}

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
            aria-label={`${symbol} ${name} with RSI and MACD, ${rangeLabel} range. ${formatMoney(last?.close ?? 0)}, ${formatSignedPct(rangeDelta)}.`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onBlur={() => setHoverIndex(null)}
            onPointerMove={(e) => onMove(e.clientX)}
            onPointerDown={(e) => onMove(e.clientX)}
            onPointerLeave={() => setHoverIndex(null)}
          >
            <defs>
              <linearGradient id={`${uid}-price`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dirColor} stopOpacity={0.24} />
                <stop offset="100%" stopColor={dirColor} stopOpacity={0} />
              </linearGradient>
              <clipPath id={`${uid}-rsi`}>
                <rect x={x0} y={rsiTop} width={plotW} height={Math.max(0, rsiBottom - rsiTop)} />
              </clipPath>
            </defs>

            <g shapeRendering="crispEdges">
              {priceTicks.map((tick) => {
                const y = priceY(tick);
                if (y < priceTop - 1 || y > priceBottom + 1) return null;
                if (last && Math.abs(y - priceY(last.close)) < 13) return null;
                return (
                  <line
                    key={tick}
                    x1={x0}
                    x2={x1}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.12}
                    strokeDasharray="2 4"
                  />
                );
              })}
            </g>
            <g className="font-mono">
              {priceTicks.map((tick) => {
                const y = priceY(tick);
                if (y < priceTop - 1 || y > priceBottom + 1) return null;
                if (last && Math.abs(y - priceY(last.close)) < 13) return null;
                return (
                  <text
                    key={tick}
                    x={x1 + 8}
                    y={y}
                    dominantBaseline="middle"
                    fontSize={10.5}
                    fill="currentColor"
                    className="tabular-nums"
                  >
                    {formatAxisPrice(tick)}
                  </text>
                );
              })}
            </g>

            <g key={`${introKey}-price`}>
              <path
                d={`${closeLine}L${cx(n - 1)},${priceBottom}L${cx(0)},${priceBottom}Z`}
                fill={`url(#${uid}-price)`}
                style={reduce ? undefined : { animation: `spectrum-mc-fade 560ms ease-out both` }}
              />
              <path
                d={closeLine}
                fill="none"
                stroke={dirColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={
                  reduce
                    ? undefined
                    : { strokeDasharray: 1, animation: `spectrum-mc-draw 880ms ${EASE} both` }
                }
              />
            </g>
            {paneLabel(`${symbol} · close`, priceTop - 10)}

            {last ? (
              <g>
                <line
                  x1={x0}
                  x2={x1}
                  y1={priceY(last.close)}
                  y2={priceY(last.close)}
                  stroke={dirColor}
                  strokeOpacity={0.5}
                  strokeDasharray="4 4"
                />
                <rect x={x1 + 3} y={priceY(last.close) - 9} width={PAD.right - 8} height={18} rx={4} fill={dirColor} />
                <text
                  x={x1 + 3 + (PAD.right - 8) / 2}
                  y={priceY(last.close)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10.5}
                  fontWeight={600}
                  fill={SURFACE}
                  className="font-mono tabular-nums"
                >
                  {formatAxisPrice(last.close)}
                </text>
              </g>
            ) : null}

            <g clipPath={`url(#${uid}-rsi)`}>
              <rect
                x={x0}
                y={rsiY(70)}
                width={plotW}
                height={Math.max(0, rsiY(30) - rsiY(70))}
                fill="currentColor"
                opacity={0.05}
              />
              {[30, 70].map((level) => (
                <line
                  key={level}
                  x1={x0}
                  x2={x1}
                  y1={rsiY(level)}
                  y2={rsiY(level)}
                  stroke={level === 70 ? DOWN : UP}
                  strokeOpacity={0.45}
                  strokeDasharray="3 3"
                />
              ))}
              <path
                key={`${introKey}-rsi`}
                d={rsiLine}
                fill="none"
                stroke="var(--spectrum-chart-4, #7c3aed)"
                strokeWidth={1.6}
                strokeLinecap="round"
                pathLength={1}
                style={
                  reduce
                    ? undefined
                    : { strokeDasharray: 1, animation: `spectrum-mc-draw 880ms ${EASE} 120ms both` }
                }
              />
            </g>
            <g className="font-mono">
              {[30, 70].map((level) => (
                <text
                  key={level}
                  x={x1 + 8}
                  y={rsiY(level)}
                  dominantBaseline="middle"
                  fontSize={9.5}
                  fill="currentColor"
                  className="tabular-nums"
                >
                  {level}
                </text>
              ))}
            </g>
            {paneLabel('RSI 14', rsiTop - 10)}

            <g key={`${introKey}-macd`}>
              <line
                x1={x0}
                x2={x1}
                y1={macdZero}
                y2={macdZero}
                stroke="currentColor"
                strokeOpacity={0.2}
                shapeRendering="crispEdges"
              />
              {macdView.histogram.map((v, i) => {
                const y = macdY(v);
                const positive = v >= 0;
                return (
                  <rect
                    key={i}
                    x={cx(i) - barW / 2}
                    y={positive ? y : macdZero}
                    width={barW}
                    height={Math.max(0.75, Math.abs(macdZero - y))}
                    rx={1}
                    fill={positive ? UP : DOWN}
                    opacity={hoverIndex != null && hoverIndex !== i ? 0.22 : 0.5}
                    style={{
                      transition: reduce ? undefined : 'opacity 160ms ease-out',
                      transformBox: 'fill-box',
                      transformOrigin: positive ? 'bottom center' : 'top center',
                      animation: reduce
                        ? undefined
                        : `spectrum-mc-rise 420ms ${EASE} ${n <= 1 ? 0 : (i / (n - 1)) * 300}ms both`,
                    }}
                  />
                );
              })}
              <path d={macdLine} fill="none" stroke="var(--spectrum-chart-1, #2563eb)" strokeWidth={1.5} />
              <path
                d={signalLine}
                fill="none"
                stroke="var(--spectrum-chart-2, #f59e0b)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
            </g>
            {paneLabel('MACD 12 · 26 · 9', macdTop - 10)}

            <g className="font-mono">
              {timeTicks.map((i) => {
                const candle = view[i];
                if (!candle) return null;
                return (
                  <text
                    key={i}
                    x={Math.max(x0 + 14, Math.min(x1 - 14, cx(i)))}
                    y={innerBottom + 14}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill="currentColor"
                    className="tabular-nums"
                  >
                    {DATE_SHORT.format(candle.t)}
                  </text>
                );
              })}
            </g>

            {hoverIndex != null && view[hoverIndex] ? (
              <g>
                <line
                  x1={cx(hoverIndex)}
                  x2={cx(hoverIndex)}
                  y1={priceTop}
                  y2={macdBottom}
                  stroke="currentColor"
                  strokeOpacity={0.42}
                  strokeDasharray="3 3"
                />
                <circle
                  cx={cx(hoverIndex)}
                  cy={priceY(view[hoverIndex].close)}
                  r={4}
                  fill={SURFACE}
                  stroke={dirColor}
                  strokeWidth={2}
                />
                {rsiView[hoverIndex] != null ? (
                  <circle
                    cx={cx(hoverIndex)}
                    cy={rsiY(rsiView[hoverIndex] as number)}
                    r={3}
                    fill={SURFACE}
                    stroke="var(--spectrum-chart-4, #7c3aed)"
                    strokeWidth={1.75}
                  />
                ) : null}
                <circle
                  cx={cx(hoverIndex)}
                  cy={macdY(macdView.line[hoverIndex])}
                  r={3}
                  fill={SURFACE}
                  stroke="var(--spectrum-chart-1, #2563eb)"
                  strokeWidth={1.75}
                />
                <g
                  transform={`translate(${Math.max(x0 + 28, Math.min(x1 - 28, cx(hoverIndex)))}, ${innerBottom + 4})`}
                >
                  <rect x={-27} y={0} width={54} height={16} rx={4} className="fill-neutral-900 dark:fill-white" />
                  <text
                    x={0}
                    y={8.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={600}
                    className="fill-white font-mono tabular-nums dark:fill-neutral-950"
                  >
                    {DATE_SHORT.format(view[hoverIndex].t)}
                  </text>
                </g>
              </g>
            ) : null}
          </svg>
        )}
      </div>
      </ChartState>
      <ChartDataTable
        caption={`${symbol} ${name} — close, RSI and MACD by date`}
        columns={['Date', 'Close', 'RSI', 'MACD']}
        rows={view.map((c, i) => [DATE_SHORT.format(c.t), formatMoney(c.close), rsiView[i] == null ? '—' : (rsiView[i] as number).toFixed(1), macdView.line[i].toFixed(2)])}
      />
    </div>
  );
}

export function DefaultIndicatorChart(props: IndicatorChartProps) {
  return <IndicatorChart {...props} />;
}

export function StockIndicatorChart(props: IndicatorChartProps) {
  return <IndicatorChart data={AAPL_MARKET} symbol="AAPL" name="Apple Inc." {...props} />;
}
