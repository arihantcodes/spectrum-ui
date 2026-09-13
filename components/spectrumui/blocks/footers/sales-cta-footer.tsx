'use client';

import { useId, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3, 6)"
        d="M7.83655568,6.36070466 L7.8350323,6.00660914 C7.8350323,4.53497338 7.92121308,3.19331742 8.05102968,2.31870755 L8.16475558,1.77483018 C8.22802754,1.48678171 8.31120835,1.15880301 8.39793457,0.991371397 C8.71538527,0.378924178 9.33610502,0 10.0004606,0 L10.0582781,0 C10.4913637,0.0143198091 11.4011709,0.394345511 11.4011709,0.407563797 C12.8651531,1.02183092 15.6895424,2.87571834 16.9940026,4.19738844 L17.3730714,4.59418673 C17.4723361,4.70172939 17.5838596,4.82900679 17.6530951,4.92821737 C17.884365,5.23444098 18,5.61336516 18,5.99228933 C18,6.41527446 17.8701834,6.80851845 17.6247318,7.13016339 L17.2352725,7.55047018 L17.2352725,7.55047018 L17.1480103,7.6401689 C15.9643883,8.9234441 12.8738803,11.0218469 11.2571726,11.6640352 L11.0130847,11.7575787 C10.719361,11.8628603 10.3078205,11.988434 10.0582781,12 C9.74082738,12 9.43755833,11.9261979 9.14847093,11.7807968 C8.7873844,11.5770149 8.49938789,11.2553699 8.34011709,10.8764457 C8.23866377,10.6142831 8.07939298,9.82669359 8.07939298,9.81237378 C7.93338076,9.01825987 7.84871691,7.76518207 7.83655568,6.36070466 Z M1.77635684e-15,5.99955939 C1.77635684e-15,5.1612998 0.673082751,4.48165963 1.50325451,4.48165963 L5.20248239,4.80881219 C5.85374723,4.80881219 6.38174083,5.3419497 6.38174083,5.99955939 C6.38174083,6.65827061 5.85374723,7.19030659 5.20248239,7.19030659 L1.50325451,7.51745915 C0.673082751,7.51745915 1.77635684e-15,6.83781898 1.77635684e-15,5.99955939 Z"
      />
    </svg>
  );
}

export type SalesCtaFooterVariant = 'Split' | 'Stacked';

export interface SalesCtaFooterProps {
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
          <div className="rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-6 dark:border-white/[0.09] dark:bg-white/[0.03]">
            <h2 className="text-balance text-[20px] font-semibold leading-[1.2] tracking-[-0.4px]">
              {headline}
            </h2>
            <p className="mt-2 max-w-[46ch] text-pretty text-[13px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {blurb}
            </p>

            <div className="mt-6 flex items-end justify-between gap-4">
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
              <button
                type="button"
                onClick={() => onContact?.(seats)}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-5 text-[13.5px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
              >
                {ctaLabel}
                <IconArrowRight className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </button>
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                Indicative only. Volume, term and support tier change the number.
              </p>
            </div>
          </div>

          {groups.length > 0 && (
            <nav
              aria-label="Footer"
              className={cn(
                'grid gap-8 self-center',
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

        <p className="mt-10 border-t border-black/[0.07] pt-6 text-[12px] tabular-nums text-neutral-500 dark:border-white/[0.08]">
          {copyright ?? `© ${brand}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}

export default SalesCtaFooter;
