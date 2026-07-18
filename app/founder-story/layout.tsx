import type { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "Why Spectrum UI Exists",
  description:
    "Read the founder story behind Spectrum UI, from repeated interface work to an open-source library of animation-ready React components and blocks.",
  canonicalUrl: "https://ui.spectrumhq.in/founder-story",
});

export default function FounderStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
