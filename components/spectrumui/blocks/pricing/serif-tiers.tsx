'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PriceFigure } from './price-figure';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { BillingPeriod, Plan } from './types';

export type SerifTiersVariant = 'Ember' | 'Ink';

export interface SerifTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading: string;
  subheading?: string;
  variant?: SerifTiersVariant;
  className?: string;
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={cn('size-3.5 shrink-0', className)}>
      <path
        d="M8 0c.6 4.4 3 6.8 8 8-5 1.2-7.4 3.6-8 8-.6-4.4-3-6.8-8-8 5-1.2 7.4-3.6 8-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SerifTiers({
  plans,
  eyebrow = 'Pricing',
  heading,
  subheading,
  variant = 'Ember',
  className,
}: SerifTiersProps) {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn(
        '@container w-full rounded-[28px] bg-[#fbfaf7] px-5 py-12 dark:bg-[#161316] sm:px-8',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      <div className={cn('flex flex-col items-center text-center', revealClass(shown))}>
        <span className="rounded-full bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#57534e] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] dark:bg-[#211d21] dark:text-[#b6afa8] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.06)]">
          {eyebrow}
        </span>
        <h2 className="mt-6 max-w-[20ch] text-balance [font-family:var(--font-spectral,Georgia,serif)] text-[38px] font-normal leading-[1.12] tracking-[-0.5px] text-[#1c1917] dark:text-[#f5f2ee] @lg:text-[46px]">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 max-w-[44ch] text-pretty text-[16px] leading-[1.55] text-[#57534e] dark:text-[#a8a29e]">
            {subheading}
          </p>
        )}

        <div className="mt-8 inline-flex rounded-full border border-black/[0.06] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/[0.07] dark:bg-[#211d21]">
          {(['monthly', 'annual'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
              className={cn(
                'rounded-full px-6 py-2 text-[14.5px] font-medium transition-colors duration-200',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#e11d48]',
                period === value
                  ? 'bg-[#f5f2ec] text-[#1c1917] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-[#2e2930] dark:text-[#f5f2ee] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]'
                  : 'text-[#78716c] hover:text-[#1c1917] dark:text-[#8f8a85] dark:hover:text-[#f5f2ee]',
              )}
            >
              {value === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 @3xl:grid-cols-3">
        {plans.map((plan, position) => {
          const featured = plan.featured;
          const amount = plan.price ? plan.price[period] : 0;

          return (
            <div
              key={plan.id}
              style={revealDelay(shown, position + 1)}
              className={cn(
                'relative flex flex-col overflow-hidden rounded-[24px] p-8',
                revealClass(shown),
                featured
                  ? 'bg-[#0c0a09] text-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09),0_28px_60px_-28px_rgba(0,0,0,0.8)]'
                  : 'bg-[#f5f2ec] dark:bg-[#211d22] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]',
              )}
            >
              {featured && variant === 'Ember' && (
                <>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-40 -right-32 size-[300px] rounded-full bg-[#e11d48] opacity-70 blur-[90px]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -right-16 size-[140px] rounded-full bg-[#fb7185] opacity-60 blur-[70px]"
                  />
                </>
              )}

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <h3
                    className={cn(
                      '[font-family:var(--font-spectral,Georgia,serif)] text-[30px] font-normal leading-none tracking-[-0.3px]',
                      featured ? 'text-white' : 'text-[#1c1917] dark:text-[#f5f2ee]',
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="rounded-full bg-gradient-to-r from-[#fb7185] to-[#e11d48] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    'mt-3 min-h-[24px] text-pretty text-[15px] leading-[1.5]',
                    featured ? 'text-[#d6d3d1]' : 'text-[#57534e] dark:text-[#a8a29e]',
                  )}
                >
                  {plan.tagline}
                </p>

                <div className="mt-10 flex items-end gap-2">
                  <PriceFigure
                    value={amount}
                    className={cn(
                      '[font-family:var(--font-spectral,Georgia,serif)] text-[46px] font-normal tracking-[-1px]',
                      featured ? 'text-white' : 'text-[#1c1917] dark:text-[#f5f2ee]',
                    )}
                  />
                  <span
                    className={cn(
                      'pb-1.5 text-[14px]',
                      featured ? 'text-[#a8a29e]' : 'text-[#78716c] dark:text-[#8f8a85]',
                    )}
                  >
                    /month, per user
                  </span>
                </div>

                <button
                  type="button"
                  className={cn(
                    'mt-7 h-[52px] w-full rounded-full bg-white text-[15px] font-medium text-[#1c1917]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)]',
                    'transition-[transform,background-color] duration-150 hover:bg-[#faf9f6] active:scale-[0.98]',
                    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2',
                    featured && 'focus-visible:ring-offset-[#0c0a09]',
                  )}
                >
                  {plan.cta}
                </button>

                <p
                  className={cn(
                    'mt-8 text-[14px]',
                    featured ? 'text-[#a8a29e]' : 'text-[#78716c] dark:text-[#8f8a85]',
                  )}
                >
                  What&rsquo;s included
                </p>
                <ul className="mt-4 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Star
                        className={featured ? 'text-white' : 'text-[#1c1917] dark:text-[#f5f2ee]'}
                      />
                      <span
                        className={cn(
                          'text-[15px] leading-[1.45]',
                          featured ? 'text-[#e7e5e4]' : 'text-[#292524] dark:text-[#d6d0c9]',
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SerifTiers;
