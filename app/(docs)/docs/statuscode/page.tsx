import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import Ststuscodelist from "./demostatus";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "HTTP Status Code",
  description:
    "HTTP status code component for React and Next.js. Display HTTP status codes with beautiful error pages. Perfect for 404, 500, and other error pages. Built with Tailwind CSS.",
  keywords: [
    "HTTP status code",
    "status code component",
    "React status code",
    "Next.js error page",
    "404 page",
    "error page",
    "status page",
    "error component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/statuscode",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="HTTP Status Code"
      description="HTTP status code component for React and Next.js. Display HTTP status codes with beautiful error pages. Perfect for 404, 500, and other error pages. Built with Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/statuscode"
      keywords={[
        "HTTP status code",
        "status code component",
        "React status code",
        "Next.js error page",
        "404 page",
        "error page",
        "status page",
        "error component",
      ]}
    >
      <div>
        <PageTemplate title="HTTP Status Code" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/statuscode/demostatus.tsx"
          cli="@spectrumui/http-status-code"
        >
          <Ststuscodelist />
        </PreviewCodeCard>
      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
