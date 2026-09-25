import Link from "next/link";

import { cn } from "@/lib/utils";
import type { DesignSection } from "@/content/design-taxonomy";
import { designCategoryPath } from "@/content/design-taxonomy";
import type { DesignSort } from "@/lib/design/types";
import { relativeTime } from "@/lib/design/format";
import { SortSelect } from "./sort-select";

/**
 * Header row + filter rail, recent.design mechanics: the title row sits above
 * a dashed hairline, and the pills row is sticky under the 3.5rem site header
 * so filters stay reachable while scrolling the feed. Every pill is a real
 * navigable route (the SEO engine); prefetch keeps it feeling client-side.
 */
export function SectionHeader({
  section,
  activeCategory,
  count,
  heading,
  subheading,
  updatedAt,
  sort = "recent",
}: {
  section: DesignSection;
  /** Undefined on the section index ("All" is active). */
  activeCategory?: string;
  count?: number;
  /** Category pages override the H1 — each indexable route needs its own. */
  heading?: string;
  subheading?: string;
  /** Most recent published_at in the current view — "Last updated Xh ago". */
  updatedAt?: string | null;
  sort?: DesignSort;
}) {
  const updated = relativeTime(updatedAt ?? null);

  // Fragment, not a wrapping <header>: the filter rail is position:sticky, and
  // a sticky element can only stick within its PARENT's box. Wrapped in a
  // <header> that ends just below it, it would scroll away with the page —
  // as a direct child of <main> its sticky range is the whole column.
  return (
    <>
      {/* Title row */}
      <header className="border-grid flex items-baseline justify-between gap-4 border-b px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-baseline gap-3">
          <h1 className="shrink-0 text-[15px] font-medium tracking-tight">
            {heading ?? section.name}
          </h1>
          <p className="hidden truncate text-[13px] text-muted-foreground sm:block">
            {subheading ?? section.description}
          </p>
        </div>
        <p className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {updated
            ? `Last updated ${updated}`
            : typeof count === "number" && count > 0
              ? `${count} ${count === 1 ? "item" : "items"}`
              : null}
        </p>
      </header>

      {/* Filter rail — sticky under the site header, above the feed. */}
      <div className="border-grid sticky top-14 z-30 border-b bg-background/95 px-4 backdrop-blur-xs sm:px-6">
        <div className="flex items-center gap-4 py-2.5">
          <ul className="no-scrollbar relative flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
            <li>
              <Link
                href={section.path}
                scroll={false}
                className={cn(
                  "inline-block whitespace-nowrap rounded-full px-3 py-1 text-[12px] transition-colors",
                  !activeCategory
                    ? "bg-foreground text-background"
                    : "bg-accent/60 text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                All
              </Link>
            </li>
            {section.categories.map((category) => {
              const active = activeCategory === category.slug;
              return (
                <li key={category.slug}>
                  <Link
                    href={designCategoryPath(section, category.slug)}
                    scroll={false}
                    prefetch
                    className={cn(
                      "inline-block whitespace-nowrap rounded-full px-3 py-1 text-[12px] transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "bg-accent/60 text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <SortSelect value={sort} />
        </div>
      </div>
    </>
  );
}
