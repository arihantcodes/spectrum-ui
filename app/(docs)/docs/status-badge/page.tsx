import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import StatusDemo from "./statusdemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Status Badge",
  description:
    "Status badge component for React and Next.js. Display status indicators like pending, success, error, and warning with beautiful icons and colors. Perfect for dashboards and admin panels.",
  keywords: [
    "status badge",
    "badge component",
    "React badge",
    "status indicator",
    "Next.js badge",
    "status label",
    "badge UI",
    "status component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/status-badge",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Status Badge"
      description="Status badge component for React and Next.js. Display status indicators like pending, success, error, and warning with beautiful icons and colors. Perfect for dashboards and admin panels."
      url="https://ui.spectrumhq.in/docs/status-badge"
      keywords={[
        "status badge",
        "badge component",
        "React badge",
        "status indicator",
        "Next.js badge",
        "status label",
        "badge UI",
        "status component",
      ]}
    >
      <PageTemplate title="Status Badge">
      <PreviewCodeCard
        cli="@spectrumui/status-badge"
        path="app/(docs)/docs/status-badge/statusdemo.tsx"
      >
        <StatusDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/status-badge/statusdemo.tsx"
        withEnd
        installScript="npm i lucide-react"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
