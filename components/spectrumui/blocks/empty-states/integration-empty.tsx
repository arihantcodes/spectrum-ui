'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconSwap,
  IconTickSquare,
  SPRING_FLUID,
  SPRING_SNAPPY,
  EASE_IN_OUT,
} from './empty-state-kit';

export type IntegrationEmptyVariant = 'Catalog' | 'Featured' | 'Minimal';

export interface Connector {
  id: string;
  name: string;
  kind: string;
  /** A drawn mark on a 24-grid. Never ship someone else's trademark in a block. */
  mark: React.ReactNode;
}

export interface IntegrationEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  connectors?: Connector[];
  browseLabel?: string;
  onConnect?: (id: string) => void;
  variant?: IntegrationEmptyVariant;
  className?: string;
}

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      {children}
    </svg>
  );
}

const CONNECTORS: Connector[] = [
  {
    id: 'postgres',
    name: 'Postgres',
    kind: 'Database',
    mark: (
      <Mark>
        <ellipse cx="12" cy="6.5" rx="7" ry="3" />
        <path d="M5 6.5v11c0 1.7 3.1 3 7 3s7-1.3 7-3v-11" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </Mark>
    ),
  },
  {
    id: 'storage',
    name: 'Object store',
    kind: 'Files',
    mark: (
      <Mark>
        <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
        <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
      </Mark>
    ),
  },
  {
    id: 'webhook',
    name: 'Webhooks',
    kind: 'Events',
    mark: (
      <Mark>
        <circle cx="7" cy="7" r="2.5" />
        <circle cx="17" cy="17" r="2.5" />
        <path d="M9 8.5 15 15.5" />
        <path d="M17 7v4M5 17h4" strokeLinecap="round" />
      </Mark>
    ),
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    kind: 'Analytics',
    mark: (
      <Mark>
        <path d="M4 10 12 4l8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M9 20v-6h6v6" />
      </Mark>
    ),
  },
  {
    id: 'queue',
    name: 'Message queue',
    kind: 'Streaming',
    mark: (
      <Mark>
        <rect x="3.5" y="8" width="5" height="8" rx="1.2" />
        <rect x="10" y="8" width="5" height="8" rx="1.2" />
        <path d="M17.5 12h3M19 10.5 20.5 12 19 13.5" strokeLinecap="round" strokeLinejoin="round" />
      </Mark>
    ),
  },
  {
    id: 'sheet',
    name: 'Spreadsheets',
    kind: 'Import',
    mark: (
      <Mark>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path d="M3.5 10h17M9.5 10v9.5M15 10v9.5" />
      </Mark>
    ),
  },
];

export function IntegrationEmpty({
  panelTitle = 'Sources',
  title = 'Nothing is connected yet',
  description = 'A source is where your data comes from. Connect one and every chart, table and alert in this project has something to read.',
  connectors = CONNECTORS,
  browseLabel = 'Browse all 42 connectors',
  onConnect,
  variant = 'Catalog',
  className,
}: IntegrationEmptyProps) {
  const [connecting, setConnecting] = React.useState<string | null>(null);
  const [connected, setConnected] = React.useState<string[]>([]);
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  function connect(id: string) {
    if (connected.includes(id) || connecting) return;
    setConnecting(id);
    onConnect?.(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setConnecting(null);
        setConnected((current) => [...current, id]);
      },
      reduced ? 200 : 900,
    );
  }

  const shown = variant === 'Featured' ? connectors.slice(0, 3) : connectors;

  return (
    <EmptyPanel
      title={panelTitle}
      meta={connected.length ? `${connected.length} connected` : 'None connected'}
      className={className}
    >
      <EmptyState
        icon={<IconSwap />}
        backdrop="cells"
        tone={connected.length ? 'positive' : 'neutral'}
        title={
          connected.length
            ? `${connected.length} source${connected.length > 1 ? 's' : ''} connected`
            : title
        }
        description={
          connected.length
            ? 'First sync runs within a minute. Add another whenever you need one.'
            : description
        }
        actions={
          <>
            <EmptyAction
              emphasis={connected.length ? 'secondary' : 'primary'}
              trailing={<IconArrowRight />}
            >
              {browseLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet">Import a CSV instead</EmptyAction>
          </>
        }
      >
        {variant !== 'Minimal' && (
          <div
            className={cn(
              'grid w-full max-w-[560px] gap-2',
              variant === 'Featured' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3',
            )}
          >
            {shown.map((connector) => {
              const isDone = connected.includes(connector.id);
              const isBusy = connecting === connector.id;
              return (
                <motion.button
                  key={connector.id}
                  type="button"
                  onClick={() => connect(connector.id)}
                  disabled={isDone || Boolean(connecting)}
                  whileTap={reduced || isDone ? undefined : { scale: 0.98 }}
                  transition={SPRING_SNAPPY}
                  className={cn(
                    'group relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2.5 text-left',
                    'transition-transform duration-150 ease-out',
                    !isDone && 'hover:-translate-y-0.5',
                    'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
                    'disabled:cursor-default',
                    isDone
                      ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
                      : 'border-black/[0.08] hover:border-black/[0.16] dark:border-white/[0.09] dark:hover:border-white/20',
                  )}
                >
                  {isBusy && !reduced && (
                    <motion.span
                      aria-hidden
                      initial={{ x: '-110%' }}
                      animate={{ x: '110%' }}
                      transition={{ duration: 0.85, ease: EASE_IN_OUT }}
                      className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent dark:via-white/[0.09]"
                    />
                  )}
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-[10px] border [&_svg]:size-[17px]',
                      isDone
                        ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'border-black/[0.07] text-neutral-600 dark:border-white/[0.09] dark:text-neutral-300',
                    )}
                  >
                    {connector.mark}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-neutral-800 dark:text-neutral-100">
                      {connector.name}
                    </span>
                    <span className="block truncate text-[12.5px] text-neutral-400 dark:text-neutral-500">
                      {isBusy ? 'Connecting…' : isDone ? 'Connected' : connector.kind}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isDone && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={SPRING_FLUID}
                        className="shrink-0 text-emerald-600 [&_svg]:size-4 dark:text-emerald-400"
                      >
                        <IconTickSquare />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}
