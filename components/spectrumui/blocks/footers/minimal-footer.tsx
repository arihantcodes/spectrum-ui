'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { BrandLockup, FooterSocials, type FooterSocial } from './footer-kit';

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
    >
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
                /**
                 * A real Popover rather than an absolutely positioned div.
                 *
                 * The hand-rolled version had to measure the trigger against the
                 * viewport to decide whether to open up or down, and it opened on
                 * `mouseenter` — which a touch fires *before* the click, so every
                 * tap opened and immediately closed it. Radix handles the flip
                 * with collision detection, dismisses on outside click and Escape,
                 * and returns focus to the trigger, none of which the div did.
                 */
                <Popover
                  key={cluster.title}
                  open={isOpen}
                  onOpenChange={(next) => setOpen(next ? cluster.title : null)}
                >
                  <PopoverTrigger
                    /* Hover still opens it on a mouse; `pointerType` keeps that
                       off touch, where it would fight the tap. */
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setOpen(cluster.title);
                    }}
                    className={cn(
                      'h-8 cursor-pointer rounded-lg px-2.5 text-[13px] transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                      isOpen
                        ? 'bg-black/[0.05] text-neutral-950 dark:bg-white/[0.07] dark:text-neutral-50'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                    )}
                  >
                    {cluster.title}
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    sideOffset={6}
                    onOpenAutoFocus={(event) => event.preventDefault()}
                    onPointerLeave={() => setOpen(null)}
                    className="w-auto min-w-[168px] rounded-xl border-black/[0.08] p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-8px_rgba(0,0,0,0.16)] dark:border-white/[0.1] dark:bg-[#111113] dark:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.6)]"
                  >
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
                  </PopoverContent>
                </Popover>
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
