'use client';

import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  IconCheck,
  IconChevronDown,
  IconLocation,
  FooterBar,
  type FooterSocial,
} from './footer-kit';

export type RegionPickerFooterVariant = 'Popover' | 'Inline';

export interface FooterRegionOption {
  id: string;
  name: string;
  flag: string;
  locale: string;
  currency: string;
  residency: string;
  utcOffset: number;
}

export interface RegionPickerFooterProps {
  socials?: FooterSocial[];
  brand: string;
  regions: FooterRegionOption[];
  value?: string;
  onChange?: (id: string) => void;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  links?: { label: string; href: string }[];
  note?: string;
  copyright?: string;
  variant?: RegionPickerFooterVariant;
  className?: string;
}

function useLocalTime(utcOffset: number) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const shifted = new Date(now.getTime() + (utcOffset * 60 + now.getTimezoneOffset()) * 60000);
      setTime(
        `${String(shifted.getHours()).padStart(2, '0')}:${String(shifted.getMinutes()).padStart(2, '0')}`,
      );
    }
    tick();
    const timer = setInterval(tick, 20000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  return time;
}

function RegionRow({
  region,
  selected,
  onSelect,
}: {
  region: FooterRegionOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const time = useLocalTime(region.utcOffset);

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        'cursor-pointer flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
        selected
          ? 'bg-black/[0.05] dark:bg-white/[0.07]'
          : 'hover:bg-black/[0.035] dark:hover:bg-white/[0.05]',
      )}
    >
      <span aria-hidden className="text-[15px] leading-none">
        {region.flag}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
          {region.name}
        </span>
        <span className="block truncate font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400">
          {region.residency} · {region.currency}
        </span>
      </span>
      <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
        {time ?? '--:--'}
      </span>
      <IconCheck
        aria-hidden
        className={cn(
          'size-3.5 shrink-0 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
          selected
            ? 'scale-100 opacity-100 blur-0 text-neutral-900 dark:text-neutral-100'
            : 'scale-[0.25] opacity-0 blur-[4px]',
        )}
      />
    </button>
  );
}

export function RegionPickerFooter({
  socials,
  brand,
  regions,
  value,
  onChange,
  groups = [],
  links,
  note = 'Data stays in the region you choose. Switching does not migrate existing workloads.',
  copyright,
  variant = 'Popover',
  className,
}: RegionPickerFooterProps) {
  const [internal, setInternal] = useState(value ?? regions[0]?.id);
  const [open, setOpen] = useState(false);
  const selectedId = value ?? internal;
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0];
  const selectedTime = useLocalTime(selected?.utcOffset ?? 0);

  function select(id: string) {
    setInternal(id);
    onChange?.(id);
    setOpen(false);
  }

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[42ch]">
            <p className="text-[17px] font-semibold tracking-[-0.3px]">{brand}</p>
            <p className="mt-2 text-pretty text-[13px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {note}
            </p>
          </div>

          {variant === 'Inline' ? (
            <div
              role="listbox"
              aria-label="Region"
              className="w-full max-w-[380px] rounded-xl border border-black/[0.08] bg-white p-1.5 dark:border-white/[0.09] dark:bg-white/[0.03]"
            >
              {regions.map((region) => (
                <RegionRow
                  key={region.id}
                  region={region}
                  selected={region.id === selectedId}
                  onSelect={() => select(region.id)}
                />
              ))}
            </div>
          ) : (
            /* A real Popover. The hand-rolled version hard-coded its side, so it
               opened straight through the edge of the section, and its outside-
               click and Escape handling were two document listeners of our own.
               Radix flips on collision, dismisses itself, and restores focus. */
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                aria-haspopup="listbox"
                className="flex h-11 w-full max-w-[320px] cursor-pointer items-center gap-3 rounded-xl border border-black/[0.09] bg-white px-3 text-left transition-[border-color,scale] duration-150 ease-out active:scale-[0.99] hover:border-black/[0.18] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-white/[0.2]"
              >
                <IconLocation className="size-4 shrink-0 text-neutral-400" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{selected?.name}</span>
                  <span className="block truncate font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400">
                    {selected?.locale} · {selected?.currency}
                  </span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
                  {selectedTime ?? '--:--'}
                </span>
                <IconChevronDown
                  aria-hidden
                  className={cn(
                    'size-4 shrink-0 text-neutral-400 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
                    open && 'rotate-180',
                  )}
                />
              </PopoverTrigger>

              <PopoverContent
                role="listbox"
                aria-label="Region"
                align="start"
                sideOffset={8}
                className="w-[var(--radix-popover-trigger-width)] rounded-xl border-black/[0.08] p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.18)] dark:border-white/[0.1] dark:bg-[#111113] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
              >
                {regions.map((region) => (
                  <RegionRow
                    key={region.id}
                    region={region}
                    selected={region.id === selectedId}
                    onSelect={() => select(region.id)}
                  />
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>

        {groups.length > 0 && (
          <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
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

export default RegionPickerFooter;
