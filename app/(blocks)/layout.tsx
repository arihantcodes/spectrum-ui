import React from 'react';
import { BlocksNav } from '@/app/(blocks)/layout-parts/blocks-nav';
import {
  BLOCK_CATEGORIES,
  blockCategoryPath,
  blockPath,
  blocksInCategory,
} from '@/lib/block-catalog';

/**
 * Shell for the Blocks section: a narrow sticky rail and everything else given
 * to the block itself. Blocks are page-width sections, so the column is as wide
 * as the frame allows — no third rail, and the card carries only enough padding
 * to separate the stage from its border.
 *
 * Its own route group rather than living under app/(docs)/docs:
 * tests/component-catalog.test.js asserts an exact count of directories under
 * the docs route, and a separate shell is the right architecture regardless.
 */
export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  const groups = BLOCK_CATEGORIES.map((category) => ({
    key: category.slug,
    label: category.name,
    href: blockCategoryPath(category.slug),
    items: blocksInCategory(category.slug).map((block) => ({
      label: block.name,
      href: blockPath(category.slug, block.slug),
    })),
  }));

  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[188px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-8">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto pr-2">
            <BlocksNav groups={groups} />
          </div>
        </aside>

        <div className="min-w-0 self-start py-6 lg:py-8">
          <div
            data-blocks-content
            className="rounded-[15px] border border-black/8 bg-white px-3 py-6 sm:px-5 sm:py-8 lg:px-6 dark:border-white/10 dark:bg-neutral-950/60"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
