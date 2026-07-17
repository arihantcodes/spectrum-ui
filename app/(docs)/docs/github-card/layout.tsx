import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";
import { PageTemplate } from "@/app/(docs)/docs/components/page-template";

export const metadata: Metadata = baseMetadata({
  title: "GitHub Profile Card",
  description:
    "A GitHub profile card generator with stats, contribution graph, and social links. A free React and Next.js component built with Tailwind CSS.",
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
  return (
    <SEOWrapper
      componentName="GitHub Profile Card"
      description="A GitHub profile card generator with stats, contribution graph, and social links."
      url="https://ui.spectrumhq.in/docs/github-card"
      keywords={[
        "GitHub profile card",
        "GitHub card generator",
        "GitHub contribution graph",
        "React GitHub component",
      ]}
    >
      <PageTemplate
        title="GitHub Profile Card"
        description="A GitHub profile card generator with stats, contribution graph, and social links."
      >
        {children}
      </PageTemplate>
    </SEOWrapper>
  );
}
