'use client';

import { useState } from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
@keyframes su-msg-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type SuggestionState = 'open' | 'applied' | 'dismissed';

export type SuggestionBannerVariant = 'Inline' | 'Floating';

export interface SuggestionBannerProps {
  suggestion?: string;
  detail?: string;
  applyLabel?: string;
  state?: SuggestionState;
  onApply?: () => void;
  onDismiss?: () => void;
  variant?: SuggestionBannerVariant;
  className?: string;
}

export function SuggestionBanner({
  suggestion = 'Flag Meridian Lines in the weekly carrier report',
  detail = 'Based on the SLA breach found on the Rotterdam–Felixstowe lane.',
  applyLabel = 'Apply',
  state: stateProp,
  onApply,
  onDismiss,
  variant = 'Inline',
  className,
}: SuggestionBannerProps) {
  const [stateState, setStateState] = useState<SuggestionState>('open');
  const state = stateProp !== undefined ? stateProp : stateState;

  function apply() {
    setStateState('applied');
    onApply?.();
  }
  function dismiss() {
    setStateState('dismissed');
    onDismiss?.();
  }

  if (state === 'dismissed') return null;

  if (state === 'applied') {
    return (
      <div
        role="status"
        className={cn(
          'flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[12.5px] font-medium text-emerald-700 motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-emerald-400',
          className,
        )}
      >
        <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
        <Check className="size-3.5 motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both]" strokeWidth={2.5} />
        Applied — {suggestion.charAt(0).toLowerCase() + suggestion.slice(1)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full max-w-[480px] items-start gap-2.5 rounded-xl border border-black/[0.08] bg-white py-2.5 pl-3 pr-2 dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        variant === 'Floating' && 'shadow-lg',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <Sparkles className="mt-0.5 size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" />

      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium leading-snug text-neutral-900 dark:text-neutral-100">
          {suggestion}
        </p>
        {detail && (
          <p className="mt-0.5 text-[11.5px] leading-[1.55] text-neutral-500 dark:text-neutral-400">
            {detail}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="Dismiss suggestion"
          onClick={dismiss}
          className="grid size-7 place-items-center rounded-md text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.9] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
        >
          <X className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={apply}
          className="rounded-lg bg-neutral-900 px-2.5 py-1.5 text-[12px] font-medium text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {applyLabel}
        </button>
      </div>
    </div>
  );
}

export default SuggestionBanner;
