"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { DESIGN_SECTIONS } from "@/content/design-taxonomy";

/**
 * Section nav, recent.design mechanics: plain text rows, the active section
 * carries a small filled dot on the right, counts sit quietly beside it.
 */
export function DesignSidebar({
  counts = {},
}: {
  counts?: Record<string, number>;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Design sections">
      <ul className="space-y-1">
        {DESIGN_SECTIONS.map((section) => {
          // /design must only match exactly, or it lights up on every subroute.
          const active =
            section.path === "/design"
              ? pathname === "/design" || pathname.startsWith("/design/c/")
              : pathname.startsWith(section.path);
          const count = counts[section.slug];

          return (
            <li key={section.slug}>
              <Link
                href={section.path}
                className={cn(
                  "flex items-center justify-between py-1 text-[13px] transition-colors",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="flex items-baseline gap-2">
                  {section.name}
                  {typeof count === "number" && count > 0 && (
                    <span className="text-[11px] tabular-nums text-muted-foreground/60">
                      {count}
                    </span>
                  )}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-foreground"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
