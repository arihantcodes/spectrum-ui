'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconDanger,
  IconShieldDone,
  IconSwap,
  IconTickSquare,
  SPRING_FLUID,
  StatusDot,
  usePropState,
} from './empty-state-kit';

export type OfflineEmptyVariant = 'Offline' | 'Reconnecting' | 'Restored';

export interface OfflineEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** Seconds on the clock before the next automatic attempt. */
  retryIn?: number;
  /** Attempts made before this screen appeared. */
  attempts?: number;
  cachedNote?: string;
  retryLabel?: string;
  onRetry?: () => void;
  variant?: OfflineEmptyVariant;
  className?: string;
}

export function OfflineEmpty({
  panelTitle = 'Dashboard',
  title = 'You are offline',
  description = 'The last data you saw is still on screen and still yours to read. Anything you change is queued and sent the moment the connection is back.',
  retryIn = 5,
  attempts = 2,
  cachedNote = 'Showing data cached 4 minutes ago',
  retryLabel = 'Retry now',
  onRetry,
  variant = 'Offline',
  className,
}: OfflineEmptyProps) {
  const [seconds, setSeconds] = usePropState(retryIn, `${variant}:${retryIn}`);
  const [tries, setTries] = usePropState(attempts, `${variant}:${attempts}`);
  const [state, setState] = usePropState<OfflineEmptyVariant>(variant, variant);
  const reduced = useReducedMotion();
  /* The countdown only runs while offline, and reaching zero is an automatic
     attempt that fails — you are still offline. Only the reader's own retry
     succeeds, so the panel does not quietly heal itself while nobody is
     looking at it. */
  React.useEffect(() => {
    if (state !== 'Offline') return;
    const tick = setTimeout(() => {
      if (seconds > 1) {
        setSeconds((value) => value - 1);
        return;
      }
      setSeconds(retryIn);
      setTries((value) => value + 1);
    }, 1000);
    return () => clearTimeout(tick);
  }, [seconds, state, retryIn, setSeconds, setTries]);

  /* The Reconnecting variant resolves on its own, the same way a real attempt
     in flight does. */
  React.useEffect(() => {
    if (state !== 'Reconnecting') return;
    const settle = setTimeout(() => setState('Restored'), reduced ? 250 : 1200);
    return () => clearTimeout(settle);
  }, [state, reduced, setState]);

  function retry() {
    if (state === 'Reconnecting') return;
    setTries((value) => value + 1);
    setState('Reconnecting');
    onRetry?.();
  }

  const restored = state === 'Restored';
  const busy = state === 'Reconnecting';

  return (
    <EmptyPanel
      title={panelTitle}
      meta={restored ? 'Live' : `${tries} failed attempt${tries === 1 ? '' : 's'}`}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 dark:border-white/[0.09]">
          <StatusDot tone={restored ? 'positive' : busy ? 'caution' : 'critical'} />
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            {restored ? 'online' : busy ? 'connecting' : 'offline'}
          </span>
        </span>
      }
      className={className}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={restored ? 'restored' : 'offline'}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={SPRING_FLUID}
        >
          <EmptyState
            icon={restored ? <IconTickSquare /> : <IconDanger />}
            backdrop="shards"
            tone={restored ? 'positive' : 'caution'}
            title={restored ? 'Back online' : busy ? 'Reconnecting…' : title}
            description={
              restored
                ? 'Everything you queued while offline has been sent. Nothing was lost.'
                : description
            }
            actions={
              restored ? (
                <EmptyAction
                  emphasis="secondary"
                  icon={<IconSwap />}
                  onClick={() => {
                    setState('Offline');
                    setSeconds(retryIn);
                  }}
                >
                  Drop the connection again
                </EmptyAction>
              ) : (
                <>
                  <EmptyAction onClick={retry} disabled={busy}>
                    {busy ? 'Trying…' : retryLabel}
                  </EmptyAction>
                  <EmptyAction emphasis="quiet">Work offline</EmptyAction>
                </>
              )
            }
            footnote={
              restored ? undefined : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
                    <IconShieldDone />
                  </span>
                  {cachedNote}
                </span>
              )
            }
          >
            {!restored && (
              <div
                className={cn(
                  'flex items-center gap-2.5 rounded-full border border-black/[0.08] px-3 py-1.5',
                  'dark:border-white/[0.1]',
                )}
              >
                <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
                  {busy ? 'Attempt in flight' : 'Next attempt in'}
                </span>
                {!busy && (
                  <span className="font-mono text-[13.5px] font-medium tabular-nums text-neutral-900 dark:text-neutral-50">
                    {String(Math.max(0, seconds)).padStart(2, '0')}s
                  </span>
                )}
                {busy && <Spinner />}
              </div>
            )}
          </EmptyState>
        </motion.div>
      </AnimatePresence>
    </EmptyPanel>
  );
}

function Spinner() {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className="size-3.5 rounded-full border-[1.5px] border-neutral-300 border-t-neutral-800 dark:border-white/20 dark:border-t-neutral-100"
    />
  );
}
