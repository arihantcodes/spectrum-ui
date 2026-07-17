import DiscloseImage from "@/components/spectrumui/discloseimage";
import React from "react";
import { PageTemplate } from "@/app/(docs)/docs/components/page-template";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

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
        <div className="mt-6">
          <DiscloseImage
            alt="A beautiful image"
            vertical
            doorClassName="bg-green-500"
            src="https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3"
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
