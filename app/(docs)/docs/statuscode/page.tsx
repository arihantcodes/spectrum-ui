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
    "An HTTP status code display for building 404 and error pages. A free React and Next.js component built with Tailwind CSS.",
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
      description="An HTTP status code display for building 404 and error pages."
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
        <PageTemplate
          title="HTTP Status Code"
          description="An HTTP status code display for building 404 and error pages."
          className="mt-5"
        >
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
