'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Small copy-to-clipboard affordance used on hex values and boilerplate copy. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // Clipboard unavailable (permissions / non-secure context) — ignore.
        }
      }}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors duration-200 ease-out hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
    >
      {copied ? (
        <Check className="size-3.5 text-[#f9452d] dark:text-[#E1F435]" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
