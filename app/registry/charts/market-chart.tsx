'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartState,
  AAPL_MARKET,
  BTC_MARKET,
  type Candle,
  DAY_MS,
  Keyframes,
  MARKET_RANGES,
  type MarketRange,
  MORPH_SAMPLES,
  RollingNumber,
  RangeSelector,
  SOL_MARKET,
  DATE_FULL,
  DATE_SHORT,
  formatAxisPrice,
  formatMoney,
  formatSignedPct,
  marketVarsClassName,
  monotonePath,
  mulberry32,
  niceTicks,
  resample,
  round2,
  useElementWidth,
  usePrefersReducedMotion,
  useTween,
  useTweenNumber,
} from './chart-engine';

const NO_TICKS: Candle[] = [];

const PAD = { top: 12, right: 60, bottom: 22, left: 12 };
const VOLUME_SHARE = 0.2;
const VOLUME_GAP = 12;

export interface MarketChartProps {
  className?: string;
  data?: Candle[];
  symbol?: string;
  name?: string;
  variant?: 'candles' | 'area';
  showVolume?: boolean;
  hollowUp?: boolean;
  ranges?: MarketRange[];
  defaultRange?: string;
  showRangeSelector?: boolean;
  live?: boolean;
  height?: number;
  compactPrice?: boolean;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function MarketChart({
  className,
  data = SOL_MARKET,
  symbol = 'SOL',
  name = 'Solana',
  variant = 'candles',
  showVolume = true,
  hollowUp = false,
  ranges = MARKET_RANGES,
  defaultRange = '3M',
  showRangeSelector = true,
  live = false,
  height = 380,
  compactPrice = false,
  status = 'ready',
  onRetry,
}: MarketChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [rangeLabel, setRangeLabel] = React.useState(
    () => ranges.find((r) => r.label === defaultRange)?.label ?? ranges[ranges.length - 1].label,
  );
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [hoverY, setHoverY] = React.useState<number | null>(null);

  const [tickState, setTicks] = React.useState<Candle[]>([]);
  const ticks = live ? tickState : NO_TICKS;
  const [flash, setFlash] = React.useState<'up' | 'down' | null>(null);

  React.useEffect(() => {
    if (!live) return;
    const rand = mulberry32(0x5eed);
    let last = data[data.length - 1];
    const id = window.setInterval(() => {
      const shock = (rand() - 0.48) * 0.018;
      const close = round2(Math.max(0.01, last.close * (1 + shock)));
      const next: Candle = {
        t: last.t + DAY_MS,
        open: last.close,
        high: round2(Math.max(last.close, close) * (1 + rand() * 0.006)),
        low: round2(Math.min(last.close, close) * (1 - rand() * 0.006)),
        close,
        volume: Math.round((0.6 + rand()) * 1_000_000),
      };
      last = next;
      setFlash(close >= next.open ? 'up' : 'down');
      setTicks((prev) => [...prev, next].slice(-120));
    }, 1600);
    return () => window.clearInterval(id);
  }, [live, data]);

  React.useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 620);
    return () => window.clearTimeout(id);
  }, [flash, ticks.length]);

  const series = React.useMemo(() => (ticks.length ? [...data, ...ticks] : data), [data, ticks]);

  const range = ranges.find((r) => r.label === rangeLabel) ?? ranges[ranges.length - 1];
  const view = React.useMemo(() => {
    const bars = range.bars;
    if (bars == null || bars >= series.length) return series;
    return series.slice(series.length - bars);
  }, [series, range.bars]);

  const n = view.length;

  const w = Math.max(width, 260);
  const h = height;
  const plotX0 = PAD.left;
  const plotX1 = w - PAD.right;
  const plotW = Math.max(1, plotX1 - plotX0);
  const innerTop = PAD.top;
  const innerBottom = h - PAD.bottom;
  const volH = showVolume ? Math.round((innerBottom - innerTop) * VOLUME_SHARE) : 0;
  const priceY0 = innerTop;
  const priceY1 = innerBottom - (showVolume ? volH + VOLUME_GAP : 0);
  const volY0 = innerBottom - volH;
  const volY1 = innerBottom;
  const priceH = Math.max(1, priceY1 - priceY0);

  const step = plotW / Math.max(n, 1);
  const bodyW = Math.max(1, Math.min(step * 0.68, 18));
  const cx = React.useCallback((i: number) => plotX0 + step * (i + 0.5), [plotX0, step]);

  const rawDomain = React.useMemo(() => {
    if (!n) return [0, 1] as const;
    let lo = Infinity;
    let hi = -Infinity;
    for (const c of view) {
      const low = variant === 'area' ? c.close : c.low;
      const high = variant === 'area' ? c.close : c.high;
      if (low < lo) lo = low;
      if (high > hi) hi = high;
    }
    const pad = (hi - lo) * 0.12 || Math.abs(hi) * 0.02 || 1;
    return [lo - pad, hi + pad] as const;
  }, [view, n, variant]);

  const [domLo, domHi] = useTween([rawDomain[0], rawDomain[1]], {
    duration: 560,
    enabled: !reduce,
  });

  const priceY = React.useCallback(
    (v: number) => {
      const span = domHi - domLo || 1;
      return priceY1 - ((v - domLo) / span) * priceH;
    },
    [domHi, domLo, priceY1, priceH],
  );

  const priceAt = React.useCallback(
    (y: number) => domLo + ((priceY1 - y) / priceH) * (domHi - domLo),
    [domLo, domHi, priceY1, priceH],
  );

  const maxVolume = React.useMemo(
    () => view.reduce((max, c) => Math.max(max, c.volume), 1),
    [view],
  );

  const closes = React.useMemo(() => view.map((c) => c.close), [view]);
  const morphed = useTween(
    React.useMemo(() => resample(closes), [closes]),
    { duration: 560, enabled: !reduce && variant === 'area' },
  );

  const first = view[0];
  const last = view[n - 1];
  const active = hoverIndex != null ? view[hoverIndex] : null;
  const shown = active ?? last;
  const baseline = first?.close ?? 0;
  const delta = baseline ? ((shown?.close ?? 0) - baseline) / baseline * 100 : 0;
  const up = delta >= 0;
  const dirColor = up ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)';

  const lastUp = last ? last.close >= last.open : true;
  const lastColor = lastUp ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)';

  const displayPrice = useTweenNumber(shown?.close ?? 0, {
    duration: 260,
    enabled: !reduce && hoverIndex == null,
  });

  const svgRef = React.useRef<SVGSVGElement | null>(null);

  const pointerToIndex = React.useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const box = svg.getBoundingClientRect();
      const x = ((clientX - box.left) / box.width) * w;
      const y = ((clientY - box.top) / box.height) * h;
      const i = Math.floor((x - plotX0) / step);
      setHoverIndex(Math.max(0, Math.min(n - 1, i)));
      setHoverY(Math.max(priceY0, Math.min(priceY1, y)));
    },
    [w, h, plotX0, step, n, priceY0, priceY1],
  );

  const clearHover = React.useCallback(() => {
    setHoverIndex(null);
    setHoverY(null);
  }, []);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Escape') return;
      event.preventDefault();
      if (event.key === 'Escape') return clearHover();
      const dir = event.key === 'ArrowRight' ? 1 : -1;
      setHoverIndex((current) => {
        const next = (current ?? n - 1) + dir;
        return Math.max(0, Math.min(n - 1, next));
      });
      setHoverY(null);
    },
    [n, clearHover],
  );

  const priceTicks = React.useMemo(() => niceTicks(domLo, domHi, 5), [domLo, domHi]);

  const timeTicks = React.useMemo(() => {
    if (!n) return [];
    const want = Math.max(2, Math.min(6, Math.floor(plotW / 96)));
    const gap = Math.max(1, Math.floor((n - 1) / (want - 1 || 1)));
    const out: number[] = [];
    for (let i = 0; i < n; i += gap) out.push(i);
    const minGap = 62;
    const xOf = (i: number) => plotX0 + (plotW / Math.max(n, 1)) * (i + 0.5);
    if (out[out.length - 1] !== n - 1) {
      while (out.length && xOf(n - 1) - xOf(out[out.length - 1]) < minGap) out.pop();
      out.push(n - 1);
    }
    return out;
  }, [n, plotW, plotX0]);

  const uid = React.useId().replace(/:/g, '');
  const ready = width > 0;

  const areaPoints = React.useMemo(() => {
    const values = morphed.length === MORPH_SAMPLES ? morphed : resample(closes);
    return values.map((v, i) => ({
      x: plotX0 + (i / (values.length - 1 || 1)) * plotW,
      y: priceY(v),
    }));
  }, [morphed, closes, plotX0, plotW, priceY]);

  const linePath = React.useMemo(
    () => (variant === 'area' ? monotonePath(areaPoints) : ''),
    [variant, areaPoints],
  );
  const baselineY = priceY(baseline);

  const areaPath = React.useMemo(() => {
    if (variant !== 'area' || !linePath) return '';
    return `${linePath}L${plotX1},${baselineY}L${plotX0},${baselineY}Z`;
  }, [variant, linePath, plotX0, plotX1, baselineY]);

  const staggerFor = (i: number) => (n <= 1 ? 0 : (i / (n - 1)) * 340);
  const introKey = `${rangeLabel}-${variant}`;

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
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
              {symbol}
            </span>
            <span className="truncate text-[12px] text-neutral-500 dark:text-neutral-400">{name}</span>
            {live ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    background: 'var(--spectrum-chart-up)',
                    animation: reduce ? undefined : 'spectrum-mc-fade 1.1s ease-in-out infinite alternate',
                  }}
                />
                Live
              </span>
            ) : null}
          </div>

          <div className="mt-1 flex items-end gap-2.5">
            <RollingNumber
              value={hoverIndex != null ? (shown?.close ?? 0) : displayPrice}
              format={(v) => formatMoney(v, compactPrice)}
              animate={!reduce}
              className={cn(
                'font-mono text-[26px] font-medium text-neutral-950 transition-colors duration-300 dark:text-white',
              )}
            />
            <span
              className="mb-1 rounded-md px-1.5 py-0.5 font-mono text-[12px] tabular-nums transition-colors duration-300"
              style={{
                color: dirColor,
                background: flash
                  ? `color-mix(in srgb, ${dirColor} 16%, transparent)`
                  : 'transparent',
              }}
            >
              {formatSignedPct(delta)}
            </span>
          </div>

          <div
            className="mt-1.5 flex h-4 flex-wrap items-center gap-x-3 font-mono text-[10.5px] tabular-nums transition-opacity duration-200"
            style={{ opacity: active ? 1 : 0 }}
            aria-hidden={!active}
          >
            {active ? (
              <>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {DATE_FULL.format(active.t)}
                </span>
                {(['open', 'high', 'low', 'close'] as const).map((key) => (
                  <span key={key} className="text-neutral-500 dark:text-neutral-400">
                    {key[0].toUpperCase()}{' '}
                    <span
                      className="text-neutral-950 dark:text-white"
                      style={{ color: key === 'close' ? dirColor : undefined }}
                    >
                      {formatMoney(active[key], compactPrice)}
                    </span>
                  </span>
                ))}
                <span className="text-neutral-500 dark:text-neutral-400">
                  V{' '}
                  <span className="text-neutral-950 dark:text-white">
                    {formatMoney(active.volume, true).replace('$', '')}
                  </span>
                </span>
              </>
            ) : null}
          </div>
        </div>

        {showRangeSelector ? (
          <RangeSelector
            ranges={ranges}
            value={rangeLabel}
            onChange={setRangeLabel}
            reduce={reduce}
          />
        ) : null}
      </div>

      <ChartState
        status={status}
        height={height}
        variant="bars"
        empty={{ title: 'No price data', description: 'Point the chart at a candle feed and it will render as soon as bars arrive.' }}
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
            aria-label={`${symbol} ${name} price chart, ${rangeLabel} range. ${formatMoney(
              last?.close ?? 0,
            )}, ${formatSignedPct(delta)}.`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerMove={(e) => pointerToIndex(e.clientX, e.clientY)}
            onPointerDown={(e) => pointerToIndex(e.clientX, e.clientY)}
            onPointerLeave={clearHover}
            onBlur={clearHover}
          >
            <defs>
              <linearGradient id={`${uid}-up`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--spectrum-chart-up)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--spectrum-chart-up)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`${uid}-down`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--spectrum-chart-down)" stopOpacity={0} />
                <stop offset="100%" stopColor="var(--spectrum-chart-down)" stopOpacity={0.28} />
              </linearGradient>
              <clipPath id={`${uid}-above`}>
                <rect x={plotX0} y={priceY0 - 40} width={plotW} height={Math.max(0, baselineY - priceY0 + 40)} />
              </clipPath>
              <clipPath id={`${uid}-below`}>
                <rect x={plotX0} y={baselineY} width={plotW} height={Math.max(0, priceY1 - baselineY + 40)} />
              </clipPath>
            </defs>

            <g shapeRendering="crispEdges">
              {priceTicks.map((tick) => {
                const y = priceY(tick);
                if (y < priceY0 - 1 || y > priceY1 + 1) return null;
                return (
                  <line
                    key={tick}
                    x1={plotX0}
                    x2={plotX1}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.13}
                    strokeDasharray="2 4"
                  />
                );
              })}
            </g>

            <g className="font-mono">
              {priceTicks.map((tick) => {
                const y = priceY(tick);
                if (y < priceY0 - 1 || y > priceY1 + 1) return null;
                const collides =
                  (last != null && Math.abs(y - priceY(last.close)) < 13) ||
                  (hoverY != null && Math.abs(y - hoverY) < 13);
                if (collides) return null;
                return (
                  <text
                    key={tick}
                    x={plotX1 + 8}
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

            <g className="font-mono">
              {timeTicks.map((i) => {
                const candle = view[i];
                if (!candle) return null;
                const x = Math.max(plotX0 + 14, Math.min(plotX1 - 14, cx(i)));
                return (
                  <text
                    key={i}
                    x={x}
                    y={innerBottom + 13}
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
              <rect
                x={cx(hoverIndex) - step / 2}
                y={priceY0}
                width={step}
                height={innerBottom - priceY0}
                fill="currentColor"
                opacity={0.05}
              />
            ) : null}

            {variant === 'area' ? (
              <g key={introKey}>
                <path
                  d={areaPath}
                  fill={`url(#${uid}-up)`}
                  clipPath={`url(#${uid}-above)`}
                  style={
                    reduce ? undefined : { animation: 'spectrum-mc-fade 620ms ease-out both' }
                  }
                />
                <path
                  d={areaPath}
                  fill={`url(#${uid}-down)`}
                  clipPath={`url(#${uid}-below)`}
                  style={
                    reduce ? undefined : { animation: 'spectrum-mc-fade 620ms ease-out both' }
                  }
                />
                <line
                  x1={plotX0}
                  x2={plotX1}
                  y1={baselineY}
                  y2={baselineY}
                  stroke="currentColor"
                  strokeOpacity={0.35}
                  strokeDasharray="3 3"
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke="var(--spectrum-chart-up)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  clipPath={`url(#${uid}-above)`}
                  pathLength={1}
                  style={
                    reduce
                      ? undefined
                      : {
                          strokeDasharray: 1,
                          animation: 'spectrum-mc-draw 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
                        }
                  }
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke="var(--spectrum-chart-down)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  clipPath={`url(#${uid}-below)`}
                  pathLength={1}
                  style={
                    reduce
                      ? undefined
                      : {
                          strokeDasharray: 1,
                          animation: 'spectrum-mc-draw 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
                        }
                  }
                />
              </g>
            ) : (
              <g key={introKey}>
                {view.map((candle, i) => {
                  const isUp = candle.close >= candle.open;
                  const color = isUp ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)';
                  const x = cx(i);
                  const yHigh = priceY(candle.high);
                  const yLow = priceY(candle.low);
                  const yOpen = priceY(candle.open);
                  const yClose = priceY(candle.close);
                  const top = Math.min(yOpen, yClose);
                  const bodyH = Math.max(1, Math.abs(yClose - yOpen));
                  const dim = hoverIndex != null && hoverIndex !== i;
                  const hollow = hollowUp && isUp && bodyH > 2;

                  return (
                    <g
                      key={candle.t}
                      style={{
                        opacity: dim ? 0.32 : 1,
                        transition: reduce ? undefined : 'opacity 160ms ease-out',
                        transformBox: 'fill-box',
                        transformOrigin: 'bottom center',
                        animation: reduce
                          ? undefined
                          : `spectrum-mc-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerFor(i)}ms both`,
                      }}
                    >
                      <line
                        x1={x}
                        x2={x}
                        y1={yHigh}
                        y2={yLow}
                        stroke={color}
                        strokeWidth={Math.min(1.5, Math.max(1, bodyW * 0.14))}
                      />
                      <rect
                        x={x - bodyW / 2}
                        y={top}
                        width={bodyW}
                        height={bodyH}
                        rx={Math.min(1.5, bodyW * 0.18)}
                        fill={hollow ? 'var(--spectrum-chart-surface)' : color}
                        stroke={color}
                        strokeWidth={hollow ? 1.25 : 0}
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {showVolume ? (
              <g key={`${introKey}-vol`}>
                {view.map((candle, i) => {
                  const isUp = candle.close >= candle.open;
                  const barH = Math.max(1, (candle.volume / maxVolume) * volH * 0.88);
                  const dim = hoverIndex != null && hoverIndex !== i;
                  return (
                    <rect
                      key={candle.t}
                      x={cx(i) - bodyW / 2}
                      y={volY1 - barH}
                      width={bodyW}
                      height={barH}
                      rx={Math.min(1.5, bodyW * 0.18)}
                      fill={isUp ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)'}
                      opacity={dim ? 0.12 : 0.3}
                      style={{
                        transition: reduce ? undefined : 'opacity 160ms ease-out',
                        transformBox: 'fill-box',
                        transformOrigin: 'bottom center',
                        animation: reduce
                          ? undefined
                          : `spectrum-mc-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerFor(i)}ms both`,
                      }}
                    />
                  );
                })}
                <line
                  x1={plotX0}
                  x2={plotX1}
                  y1={volY0 - VOLUME_GAP / 2}
                  y2={volY0 - VOLUME_GAP / 2}
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  shapeRendering="crispEdges"
                />
              </g>
            ) : null}

            {last ? (
              <g>
                <line
                  x1={plotX0}
                  x2={plotX1}
                  y1={priceY(last.close)}
                  y2={priceY(last.close)}
                  stroke={lastColor}
                  strokeOpacity={0.55}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <rect
                  x={plotX1 + 3}
                  y={priceY(last.close) - 9}
                  width={PAD.right - 8}
                  height={18}
                  rx={4}
                  fill={lastColor}
                />
                <text
                  x={plotX1 + 3 + (PAD.right - 8) / 2}
                  y={priceY(last.close)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10.5}
                  fontWeight={600}
                  fill="var(--spectrum-chart-surface)"
                  className="font-mono tabular-nums"
                >
                  {formatAxisPrice(last.close)}
                </text>
                {live && !reduce ? (
                  <>
                    <circle
                      cx={cx(n - 1)}
                      cy={priceY(last.close)}
                      r={4}
                      fill={lastColor}
                      style={{ animation: 'spectrum-mc-ping 1.6s ease-out infinite' }}
                    />
                    <circle cx={cx(n - 1)} cy={priceY(last.close)} r={3} fill={lastColor} />
                  </>
                ) : null}
              </g>
            ) : null}

            {hoverIndex != null && view[hoverIndex] ? (
              <g
                style={{
                  transition: reduce ? undefined : 'transform 110ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <line
                  x1={cx(hoverIndex)}
                  x2={cx(hoverIndex)}
                  y1={priceY0}
                  y2={innerBottom}
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeDasharray="3 3"
                />
                {hoverY != null ? (
                  <>
                    <line
                      x1={plotX0}
                      x2={plotX1}
                      y1={hoverY}
                      y2={hoverY}
                      stroke="currentColor"
                      strokeOpacity={0.45}
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={plotX1 + 3}
                      y={hoverY - 9}
                      width={PAD.right - 8}
                      height={18}
                      rx={4}
                      className="fill-neutral-900 dark:fill-white"
                    />
                    <text
                      x={plotX1 + 3 + (PAD.right - 8) / 2}
                      y={hoverY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10.5}
                      fontWeight={600}
                      className="fill-white font-mono tabular-nums dark:fill-neutral-950"
                    >
                      {formatAxisPrice(priceAt(hoverY))}
                    </text>
                  </>
                ) : null}

                <g
                  transform={`translate(${Math.max(
                    plotX0 + 28,
                    Math.min(plotX1 - 28, cx(hoverIndex)),
                  )}, ${innerBottom + 4})`}
                >
                  <rect
                    x={-27}
                    y={0}
                    width={54}
                    height={16}
                    rx={4}
                    className="fill-neutral-900 dark:fill-white"
                  />
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

                <circle
                  cx={cx(hoverIndex)}
                  cy={priceY(view[hoverIndex].close)}
                  r={4.5}
                  fill="var(--spectrum-chart-surface)"
                  stroke={view[hoverIndex].close >= view[hoverIndex].open
                    ? 'var(--spectrum-chart-up)'
                    : 'var(--spectrum-chart-down)'}
                  strokeWidth={2}
                />
              </g>
            ) : null}
          </svg>
        )}
      </div>
      </ChartState>
    </div>
  );
}

export function DefaultMarketChart(props: MarketChartProps) {
  return <MarketChart {...props} />;
}

export function StockMarketChart(props: MarketChartProps) {
  return <MarketChart data={AAPL_MARKET} symbol="AAPL" name="Apple Inc." {...props} />;
}

export function BitcoinMarketChart(props: MarketChartProps) {
  return (
    <MarketChart data={BTC_MARKET} symbol="BTC" name="Bitcoin" compactPrice hollowUp {...props} />
  );
}

export function AreaMarketChart(props: MarketChartProps) {
  return <MarketChart variant="area" showVolume={false} defaultRange="1Y" {...props} />;
}

export function LiveMarketChart(props: MarketChartProps) {
  return <MarketChart live defaultRange="1M" {...props} />;
}

export function CompactMarketChart(props: MarketChartProps) {
  return (
    <MarketChart showVolume={false} showRangeSelector={false} height={220} defaultRange="3M" {...props} />
  );
}

