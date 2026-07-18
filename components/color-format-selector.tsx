"use client";

import * as React from "react";

import { getColorFormat, type Color, type ColorFormat } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const FORMAT_LABELS: Record<ColorFormat, string> = {
  className: "Class",
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
};

export function ColorFormatSelector({
  color,
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, "color"> & {
  color: Color;
}) {
  const { format, setFormat, isLoading } = useColors();
  const formats = React.useMemo(() => getColorFormat(color), [color]);

  if (isLoading) {
    return <ColorFormatSelectorSkeleton />;
  }

  return (
    <Select value={format} onValueChange={setFormat}>
      <SelectTrigger
        className={cn(
          "h-8 w-auto gap-2 rounded-full border-transparent bg-white pl-3.5 pr-2.5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-ring dark:border-neutral-800 dark:bg-neutral-900 [&>svg]:h-3.5 [&>svg]:w-3.5",
          className,
        )}
        {...props}
      >
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Format
        </span>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-foreground">
          {FORMAT_LABELS[format]}
        </span>
      </SelectTrigger>
      <SelectContent
        align="end"
        sideOffset={6}
        className="min-w-[240px] rounded-xl p-1 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_8px_24px_0px_rgba(0,0,0,0.08)]"
      >
        {(Object.entries(formats) as [ColorFormat, string][]).map(
          ([key, value]) => (
            <SelectItem
              key={key}
              value={key}
              className="rounded-lg py-2 pl-8 pr-2.5 focus:bg-neutral-50 dark:focus:bg-neutral-900 [&>span:last-child]:w-full [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:text-[#f9452d] dark:[&_svg]:text-[#E1F435]"
            >
              <span className="flex w-full items-center justify-between gap-8">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-foreground">
                  {FORMAT_LABELS[key]}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                  {value}
                </span>
              </span>
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
}

export function ColorFormatSelectorSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn("h-8 w-[132px] rounded-full", className)}
      {...props}
    />
  );
}
