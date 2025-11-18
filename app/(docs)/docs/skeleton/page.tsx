import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Usage from "@/app/(docs)/docs/components/usage";
import SkeletonDemo from "./skeleton-demo";
import { SkeletonCard } from "./usage/skeleton-card";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Skeleton",
  description: "Skeleton loading component for React and Next.js. Show elegant placeholder content while data is loading. Perfect for improving perceived performance and user experience.",
  keywords: [
    "skeleton loader",
    "skeleton component",
    "React skeleton",
    "loading skeleton",
    "placeholder component",
    "Next.js skeleton",
    "skeleton UI",
    "content placeholder",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/skeleton",
});

const SkeletonLoadingPage = () => {
  return (
    <SEOWrapper
      componentName="Skeleton"
      description="Skeleton loading component for React and Next.js. Show elegant placeholder content while data is loading. Perfect for improving perceived performance and user experience."
      url="https://ui.spectrumhq.in/docs/skeleton"
      keywords={[
        "skeleton loader",
        "skeleton component",
        "React skeleton",
        "loading skeleton",
        "placeholder component",
        "Next.js skeleton",
        "skeleton UI",
        "content placeholder",
      ]}
    >
      <PageTemplate
      title="Skeleton"
      description="Use to show a placeholder while content is loading."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/skeleton/skeleton-demo.tsx"
        cli="@spectrumui/skeleton"
      >
        <SkeletonDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers withInstall codePath="components/ui/skeleton.tsx" withEnd />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Card"
        path="app/(docs)/docs//skeleton/usage/skeleton-card.tsx"
        cli="@spectrumui/skeleton-card"
      >
        <SkeletonCard />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default SkeletonLoadingPage;
