'use client';

import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <g transform="rotate(-45 12 12)">
        <path
          transform="translate(3, 6)"
          d="M7.83655568,6.36070466 L7.8350323,6.00660914 C7.8350323,4.53497338 7.92121308,3.19331742 8.05102968,2.31870755 L8.16475558,1.77483018 C8.22802754,1.48678171 8.31120835,1.15880301 8.39793457,0.991371397 C8.71538527,0.378924178 9.33610502,0 10.0004606,0 L10.0582781,0 C10.4913637,0.0143198091 11.4011709,0.394345511 11.4011709,0.407563797 C12.8651531,1.02183092 15.6895424,2.87571834 16.9940026,4.19738844 L17.3730714,4.59418673 C17.4723361,4.70172939 17.5838596,4.82900679 17.6530951,4.92821737 C17.884365,5.23444098 18,5.61336516 18,5.99228933 C18,6.41527446 17.8701834,6.80851845 17.6247318,7.13016339 L17.2352725,7.55047018 L17.2352725,7.55047018 L17.1480103,7.6401689 C15.9643883,8.9234441 12.8738803,11.0218469 11.2571726,11.6640352 L11.0130847,11.7575787 C10.719361,11.8628603 10.3078205,11.988434 10.0582781,12 C9.74082738,12 9.43755833,11.9261979 9.14847093,11.7807968 C8.7873844,11.5770149 8.49938789,11.2553699 8.34011709,10.8764457 C8.23866377,10.6142831 8.07939298,9.82669359 8.07939298,9.81237378 C7.93338076,9.01825987 7.84871691,7.76518207 7.83655568,6.36070466 Z M1.77635684e-15,5.99955939 C1.77635684e-15,5.1612998 0.673082751,4.48165963 1.50325451,4.48165963 L5.20248239,4.80881219 C5.85374723,4.80881219 6.38174083,5.3419497 6.38174083,5.99955939 C6.38174083,6.65827061 5.85374723,7.19030659 5.20248239,7.19030659 L1.50325451,7.51745915 C0.673082751,7.51745915 1.77635684e-15,6.83781898 1.77635684e-15,5.99955939 Z"
        />
      </g>
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-cta-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
`;

export type MarqueeCtaFooterVariant = 'Band' | 'Ribbon';

export interface MarqueeCtaFooterProps {
  brand: string;
  phrases: string[];
  href?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  socials?: { label: string; href: string }[];
  copyright?: string;
  speed?: number;
  variant?: MarqueeCtaFooterVariant;
  className?: string;
}

export function MarqueeCtaFooter({
  brand,
  phrases,
  href = '#',
  columns = [],
  socials = [],
  copyright,
  speed = 26,
  variant = 'Band',
  className,
}: MarqueeCtaFooterProps) {
  const track = [...phrases, ...phrases];
  const ribbon = variant === 'Ribbon';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <a
        href={href}
        aria-label={phrases[0]}
        className={cn(
          'group/band block overflow-hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400',
          ribbon
            ? '-rotate-[1.4deg] border-y border-black/[0.08] bg-[#f9452d] text-white dark:border-white/[0.09] dark:bg-[#E1F435] dark:text-neutral-900'
            : 'border-b border-black/[0.08] bg-neutral-900 text-neutral-50 dark:border-white/[0.09] dark:bg-neutral-100 dark:text-neutral-900',
        )}
      >
        <div
          className={cn(
            'flex w-max animate-[su-cta-marquee_var(--su-speed)_linear_infinite] items-center group-hover/band:[animation-play-state:paused] motion-reduce:animate-none',
            ribbon ? 'py-3.5' : 'py-5',
          )}
          style={{ ['--su-speed' as string]: `${speed}s` }}
        >
          {track.map((phrase, index) => (
            <span
              key={`${phrase}-${index}`}
              aria-hidden
              className={cn('flex shrink-0 items-center', ribbon ? 'gap-5 px-5' : 'gap-7 px-7')}
            >
              <span
                className={cn(
                  'whitespace-nowrap font-semibold tracking-[-0.5px]',
                  ribbon ? 'text-[17px]' : 'text-[clamp(20px,2.6vw,30px)]',
                )}
              >
                {phrase}
              </span>
              <span
                aria-hidden
                className={cn(
                  'shrink-0 rounded-full opacity-45',
                  ribbon ? 'size-1.5 bg-current' : 'size-2 bg-current',
                )}
              />
            </span>
          ))}
        </div>
      </a>

      <div className="mx-auto w-full max-w-[1180px] px-6 py-11">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.3px]">{brand}</p>
            <a
              href={href}
              className="group mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              Start free
              <IconArrowUpRight className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>

          {columns.length > 0 && (
            <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title}>
                  <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                    {column.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
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

        <div className="mt-9 flex flex-col gap-3 border-t border-black/[0.07] pt-6 text-[12px] text-neutral-500 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default MarqueeCtaFooter;
