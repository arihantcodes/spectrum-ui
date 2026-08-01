'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
@keyframes su-msg-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type ApprovalDecision = 'approved' | 'rejected';

export interface ApprovalCardProps {
  title?: string;
  description?: string;
  meta?: string;
  approveLabel?: string;
  rejectLabel?: string;
  decision?: ApprovalDecision | null;
  onDecide?: (decision: ApprovalDecision) => void;
  className?: string;
}

export function ApprovalCard({
  title = 'Send carrier notice?',
  description = 'A formal SLA-breach notice to Meridian Lines for the Rotterdam–Felixstowe lane, citing 2.3 days over contracted transit.',
  meta = 'drafted by agent · draft_carrier_notice',
  approveLabel = 'Approve & send',
  rejectLabel = 'Dismiss',
  decision: decisionProp,
  onDecide,
  className,
}: ApprovalCardProps) {
  const [decisionState, setDecisionState] = useState<ApprovalDecision | null>(null);
  const decision = decisionProp !== undefined ? decisionProp : decisionState;

  function decide(next: ApprovalDecision) {
    setDecisionState(next);
    onDecide?.(next);
  }

  return (
    <div
      className={cn(
        'w-full max-w-[420px] rounded-2xl border border-black/[0.08] bg-white p-4 shadow-xs dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {decision ? (
        <div className="flex flex-col items-center py-4 text-center motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]">
          <span
            className={cn(
              'grid size-8 place-items-center rounded-full motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both]',
              decision === 'approved'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400',
            )}
          >
            {decision === 'approved' ? (
              <Check className="size-4" strokeWidth={2.5} />
            ) : (
              <X className="size-4" strokeWidth={2.5} />
            )}
          </span>
          <p className="mt-2.5 text-[13.5px] font-medium text-neutral-900 dark:text-neutral-50">
            {decision === 'approved' ? 'Approved — notice queued' : 'Dismissed'}
          </p>
          <p className="mt-1 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
            {meta}
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-[14px] font-semibold tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
          <p className="mt-2.5 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
            {meta}
          </p>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => decide('rejected')}
              className="rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-neutral-500 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-800 active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
            >
              {rejectLabel}
            </button>
            <button
              type="button"
              onClick={() => decide('approved')}
              className="rounded-lg bg-neutral-900 px-3 py-1.5 text-[12.5px] font-medium text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {approveLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ApprovalCard;
