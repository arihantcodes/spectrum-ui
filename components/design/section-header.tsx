import Link from "next/link";

import { cn } from "@/lib/utils";
import type { DesignSection } from "@/content/design-taxonomy";
import { designCategoryPath } from "@/content/design-taxonomy";

export function SectionHeader({
  section,
  activeCategory,
  count,
  heading,
  subheading,
}: {
  section: DesignSection;
  /** Undefined on the section index ("All" is active). */
  activeCategory?: string;
  count?: number;
  /** Category pages override the H1 — each indexable route needs its own. */
  heading?: string;
  subheading?: string;
}) {
  return (
    <header className="mb-6">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[15px] font-medium tracking-tight">
            {heading ?? section.name}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {subheading ?? section.description}
          </p>
        </div>
        {typeof count === "number" && count > 0 && (
          <p className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
            {count} {count === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      {/* Category pills. Every one is a real navigable route — that is the SEO
          engine — but prefetch keeps it feeling like a client-side filter. */}
      <div className="relative mt-5">
        <ul className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
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
        {/* Edge fade so the scroll affordance reads without a scrollbar. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent"
        />
      </div>
    </header>
  );
}
