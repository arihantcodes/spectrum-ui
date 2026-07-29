'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BLOCK_CATEGORIES,
  blockCategoryPath,
  blocksInCategory,
  subcategoriesInCategory,
  subcategoryAnchor,
} from '@/lib/block-catalog';
import { cn } from '@/lib/utils';

interface CategoryRailProps {
  /**
   * Overrides the category derived from the path. The layout renders this rail,
   * and a layout receives no route params, so the active category comes from the
   * pathname by default.
   */
  activeCategory?: string;
  className?: string;
}

/**
 * Category navigation for the Blocks section.
 *
 * A rail rather than top-nav: the taxonomy grows past what a header can hold,
 * and the rail doubles as a table of contents for the active category.
 * Collapses to a horizontally scrolling chip row below lg.
 */
export function CategoryRail({ activeCategory, className }: CategoryRailProps) {
  const pathname = usePathname();
  // /blocks/<category>[/<block>]
  const derived = pathname?.split('/').filter(Boolean)[1];
  const active = activeCategory ?? derived;

  return (
    <nav aria-label="Block categories" className={className}>
      <p className="mb-3 hidden font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-600 lg:block">
        Categories
      </p>

      <ul className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
        {BLOCK_CATEGORIES.map((category) => {
          const isActive = category.slug === active;
          const count = blocksInCategory(category.slug).length;

          return (
            <li key={category.slug} className="shrink-0 lg:shrink">
              <Link
                href={blockCategoryPath(category.slug)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex h-8 items-center justify-between gap-3 whitespace-nowrap rounded-lg px-2.5 text-[13.5px]',
                  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[#f9452d] dark:focus-visible:ring-[#E1F435]',
                  isActive
                    ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-white/[0.06] dark:text-neutral-50'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-neutral-100',
                )}
              >
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span
                      aria-hidden
                      className="h-3.5 w-[2px] rounded-full bg-[#f9452d] dark:bg-[#E1F435]"
                    />
                  )}
                  {category.name}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-600">
                  {count}
                </span>
              </Link>

              {/* Subcategory anchors, only for the category being read. */}
              {isActive && (
                <ul className="mt-1 hidden lg:block">
                  {subcategoriesInCategory(category.slug).map((subcategory) => (
                    <li key={subcategory}>
                      <Link
                        href={`${blockCategoryPath(category.slug)}#${subcategoryAnchor(subcategory)}`}
                        className="ml-4 flex h-7 items-center rounded-md px-2.5 text-[13px] text-neutral-500 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9452d] dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus-visible:ring-[#E1F435]"
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
