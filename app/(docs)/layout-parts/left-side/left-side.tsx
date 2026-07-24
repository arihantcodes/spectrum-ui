"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";
import { compareComponentNames } from "@/lib/component-catalog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function LeftSide() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-1 pb-10">
      {DOCS.map((group) => {
        const children =
          group.groupKey === "components"
            ? [...group.children].sort((a, b) =>
                compareComponentNames(a.label, b.label),
              )
            : group.children;

        return (
          <DocsNavGroup
            key={group.groupKey}
            groupValue={group.groupValue}
            items={children}
            pathname={pathname}
          />
        );
      })}
    </nav>
  );
}

interface DocsNavChild {
  label: string;
  value: string;
  url: string;
  new?: boolean;
}

function DocsNavGroup({
  groupValue,
  items,
  pathname,
}: {
  groupValue: string;
  items: DocsNavChild[];
  pathname: string;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="data-[state=open]:mb-2"
    >
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left outline-none transition-colors",
          open && "mb-1.5",
          "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
          "focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20",
        )}
      >
        <span className="font-mono text-[13px] font-medium leading-4 tracking-[-0.06px] text-[#262626] antialiased dark:text-neutral-200">
          {groupValue}
        </span>
        {open ? (
          <ChevronDown
            className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400"
            aria-hidden
          />
        ) : (
          <ChevronRight
            className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400"
            aria-hidden
          />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-0.5">
          {items.map((child) => {
            const isActive = pathname === child.url;
            const isExternal = child.url.startsWith("http");

            return (
              <li key={child.value}>
                <Link
                  href={child.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm leading-5 antialiased transition-colors duration-150",
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
      </CollapsibleContent>
    </Collapsible>
  );
}
