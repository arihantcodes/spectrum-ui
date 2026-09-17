'use client';

import { Check } from 'lucide-react';
import { Copy1Icon } from '@/app/(docs)/layout-parts/docs-icons';
import { cn } from '@/lib/utils';

/**
 * Copy, with the confirmation announced as well as drawn. An icon swap is
 * invisible to a screen reader, and an `aria-label` that changes under the
 * cursor is not reliably re-read.
 */
export function CopyButton({
  copied,
  onCopy,
  label,
  copiedLabel,
}: {
  copied: boolean;
  onCopy: () => void;
  label: string;
  copiedLabel: string;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={label}
        className={cn(
          'grid size-8 shrink-0 place-items-center rounded-md text-neutral-600 transition-[color,background-color,transform] duration-150',
          'hover:bg-black/[0.05] hover:text-neutral-900 active:scale-[0.96]',
          'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
          'dark:text-neutral-400 dark:hover:bg-white/[0.07] dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300',
        )}
      >
        <span className="relative grid size-4 place-items-center">
          <Copy1Icon
            className={cn(
              'absolute size-4 transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
              copied ? 'scale-[0.25] opacity-0 blur-[4px]' : 'scale-100 opacity-100 blur-0',
            )}
          />
          <Check
            className={cn(
              'absolute size-4 text-emerald-600 transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-emerald-400',
              copied ? 'scale-100 opacity-100 blur-0' : 'scale-[0.25] opacity-0 blur-[4px]',
            )}
          />
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
