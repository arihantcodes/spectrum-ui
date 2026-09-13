'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-status-pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.35; transform: scale(0.82) } }
@keyframes su-status-bar { from { transform: scaleY(0.15) } to { transform: none } }
@keyframes su-ticker-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type ServiceStatusFooterVariant = 'Grid' | 'Bar';
export type ServiceHealth = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface FooterService {
  name: string;
  health: ServiceHealth;
  history: number[];
  uptime: string;
}

export interface ServiceStatusFooterProps {
  brand: string;
  services: FooterService[];
  incidents?: string[];
  statusHref?: string;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: ServiceStatusFooterVariant;
  className?: string;
}

const HEALTH_TONE: Record<ServiceHealth, { dot: string; bar: string; label: string }> = {
  operational: { dot: 'bg-emerald-500', bar: 'bg-emerald-500/70', label: 'Operational' },
  degraded: { dot: 'bg-amber-500', bar: 'bg-amber-500/70', label: 'Degraded' },
  outage: { dot: 'bg-red-500', bar: 'bg-red-500/70', label: 'Outage' },
  maintenance: { dot: 'bg-sky-500', bar: 'bg-sky-500/70', label: 'Maintenance' },
};

const SEVERITY: Record<ServiceHealth, number> = {
  outage: 3,
  degraded: 2,
  maintenance: 1,
  operational: 0,
};

function Sparkline({ service }: { service: FooterService }) {
  const tone = HEALTH_TONE[service.health];
  return (
    <span aria-hidden className="flex h-6 items-end gap-[3px]">
      {service.history.map((ratio, index) => (
        <span
          key={index}
          className={cn(
            'w-[3px] origin-bottom rounded-[1px] animate-[su-status-bar_420ms_cubic-bezier(0.23,1,0.32,1)_backwards] motion-reduce:animate-none',
            ratio >= 0.995 ? 'bg-black/[0.13] dark:bg-white/[0.16]' : tone.bar,
          )}
          style={{
            height: `${Math.max(12, ratio * 100)}%`,
            animationDelay: `${index * 28}ms`,
          }}
        />
      ))}
    </span>
  );
}

export function ServiceStatusFooter({
  brand,
  services,
  incidents = [],
  statusHref = '#',
  links = [],
  copyright,
  variant = 'Grid',
  className,
}: ServiceStatusFooterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (incidents.length < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % incidents.length), 4200);
    return () => clearInterval(timer);
  }, [incidents.length]);

  const worst = services.reduce<ServiceHealth>(
    (acc, service) => (SEVERITY[service.health] > SEVERITY[acc] ? service.health : acc),
    'operational',
  );
  const summary = HEALTH_TONE[worst];
  const allClear = worst === 'operational';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={statusHref}
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-black/[0.09] py-1.5 pl-2.5 pr-3.5 transition-colors duration-200 hover:border-black/[0.18] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:hover:border-white/[0.2]"
          >
            <span className="relative grid size-2.5 shrink-0 place-items-center">
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 rounded-full animate-[su-status-pulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none',
                  summary.dot,
                )}
              />
              <span aria-hidden className={cn('size-1.5 rounded-full', summary.dot)} />
            </span>
            <span className="text-[12.5px] font-medium tracking-[-0.1px]">
              {allClear ? 'All systems operational' : `${summary.label} — see status`}
            </span>
            <span className="hidden font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 sm:inline">
              status.{brand.toLowerCase()}.com
            </span>
          </a>

          {incidents.length > 0 && (
            <p
              key={index}
              className="animate-[su-ticker-in_320ms_cubic-bezier(0.23,1,0.32,1)] truncate text-[12px] text-neutral-500 motion-reduce:animate-none dark:text-neutral-400"
            >
              {incidents[index]}
            </p>
          )}
        </div>

        {variant === 'Grid' ? (
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const tone = HEALTH_TONE[service.health];
              return (
                <li
                  key={service.name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-black/[0.07] px-3.5 py-3 transition-colors duration-150 hover:border-black/[0.13] dark:border-white/[0.08] dark:hover:border-white/[0.16]"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={cn('size-1.5 shrink-0 rounded-full', tone.dot)}
                      />
                      <span className="truncate text-[12.5px] font-medium">{service.name}</span>
                    </span>
                    <span className="mt-0.5 block whitespace-nowrap font-mono text-[10.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
                      {service.uptime} · 90d
                    </span>
                  </span>
                  <Sparkline service={service} />
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
            {services.map((service) => {
              const tone = HEALTH_TONE[service.health];
              return (
                <li
                  key={service.name}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] py-1.5 pl-2.5 pr-3 transition-colors duration-150 hover:border-black/[0.13] dark:border-white/[0.08] dark:hover:border-white/[0.16]"
                >
                  <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', tone.dot)} />
                  <span className="whitespace-nowrap text-[12.5px] font-medium">
                    {service.name}
                  </span>
                  <span className="whitespace-nowrap font-mono text-[10.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
                    {service.uptime}
                  </span>
                </li>
              );
            })}
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

export default ServiceStatusFooter;
