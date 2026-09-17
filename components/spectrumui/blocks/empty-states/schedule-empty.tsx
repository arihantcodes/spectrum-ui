'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyHint,
  EmptyPanel,
  EmptyState,
  IconCalendar,
  IconPlus,
  SPRING_ENTRANCE,
  SPRING_SNAPPY,
  VIEWPORT,
} from './empty-state-kit';

export type ScheduleEmptyVariant = 'Day' | 'Week' | 'Minimal';

export interface ScheduledEvent {
  id: number;
  hour: number;
  title: string;
}

export interface ScheduleEmptyProps {
  panelTitle?: string;
  dateLabel?: string;
  title?: string;
  description?: string;
  /** Hours drawn on the rail, 24-hour clock. */
  hours?: number[];
  /** Fixed, not `new Date()` — a server-rendered clock hydrates wrong. */
  nowLabel?: string;
  nowAt?: number;
  createLabel?: string;
  onCreate?: (event: ScheduledEvent) => void;
  variant?: ScheduleEmptyVariant;
  className?: string;
}

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function ScheduleEmpty({
  panelTitle = 'Schedule',
  dateLabel = 'Thursday, 16 September',
  title = 'Nothing scheduled today',
  description = 'A clear day is a result, not a bug. Click any hour to put something in it, or let it stay clear.',
  hours = HOURS,
  nowLabel = '11:20',
  nowAt = 11.33,
  createLabel = 'New event',
  onCreate,
  variant = 'Day',
  className,
}: ScheduleEmptyProps) {
  const [composing, setComposing] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState('');
  const [events, setEvents] = React.useState<ScheduledEvent[]>([]);
  const nextId = React.useRef(0);
  const reduced = useReducedMotion();

  function open(hour: number) {
    setComposing(hour);
    setDraft('');
  }

  function commit(event: React.FormEvent) {
    event.preventDefault();
    const title = draft.trim();
    if (!title || composing === null) return;
    const created = { id: (nextId.current += 1), hour: composing, title };
    setEvents((current) => [...current, created]);
    onCreate?.(created);
    setComposing(null);
    setDraft('');
  }

  const clear = events.length === 0;
  const railTop = ((nowAt - hours[0]) / hours.length) * 100;

  return (
    <EmptyPanel
      title={panelTitle}
      meta={dateLabel}
      toolbar={
        <EmptyAction
          emphasis="secondary"
          icon={<IconPlus />}
          onClick={() => open(hours[2] ?? hours[0])}
          className="h-8 px-3 text-[13.5px]"
        >
          {createLabel}
        </EmptyAction>
      }
      className={className}
      bodyClassName="px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-8">
        {variant !== 'Minimal' && (
          <div className="relative min-w-0 flex-1">
            {variant === 'Week' && (
              <div className="mb-2 grid grid-cols-5 gap-1">
                {DAYS.map((day, index) => (
                  <span
                    key={day}
                    className={cn(
                      'rounded-lg py-1 text-center font-mono text-[12px] uppercase tracking-[0.07em]',
                      index === 3
                        ? 'bg-black/[0.05] text-neutral-700 dark:bg-white/[0.08] dark:text-neutral-200'
                        : 'text-neutral-300 dark:text-neutral-600',
                    )}
                  >
                    {day}
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              {hours.map((hour) => {
                const slotted = events.filter((event) => event.hour === hour);
                return (
                  <div key={hour} className="flex items-stretch gap-3">
                    <span className="w-9 shrink-0 pt-1 text-right font-mono text-[12px] tabular-nums text-neutral-300 dark:text-neutral-600">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                    <div className="relative z-10 min-w-0 flex-1 border-t border-black/[0.06] py-1 dark:border-white/[0.07]">
                      {composing === hour ? (
                        <form
                          onSubmit={commit}
                          className="flex gap-1.5 rounded-xl bg-white dark:bg-neutral-950"
                        >
                          <Input
                            autoFocus
                            value={draft}
                            placeholder="What is it?"
                            onChange={(change) => setDraft(change.target.value)}
                            onKeyDown={(key) => {
                              if (key.key === 'Escape') setComposing(null);
                            }}
                            className={cn(
                              'h-8 min-w-0 flex-1 rounded-xl border-black/[0.12] bg-white text-[13.5px] shadow-none',
                              'dark:border-white/[0.14] dark:bg-white/[0.05]',
                              'focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400/40',
                              'dark:focus-visible:border-white/30 dark:focus-visible:ring-white/20',
                            )}
                          />
                          <EmptyAction type="submit" className="h-8 px-3 text-[13px]">
                            Add
                          </EmptyAction>
                        </form>
                      ) : (
                        <button
                          type="button"
                          onClick={() => open(hour)}
                          aria-label={`Add an event at ${hour}:00`}
                          className="group relative flex h-8 w-full cursor-pointer items-center rounded-xl px-2 text-left transition-colors duration-150 hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:hover:bg-white/[0.05] dark:focus-visible:ring-neutral-300"
                        >
                          <AnimatePresence initial={false}>
                            {slotted.map((event) => (
                              <motion.span
                                key={event.id}
                                layout
                                initial={
                                  reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, x: -8 }
                                }
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={SPRING_ENTRANCE}
                                className="mr-1.5 truncate rounded-lg border-l-2 border-neutral-900 bg-black/[0.05] px-2 py-1 text-[13px] font-medium text-neutral-800 dark:border-neutral-200 dark:bg-white/[0.08] dark:text-neutral-100"
                              >
                                {event.title}
                              </motion.span>
                            ))}
                          </AnimatePresence>
                          {slotted.length === 0 && (
                            <span className="text-[12.5px] text-transparent transition-colors duration-150 group-hover:text-neutral-400 dark:group-hover:text-neutral-500">
                              + add
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <motion.div
                aria-hidden
                initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.9 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={VIEWPORT}
                transition={reduced ? { duration: 0.2 } : { ...SPRING_SNAPPY, delay: 0.25 }}
                style={{ top: `${railTop}%` }}
                /* z-0, and every row above it: the line marks the empty track,
                   it does not get to draw itself across an open composer. */
                className="pointer-events-none absolute inset-x-0 z-0 flex items-center gap-3"
              >
                <span className="w-9 shrink-0 text-right font-mono text-[12px] tabular-nums text-red-500">
                  {nowLabel}
                </span>
                <span className="h-px flex-1 bg-red-500/60" />
              </motion.div>
            </div>
          </div>
        )}

        <div className={cn('shrink-0', variant === 'Minimal' ? 'w-full' : 'lg:w-[280px]')}>
          <EmptyState
            icon={<IconCalendar />}
            medallionSize={variant === 'Minimal' ? 'md' : 'sm'}
            backdrop={variant === 'Minimal' ? 'crosshair' : 'none'}
            align={variant === 'Minimal' ? 'center' : 'start'}
            title={clear ? title : `${events.length} event${events.length > 1 ? 's' : ''} today`}
            description={
              clear
                ? description
                : 'Added locally — wire onCreate up to your calendar to make it stick.'
            }
            actions={
              <EmptyAction icon={<IconPlus />} onClick={() => open(hours[2] ?? hours[0])}>
                {createLabel}
              </EmptyAction>
            }
            footnote={<EmptyHint keys={['Esc']}>closes the composer</EmptyHint>}
          />
        </div>
      </div>
    </EmptyPanel>
  );
}
