'use client';

import { useEffect, useRef, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72123 18.1441C8.36923 18.1441 8.04323 17.9591 7.86223 17.6561C6.94423 16.1161 5.76323 14.7311 4.35423 13.5401C3.93223 13.1831 3.88023 12.5521 4.23623 12.1301C4.59323 11.7071 5.22323 11.6551 5.64523 12.0121C6.78923 12.9791 7.80023 14.0621 8.66223 15.2441C10.2992 12.5971 13.5172 8.40012 18.5642 5.95512C19.0612 5.71612 19.6592 5.92112 19.9002 6.41912C20.1402 6.91612 19.9332 7.51412 19.4362 7.75512C13.8602 10.4561 10.7022 15.5491 9.60423 17.6141C9.43423 17.9321 9.10623 18.1351 8.74523 18.1441H8.72123Z"
      />
    </svg>
  );
}

function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(6, 7)"
        d="M4.869,9.63078422 C4.811,9.57428154 4.563,9.36093522 4.359,9.16220166 C3.076,7.99707745 0.976,4.95762299 0.335,3.36678032 C0.232,3.12518266 0.014,2.51436922 0,2.18801754 C0,1.87530443 0.072,1.57720409 0.218,1.29274233 C0.422,0.938139308 0.743,0.653677545 1.122,0.497808086 C1.385,0.397467121 2.172,0.241597662 2.186,0.241597662 C3.047,0.0857282026 4.446,0 5.992,0 C7.465,0 8.807,0.0857282026 9.681,0.213346322 C9.695,0.227959084 10.673,0.383828544 11.008,0.554310765 C11.62,0.867023868 12,1.47783731 12,2.13151486 L12,2.18801754 C11.985,2.613736 11.605,3.5090112 11.591,3.5090112 C10.949,5.01412567 8.952,7.98343887 7.625,9.17681442 C7.625,9.17681442 7.284,9.51290794 7.071,9.65903556 C6.765,9.88699464 6.386,10 6.007,10 C5.584,10 5.19,9.87238188 4.869,9.63078422"
      />
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
@keyframes su-region-pop { from { opacity: 0; transform: translateY(6px) scale(0.98) } to { opacity: 1; transform: none } }
`;

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
        'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
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
  brand,
  regions,
  value,
  onChange,
  groups = [],
  links = [],
  note = 'Data stays in the region you choose. Switching does not migrate existing workloads.',
  copyright,
  variant = 'Popover',
  className,
}: RegionPickerFooterProps) {
  const [internal, setInternal] = useState(value ?? regions[0]?.id);
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const selectedId = value ?? internal;
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0];
  const selectedTime = useLocalTime(selected?.utcOffset ?? 0);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

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
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

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
            <div ref={wrapper} className="relative w-full max-w-[320px]">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="flex h-11 w-full items-center gap-3 rounded-xl border border-black/[0.09] bg-white px-3 text-left transition-[border-color,scale] duration-150 ease-out active:scale-[0.99] hover:border-black/[0.18] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-white/[0.2]"
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
              </button>

              {open && (
                <div
                  role="listbox"
                  aria-label="Region"
                  className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-full animate-[su-region-pop_180ms_cubic-bezier(0.23,1,0.32,1)] rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.18)] motion-reduce:animate-none dark:border-white/[0.1] dark:bg-[#111113] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
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
              )}
            </div>
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

export default RegionPickerFooter;
