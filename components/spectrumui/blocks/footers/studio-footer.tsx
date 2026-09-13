'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-studio-now { from { opacity: 0; transform: translateY(5px) } to { opacity: 1; transform: none } }
@keyframes su-studio-beat { 0%, 100% { transform: scaleY(0.35) } 50% { transform: scaleY(1) } }
`;

export type StudioFooterVariant = 'Studio' | 'Quiet';

export interface StudioAccent {
  id: string;
  label: string;
  hex: string;
}

export interface StudioFooterProps {
  brand: string;
  blurb?: string;
  accents: StudioAccent[];
  now?: string[];
  columns?: { title: string; links: { label: string; href: string }[] }[];
  socials?: { label: string; href: string; handle?: string }[];
  utcOffset?: number;
  onAccentChange?: (accent: StudioAccent) => void;
  copyright?: string;
  variant?: StudioFooterVariant;
  className?: string;
}

export function StudioFooter({
  brand,
  blurb = 'Three people, one product, shipped from a converted print shop.',
  accents,
  now = [],
  columns = [],
  socials = [],
  utcOffset = -7,
  onAccentChange,
  copyright,
  variant = 'Studio',
  className,
}: StudioFooterProps) {
  const [accentId, setAccentId] = useState(accents[0]?.id);
  const [nowIndex, setNowIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);

  const accent = accents.find((entry) => entry.id === accentId) ?? accents[0];

  useEffect(() => {
    function tick() {
      const current = new Date();
      const shifted = new Date(
        current.getTime() + (utcOffset * 60 + current.getTimezoneOffset()) * 60000,
      );
      setTime(
        `${String(shifted.getHours()).padStart(2, '0')}:${String(shifted.getMinutes()).padStart(2, '0')}`,
      );
    }
    tick();
    const timer = setInterval(tick, 15000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  useEffect(() => {
    if (now.length < 2) return;
    const timer = setInterval(() => setNowIndex((current) => (current + 1) % now.length), 3800);
    return () => clearInterval(timer);
  }, [now.length]);

  const showcase = variant === 'Studio';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
      style={{ ['--su-accent' as string]: accent?.hex }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.3px]">
              <span
                aria-hidden
                className="size-2.5 rounded-[4px] transition-colors duration-300 ease-out"
                style={{ backgroundColor: 'var(--su-accent)' }}
              />
              {brand}
            </p>
            <p className="mt-2.5 max-w-[36ch] text-pretty text-[13.5px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {blurb}
            </p>

            {showcase && now.length > 0 && (
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] py-1.5 pl-2.5 pr-3.5 dark:border-white/[0.1]">
                <span aria-hidden className="flex h-3 items-end gap-[2px]">
                  {[0, 1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className="w-[2px] origin-bottom rounded-full animate-[su-studio-beat_1.05s_ease-in-out_infinite] motion-reduce:!animate-none motion-reduce:!scale-y-50"
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--su-accent)',
                        animationDelay: `${bar * 130}ms`,
                      }}
                    />
                  ))}
                </span>
                <span
                  key={nowIndex}
                  className="animate-[su-studio-now_260ms_cubic-bezier(0.23,1,0.32,1)] text-[12.5px] text-neutral-600 motion-reduce:animate-none dark:text-neutral-300"
                >
                  {now[nowIndex]}
                </span>
              </div>
            )}

            <div className="mt-6">
              <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                Accent
              </p>
              <div role="radiogroup" aria-label="Accent colour" className="mt-2.5 flex gap-2">
                {accents.map((entry) => {
                  const active = entry.id === accentId;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={entry.label}
                      onClick={() => {
                        setAccentId(entry.id);
                        onAccentChange?.(entry);
                      }}
                      className={cn(
                        'grid size-8 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'block rounded-full transition-[width,height,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
                          active ? 'size-6' : 'size-4',
                        )}
                        style={{
                          backgroundColor: entry.hex,
                          boxShadow: active ? `0 0 0 2px ${entry.hex}33` : undefined,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
                      >
                        <span
                          aria-hidden
                          className="size-1 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                          style={{ backgroundColor: 'var(--su-accent)' }}
                        />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.07] pt-6 text-[12px] text-neutral-500 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums">
            <span>{copyright ?? `© ${brand}. All rights reserved.`}</span>
            {time && (
              <span className="font-mono text-neutral-500 dark:text-neutral-400">{time} PT</span>
            )}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {social.handle ?? social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default StudioFooter;
