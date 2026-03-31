import { getColors } from "@/lib/colors";
import { ColorPalette } from "@/components/color-palette";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette — Spectrum UI",
  description:
    "Explore a curated collection of color palettes for your next web project. Copy Tailwind CSS and CSS variable color values for React and Next.js applications.",
  keywords: [
    "color palette",
    "Tailwind CSS colors",
    "CSS color variables",
    "web color palette",
    "UI colors",
    "design system colors",
    "React color palette",
    "color generator",
  ],
  alternates: {
    canonical: "https://ui.spectrumhq.in/colors",
  },
  openGraph: {
    title: "Color Palette — Spectrum UI",
    description:
      "Curated color palettes for React, Next.js, and Tailwind CSS projects.",
    url: "https://ui.spectrumhq.in/colors",
    type: "website",
  },
};

const colors = getColors();

export default function ColorsPage() {
  return (
    <div id="colors" className="grid scroll-mt-20 gap-8">
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
    </div>
  );
}
