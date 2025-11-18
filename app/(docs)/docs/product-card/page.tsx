import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Productcard from "./product-card";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Product Card",
  description:
    "Beautiful product card component for React and Next.js. Displays product information including image, title, description, price, and rating. Perfect for e-commerce and product listings.",
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
      description="Beautiful product card component for React and Next.js. Displays product information including image, title, description, price, and rating. Perfect for e-commerce and product listings."
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
      <PageTemplate title="Product Card">
      <PreviewCodeCard
        path="app/(docs)/docs/product-card/product-card.tsx"
        cli="@spectrumui/product-card"
      >
        <Productcard />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/product-card/product-card.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/product-card"
      />

     
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
