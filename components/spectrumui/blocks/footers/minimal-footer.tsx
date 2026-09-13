'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BrandLockup, FooterSocials, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-min-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type MinimalFooterVariant = 'Bar' | 'Centered';

export interface MinimalFooterCluster {
  title: string;
  links: { label: string; href: string }[];
}

export interface MinimalFooterProps {
  brand: string;
  socials?: FooterSocial[];
  clusters: MinimalFooterCluster[];
  status?: string;
  copyright?: string;
  variant?: MinimalFooterVariant;
  className?: string;
}

export function MinimalFooter({
  brand,
  socials,
  clusters,
  status = 'All systems normal',
  copyright,
  variant = 'Bar',
  className,
}: MinimalFooterProps) {
  const [open, setOpen] = useState<string | null>(null);
  const centered = variant === 'Centered';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-7">
        <div
          className={cn(
            'flex flex-wrap items-center gap-x-6 gap-y-3',
            centered ? 'justify-center' : 'justify-between',
          )}
        >
          <div
            className={cn('flex items-center gap-3', centered && 'order-2 w-full justify-center')}
          >
            <BrandLockup brand={brand} />
            <span className="text-[12px] tabular-nums text-neutral-500 dark:text-neutral-400">
              {copyright ?? `© ${brand}`}
            </span>
          </div>

          <nav
            aria-label="Footer"
            className={cn(
              'flex flex-wrap items-center gap-x-1 gap-y-1',
              centered && 'order-1 justify-center',
            )}
          >
            {clusters.map((cluster) => {
              const isOpen = open === cluster.title;
              return (
                <div
                  key={cluster.title}
                  onMouseEnter={() => setOpen(cluster.title)}
                  className="relative"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : cluster.title)}
                    onFocus={() => setOpen(cluster.title)}
                    className={cn(
                      'h-8 rounded-lg px-2.5 text-[13px] transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                      isOpen
                        ? 'bg-black/[0.05] text-neutral-950 dark:bg-white/[0.07] dark:text-neutral-50'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                    )}
                  >
                    {cluster.title}
                  </button>

                  {isOpen && (
                    <div className="absolute bottom-[calc(100%+6px)] left-0 z-20 min-w-[168px] animate-[su-min-in_160ms_cubic-bezier(0.23,1,0.32,1)] rounded-xl border border-black/[0.08] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-8px_rgba(0,0,0,0.16)] motion-reduce:animate-none dark:border-white/[0.1] dark:bg-[#111113] dark:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.6)]">
                      <ul>
                        {cluster.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="block rounded-lg px-2.5 py-1.5 text-[13px] text-neutral-600 transition-colors duration-150 hover:bg-black/[0.04] hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/[0.05] dark:hover:text-neutral-50"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className={cn('flex items-center gap-4', centered && 'order-3')}>
            {status && (
              <span className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 dark:text-neutral-400">
                <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
                {status}
              </span>
            )}
            <FooterSocials socials={socials} className="-mr-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MinimalFooter;
