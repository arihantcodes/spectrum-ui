"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown } from "lucide-react";

import type { DesignSort } from "@/lib/design/types";
import { cn } from "@/lib/utils";

const OPTIONS: { value: DesignSort; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "staff", label: "Staff picks" },
  { value: "popular", label: "Popular" },
];

/**
 * Sort persists in a cookie, never in the URL (spec §9): sorted views must not
 * mint duplicate URLs for crawlers, and the choice should survive navigation.
 * The server reads the cookie; this component only writes it and refreshes.
 */
export function SortSelect({ value }: { value: DesignSort }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <label
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center gap-1 text-[12px] text-muted-foreground transition-opacity hover:text-foreground",
        pending && "opacity-50",
      )}
    >
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          document.cookie = `design_sort=${e.target.value}; path=/design; max-age=31536000; samesite=lax`;
          startTransition(() => router.refresh());
        }}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
        aria-label="Sort items"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden>{OPTIONS.find((o) => o.value === value)?.label}</span>
      <ChevronDown aria-hidden className="size-3" />
    </label>
  );
}
