'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyCliProps {
  command: string;
  /** `chip` sits on a card; `bar` is the full-width control on a detail page. */
  variant?: 'chip' | 'bar';
  className?: string;
  onCopied?: () => void;
}

/**
 * Copies an install command without leaving the grid.
 *
 * Most visits to a component library are "I know what I want, give me the
 * command", so this is on every card rather than only on detail pages.
 *
 * The icon crossfades through a blur: without it you see two glyphs overlapping
 * mid-transition, which reads as a glitch rather than a change of state.
 */
export function CopyCli({ command, variant = 'chip', className, onCopied }: CopyCliProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(event: React.MouseEvent) {
    // Cards are links; copying must not navigate.
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    onCopied?.();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  const isBar = variant === 'bar';

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Command copied' : `Copy install command: ${command}`}
      className={cn(
        'group/copy relative inline-flex items-center gap-2 rounded-lg font-mono text-[11px] font-medium',
        'text-neutral-500 dark:text-neutral-400',
        'transition-[transform,color,box-shadow] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        'active:scale-[0.97] focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#f9452d] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-white dark:focus-visible:ring-[#E1F435] dark:focus-visible:ring-offset-[#0F0F10]',
        isBar
          ? 'w-full justify-between px-3 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]'
          : 'px-2 py-1 hover:text-neutral-900 dark:hover:text-neutral-100',
        className,
      )}
    >
      {isBar ? (
        <span className="truncate text-left text-neutral-700 dark:text-neutral-300">{command}</span>
      ) : (
        <span className="sr-only">{command}</span>
      )}

      {/* Both glyphs occupy one box so the swap never shifts layout. */}
      <span aria-hidden className="relative grid size-3.5 shrink-0 place-items-center">
        <Terminal
          className={cn(
            'absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
            copied ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0',
          )}
        />
        <Check
          className={cn(
            'absolute size-3.5 text-[#f9452d] transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-[#E1F435]',
            copied ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]',
          )}
        />
      </span>

      {isBar && (
        <span className="sr-only" role="status">
          {copied ? 'Copied' : ''}
        </span>
      )}
    </button>
  );
}
