import React from "react";
import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import InfiniteScrollDemo from "@/app/(docs)/docs/infinite-scroll/infinite-scroll-demo";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { infiniteScrollProp } from "@/app/(docs)/docs/infinite-scroll/infinite-scroll-prop";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Infinite Scroll",
  description:
    "An infinite scroll container that loads more content using the IntersectionObserver API. A free React and Next.js component with a customizable loading spinner.",
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
      description="An infinite scroll container that loads more content using the IntersectionObserver API."
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
      description="An infinite scroll container that loads more content using the IntersectionObserver API."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/infinite-scroll/infinite-scroll-demo.tsx"
        cli="@spectrumui/infinite-scroll-demo"
      
        installCodePath="components/ui/infinite-scroll.tsx"
      >
        <InfiniteScrollDemo />
      </PreviewCodeCard>

      <PropsTable props={infiniteScrollProp} />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default InfiniteScrollPage;
