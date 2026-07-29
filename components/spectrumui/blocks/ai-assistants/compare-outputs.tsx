'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComparedOutput {
  id: string;
  model: string;
  content: string;
  latency?: string;
}

export type CompareOutputsVariant = 'Side' | 'Stacked';

export interface CompareOutputsProps {
  outputs: [ComparedOutput, ComparedOutput];
  prompt?: string;
  onVote?: (id: string) => void;
  variant?: CompareOutputsVariant;
  className?: string;
}

export function CompareOutputs({
  outputs,
  prompt,
  onVote,
  variant = 'Side',
  className,
}: CompareOutputsProps) {
  const [winner, setWinner] = useState<string | null>(null);

  function vote(id: string) {
    setWinner((current) => (current === id ? null : id));
    onVote?.(id);
  }

  return (
    <div className={cn('w-full max-w-[560px]', className)}>
      {prompt && (
        <p className="mb-2.5 text-center font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
          “{prompt}”
        </p>
      )}

      <div className={cn('gap-2.5', variant === 'Side' ? 'grid sm:grid-cols-2' : 'flex flex-col')}>
        {outputs.map((output, index) => {
          const won = winner === output.id;
          const lost = winner !== null && !won;
          return (
            <div
              key={output.id}
              className={cn(
                'flex flex-col rounded-xl border bg-white transition-[border-color,opacity] duration-200 dark:bg-[#0B0B0D]',
                won
                  ? 'border-neutral-900 dark:border-neutral-100'
                  : 'border-black/[0.07] dark:border-white/[0.08]',
                lost && 'opacity-55',
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.07]">
                <span className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                    {output.model}
                  </span>
                </span>
                {output.latency && (
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-600">
                    {output.latency}
                  </span>
                )}
              </div>

              <p className="flex-1 px-3 py-2.5 text-[12.5px] leading-[1.65] text-neutral-600 dark:text-neutral-400">
                {output.content}
              </p>

              <div className="px-3 pb-3">
                <button
                  type="button"
                  aria-pressed={won}
                  onClick={() => vote(output.id)}
                  className={cn(
                    'flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[12px] font-medium',
                    'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                    won
                      ? 'border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                      : 'border-black/[0.08] text-neutral-600 hover:border-black/[0.16] hover:text-neutral-900 dark:border-white/[0.1] dark:text-neutral-400 dark:hover:border-white/[0.2] dark:hover:text-neutral-100',
                  )}
                >
                  {won && <Check className="size-3.5" strokeWidth={2.5} />}
                  {won ? 'Preferred' : 'This one is better'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompareOutputs;
