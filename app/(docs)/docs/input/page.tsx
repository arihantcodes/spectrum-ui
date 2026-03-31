/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";

import { PageSubTitle, PageTemplate } from "../components/page-template";
import { Steppers } from "@/components/ui/steppers";
import Inputcollection from "@/components/spectrumui/form";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Input",
  description:
    "Pre-designed input and form components for React and Next.js. Beautiful text inputs, search bars, password fields, and form layouts. Built with Tailwind CSS and shadcn/ui.",
  keywords: [
    "React input",
    "Next.js input",
    "input component",
    "shadcn input",
    "form input",
    "text input",
    "search input",
    "password input",
    "UI input component",
    "React form components",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/input",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Input"
      description="Pre-designed input and form components for React and Next.js. Beautiful text inputs, search bars, password fields, and form layouts. Built with Tailwind CSS and shadcn/ui."
      url="https://ui.spectrumhq.in/docs/input"
      keywords={[
        "React input",
        "Next.js input",
        "input component",
        "shadcn input",
        "form input",
        "text input",
        "search input",
        "password input",
        "UI input component",
        "React form components",
      ]}
    >
      <div>
        <PageTemplate title="Pre Design Inputs">
          <PageSubTitle>Installation</PageSubTitle>
          <Steppers
            withInstall
            codePath="components/spectrumui/form.tsx"
            installScript="npx shadcn@latest add input"
            withEnd
          />
          <PageSubTitle>Usage</PageSubTitle>
          <div className="mt-12">
            <Inputcollection />
          </div>
        </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
