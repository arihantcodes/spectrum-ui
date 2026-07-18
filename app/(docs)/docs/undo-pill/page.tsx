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

import UndoPillDemo from "./undo-pill-demo"
import UndoPillDurationDemo from "./undo-pill-duration-demo"

export const metadata: Metadata = baseMetadata({
  title: "Undo Pill",
  description:
    "An inline undo pill with a draining countdown ring that pauses on hover. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "undo pill component",
    "React undo button",
    "undo toast component",
    "countdown ring animation",
    "undo delete micro interaction",
    "snackbar undo component",
    "framer motion countdown",
    "Next.js undo pill",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/undo-pill",
})

const page = () => {
  const description =
    "An inline undo pill with a draining countdown ring that pauses on hover."

  return (
    <SEOWrapper
      componentName="Undo Pill"
      description={description}
      url="https://ui.spectrumhq.in/docs/undo-pill"
      keywords={[
        "undo pill component",
        "undo toast component",
        "countdown ring animation",
        "undo delete micro interaction",
      ]}
    >
      <PageTemplate title="Undo Pill" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/undo-pill/undo-pill-demo.tsx"
          installCodePath="components/spectrumui/undo-pill.tsx"
          cli="@spectrumui/undo-pill"
          installScript="npm i framer-motion"
        >
          <UndoPillDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { UndoPill } from "@/components/spectrumui/undo-pill"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<UndoPill
  open={open}
  label="Message deleted"
  onUndo={() => restore()}
  onExpire={() => commit()}
/>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">UndoPill</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a fully controlled pill with{" "}
          <InlineCode>role=&quot;status&quot;</InlineCode> so it is announced
          politely to screen readers. Show it by setting{" "}
          <InlineCode>open</InlineCode> to true, then flip it back to false from{" "}
          <InlineCode>onUndo</InlineCode> and <InlineCode>onExpire</InlineCode>.
          Position it from outside via <InlineCode>className</InlineCode> or a
          wrapper element.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "open",
                required: true,
                type: "boolean",
                description: "Controls whether the pill is shown. Fully controlled",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Deleted"`,
                description: "Message shown inside the pill",
              },
              {
                prop: "duration",
                required: false,
                type: "number",
                default: "5",
                description: "Countdown length in seconds",
              },
              {
                prop: "onUndo",
                required: true,
                type: "() => void",
                description:
                  "Fires when the Undo button is clicked or Escape is pressed while focus is within the pill",
              },
              {
                prop: "onExpire",
                required: true,
                type: "() => void",
                description: "Fires once when the countdown completes",
              },
              {
                prop: "pauseOnHover",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Pause the countdown while the pill is hovered or focused; it resumes on leave",
              },
              {
                prop: "undoLabel",
                required: false,
                type: "string",
                default: `"Undo"`,
                description: "Text of the undo button",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default pill styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Longer duration with pause on hover
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/undo-pill/undo-pill-duration-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <UndoPillDurationDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
