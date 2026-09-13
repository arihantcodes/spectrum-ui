'use client';

import { useEffect, useMemo, useState, type SVGProps } from 'react';
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
  brand: string;
  headline?: string;
  roles: CareersRole[];
  allRolesHref?: string;
  links?: { label: string; href: string }[];
  copyright?: string;
  interval?: number;
  variant?: CareersFooterVariant;
  className?: string;
}

export function CareersFooter({
  brand,
  headline = 'We are hiring across engineering, security and sales.',
  roles,
  allRolesHref = '#',
  links = [],
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
  const current = filtered[Math.min(index, Math.max(0, filtered.length - 1))];

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
          <a
            href={allRolesHref}
            className="group mt-5 flex min-h-[76px] items-center justify-between gap-4 rounded-xl border border-black/[0.08] bg-[#FAFAFA] px-4 py-3.5 transition-colors duration-200 hover:border-black/[0.16] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.09] dark:bg-white/[0.03] dark:hover:border-white/[0.2]"
          >
            <span
              key={`${department}-${index}`}
              className="min-w-0 animate-[su-role-in_300ms_cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none"
            >
              <span className="block truncate text-[15px] font-medium tracking-[-0.2px]">
                {current?.title ?? 'No open roles in this team'}
              </span>
              {current && (
                <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <IconLocation className="size-3" />
                    {current.location}
                  </span>
                  <span>{current.department}</span>
                  <span className="rounded-full bg-black/[0.05] px-2 py-px font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                    {current.type}
                  </span>
                </span>
              )}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium">
              View all
              <IconArrowUpRight className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </a>
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

export default CareersFooter;
