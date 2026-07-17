"use client";

import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { type Color } from "@/lib/colors";
import { trackEvent } from "@/lib/events";
import { useColors } from "@/hooks/use-colors";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

function showCopyToast(color: Color, value: string) {
  toast.custom(
    () => (
      <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-background/95 py-3 pl-3 pr-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_4px_12px_0px_rgba(0,0,0,0.08)] backdrop-blur">
        <span
          aria-hidden
          className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15"
          style={{ backgroundColor: `hsl(${color.hsl})` }}
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="truncate font-mono text-[13px] font-medium leading-none text-foreground">
            {value}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-wide text-muted-foreground">
            <Check className="h-3 w-3 text-[#f9452d] dark:text-[#E1F435]" />
            {color.className} copied
          </span>
        </div>
      </div>
    ),
    // Fixed id: rapid copies replace the toast instead of stacking a column.
    { id: "color-copy", duration: 2000 },
  );
}

export function Color({ color }: { color: Color }) {
  const { format } = useColors();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <button
      className="group relative h-full min-w-0 flex-1 outline-none transition-all duration-300 ease-out hover:flex-[2.2] focus-visible:z-10 focus-visible:flex-[2.2] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current"
      style={{
        backgroundColor: `hsl(${color.hsl})`,
        color: color.foreground,
      }}
      aria-label={`Copy ${color.className} as ${format}`}
      onClick={() => {
        copyToClipboard(color[format]);
        trackEvent({
          name: "copy_color",
          properties: {
            color: color.id,
            value: color[format],
            format,
          },
        });
        showCopyToast(color, color[format]);
      }}
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-2 hidden justify-center font-mono text-[10px] tabular-nums opacity-60 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 sm:flex">
        {color.scale}
      </span>
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tabular-nums">
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {color.scale}
        </span>
        <span className="hidden whitespace-nowrap font-mono text-[10px] opacity-80 md:block">
          {color[format]}
        </span>
      </span>
    </button>
  );
}
