'use client';

import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchResult {
  id: string;
  title: string;
  domain: string;
  snippet?: string;
  state?: 'reading' | 'read' | 'idle';
}

export type WebSearchVariant = 'Default' | 'Compact';

export interface WebSearchProps {
  query: string;
  results: SearchResult[];
  moreCount?: number;
  variant?: WebSearchVariant;
  className?: string;
}

export function WebSearch({
  query,
  results,
  moreCount = 0,
  variant = 'Default',
  className,
}: WebSearchProps) {
  const compact = variant === 'Compact';

  return (
    <div className={cn('w-full max-w-[440px] text-[13px]', className)}>
      <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
        <Search className="size-3.5" />
        <span className="font-mono text-[12px]">{query}</span>
      </div>

      <ul className={cn('mt-3 border-l border-black/[0.07] pl-4 dark:border-white/[0.08]', compact ? 'space-y-1.5' : 'space-y-2.5')}>
        {results.map((result) => {
          const reading = result.state === 'reading';
          return (
            <li
              key={result.id}
              className={cn(
                'transition-opacity duration-200',
                result.state === 'idle' && 'opacity-45',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="grid size-4 shrink-0 place-items-center rounded-full bg-black/[0.05] font-mono text-[8.5px] font-semibold uppercase text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400"
                >
                  {result.domain.charAt(0)}
                </span>
                <span
                  className={cn(
                    'truncate font-medium text-neutral-800 dark:text-neutral-200',
                    compact ? 'text-[12px]' : 'text-[12.5px]',
                  )}
                >
                  {result.title}
                </span>
                <span className="shrink-0 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
                  {result.domain}
                </span>
                {reading && (
                  <span className="ml-auto shrink-0 rounded-full bg-sky-500/10 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-sky-700 motion-safe:animate-pulse dark:text-sky-400">
                    reading
                  </span>
                )}
                {result.state === 'read' && (
                  <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-wide text-neutral-400 dark:text-neutral-600">
                    read
                  </span>
                )}
              </div>
              {!compact && result.snippet && (
                <p className="ml-6 mt-0.5 line-clamp-1 text-[11.5px] leading-[1.5] text-neutral-500 dark:text-neutral-500">
                  {result.snippet}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {moreCount > 0 && (
        <p className="ml-4 mt-2 pl-6 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
          +{moreCount} more
        </p>
      )}
    </div>
  );
}

export default WebSearch;
