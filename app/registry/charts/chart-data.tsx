'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type Candle,
  type ChartStatus,
  DAY_MS,
  SOL_MARKET,
  mulberry32,
  round2,
  seriesVarsClassName,
} from './chart-engine';
import { MarketChart } from './market-chart';

type Outcome = 'ok' | 'empty' | 'fail';

function fakeFetch(outcome: Outcome, signal?: AbortSignal): Promise<Candle[]> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      if (outcome === 'fail') reject(new Error('503 from /api/candles'));
      else resolve(outcome === 'empty' ? [] : SOL_MARKET.slice(-120));
    }, 1100);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

export function useChartData(outcome: Outcome) {
  const [nonce, setNonce] = React.useState(0);
  const requestKey = `${outcome}:${nonce}`;
  const [result, setResult] = React.useState<{
    key: string;
    data: Candle[];
    status: ChartStatus;
  } | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    let live = true;

    fakeFetch(outcome, controller.signal)
      .then((rows) => {
        if (!live) return;
        setResult({ key: requestKey, data: rows, status: rows.length ? 'ready' : 'empty' });
      })
      .catch((error: unknown) => {
        if (!live || (error as Error).name === 'AbortError') return;
        setResult({ key: requestKey, data: [], status: 'error' });
      });

    return () => {
      live = false;
      controller.abort();
    };
  }, [outcome, requestKey]);

  const fresh = result?.key === requestKey ? result : null;

  return {
    data: fresh?.data ?? [],
    status: fresh?.status ?? ('loading' as ChartStatus),
    reload: React.useCallback(() => setNonce((n) => n + 1), []),
  };
}

function OutcomePicker({
  value,
  onChange,
}: {
  value: Outcome;
  onChange: (next: Outcome) => void;
}) {
  return (
    <div className="mb-3 inline-flex items-center gap-0.5 rounded-full bg-black/[0.045] p-0.5 dark:bg-white/[0.07]">
      {(['ok', 'empty', 'fail'] as Outcome[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            'rounded-full px-3 py-1 font-mono text-[11px] leading-none transition-colors',
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25',
            value === option
              ? 'bg-white text-neutral-950 shadow-sm dark:bg-white/12 dark:text-white'
              : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
          )}
        >
          server returns {option}
        </button>
      ))}
    </div>
  );
}

export function FetchRecipe({ className }: { className?: string }) {
  const [outcome, setOutcome] = React.useState<Outcome>('ok');
  const { data, status, reload } = useChartData(outcome);

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <OutcomePicker value={outcome} onChange={setOutcome} />
      <MarketChart
        data={data}
        status={status}
        onRetry={reload}
        symbol="SOL"
        name="from /api/candles"
        height={320}
        defaultRange="3M"
      />
    </div>
  );
}

export function toChartStatus({
  isLoading,
  error,
  rows,
}: {
  isLoading: boolean;
  error?: unknown;
  rows?: readonly unknown[] | null;
}): ChartStatus {
  if (isLoading) return 'loading';
  if (error) return 'error';
  if (!rows || rows.length === 0) return 'empty';
  return 'ready';
}

export function QueryRecipe({ className }: { className?: string }) {
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const rows = isLoading ? [] : SOL_MARKET.slice(-90);
  const status = toChartStatus({ isLoading, rows });

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <MarketChart
        data={rows}
        status={status}
        symbol="SOL"
        name="via useSWR"
        height={320}
        defaultRange="3M"
        showRangeSelector={false}
      />
    </div>
  );
}

export function StreamRecipe({ className }: { className?: string }) {
  const [data, setData] = React.useState<Candle[]>(() => SOL_MARKET.slice(-60));

  React.useEffect(() => {
    const rand = mulberry32(0xfeed);
    const id = window.setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const close = round2(Math.max(0.01, last.close * (1 + (rand() - 0.47) * 0.02)));
        const next: Candle = {
          t: last.t + DAY_MS,
          open: last.close,
          high: round2(Math.max(last.close, close) * (1 + rand() * 0.005)),
          low: round2(Math.min(last.close, close) * (1 - rand() * 0.005)),
          close,
          volume: Math.round((0.6 + rand()) * 1_000_000),
        };
        return [...prev, next].slice(-90);
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <MarketChart
        data={data}
        symbol="SOL"
        name="streaming"
        height={320}
        defaultRange="1M"
        showRangeSelector={false}
      />
    </div>
  );
}

export function DefaultChartData(props: { className?: string }) {
  return <FetchRecipe {...props} />;
}
