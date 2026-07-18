'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Component as ComponentIcon } from 'lucide-react';
import { COMPONENT_CATALOG, componentDocsPath } from '@/lib/component-catalog';

type ComponentItem = {
  name: string;
  description: string;
  href: string;
  category: string;
};

const allComponents: ComponentItem[] = COMPONENT_CATALOG.map((component) => ({
  name: component.name,
  description: component.description,
  href: componentDocsPath(component.slug),
  category: component.category,
}));

const sortedComponents = [...allComponents].sort((a, b) => a.name.localeCompare(b.name));

/** One table cell — component name only, used in both browse and search views */
function ComponentRow({ item }: { item: ComponentItem }) {
  return (
    <div className="group relative border-b border-r border-black/[0.06] dark:border-white/[0.08]">
      <Link
        href={item.href}
        className="flex h-11 items-center justify-center gap-1.5 px-4 text-sm font-medium leading-5 text-[#404040] antialiased transition-colors duration-150 hover:bg-black/[0.02] hover:text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/20 dark:text-neutral-300 dark:hover:bg-white/[0.04] dark:hover:text-neutral-50 dark:focus-visible:ring-white/30"
      >
        <span className="truncate">{item.name}</span>
        {/* Negative margin cancels the arrow's footprint so the name stays truly centered */}
        <ArrowUpRight className="-mr-5 h-3.5 w-3.5 shrink-0 -translate-x-0.5 text-[#a3a3a3] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
      </Link>
    </div>
  );
}

export function DocsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    return sortedComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query),
    );
  }, [query]);

  return (
    // A minimum height keeps the docs card from collapsing while searching,
    // so the pager below doesn't jump around.
    <div className="min-h-[600px] w-full">
      {/* Header — introduction on the left, search on the right */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-2xl leading-10 text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            React components and blocks
          </h1>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Spectrum UI is an open-source React component and block library featuring
            animation-ready, copy-paste components built with React, Next.js, Tailwind CSS, Motion,
            TypeScript, and shadcn/ui for SaaS dashboards, landing pages, AI applications, and admin
            panels.
          </p>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Choose a component, copy its source or add it with the shadcn CLI, and keep the source in
            your project. Components can be adapted to the project&apos;s design system and application
            requirements.
          </p>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Components are authored in TypeScript, and each documentation page lists the source and
            dependencies for that implementation. You can also connect the{' '}
            <Link
              href="/docs/mcp"
              className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
            >
              Spectrum UI MCP server
            </Link>{' '}
            so your AI editor can add components for you.
          </p>
        </div>
        {/* <div className="group relative w-full sm:w-80 lg:w-72 lg:shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3a3a3] transition-colors duration-150 group-focus-within:text-[#686868] dark:text-neutral-500 dark:group-focus-within:text-neutral-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search components..."
            className="h-10 w-full rounded-[10px] border border-black/[0.08] bg-white pl-9 pr-9 text-sm text-[#262626] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#a3a3a3] hover:border-black/[0.14] focus:border-black/[0.18] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.02] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:hover:border-white/20 dark:focus:border-white/25 dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#a3a3a3] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626] dark:text-neutral-500 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div> */}
      </div>

      {/* Components */}
      <div className="mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <h2
          id="components"
          className="scroll-m-24 font-regular text-xl font-medium leading-7 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50"
        >
          Components
        </h2>
        <p className="mt-1 font-inter text-[13px] leading-5 tracking-wide text-neutral-500 dark:text-neutral-400">
          {allComponents.length} components that you can copy into your project.
        </p>
      </div>

      {query ? (
        /* ---------- Search results ---------- */
        results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-black/[0.12] py-24 text-center dark:border-white/15">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
              <ComponentIcon className="h-5 w-5 text-[#a3a3a3] dark:text-neutral-500" />
            </div>
            <p className="text-sm font-medium text-[#262626] dark:text-neutral-100">
              No components found
            </p>
            <p className="mt-1 text-[13px] leading-5 text-[#686868] dark:text-neutral-400">
              Nothing matches &ldquo;{searchQuery}&rdquo;. Try a different keyword.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-5 h-8 rounded-[10px] border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-[#262626] transition-all duration-150 hover:border-black/[0.16] hover:bg-black/[0.02] active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-neutral-100 dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 font-mono text-[13px] leading-4 text-[#686868] dark:text-neutral-400">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}
              &rdquo;
            </p>
            <div className="overflow-hidden rounded-[14px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]">
              <div className="overflow-hidden">
                <div className="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((c) => (
                    <ComponentRow key={c.href} item={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        /* ---------- Browse: one flat table, three centered names per row ---------- */
        <div
          className="animate-fade-up overflow-hidden rounded-[14px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
          style={{ animationDelay: '120ms' }}
        >
          {/* -mr/-mb tuck the outermost cell borders under the container edge */}
          <div className="overflow-hidden">
            <div className="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sortedComponents.map((c) => (
                <ComponentRow key={c.href} item={c} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
