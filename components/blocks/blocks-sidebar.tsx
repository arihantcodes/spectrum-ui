'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { NewBadge } from '@/components/blocks/new-badge';
import { cn } from '@/lib/utils';

interface BlocksSidebarProps {
  title: string;
  tagline: string;
  items: { slug: string; name: string; isNew?: boolean }[];
  categories?: { slug: string; name: string; href: string }[];
  activeCategory?: string;
}

/**
 * The fixed left rail of the specimen page: a flat list of block names whose
 * active item tracks the reader's scroll position. Hidden below lg — on small
 * screens the sections themselves are the navigation.
 */
export function BlocksSidebar({
  title,
  tagline,
  items,
  categories,
  activeCategory,
}: BlocksSidebarProps) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    // The active block is the one whose section crosses the reading band —
    // a strip a third of the way down the viewport, where the eye actually is.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="hidden w-[220px] shrink-0 lg:block">
      <div className="sticky top-24">
        {categories && categories.length > 1 ? (
          <>
            <p className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600">
              Categories
            </p>
            <nav aria-label="Block categories" className="mb-8">
              <ul>
                {categories.map((category) => {
                  const isActive = category.slug === activeCategory;
                  return (
                    <li key={category.slug}>
                      <Link
                        href={category.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex h-[30px] items-center rounded-md px-2.5 text-[13px] transition-colors duration-150',
                          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                          isActive
                            ? 'bg-black/[0.05] font-medium text-neutral-900 dark:bg-white/[0.07] dark:text-neutral-50'
                            : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200',
                        )}
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        ) : null}

        <p className="font-spectral text-[19px] leading-tight tracking-[-0.3px] text-neutral-900 dark:text-neutral-50">
          {title}
        </p>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-neutral-500 dark:text-neutral-400">
          {tagline}
        </p>

        <p className="mb-2 mt-8 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600">
          Components
        </p>
        <nav aria-label="Blocks on this page">
          <ul>
            {items.map((item) => {
              const isActive = item.slug === active;
              return (
                <li key={item.slug}>
                  <a
                    href={`#${item.slug}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex h-[30px] items-center gap-2 rounded-md px-2.5 text-[13px] transition-colors duration-150',
                      'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                      isActive
                        ? 'bg-black/[0.05] font-medium text-neutral-900 dark:bg-white/[0.07] dark:text-neutral-50'
                        : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200',
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.isNew && <NewBadge className="ml-auto" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 border-t border-black/[0.06] pt-5 dark:border-white/[0.07]">
          <p className="text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200">
            Install from your editor
          </p>
          <p className="mt-1 text-[12px] leading-[1.55] text-neutral-500 dark:text-neutral-400">
            Connect the MCP server and ask for any block by name.
          </p>
          <Link
            href="/docs/mcp"
            className="group mt-2.5 inline-flex items-center gap-1 text-[12.5px] font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
          >
            Set up MCP
            <ArrowUpRight className="size-3.5 text-[#f9452d] transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#E1F435]" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
