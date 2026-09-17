'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconSetting,
  IconTickSquare,
  SPRING_ENTRANCE,
  SPRING_FLUID,
  SPRING_SNAPPY,
  StatusDot,
  usePropState,
  VIEWPORT,
} from './empty-state-kit';

export type MaintenanceEmptyVariant = 'In progress' | 'Scheduled' | 'Done';

export interface MaintenanceStage {
  id: string;
  label: string;
  at: string;
}

export interface MaintenanceEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  stages?: MaintenanceStage[];
  /** Minutes left, counted down on the client so the server render stays stable. */
  etaMinutes?: number;
  statusLabel?: string;
  onSubscribe?: (email: string) => void;
  variant?: MaintenanceEmptyVariant;
  className?: string;
}

const STAGES: MaintenanceStage[] = [
  { id: 'start', label: 'Window opened', at: '02:00 UTC' },
  { id: 'migrate', label: 'Migrating the primary', at: '02:12 UTC' },
  { id: 'verify', label: 'Verifying replicas', at: '~02:40 UTC' },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function MaintenanceEmpty({
  panelTitle = 'Reports',
  title = 'Down for scheduled maintenance',
  description = 'We are moving the primary database. Reads are paused, writes are queued, and nothing you submitted has been dropped.',
  stages = STAGES,
  etaMinutes = 24,
  statusLabel = 'Live status page',
  onSubscribe,
  variant = 'In progress',
  className,
}: MaintenanceEmptyProps) {
  const [remaining, setRemaining] = usePropState(etaMinutes * 60, etaMinutes);
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [error, setError] = React.useState(false);
  const inputId = React.useId();
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (variant !== 'In progress' || remaining <= 0) return;
    const tick = setTimeout(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(tick);
  }, [remaining, variant, setRemaining]);

  const done = variant === 'Done';
  const scheduled = variant === 'Scheduled';
  const activeIndex = done ? stages.length : scheduled ? -1 : 1;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
    onSubscribe?.(value);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={
        done
          ? 'All systems normal'
          : scheduled
            ? 'Starts 02:00 UTC Sunday'
            : 'Maintenance in progress'
      }
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 dark:border-white/[0.09]">
          <StatusDot tone={done ? 'positive' : 'caution'} />
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            {done ? 'operational' : scheduled ? 'planned' : 'degraded'}
          </span>
        </span>
      }
      className={className}
    >
      <EmptyState
        icon={done ? <IconTickSquare /> : <IconSetting />}
        backdrop="wave"
        tone={done ? 'positive' : 'caution'}
        title={done ? 'Maintenance complete' : scheduled ? 'Maintenance is scheduled' : title}
        description={
          done
            ? 'Reports are live again and the queued writes have been applied in order.'
            : scheduled
              ? 'The window is 40 minutes on Sunday at 02:00 UTC. Reports will be read-only for the middle 20 of those.'
              : description
        }
        actions={
          <>
            <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
              {statusLabel}
            </EmptyAction>
            {!done && <EmptyAction emphasis="quiet">Read the changelog</EmptyAction>}
          </>
        }
      >
        <div className="w-full max-w-[400px] text-left">
          {!done && !scheduled && (
            <div className="mb-4 flex items-baseline justify-center gap-2">
              <span className="font-mono text-[26px] font-medium leading-none tabular-nums text-neutral-900 dark:text-neutral-50">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
                estimated remaining
              </span>
            </div>
          )}

          <ol className="relative flex flex-col gap-3 pl-5">
            <span
              aria-hidden
              className="absolute left-[5px] top-1.5 h-[calc(100%-14px)] w-px bg-black/[0.09] dark:bg-white/[0.12]"
            />
            {stages.map((stage, index) => {
              const complete = index < activeIndex;
              const current = index === activeIndex;
              return (
                <motion.li
                  key={stage.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={
                    reduced ? { duration: 0.15 } : { ...SPRING_ENTRANCE, delay: 0.06 * index }
                  }
                  className="relative"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -left-5 top-1 grid size-[11px] place-items-center rounded-full ring-2 ring-white dark:ring-neutral-950',
                      complete
                        ? 'bg-emerald-500'
                        : current
                          ? 'bg-amber-500'
                          : 'bg-neutral-200 dark:bg-white/20',
                    )}
                  />
                  <p
                    className={cn(
                      'text-[13.5px] font-medium',
                      complete || current
                        ? 'text-neutral-800 dark:text-neutral-100'
                        : 'text-neutral-400 dark:text-neutral-500',
                    )}
                  >
                    {stage.label}
                  </p>
                  <p className="font-mono text-[12.5px] text-neutral-400 dark:text-neutral-500">
                    {stage.at}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          {!done && (
            <div className="mt-5 border-t border-black/[0.06] pt-4 dark:border-white/[0.07]">
              <AnimatePresence initial={false} mode="wait">
                {subscribed ? (
                  <motion.p
                    key="sent"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING_SNAPPY}
                    className="flex items-center gap-2 text-[13.5px] text-emerald-700 dark:text-emerald-400"
                  >
                    <span className="[&_svg]:size-4">
                      <IconTickSquare />
                    </span>
                    You will get one email when this is over. Not a newsletter.
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING_FLUID}
                  >
                    <label htmlFor={inputId} className="sr-only">
                      Email for maintenance updates
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        id={inputId}
                        type="email"
                        value={email}
                        placeholder="you@company.com"
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError(false);
                        }}
                        aria-invalid={error}
                        className={cn(
                          'h-9 min-w-0 flex-1 rounded-xl border-black/[0.1] bg-white text-[14px] shadow-none dark:border-white/[0.12] dark:bg-white/[0.04]',
                          error && 'border-red-500/60 dark:border-red-500/60',
                        )}
                      />
                      <EmptyAction type="submit" emphasis="secondary" className="shrink-0">
                        Notify me
                      </EmptyAction>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}
