'use client';

import { useState } from 'react';
import { Check, FileCode2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
`;

export interface DiffLine {
  type: 'context' | 'add' | 'remove';
  text: string;
}

export interface FileDiff {
  id: string;
  path: string;
  additions: number;
  deletions: number;
  lines: DiffLine[];
}

export type DiffViewVariant = 'Default' | 'Summary';

export interface DiffViewProps {
  diffs: FileDiff[];
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  variant?: DiffViewVariant;
  className?: string;
}

const LINE_STYLES: Record<DiffLine['type'], string> = {
  context: 'text-neutral-500 dark:text-neutral-500',
  add: 'bg-emerald-500/[0.08] text-emerald-800 dark:text-emerald-300',
  remove: 'bg-red-500/[0.07] text-red-700/80 dark:text-red-400/80',
};

const LINE_SIGNS: Record<DiffLine['type'], string> = { context: ' ', add: '+', remove: '-' };

export function DiffView({ diffs, onAccept, onReject, variant = 'Default', className }: DiffViewProps) {
  const [decided, setDecided] = useState<Record<string, 'accepted' | 'rejected'>>({});

  function decide(id: string, decision: 'accepted' | 'rejected') {
    setDecided((previous) => ({ ...previous, [id]: decision }));
    (decision === 'accepted' ? onAccept : onReject)?.(id);
  }

  return (
    <div className={cn('w-full max-w-[500px] space-y-2.5', className)}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {diffs.map((diff) => {
        const decision = decided[diff.id];
        return (
          <div
            key={diff.id}
            className={cn(
              'overflow-hidden rounded-xl border border-black/[0.07] bg-white transition-opacity duration-200 dark:border-white/[0.08] dark:bg-[#0B0B0D]',
              decision === 'rejected' && 'opacity-45',
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.07]">
              <span className="flex min-w-0 items-center gap-1.5">
                <FileCode2 className="size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" />
                <span className="truncate font-mono text-[11.5px] font-medium text-neutral-800 dark:text-neutral-200">
                  {diff.path}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-[10.5px] tabular-nums">
                  <span className="text-emerald-600 dark:text-emerald-400">+{diff.additions}</span>{' '}
                  <span className="text-red-600/80 dark:text-red-400/80">−{diff.deletions}</span>
                </span>
                {decision ? (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both]',
                      decision === 'accepted'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : 'bg-black/[0.05] text-neutral-500 dark:bg-white/[0.07] dark:text-neutral-400',
                    )}
                  >
                    {decision}
                  </span>
                ) : (
                  <span className="flex gap-1">
                    <button
                      type="button"
                      aria-label={`Reject changes to ${diff.path}`}
                      onClick={() => decide(diff.id, 'rejected')}
                      className="grid size-6 place-items-center rounded-md text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.9] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
                    >
                      <X className="size-3" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Accept changes to ${diff.path}`}
                      onClick={() => decide(diff.id, 'accepted')}
                      className="grid size-6 place-items-center rounded-md bg-neutral-900 text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.9] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
                    >
                      <Check className="size-3" />
                    </button>
                  </span>
                )}
              </span>
            </div>

            {variant === 'Default' && (
              <div className="overflow-x-auto py-1.5">
                {diff.lines.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex whitespace-nowrap px-3 font-mono text-[11px] leading-[1.8]',
                      LINE_STYLES[line.type],
                    )}
                  >
                    <span aria-hidden className="mr-2.5 w-3 select-none opacity-60">
                      {LINE_SIGNS[line.type]}
                    </span>
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DiffView;
