'use client';

import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextChunk {
  id: string;
  title: string;
  content: string;
  source: string;
  characters?: number;
  relevance?: number;
}

export type ContextChunksVariant = 'Cards' | 'List';

export interface ContextChunksProps {
  chunks: ContextChunk[];
  totalCount?: number;
  variant?: ContextChunksVariant;
  className?: string;
}

export function ContextChunks({
  chunks,
  totalCount,
  variant = 'Cards',
  className,
}: ContextChunksProps) {
  return (
    <div className={cn('w-full max-w-[480px]', className)}>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200">
          Retrieved context
        </span>
        {totalCount !== undefined && (
          <span className="rounded-md bg-black/[0.05] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
            {totalCount}
          </span>
        )}
      </div>

      <div className={cn(variant === 'Cards' ? 'space-y-2' : 'divide-y divide-black/[0.05] rounded-xl border border-black/[0.07] dark:divide-white/[0.06] dark:border-white/[0.08]')}>
        {chunks.map((chunk) => (
          <div
            key={chunk.id}
            className={cn(
              'group px-3.5 py-3 transition-colors duration-150',
              variant === 'Cards'
                ? 'rounded-xl border border-black/[0.07] bg-white hover:border-black/[0.14] dark:border-white/[0.08] dark:bg-[#0B0B0D] dark:hover:border-white/[0.16]'
                : 'bg-white first:rounded-t-xl last:rounded-b-xl dark:bg-[#0B0B0D]',
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-1.5">
                <FileText className="size-3 shrink-0 text-neutral-400 dark:text-neutral-500" />
                <span className="truncate text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200">
                  {chunk.title}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-600">
                {chunk.relevance !== undefined && (
                  <span
                    aria-label={`Relevance ${Math.round(chunk.relevance * 100)} percent`}
                    className="flex items-center gap-1"
                  >
                    <span aria-hidden className="h-1 w-8 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]">
                      <span
                        className="block h-full rounded-full bg-neutral-900 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-100"
                        style={{ width: `${chunk.relevance * 100}%` }}
                      />
                    </span>
                    {chunk.relevance.toFixed(2)}
                  </span>
                )}
                {chunk.characters !== undefined && <span>{chunk.characters} chars</span>}
              </span>
            </div>

            <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
              {chunk.content}
            </p>

            <p className="mt-1.5 font-mono text-[10px] text-neutral-400 dark:text-neutral-600">
              {chunk.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContextChunks;
