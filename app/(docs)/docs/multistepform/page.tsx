import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import Multistepdemo from "./multistepdemo";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Multistep Form",
  description:
    "A multi-step form with progress indicators for registration and checkout flows. A free React and Next.js component built with shadcn/ui and Tailwind CSS.",
  keywords: [
    "multistep form",
    "multi step form",
    "React multistep form",
    "Next.js form",
    "wizard form",
    "step form",
    "progressive form",
    "form wizard",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/multistepform",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Multistep Form"
      description="A multi-step form with progress indicators for registration and checkout flows."
      url="https://ui.spectrumhq.in/docs/multistepform"
      keywords={[
        "multistep form",
        "multi step form",
        "React multistep form",
        "Next.js form",
        "wizard form",
        "step form",
        "progressive form",
        "form wizard",
      ]}
    >
      <div>
        <PageTemplate
          title="Multistep Form"
          description="A multi-step form with progress indicators for registration and checkout flows."
          className="mt-5"
        >
        <PreviewCodeCard
          path="app/(docs)/docs/multistepform/multistepdemo.tsx"
          cli="@spectrumui/multiple-step-form-demo"
        
        installScript="npx shadcn@latest add sonner card input label textarea select checkbox radio-group"
        installCodePath="lib/utils.ts"
      >
          <Multistepdemo />
        </PreviewCodeCard>

      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
