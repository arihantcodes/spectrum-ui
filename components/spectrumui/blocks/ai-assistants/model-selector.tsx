'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ModelOption } from './types';

export type ModelSelectorVariant = 'List' | 'Segmented';

export interface ModelSelectorProps {
  models: ModelOption[];
  value?: string;
  onChange?: (id: string) => void;
  variant?: ModelSelectorVariant;
  className?: string;
}

export function ModelSelector({
  models,
  value: valueProp,
  onChange,
  variant = 'List',
  className,
}: ModelSelectorProps) {
  const [valueState, setValueState] = useState(models.find((m) => !m.disabled)?.id);
  const value = valueProp !== undefined ? valueProp : valueState;

  function select(id: string) {
    setValueState(id);
    onChange?.(id);
  }

  if (variant === 'Segmented') {
    const enabled = models.filter((model) => !model.disabled);
    const activeIndex = Math.max(0, enabled.findIndex((model) => model.id === value));
    return (
      <div
        role="radiogroup"
        aria-label="Model"
        className={cn(
          'relative isolate grid w-fit grid-flow-col auto-cols-fr rounded-lg bg-black/[0.04] p-0.5 dark:bg-white/[0.05]',
          className,
        )}
      >
        <span
          aria-hidden
          className="absolute inset-y-0.5 left-0.5 -z-10 rounded-[7px] bg-white shadow-xs transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-800"
          style={{
            width: `calc((100% - 4px) / ${enabled.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {enabled.map((model) => {
          const active = model.id === value;
          return (
            <button
              key={model.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => select(model.id)}
              className={cn(
                'whitespace-nowrap rounded-[7px] px-3 py-1.5 font-mono text-[11.5px] transition-[color,transform] duration-150 active:scale-[0.96]',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                active
                  ? 'font-medium text-neutral-900 dark:text-neutral-50'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
              )}
            >
              {model.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Model" className={cn('w-full max-w-[380px] space-y-1.5', className)}>
      {models.map((model) => {
        const active = model.id === value;
        return (
          <button
            key={model.id}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={model.disabled}
            onClick={() => select(model.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left',
              'transition-[border-color,background-color,transform] duration-150',
              'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
              model.disabled
                ? 'cursor-not-allowed border-black/[0.05] opacity-45 dark:border-white/[0.06]'
                : active
                  ? 'border-black/[0.2] bg-black/[0.02] dark:border-white/[0.28] dark:bg-white/[0.04]'
                  : 'border-black/[0.07] hover:border-black/[0.14] active:scale-[0.99] dark:border-white/[0.08] dark:hover:border-white/[0.16]',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-150',
                active
                  ? 'border-neutral-900 dark:border-neutral-100'
                  : 'border-neutral-300 dark:border-neutral-600',
              )}
            >
              <span
                className={cn(
                  'size-2 rounded-full bg-neutral-900 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-100',
                  active ? 'scale-100' : 'scale-0',
                )}
              />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
                {model.name}
              </span>
              {model.description && (
                <span className="block truncate text-[11.5px] text-neutral-500 dark:text-neutral-500">
                  {model.description}
                </span>
              )}
            </span>

            {model.badge && (
              <span className="shrink-0 rounded-md bg-black/[0.05] px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wide text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
                {model.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ModelSelector;
