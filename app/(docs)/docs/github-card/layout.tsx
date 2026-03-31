import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "GitHub Card",
  description:
    "Interactive GitHub profile card generator component for React and Next.js. Search any GitHub user and generate a beautiful profile card with contribution graph, stats, and social sharing. Built with Tailwind CSS.",
  keywords: [
    "GitHub card",
    "GitHub profile card",
    "React GitHub component",
    "GitHub contribution graph",
    "developer card",
    "profile card generator",
    "GitHub stats card",
    "React GitHub profile",
    "Next.js GitHub card",
    "developer portfolio card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/github-card",
});

export default function GitHubCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
