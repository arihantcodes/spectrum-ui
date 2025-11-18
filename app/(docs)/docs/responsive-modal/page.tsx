import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
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
    "Responsive modal/dialog component for React and Next.js. Centers on desktop, slides up on mobile. Perfect for forms, confirmations, and content overlays. Built with Radix UI and Tailwind CSS.",
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
      description="Responsive modal/dialog component for React and Next.js. Centers on desktop, slides up on mobile. Perfect for forms, confirmations, and content overlays. Built with Radix UI and Tailwind CSS."
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
      description="A dialog that pops up in the center of the screen on desktop and slide up on mobile."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/responsive-modal/responsive-modal-demo.tsx"
        cli="@spectrumui/responsive-modal"
      >
        <ResponsiveModalDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/responsive-modal.tsx"
        withEnd
      />

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
