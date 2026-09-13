'use client';

import { useState, type SVGProps } from 'react';
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

function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3.5, 2)"
        d="M9.07075879,0.0995641968 L15.708183,2.32651721 C16.4511557,2.57461017 16.953518,3.25711096 16.9575449,4.02198254 L16.9998279,10.6626368 C17.0129155,12.675818 16.2790035,14.6282017 14.9350081,16.1579449 C14.3168709,16.8600578 13.5245681,17.4631296 12.5127963,18.0024621 L8.94491652,19.909738 C8.8331686,19.9685743 8.71034655,19.998973 8.58651777,19.9999774 C8.46268898,20.0009343 8.3388602,19.9715161 8.22811901,19.9136604 L4.62701688,18.0505117 C3.60417099,17.5200047 2.80482095,16.9257583 2.18064334,16.2334514 C0.814499758,14.719398 0.055419243,12.7758397 0.0423316479,10.7597166 L2.41764636e-05,4.12396542 C-0.00397830397,3.35811323 0.489323357,2.67070942 1.22826911,2.41281041 L7.84052485,0.106428429 C8.2331527,-0.0328174223 8.67108377,-0.035759236 9.07075879,0.0995641968 Z M12.2448026,7.21865543 C11.9478149,6.93329949 11.4696143,6.9352607 11.1766535,7.22453905 L11.1766535,7.22453905 L7.80810788,10.5448662 L6.42887671,9.21908878 C6.13188897,8.93373285 5.65469512,8.93667466 5.3607276,9.22595301 C5.06776682,9.51523137 5.07078703,9.98003794 5.36777476,10.2653939 L5.36777476,10.2653939 L7.28359734,12.1089305 C7.43259457,12.2520988 7.62588829,12.3227023 7.819182,12.3207808 C8.01247571,12.3197605 8.20476269,12.2471957 8.35174645,12.1020663 L8.35174645,12.1020663 L12.250843,8.25809629 C12.5438038,7.96881793 12.5407836,7.50401136 12.2448026,7.21865543 Z"
      />
    </svg>
  );
}

/**
 * Six customer marks. Invented, not real companies — a logo row that ships with
 * somebody else's trademarks in it is wrong in every install. Straight lines,
 * rectangles and circles on a 24px grid, so the set stays crisp at 20px.
 */
function MarkNorthwind(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 22 21.5 12 16.6 2 21.5 12 2Z" />
    </svg>
  );
}

function MarkCobalt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2 22 12 12 22 2 12 12 2Zm0 5.3L7.3 12l4.7 4.7 4.7-4.7L12 7.3Z"
      />
    </svg>
  );
}

function MarkMeridian(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M3.4 9h17.2M3.4 15h17.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function MarkTessellate(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 3h8.4v8.4H3V3Z" />
      <path d="M12.6 3H21v8.4h-8.4V3Z" opacity="0.45" />
      <path d="M3 12.6h8.4V21H3v-8.4Z" opacity="0.45" />
      <path d="M12.6 12.6H21V21h-8.4v-8.4Z" />
    </svg>
  );
}

function MarkLinework(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="9" width="4" height="12" rx="2" opacity="0.45" />
      <rect x="10" y="3.5" width="4" height="17.5" rx="2" />
      <rect x="17" y="12.5" width="4" height="8.5" rx="2" opacity="0.45" />
    </svg>
  );
}

function MarkHollowCreek(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

/* One word each. Two-word names truncate to an ellipsis in the two-column
   mobile grid, and a logo row of half-names reads as broken rather than tight. */
const DEFAULT_CUSTOMERS = [
  { name: 'Northwind', mark: MarkNorthwind },
  { name: 'Cobalt', mark: MarkCobalt },
  { name: 'Meridian', mark: MarkMeridian },
  { name: 'Tessellate', mark: MarkTessellate },
  { name: 'Linework', mark: MarkLinework },
  { name: 'Hollow', mark: MarkHollowCreek },
];

const KEYFRAMES = `
@keyframes su-trust-in { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }
`;

export type TrustCenterFooterVariant = 'Badges' | 'Detailed';

export interface TrustBadge {
  id: string;
  label: string;
  scope: string;
  issued: string;
  href: string;
}

export interface CustomerMark {
  name: string;
  mark: React.ComponentType<IconProps>;
}

export interface TrustCenterFooterProps {
  brand: string;
  headline?: string;
  badges: TrustBadge[];
  /** Logos for the "deployed inside" row. Defaults to the bundled set. */
  customers?: CustomerMark[];
  customersLabel?: string;
  /** Link columns. A trust page is still a footer; without them it reads as a banner. */
  groups?: { title: string; links: { label: string; href: string }[] }[];
  requestLabel?: string;
  onRequestReport?: () => void;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: TrustCenterFooterVariant;
  className?: string;
}

export function TrustCenterFooter({
  brand,
  headline = 'Audited, documented, and available for review.',
  badges,
  customers = DEFAULT_CUSTOMERS,
  customersLabel = 'Deployed inside',
  groups = [],
  requestLabel = 'Request full report',
  onRequestReport,
  links = [],
  copyright,
  variant = 'Badges',
  className,
}: TrustCenterFooterProps) {
  const [active, setActive] = useState<string | null>(null);
  const detailed = variant === 'Detailed';
  const shown = badges.find((badge) => badge.id === active);

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[38ch]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              <IconShield className="size-3.5" />
              Trust center
            </span>
            <h2 className="mt-2.5 text-balance text-[19px] font-semibold leading-[1.25] tracking-[-0.35px]">
              {headline}
            </h2>
          </div>

          <button
            type="button"
            onClick={onRequestReport}
            className="group inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-neutral-900 px-4 text-[13px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {requestLabel}
            <IconArrowUpRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </button>
        </div>

        <ul
          className={cn(
            'mt-8 grid gap-2.5',
            detailed ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-5',
          )}
        >
          {badges.map((badge) => {
            const open = detailed || active === badge.id;
            return (
              <li key={badge.id}>
                <a
                  href={badge.href}
                  onMouseEnter={() => setActive(badge.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(badge.id)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    'flex h-full flex-col rounded-xl border px-3.5 py-3 transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 motion-reduce:transition-none',
                    'border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:-translate-y-px hover:border-black/[0.14] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]',
                    'dark:border-white/[0.09] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/[0.18]',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="text-[13px] font-medium tracking-[-0.1px]">{badge.label}</span>
                  </span>
                  {open && (
                    <span className="mt-1.5 animate-[su-trust-in_180ms_cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none">
                      <span className="block text-pretty text-[11.5px] leading-[1.5] text-neutral-500 dark:text-neutral-400">
                        {badge.scope}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] tabular-nums text-neutral-500 dark:text-neutral-400">
                        {badge.issued}
                      </span>
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {!detailed && (
          <p className="mt-3 h-4 text-[11.5px] text-neutral-500 dark:text-neutral-400">
            {shown ? shown.scope : 'Hover a certification for scope and report date.'}
          </p>
        )}

        {customers.length > 0 && (
          <div className="mt-10 border-t border-black/[0.07] pt-7 dark:border-white/[0.08]">
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              {customersLabel}
            </p>
            {/* A grid, not a wrapping flex row: six names of uneven length left a
                single orphan on the second line at most widths. */}
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {customers.map((customer) => {
                const Glyph = customer.mark;
                return (
                  <li
                    key={customer.name}
                    className="flex min-w-0 items-center gap-2.5 text-neutral-400 transition-colors duration-150 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                  >
                    <Glyph className="size-[22px] shrink-0" />
                    <span className="truncate text-[14.5px] font-semibold tracking-[-0.35px]">
                      {customer.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {groups.length > 0 && (
          <nav
            aria-label="Footer"
            className="mt-10 grid gap-8 border-t border-black/[0.07] pt-8 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
          >
            {groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
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

        <div className="mt-10 flex flex-col gap-4 border-t border-black/[0.07] pt-6 text-[12px] text-neutral-500 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default TrustCenterFooter;
