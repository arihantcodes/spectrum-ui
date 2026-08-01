'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, GitBranch, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MessageFeedback } from './types';

export type MessageActionsVariant = 'Ghost' | 'Pill';

export interface MessageActionsProps {
  content?: string;
  feedback?: MessageFeedback | null;
  onCopy?: (content: string) => void;
  onRegenerate?: () => void;
  onFeedback?: (feedback: MessageFeedback | null) => void;
  onBranch?: () => void;
  variant?: MessageActionsVariant;
  className?: string;
}

export function MessageActions({
  content = '',
  feedback: feedbackProp,
  onCopy,
  onRegenerate,
  onFeedback,
  onBranch,
  variant = 'Ghost',
  className,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [feedbackState, setFeedbackState] = useState<MessageFeedback | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const feedback = feedbackProp !== undefined ? feedbackProp : feedbackState;

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
    } catch {}
    onCopy?.(content);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  function regenerate() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    onRegenerate?.();
  }

  function rate(next: MessageFeedback) {
    const value = feedback === next ? null : next;
    setFeedbackState(value);
    onFeedback?.(value);
  }

  return (
    <div
      role="toolbar"
      aria-label="Message actions"
      className={cn(
        'flex w-fit items-center gap-0.5 text-neutral-400 dark:text-neutral-500',
        'opacity-100 transition-opacity duration-150 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/message:opacity-100 [@media(hover:hover)]:focus-within:opacity-100',
        variant === 'Pill' &&
          'rounded-full border border-black/[0.07] bg-white p-0.5 shadow-sm dark:border-white/[0.08] dark:bg-neutral-900',
        className,
      )}
    >
      <ActionButton label={copied ? 'Copied' : 'Copy message'} onClick={copy}>
        <span className="relative grid size-3.5 place-items-center">
          <Copy
            className={cn(
              'absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
              copied ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0',
            )}
          />
          <Check
            className={cn(
              'absolute size-3.5 text-emerald-600 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-emerald-400',
              copied ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]',
            )}
          />
        </span>
      </ActionButton>

      <ActionButton label="Regenerate" onClick={regenerate}>
        <RefreshCw
          className={cn(
            'size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            spinning && 'rotate-180',
          )}
        />
      </ActionButton>

      <ActionButton
        label="Good response"
        pressed={feedback === 'positive'}
        onClick={() => rate('positive')}
      >
        <ThumbsUp
          className={cn(
            'size-3.5 transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
            feedback === 'positive' && 'scale-110 fill-current text-neutral-800 dark:text-neutral-100',
          )}
        />
      </ActionButton>

      <ActionButton
        label="Bad response"
        pressed={feedback === 'negative'}
        onClick={() => rate('negative')}
      >
        <ThumbsDown
          className={cn(
            'size-3.5 transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
            feedback === 'negative' && 'scale-110 fill-current text-neutral-800 dark:text-neutral-100',
          )}
        />
      </ActionButton>

      {onBranch && (
        <ActionButton label="Branch from here" onClick={onBranch}>
          <GitBranch className="size-3.5" />
        </ActionButton>
      )}
    </div>
  );
}

function ActionButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="grid size-7 place-items-center rounded-md transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
    >
      {children}
    </button>
  );
}

export default MessageActions;
