'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartState,
  type BookLevel,
  DOWN,
  EASE,
  Keyframes,
  type OrderBook,
  UP,
  formatMoney,
  generateOrderBook,
  marketVarsClassName,
  mulberry32,
  usePrefersReducedMotion,
} from './chart-engine';

export const SOL_LADDER = generateOrderBook({ mid: 245.85, seed: 90_210, levels: 9, depth: 820 });
export const ETH_LADDER = generateOrderBook({
  mid: 3_842.6,
  seed: 55_318,
  levels: 9,
  tick: 0.4,
  depth: 140,
});

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

type Row = BookLevel & { side: 'bid' | 'ask'; index: number };

function BookRow({
  row,
  maxTotal,
  highlighted,
  flashed,
  flashKey,
  reduce,
  onEnter,
}: {
  row: Row;
  maxTotal: number;
  highlighted: boolean;
  flashed: boolean;
  flashKey: number;
  reduce: boolean;
  onEnter: () => void;
}) {
  const color = row.side === 'bid' ? UP : DOWN;
  const depth = Math.max(0.02, row.total / maxTotal);

  return (
    <li
      onPointerEnter={onEnter}
      className="relative flex h-[22px] cursor-default items-center px-2 font-mono text-[11px] tabular-nums"
    >
      <span
        aria-hidden
        className="absolute inset-y-px right-1 rounded-[3px]"
        style={{
          width: `calc(${(depth * 100).toFixed(2)}% - 4px)`,
          background: color,
          opacity: highlighted ? 0.28 : 0.13,
          transition: reduce ? undefined : `opacity 140ms ease-out, width 320ms ${EASE}`,
        }}
      />
      {flashed && !reduce ? (
        <span
          key={flashKey}
          aria-hidden
          className="absolute inset-y-0 left-0 right-0"
          style={{ background: color, animation: 'spectrum-mc-flash 520ms ease-out forwards' }}
        />
      ) : null}
      <span className="relative z-10 w-[38%] text-left" style={{ color }}>
        {formatMoney(row.price)}
      </span>
      <span className="relative z-10 w-[31%] text-right text-neutral-700 dark:text-neutral-300">
        {compactSize(row.size)}
      </span>
      <span className="relative z-10 w-[31%] text-right text-neutral-400 dark:text-neutral-500">
        {compactSize(row.total)}
      </span>
    </li>
  );
}

export interface OrderBookProps {
  className?: string;
  book?: OrderBook;
  symbol?: string;
  live?: boolean;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function OrderBookLadder({
  className,
  book = SOL_LADDER,
  symbol = 'SOL',
  live = false,
  status = 'ready',
  onRetry,
}: OrderBookProps) {
  const reduce = usePrefersReducedMotion();
  const [hovered, setHovered] = React.useState<{ side: 'bid' | 'ask'; index: number } | null>(null);
  const [nonce, setNonce] = React.useState(0);

  const current = React.useMemo(() => {
    if (!live || nonce === 0) return book;
    const rand = mulberry32(0xb00c + nonce);
    const jitter = (levels: BookLevel[]) => {
      let total = 0;
      return levels.map((level) => {
        const size = Math.max(1, Math.round(level.size * (0.82 + rand() * 0.4)));
        total += size;
        return { ...level, size, total };
      });
    };
    return { ...book, bids: jitter(book.bids), asks: jitter(book.asks) };
  }, [book, live, nonce]);

  React.useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setNonce((n) => n + 1), 1400);
    return () => window.clearInterval(id);
  }, [live]);

  const flashed = React.useMemo(() => {
    const next = new Set<string>();
    if (!live || nonce === 0) return next;
    const rand = mulberry32(0xf1a5 + nonce);
    for (const side of ['bid', 'ask'] as const) {
      const levels = side === 'bid' ? current.bids : current.asks;
      for (let i = 0; i < levels.length; i += 1) {
        if (rand() > 0.62) next.add(`${side}-${i}`);
      }
    }
    return next;
  }, [live, nonce, current]);

  const maxTotal = Math.max(
    current.bids[current.bids.length - 1]?.total ?? 1,
    current.asks[current.asks.length - 1]?.total ?? 1,
    1,
  );

  const bestBid = current.bids[0]?.price ?? current.mid;
  const bestAsk = current.asks[0]?.price ?? current.mid;
  const spread = bestAsk - bestBid;

  const askRows: Row[] = current.asks
    .map((level, index) => ({ ...level, side: 'ask' as const, index }))
    .reverse();
  const bidRows: Row[] = current.bids.map((level, index) => ({
    ...level,
    side: 'bid' as const,
    index,
  }));

  const isHighlighted = (row: Row) =>
    hovered != null && hovered.side === row.side && row.index <= hovered.index;

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border border-black/8 dark:border-white/10',
        marketVarsClassName,
        className,
      )}
      onPointerLeave={() => setHovered(null)}
    >
      <Keyframes />

      <div className="flex items-center justify-between border-b border-black/6 px-2.5 py-2 dark:border-white/8">
        <span className="font-mono text-[11px] font-medium tracking-wide text-neutral-950 dark:text-white">
          {symbol} <span className="text-neutral-400">Order book</span>
        </span>
        {live ? (
          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span
              className="size-1.5 rounded-full"
              style={{
                background: UP,
                animation: reduce ? undefined : 'spectrum-mc-fade 1.1s ease-in-out infinite alternate',
              }}
            />
            Live
          </span>
        ) : null}
      </div>

      <ChartState
        status={status}
        height={320}
        variant="rows"
        empty={{ title: 'Book is empty', description: 'No resting orders on this pair right now.' }}
        onRetry={onRetry}
      >
      <div className="flex px-2 py-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        <span className="w-[38%]">Price</span>
        <span className="w-[31%] text-right">Size</span>
        <span className="w-[31%] text-right">Total</span>
      </div>

      <ul>
        {askRows.map((row) => (
          <BookRow
            key={`ask-${row.index}`}
            row={row}
            maxTotal={maxTotal}
            highlighted={isHighlighted(row)}
            flashed={flashed.has(`ask-${row.index}`)}
            flashKey={nonce}
            reduce={reduce}
            onEnter={() => setHovered({ side: 'ask', index: row.index })}
          />
        ))}
      </ul>

      <div className="my-1 flex items-center justify-between border-y border-black/6 bg-black/[0.02] px-2 py-1.5 font-mono text-[11px] tabular-nums dark:border-white/8 dark:bg-white/[0.03]">
        <span className="font-medium text-neutral-950 dark:text-white">
          {formatMoney(current.mid)}
        </span>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
          spread {formatSpread(spread, current.mid)} · {((spread / current.mid) * 100).toFixed(3)}%
        </span>
      </div>

      <ul className="pb-1">
        {bidRows.map((row) => (
          <BookRow
            key={`bid-${row.index}`}
            row={row}
            maxTotal={maxTotal}
            highlighted={isHighlighted(row)}
            flashed={flashed.has(`bid-${row.index}`)}
            flashKey={nonce}
            reduce={reduce}
            onEnter={() => setHovered({ side: 'bid', index: row.index })}
          />
        ))}
      </ul>
      </ChartState>
    </div>
  );
}

export function DefaultOrderBook(props: OrderBookProps) {
  return <OrderBookLadder {...props} />;
}

export function LiveOrderBook(props: OrderBookProps) {
  return <OrderBookLadder live {...props} />;
}

export function EthereumOrderBook(props: OrderBookProps) {
  return <OrderBookLadder book={ETH_LADDER} symbol="ETH" {...props} />;
}
