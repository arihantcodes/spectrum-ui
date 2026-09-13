'use client';

import { useId, useState, type CSSProperties, type SVGProps } from 'react';
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

function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(6, 7)"
        d="M4.869,9.63078422 C4.811,9.57428154 4.563,9.36093522 4.359,9.16220166 C3.076,7.99707745 0.976,4.95762299 0.335,3.36678032 C0.232,3.12518266 0.014,2.51436922 0,2.18801754 C0,1.87530443 0.072,1.57720409 0.218,1.29274233 C0.422,0.938139308 0.743,0.653677545 1.122,0.497808086 C1.385,0.397467121 2.172,0.241597662 2.186,0.241597662 C3.047,0.0857282026 4.446,0 5.992,0 C7.465,0 8.807,0.0857282026 9.681,0.213346322 C9.695,0.227959084 10.673,0.383828544 11.008,0.554310765 C11.62,0.867023868 12,1.47783731 12,2.13151486 L12,2.18801754 C11.985,2.613736 11.605,3.5090112 11.591,3.5090112 C10.949,5.01412567 8.952,7.98343887 7.625,9.17681442 C7.625,9.17681442 7.284,9.51290794 7.071,9.65903556 C6.765,9.88699464 6.386,10 6.007,10 C5.584,10 5.19,9.87238188 4.869,9.63078422"
      />
    </svg>
  );
}

function IconLocation(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3.5, 2)"
        d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z"
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-footer-panel { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: none } }
@keyframes su-footer-rise { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }

/* Columns resolve left to right as the footer scrolls into the page, on a view()
   timeline rather than on mount — a footer's entrance has to fire when you
   arrive at it, and a mount animation is over before you get there. The stagger
   is a shifted animation-range per column, since animation-delay does nothing on
   a scroll timeline.

   The links are never gated on this. Without scroll-driven animation support the
   rule does not apply at all and the server-rendered resting state is what shows;
   with it, \`entry\` is guaranteed to reach 100% for anything at the end of a
   document, so the columns cannot be stranded part-way through the fade. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .su-sitemap-column {
      animation: su-footer-rise linear both;
      animation-timeline: view();
      animation-range: entry var(--su-from) entry calc(var(--su-from) + 48%);
    }
  }
}
`;

export type MegaSitemapFooterVariant = 'Expanded' | 'Compact';

export interface MegaSitemapLink {
  label: string;
  href: string;
  badge?: string;
}

export interface MegaSitemapGroup {
  title: string;
  links: MegaSitemapLink[];
  seeAll?: { label: string; href: string };
}

export interface MegaSitemapColumn {
  groups: MegaSitemapGroup[];
}

export interface MegaSitemapSocial {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface MegaSitemapFooterProps {
  brand: string;
  tagline?: string;
  columns: MegaSitemapColumn[];
  legal?: { label: string; href: string }[];
  socials?: MegaSitemapSocial[];
  regions?: string[];
  languages?: string[];
  newsletter?: { eyebrow: string; blurb: string; cta: string };
  onSubscribe?: () => void;
  copyright?: string;
  variant?: MegaSitemapFooterVariant;
  className?: string;
}

function GroupBlock({ group, compact }: { group: MegaSitemapGroup; compact: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
        {group.title}
      </p>
      <ul className={cn('mt-3.5 space-y-2', compact && 'mt-3 space-y-1.5')}>
        {group.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group/link text-[13.5px] leading-[1.5] text-neutral-800 transition-colors duration-150 hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-200 dark:hover:text-white"
            >
              <span className="relative">
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:scale-x-100 motion-reduce:transition-none"
                />
              </span>
              {link.badge && (
                <span className="ml-1.5 inline-block whitespace-nowrap rounded-full bg-black/[0.05] px-1.5 py-px align-[0.06em] font-mono text-[9.5px] uppercase tracking-[0.06em] tabular-nums text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                  {link.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {group.seeAll && (
        <a
          href={group.seeAll.href}
          className="group mt-3.5 inline-flex items-center gap-1 text-[12.5px] font-medium text-neutral-900 transition-colors duration-150 hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-100"
        >
          {group.seeAll.label}
          <IconArrowRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </a>
      )}
    </div>
  );
}

function AccordionGroup({ group, index }: { group: MegaSitemapGroup; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `${useId()}-panel`;

  return (
    <div className="border-b border-black/[0.07] dark:border-white/[0.08]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group/acc flex h-12 w-full items-center justify-between text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.09em] text-neutral-600 transition-colors duration-150 group-hover/acc:text-neutral-950 dark:text-neutral-300 dark:group-hover/acc:text-neutral-50">
          {group.title}
        </span>
        <IconChevronDown
          className={cn(
            'size-4 text-neutral-500 transition-[transform,color] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/acc:text-neutral-800 motion-reduce:transition-none dark:group-hover/acc:text-neutral-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <ul
          id={panelId}
          className="animate-[su-footer-panel_200ms_cubic-bezier(0.23,1,0.32,1)] space-y-2.5 pb-4 motion-reduce:animate-none"
        >
          {group.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[13.5px] text-neutral-800 transition-colors duration-150 hover:text-black dark:text-neutral-200 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Selector({
  label,
  options,
  icon,
}: {
  label: string;
  options: string[];
  icon?: React.ReactNode;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="group relative inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.1] pl-2.5 pr-6 transition-colors duration-150 hover:border-black/[0.2] focus-within:border-black/[0.28] dark:border-white/[0.12] dark:hover:border-white/[0.24] dark:focus-within:border-white/[0.32]"
    >
      <span className="sr-only">{label}</span>
      {icon}
      <select
        id={id}
        className="cursor-pointer appearance-none bg-transparent font-mono text-[11px] uppercase tracking-[0.06em] text-neutral-700 focus:outline-hidden dark:text-neutral-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <IconChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2 size-3 text-neutral-500 transition-transform duration-150 group-hover:translate-y-px dark:text-neutral-400"
      />
    </label>
  );
}

export function MegaSitemapFooter({
  brand,
  tagline,
  columns,
  legal = [],
  socials = [],
  regions = ['United States'],
  languages = ['English'],
  newsletter,
  onSubscribe,
  copyright,
  variant = 'Expanded',
  className,
}: MegaSitemapFooterProps) {
  const compact = variant === 'Compact';
  const flatGroups = columns.flatMap((column) => column.groups);

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className={cn('mx-auto w-full max-w-[1180px] px-6', compact ? 'pt-9' : 'pt-12')}>
        {!compact && (
          <div className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[19px] font-semibold tracking-[-0.4px]">{brand}</p>
              {tagline && (
                <p className="mt-2 max-w-[42ch] text-pretty text-[13.5px] leading-[1.6] text-neutral-600 dark:text-neutral-300">
                  {tagline}
                </p>
              )}
            </div>

            {newsletter && (
              <div className="lg:max-w-[360px]">
                <p className="flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                  <span
                    aria-hidden
                    className="size-2 rounded-[2px] bg-[#f9452d] dark:bg-[#E1F435]"
                  />
                  {newsletter.eyebrow}
                </p>
                <p className="mt-2.5 text-pretty text-[13px] leading-[1.6] text-neutral-600 dark:text-neutral-300">
                  {newsletter.blurb}
                </p>
                <button
                  type="button"
                  onClick={onSubscribe}
                  className="mt-3.5 inline-flex h-9 items-center rounded-lg bg-neutral-900 px-4 text-[13px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {newsletter.cta}
                </button>
              </div>
            )}
          </div>
        )}

        <nav aria-label="Footer" className="hidden lg:block">
          <div
            className={cn(
              'grid gap-x-8',
              columns.length >= 5
                ? 'grid-cols-5'
                : columns.length === 4
                  ? 'grid-cols-4'
                  : 'grid-cols-3',
            )}
          >
            {columns.map((column, index) => (
              <div
                key={index}
                className={cn(
                  'su-sitemap-column border-t border-black/[0.09] pt-5 dark:border-white/[0.1]',
                  compact ? 'space-y-6' : 'space-y-8',
                )}
                style={{ '--su-from': `${index * 7}%` } as CSSProperties}
              >
                {column.groups.map((group) => (
                  <GroupBlock key={group.title} group={group} compact={compact} />
                ))}
              </div>
            ))}
          </div>
        </nav>

        <nav aria-label="Footer" className="lg:hidden">
          {flatGroups.map((group, index) => (
            <AccordionGroup key={group.title} group={group} index={index} />
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-5 border-t border-black/[0.07] py-6 dark:border-white/[0.08] lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
            <span className="tabular-nums">{copyright ?? `© ${brand}`}</span>
            {legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-x-3 gap-y-3 max-sm:flex-wrap">
            {socials.length > 0 && (
              <ul className="flex items-center gap-1">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-8 place-items-center rounded-lg text-neutral-500 transition-[color,background-color] duration-150 hover:bg-black/[0.05] hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/[0.07] dark:hover:text-neutral-100"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <Selector
              label="Region"
              options={regions}
              icon={
                <IconLocation
                  aria-hidden
                  className="size-3.5 shrink-0 text-neutral-500 dark:text-neutral-400"
                />
              }
            />
            <Selector label="Language" options={languages} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MegaSitemapFooter;
