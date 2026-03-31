import React from "react";

import { PageSubTitle, PageTemplate } from "../components/page-template";
import { Steppers } from "@/components/ui/steppers";

import CardCollection from "@/components/spectrumui/cards";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Card",
  description:
    "Pre-designed card components for React and Next.js. Includes login cards, signup cards, pricing cards, profile cards, and dashboard cards. Built with Tailwind CSS and shadcn/ui.",
  keywords: [
    "React card",
    "Next.js card",
    "card component",
    "shadcn card",
    "login card",
    "signup card",
    "pricing card",
    "dashboard card",
    "UI card component",
    "React card designs",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/card",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Card"
      description="Pre-designed card components for React and Next.js. Includes login cards, signup cards, pricing cards, profile cards, and dashboard cards. Built with Tailwind CSS and shadcn/ui."
      url="https://ui.spectrumhq.in/docs/card"
      keywords={[
        "React card",
        "Next.js card",
        "card component",
        "shadcn card",
        "login card",
        "signup card",
        "pricing card",
        "dashboard card",
        "UI card component",
        "React card designs",
      ]}
    >
      <div>
        <PageTemplate title="Pre Design Cards">
          <PageSubTitle>Installation</PageSubTitle>
          <Steppers
            withInstall
            codePath="components/spectrumui/cards.tsx"
            installScript="npx shadcn@latest add card"
            withEnd
          />
          <PageSubTitle>Usage</PageSubTitle>
          <div className="mt-12">
            <CardCollection />
          </div>
        </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
