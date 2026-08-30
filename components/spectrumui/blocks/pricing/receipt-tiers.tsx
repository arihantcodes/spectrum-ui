'use client';

import { cn } from '@/lib/utils';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { Plan } from './types';

export type ReceiptTiersVariant = 'Tilted' | 'Straight';

export interface ReceiptTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  merchant?: string;
  merchantLine?: string;
  variant?: ReceiptTiersVariant;
  className?: string;
}

const TILTS = [
  '@3xl:-rotate-1',
  '@3xl:rotate-[0.5deg] @3xl:-translate-y-2',
  '@3xl:rotate-[1.5deg]',
];

function Rule() {
  return (
    <span
      aria-hidden
      className="my-3 block border-t border-dashed border-[#b9b6ad] dark:border-[#3f3f45]"
    />
  );
}

export function ReceiptTiers({
  plans,
  eyebrow,
  heading,
  subheading,
  merchant = 'PORTSIDE FREIGHT CO.',
  merchantLine = 'TERMINAL 4 · DOCK 12 · ROTTERDAM',
  variant = 'Tilted',
  className,
}: ReceiptTiersProps) {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn(
        '@container w-full rounded-2xl bg-[#e9e8e3] px-6 py-12 sm:px-10 dark:bg-[#111113]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      {heading && (
        <div className={cn('mx-auto mb-12 max-w-[52ch] text-center font-mono', revealClass(shown))}>
          {eyebrow && (
            <span className="text-[11px] tracking-[0.3em] text-[#7c7a72] dark:text-[#8f8f95]">
              ··· {eyebrow.toUpperCase()} ···
            </span>
          )}
          <h2 className="mt-4 text-balance text-[24px] font-bold uppercase tracking-[0.12em] text-[#2a2a26] dark:text-[#d8d8d2] @lg:text-[27px]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-pretty text-[11.5px] uppercase leading-[1.7] tracking-[0.08em] text-[#7c7a72] dark:text-[#8f8f95]">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div className="mx-auto grid max-w-[1040px] items-start gap-8 font-mono @3xl:grid-cols-3 @3xl:gap-7">
        {plans.map((plan, position) => (
          <div
            key={plan.id}
            style={revealDelay(shown, position)}
            className={cn(
              'relative bg-[#fefdf8] px-6 pb-7 pt-8 text-[12.5px] leading-relaxed text-[#2a2a26] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)]',
              '[clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),97%_100%,94%_calc(100%-8px),91%_100%,88%_calc(100%-8px),85%_100%,82%_calc(100%-8px),79%_100%,76%_calc(100%-8px),73%_100%,70%_calc(100%-8px),67%_100%,64%_calc(100%-8px),61%_100%,58%_calc(100%-8px),55%_100%,52%_calc(100%-8px),49%_100%,46%_calc(100%-8px),43%_100%,40%_calc(100%-8px),37%_100%,34%_calc(100%-8px),31%_100%,28%_calc(100%-8px),25%_100%,22%_calc(100%-8px),19%_100%,16%_calc(100%-8px),13%_100%,10%_calc(100%-8px),7%_100%,4%_calc(100%-8px),1%_100%,0_calc(100%-8px))]',
              'dark:bg-[#1c1c1f] dark:text-[#d8d8d2]',
              revealClass(shown),
              variant === 'Tilted' && TILTS[position % TILTS.length],
            )}
          >
            {plan.badge && (
              <span
                aria-hidden
                className="absolute right-4 top-16 -rotate-12 rounded border-2 border-[#c93a28] px-2 py-1 text-[11px] font-bold tracking-[0.14em] text-[#c93a28] opacity-80 mix-blend-multiply dark:mix-blend-normal dark:opacity-90"
              >
                {plan.badge.toUpperCase()}
              </span>
            )}

            <p className="text-center text-[13.5px] font-bold tracking-[0.08em]">{merchant}</p>
            <p className="mt-1 text-center text-[10.5px] tracking-[0.06em] text-[#7c7a72] dark:text-[#8f8f95]">
              {merchantLine}
            </p>

            <Rule />

            <div className="flex items-baseline justify-between">
              <span className="font-bold tracking-[0.08em]">{plan.name.toUpperCase()} PLAN</span>
              <span className="text-[#7c7a72] dark:text-[#8f8f95]">×1</span>
            </div>
            <p className="mt-1 text-[11px] text-[#7c7a72] dark:text-[#8f8f95]">{plan.tagline}</p>

            <Rule />

            <ul className="space-y-1.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-baseline gap-2">
                  <span className="min-w-0 flex-shrink truncate">{feature.toUpperCase()}</span>
                  <span
                    aria-hidden
                    className="mb-1 min-w-3 flex-1 border-b border-dotted border-[#b9b6ad] dark:border-[#3f3f45]"
                  />
                  <span className="shrink-0 text-[#7c7a72] dark:text-[#8f8f95]">INCL</span>
                </li>
              ))}
            </ul>

            <Rule />

            <div className="flex items-baseline justify-between text-[11.5px] text-[#7c7a72] dark:text-[#8f8f95]">
              <span>SUBTOTAL</span>
              <span>{plan.price ? `$${plan.price.monthly}.00` : 'ON QUOTE'}</span>
            </div>
            <div className="flex items-baseline justify-between text-[11.5px] text-[#7c7a72] dark:text-[#8f8f95]">
              <span>SEAT DISCOUNT (YEARLY)</span>
              <span>
                {plan.price && plan.price.monthly > 0
                  ? `-$${plan.price.monthly - plan.price.annual}.00`
                  : '—'}
              </span>
            </div>

            <div className="mt-2 flex items-baseline justify-between text-[17px] font-bold">
              <span>TOTAL /MO</span>
              <span>{plan.price ? `$${plan.price.annual}.00` : 'CUSTOM'}</span>
            </div>

            <Rule />

            <button
              type="button"
              className={cn(
                'w-full py-3 text-[12.5px] font-bold tracking-[0.1em]',
                'transition-transform duration-150 active:scale-[0.98]',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#c93a28] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1c1c1f]',
                'bg-[#2a2a26] text-[#fefdf8] hover:bg-black dark:bg-[#ecece6] dark:text-[#1c1c1f] dark:hover:bg-white',
              )}
            >
              {plan.cta.toUpperCase()}
            </button>

            <div
              aria-hidden
              className="mx-auto mt-5 h-10 w-4/5 opacity-80 [background-image:repeating-linear-gradient(90deg,currentColor_0,currentColor_2px,transparent_2px,transparent_5px,currentColor_5px,currentColor_6px,transparent_6px,transparent_9px)]"
            />
            <p className="mt-2 text-center text-[10px] tracking-[0.2em] text-[#7c7a72] dark:text-[#8f8f95]">
              {`NO. 00${28 + position} · THANK YOU`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReceiptTiers;
