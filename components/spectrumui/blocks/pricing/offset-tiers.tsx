'use client';

import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { Plan } from './types';

export type OffsetTiersVariant = 'Staggered' | 'Level';

export interface OffsetTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  currency?: string;
  variant?: OffsetTiersVariant;
  className?: string;
}

const OFFSETS = ['@3xl:mt-0', '@3xl:mt-10', '@3xl:mt-20'];

export function OffsetTiers({
  plans,
  eyebrow,
  heading,
  subheading,
  currency = '$',
  variant = 'Staggered',
  className,
}: OffsetTiersProps) {
  const { ref, shown } = useReveal<HTMLElement>();
  const staggered = variant === 'Staggered';

  return (
    <section
      ref={ref}
      className={cn(
        '@container relative w-full bg-white px-6 py-10 sm:px-10 sm:py-14 dark:bg-[#0b0b0d]',
        '[background-image:radial-gradient(circle,#d9d9d9_1px,transparent_1px)] [background-size:13px_13px]',
        'dark:[background-image:radial-gradient(circle,#2a2a2e_1px,transparent_1px)]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      {heading && (
        <div className={cn('mb-12 max-w-[52ch]', revealClass(shown))}>
          {eyebrow && (
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-[#6f88f7]" />
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#6b6b70] dark:text-[#9d9da5]">
                {eyebrow}
              </span>
            </span>
          )}
          <h2 className="mt-4 text-balance [font-family:var(--font-spectral,Georgia,serif)] text-[40px] font-normal leading-[1.05] tracking-[-0.5px] text-[#111113] dark:text-[#f4f4f5]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-pretty text-[16px] leading-[1.55] text-[#6b6b70] dark:text-[#9d9da5]">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-8 @3xl:grid-cols-3 @3xl:gap-9">
        {plans.map((plan, position) => (
          <div
            key={plan.id}
            style={revealDelay(shown, position)}
            className={cn(
              'flex flex-col border border-[#e4e4e4] bg-white transition-[border-color,box-shadow] duration-200 dark:border-[#28282d] dark:bg-[#111113]',
              '[@media(hover:hover)]:hover:border-[#c9c9cc] [@media(hover:hover)]:hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.25)] dark:[@media(hover:hover)]:hover:border-[#3a3a41]',
              revealClass(shown),
              staggered && OFFSETS[position % OFFSETS.length],
            )}
          >
            <div className="px-8 pb-9 pt-10 @lg:px-9">
              <h3 className="[font-family:var(--font-spectral,Georgia,serif)] text-[40px] font-normal leading-none tracking-[-0.5px] text-[#111113] dark:text-[#f4f4f5]">
                {plan.name}
              </h3>
              <p className="mt-5 text-pretty text-[16px] leading-[1.55] text-[#6b6b70] dark:text-[#9d9da5]">
                {plan.tagline}
              </p>
            </div>

            <div className="flex-1 border-t border-[#e4e4e4] dark:border-[#28282d] px-8 py-9 @lg:px-9">
              {plan.inherits && (
                <p className="mb-7 text-[16.5px] font-medium leading-snug text-[#26262a] dark:text-[#e7e7ec]">
                  Includes everything in {plan.inherits}, plus:
                </p>
              )}
              <ul className="space-y-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-[21px] shrink-0 place-items-center rounded-full bg-[#6f88f7]"
                    >
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-[15.5px] leading-[1.5] text-[#3d3d42] dark:text-[#c6c6cd]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#e4e4e4] dark:border-[#28282d] px-8 pb-9 pt-7 @lg:px-9">
              <p className="text-center text-[17px] text-[#26262a] dark:text-[#e7e7ec]">
                {plan.price ? (
                  <>
                    From{' '}
                    <span className="font-semibold">
                      {currency}
                      {plan.price.monthly.toLocaleString('en-US')} /month
                    </span>
                  </>
                ) : (
                  'Talk to us to find out more'
                )}
              </p>
              <button
                type="button"
                className={cn(
                  'group mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-[4px] bg-[#111113] text-[15px] font-medium text-white dark:bg-[#f4f4f5] dark:text-[#0b0b0d]',
                  'transition-[transform,background-color] duration-150 hover:bg-black active:scale-[0.98] dark:hover:bg-white',
                  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#6f88f7] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111113]',
                )}
              >
                {plan.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OffsetTiers;
