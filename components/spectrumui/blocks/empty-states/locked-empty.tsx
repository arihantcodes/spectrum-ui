'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconLock,
  IconStar,
  IconTickSquare,
  SPRING_FLUID,
} from './empty-state-kit';

export type LockedEmptyVariant = 'Locked' | 'Trial';

export interface LockedEmptyProps {
  panelTitle?: string;
  planName?: string;
  title?: string;
  description?: string;
  /** What the plan actually buys. Three lines, no marketing. */
  includes?: string[];
  plansLabel?: string;
  trialLabel?: string;
  onUpgrade?: () => void;
  variant?: LockedEmptyVariant;
  className?: string;
}

const INCLUDES = [
  'Unlimited saved segments',
  'Hourly exports to your warehouse',
  'SAML and SCIM provisioning',
];

/** The feature, drawn and then blurred. Showing the shape of what is behind the wall beats describing it. */
function Preview() {
  return (
    <div aria-hidden className="grid gap-2.5 p-5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-24 rounded-full bg-neutral-300 dark:bg-white/25" />
        <span className="ml-auto h-6 w-16 rounded-lg bg-neutral-900/85 dark:bg-white/70" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0.62, 0.9, 0.44].map((height, index) => (
          <span
            key={index}
            className="flex h-28 flex-col justify-end rounded-xl border border-black/[0.08] p-2 dark:border-white/[0.1]"
          >
            <span
              style={{ height: `${height * 100}%` }}
              className="w-full rounded-md bg-neutral-300 dark:bg-white/25"
            />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {[1, 0.8, 0.9, 0.7].map((width, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="size-4 rounded-full bg-neutral-200 dark:bg-white/[0.18]" />
            <span
              style={{ width: `${width * 70}%` }}
              className="h-2 rounded-full bg-neutral-200 dark:bg-white/[0.18]"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function LockedEmpty({
  panelTitle = 'Cohort analysis',
  planName = 'Pro',
  title = 'Cohort analysis is on Pro',
  description = 'This is what the report looks like with your data in it. Everything else in the workspace stays exactly as it is.',
  includes = INCLUDES,
  plansLabel = 'Compare plans',
  trialLabel = 'Start 14-day trial',
  onUpgrade,
  variant = 'Locked',
  className,
}: LockedEmptyProps) {
  const [peeking, setPeeking] = React.useState(false);
  const reduced = useReducedMotion();

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`Included in ${planName}`}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 dark:border-white/[0.09]">
          <span className="text-amber-500 [&_svg]:size-3">
            <IconStar />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            {planName}
          </span>
        </span>
      }
      className={className}
      bodyClassName="p-3 sm:p-5"
    >
      <div
        /* A floor under the preview, so the message it sits on top of can never
           be taller than the box it is centred in. */
        className="relative min-h-[300px] overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.09]"
        /* Only the blur changes on hover. Nothing in this box may resize, or
           the panel jumps away from the pointer that is over it. */
        onPointerEnter={(event) => event.pointerType === 'mouse' && setPeeking(true)}
        onPointerLeave={() => setPeeking(false)}
      >
        <motion.div
          animate={{
            filter: reduced ? 'blur(5px)' : peeking ? 'blur(2.5px)' : 'blur(5px)',
            opacity: peeking ? 0.75 : 0.55,
            scale: reduced ? 1 : peeking ? 1.015 : 1,
          }}
          transition={reduced ? { duration: 0 } : SPRING_FLUID}
          className="pointer-events-none select-none"
        >
          <Preview />
        </motion.div>

        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center px-5',
            'bg-gradient-to-b from-white/70 via-white/90 to-white/95',
            'dark:from-neutral-950/70 dark:via-neutral-950/90 dark:to-neutral-950/95',
          )}
        >
          <EmptyState
            icon={<IconLock />}
            medallionSize="sm"
            backdrop="none"
            eyebrow={variant === 'Trial' ? '14 days free' : undefined}
            title={title}
            description={description}
            actions={
              <>
                <EmptyAction onClick={onUpgrade} trailing={<IconArrowRight />}>
                  {variant === 'Trial' ? trialLabel : plansLabel}
                </EmptyAction>
                <EmptyAction emphasis="quiet">Ask an admin to enable it</EmptyAction>
              </>
            }
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
              {includes.map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-1.5 text-[12px] text-neutral-500 dark:text-neutral-400"
                >
                  <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
                    <IconTickSquare />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </EmptyState>
        </div>
      </div>
    </EmptyPanel>
  );
}
