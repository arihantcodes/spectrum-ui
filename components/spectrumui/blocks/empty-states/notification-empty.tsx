'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconNotification,
  IconSetting,
  IconTimeCircle,
  SPRING_SNAPPY,
  usePropState,
  VIEWPORT,
} from './empty-state-kit';

export type NotificationEmptyVariant = 'Default' | 'Quiet hours';

export interface NotificationChannel {
  id: string;
  label: string;
  detail: string;
  enabled: boolean;
}

export interface NotificationEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  channels?: NotificationChannel[];
  quietUntil?: string;
  settingsLabel?: string;
  onToggle?: (id: string, enabled: boolean) => void;
  variant?: NotificationEmptyVariant;
  className?: string;
}

const CHANNELS: NotificationChannel[] = [
  { id: 'mentions', label: 'Mentions', detail: 'Someone names you in a thread', enabled: true },
  {
    id: 'deploys',
    label: 'Failed deploys',
    detail: 'Only failures, never successes',
    enabled: true,
  },
  { id: 'digest', label: 'Weekly digest', detail: 'Monday, 08:00 local', enabled: false },
];

export function NotificationEmpty({
  panelTitle = 'Notifications',
  title = 'Nothing new',
  description = 'You have read everything. What lands here is up to you, and everything you leave off stays quiet.',
  channels = CHANNELS,
  quietUntil = '09:00',
  settingsLabel = 'Notification settings',
  onToggle,
  variant = 'Default',
  className,
}: NotificationEmptyProps) {
  const [state, setState] = usePropState(channels, channels);
  const quiet = variant === 'Quiet hours';
  const reduced = useReducedMotion();

  const on = state.filter((channel) => channel.enabled).length;

  function toggle(id: string, enabled: boolean) {
    setState((current) =>
      current.map((channel) => (channel.id === id ? { ...channel, enabled } : channel)),
    );
    onToggle?.(id, enabled);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={quiet ? `Quiet until ${quietUntil}` : `${on} channel${on === 1 ? '' : 's'} on`}
      className={className}
    >
      <EmptyState
        icon={<IconNotification />}
        backdrop="chime"
        tone={quiet ? 'caution' : 'neutral'}
        badge={
          quiet ? (
            <span className="grid size-4 place-items-center rounded-full bg-amber-500 text-white [&_svg]:size-3">
              <IconTimeCircle />
            </span>
          ) : undefined
        }
        title={quiet ? `Muted until ${quietUntil}` : title}
        description={
          quiet
            ? 'Notifications are being held, not dropped. Everything that arrives tonight is waiting for you in the morning.'
            : description
        }
        actions={
          <EmptyAction emphasis="secondary" icon={<IconSetting />}>
            {settingsLabel}
          </EmptyAction>
        }
        footnote="Critical alerts always break through, whatever this is set to."
      >
        <ul className="flex w-full max-w-[400px] flex-col gap-0.5 text-left">
          {state.map((channel, index) => (
            <motion.li
              key={channel.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={reduced ? { duration: 0.15 } : { ...SPRING_SNAPPY, delay: 0.05 * index }}
              className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-150 hover:bg-black/[0.025] dark:hover:bg-white/[0.04]"
            >
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block truncate text-[12.5px] font-medium transition-colors duration-200',
                    channel.enabled && !quiet
                      ? 'text-neutral-800 dark:text-neutral-100'
                      : 'text-neutral-400 dark:text-neutral-500',
                  )}
                >
                  {channel.label}
                </span>
                <span className="block truncate text-[11px] text-neutral-400 dark:text-neutral-500">
                  {quiet && channel.enabled ? 'Held until morning' : channel.detail}
                </span>
              </span>
              <Switch
                checked={channel.enabled}
                onCheckedChange={(next) => toggle(channel.id, next)}
                aria-label={channel.label}
                className="shrink-0 cursor-pointer"
              />
            </motion.li>
          ))}
        </ul>
      </EmptyState>

      <AnimatePresence initial={false}>
        {quiet && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
            className="sr-only"
          >
            Quiet hours are on until {quietUntil}
          </motion.p>
        )}
      </AnimatePresence>
    </EmptyPanel>
  );
}
