'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Copy, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CodeBlockVariant = 'Default' | 'Numbered';

export interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  collapsedLines?: number;
  variant?: CodeBlockVariant;
  className?: string;
}

export function CodeBlock({
  code,
  filename,
  language = 'tsx',
  collapsedLines = 8,
  variant = 'Default',
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const lines = code.replace(/\n$/, '').split('\n');
  const collapsible = lines.length > collapsedLines;
  const visible = expanded || !collapsible ? lines : lines.slice(0, collapsedLines);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure
      className={cn(
        'w-full max-w-[500px] overflow-hidden rounded-xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-3 py-1.5 dark:border-white/[0.07]">
        <span className="flex min-w-0 items-center gap-1.5">
          <FileCode2 className="size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" />
          <span className="truncate font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            {filename ?? language}
          </span>
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Code copied' : 'Copy code'}
          className="grid size-7 shrink-0 place-items-center rounded-md text-neutral-400 transition-[color,transform] duration-150 hover:text-neutral-700 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-200"
        >
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
        </button>
      </div>

      <div className="overflow-x-auto py-2" tabIndex={0} aria-label={filename ?? 'Code'}>
        {visible.map((line, index) => (
          <div key={index} className="flex whitespace-nowrap px-3 font-mono text-[11.5px] leading-[1.8]">
            {variant === 'Numbered' && (
              <span
                aria-hidden
                className="mr-3 w-5 select-none text-right tabular-nums text-neutral-300 dark:text-neutral-700"
              >
                {index + 1}
              </span>
            )}
            <span className="text-neutral-700 dark:text-neutral-300">{line || ' '}</span>
          </div>
        ))}
      </div>

      {collapsible && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="flex w-full items-center justify-center gap-1 border-t border-black/[0.06] py-1.5 font-mono text-[10.5px] text-neutral-400 transition-colors duration-150 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:border-white/[0.07] dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          {expanded ? 'collapse' : `${lines.length - collapsedLines} more lines`}
          <ChevronDown
            className={cn(
              'size-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
              expanded && 'rotate-180',
            )}
          />
        </button>
      )}
    </figure>
  );
}

export default CodeBlock;
