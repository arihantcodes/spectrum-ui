'use client';

import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-model-bar { from { transform: scaleX(0) } to { transform: none } }
@keyframes su-model-ping { 0% { opacity: 0.5; transform: scale(0.6) } 70%, 100% { opacity: 0; transform: scale(2.2) } }
`;

export type ModelStatusFooterVariant = 'Grid' | 'Row';
export type ModelHealth = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface FooterModel {
  id: string;
  name: string;
  context: string;
  latencyMs: number;
  health: ModelHealth;
  tier: string;
}

export interface ModelStatusFooterProps {
  brand: string;
  models: FooterModel[];
  region?: string;
  groups?: { title: string; links: { label: string; href: string; badge?: string }[] }[];
  docsHref?: string;
  copyright?: string;
  variant?: ModelStatusFooterVariant;
  className?: string;
}

const HEALTH_DOT: Record<ModelHealth, string> = {
  operational: 'bg-emerald-500',
  degraded: 'bg-amber-500',
  outage: 'bg-red-500',
  maintenance: 'bg-sky-500',
};

export function ModelStatusFooter({
  brand,
  models,
  region = 'us-east · eu-central · ap-northeast',
  groups = [],
  docsHref = '#',
  copyright,
  variant = 'Grid',
  className,
}: ModelStatusFooterProps) {
  const slowest = Math.max(...models.map((model) => model.latencyMs), 1);

  return (
    <footer
      className={cn('w-full border-t border-white/[0.08] bg-[#0A0A0B] text-neutral-100', className)}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-400">
              Model availability
            </span>
            <p className="mt-1.5 text-[19px] font-semibold tracking-[-0.35px]">{brand} API</p>
          </div>
          <p className="font-mono text-[11px] text-neutral-400">{region}</p>
        </div>

        <ul
          className={cn(
            'mt-6 grid gap-2',
            variant === 'Grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'gap-1.5',
          )}
        >
          {models.map((model) => (
            <li
              key={model.id}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 transition-colors duration-200 hover:border-white/[0.16]"
            >
              <span className="relative grid size-2 shrink-0 place-items-center">
                {model.health === 'operational' && (
                  <span
                    aria-hidden
                    className="absolute size-2 rounded-full bg-emerald-500 animate-[su-model-ping_2.6s_cubic-bezier(0.23,1,0.32,1)_infinite] motion-reduce:animate-none"
                  />
                )}
                <span aria-hidden className={cn('size-2 rounded-full', HEALTH_DOT[model.health])} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="truncate font-mono text-[12.5px] text-neutral-100">
                    {model.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-400">
                    {model.tier}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-1.5 block h-[3px] overflow-hidden rounded-full bg-white/[0.07]"
                >
                  <span
                    className={cn(
                      'block h-full origin-left rounded-full animate-[su-model-bar_640ms_cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none',
                      model.health === 'degraded' ? 'bg-amber-500/80' : 'bg-neutral-400/70',
                    )}
                    style={{ width: `${Math.max(6, (model.latencyMs / slowest) * 100)}%` }}
                  />
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block font-mono text-[12px] tabular-nums text-neutral-300">
                  {model.latencyMs}ms
                </span>
                <span className="block font-mono text-[10px] tabular-nums text-neutral-400">
                  {model.context} ctx
                </span>
              </span>
            </li>
          ))}
        </ul>

        {groups.length > 0 && (
          <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[13px] font-medium text-neutral-50">{group.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-[13.5px] text-neutral-400 transition-colors duration-150 hover:text-neutral-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="rounded-full bg-white/[0.08] px-1.5 py-px font-mono text-[9.5px] uppercase tracking-[0.06em] text-neutral-300">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-[12px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">{copyright ?? `© ${brand} AI. All rights reserved.`}</p>
          <a
            href={docsHref}
            className="font-mono transition-colors duration-150 hover:text-neutral-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            docs.{brand.toLowerCase()}.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default ModelStatusFooter;
