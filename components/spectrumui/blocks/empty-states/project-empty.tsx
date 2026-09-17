'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyHint,
  EmptyMeter,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconChart,
  IconDocument,
  IconFolder,
  IconPlus,
  IconTickSquare,
  SPRING_SNAPPY,
} from './empty-state-kit';

export type ProjectEmptyVariant = 'Templates' | 'Checklist' | 'Minimal';

export interface ProjectTemplate {
  id: string;
  name: string;
  detail: string;
  icon: React.ReactNode;
}

export interface SetupStep {
  id: string;
  label: string;
  detail: string;
}

export interface ProjectEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  templates?: ProjectTemplate[];
  steps?: SetupStep[];
  createLabel?: string;
  docsLabel?: string;
  onCreate?: (templateId: string | null) => void;
  variant?: ProjectEmptyVariant;
  className?: string;
}

const TEMPLATES: ProjectTemplate[] = [
  { id: 'blank', name: 'Blank', detail: 'Start from nothing', icon: <IconFolder /> },
  { id: 'analytics', name: 'Analytics', detail: 'Events and funnels', icon: <IconChart /> },
  { id: 'docs', name: 'Docs site', detail: 'Markdown and search', icon: <IconDocument /> },
];

const STEPS: SetupStep[] = [
  { id: 'name', label: 'Name the project', detail: 'You can rename it later' },
  { id: 'source', label: 'Connect a data source', detail: 'Postgres, S3 or an HTTP endpoint' },
  { id: 'invite', label: 'Invite one teammate', detail: 'Projects are more useful with two' },
];

export function ProjectEmpty({
  panelTitle = 'Projects',
  title = 'No projects yet',
  description = 'A project holds your sources, queries and everything built on top of them. Start from a template or an empty one.',
  templates = TEMPLATES,
  steps = STEPS,
  createLabel = 'New project',
  docsLabel = 'Read the guide',
  onCreate,
  variant = 'Templates',
  className,
}: ProjectEmptyProps) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<string[]>([]);
  const reduced = useReducedMotion();

  const chosen = templates.find((template) => template.id === selected);
  const progress = steps.length ? done.length / steps.length : 0;

  function toggleStep(id: string) {
    setDone((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta="0 active"
      toolbar={
        <EmptyAction
          emphasis="secondary"
          icon={<IconPlus />}
          onClick={() => onCreate?.(selected)}
          className="h-8 px-3 text-[13.5px]"
        >
          New project
        </EmptyAction>
      }
      className={className}
    >
      <EmptyState
        icon={<IconFolder />}
        backdrop="stack"
        title={title}
        description={description}
        actions={
          <>
            <EmptyAction icon={<IconPlus />} onClick={() => onCreate?.(selected)}>
              {chosen ? `Create ${chosen.name.toLowerCase()} project` : createLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet" trailing={<IconArrowRight />}>
              {docsLabel}
            </EmptyAction>
          </>
        }
        footnote={
          variant !== 'Minimal' ? (
            <EmptyHint keys={['⌘', 'N']}>to skip this screen</EmptyHint>
          ) : undefined
        }
      >
        {variant === 'Templates' && (
          <div className="grid w-full max-w-[560px] grid-cols-1 gap-2 sm:grid-cols-3">
            {templates.map((template) => {
              const active = template.id === selected;
              return (
                <motion.button
                  key={template.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(active ? null : template.id)}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_SNAPPY}
                  className={cn(
                    'group relative cursor-pointer rounded-xl border px-3 py-3 text-left',
                    'transition-transform duration-150 ease-out hover:-translate-y-0.5',
                    'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
                    active
                      ? 'border-neutral-900/20 bg-black/[0.035] dark:border-white/25 dark:bg-white/[0.07]'
                      : 'border-black/[0.08] hover:border-black/[0.16] dark:border-white/[0.09] dark:hover:border-white/20',
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-neutral-700 [&_svg]:size-[18px] dark:text-neutral-200">
                      {template.icon}
                    </span>
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={SPRING_SNAPPY}
                          className="text-neutral-900 [&_svg]:size-4 dark:text-neutral-100"
                        >
                          <IconTickSquare />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="mt-2.5 block text-[14px] font-medium text-neutral-800 dark:text-neutral-100">
                    {template.name}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-neutral-600 dark:text-neutral-400">
                    {template.detail}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {variant === 'Checklist' && (
          <div className="w-full max-w-[420px] text-left">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
                Setup
              </span>
              <span className="font-mono text-[12.5px] tabular-nums text-neutral-600 dark:text-neutral-400">
                {done.length}/{steps.length}
              </span>
            </div>
            <EmptyMeter value={progress} tone={progress === 1 ? 'positive' : 'neutral'} />
            <ul className="mt-3 flex flex-col gap-1">
              {steps.map((step) => {
                const complete = done.includes(step.id);
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      aria-pressed={complete}
                      onClick={() => toggleStep(step.id)}
                      className="flex w-full cursor-pointer items-start gap-2.5 rounded-xl px-2 py-2 text-left transition-colors duration-150 hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:hover:bg-white/[0.05] dark:focus-visible:ring-neutral-300"
                    >
                      <motion.span
                        animate={{ scale: complete ? 1 : 0.92 }}
                        transition={SPRING_SNAPPY}
                        className={cn(
                          'mt-px grid size-[18px] shrink-0 place-items-center rounded-[7px] border',
                          complete
                            ? 'border-transparent bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900'
                            : 'border-black/[0.16] dark:border-white/20',
                        )}
                      >
                        <AnimatePresence initial={false}>
                          {complete && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={SPRING_SNAPPY}
                              className="[&_svg]:size-3"
                            >
                              <IconTickSquare />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block text-[14px] font-medium transition-colors duration-200',
                            complete
                              ? 'text-neutral-400 line-through dark:text-neutral-500'
                              : 'text-neutral-800 dark:text-neutral-100',
                          )}
                        >
                          {step.label}
                        </span>
                        <span className="block text-[12.5px] text-neutral-600 dark:text-neutral-400">
                          {step.detail}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </EmptyState>

      {variant === 'Templates' && (
        <p aria-live="polite" className="sr-only">
          {chosen ? `${chosen.name} template selected` : 'No template selected'}
        </p>
      )}
    </EmptyPanel>
  );
}
