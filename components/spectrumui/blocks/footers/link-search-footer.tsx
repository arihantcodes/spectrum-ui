'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IconEnter, IconSearch, FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-link-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type LinkSearchFooterVariant = 'Search' | 'Browse';

export interface LinkSearchGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface LinkSearchFooterProps {
  links?: { label: string; href: string }[];
  socials?: FooterSocial[];
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
  links,
  socials,
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
              <Input
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
                className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0 text-[13.5px] shadow-none ring-offset-0 placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:appearance-none"
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

export default LinkSearchFooter;
