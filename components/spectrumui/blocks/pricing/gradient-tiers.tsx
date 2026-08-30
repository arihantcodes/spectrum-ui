'use client';

import { ArrowRight, Building2, FileText, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { Plan } from './types';

export type GradientTiersVariant = 'Tinted' | 'Plain';

export interface GradientTierNote {
  price?: string;
  priceNote?: string;
  footnote?: string;
}

export interface GradientTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  notes?: GradientTierNote[];
  variant?: GradientTiersVariant;
  className?: string;
}

const PALETTE = [
  {
    icon: FileText,
    wash: 'from-[#e8efff] dark:from-[#1a2338]',
    iconColor: 'text-[#4a7dfc] dark:text-[#8fadff]',
    label: 'text-[#8a8580] dark:text-[#98938d]',
  },
  {
    icon: TrendingUp,
    wash: 'from-[#f3f7d4] dark:from-[#272b10]',
    iconColor: 'text-[#7f931c] dark:text-[#bdd14b]',
    label: 'text-[#7f931c] dark:text-[#bdd14b]',
  },
  {
    icon: Building2,
    wash: 'from-[#f5ecfe] dark:from-[#2a1c3c]',
    iconColor: 'text-[#a34df0] dark:text-[#c894f7]',
    label: 'text-[#4a7dfc] dark:text-[#8fadff]',
  },
];

export function GradientTiers({
  plans,
  eyebrow,
  heading,
  subheading,
  notes = [],
  variant = 'Tinted',
  className,
}: GradientTiersProps) {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className={cn('@container w-full', className)}>
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      {heading && (
        <div className={cn('mx-auto mb-10 max-w-[54ch] text-center', revealClass(shown))}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="flex gap-1">
                <span className="size-1.5 rounded-full bg-[#4a7dfc]" />
                <span className="size-1.5 rounded-full bg-[#7f931c]" />
                <span className="size-1.5 rounded-full bg-[#a34df0]" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#78716c] dark:text-[#98938d]">
                {eyebrow}
              </span>
            </span>
          )}
          <h2 className="mt-4 text-balance [font-family:var(--font-spectral,Georgia,serif)] text-[38px] font-normal leading-[1.08] tracking-[-0.5px] text-[#1c1b1a] dark:text-[#f5f5f4] @lg:text-[42px]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-pretty text-[16px] leading-[1.55] text-[#57534e] dark:text-[#a8a29e]">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div className="grid w-full overflow-hidden border border-[#e2e0dd] bg-white @3xl:grid-cols-3 dark:border-[#2b2b30] dark:bg-[#0f0f11]">
        {plans.map((plan, position) => {
          const palette = PALETTE[position % PALETTE.length];
          const Icon = palette.icon;
          const note = notes[position] ?? {};

          return (
            <div
              key={plan.id}
              style={revealDelay(shown, position)}
              className={cn(
                'relative flex flex-col border-t border-[#e2e0dd] px-8 pb-10 pt-9 first:border-t-0 @3xl:border-l @3xl:border-t-0 @3xl:first:border-l-0 dark:border-[#2b2b30]',
                revealClass(shown),
              )}
            >
              {variant === 'Tinted' && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b to-transparent',
                    palette.wash,
                  )}
                />
              )}

              <div className="relative">
                <div className="flex items-start justify-between">
                  <Icon aria-hidden className={cn('size-6', palette.iconColor)} strokeWidth={1.8} />
                  {plan.badge && (
                    <span className="rounded-full bg-[#e7edc4] px-3.5 py-1.5 text-[14px] font-medium text-[#5b661c] dark:bg-[#2e3413] dark:text-[#cade5e]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 [font-family:var(--font-spectral,Georgia,serif)] text-[38px] font-normal leading-none tracking-[-0.5px] text-[#1c1b1a] dark:text-[#f5f5f4]">
                  {plan.name}
                </h3>
                <p className="mt-3 text-pretty text-[16.5px] leading-[1.5] text-[#57534e] dark:text-[#a8a29e]">
                  {plan.tagline}
                </p>

                <div className="mt-7 flex min-h-[42px] items-baseline justify-between gap-4">
                  <span className="whitespace-nowrap text-[27px] font-semibold tracking-[-0.5px] text-[#1c1b1a] dark:text-[#f5f5f4]">
                    {note.price ?? 'Custom pricing'}
                  </span>
                  {note.priceNote && (
                    <span className="text-right text-[15px] leading-snug text-[#78716c] dark:text-[#8f8a85]">
                      {note.priceNote}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className={cn(
                    'group mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-[3px] text-[16px] font-medium',
                    'transition-[transform,background-color,border-color] duration-150 active:scale-[0.98]',
                    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4a7dfc] focus-visible:ring-offset-2',
                    position === 0
                      ? 'border border-black/40 bg-[#3a3733] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] hover:bg-[#292624] dark:border-white/20 dark:bg-[#f5f5f4] dark:text-[#1c1917] dark:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:bg-white'
                      : 'border border-[#d9d6d2] bg-white text-[#453f54] hover:border-[#b9b5af] dark:border-white/[0.15] dark:bg-transparent dark:text-[#d3cde2] dark:hover:border-white/[0.3]',
                  )}
                >
                  {plan.cta}
                  {position > 0 && (
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  )}
                </button>

                <p
                  className={cn(
                    'mt-9 text-[13px] font-semibold uppercase tracking-[0.05em]',
                    palette.label,
                  )}
                >
                  {plan.inherits ? `Everything in ${plan.inherits}, plus:` : 'Core functionality'}
                </p>

                <ul className="mt-6 space-y-[18px]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-baseline gap-3.5">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="size-4 shrink-0 translate-y-0.5 text-[#1c1b1a] dark:text-[#f5f5f4]"
                      >
                        <path
                          d="m2.5 9 3.5 3.5L13.5 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[16.5px] leading-[1.45] text-[#292524] dark:text-[#d6d3d1]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {note.footnote && (
                  <p className="mt-10 text-center text-[15.5px] text-[#57534e] dark:text-[#a8a29e]">
                    {note.footnote}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GradientTiers;
