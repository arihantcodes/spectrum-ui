'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PriceFigure } from './price-figure';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { Plan } from './types';

export type BlueprintTiersVariant = 'Marks' | 'Clean';

export interface BlueprintTiersProps {
  plans: Plan[];
  eyebrow?: string;
  heading: string;
  subheading?: string;
  freeNote?: string;
  yearlyNote?: string;
  variant?: BlueprintTiersVariant;
  className?: string;
}

function CropMark({ position }: { position: string }) {
  return (
    <span aria-hidden className={cn('pointer-events-none absolute z-10 size-2.5', position)}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#a1a1aa] dark:bg-[#4a4a52]" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#a1a1aa] dark:bg-[#4a4a52]" />
    </span>
  );
}

function CornerTicks() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-1 size-2 border-l border-t border-[#18181b] dark:border-[#d4d4d8]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-1 size-2 border-r border-t border-[#18181b] dark:border-[#d4d4d8]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 -left-1 size-2 border-b border-l border-[#18181b] dark:border-[#d4d4d8]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 -right-1 size-2 border-b border-r border-[#18181b] dark:border-[#d4d4d8]"
      />
    </>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2941ff] focus-visible:ring-offset-2',
        on ? 'bg-[#2941ff]' : 'bg-[#c9c9cf] dark:bg-[#3f3f46]',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
          on && 'translate-x-5',
        )}
      />
    </button>
  );
}

export function BlueprintTiers({
  plans,
  eyebrow = 'Simple and transparent',
  heading,
  subheading,
  freeNote = 'No credit card required',
  yearlyNote = '2 months free',
  variant = 'Marks',
  className,
}: BlueprintTiersProps) {
  const [yearly, setYearly] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(plans.map((plan) => [plan.id, true])),
  );
  const { ref, shown } = useReveal<HTMLElement>();
  const marks = variant === 'Marks';

  return (
    <section
      ref={ref}
      className={cn('@container w-full bg-[#f4f4f6] pt-14 dark:bg-[#0f0f12]', className)}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      <div className={cn('flex flex-col items-center px-6 text-center', revealClass(shown))}>
        <span className="flex items-center gap-2.5 border border-[#d4d4d8] dark:border-[#2d2d33] bg-white px-3.5 py-2 dark:bg-[#17171b]">
          <span aria-hidden className="size-2 bg-[#2941ff]" />
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[#18181b] dark:text-[#f4f4f5]">
            {eyebrow}
          </span>
        </span>
        <h2 className="mt-7 max-w-[22ch] text-balance text-[38px] font-semibold leading-[1.05] tracking-[-2px] text-[#0a0a0a] dark:text-white @lg:text-[46px]">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-5 max-w-[46ch] text-pretty text-[16px] leading-[1.55] text-[#52525b] dark:text-[#a1a1a8]">
            {subheading}
          </p>
        )}
      </div>

      <div className="relative mt-12 border-t border-[#d4d4d8] dark:border-[#2d2d33]">
        {marks && (
          <>
            <CropMark position="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
            <CropMark position="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
          </>
        )}

        <div className="grid @3xl:grid-cols-3">
          {plans.map((plan, position) => {
            const isYearly = yearly[plan.id] ?? true;
            const amount = plan.price ? (isYearly ? plan.price.annual : plan.price.monthly) : 0;
            const free = amount === 0;

            return (
              <div
                key={plan.id}
                style={revealDelay(shown, position + 1)}
                className={cn(
                  'relative flex flex-col border-t border-[#d4d4d8] dark:border-[#2d2d33] @3xl:border-l @3xl:border-t-0 @3xl:first:border-l-0',
                  revealClass(shown),
                )}
              >
                {marks && position > 0 && (
                  <CropMark position="left-0 top-0 -translate-x-1/2 -translate-y-1/2 hidden @3xl:block" />
                )}

                <div className="px-8 pb-8 pt-9 @lg:px-10">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[17px] font-medium text-[#18181b] dark:text-[#f4f4f5]">
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span className="bg-[#e4e8ff] px-2.5 py-1 dark:bg-[#1b2147] font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#2941ff] dark:text-[#93a3ff]">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 min-h-[52px] text-pretty text-[15px] leading-[1.55] text-[#52525b] dark:text-[#a1a1a8]">
                    {plan.tagline}
                  </p>
                </div>

                <div className="border-t border-[#d4d4d8] dark:border-[#2d2d33] px-8 pb-9 pt-8 @lg:px-10">
                  <div className="flex items-end gap-1.5">
                    <PriceFigure
                      value={amount}
                      className="text-[52px] font-semibold tracking-[-2.5px] text-[#0a0a0a] dark:text-white"
                    />
                    <span className="pb-1.5 text-[14px] text-[#71717a] dark:text-[#8f8f96]">
                      /{free ? 'forever' : 'monthly'}
                    </span>
                  </div>

                  <div className="mt-5 flex min-h-[28px] items-center gap-3">
                    {free ? (
                      <span className="text-[14.5px] text-[#52525b] dark:text-[#a1a1a8]">
                        {freeNote}
                      </span>
                    ) : (
                      <>
                        <Toggle
                          on={isYearly}
                          onChange={() =>
                            setYearly((prior) => ({ ...prior, [plan.id]: !prior[plan.id] }))
                          }
                          label={`Bill ${plan.name} yearly`}
                        />
                        <span className="text-[14.5px] text-[#18181b] dark:text-[#f4f4f5]">
                          Billed yearly
                        </span>
                        <span className="border border-[#d4d4d8] dark:border-[#2d2d33] bg-[#ececf0] px-2 py-1 dark:bg-[#1d1d22] font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#3f3f46] dark:text-[#b3b3bb]">
                          {yearlyNote}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="relative mt-7">
                    {marks && plan.featured && <CornerTicks />}
                    <button
                      type="button"
                      className={cn(
                        'h-[52px] w-full font-mono text-[14.5px]',
                        'transition-[transform,background-color] duration-150 active:scale-[0.98]',
                        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2941ff] focus-visible:ring-offset-2',
                        plan.featured
                          ? 'bg-[#2941ff] text-white hover:bg-[#1f33d6]'
                          : 'bg-[#e4e4e7] text-[#18181b] hover:bg-[#d9d9de] dark:bg-[#232329] dark:text-[#f4f4f5] dark:hover:bg-[#2c2c33]',
                      )}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>

                <ul className="flex-1 border-t border-[#d4d4d8] dark:border-[#2d2d33]">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-4 border-t border-[#e2e2e6] px-8 py-[18px] first:border-t-0 dark:border-[#232328] @lg:px-10"
                    >
                      <span
                        aria-hidden
                        className="grid size-5 shrink-0 place-items-center rounded-full border border-[#a1a1aa] dark:border-[#4a4a52]"
                      >
                        <Check
                          className="size-2.5 text-[#3f3f46] dark:text-[#b3b3bb]"
                          strokeWidth={2.4}
                        />
                      </span>
                      <span className="text-[15px] text-[#3f3f46] dark:text-[#c6c6cd]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          aria-hidden
          className="h-20 border-t border-[#d4d4d8] dark:border-[#2d2d33] [background-image:repeating-linear-gradient(45deg,transparent,transparent_8px,#dcdce1_8px,#dcdce1_9px)] dark:[background-image:repeating-linear-gradient(45deg,transparent,transparent_8px,#232329_8px,#232329_9px)]"
        />
      </div>
    </section>
  );
}

export default BlueprintTiers;
