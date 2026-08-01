"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { DESIGN_SECTIONS } from "@/content/design-taxonomy";

export function DesignSidebar({
  counts = {},
}: {
  counts?: Record<string, number>;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Design sections" className="flex h-full flex-col">
      <ul className="space-y-0.5">
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
                  "flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
                  active
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <span>{section.name}</span>
                <span className="flex items-center gap-1.5">
                  {typeof count === "number" && count > 0 && (
                    <span className="text-[11px] tabular-nums text-muted-foreground/70">
                      {count}
                    </span>
                  )}
                  {active && (
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-foreground"
                    />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

    </nav>
  );
}
