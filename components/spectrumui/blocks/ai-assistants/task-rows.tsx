'use client';

import { useState } from 'react';
import { Check, ChevronDown, CircleDashed, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
`;

export type TaskStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface TaskRow {
  id: string;
  title: string;
  detail?: string;
  status: TaskStatus;
  note?: string;
}

export type TaskRowsVariant = 'Default' | 'Compact';

export interface TaskRowsProps {
  tasks: TaskRow[];
  variant?: TaskRowsVariant;
  className?: string;
}

const BADGE: Record<TaskStatus, string> = {
  queued: 'bg-black/[0.05] text-neutral-500 dark:bg-white/[0.07] dark:text-neutral-400',
  running: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
  completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  failed: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === 'completed')
    return (
      <span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-emerald-400">
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  if (status === 'failed')
    return (
      <span className="grid size-5 place-items-center rounded-full bg-red-500/15 text-red-600 motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-red-400">
        <X className="size-3" strokeWidth={3} />
      </span>
    );
  if (status === 'running')
    return (
      <Loader2 className="size-4 animate-spin text-sky-600 [animation-duration:800ms] motion-reduce:animate-none dark:text-sky-400" />
    );
  return <CircleDashed className="size-4 text-neutral-300 dark:text-neutral-600" />;
}

export function TaskRows({ tasks, variant = 'Default', className }: TaskRowsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const compact = variant === 'Compact';

  return (
    <ul
      className={cn(
        'w-full max-w-[480px] divide-y divide-black/[0.05] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-xs dark:divide-white/[0.06] dark:border-white/[0.08] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {tasks.map((task) => {
        const open = task.id === openId;
        const expandable = !compact && Boolean(task.note);
        return (
          <li key={task.id}>
            <button
              type="button"
              disabled={!expandable}
              aria-expanded={expandable ? open : undefined}
              onClick={() => setOpenId(open ? null : task.id)}
              className={cn(
                'flex w-full items-center gap-2.5 px-3 text-left',
                compact ? 'py-2' : 'py-2.5',
                expandable &&
                  'transition-colors duration-150 hover:bg-black/[0.02] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:hover:bg-white/[0.03]',
              )}
            >
              <StatusIcon status={task.status} />
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block truncate font-medium text-neutral-800 dark:text-neutral-200',
                    compact ? 'text-[12.5px]' : 'text-[13px]',
                  )}
                >
                  {task.title}
                </span>
              </span>
              {task.detail && (
                <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
                  {task.detail}
                </span>
              )}
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wide',
                  BADGE[task.status],
                )}
              >
                {task.status}
              </span>
              {expandable && (
                <ChevronDown
                  className={cn(
                    'size-3 shrink-0 text-neutral-400 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                    open && 'rotate-180',
                  )}
                />
              )}
            </button>

            {expandable && (
              <div
                className="grid transition-[grid-template-rows] duration-[240ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="px-3 pb-3 pl-[42px] text-[12px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
                    {task.note}
                  </p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default TaskRows;
