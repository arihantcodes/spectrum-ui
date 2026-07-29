'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrackerStage {
  id: string;
  label: string;
}

export type StatusTrackerVariant = 'Default' | 'Minimal';

export interface StatusTrackerProps {
  stages: TrackerStage[];
  activeIndex: number;
  progress?: number;
  detail?: string;
  variant?: StatusTrackerVariant;
  className?: string;
}

export function StatusTracker({
  stages,
  activeIndex,
  progress = 0,
  detail,
  variant = 'Default',
  className,
}: StatusTrackerProps) {
  const done = activeIndex >= stages.length;

  if (variant === 'Minimal') {
    const label = done ? 'Complete' : stages[activeIndex]?.label;
    const overall = done ? 1 : (activeIndex + progress) / stages.length;
    return (
      <div className={cn('flex w-full max-w-[360px] items-center gap-2.5', className)}>
        <span aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]">
          <span
            className="block h-full rounded-full bg-neutral-900 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-100"
            style={{ width: `${overall * 100}%` }}
          />
        </span>
        <span className="shrink-0 text-[12px] text-neutral-500 dark:text-neutral-400">{label}</span>
        <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
          {Math.round(overall * 100)}%
        </span>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-[440px]', className)}>
      <ol className="flex items-center">
        {stages.map((stage, index) => {
          const completed = index < activeIndex || done;
          const active = index === activeIndex && !done;
          return (
            <li key={stage.id} className={cn('flex items-center', index > 0 && 'flex-1')}>
              {index > 0 && (
                <span aria-hidden className="mx-1.5 h-px flex-1 overflow-hidden bg-black/[0.08] dark:bg-white/[0.1]">
                  <span
                    className="block h-full bg-neutral-900 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-100"
                    style={{ width: completed ? '100%' : active ? `${progress * 100}%` : '0%' }}
                  />
                </span>
              )}
              <span className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'grid size-5 place-items-center rounded-full border transition-colors duration-200',
                    completed
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                      : active
                        ? 'border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100'
                        : 'border-black/[0.12] text-transparent dark:border-white/[0.14]',
                  )}
                >
                  {completed ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <span
                      className={cn(
                        'size-1.5 rounded-full',
                        active && 'bg-current motion-safe:animate-pulse',
                      )}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    'whitespace-nowrap font-mono text-[9.5px] uppercase tracking-wide',
                    active || completed
                      ? 'text-neutral-700 dark:text-neutral-300'
                      : 'text-neutral-300 dark:text-neutral-600',
                  )}
                >
                  {stage.label}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {detail && (
        <p className="mt-3 text-center text-[12px] text-neutral-400 dark:text-neutral-500" role="status">
          {detail}
        </p>
      )}
    </div>
  );
}

export default StatusTracker;
