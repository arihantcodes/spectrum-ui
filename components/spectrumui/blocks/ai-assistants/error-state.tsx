'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ErrorStateVariant = 'Card' | 'Inline';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  retrying?: boolean;
  onRetry?: () => void;
  variant?: ErrorStateVariant;
  className?: string;
}

export function ErrorState({
  title = 'Generation failed',
  message = 'The model timed out before finishing. Your prompt is preserved — retrying usually resolves this.',
  retryLabel = 'Retry',
  retrying: retryingProp,
  onRetry,
  variant = 'Card',
  className,
}: ErrorStateProps) {
  const [retryingState, setRetryingState] = useState(false);
  const retrying = retryingProp !== undefined ? retryingProp : retryingState;

  function retry() {
    setRetryingState(true);
    setTimeout(() => setRetryingState(false), 1600);
    onRetry?.();
  }

  if (variant === 'Inline') {
    return (
      <div
        role="alert"
        className={cn(
          'flex w-fit items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/[0.06] py-1.5 pl-3 pr-1.5 text-[12.5px] text-red-700 dark:text-red-400',
          className,
        )}
      >
        <AlertTriangle className="size-3.5 shrink-0" />
        <span>{title}</span>
        <button
          type="button"
          onClick={retry}
          disabled={retrying}
          className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11.5px] font-medium text-neutral-800 shadow-sm transition-transform duration-150 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:bg-neutral-900 dark:text-neutral-200"
        >
          {retrying ? (
            <Loader2 className="size-3 animate-spin [animation-duration:800ms]" />
          ) : (
            <RefreshCw className="size-3" />
          )}
          {retryLabel}
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={cn(
        'w-full max-w-[420px] rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
          <AlertTriangle className="size-4" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[13.5px] font-semibold tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
          <p className="mt-1 text-[12.5px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex justify-end">
        <button
          type="button"
          onClick={retry}
          disabled={retrying}
          className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-[12.5px] font-medium text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {retrying ? (
            <Loader2 className="size-3.5 animate-spin [animation-duration:800ms]" />
          ) : (
            <RefreshCw className="size-3.5" />
          )}
          {retrying ? 'Retrying…' : retryLabel}
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
