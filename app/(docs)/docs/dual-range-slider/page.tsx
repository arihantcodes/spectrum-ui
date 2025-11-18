import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import DualRangeSliderDemo from "@/app/(docs)/docs/dual-range-slider/dual-range-slider-demo";
import DualRangeSliderCustomLabel from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-custom-label";
import Usage from "@/app/(docs)/docs/components/usage";
import DualRangeSliderLabelPosition from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-label-position";
import DualRangeSliderSingle from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-single";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Dual Range Slider",
  description:
    "Dual range slider component for React and Next.js. Select a range of values with two handles. Perfect for price filters, date ranges, and numeric selections. Built with Radix UI and Tailwind CSS.",
  keywords: [
    "dual range slider",
    "range slider",
    "React range slider",
    "Next.js slider",
    "price slider",
    "range input",
    "dual handle slider",
    "Radix slider",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/dual-range-slider",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Dual Range Slider"
      description="Dual range slider component for React and Next.js. Select a range of values with two handles. Perfect for price filters, date ranges, and numeric selections. Built with Radix UI and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/dual-range-slider"
      keywords={[
        "dual range slider",
        "range slider",
        "React range slider",
        "Next.js slider",
        "price slider",
        "range input",
        "dual handle slider",
        "Radix slider",
      ]}
    >
      <PageTemplate
      title="Dual Range Slider"
      description="An enhancement slider that allows you to select a range of values."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/dual-range-slider/dual-range-slider-demo.tsx"
        cli="@spectrumui/dual-range-slider-demo"
      >
        <DualRangeSliderDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/dual-range-slider.tsx"
        withEnd
        installScript="npm i @radix-ui/react-slider"
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Custom Label"
        path="app/(docs)/docs/dual-range-slider/usage/dual-range-slider-custom-label.tsx"
        cli="@spectrumui/dual-range-slider-custom-label"
      >
        <DualRangeSliderCustomLabel />
      </Usage>
      <Usage
        title="Label Position"
        path="app/(docs)/docs/dual-range-slider/usage/dual-range-slider-label-position.tsx"
        cli="@spectrumui/dual-range-slider-label-position"
      >
        <DualRangeSliderLabelPosition />
      </Usage>
      <Usage
        title="Single Slider"
        path="app/(docs)/docs/dual-range-slider/usage/dual-range-slider-single.tsx"
        cli="@spectrumui/dual-range-slider-single"
      >
        <DualRangeSliderSingle />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
