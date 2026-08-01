'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SuggestedPrompt } from './types';

const KEYFRAMES = `
@keyframes su-msg-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type ChatEmptyStateVariant = 'Default' | 'Centered';

export interface ChatEmptyStateProps {
  title?: string;
  subtitle?: string;
  prompts?: SuggestedPrompt[];
  onSelectPrompt?: (prompt: SuggestedPrompt) => void;
  variant?: ChatEmptyStateVariant;
  className?: string;
}

export function ChatEmptyState({
  title = 'What do you want to know?',
  subtitle = 'Ask a question, or start from one of these.',
  prompts = [],
  onSelectPrompt,
  variant = 'Default',
  className,
}: ChatEmptyStateProps) {
  const centered = variant === 'Centered';

  return (
    <div
      className={cn(
        'w-full max-w-[520px]',
        centered && 'flex flex-col items-center text-center',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="grid size-9 place-items-center rounded-xl border border-black/[0.07] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.04]">
        <Sparkles className="size-4 text-neutral-500 dark:text-neutral-400" />
      </div>

      <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.2px] text-neutral-900 dark:text-neutral-50">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </p>

      {prompts.length > 0 && (
        <div
          className={cn(
            'mt-5 flex flex-wrap gap-1.5',
            centered && 'justify-center',
          )}
        >
          {prompts.map((prompt, index) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => onSelectPrompt?.(prompt)}
              style={{ animationDelay: `${Math.min(index, 5) * 50}ms` }}
              className={cn(
                'rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[12.5px] text-neutral-600',
                'transition-[color,border-color,transform] duration-150 active:scale-[0.96]',
                'hover:border-black/[0.16] hover:bg-black/[0.02] hover:text-neutral-900',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                'motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]',
                'dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-neutral-300 dark:hover:border-white/[0.2] dark:hover:bg-white/[0.06] dark:hover:text-neutral-50',
              )}
            >
              {prompt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatEmptyState;
