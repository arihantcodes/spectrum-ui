'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export type QuotaBannerVariant = 'Banner' | 'Compact';

export interface QuotaBannerProps {
  used: number;
  limit: number;
  resetsInSeconds?: number;
  upgradeLabel?: string;
  onUpgrade?: () => void;
  variant?: QuotaBannerVariant;
  className?: string;
}

function useCountdown(seconds?: number) {
  const [remaining, setRemaining] = useState(seconds ?? 0);
  useEffect(() => {
    setRemaining(seconds ?? 0);
    if (!seconds) return;
    const t = setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);
  const minutes = Math.floor(remaining / 60);
  return `${minutes}:${String(remaining % 60).padStart(2, '0')}`;
}

export function QuotaBanner({
  used,
  limit,
  resetsInSeconds,
  upgradeLabel = 'Upgrade',
  onUpgrade,
  variant = 'Banner',
  className,
}: QuotaBannerProps) {
  const countdown = useCountdown(resetsInSeconds);
  const ratio = Math.min(1, used / limit);
  const exhausted = used >= limit;

  if (variant === 'Compact') {
    return (
      <div
        className={cn(
          'flex w-fit items-center gap-2.5 rounded-full border border-black/[0.08] bg-white py-1.5 pl-3 pr-1.5 text-[12px] dark:border-white/[0.09] dark:bg-[#0B0B0D]',
          className,
        )}
      >
        <span className="font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
          {used}/{limit}
        </span>
        <span aria-hidden className="h-1 w-12 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]">
          <span
            className={cn(
              'block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
              exhausted ? 'bg-amber-500' : 'bg-neutral-900 dark:bg-neutral-100',
            )}
            style={{ width: `${ratio * 100}%` }}
          />
        </span>
        {resetsInSeconds !== undefined && (
          <span className="font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
            {countdown}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      role="status"
      className={cn(
        'flex w-full max-w-[480px] items-center gap-3 rounded-xl border py-2.5 pl-3 pr-2',
        exhausted
          ? 'border-amber-500/25 bg-amber-500/[0.06]'
          : 'border-black/[0.08] bg-white dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <span
        className={cn(
          'grid size-7 shrink-0 place-items-center rounded-full',
          exhausted
            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
            : 'bg-black/[0.05] text-neutral-500 dark:bg-white/[0.07] dark:text-neutral-400',
        )}
      >
        <Zap className="size-3.5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium text-neutral-900 dark:text-neutral-100">
          {exhausted ? 'Message limit reached' : `${limit - used} messages left today`}
        </p>
        <p className="mt-0.5 flex items-center gap-2 font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
          <span aria-hidden className="h-1 w-16 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]">
            <span
              className={cn(
                'block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
                exhausted ? 'bg-amber-500' : 'bg-neutral-900 dark:bg-neutral-100',
              )}
              style={{ width: `${ratio * 100}%` }}
            />
          </span>
          {used}/{limit}
          {resetsInSeconds !== undefined && <span>· resets in {countdown}</span>}
        </p>
      </div>

      <button
        type="button"
        onClick={onUpgrade}
        className="shrink-0 rounded-lg bg-neutral-900 px-3 py-1.5 text-[12px] font-medium text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {upgradeLabel}
      </button>
    </div>
  );
}

export default QuotaBanner;
