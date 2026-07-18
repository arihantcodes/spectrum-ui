import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import Demoimages from "./usages/useone";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Image Preview",
  description:
    "An image preview component with zoom, lightbox, and gallery support. A free React and Next.js component built with Tailwind CSS.",
  keywords: [
    "image preview",
    "image gallery",
    "React image preview",
    "Next.js image",
    "lightbox component",
    "image zoom",
    "image viewer",
    "gallery component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/imagepreview",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Image Preview"
      description="An image preview component with zoom, lightbox, and gallery support."
      url="https://ui.spectrumhq.in/docs/imagepreview"
      keywords={[
        "image preview",
        "image gallery",
        "React image preview",
        "Next.js image",
        "lightbox component",
        "image zoom",
        "image viewer",
        "gallery component",
      ]}
    >
      <div>
        <PageTemplate
          title="Image Preview"
          description="An image preview component with zoom, lightbox, and gallery support."
          className="mt-5"
        >
        <PreviewCodeCard
          path="app/(docs)/docs/imagepreview/usages/useone.tsx"
          cli="@spectrumui/image-preview"
        
        installScript="npm i lucide-react"
        installCodePath="app/(docs)/docs/imagepreview/ImagePreview.tsx"
      >
          <Demoimages />
        </PreviewCodeCard>
      <p>
          Create a new file called <code>ImagePreview.tsx</code> in the
          {" components"}
        </p>

      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
