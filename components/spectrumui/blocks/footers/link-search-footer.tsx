'use client';

import { useId, useMemo, useRef, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconEnter(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2.5, 2)"
        d="M4.79052152,10.7699 L0.78150457,10.7699 C0.35522935,10.7699 -1.01696429e-13,10.4299 -1.01696429e-13,9.9999 C-1.01696429e-13,9.5799 0.35522935,9.2299 0.78150457,9.2299 L0.78150457,9.2299 L4.79052152,9.2299 L4.790826,4.45 C4.790826,2 6.85611292,0 9.3860894,0 L9.3860894,0 L14.4253895,0 C16.9450395,0 19,2 19,4.44 L19,4.44 L19,15.56 C19,18.01 16.9450395,20 14.4047366,20 L14.4047366,20 L9.37576296,20 C6.85611292,20 4.790826,18.01 4.790826,15.57 L4.790826,15.57 L4.790826,10.77 L11.1932154,10.77 L9.54098591,12.37 C9.23119288,12.67 9.23119288,13.16 9.54098591,13.46 C9.69588243,13.61 9.90241112,13.68 10.1089398,13.68 C10.3051421,13.68 10.5116708,13.61 10.6665673,13.46 L10.6665673,13.46 L13.6818862,10.55 C13.8367827,10.41 13.9193942,10.21 13.9193942,10 C13.9193942,9.8 13.8367827,9.6 13.6818862,9.46 L13.6818862,9.46 L10.6665673,6.55 C10.3567742,6.25 9.85077895,6.25 9.54098591,6.55 C9.23119288,6.85 9.23119288,7.34 9.54098591,7.64 L9.54098591,7.64 L11.1932154,9.23 L4.790826,9.23 L4.79052152,10.7699 Z"
      />
    </svg>
  );
}

function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 2)"
        d="M15.6207067,15.6542822 C16.0072308,15.270377 16.6268293,15.270377 17.0133534,15.6542822 L17.0133534,15.6542822 L19.5680176,17.7164156 L19.6123694,17.7164156 C20.1292102,18.2388171 20.1292102,19.0857973 19.6123694,19.6081989 C19.0955285,20.1306004 18.2575639,20.1306004 17.7407231,19.6081989 L17.7407231,19.6081989 L15.6207067,17.1784678 L15.5402577,17.0876967 C15.390397,16.8980019 15.3076306,16.6615115 15.3076306,16.416375 C15.3076306,16.1303824 15.4202849,15.8561581 15.6207067,15.6542822 Z M8.57763961,-7.10542736e-15 C10.8525711,-7.10542736e-15 13.0343273,0.913436016 14.6429467,2.53936255 C16.2515662,4.16528909 17.1552792,6.37051871 17.1552792,8.66992606 C17.1552792,13.458194 13.3149392,17.3398521 8.57763961,17.3398521 C3.84034006,17.3398521 2.13162821e-14,13.458194 2.13162821e-14,8.66992606 C2.13162821e-14,3.88165812 3.84034006,-7.10542736e-15 8.57763961,-7.10542736e-15 Z"
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-link-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type LinkSearchFooterVariant = 'Search' | 'Browse';

export interface LinkSearchGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface LinkSearchFooterProps {
  brand: string;
  groups: LinkSearchGroup[];
  placeholder?: string;
  emptyLabel?: string;
  copyright?: string;
  variant?: LinkSearchFooterVariant;
  className?: string;
}

interface FlatLink {
  label: string;
  href: string;
  group: string;
}

function highlight(label: string, query: string) {
  if (!query) return label;
  const at = label.toLowerCase().indexOf(query.toLowerCase());
  if (at === -1) return label;
  return (
    <>
      {label.slice(0, at)}
      <mark className="bg-transparent font-medium text-neutral-950 underline decoration-black/25 underline-offset-[3px] dark:text-neutral-50 dark:decoration-white/30">
        {label.slice(at, at + query.length)}
      </mark>
      {label.slice(at + query.length)}
    </>
  );
}

export function LinkSearchFooter({
  brand,
  groups,
  placeholder = 'Search every page…',
  emptyLabel = 'Nothing matches. Try a product name.',
  copyright,
  variant = 'Search',
  className,
}: LinkSearchFooterProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const flat = useMemo<FlatLink[]>(
    () => groups.flatMap((group) => group.links.map((link) => ({ ...link, group: group.title }))),
    [groups],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return flat
      .filter(
        (link) =>
          link.label.toLowerCase().includes(needle) || link.group.toLowerCase().includes(needle),
      )
      .slice(0, 7);
  }, [flat, query]);

  const searching = variant === 'Search' && query.trim().length > 0;

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((current) => (current + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((current) => (current - 1 + results.length) % results.length);
    } else if (event.key === 'Escape') {
      setQuery('');
      setCursor(0);
    }
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.3px]">{brand}</p>
            <p className="mt-2 text-[13px] text-neutral-500 dark:text-neutral-400">
              {flat.length} pages across {groups.length} sections.
            </p>
          </div>

          <div className="w-full max-w-[420px]">
            <div
              className="group flex h-11 items-center gap-2.5 rounded-xl border border-black/[0.09] bg-white px-3.5 transition-colors duration-150 focus-within:border-black/[0.25] hover:border-black/[0.16] dark:border-white/[0.1] dark:bg-white/[0.03] dark:focus-within:border-white/[0.3] dark:hover:border-white/[0.18]"
              onClick={() => inputRef.current?.focus()}
            >
              <IconSearch className="size-4 shrink-0 text-neutral-400" />
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-expanded={searching}
                aria-controls={listId}
                aria-label="Search footer links"
                value={query}
                placeholder={placeholder}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                className="min-w-0 flex-1 bg-transparent text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden dark:text-neutral-100 dark:placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:appearance-none"
              />
              <kbd className="hidden shrink-0 rounded-md border border-black/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 dark:border-white/[0.1] dark:text-neutral-600 sm:block">
                /
              </kbd>
            </div>

            {searching && (
              <ul
                id={listId}
                role="listbox"
                className="mt-2 overflow-hidden rounded-xl border border-black/[0.08] bg-white p-1 dark:border-white/[0.09] dark:bg-white/[0.03]"
              >
                {results.length === 0 && (
                  <li className="px-2.5 py-3 text-[12.5px] text-neutral-500 dark:text-neutral-400">
                    {emptyLabel}
                  </li>
                )}
                {results.map((link, index) => (
                  <li
                    key={`${link.group}-${link.label}`}
                    role="option"
                    aria-selected={index === cursor}
                    className="animate-[su-link-in_160ms_cubic-bezier(0.23,1,0.32,1)_backwards] motion-reduce:animate-none"
                    style={{ animationDelay: `${index * 22}ms` }}
                  >
                    <a
                      href={link.href}
                      onMouseEnter={() => setCursor(index)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                        index === cursor && 'bg-black/[0.05] dark:bg-white/[0.07]',
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate text-[13px] text-neutral-700 dark:text-neutral-300">
                        {highlight(link.label, query.trim())}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
                        {link.group}
                      </span>
                      {index === cursor && (
                        <IconEnter className="size-3 shrink-0 text-neutral-400" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {!searching && (
          <nav
            aria-label="Footer"
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
          >
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

        <p className="mt-10 border-t border-black/[0.07] pt-6 text-[12px] tabular-nums text-neutral-500 dark:border-white/[0.08]">
          {copyright ?? `© ${brand}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}

export default LinkSearchFooter;
