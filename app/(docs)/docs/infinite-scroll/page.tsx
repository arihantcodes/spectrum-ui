import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import InfiniteScrollDemo from "@/app/(docs)/docs/infinite-scroll/infinite-scroll-demo";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { infiniteScrollProp } from "@/app/(docs)/docs/infinite-scroll/infinite-scroll-prop";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Infinite Scroll",
  description:
    "Infinite scroll component for React and Next.js. Load more content as users scroll using IntersectionObserver API. Fully customizable loading spinner and trigger behavior. Perfect for feeds, lists, and pagination.",
  keywords: [
    "infinite scroll",
    "scroll component",
    "React infinite scroll",
    "lazy loading",
    "Next.js scroll",
    "IntersectionObserver",
    "pagination component",
    "load more",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/infinite-scroll",
});

const InfiniteScrollPage = () => {
  return (
    <SEOWrapper
      componentName="Infinite Scroll"
      description="Infinite scroll component for React and Next.js. Load more content as users scroll using IntersectionObserver API. Fully customizable loading spinner and trigger behavior. Perfect for feeds, lists, and pagination."
      url="https://ui.spectrumhq.in/docs/infinite-scroll"
      keywords={[
        "infinite scroll",
        "scroll component",
        "React infinite scroll",
        "lazy loading",
        "Next.js scroll",
        "IntersectionObserver",
        "pagination component",
        "load more",
      ]}
    >
      <PageTemplate
      title="Infinite Scroll"
      description="Simple infinite scroll component. You have fully control over the loading spinner and IntersectionObserver API."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/infinite-scroll/infinite-scroll-demo.tsx"
        cli="@spectrumui/infinite-scroll-demo"
      >
        <InfiniteScrollDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/infinite-scroll.tsx"
        withEnd
      />

      <PropsTable props={infiniteScrollProp} />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default InfiniteScrollPage;
