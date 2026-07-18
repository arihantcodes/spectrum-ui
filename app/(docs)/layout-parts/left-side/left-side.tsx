"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";

export default function LeftSide() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-8 pb-10">
      {DOCS.map((group) => {
        // Components are listed A→Z; other groups keep their curated order
        const children =
          group.groupKey === "components"
            ? [...group.children].sort((a, b) => a.label.localeCompare(b.label))
            : group.children;

        return (
          <div key={group.groupKey}>
            <p className="mb-2.5 px-2 font-mono text-[13px] font-medium leading-4 tracking-[-0.06px] text-[#262626] antialiased dark:text-neutral-200">
              {group.groupValue}
            </p>
            <ul className="flex flex-col gap-0.5">
              {children.map((child) => {
                const isActive = pathname === child.url;
                const isExternal = child.url.startsWith("http");

                return (
                  <li key={child.value}>
                    <Link
                      href={child.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className={cn(
                        "flex h-8 items-center gap-2 rounded-[10px] px-3.5 text-sm leading-5 antialiased transition-colors duration-150",
                        isActive
                          ? "bg-black/[0.04] font-medium text-[#171717] dark:bg-white/[0.06] dark:text-neutral-100"
                          : "font-normal text-[#727272] hover:bg-black/[0.03] hover:text-[#262626] dark:text-neutral-400 dark:hover:bg-white/[0.04] dark:hover:text-neutral-100",
                      )}
                    >
                      <span className="truncate">{child.label}</span>
                      {child.new && (
                        <span className="inline-flex h-[18px] shrink-0 items-center rounded-[6px] bg-[#2b7fff]/[0.08] px-[5px] text-xs font-medium leading-none text-[#1447e6] dark:bg-[#2b7fff]/[0.14] dark:text-blue-400">
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
