'use client';

import { useState } from 'react';
import { Check, ChevronDown, CircleDashed, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
`;
import type { ToolCall, ToolCallStatus } from './types';

const STATUS_STYLES: Record<ToolCallStatus, string> = {
  pending: 'bg-neutral-300 dark:bg-neutral-600',
  running: 'bg-sky-500/80 motion-safe:animate-pulse',
  success: 'bg-emerald-500/80',
  error: 'bg-red-500/80',
  cancelled: 'bg-neutral-400 dark:bg-neutral-500',
};

export type AgentStepsVariant = 'Default' | 'Compact';

export interface AgentStepsProps {
  steps: ToolCall[];
  variant?: AgentStepsVariant;
  className?: string;
}

function duration(step: ToolCall) {
  if (!step.startedAt || !step.completedAt) return null;
  return `${((step.completedAt - step.startedAt) / 1000).toFixed(1)}s`;
}

export function AgentSteps({ steps, variant = 'Default', className }: AgentStepsProps) {
  return (
    <ol className={cn('w-full max-w-[480px] text-[13px]', className)}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {steps.map((step, index) => (
        <StepRow
          key={step.id}
          step={step}
          last={index === steps.length - 1}
          compact={variant === 'Compact'}
        />
      ))}
    </ol>
  );
}

function StepRow({ step, last, compact }: { step: ToolCall; last: boolean; compact: boolean }) {
  const [open, setOpen] = useState(false);
  const elapsed = duration(step);
  const expandable = !compact && Boolean(step.result || step.children?.length);

  return (
    <li className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <span className="grid size-5 shrink-0 place-items-center">
          {step.status === 'success' ? (
            <span className="grid size-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-emerald-400">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
          ) : step.status === 'error' ? (
            <span className="grid size-4 place-items-center rounded-full bg-red-500/15 text-red-600 motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-red-400">
              <X className="size-2.5" strokeWidth={3} />
            </span>
          ) : step.status === 'pending' ? (
            <CircleDashed className="size-3.5 text-neutral-300 dark:text-neutral-600" />
          ) : (
            <span className={cn('size-2 rounded-full', STATUS_STYLES[step.status])} />
          )}
        </span>
        {!last && <span className="w-px flex-1 bg-black/[0.07] dark:bg-white/[0.08]" />}
      </div>

      <div className={cn('min-w-0 flex-1', last ? 'pb-0' : compact ? 'pb-2.5' : 'pb-4')}>
        <button
          type="button"
          onClick={expandable ? () => setOpen((o) => !o) : undefined}
          aria-expanded={expandable ? open : undefined}
          className={cn(
            'flex w-full items-center gap-2 text-left',
            expandable &&
              'rounded transition-transform duration-150 active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
          )}
        >
          <span className="font-mono text-[12px] font-medium text-neutral-800 dark:text-neutral-200">
            {step.name}
          </span>
          {step.status === 'running' && (
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-sky-600 dark:text-sky-400">
              running
            </span>
          )}
          {step.status === 'pending' && (
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-neutral-400 dark:text-neutral-600">
              queued
            </span>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            {elapsed && (
              <span className="font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
                {elapsed}
              </span>
            )}
            {expandable && (
              <ChevronDown
                className={cn(
                  'size-3 text-neutral-400 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  open && 'rotate-180',
                )}
              />
            )}
          </span>
        </button>

        {!compact && step.args && (
          <p className="mt-1 truncate font-mono text-[11px] text-neutral-400 dark:text-neutral-600">
            {JSON.stringify(step.args)}
          </p>
        )}

        {expandable && (
          <div
            className="grid transition-[grid-template-rows] duration-[240ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              {step.result && (
                <p className="mt-2 rounded-lg bg-black/[0.03] px-2.5 py-2 text-[12px] leading-[1.6] text-neutral-600 dark:bg-white/[0.04] dark:text-neutral-400">
                  {step.result}
                </p>
              )}
              {step.children && step.children.length > 0 && (
                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {step.children.map((child) => (
                    <div
                      key={child.id}
                      className="rounded-lg border border-black/[0.06] px-2.5 py-2 dark:border-white/[0.07]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={cn('size-1.5 rounded-full', STATUS_STYLES[child.status])} />
                        <span className="truncate font-mono text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                          {child.name}
                        </span>
                        {child.parallel && (
                          <span className="ml-auto font-mono text-[9px] uppercase tracking-wide text-neutral-400 dark:text-neutral-600">
                            parallel
                          </span>
                        )}
                      </div>
                      {child.result && (
                        <p className="mt-1 text-[11px] leading-[1.5] text-neutral-500 dark:text-neutral-500">
                          {child.result}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default AgentSteps;
