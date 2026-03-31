import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "Installation",
  description:
    "Get started with Spectrum UI. Step-by-step installation guide for Next.js, shadcn/ui, and Tailwind CSS. Set up your project in minutes with our easy-to-follow instructions.",
  keywords: [
    "Spectrum UI installation",
    "React setup",
    "Next.js setup",
    "shadcn installation",
    "Tailwind CSS setup",
    "UI library setup",
    "component library installation",
    "getting started React",
    "Next.js project setup",
    "frontend setup guide",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/installation",
});

export default function InstallationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
