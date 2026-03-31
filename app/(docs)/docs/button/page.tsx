/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import ButtonCollection from "@/components/spectrumui/ButtonCollection";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import { Steppers } from "@/components/ui/steppers";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Button",
  description:
    "Beautiful, pre-designed button components for React and Next.js. Multiple styles including gradient, outline, loading, and icon buttons. Built with Tailwind CSS and shadcn/ui.",
  keywords: [
    "React button",
    "Next.js button",
    "button component",
    "shadcn button",
    "Tailwind button",
    "animated button",
    "loading button",
    "gradient button",
    "UI button component",
    "React button styles",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/button",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Button"
      description="Beautiful, pre-designed button components for React and Next.js. Multiple styles including gradient, outline, loading, and icon buttons. Built with Tailwind CSS and shadcn/ui."
      url="https://ui.spectrumhq.in/docs/button"
      keywords={[
        "React button",
        "Next.js button",
        "button component",
        "shadcn button",
        "Tailwind button",
        "animated button",
        "loading button",
        "gradient button",
        "UI button component",
        "React button styles",
      ]}
    >
      <div>
        <PageTemplate title="Pre Design Button">
          <PageSubTitle>Installation</PageSubTitle>
          <Steppers
            withInstall
            codePath="components/spectrumui/ButtonCollection.tsx"
            installScript="npx shadcn@latest add button"
            withEnd
          />
          <PageSubTitle>Usage</PageSubTitle>
          <div className="mt-12">
            <ButtonCollection />
          </div>
        </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
