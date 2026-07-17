import React from "react";
import Link from "next/link";

import {
  PageSectionTitle,
  PageSubTitle,
  PageTemplate,
} from "../components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { InlineCode } from "@/components/ui/inline-code";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

import InputDemo from "./input-demo";
import InputSmallDemo from "./input-small-demo";
import InputLargeDemo from "./input-large-demo";

export const metadata: Metadata = baseMetadata({
  title: "Input",
  description:
    "Displays a form input field or a component that looks like an input field. A free React and Next.js component built with Tailwind CSS and shadcn/ui.",
  keywords: [
    "React input",
    "Next.js input",
    "input component",
    "shadcn input",
    "form input",
    "text input",
    "search input",
    "password input",
    "UI input component",
    "React form components",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/input",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Input"
      description="Displays a form input field or a component that looks like an input field."
      url="https://ui.spectrumhq.in/docs/input"
      keywords={[
        "React input",
        "Next.js input",
        "input component",
        "shadcn input",
        "form input",
        "text input",
        "search input",
        "password input",
        "UI input component",
        "React form components",
      ]}
    >
      <PageTemplate title="Input" description="Displays a form input field or a component that looks like an input field.">
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/input/input-demo.tsx"
          installCodePath="components/ui/input.tsx"
          cli="input"
        >
          <InputDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { Input } from "@/components/ui/input"`}
            requireAuth={false}
          />
          <CodeHighlight code={`<Input />`} requireAuth={false} />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">Input</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Styled wrapper around the native <InlineCode>input</InlineCode>{" "}
          element. All standard HTML input attributes are forwarded.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "type",
                required: false,
                type: `"text" | "email" | "password" | ...`,
                default: `"text"`,
                description: "Passed to the native input type attribute",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default input styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <p className="text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          For accessible labelling and validation, prefer using the{" "}
          <InlineCode>Label</InlineCode> component to wrap inputs, or the{" "}
          <InlineCode>Form</InlineCode> component. See some{" "}
          <Link
            href="/docs/floating-label-input"
            className="font-medium text-[#262626] underline decoration-solid underline-offset-2 dark:text-neutral-200"
          >
            related examples
          </Link>
          .
        </p>

        <PageSectionTitle>Small Size</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/input/input-small-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <InputSmallDemo />
        </PreviewCodeCard>

        <PageSectionTitle>Large Size</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/input/input-large-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <InputLargeDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
