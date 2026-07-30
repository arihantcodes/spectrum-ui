'use client';

import { Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-grow { from { opacity: 0.4; transform: scaleY(0.2) } to { opacity: 1; transform: none } }
`;

export interface Insight {
  id: string;
  label: string;
  value: string;
  change?: number;
  spark?: number[];
  note?: string;
}

export type InsightCardsVariant = 'Grid' | 'Row';

export interface InsightCardsProps {
  insights: Insight[];
  variant?: InsightCardsVariant;
  className?: string;
}

export function InsightCards({ insights, variant = 'Grid', className }: InsightCardsProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[520px] gap-2.5',
        variant === 'Grid' ? 'grid sm:grid-cols-2' : 'flex flex-col',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {insights.map((insight) => {
        const positive = (insight.change ?? 0) >= 0;
        return (
          <div
            key={insight.id}
            className="rounded-xl border border-black/[0.07] bg-white p-3.5 transition-[border-color] duration-150 hover:border-black/[0.14] dark:border-white/[0.08] dark:bg-[#0B0B0D] dark:hover:border-white/[0.16]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[11.5px] font-medium text-neutral-500 dark:text-neutral-400">
                  {insight.label}
                </p>
                <p className="mt-1 font-mono text-[20px] font-medium tabular-nums tracking-[-0.5px] text-neutral-900 dark:text-neutral-50">
                  {insight.value}
                </p>
              </div>
              {insight.spark && insight.spark.length > 0 && (
                <span aria-hidden className="flex h-8 items-end gap-[2px]">
                  {insight.spark.map((point, index) => (
                    <span
                      key={index}
                      className={cn(
                        'w-[3px] origin-bottom rounded-sm transition-[height] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:animate-[su-grow_400ms_cubic-bezier(0.23,1,0.32,1)_both]',
                        index === insight.spark!.length - 1
                          ? 'bg-neutral-900 dark:bg-neutral-100'
                          : 'bg-black/[0.12] dark:bg-white/[0.16]',
                      )}
                      style={{
                        height: `${Math.max(12, Math.min(100, point))}%`,
                        animationDelay: `${index * 30}ms`,
                      }}
                    />
                  ))}
                </span>
              )}
            </div>

            {insight.change !== undefined && (
              <p
                className={cn(
                  'mt-1.5 flex items-center gap-1 font-mono text-[10.5px] tabular-nums',
                  positive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600/90 dark:text-red-400/90',
                )}
              >
                {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {positive ? '+' : ''}
                {insight.change}%
              </p>
            )}

            {insight.note && (
              <p className="mt-2 flex items-start gap-1.5 border-t border-black/[0.05] pt-2 text-[11.5px] leading-[1.5] text-neutral-500 dark:border-white/[0.06] dark:text-neutral-400">
                <Sparkles className="mt-0.5 size-3 shrink-0 text-neutral-400 dark:text-neutral-500" />
                {insight.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default InsightCards;
