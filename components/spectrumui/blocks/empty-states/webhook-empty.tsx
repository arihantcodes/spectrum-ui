'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconActivity,
  IconArrowRight,
  IconTickSquare,
  SPRING_ENTRANCE,
  StatusDot,
  usePropState,
} from './empty-state-kit';

export type WebhookEmptyVariant = 'Listening' | 'Received';

export interface WebhookEvent {
  id: string;
  type: string;
  status: number;
  at: string;
}

export interface WebhookEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  endpoint?: string;
  snippet?: string;
  testLabel?: string;
  firstEvent?: WebhookEvent;
  onTest?: () => void;
  variant?: WebhookEmptyVariant;
  className?: string;
}

const FIRST_EVENT: WebhookEvent = {
  id: 'evt_2Nc41LpQ',
  type: 'invoice.paid',
  status: 200,
  at: 'just now',
};

export function WebhookEmpty({
  panelTitle = 'Webhook endpoint',
  title = 'Listening for your first event',
  description = 'This endpoint is live and has not been called yet. Send anything to it — the first delivery appears here with its payload and response.',
  endpoint = 'https://api.spectrumhq.in/hooks/9f3a1c',
  snippet = 'curl -X POST $ENDPOINT -d \'{"type":"ping"}\'',
  testLabel = 'Send test event',
  firstEvent = FIRST_EVENT,
  onTest,
  variant = 'Listening',
  className,
}: WebhookEmptyProps) {
  const [events, setEvents] = usePropState<WebhookEvent[]>(
    variant === 'Received' ? [firstEvent] : [],
    variant,
  );
  const [waiting, setWaiting] = React.useState(false);
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  function sendTest() {
    if (waiting) return;
    setWaiting(true);
    onTest?.();
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setWaiting(false);
        setEvents((current) => [firstEvent, ...current]);
      },
      reduced ? 200 : 850,
    );
  }

  const live = events.length === 0;

  return (
    <EmptyPanel
      title={panelTitle}
      meta={endpoint}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2 py-1 dark:border-white/[0.09]">
          <StatusDot tone={live ? 'caution' : 'positive'} />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            {live ? 'waiting' : 'active'}
          </span>
        </span>
      }
      className={className}
    >
      <EmptyState
        icon={<IconActivity />}
        backdrop="pulse"
        tone={live ? 'neutral' : 'positive'}
        badge={live ? <Pulse /> : undefined}
        title={live ? title : `${events.length} event received`}
        description={
          live
            ? description
            : 'Deliveries are retried for 24 hours with exponential backoff. Replay any of them from the log.'
        }
        actions={
          <>
            <EmptyAction onClick={sendTest} disabled={waiting}>
              {waiting ? 'Sending…' : testLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet" trailing={<IconArrowRight />}>
              Signature verification
            </EmptyAction>
          </>
        }
      >
        <div className="w-full max-w-[460px] text-left">
          <code className="block overflow-x-auto whitespace-nowrap rounded-xl border border-black/[0.08] bg-neutral-50 px-3 py-2 font-mono text-[11.5px] text-neutral-600 dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-neutral-300">
            {snippet}
          </code>

          <div className="mt-2 flex flex-col gap-1.5">
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={SPRING_ENTRANCE}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-2"
                >
                  <span className="shrink-0 text-emerald-600 [&_svg]:size-4 dark:text-emerald-400">
                    <IconTickSquare />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-neutral-700 dark:text-neutral-200">
                    {event.type}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
                    {event.status} · {event.at}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {live && (
              <div
                className={cn(
                  'flex items-center gap-2.5 rounded-xl border border-dashed border-black/[0.12] px-3 py-2',
                  'dark:border-white/[0.14]',
                )}
              >
                <Equaliser running={!reduced} />
                <span className="font-mono text-[11.5px] text-neutral-400 dark:text-neutral-500">
                  no deliveries yet
                </span>
              </div>
            )}
          </div>
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}

/** The one loop in the set: a listening indicator is a loading indicator. */
function Equaliser({ running }: { running: boolean }) {
  return (
    <span aria-hidden className="flex h-3.5 shrink-0 items-end gap-[3px]">
      {[0, 1, 2].map((bar) => (
        <motion.span
          key={bar}
          animate={running ? { scaleY: [0.35, 1, 0.35] } : { scaleY: 0.5 }}
          transition={
            running
              ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: bar * 0.14 }
              : { duration: 0 }
          }
          style={{ originY: 1 }}
          className="h-full w-[3px] rounded-full bg-neutral-300 dark:bg-white/25"
        />
      ))}
    </span>
  );
}

function Pulse() {
  const reduced = useReducedMotion();
  return (
    <span className="relative grid size-4 place-items-center">
      {!reduced && (
        <motion.span
          aria-hidden
          animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute size-2 rounded-full bg-amber-500"
        />
      )}
      <span className="relative size-2 rounded-full bg-amber-500" />
    </span>
  );
}
