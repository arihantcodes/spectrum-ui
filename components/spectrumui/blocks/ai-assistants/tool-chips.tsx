'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ToolCall, ToolCallStatus } from './types';

const DOT: Record<ToolCallStatus, string> = {
  pending: 'bg-neutral-300 dark:bg-neutral-600',
  running: 'bg-sky-500/80 motion-safe:animate-pulse',
  success: 'bg-emerald-500/80',
  error: 'bg-red-500/80',
  cancelled: 'bg-neutral-400 dark:bg-neutral-500',
};

export type ToolChipsVariant = 'Row' | 'Stack';

export interface ToolChipsProps {
  calls: ToolCall[];
  variant?: ToolChipsVariant;
  className?: string;
}

function duration(call: ToolCall) {
  if (!call.startedAt || !call.completedAt) return null;
  return `${((call.completedAt - call.startedAt) / 1000).toFixed(1)}s`;
}

export function ToolChips({ calls, variant = 'Row', className }: ToolChipsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = calls.find((call) => call.id === openId);

  return (
    <div className={cn('w-full max-w-[480px]', className)}>
      <div className={cn('flex gap-1.5', variant === 'Stack' ? 'flex-col' : 'flex-wrap')}>
        {calls.map((call) => {
          const active = call.id === openId;
          const elapsed = duration(call);
          return (
            <button
              key={call.id}
              type="button"
              aria-expanded={active}
              onClick={() => setOpenId(active ? null : call.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg border py-1.5 pl-2.5 pr-3 text-left',
                'transition-[border-color,background-color,transform] duration-150 active:scale-[0.98]',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                active
                  ? 'border-black/[0.16] bg-black/[0.03] dark:border-white/[0.22] dark:bg-white/[0.05]'
                  : 'border-black/[0.07] hover:border-black/[0.14] dark:border-white/[0.08] dark:hover:border-white/[0.16]',
                variant === 'Stack' && 'w-full',
              )}
            >
              <span className={cn('size-1.5 shrink-0 rounded-full', DOT[call.status])} />
              <span className="truncate font-mono text-[11.5px] font-medium text-neutral-700 dark:text-neutral-300">
                {call.name}
              </span>
              {call.status === 'running' ? (
                <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wide text-sky-600 dark:text-sky-400">
                  running
                </span>
              ) : elapsed ? (
                <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-600">
                  {elapsed}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-[240ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ gridTemplateRows: open?.result ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          {open?.result && (
            <div className="mt-2 rounded-lg bg-black/[0.03] px-3 py-2.5 dark:bg-white/[0.04]">
              {open.args && (
                <p className="mb-1.5 truncate font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
                  {JSON.stringify(open.args)}
                </p>
              )}
              <p className="text-[12.5px] leading-[1.6] text-neutral-600 dark:text-neutral-400">
                {open.result}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolChips;
