'use client';

import { CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Citation, SuggestedPrompt } from './types';

const KEYFRAMES = `
@keyframes su-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes su-msg-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type StreamingTextVariant = 'Answer' | 'Sources';

export interface StreamingTextProps {
  text: string;
  streaming?: boolean;
  citations?: Citation[];
  followUps?: SuggestedPrompt[];
  onFollowUp?: (prompt: SuggestedPrompt) => void;
  variant?: StreamingTextVariant;
  className?: string;
}

export function StreamingText({
  text,
  streaming = false,
  citations = [],
  followUps = [],
  onFollowUp,
  variant = 'Answer',
  className,
}: StreamingTextProps) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\d+\])/g).filter(Boolean);

  return (
    <div className={cn('w-full max-w-[520px] text-[13.5px]', className)}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <p aria-hidden={streaming || undefined} className="leading-[1.7] text-neutral-700 dark:text-neutral-300">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={index} className="font-semibold text-neutral-900 dark:text-neutral-50">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (/^\[\d+\]$/.test(part)) {
            return (
              <sup
                key={index}
                className="ml-0.5 inline-grid size-[14px] place-items-center rounded bg-black/[0.07] align-super font-mono text-[8.5px] font-semibold text-neutral-600 dark:bg-white/[0.1] dark:text-neutral-300"
              >
                {part.slice(1, -1)}
              </sup>
            );
          }
          return <span key={index}>{part}</span>;
        })}
        {streaming && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-[su-caret_1s_steps(1,end)_infinite] bg-current motion-reduce:animate-none"
          />
        )}
      </p>

      {!streaming && citations.length > 0 && (
        <div className="mt-3.5 motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]">
          {variant === 'Sources' ? (
            <ul className="space-y-1.5">
              {citations.map((citation) => (
                <li
                  key={citation.id}
                  className="flex items-baseline gap-2 text-[12.5px] leading-[1.55]"
                >
                  <span className="grid size-[15px] shrink-0 translate-y-0.5 place-items-center rounded bg-black/[0.06] font-mono text-[9px] font-semibold text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                    {citation.index}
                  </span>
                  <span className="min-w-0">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {citation.title}
                    </span>
                    <span className="ml-1.5 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-600">
                      {new URL(citation.url).hostname}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-2">
              <span aria-hidden className="flex -space-x-1">
                {citations.slice(0, 3).map((citation) => (
                  <span
                    key={citation.id}
                    className="grid size-4 place-items-center rounded-full border border-white bg-neutral-200 font-mono text-[8px] font-semibold text-neutral-600 dark:border-[#0B0B0D] dark:bg-neutral-700 dark:text-neutral-200"
                  >
                    {citation.index}
                  </span>
                ))}
              </span>
              <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                {citations.length} source{citations.length === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </div>
      )}

      {!streaming && followUps.length > 0 && (
        <div className="mt-4">
          <p className="mb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.07em] text-neutral-400 dark:text-neutral-600">
            Follow-ups
          </p>
          <ul>
            {followUps.map((prompt, index) => (
              <li
                key={prompt.id}
                className="motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]"
                style={{ animationDelay: `${Math.min(index, 4) * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={() => onFollowUp?.(prompt)}
                  className="group flex w-full items-center gap-2 border-b border-black/[0.05] py-2 text-left text-[12.5px] text-neutral-600 transition-[color,transform] duration-150 last:border-b-0 hover:text-neutral-900 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.06] dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  <CornerDownLeft className="size-3 text-neutral-300 transition-colors duration-150 group-hover:text-neutral-500 dark:text-neutral-600 dark:group-hover:text-neutral-400" />
                  {prompt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StreamingText;
