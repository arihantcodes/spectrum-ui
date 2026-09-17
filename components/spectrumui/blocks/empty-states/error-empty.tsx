'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  GhostRows,
  IconArrowRight,
  IconCloseSquare,
  IconCopy,
  IconTickSquare,
  SPRING_FLUID,
  SPRING_SNAPPY,
  usePropState,
} from './empty-state-kit';

export type ErrorEmptyVariant = 'Error' | 'Details' | 'Recovered';

export interface ErrorEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** The one string support will ask for. Make it copyable, always. */
  errorId?: string;
  detail?: string;
  retryLabel?: string;
  reportLabel?: string;
  onRetry?: () => void;
  variant?: ErrorEmptyVariant;
  className?: string;
}

export function ErrorEmpty({
  panelTitle = 'Usage',
  title = 'This did not load',
  description = 'The request came back with a 503 from the metrics service. It is not something you did, and retrying is usually enough.',
  errorId = 'req_8c21fa04e7',
  detail = 'UpstreamTimeout: metrics.read exceeded 10s budget (attempt 3 of 3)',
  retryLabel = 'Try again',
  reportLabel = 'Report this',
  onRetry,
  variant = 'Error',
  className,
}: ErrorEmptyProps) {
  const [state, setState] = usePropState<'error' | 'retrying' | 'recovered'>(
    variant === 'Recovered' ? 'recovered' : 'error',
    variant,
  );
  const [open, setOpen] = usePropState(variant === 'Details', variant);
  const [copied, setCopied] = React.useState(false);
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(
    () => () => {
      clearTimeout(timer.current);
      clearTimeout(copyTimer.current);
    },
    [],
  );

  function retry() {
    if (state === 'retrying') return;
    setState('retrying');
    onRetry?.();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('recovered'), reduced ? 250 : 1200);
  }

  async function copyId() {
    try {
      await navigator.clipboard.writeText(errorId);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  }

  if (state === 'recovered') {
    return (
      <EmptyPanel title={panelTitle} meta="Loaded" className={className}>
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_FLUID}
          className="mx-auto w-full max-w-[420px]"
        >
          <p className="mb-4 flex items-center justify-center gap-1.5 text-[14px] text-emerald-700 dark:text-emerald-400">
            <span className="[&_svg]:size-4">
              <IconTickSquare />
            </span>
            Loaded on the second attempt
          </p>
          <GhostRows rows={4} fade="up" className="opacity-90" />
          <div className="mt-5 flex justify-center">
            <EmptyAction emphasis="quiet" onClick={() => setState('error')}>
              Break it again
            </EmptyAction>
          </div>
        </motion.div>
      </EmptyPanel>
    );
  }

  return (
    <EmptyPanel title={panelTitle} meta="Failed" className={className}>
      <EmptyState
        icon={<IconCloseSquare />}
        backdrop="scan"
        tone="critical"
        title={title}
        description={description}
        actions={
          <>
            <EmptyAction onClick={retry} disabled={state === 'retrying'}>
              {state === 'retrying' ? 'Retrying…' : retryLabel}
            </EmptyAction>
            <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
              {reportLabel}
            </EmptyAction>
          </>
        }
        footnote={
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="cursor-pointer text-[13px] text-neutral-400 underline-offset-4 transition-colors duration-150 hover:text-neutral-700 hover:underline focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-300"
          >
            {open ? 'Hide technical detail' : 'Show technical detail'}
          </button>
        }
      >
        <div className="w-full max-w-[440px]">
          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-black/[0.08] bg-neutral-50 px-3 py-2 dark:border-white/[0.09] dark:bg-white/[0.04]">
            <span className="shrink-0 font-mono text-[12.5px] uppercase tracking-[0.07em] text-neutral-400 dark:text-neutral-500">
              id
            </span>
            <code className="min-w-0 flex-1 truncate text-left font-mono text-[13px] text-neutral-700 dark:text-neutral-200">
              {errorId}
            </code>
            <motion.button
              type="button"
              onClick={copyId}
              aria-label="Copy the error id"
              whileTap={reduced ? undefined : { scale: 0.9 }}
              transition={SPRING_SNAPPY}
              className={cn(
                'grid size-7 shrink-0 cursor-pointer place-items-center rounded-[9px] transition-colors duration-150',
                'hover:bg-black/[0.05] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
                'dark:hover:bg-white/[0.07] dark:focus-visible:ring-neutral-300',
                copied
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-neutral-400 dark:text-neutral-500',
                '[&_svg]:size-[15px]',
              )}
            >
              {copied ? <IconTickSquare /> : <IconCopy />}
            </motion.button>
          </div>

          {/* 0fr to 1fr, so the panel opens to exactly the height of its content
              without measuring anything. */}
          <motion.div
            initial={false}
            animate={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
            transition={reduced ? { duration: 0 } : SPRING_FLUID}
            className="grid"
          >
            <div className="overflow-hidden">
              {/* A div, not a <pre>: host stylesheets love to !important their
                  own padding onto <pre> and this box has to keep its own. */}
              <div className="mt-2 overflow-x-auto rounded-xl border border-black/[0.08] bg-neutral-50 px-3 py-2 text-left dark:border-white/[0.09] dark:bg-white/[0.04]">
                <code className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
                  {detail}
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}
