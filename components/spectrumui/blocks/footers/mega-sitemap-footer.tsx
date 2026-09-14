'use client';

import { useId, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import {
  IconArrowRight,
  IconChevronDown,
  IconLocation,
  BrandLockup,
  FooterSocials,
  type FooterSocial,
} from './footer-kit';

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

export interface MegaSitemapFooterProps {
  brand: string;
  tagline?: string;
  columns: MegaSitemapColumn[];
  legal?: { label: string; href: string }[];
  socials?: FooterSocial[];
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
  socials,
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
          {/* Two groups, not one wrapping row. Mono-caps legal links beside a
              sans lockup mixed two registers in one line, and the last link
              orphaned onto a second line under the mark. */}
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <BrandLockup brand={brand} />
              <span className="text-[12px] tabular-nums text-neutral-500 dark:text-neutral-400">
                {copyright ?? `© ${brand}`}
              </span>
            </div>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-neutral-500 dark:text-neutral-400">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <FooterSocials socials={socials} />
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
