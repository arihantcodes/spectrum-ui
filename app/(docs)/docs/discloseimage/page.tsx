import React from "react";
import { PageTemplate } from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";
import DiscloseImageDemo from "./disclose-image-demo";

export const metadata: Metadata = baseMetadata({
  title: "Disclose Image",
  description:
    "An image that reveals its content behind animated sliding door panels. A free React and Next.js component built with Tailwind CSS.",
  keywords: [
    "disclose image",
    "image reveal",
    "React image reveal",
    "Next.js image",
    "animated image",
    "door effect",
    "image animation",
    "reveal component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/discloseimage",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Disclose Image"
      description="An image that reveals its content behind animated sliding door panels."
      url="https://ui.spectrumhq.in/docs/discloseimage"
      keywords={[
        "disclose image",
        "image reveal",
        "React image reveal",
        "Next.js image",
        "animated image",
        "door effect",
        "image animation",
        "reveal component",
      ]}
    >
      <PageTemplate
        title="Disclose Image"
        description="An image that reveals its content behind animated sliding door panels."
      >
        <PreviewCodeCard
          path="app/(docs)/docs/discloseimage/disclose-image-demo.tsx"
          cli="@spectrumui/disclose-image"
          installCodePath="components/spectrumui/discloseimage.tsx"
        >
          <DiscloseImageDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
