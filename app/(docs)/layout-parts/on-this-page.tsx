"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TocIcon } from "@/app/(docs)/layout-parts/docs-icons";
import { cn } from "@/lib/utils";

interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Right-hand "On This Page" table of contents.
 * Reads h2/h3 headings with ids from the rendered docs content and
 * tracks the active one while scrolling.
 */
export default function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const content = document.querySelector("[data-docs-content]");
    if (!content) {
      setHeadings([]);
      return;
    }

    const elements = Array.from(
      content.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
    ).filter((el) => (el.textContent ?? "").trim().length > 0);

    setHeadings(
      elements.map((el) => ({
        id: el.id,
        text: (el.textContent ?? "").trim(),
        level: el.tagName === "H3" ? 3 : 2,
      })),
    );
    setActiveId(elements[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id);
          }
        }
      },
      { rootMargin: "-80px 0% -70% 0%", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <div className="text-[13px]">
      <div className="flex items-center gap-1.5 pb-2">
        <TocIcon className="size-3.5 text-[#484848]/75 dark:text-neutral-400" />
        <p className="text-xs leading-4 text-[#484848]/75 dark:text-neutral-400">
          On This Page
        </p>
      </div>
      <ul>
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;
          return (
            <li key={`${heading.id}-${index}`} className="relative">
              {/* tree-rail connector coming down from the row above */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-[5px] top-[-9px] h-[22px] rounded-bl-[8px] border-b border-l border-black/10 dark:border-white/10",
                  heading.level === 3 ? "w-[22px]" : "w-[11px]",
                )}
              />
              {/* active diamond marker on the rail */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-[#0b0b0b] dark:bg-white"
                />
              )}
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 leading-[18px] transition-colors",
                  heading.level === 3 ? "pl-8" : "pl-5",
                  isActive
                    ? "font-medium text-[#0a0a0a] dark:text-white"
                    : "text-[#484848]/75 hover:text-[#0a0a0a] dark:text-neutral-400 dark:hover:text-white",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
