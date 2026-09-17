'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconBookmark,
  IconDocument,
  SPRING_ENTRANCE,
  SPRING_SNAPPY,
  VIEWPORT,
  EASE_OUT,
} from './empty-state-kit';

export type SavedEmptyVariant = 'Teach' | 'Minimal';

export interface SavableItem {
  id: string;
  title: string;
  meta: string;
}

export interface SavedEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** Rows the reader can actually save, so the gesture is taught by doing it. */
  items?: SavableItem[];
  browseLabel?: string;
  onSave?: (id: string, saved: boolean) => void;
  variant?: SavedEmptyVariant;
  className?: string;
}

const ITEMS: SavableItem[] = [
  { id: 'a', title: 'Rate limits and retries', meta: 'Reference · 6 min' },
  { id: 'b', title: 'Rotating a signing secret', meta: 'Guide · 3 min' },
  { id: 'c', title: 'Idempotency keys explained', meta: 'Concept · 8 min' },
];

export function SavedEmpty({
  panelTitle = 'Saved',
  title = 'Nothing saved yet',
  description = 'Saving keeps a page one keystroke away instead of one search away. Try it on any of these — the bookmark is the whole gesture.',
  items = ITEMS,
  browseLabel = 'Browse the library',
  onSave,
  variant = 'Teach',
  className,
}: SavedEmptyProps) {
  const [saved, setSaved] = React.useState<string[]>([]);
  const reduced = useReducedMotion();

  function toggle(id: string) {
    const next = saved.includes(id) ? saved.filter((value) => value !== id) : [...saved, id];
    setSaved(next);
    onSave?.(id, next.includes(id));
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${saved.length} item${saved.length === 1 ? '' : 's'}`}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 dark:border-white/[0.09]">
          <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
            <IconBookmark />
          </span>
          <motion.span
            key={saved.length}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={SPRING_SNAPPY}
            className="font-mono text-[12.5px] tabular-nums text-neutral-600 dark:text-neutral-300"
          >
            {saved.length}
          </motion.span>
        </span>
      }
      className={className}
    >
      <EmptyState
        icon={<IconBookmark />}
        backdrop="corners"
        tone={saved.length ? 'positive' : 'neutral'}
        title={saved.length ? `${saved.length} saved` : title}
        description={
          saved.length
            ? 'They are in the sidebar under Saved, on every device you sign in on.'
            : description
        }
        actions={
          <EmptyAction
            emphasis={saved.length ? 'secondary' : 'primary'}
            trailing={<IconArrowRight />}
          >
            {browseLabel}
          </EmptyAction>
        }
        footnote={variant === 'Teach' ? 'The bookmark on any row does the same thing.' : undefined}
      >
        {variant === 'Teach' && (
          <ul className="flex w-full max-w-[420px] flex-col gap-1 text-left">
            {items.map((item, index) => {
              const isSaved = saved.includes(item.id);
              return (
                <motion.li
                  key={item.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={
                    reduced ? { duration: 0.15 } : { ...SPRING_ENTRANCE, delay: 0.05 * index }
                  }
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-200',
                    isSaved
                      ? 'border-black/[0.12] bg-black/[0.025] dark:border-white/20 dark:bg-white/[0.05]'
                      : 'border-black/[0.07] dark:border-white/[0.09]',
                  )}
                >
                  <span className="shrink-0 text-neutral-300 [&_svg]:size-4 dark:text-neutral-600">
                    <IconDocument />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-neutral-800 dark:text-neutral-100">
                      {item.title}
                    </span>
                    <span className="block truncate text-[12.5px] text-neutral-400 dark:text-neutral-500">
                      {item.meta}
                    </span>
                  </span>
                  <motion.button
                    type="button"
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
                    onClick={() => toggle(item.id)}
                    whileTap={reduced ? undefined : { scale: 0.88 }}
                    transition={SPRING_SNAPPY}
                    className={cn(
                      'relative grid size-7 shrink-0 cursor-pointer place-items-center rounded-[9px] transition-colors duration-150',
                      'hover:bg-black/[0.05] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
                      'dark:hover:bg-white/[0.08] dark:focus-visible:ring-neutral-300',
                      isSaved
                        ? 'text-neutral-900 dark:text-neutral-50'
                        : 'text-neutral-300 dark:text-neutral-600',
                      '[&_svg]:size-[15px]',
                    )}
                  >
                    <AnimatePresence initial={false}>
                      {isSaved && !reduced && (
                        <motion.span
                          key="ping"
                          aria-hidden
                          initial={{ scale: 0.6, opacity: 0.45 }}
                          whileInView={{ scale: 1.8, opacity: 0 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="absolute size-5 rounded-full bg-neutral-900/25 dark:bg-white/25"
                        />
                      )}
                    </AnimatePresence>
                    <motion.span
                      animate={{ scale: isSaved ? 1 : 0.92, y: isSaved ? -1 : 0 }}
                      transition={SPRING_SNAPPY}
                      className="relative"
                    >
                      <IconBookmark />
                    </motion.span>
                  </motion.button>
                </motion.li>
              );
            })}
          </ul>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}
