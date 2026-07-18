import type { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "React Dashboard Templates",
  description:
    "Browse Spectrum UI dashboard templates with copyable Next.js, TypeScript, Tailwind CSS, and shadcn/ui source for product interfaces.",
  canonicalUrl: "https://ui.spectrumhq.in/templates",
});

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
