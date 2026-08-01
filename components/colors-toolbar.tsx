"use client";

import { type Color } from "@/lib/colors";
import { ColorFormatSelector } from "@/components/color-format-selector";

export type PaletteNavItem = {
  name: string;
  hex: string;
};

export function ColorsToolbar({
  palettes,
  color,
}: {
  palettes: PaletteNavItem[];
  color: Color;
}) {
  return (
    <div className="sticky top-14 z-30 border-b border-border bg-background/85 backdrop-blur-sm supports-backdrop-filter:bg-background/70">
      <div className="container flex items-center justify-between gap-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden shrink-0 items-center gap-2.5 sm:flex">
            <span
              aria-hidden
              className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
            />
            <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
              Palettes
            </span>
          </span>
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
            {palettes.map((palette) => (
              <a
                key={palette.name}
                href={`#${palette.name}`}
                title={palette.name}
                aria-label={`Jump to ${palette.name}`}
                className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-black/10 transition-transform duration-200 hover:scale-125 dark:ring-white/20"
                style={{ backgroundColor: palette.hex }}
              />
            ))}
          </div>
        </div>
        <ColorFormatSelector color={color} className="shrink-0" />
      </div>
    </div>
  );
}
