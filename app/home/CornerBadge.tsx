"use client";

import Link from "next/link";

import { cn } from "@//lib/utils";

const bracketBase =
  "pointer-events-none absolute h-[9px] w-[9px] border-black dark:border-neutral-300";

export function CornerBadge() {
  return (
    <Link
      href="https://vercel.com/oss"
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex outline-none"
      aria-label="Backed by Vercel OSS"
    >
      {/* Crop-mark style corner brackets */}
      <span aria-hidden className={cn(bracketBase, "-left-1 -top-1 border-l-2 border-t-2")} />
      <span aria-hidden className={cn(bracketBase, "-right-1 -top-1 border-r-2 border-t-2")} />
      <span aria-hidden className={cn(bracketBase, "-bottom-1 -left-1 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(bracketBase, "-bottom-1 -right-1 border-b-2 border-r-2")} />

      <span className="inline-flex h-[26px] w-[179px] items-center justify-center gap-1.5 rounded-none bg-[#ececec] font-regular text-[16px] leading-[24px] text-black transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:group-hover:bg-neutral-700">
        Backed by
        <svg
          height="14"
          width="14"
          viewBox="0 0 16 16"
          aria-hidden
          className="text-black dark:text-neutral-100"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 1L16 15H0L8 1Z"
            fill="currentColor"
          />
        </svg>
        vercel oss
      </span>
    </Link>
  );
}
