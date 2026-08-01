"use client";

import { motion } from "motion/react";

import { type ColorPalette } from "@/lib/colors";
import { Color } from "@/components/color";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function ColorPalette({
  colorPalette,
  index,
}: {
  colorPalette: ColorPalette;
  index: number;
}) {
  const firstColor = colorPalette.colors[0];
  const lastColor = colorPalette.colors[colorPalette.colors.length - 1];

  return (
    <motion.section
      id={colorPalette.name}
      className="scroll-mt-28"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: revealEase }}
    >
      <div className="flex items-baseline justify-between pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-spectral text-[22px] capitalize leading-none tracking-[-0.5px] text-[#2d2f2e] dark:text-neutral-100">
            {colorPalette.name}
          </h2>
        </div>
        <span className="hidden font-mono text-[11px] uppercase tabular-nums tracking-wide text-muted-foreground sm:block">
          {firstColor.hex} — {lastColor.hex}
        </span>
      </div>
      <div className="flex h-24 w-full overflow-hidden rounded-xl ring-1 ring-black/6 dark:ring-white/10 sm:h-32">
        {colorPalette.colors.map((color) => (
          <Color key={color.hex} color={color} />
        ))}
      </div>
    </motion.section>
  );
}
