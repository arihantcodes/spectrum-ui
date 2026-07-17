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
    "A set of pre-designed buttons including gradient, outline, loading, and icon styles. Free React and Next.js components built with Tailwind CSS and shadcn/ui.",
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
      description="A set of pre-designed buttons including gradient, outline, loading, and icon styles."
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
        <PageTemplate
          title="Button"
          description="A set of pre-designed buttons including gradient, outline, loading, and icon styles."
        >
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
