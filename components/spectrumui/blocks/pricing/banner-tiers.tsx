'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PriceFigure } from './price-figure';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { Plan } from './types';

export type BannerTiersVariant = 'Banner' | 'Badge';

export interface BannerTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading: string;
  variant?: BannerTiersVariant;
  className?: string;
}

export function BannerTiers({
  plans,
  eyebrow = 'Pricing',
  heading,
  variant = 'Banner',
  className,
}: BannerTiersProps) {
  const [yearly, setYearly] = useState(true);
  const { ref, shown } = useReveal<HTMLElement>();
  const banner = variant === 'Banner';
  const featuredIndex = Math.max(
    0,
    plans.findIndex((plan) => plan.featured),
  );

  return (
    <section
      ref={ref}
      className={cn(
        '@container w-full bg-white px-6 pb-10 pt-12 dark:bg-[#0c0c0e] sm:px-10',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      <div className={cn('flex flex-col items-center text-center', revealClass(shown))}>
        <span className="flex items-center gap-2.5 border border-[#d4d4d8] px-3.5 py-2 dark:border-[#33333a]">
          <span aria-hidden className="size-2 bg-[#2337f0]" />
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[#18181b] dark:text-[#f4f4f5]">
            {eyebrow}
          </span>
        </span>
        <h2 className="mt-7 max-w-[24ch] text-balance [font-family:var(--font-spectral,Georgia,serif)] text-[34px] font-normal leading-[1.08] tracking-[-0.6px] text-[#0a0a0a] dark:text-white @lg:text-[44px]">
          {heading}
        </h2>

        <div className="mt-8 flex items-center gap-3">
          <span
            className={cn(
              'text-[15px]',
              yearly ? 'text-[#0a0a0a] dark:text-white' : 'text-[#71717a] dark:text-[#8f8f96]',
            )}
          >
            Yearly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={!yearly}
            aria-label="Bill monthly"
            onClick={() => setYearly((value) => !value)}
            className={cn(
              'relative h-7 w-[74px] border border-[#c9c9cf] bg-white dark:border-[#3f3f46] dark:bg-[#1a1a1e]',
              'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2337f0] focus-visible:ring-offset-2',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute top-0.5 left-0.5 h-[22px] w-[33px] bg-[#2337f0]',
                'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
                !yearly && 'translate-x-[35px]',
              )}
            />
          </button>
          <span
            className={cn(
              'text-[15px]',
              !yearly ? 'text-[#0a0a0a] dark:text-white' : 'text-[#71717a] dark:text-[#8f8f96]',
            )}
          >
            Monthly
          </span>
        </div>
      </div>

      <div className={cn('grid @3xl:grid-cols-3', banner ? 'mt-24' : 'mt-12')}>
        {plans.map((plan, position) => {
          const featured = plan.featured;
          const amount = plan.price ? (yearly ? plan.price.annual : plan.price.monthly) : null;

          return (
            <div
              key={plan.id}
              style={revealDelay(shown, position)}
              className={cn(
                'relative flex flex-col border border-[#e4e4e7] dark:border-[#2b2b31]',
                revealClass(shown),
                'mt-14 first:mt-0 @3xl:mt-0',
                position < featuredIndex && '@3xl:border-r-0',
                position > featuredIndex && '@3xl:border-l-0',
                featured && 'z-10 border-[#2337f0] dark:border-[#4356ff]',
              )}
            >
              {featured && banner && (
                <div className="absolute inset-x-[-1px] -top-12 flex h-12 items-center justify-center bg-[#2337f0] text-[19px] font-medium text-white dark:bg-[#4356ff]">
                  Most popular
                </div>
              )}

              <div className="px-8 pb-8 pt-8">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[21px] font-semibold tracking-[-0.3px] text-[#0a0a0a] dark:text-white">
                    {plan.name}
                  </h3>
                  {featured && !banner && (
                    <span className="bg-[#2337f0] px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-white">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-2.5 min-h-[44px] text-pretty text-[14.5px] leading-[1.5] text-[#52525b] dark:text-[#a1a1a8]">
                  {plan.tagline}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  {amount === null ? (
                    <span className="text-[48px] font-semibold leading-none tracking-[-2px] text-[#0a0a0a] dark:text-white">
                      Custom
                    </span>
                  ) : (
                    <>
                      <PriceFigure
                        value={amount}
                        className="text-[48px] font-semibold tracking-[-2px] text-[#0a0a0a] dark:text-white"
                      />
                      <span className="pb-1.5 text-[15px] text-[#71717a] dark:text-[#8f8f96]">
                        / mo
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className={cn(
                    'mt-6 h-[50px] w-full font-mono text-[14.5px]',
                    'transition-[transform,background-color] duration-150 active:scale-[0.98]',
                    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2337f0] focus-visible:ring-offset-2',
                    featured
                      ? 'bg-[#2337f0] text-white hover:bg-[#1b2cd1]'
                      : 'bg-[#0a0a0a] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#0c0c0e] dark:hover:bg-white',
                  )}
                >
                  {plan.cta}
                </button>
              </div>

              <ul className="flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3.5 border-t border-[#e4e4e7] px-8 py-[19px] dark:border-[#2b2b31]"
                  >
                    <span
                      aria-hidden
                      className="grid size-[22px] shrink-0 place-items-center rounded-full border border-[#aeb6f8] dark:border-[#3c4494]"
                    >
                      <Check
                        className="size-3 text-[#2337f0] dark:text-[#93a0ff]"
                        strokeWidth={2.4}
                      />
                    </span>
                    <span className="text-[15px] text-[#27272a] dark:text-[#d4d4da]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BannerTiers;
