'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconLock,
  IconMessage,
  IconTickSquare,
  IconUnlock,
  SPRING_FLUID,
  SPRING_SNAPPY,
  usePropState,
} from './empty-state-kit';

export type AccessEmptyVariant = 'Request' | 'Requested' | 'Admin';

export interface AccessOwner {
  name: string;
  role: string;
  src: string;
}

export interface AccessEmptyProps {
  panelTitle?: string;
  resource?: string;
  title?: string;
  description?: string;
  owner?: AccessOwner;
  requestLabel?: string;
  switchLabel?: string;
  onRequest?: () => void;
  variant?: AccessEmptyVariant;
  className?: string;
}

const OWNER: AccessOwner = {
  name: 'Priya Raman',
  role: 'Workspace admin',
  src: '/avatars/people/07.jpg',
};

export function AccessEmpty({
  panelTitle = 'Production metrics',
  resource = 'metrics / production',
  title = 'You do not have access to this',
  description = 'Production metrics are restricted to the platform group. Asking takes one click and tells the admin exactly what you tried to open.',
  owner = OWNER,
  requestLabel = 'Request access',
  switchLabel = 'Switch account',
  onRequest,
  variant = 'Request',
  className,
}: AccessEmptyProps) {
  const [requested, setRequested] = usePropState(variant === 'Requested', variant);
  const reduced = useReducedMotion();

  const admin = variant === 'Admin';

  return (
    <EmptyPanel
      title={panelTitle}
      meta={resource}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.08em] text-neutral-500 dark:border-white/[0.09] dark:text-neutral-400">
          restricted
        </span>
      }
      className={className}
    >
      <EmptyState
        icon={requested ? <IconUnlock /> : <IconLock />}
        backdrop="spotlight"
        tone={requested ? 'positive' : 'neutral'}
        title={requested ? 'Request sent' : title}
        description={
          requested
            ? `${owner.name} was asked for access to ${resource}. You will get a notification either way.`
            : admin
              ? 'This resource is owned by another group. An admin can grant you access without leaving their console.'
              : description
        }
        actions={
          requested ? (
            <EmptyAction emphasis="secondary" onClick={() => setRequested(false)}>
              Cancel the request
            </EmptyAction>
          ) : (
            <>
              <EmptyAction
                icon={<IconUnlock />}
                onClick={() => {
                  setRequested(true);
                  onRequest?.();
                }}
              >
                {requestLabel}
              </EmptyAction>
              <EmptyAction emphasis="quiet">{switchLabel}</EmptyAction>
            </>
          )
        }
        footnote={requested ? 'Most requests are answered within a working day.' : undefined}
      >
        <motion.div
          layout
          transition={reduced ? { duration: 0 } : SPRING_FLUID}
          className={cn(
            'flex w-full max-w-[380px] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-200',
            requested
              ? 'border-emerald-500/25 bg-emerald-500/[0.06]'
              : 'border-black/[0.08] dark:border-white/[0.09]',
          )}
        >
          {/* A plain img, not next/image: this block installs into projects that
              are not Next. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={owner.src} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13.5px] font-medium text-neutral-800 dark:text-neutral-100">
              {owner.name}
            </span>
            <span className="block truncate text-[12.5px] text-neutral-400 dark:text-neutral-500">
              {requested ? 'Asked just now' : owner.role}
            </span>
          </span>
          <AnimatePresence initial={false} mode="popLayout">
            {requested ? (
              <motion.span
                key="sent"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={SPRING_SNAPPY}
                className="shrink-0 text-emerald-600 [&_svg]:size-[18px] dark:text-emerald-400"
              >
                <IconTickSquare />
              </motion.span>
            ) : (
              <motion.span
                key="ask"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={SPRING_SNAPPY}
                className="shrink-0 text-neutral-300 [&_svg]:size-[18px] dark:text-neutral-600"
              >
                <IconMessage />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </EmptyState>
    </EmptyPanel>
  );
}
