'use client';

import { cn } from '@/lib/utils';
import type { Citation } from './types';

export type CitationSourcesVariant = 'Inline' | 'Footnotes';

export interface CitationSourcesProps {
  text: string;
  citations: Citation[];
  variant?: CitationSourcesVariant;
  className?: string;
}

export function CitationSources({
  text,
  citations,
  variant = 'Inline',
  className,
}: CitationSourcesProps) {
  const byIndex = new Map(citations.map((citation) => [citation.index, citation]));
  const parts = text.split(/(\[\d+\])/g).filter(Boolean);

  return (
    <div className={cn('w-full max-w-[520px] text-[13.5px]', className)}>
      <p className="leading-[1.7] text-neutral-700 dark:text-neutral-300">
        {parts.map((part, index) => {
          const match = /^\[(\d+)\]$/.exec(part);
          if (!match) return <span key={index}>{part}</span>;
          const citation = byIndex.get(Number(match[1]));
          if (!citation) return <span key={index}>{part}</span>;
          return <CitationMarker key={index} citation={citation} />;
        })}
      </p>

      {variant === 'Footnotes' && (
        <ol className="mt-4 space-y-2 border-t border-black/[0.06] pt-3 dark:border-white/[0.07]">
          {citations.map((citation) => (
            <li key={citation.id} className="flex gap-2.5 text-[12.5px] leading-[1.55]">
              <span className="grid size-[16px] shrink-0 translate-y-0.5 place-items-center rounded bg-black/[0.06] font-mono text-[9px] font-semibold text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                {citation.index}
              </span>
              <span className="min-w-0">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {citation.title}
                </span>
                <span className="ml-1.5 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
                  {new URL(citation.url).hostname}
                </span>
                {citation.snippet && (
                  <span className="mt-0.5 block text-neutral-500 dark:text-neutral-400">
                    {citation.snippet}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function CitationMarker({ citation }: { citation: Citation }) {
  return (
    <span className="group/cite relative inline-block">
      <button
        type="button"
        aria-label={`Source ${citation.index}: ${citation.title}`}
        className="mx-0.5 inline-grid size-[15px] -translate-y-1 place-items-center rounded bg-black/[0.07] font-mono text-[9px] font-semibold text-neutral-600 transition-[background-color,color,transform] duration-150 hover:bg-neutral-900 hover:text-white active:scale-[0.9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-white/[0.1] dark:text-neutral-300 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
      >
        {citation.index}
      </button>

      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-60 -translate-x-1/2 rounded-xl border border-black/[0.08] bg-white p-3 text-left shadow-lg dark:border-white/[0.1] dark:bg-neutral-900',
          'origin-bottom scale-[0.97] opacity-0 blur-[2px] transition-[opacity,transform,filter] duration-[140ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover/cite:scale-100 group-hover/cite:opacity-100 group-hover/cite:blur-0',
          'group-focus-within/cite:scale-100 group-focus-within/cite:opacity-100 group-focus-within/cite:blur-0',
        )}
      >
        <span className="block text-[12px] font-medium leading-snug text-neutral-900 dark:text-neutral-100">
          {citation.title}
        </span>
        <span className="mt-0.5 block font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
          {new URL(citation.url).hostname}
        </span>
        {citation.snippet && (
          <span className="mt-1.5 block text-[11.5px] leading-[1.55] text-neutral-500 dark:text-neutral-400">
            {citation.snippet}
          </span>
        )}
      </span>
    </span>
  );
}

export default CitationSources;
