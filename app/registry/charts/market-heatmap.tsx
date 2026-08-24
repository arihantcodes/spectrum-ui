'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartState,
  Stat,
  Keyframes,
  type TreemapInput,
  changeColor,
  formatSignedPct,
  marketVarsClassName,
  squarify,
  useElementWidth,
  usePrefersReducedMotion,
} from './chart-engine';

export const CRYPTO_MAP: TreemapInput[] = [
  { label: 'BTC', name: 'Bitcoin', weight: 1_910, change: 1.42 },
  { label: 'ETH', name: 'Ethereum', weight: 462, change: 2.86 },
  { label: 'SOL', name: 'Solana', weight: 128, change: 6.14 },
  { label: 'BNB', name: 'BNB', weight: 96, change: -0.72 },
  { label: 'XRP', name: 'XRP', weight: 84, change: -2.31 },
  { label: 'DOGE', name: 'Dogecoin', weight: 41, change: 4.08 },
  { label: 'ADA', name: 'Cardano', weight: 32, change: -1.14 },
  { label: 'AVAX', name: 'Avalanche', weight: 24, change: 3.42 },
  { label: 'LINK', name: 'Chainlink', weight: 19, change: 5.27 },
  { label: 'TON', name: 'Toncoin', weight: 17, change: -3.88 },
  { label: 'DOT', name: 'Polkadot', weight: 14, change: -0.41 },
  { label: 'MATIC', name: 'Polygon', weight: 12, change: 1.96 },
];

export const SECTOR_MAP: TreemapInput[] = [
  { label: 'Technology', weight: 32, change: 1.86 },
  { label: 'Financials', weight: 14, change: -0.62 },
  { label: 'Health Care', weight: 12, change: 0.44 },
  { label: 'Consumer Disc.', weight: 11, change: 2.31 },
  { label: 'Comm. Services', weight: 9, change: -1.94 },
  { label: 'Industrials', weight: 8, change: 0.18 },
  { label: 'Cons. Staples', weight: 6, change: -0.27 },
  { label: 'Energy', weight: 4, change: -3.42 },
  { label: 'Utilities', weight: 2.5, change: 1.12 },
  { label: 'Real Estate', weight: 1.5, change: -2.08 },
];

function labelTier(w: number, h: number) {
  if (w >= 108 && h >= 66) return 'full' as const;
  if (w >= 64 && h >= 40) return 'compact' as const;
  if (w >= 34 && h >= 22) return 'ticker' as const;
  return 'none' as const;
}

const MIN_W = 34;
const MIN_H = 22;

function layout(items: TreemapInput[], width: number, height: number, gap: number) {
  let working = items;

  for (let pass = 0; pass < 3; pass += 1) {
    const tiles = squarify(working, width, height);
    const tooSmall = tiles.filter((t) => t.w - gap < MIN_W || t.h - gap < MIN_H);
    if (tooSmall.length < 2) return tiles;

    const small = new Set(tooSmall.map((t) => t.label));
    const kept = working.filter((i) => !small.has(i.label));
    const folded = working.filter((i) => small.has(i.label));
    const weight = folded.reduce((sum, i) => sum + i.weight, 0);
    if (!weight || !kept.length) return tiles;

    working = [
      ...kept,
      {
        label: 'Other',
        name: `${folded.length} more`,
        weight,
        change: folded.reduce((sum, i) => sum + i.change * i.weight, 0) / weight,
      },
    ];
  }

  return squarify(working, width, height);
}

export interface MarketHeatmapProps {
  className?: string;
  data?: TreemapInput[];
  height?: number;
  cap?: number;
  title?: string;
  subtitle?: string;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function MarketHeatmap({
  className,
  data = CRYPTO_MAP,
  height = 380,
  cap = 6,
  title = 'Crypto market map',
  subtitle = 'Top 12 · 24h change · area by market cap',
  status = 'ready',
  onRetry,
}: MarketHeatmapProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const w = Math.max(width, 260);
  const gap = 2;
  const tiles = React.useMemo(() => layout(data, w, height, gap), [data, w, height, gap]);

  const weighted = React.useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.weight, 0) || 1;
    return data.reduce((sum, d) => sum + d.change * d.weight, 0) / total;
  }, [data]);

  const ready = width > 0;

  return (
    <div
      ref={wrapRef}
      className={cn(
        'flex w-full flex-col',
        marketVarsClassName,
        '[--spectrum-heat-flat:#e7e7ea] dark:[--spectrum-heat-flat:#26262b]',
        className,
      )}
    >
      <Keyframes />

      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {title}
          </p>
          <p className="mt-0.5 text-[12px] text-neutral-500 dark:text-neutral-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
            Weighted{' '}
            <Stat ready={status === 'ready'}>
              <span
                className="font-medium"
                style={{ color: weighted >= 0 ? 'var(--spectrum-chart-up)' : 'var(--spectrum-chart-down)' }}
              >
                {formatSignedPct(weighted)}
              </span>
            </Stat>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9.5px] tabular-nums text-neutral-400">−{cap}%</span>
            <span className="flex h-2 w-24 overflow-hidden rounded-full">
              {Array.from({ length: 9 }, (_, i) => (
                <span
                  key={i}
                  className="h-full flex-1"
                  style={{ background: changeColor(((i - 4) / 4) * cap, cap) }}
                />
              ))}
            </span>
            <span className="font-mono text-[9.5px] tabular-nums text-neutral-400">+{cap}%</span>
          </div>
        </div>
      </div>

      <ChartState

        status={status}

        height={height}

        variant="grid"

        empty={{ title: 'No constituents', description: 'Add instruments with a weight and a change to draw the map.' }}

        onRetry={onRetry}

      >

      <div className="relative w-full" style={{ height }}>
        {!ready ? null : (
          <svg
            width={w}
            height={height}
            viewBox={`0 0 ${w} ${height}`}
            className="block w-full select-none"
            role="img"
            aria-label={`${title}. ${tiles.length} constituents, weighted change ${formatSignedPct(weighted)}.`}
            onPointerLeave={() => setHovered(null)}
          >
            {tiles.map((tile, index) => {
              const tw = Math.max(0, tile.w - gap);
              const th = Math.max(0, tile.h - gap);
              const tier = labelTier(tw, th);
              const active = hovered === tile.label;
              const cx = tile.x + tw / 2;
              const cy = tile.y + th / 2;
              const size = Math.max(9, Math.min(19, Math.sqrt(tw * th) / 6.5));

              return (
                <g
                  key={tile.label}
                  onPointerEnter={() => setHovered(tile.label)}
                  style={{
                    cursor: 'default',
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    animation: reduce
                      ? undefined
                      : `spectrum-mc-fade 420ms ease-out ${Math.min(index * 26, 420)}ms both`,
                  }}
                >
                  <rect
                    x={tile.x}
                    y={tile.y}
                    width={tw}
                    height={th}
                    rx={4}
                    fill={changeColor(tile.change, cap)}
                    stroke={active ? 'currentColor' : 'transparent'}
                    strokeWidth={1.5}
                    className="text-neutral-900 dark:text-white"
                    style={{
                      opacity: hovered && !active ? 0.55 : 1,
                      transition: reduce ? undefined : `opacity 160ms ease-out, stroke 160ms ease-out`,
                    }}
                  />
                  {tier === 'none' ? null : (
                    <g
                      className="pointer-events-none fill-neutral-950 dark:fill-white"
                      textAnchor="middle"
                    >
                      <text
                        x={cx}
                        y={tier === 'ticker' ? cy : cy - size * 0.34}
                        dominantBaseline="middle"
                        fontSize={size}
                        fontWeight={600}
                        className="font-mono"
                      >
                        {tile.label}
                      </text>
                      {tier === 'ticker' ? null : (
                        <text
                          x={cx}
                          y={cy + size * 0.72}
                          dominantBaseline="middle"
                          fontSize={size * 0.72}
                          className="font-mono tabular-nums"
                          opacity={0.75}
                        >
                          {formatSignedPct(tile.change)}
                        </text>
                      )}
                      {tier === 'full' && tile.name ? (
                        <text
                          x={cx}
                          y={cy + size * 1.72}
                          dominantBaseline="middle"
                          fontSize={size * 0.58}
                          className="font-sans"
                          opacity={0.5}
                        >
                          {tile.name}
                        </text>
                      ) : null}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
      </ChartState>
    </div>
  );
}

export function DefaultMarketHeatmap(props: MarketHeatmapProps) {
  return <MarketHeatmap {...props} />;
}

export function SectorMarketHeatmap(props: MarketHeatmapProps) {
  return (
    <MarketHeatmap
      data={SECTOR_MAP}
      cap={4}
      title="S&P 500 sectors"
      subtitle="Session change · area by index weight"
      {...props}
    />
  );
}
