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


export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI - Product Card",
  description:
    "A product card component that displays product information including image, title, description, price, and rating.",
});

const DualRangeSliderPage = () => {
  return (
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
  );
};

export default DualRangeSliderPage;
