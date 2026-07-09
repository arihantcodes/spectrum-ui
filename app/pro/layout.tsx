import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spectrum UI Pro — Early Bird Waitlist",
  description:
    "Join the Spectrum UI Pro waitlist. Lock early-bird pricing for premium Next.js templates, pro components, and founder support.",
  keywords: [
    "Next.js templates",
    "React templates",
    "premium templates",
    "shadcn templates",
    "Tailwind CSS templates",
    "SaaS template",
    "landing page template",
    "Next.js starter kit",
    "production-ready template",
    "Spectrum UI templates",
  ],
  alternates: {
    canonical: "https://ui.spectrumhq.in/pro",
  },
  openGraph: {
    title: "Spectrum UI Pro — Early Bird Waitlist",
    description:
      "Reserve your spot on the Spectrum UI Pro waitlist. One payment locks early-bird pricing at launch.",
    url: "https://ui.spectrumhq.in/pro",
    type: "website",
  },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
