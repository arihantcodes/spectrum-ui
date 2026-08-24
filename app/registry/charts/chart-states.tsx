'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ChartEmpty,
  ChartError,
  ChartSkeleton,
  type ChartStatus,
  ChartState,
  type SkeletonVariant,
  seriesVarsClassName,
} from './chart-engine';
import { CohortChart } from './cohort-chart';

const frame =
  'rounded-xl border border-black/8 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.02]';

function Panel({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(frame, className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-950 dark:text-white">
          {title}
        </p>
        {hint ? (
          <p className="font-mono text-[10.5px] text-neutral-400 dark:text-neutral-500">{hint}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

const VARIANTS: { variant: SkeletonVariant; label: string; use: string }[] = [
  { variant: 'bars', label: 'bars', use: 'bar, candle, volume, histogram' },
  { variant: 'line', label: 'line', use: 'line, area, price, depth' },
  { variant: 'grid', label: 'grid', use: 'calendar, cohort, heatmap' },
  { variant: 'rows', label: 'rows', use: 'order book, cohort, tables' },
  { variant: 'arc', label: 'arc', use: 'radial, progress' },
  { variant: 'cards', label: 'cards', use: 'stat cards, KPI tiles' },
];

export function ChartSkeletonGallery({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', seriesVarsClassName, className)}>
      {VARIANTS.map(({ variant, label, use }) => (
        <Panel key={variant} title={`variant="${label}"`} hint={use}>
          <ChartSkeleton variant={variant} height={150} />
        </Panel>
      ))}
    </div>
  );
}

export function ChartEmptyAndError({ className }: { className?: string }) {
  const [reloading, setReloading] = React.useState(false);

  React.useEffect(() => {
    if (!reloading) return;
    const id = window.setTimeout(() => setReloading(false), 1600);
    return () => window.clearTimeout(id);
  }, [reloading]);

  return (
    <div className={cn('grid gap-3 lg:grid-cols-2', seriesVarsClassName, className)}>
      <Panel title="empty" hint="no data, nothing broken">
        <ChartEmpty
          height={200}
          title="No events in this range"
          description="Widen the date range, or send your first event to start populating this chart."
        />
      </Panel>
      <Panel title="error" hint="retry is part of the state">
        {reloading ? (
          <ChartSkeleton variant="bars" height={200} />
        ) : (
          <ChartError
            height={200}
            title="Could not load analytics"
            description="The metrics API returned a 503. This is usually transient."
            onRetry={() => setReloading(true)}
          />
        )}
      </Panel>
    </div>
  );
}

const CYCLE: ChartStatus[] = ['loading', 'ready', 'empty', 'error'];

export function ChartStatusSwitcher({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<ChartStatus>('loading');

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <div
        role="tablist"
        aria-label="Chart status"
        className="mb-3 inline-flex items-center gap-0.5 rounded-full bg-black/[0.045] p-0.5 dark:bg-white/[0.07]"
      >
        {CYCLE.map((option) => {
          const active = option === status;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setStatus(option)}
              className={cn(
                'rounded-full px-3 py-1 font-mono text-[11px] leading-none transition-colors',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25',
                active
                  ? 'bg-white text-neutral-950 shadow-sm dark:bg-white/12 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <CohortChart status={status} onRetry={() => setStatus('loading')} />
    </div>
  );
}

export function ChartStateUsage({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<ChartStatus>('empty');

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <Panel title="ChartState" hint="wrap anything">
        <ChartState
          status={status}
          height={190}
          variant="line"
          empty={{
            title: 'Nothing tracked yet',
            description: 'Install the SDK and your first session will show up here.',
            action: (
              <button
                type="button"
                onClick={() => setStatus('ready')}
                className="rounded-full bg-neutral-900 px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
              >
                Load sample data
              </button>
            ),
          }}
          onRetry={() => setStatus('ready')}
        >
          <div className="flex h-[190px] flex-col items-center justify-center gap-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
            <p className="font-mono text-[12px] text-neutral-500 dark:text-neutral-400">
              your chart renders here
            </p>
            <button
              type="button"
              onClick={() => setStatus('empty')}
              className="font-mono text-[11px] text-neutral-400 underline underline-offset-2 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              reset to empty
            </button>
          </div>
        </ChartState>
      </Panel>
    </div>
  );
}

export function DefaultChartStates(props: { className?: string }) {
  return <ChartStatusSwitcher {...props} />;
}
