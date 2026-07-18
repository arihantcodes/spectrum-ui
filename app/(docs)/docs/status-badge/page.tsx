import React from "react";
import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import StatusDemo from "./statusdemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Status Badge",
  description:
    "A status badge with icon and color variants for success, error, warning, and pending states. A free React and Next.js component built with Tailwind CSS.",
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
      description="A status badge with icon and color variants for success, error, warning, and pending states."
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
      <PageTemplate
        title="Status Badge"
        description="A status badge with icon and color variants for success, error, warning, and pending states."
      >
      <PreviewCodeCard
        cli="@spectrumui/status-badge"
        path="app/(docs)/docs/status-badge/statusdemo.tsx"
      
        installScript="npm i lucide-react"
        installCodePath="app/(docs)/docs/status-badge/statusdemo.tsx"
      >
        <StatusDemo />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
