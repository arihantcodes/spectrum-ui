'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FooterBar, type FooterSocial } from './footer-kit';

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
  socials?: FooterSocial[];
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

/** A day's colour band. Thresholds match how status pages actually grade a day. */
function dayTone(ratio: number) {
  if (ratio >= 0.999) return 'bg-emerald-500/85';
  if (ratio >= 0.99) return 'bg-emerald-500/40';
  if (ratio >= 0.9) return 'bg-amber-400';
  return 'bg-red-500';
}

/**
 * Thirty days, one full-height bar each.
 *
 * Uptime lives between 0.98 and 1.00, so mapping it to bar *height* draws thirty
 * near-identical stubs and reads as noise — which is what this was before. Every
 * status page worth copying carries the signal in colour and keeps the bars a
 * constant height, so a bad day is a mark you can find at a glance.
 */
function UptimeBars({ service }: { service: FooterService }) {
  return (
    <span
      aria-hidden
      className="flex h-7 w-full items-stretch gap-[2px]"
      title={`${service.uptime} uptime over the last ${service.history.length} days`}
    >
      {service.history.map((ratio, index) => (
        /* flex-1 with a minimum, so thirty days fill whatever width the card
           has instead of stopping two-thirds of the way across it. */
        <span
          key={index}
          className={cn(
            'min-w-[2px] flex-1 origin-bottom rounded-[1.5px] animate-[su-status-bar_420ms_cubic-bezier(0.23,1,0.32,1)_backwards] motion-reduce:animate-none',
            dayTone(ratio),
          )}
          style={{ animationDelay: `${index * 14}ms` }}
        />
      ))}
    </span>
  );
}

export function ServiceStatusFooter({
  socials,
  brand,
  services,
  incidents = [],
  statusHref = '#',
  links,
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
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const tone = HEALTH_TONE[service.health];
              return (
                <li
                  key={service.name}
                  className="rounded-xl border border-black/[0.07] px-4 py-3.5 transition-colors duration-150 hover:border-black/[0.13] dark:border-white/[0.08] dark:hover:border-white/[0.16]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span
                        aria-hidden
                        className={cn('size-1.5 shrink-0 rounded-full', tone.dot)}
                      />
                      <span className="truncate text-[12.5px] font-medium">{service.name}</span>
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-mono text-[10.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
                      {service.uptime}
                    </span>
                  </div>
                  <div className="mt-3">
                    <UptimeBars service={service} />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.07em] text-neutral-400 dark:text-neutral-500">
                    <span>{service.history.length} days ago</span>
                    <span>{tone.label}</span>
                    <span>Today</span>
                  </div>
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

export default ServiceStatusFooter;
