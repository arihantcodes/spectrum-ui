import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import AutosizeTextareaDemo from "@/app/(docs)/docs/autosize-textarea/autosize-textarea-demo";
import Usage from "@/app/(docs)/docs/components/usage";
import AutosizeTextareaWithMaxHeight from "@/app/(docs)/docs/autosize-textarea/usage/autosize-textarea-with-max-height";
import AutosizeTextareaCustomize from "@/app/(docs)/docs/autosize-textarea/usage/autosize-textarea-customize";
import AutosizeTextareaWithRef from "@/app/(docs)/docs/autosize-textarea/usage/autosize-textarea-with-ref";
import AutosizeTextareaForm from "@/app/(docs)/docs/autosize-textarea/usage/autosize-textarea-form";
import { InlineCode } from "@/components/ui/inline-code";
import { P } from "@/components/ui/heading-with-anchor";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Autosize Textarea",
  description: "Auto-resizing textarea component for React and Next.js. Automatically adjusts height based on content. Perfect for chat inputs, comments, and forms. Built with Tailwind CSS.",
  keywords: [
    "autosize textarea",
    "auto resize textarea",
    "React textarea",
    "Next.js textarea",
    "dynamic textarea",
    "growing textarea",
    "auto height textarea",
    "form textarea",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/autosize-textarea",
});

const AutosizeTextareaPage = () => {
  return (
    <SEOWrapper
      componentName="Autosize Textarea"
      description="Auto-resizing textarea component for React and Next.js. Automatically adjusts height based on content. Perfect for chat inputs, comments, and forms. Built with Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/autosize-textarea"
      keywords={[
        "autosize textarea",
        "auto resize textarea",
        "React textarea",
        "Next.js textarea",
        "dynamic textarea",
        "growing textarea",
        "auto height textarea",
        "form textarea",
      ]}
    >
      <PageTemplate
      title="Autosize Textarea"
      description="Auto resize textarea height based on content."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/autosize-textarea/autosize-textarea-demo.tsx"
        cli="@spectrumui/autosize-textarea-demo"
      >
        <AutosizeTextareaDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/autosize-textarea.tsx"
        withEnd
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Max height"
        path="app/(docs)/docs/autosize-textarea/usage/autosize-textarea-with-max-height.tsx"
        cli="@spectrumui/autosize-textarea-max-height"
      >
        <AutosizeTextareaWithMaxHeight />
      </Usage>
      <Usage
        title="ref"
        path="app/(docs)/docs/autosize-textarea/usage/autosize-textarea-with-ref.tsx"
        cli="@spectrumui/autosize-textarea-ref"
      >
        <AutosizeTextareaWithRef />
      </Usage>
      <Usage
        title="Form"
        path="app/(docs)/docs/autosize-textarea/usage/autosize-textarea-form.tsx"
        cli="@spectrumui/autosize-textarea-form"
      >
        <AutosizeTextareaForm />
      </Usage>
      <Usage
        title="Customize"
        description={
          <>
            <P className="text-muted-foreground">
              This is an example that you can use the hook{" "}
              <InlineCode>useAutosizeTextArea()</InlineCode> to create your own
              textarea to match your needs.
            </P>
            <P className="text-muted-foreground">
              In this example, we use <InlineCode>react-hook-form</InlineCode>{" "}
              and <InlineCode>shadcn-ui Textarea</InlineCode> to fully control
              your customize textarea.
            </P>
          </>
        }
        path="app/(docs)/docs/autosize-textarea/usage/autosize-textarea-customize.tsx"
        cli="@spectrumui/autosize-textarea-customize"
      >
        <AutosizeTextareaCustomize />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default AutosizeTextareaPage;
