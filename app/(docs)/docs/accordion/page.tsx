import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { AccordionDemo } from "./accordion-demo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Accordion",
  description:
    "Accessible accordion component for React and Next.js. A vertically stacked set of interactive headings that each reveal a section of content. Built with Radix UI and Tailwind CSS.",
  keywords: [
    "accordion component",
    "React accordion",
    "collapsible component",
    "FAQ component",
    "expandable content",
    "Next.js accordion",
    "accessible accordion",
    "Radix UI accordion",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/accordion",
});

const SkeletonLoadingPage = () => {
  return (
    <SEOWrapper
      componentName="Accordion"
      description="Accessible accordion component for React and Next.js. A vertically stacked set of interactive headings that each reveal a section of content. Built with Radix UI and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/accordion"
      keywords={[
        "accordion component",
        "React accordion",
        "collapsible component",
        "FAQ component",
        "expandable content",
        "Next.js accordion",
        "accessible accordion",
        "Radix UI accordion",
      ]}
    >
      <PageTemplate
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    >
      <PreviewCodeCard path="app/(docs)/docs/accordion/accordion-demo.tsx">
        {<AccordionDemo />}
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers withInstall codePath="components/ui/accordion.tsx" withEnd />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default SkeletonLoadingPage;
