import React from "react";
import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Productcard from "./product-card";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Product Card",
  description:
    "A product card that displays an image, title, price, and rating. A free React and Next.js component built with Tailwind CSS.",
  keywords: [
    "product card",
    "React product card",
    "e-commerce card",
    "product component",
    "shopping card",
    "product display",
    "Next.js product card",
    "Tailwind product card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/product-card",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Product Card"
      description="A product card that displays an image, title, price, and rating."
      url="https://ui.spectrumhq.in/docs/product-card"
      keywords={[
        "product card",
        "React product card",
        "e-commerce card",
        "product component",
        "shopping card",
        "product display",
        "Next.js product card",
        "Tailwind product card",
      ]}
    >
      <PageTemplate
        title="Product Card"
        description="A product card that displays an image, title, price, and rating."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/product-card/product-card.tsx"
        cli="@spectrumui/product-card"
      
        installScript="npx shadcn@latest add @spectrumui/product-card"
        installCodePath="app/(docs)/docs/product-card/product-card.tsx"
      >
        <Productcard />
      </PreviewCodeCard>

     
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
