import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import Demoimages from "./usages/useone";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Image Preview",
  description:
    "Image preview component for React and Next.js. Display images with zoom, lightbox, and gallery features. Perfect for product images, portfolios, and media galleries. Built with Tailwind CSS.",
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
      description="Image preview component for React and Next.js. Display images with zoom, lightbox, and gallery features. Perfect for product images, portfolios, and media galleries. Built with Tailwind CSS."
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
        <PageTemplate title="Image Preview" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/imagepreview/usages/useone.tsx"
          cli="@spectrumui/image-preview"
        >
          <Demoimages />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p>
          Create a new file called <code>ImagePreview.tsx</code> in the
          {" components"}
        </p>

        <Steppers
          className=""
          installScript="npm i lucide-react 
 "
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="app/(docs)/docs/imagepreview/ImagePreview.tsx"
        />
      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
