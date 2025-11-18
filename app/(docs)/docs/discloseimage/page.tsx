import DiscloseImage from "@/components/spectrumui/discloseimage";
import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Disclose Image",
  description:
    "Disclose image component for React and Next.js. Reveal images with animated door effects. Perfect for interactive galleries, reveals, and creative UI elements. Built with Tailwind CSS.",
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
      description="Disclose image component for React and Next.js. Reveal images with animated door effects. Perfect for interactive galleries, reveals, and creative UI elements. Built with Tailwind CSS."
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
      <div>
        <DiscloseImage
        alt="A beautiful image"
        vertical
        doorClassName="bg-green-500"
        src="https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3"
      />
      </div>
    </SEOWrapper>
  );
};

export default page;
