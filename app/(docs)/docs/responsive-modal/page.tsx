import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Usage from "@/app/(docs)/docs/components/usage";
import ResponsiveModalDemo from "@/app/(docs)/docs/responsive-modal/responsive-modal-demo";
import ResponsiveModalSide from "@/app/(docs)/docs/responsive-modal/usage/responsive-modal-side";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Responsive Modal",
  description:
    "A dialog that centers on desktop and slides up as a sheet on mobile. A free React and Next.js component built with Radix UI and Tailwind CSS.",
  keywords: [
    "responsive modal",
    "modal component",
    "React modal",
    "dialog component",
    "mobile modal",
    "Next.js modal",
    "responsive dialog",
    "Radix dialog",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/responsive-modal",
});

const ResponsiveModalPage = () => {
  return (
    <SEOWrapper
      componentName="Responsive Modal"
      description="A dialog that centers on desktop and slides up as a sheet on mobile."
      url="https://ui.spectrumhq.in/docs/responsive-modal"
      keywords={[
        "responsive modal",
        "modal component",
        "React modal",
        "dialog component",
        "mobile modal",
        "Next.js modal",
        "responsive dialog",
        "Radix dialog",
      ]}
    >
      <PageTemplate
      title="Responsive Modal"
      description="A dialog that centers on desktop and slides up as a sheet on mobile."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/responsive-modal/responsive-modal-demo.tsx"
        cli="@spectrumui/responsive-modal"
      
        installCodePath="components/ui/responsive-modal.tsx"
      >
        <ResponsiveModalDemo />
      </PreviewCodeCard>

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Side"
        path="app/(docs)/docs//responsive-modal/usage/responsive-modal-side.tsx"
        cli="@spectrumui/responsive-modal-side"
      >
        <ResponsiveModalSide />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default ResponsiveModalPage;
