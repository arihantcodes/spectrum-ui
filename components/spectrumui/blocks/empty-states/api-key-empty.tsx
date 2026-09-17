'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconDanger,
  IconCopy,
  IconDocument,
  IconHide,
  IconPassword,
  IconPlus,
  IconShow,
  IconTickSquare,
  SPRING_FLUID,
  SPRING_SNAPPY,
  usePropState,
} from './empty-state-kit';

export type ApiKeyEmptyVariant = 'Default' | 'Created' | 'Compact';

export interface ApiKeyEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** The key shown after creation. Yours comes from the server; this one is a sample. */
  sampleKey?: string;
  keyName?: string;
  createLabel?: string;
  warning?: string;
  onCreate?: () => void;
  variant?: ApiKeyEmptyVariant;
  className?: string;
}

/**
 * An invented prefix on purpose. A sample that looks like a real provider's
 * live key — `sk_live_…` and friends — trips secret scanners in every repo this
 * block is ever pasted into, including this one's.
 */
const SAMPLE_KEY = 'spm_live_4Nq8ZtRa2VmPd7Wc6Ly0BxKj';

function mask(value: string) {
  return `${value.slice(0, 8)}${'•'.repeat(18)}${value.slice(-4)}`;
}

export function ApiKeyEmpty({
  panelTitle = 'API keys',
  title = 'No API keys',
  description = 'A key authenticates requests from your servers. Create one per environment so you can revoke staging without taking production down.',
  sampleKey = SAMPLE_KEY,
  keyName = 'Production',
  createLabel = 'Create key',
  warning = 'This is the only time the full key is shown. Store it in your secret manager now.',
  onCreate,
  variant = 'Default',
  className,
}: ApiKeyEmptyProps) {
  const [created, setCreated] = usePropState(variant === 'Created', variant);
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(sampleKey);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={created ? '1 active key' : 'No keys'}
      className={className}
    >
      <EmptyState
        icon={<IconPassword />}
        backdrop="dashes"
        medallionSize={variant === 'Compact' ? 'sm' : 'md'}
        tone={created ? 'positive' : 'neutral'}
        title={created ? `${keyName} key created` : title}
        description={created ? undefined : description}
        actions={
          created ? (
            <EmptyAction
              emphasis="secondary"
              onClick={() => {
                setCreated(false);
                setRevealed(false);
              }}
            >
              Done
            </EmptyAction>
          ) : (
            <>
              <EmptyAction
                icon={<IconPlus />}
                onClick={() => {
                  setCreated(true);
                  setRevealed(true);
                  onCreate?.();
                }}
              >
                {createLabel}
              </EmptyAction>
              <EmptyAction emphasis="quiet" icon={<IconDocument />}>
                Authentication docs
              </EmptyAction>
            </>
          )
        }
        footnote={
          created
            ? undefined
            : 'Keys are scoped to one project and can be rotated without downtime.'
        }
      >
        {created && (
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key="key"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={SPRING_FLUID}
              className="w-full max-w-[460px] text-left"
            >
              <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-black/[0.08] bg-neutral-50 px-3 py-2 dark:border-white/[0.09] dark:bg-white/[0.04]">
                <code className="min-w-0 flex-1 truncate font-mono text-[13.5px] text-neutral-700 dark:text-neutral-200">
                  {revealed ? sampleKey : mask(sampleKey)}
                </code>
                <IconToggle
                  label={revealed ? 'Hide key' : 'Reveal key'}
                  pressed={revealed}
                  onClick={() => setRevealed((value) => !value)}
                >
                  {revealed ? <IconHide /> : <IconShow />}
                </IconToggle>
                <IconToggle label="Copy key" onClick={copy}>
                  <SwapGlyph swapped={copied}>
                    <IconCopy />
                    <IconTickSquare />
                  </SwapGlyph>
                </IconToggle>
              </div>
              <p className="mt-2 flex items-start gap-1.5 text-[12.5px] leading-[1.5] text-amber-700 dark:text-amber-400">
                <span className="mt-px shrink-0 [&_svg]:size-3.5">
                  <IconDanger />
                </span>
                {warning}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}

function IconToggle({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      whileTap={reduced ? undefined : { scale: 0.9 }}
      transition={SPRING_SNAPPY}
      className={cn(
        'relative grid size-7 shrink-0 cursor-pointer place-items-center rounded-[9px] text-neutral-400 transition-colors duration-150',
        'hover:bg-black/[0.05] hover:text-neutral-700 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
        'dark:hover:bg-white/[0.07] dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300',
        '[&_svg]:size-[15px]',
      )}
    >
      {children}
    </motion.button>
  );
}

/** Blur-crossfade between two glyphs in the same box, so nothing shifts. */
function SwapGlyph({ swapped, children }: { swapped: boolean; children: React.ReactNode }) {
  const [before, after] = React.Children.toArray(children);
  const reduced = useReducedMotion();
  /* scale 0.25 → 1, opacity 0 → 1, blur 4px → 0, on a spring with no bounce.
     The blur is what stops it reading as two glyphs overlapping. */
  const enter = reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', scale: 1 };
  const exit = reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)', scale: 0.25 };

  return (
    <span className="relative grid size-[15px] place-items-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={swapped ? 'after' : 'before'}
          initial={exit}
          animate={enter}
          exit={exit}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className={cn(
            'absolute inset-0 grid place-items-center',
            swapped && 'text-emerald-600 dark:text-emerald-400',
          )}
        >
          {swapped ? after : before}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
