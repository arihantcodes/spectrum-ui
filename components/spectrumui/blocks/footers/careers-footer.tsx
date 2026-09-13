'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconArrowUpRight, IconLocation, FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-role-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
`;

export type CareersFooterVariant = 'Ticker' | 'List';

export interface CareersRole {
  title: string;
  department: string;
  location: string;
  type: string;
}

export interface CareersFooterProps {
  socials?: FooterSocial[];
  brand: string;
  headline?: string;
  roles: CareersRole[];
  allRolesHref?: string;
  /** Link columns. Without them a careers footer is a banner, not a footer. */
  groups?: { title: string; links: { label: string; href: string }[] }[];
  links?: { label: string; href: string }[];
  copyright?: string;
  interval?: number;
  variant?: CareersFooterVariant;
  className?: string;
}

export function CareersFooter({
  socials,
  brand,
  headline = 'We are hiring across engineering, security and sales.',
  roles,
  allRolesHref = '#',
  groups = [],
  links,
  copyright,
  interval = 3400,
  variant = 'Ticker',
  className,
}: CareersFooterProps) {
  const [department, setDepartment] = useState<string>('All');
  const [index, setIndex] = useState(0);

  const departments = useMemo(
    () => ['All', ...Array.from(new Set(roles.map((role) => role.department)))],
    [roles],
  );

  const filtered = useMemo(
    () => (department === 'All' ? roles : roles.filter((role) => role.department === department)),
    [department, roles],
  );

  useEffect(() => {
    if (variant !== 'Ticker' || filtered.length < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % filtered.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [filtered.length, interval, variant]);

  const locations = new Set(roles.map((role) => role.location)).size;
  /* Three visible rows rolling one at a time: the ticker keeps its motion, and
     the card is no longer 76px of mostly nothing. */
  const visible = filtered.length
    ? Array.from(
        { length: Math.min(3, filtered.length) },
        (_, offset) => filtered[(index + offset) % filtered.length],
      )
    : [];

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[40ch]">
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              Careers at {brand}
            </span>
            <h2 className="mt-2 text-balance text-[20px] font-semibold leading-[1.2] tracking-[-0.4px]">
              {headline}
            </h2>
          </div>
          <p className="font-mono text-[11.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
            {roles.length} open roles · {locations} locations
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {departments.map((name) => {
            const active = name === department;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setDepartment(name);
                  setIndex(0);
                }}
                className={cn(
                  'h-8 rounded-full border px-3 text-[12.5px] transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                  active
                    ? 'border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'border-black/[0.09] text-neutral-500 hover:border-black/[0.18] hover:text-neutral-900 dark:border-white/[0.1] dark:text-neutral-400 dark:hover:border-white/[0.2] dark:hover:text-neutral-100',
                )}
              >
                {name}
              </button>
            );
          })}
        </div>

        {variant === 'Ticker' ? (
          <div className="mt-5 rounded-xl border border-black/[0.08] bg-[#FAFAFA] p-2 dark:border-white/[0.09] dark:bg-white/[0.03]">
            <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.07]">
              {visible.map((role, position) => (
                <li
                  /* Keyed on the window offset and the role, so replacing the
                     oldest row re-runs its entrance while the two rows that
                     stayed put do not flicker. */
                  key={`${department}-${index}-${position}-${role.title}`}
                  className="animate-[su-role-in_320ms_cubic-bezier(0.2,0,0,1)_backwards] motion-reduce:animate-none"
                  style={{ animationDelay: `${position * 60}ms` }}
                >
                  <a
                    href={allRolesHref}
                    className="group flex items-center justify-between gap-4 rounded-lg px-2.5 py-3 transition-colors duration-150 hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.04]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-medium tracking-[-0.2px]">
                        {role.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <IconLocation className="size-3" />
                          {role.location}
                        </span>
                        <span>{role.department}</span>
                        <span className="rounded-full bg-black/[0.05] px-2 py-px font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                          {role.type}
                        </span>
                      </span>
                    </span>
                    <IconArrowUpRight className="size-4 shrink-0 text-neutral-300 transition-[color,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 motion-reduce:transition-none dark:text-neutral-700 dark:group-hover:text-neutral-100" />
                  </a>
                </li>
              ))}
              {visible.length === 0 && (
                <li className="px-2.5 py-6 text-center text-[13px] text-neutral-500 dark:text-neutral-400">
                  No open roles in this team.
                </li>
              )}
            </ul>
            <a
              href={allRolesHref}
              className="group mt-1 flex items-center justify-between rounded-lg px-2.5 py-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.04]"
            >
              View all {roles.length} roles
              <IconArrowUpRight className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        ) : (
          <ul className="mt-5 divide-y divide-black/[0.07] border-y border-black/[0.07] dark:divide-white/[0.08] dark:border-white/[0.08]">
            {filtered.map((role, position) => (
              <li
                key={role.title}
                className="animate-[su-role-in_260ms_cubic-bezier(0.23,1,0.32,1)_backwards] motion-reduce:animate-none"
                style={{ animationDelay: `${position * 34}ms` }}
              >
                <a
                  href={allRolesHref}
                  className="group flex items-center justify-between gap-4 py-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium">{role.title}</span>
                    <span className="mt-0.5 block text-[11.5px] text-neutral-500 dark:text-neutral-400">
                      {role.department} · {role.location} · {role.type}
                    </span>
                  </span>
                  <IconArrowUpRight className="size-4 shrink-0 text-neutral-300 transition-[color,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 motion-reduce:transition-none dark:text-neutral-700 dark:group-hover:text-neutral-100" />
                </a>
              </li>
            ))}
          </ul>
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

export default CareersFooter;
