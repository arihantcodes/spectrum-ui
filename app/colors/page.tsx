import { getColors } from "@/lib/colors";
import { ColorPalette } from "@/components/color-palette";
import { ColorsToolbar } from "@/components/colors-toolbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Color Palette | Spectrum UI",
  },
  description:
    "Explore curated color palettes for React and Next.js. Copy Tailwind CSS and CSS variable values for your design system.",
  keywords: [
    "color palette",
    "Tailwind CSS colors",
    "CSS color variables",
    "web color palette",
    "UI colors",
    "design system colors",
    "React color palette",
  ],
  alternates: {
    canonical: "https://ui.spectrumhq.in/colors",
  },
  openGraph: {
    title: "Color Palette | Spectrum UI",
    description:
      "Curated color palettes for React, Next.js, and Tailwind CSS projects.",
    url: "https://ui.spectrumhq.in/colors",
    type: "website",
    siteName: "Spectrum UI",
  },
};

const colors = getColors();

const paletteNav = colors.map((palette) => ({
  name: palette.name,
  hex:
    palette.colors.find((color) => color.scale === 500)?.hex ??
    palette.colors[Math.floor(palette.colors.length / 2)].hex,
}));

export default function ColorsPage() {
  return (
    <>
      <ColorsToolbar palettes={paletteNav} color={colors[0].colors[0]} />
      <div
        id="colors"
        className="container flex scroll-mt-28 flex-col gap-10 py-10 md:py-14"
      >
        {colors.map((colorPalette, index) => (
          <ColorPalette
            key={colorPalette.name}
            colorPalette={colorPalette}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
