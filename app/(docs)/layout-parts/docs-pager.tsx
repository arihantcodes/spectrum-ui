"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/app/(docs)/layout-parts/docs-icons";
import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";
import { compareComponentNames } from "@/lib/component-catalog";

interface FlatDoc {
  label: string;
  url: string;
}

/** Same ordering as the sidebar: components A→Z (letters first), other groups curated order. */
const FLAT_DOCS: FlatDoc[] = DOCS.flatMap((group) => {
  const children =
    group.groupKey === "components"
      ? [...group.children].sort((a, b) =>
          compareComponentNames(a.label, b.label),
        )
      : group.children;
  return children
    .filter((child) => !child.url.startsWith("http"))
    .map((child) => ({ label: child.label, url: child.url }));
});

export default function DocsPager() {
  const pathname = usePathname();
  const index = FLAT_DOCS.findIndex((doc) => doc.url === pathname);

  if (index === -1) return null;

  const previous = index > 0 ? FLAT_DOCS[index - 1] : null;
  const next = index < FLAT_DOCS.length - 1 ? FLAT_DOCS[index + 1] : null;

  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Docs pagination"
      className="mx-auto mt-14 grid w-full max-w-[672px] grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.url}
          className="group flex flex-col rounded-lg border border-[#e5e5e5] px-3 py-3 transition-colors hover:bg-black/2 dark:border-neutral-800 dark:hover:bg-white/3"
        >
          <span className="flex items-center text-sm leading-5 text-[#737373] dark:text-neutral-400">
            <ChevronLeftIcon className="-ml-1 size-4 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1.5 truncate text-[15px] font-medium leading-[22.5px] text-[#0a0a0a] dark:text-neutral-100">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.url}
          className="group flex flex-col items-end rounded-lg border border-[#e5e5e5] px-3 py-3 text-right transition-colors hover:bg-black/2 dark:border-neutral-800 dark:hover:bg-white/3 sm:col-start-2"
        >
          <span className="flex items-center text-sm leading-5 text-[#737373] dark:text-neutral-400">
            Next
            <ChevronRightIcon className="-mr-1 size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 truncate text-[15px] font-medium leading-[22.5px] text-[#0a0a0a] dark:text-neutral-100">
            {next.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
