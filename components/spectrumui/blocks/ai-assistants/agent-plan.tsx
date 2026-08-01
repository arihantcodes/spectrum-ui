'use client';

import { useState } from 'react';
import { ArrowRight, Check, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlanStep {
  id: string;
  title: string;
  detail?: string;
}

export type AgentPlanVariant = 'Default' | 'Compact';

export interface AgentPlanProps {
  title?: string;
  steps: PlanStep[];
  runLabel?: string;
  onRun?: (enabledStepIds: string[]) => void;
  variant?: AgentPlanVariant;
  className?: string;
}

export function AgentPlan({
  title = 'Proposed plan',
  steps,
  runLabel = 'Run plan',
  onRun,
  variant = 'Default',
  className,
}: AgentPlanProps) {
  const [disabled, setDisabled] = useState<Set<string>>(new Set());
  const compact = variant === 'Compact';
  const enabledCount = steps.length - disabled.size;

  function toggle(id: string) {
    setDisabled((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div
      className={cn(
        'w-full max-w-[440px] rounded-2xl border border-black/[0.08] bg-white shadow-xs dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-2.5 dark:border-white/[0.07]">
        <h3 className="text-[13px] font-semibold tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>
        <span className="font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
          {enabledCount}/{steps.length} steps
        </span>
      </div>

      <ol className={cn('px-2 py-1.5', compact ? 'space-y-0' : 'space-y-0.5')}>
        {steps.map((step, index) => {
          const off = disabled.has(step.id);
          return (
            <li key={step.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={!off}
                onClick={() => toggle(step.id)}
                className={cn(
                  'group flex w-full items-start gap-2.5 rounded-lg px-2 text-left transition-[background-color,opacity] duration-150',
                  compact ? 'py-1.5' : 'py-2',
                  'hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.04]',
                  off && 'opacity-45',
                )}
              >
                <GripVertical className="mt-0.5 size-3 shrink-0 text-neutral-200 opacity-0 transition-opacity duration-150 [@media(hover:hover)]:group-hover:opacity-100 dark:text-neutral-700" />
                <span
                  aria-hidden
                  className={cn(
                    'mt-px grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors duration-150',
                    off
                      ? 'border-neutral-300 dark:border-neutral-600'
                      : 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900',
                  )}
                >
                  <Check
                    className={cn(
                      'size-2.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                      off ? 'scale-0' : 'scale-100',
                    )}
                    strokeWidth={3}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block font-medium text-neutral-800 dark:text-neutral-200',
                      compact ? 'text-[12.5px]' : 'text-[13px]',
                      off && 'line-through decoration-neutral-300 dark:decoration-neutral-600',
                    )}
                  >
                    <span className="mr-1.5 font-mono text-[10.5px] font-normal tabular-nums text-neutral-400 dark:text-neutral-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.title}
                  </span>
                  {!compact && step.detail && (
                    <span className="mt-0.5 block text-[11.5px] leading-[1.5] text-neutral-500 dark:text-neutral-500">
                      {step.detail}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-black/[0.06] px-3 py-2.5 dark:border-white/[0.07]">
        <button
          type="button"
          disabled={enabledCount === 0}
          onClick={() => onRun?.(steps.filter((step) => !disabled.has(step.id)).map((step) => step.id))}
          className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 py-2 text-[12.5px] font-medium text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] disabled:opacity-30 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {runLabel}
          <ArrowRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

export default AgentPlan;
