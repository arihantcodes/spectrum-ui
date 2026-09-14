'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconArrowRight, FooterBar, type FooterSocial } from './footer-kit';

export type SalesCtaFooterVariant = 'Split' | 'Stacked';

export interface SalesCtaFooterProps {
  links?: { label: string; href: string }[];
  socials?: FooterSocial[];
  brand: string;
  headline?: string;
  blurb?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  minSeats?: number;
  maxSeats?: number;
  defaultSeats?: number;
  pricePerSeat?: number;
  currency?: string;
  ctaLabel?: string;
  onContact?: (seats: number) => void;
  copyright?: string;
  variant?: SalesCtaFooterVariant;
  className?: string;
}

const TIERS = [
  { threshold: 0, name: 'Team', discount: 0 },
  { threshold: 100, name: 'Business', discount: 0.1 },
  { threshold: 400, name: 'Enterprise', discount: 0.22 },
  { threshold: 1200, name: 'Enterprise+', discount: 0.34 },
];

function tierFor(seats: number) {
  return [...TIERS].reverse().find((tier) => seats >= tier.threshold) ?? TIERS[0];
}

export function SalesCtaFooter({
  links,
  socials,
  brand,
  headline = 'Priced per seat until it should not be.',
  blurb = 'Move the slider for an indicative annual figure. Anything above four hundred seats is quoted, not listed.',
  groups = [],
  minSeats = 25,
  maxSeats = 2000,
  defaultSeats = 250,
  pricePerSeat = 38,
  currency = '$',
  ctaLabel = 'Talk to sales',
  onContact,
  copyright,
  variant = 'Split',
  className,
}: SalesCtaFooterProps) {
  const [seats, setSeats] = useState(defaultSeats);
  const sliderId = useId();
  const tier = tierFor(seats);
  const annual = Math.round(seats * pricePerSeat * 12 * (1 - tier.discount));
  const progress = (seats - minSeats) / (maxSeats - minSeats);

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div
          className={cn(
            'grid gap-10',
            variant === 'Split' &&
              groups.length > 0 &&
              'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]',
          )}
        >
          <div className="min-w-0 rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-5 dark:border-white/[0.09] dark:bg-white/[0.03] sm:p-6">
            <h2 className="text-balance text-[20px] font-semibold leading-[1.2] tracking-[-0.4px]">
              {headline}
            </h2>
            <p className="mt-2 max-w-[46ch] text-pretty text-[13px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {blurb}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
              <div>
                <label
                  htmlFor={sliderId}
                  className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400"
                >
                  Seats
                </label>
                <p className="mt-1 font-mono text-[26px] leading-none tabular-nums tracking-[-1px]">
                  {seats.toLocaleString('en-US')}
                  {seats >= maxSeats && '+'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                  {tier.name} · est. / year
                </p>
                <p className="mt-1 font-mono text-[26px] leading-none tabular-nums tracking-[-1px]">
                  {currency}
                  {annual.toLocaleString('en-US')}
                </p>
              </div>
            </div>

            <div className="relative mt-4">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/[0.08] dark:bg-white/[0.1]"
              />
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-900 transition-[width] duration-150 ease-out dark:bg-neutral-100"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
              <input
                id={sliderId}
                type="range"
                min={minSeats}
                max={maxSeats}
                step={25}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value))}
                aria-valuetext={`${seats} seats, ${tier.name} tier`}
                className="relative h-6 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-hidden [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.25)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 active:[&::-webkit-slider-thumb]:scale-[1.15] dark:[&::-moz-range-thumb]:bg-neutral-100 dark:[&::-webkit-slider-thumb]:bg-neutral-100"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={() => onContact?.(seats)}
                className="group h-10 gap-2 rounded-full px-5 text-[13.5px] transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                {ctaLabel}
                <IconArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </Button>
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                Indicative only. Volume, term and support tier change the number.
              </p>
            </div>
          </div>

          {groups.length > 0 && (
            <nav
              aria-label="Footer"
              className={cn(
                'grid min-w-0 gap-8 self-center',
                variant === 'Split' ? 'sm:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-6',
              )}
            >
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default SalesCtaFooter;
