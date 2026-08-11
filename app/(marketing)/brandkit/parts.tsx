'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (permissions / non-secure context) — ignore.
    }
  };

  return { copied, copy };
}

/** Small copy-to-clipboard affordance used on the boilerplate copy blocks. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const { copied, copy } = useCopy(text);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={copy}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-[background-color,color,transform] duration-150 ease-out hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-95 dark:hover:bg-neutral-900 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600"
    >
      {copied ? (
        <Check className="size-3.5 text-[#f9452d] animate-in fade-in zoom-in-75 duration-200 dark:text-[#E1F435]" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

/**
 * Color card where the whole surface is the copy target — a hex code is
 * something people grab constantly, so the tap target is the entire card.
 */
export function SwatchCard({
  name,
  hex,
  role,
  cardClass,
}: {
  name: string;
  hex: string;
  role: string;
  cardClass: string;
}) {
  const { copied, copy } = useCopy(hex);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${hex}`}
      title={`Copy ${hex}`}
      className={cn(
        cardClass,
        'group w-full cursor-pointer overflow-hidden text-left transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.98] dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-[#0A0A0A]',
      )}
    >
      <div
        className="h-24 border-b border-black/[0.06] dark:border-white/[0.08]"
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <p className="font-inter text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {name}
            <span className="font-normal text-neutral-400 dark:text-neutral-500"> · {role}</span>
          </p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {copied ? (
              <span className="text-[#f9452d] animate-in fade-in duration-200 dark:text-[#E1F435]">
                Copied
              </span>
            ) : (
              hex
            )}
          </p>
        </div>
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors duration-150 ease-out group-hover:bg-neutral-100 group-hover:text-neutral-900 dark:group-hover:bg-neutral-900 dark:group-hover:text-neutral-100">
          {copied ? (
            <Check className="size-3.5 text-[#f9452d] animate-in fade-in zoom-in-75 duration-200 dark:text-[#E1F435]" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </span>
      </div>
    </button>
  );
}
