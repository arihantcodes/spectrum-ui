'use client';

import { cn } from '@/lib/utils';
import type { UsageState } from './types';

export type UsageMeterVariant = 'Bar' | 'Inline';

export interface UsageMeterProps {
  usage: UsageState;
  variant?: UsageMeterVariant;
  className?: string;
}

function formatTokens(count: number) {
  if (count < 1000) return `${count}`;
  return `${(count / 1000).toFixed(1)}k`;
}

export function UsageMeter({ usage, variant = 'Bar', className }: UsageMeterProps) {
  const used = usage.promptTokens + usage.completionTokens;
  const ratio = Math.min(1, used / usage.contextWindow);
  const percent = Math.round(ratio * 100);

  const barColor =
    ratio > 0.9
      ? 'bg-red-500/80'
      : ratio > 0.75
        ? 'bg-amber-500/80'
        : 'bg-neutral-900 dark:bg-neutral-100';

  if (variant === 'Inline') {
    return (
      <div
        className={cn(
          'flex w-fit items-center gap-2.5 font-mono text-[11.5px] tabular-nums text-neutral-500 dark:text-neutral-400',
          className,
        )}
      >
        <span aria-hidden className="h-1 w-16 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]">
          <span
            className={cn('block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]', barColor)}
            style={{ width: `${percent}%` }}
          />
        </span>
        <span>
          {formatTokens(used)} / {formatTokens(usage.contextWindow)}
        </span>
        {usage.estimatedCostUsd !== undefined && (
          <span className="text-neutral-400 dark:text-neutral-600">
            ${usage.estimatedCostUsd.toFixed(4)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-[380px]', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200">
          Context window
        </span>
        <span className="font-mono text-[11.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
          {formatTokens(used)} / {formatTokens(usage.contextWindow)} · {percent}%
        </span>
      </div>

      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={usage.contextWindow}
        aria-valuenow={used}
        aria-label="Context window usage"
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]"
      >
        <span
          className={cn(
            'block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            barColor,
          )}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
        <span>
          prompt {formatTokens(usage.promptTokens)} · completion {formatTokens(usage.completionTokens)}
        </span>
        {usage.estimatedCostUsd !== undefined && <span>≈ ${usage.estimatedCostUsd.toFixed(4)}</span>}
      </div>
    </div>
  );
}

export default UsageMeter;
