import type React from 'react';
import { cn } from '@/lib/utils';

/**
 * Blog design components.
 *
 * Post bodies are plain semantic HTML styled by shadcn/typeset (see
 * `.typeset-article` in globals.css) — paragraphs, headings, lists and
 * inline code need no classes at all. The pieces below are the only
 * custom surfaces, and they opt out of typeset with `not-typeset` so
 * they keep their own design.
 */

/** Soft aside for a tip or rule of thumb — one per post, at most. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-typeset mt-7 rounded-xl bg-black/3 px-5 py-4 text-[15px] leading-[1.7] text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-white/5 dark:text-neutral-300 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      {children}
    </aside>
  );
}

/**
 * Visual demo card: a bordered tile holding a small illustration or example,
 * with its caption centered underneath — the reading-view card treatment
 * from the reference design.
 */
export function Figure({
  caption,
  children,
  className,
}: {
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className="not-typeset mt-7">
      <div
        className={cn(
          'flex min-h-[180px] items-center justify-center overflow-hidden rounded-2xl bg-black/2 px-6 py-10 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:bg-white/3 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
          className,
        )}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
