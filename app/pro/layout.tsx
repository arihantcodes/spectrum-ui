import type { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI Pro — Early-Bird Waitlist",
  description:
    "Join the Spectrum UI Pro waitlist. Lock early-bird pricing for premium Next.js templates, pro components, and founder support.",
  keywords: [
    "Next.js templates",
    "React templates",
    "premium templates",
    "shadcn templates",
    "Tailwind CSS templates",
    "SaaS template",
    "Spectrum UI Pro",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/pro",
});

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
