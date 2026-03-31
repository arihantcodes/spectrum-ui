import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spectrum Pro — Premium Next.js Templates Built on Spectrum UI",
  description:
    "Production-ready Next.js templates with dark mode, animations, and TypeScript. Built on shadcn/ui and Spectrum UI. Buy once, own forever. Starting at $49.",
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
    title: "Spectrum Pro — Premium Next.js Templates",
    description:
      "Production-ready Next.js templates with dark mode, animations, and TypeScript. Buy once, own forever.",
    url: "https://ui.spectrumhq.in/pro",
    type: "website",
  },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
