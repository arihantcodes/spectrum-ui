'use client';

import { useState } from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-msg-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type InlineEditPhase = 'selected' | 'reviewing' | 'accepted';

export interface InlineEditProps {
  before: string;
  selection: string;
  after: string;
  suggestion: string;
  actionLabel?: string;
  phase?: InlineEditPhase;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

export function InlineEdit({
  before,
  selection,
  after,
  suggestion,
  actionLabel = 'Tighten this',
  phase: phaseProp,
  onAccept,
  onReject,
  className,
}: InlineEditProps) {
  const [phaseState, setPhaseState] = useState<InlineEditPhase>('selected');
  const phase = phaseProp !== undefined ? phaseProp : phaseState;

  function accept() {
    setPhaseState('accepted');
    onAccept?.();
  }
  function reject() {
    setPhaseState('selected');
    onReject?.();
  }

  return (
    <div className={cn('w-full max-w-[480px] text-[13.5px]', className)}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <p className="leading-[1.75] text-neutral-700 dark:text-neutral-300">
        {before}
        {phase === 'accepted' ? (
          <span className="rounded bg-emerald-500/10 px-0.5 text-neutral-900 motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-neutral-100">
            {suggestion}
          </span>
        ) : (
          <span className="group/edit relative inline">
            <span className="rounded bg-sky-500/15 px-0.5 dark:bg-sky-400/20">{selection}</span>
            {phase === 'selected' && (
              <span className="absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 motion-safe:animate-[su-msg-in_200ms_cubic-bezier(0.23,1,0.32,1)_both]">
                <button
                  type="button"
                  onClick={() => setPhaseState('reviewing')}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-black/[0.08] bg-white py-1 pl-2 pr-2.5 text-[11.5px] font-medium text-neutral-700 shadow-md transition-transform duration-150 active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-200"
                >
                  <Sparkles className="size-3 text-neutral-400 dark:text-neutral-500" />
                  {actionLabel}
                </button>
              </span>
            )}
          </span>
        )}
        {after}
      </p>

      {phase === 'reviewing' && (
        <div className="mt-8 rounded-xl border border-black/[0.08] bg-white p-3 shadow-xs motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both] dark:border-white/[0.09] dark:bg-[#0B0B0D]">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-neutral-400 dark:text-neutral-600">
            Suggestion
          </p>
          <p className="mt-2 leading-[1.7]">
            <del className="rounded bg-red-500/10 px-0.5 text-neutral-400 line-through decoration-red-400/50 dark:text-neutral-500">
              {selection}
            </del>{' '}
            <ins className="rounded bg-emerald-500/10 px-0.5 text-neutral-900 no-underline dark:text-neutral-100">
              {suggestion}
            </ins>
          </p>
          <div className="mt-3 flex items-center justify-end gap-1.5">
            <button
              type="button"
              aria-label="Reject suggestion"
              onClick={reject}
              className="grid size-7 place-items-center rounded-lg text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
            >
              <X className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Accept suggestion"
              onClick={accept}
              className="grid size-7 place-items-center rounded-lg bg-neutral-900 text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
            >
              <Check className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InlineEdit;
