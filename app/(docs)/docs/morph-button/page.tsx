import React from "react"
import {
  PageSectionTitle,
  PageSubTitle,
  PageTemplate,
} from "../components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight"
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table"
import { InlineCode } from "@/components/ui/inline-code"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"

import MorphButtonDemo from "./morph-button-demo"
import MorphButtonErrorDemo from "./morph-button-error-demo"

export const metadata: Metadata = baseMetadata({
  title: "Morph Button",
  description:
    "An async button that morphs between idle, loading, success, and error states. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "morph button component",
    "React async button",
    "loading button animation",
    "success error button states",
    "button state machine",
    "micro interaction component",
    "framer motion button",
    "Next.js submit button",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/morph-button",
})

const page = () => {
  const description =
    "An async button that morphs between idle, loading, success, and error states."

  return (
    <SEOWrapper
      componentName="Morph Button"
      description={description}
      url="https://ui.spectrumhq.in/docs/morph-button"
      keywords={[
        "morph button component",
        "React async button",
        "loading button animation",
        "button state machine",
      ]}
    >
      <PageTemplate title="Morph Button" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/morph-button/morph-button-demo.tsx"
          installCodePath="components/spectrumui/morph-button.tsx"
          cli="@spectrumui/morph-button"
          installScript="npm i framer-motion"
        >
          <MorphButtonDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { MorphButton } from "@/components/spectrumui/morph-button"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<MorphButton onAction={() => saveChanges()}>Save changes</MorphButton>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">MorphButton</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element driven by a{" "}
          <InlineCode>MorphButtonState</InlineCode> —{" "}
          <InlineCode>{`"idle" | "loading" | "success" | "error"`}</InlineCode>.
          Pass <InlineCode>onAction</InlineCode> to let the button run the full
          cycle itself, or pass <InlineCode>state</InlineCode> to drive it from
          outside (the internal machine is bypassed and{" "}
          <InlineCode>onClick</InlineCode> still fires). While not idle the
          button is <InlineCode>aria-disabled</InlineCode> and ignores clicks,
          and a polite live region announces each state change.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "children",
                required: true,
                type: "React.ReactNode",
                description:
                  "Idle content of the button — usually a short action label",
              },
              {
                prop: "onAction",
                required: false,
                type: "() => Promise<void> | void",
                description:
                  "Async work to run on click when uncontrolled. Loading while pending, success on resolve, error on throw, then auto-reset",
              },
              {
                prop: "state",
                required: false,
                type: `"idle" | "loading" | "success" | "error"`,
                description:
                  "Controlled state. When provided the internal machine is bypassed",
              },
              {
                prop: "onClick",
                required: false,
                type: "React.MouseEventHandler<HTMLButtonElement>",
                description: "Click handler; fires on idle clicks in both modes",
              },
              {
                prop: "loadingLabel",
                required: false,
                type: "string",
                description:
                  "Label rendered next to the spinner while loading; spinner-only if omitted",
              },
              {
                prop: "successLabel",
                required: false,
                type: "string",
                default: `"Done"`,
                description: "Label shown next to the check in the success state",
              },
              {
                prop: "errorLabel",
                required: false,
                type: "string",
                default: `"Failed"`,
                description: "Label shown next to the X in the error state",
              },
              {
                prop: "resetDelay",
                required: false,
                type: "number",
                default: "1800",
                description:
                  "Milliseconds success/error is held before auto-resetting to idle",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the button",
              },
              {
                prop: "disabled",
                required: false,
                type: "boolean",
                default: "false",
                description: "Disables pointer and keyboard interaction",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default button styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Error state and sizes
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/morph-button/morph-button-error-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <MorphButtonErrorDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
