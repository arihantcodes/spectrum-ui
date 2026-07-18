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

import HoldToConfirmDemo from "./hold-to-confirm-demo"
import HoldToConfirmSizesDemo from "./hold-to-confirm-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Hold to Confirm",
  description:
    "A press-and-hold button that fills a progress ring before confirming destructive actions. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "hold to confirm button",
    "press and hold button",
    "destructive action confirmation",
    "hold to delete component",
    "progress ring button",
    "confirmation micro interaction",
    "framer motion button",
    "Next.js confirm button",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/hold-to-confirm",
})

const page = () => {
  const description =
    "A press-and-hold button that fills a progress ring before confirming destructive actions."

  return (
    <SEOWrapper
      componentName="Hold to Confirm"
      description={description}
      url="https://ui.spectrumhq.in/docs/hold-to-confirm"
      keywords={[
        "hold to confirm button",
        "press and hold button",
        "destructive action confirmation",
        "progress ring button",
      ]}
    >
      <PageTemplate title="Hold to Confirm" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/hold-to-confirm/hold-to-confirm-demo.tsx"
          installCodePath="components/spectrumui/hold-to-confirm.tsx"
          cli="@spectrumui/hold-to-confirm"
          installScript="npm i framer-motion lucide-react"
        >
          <HoldToConfirmDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { HoldToConfirmButton } from "@/components/spectrumui/hold-to-confirm"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<HoldToConfirmButton onConfirm={() => console.log("confirmed")} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">
          HoldToConfirmButton
        </PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element. Holding it
          down with a pointer, <InlineCode>Space</InlineCode> or{" "}
          <InlineCode>Enter</InlineCode> fills the ring over{" "}
          <InlineCode>duration</InlineCode> milliseconds and fires{" "}
          <InlineCode>onConfirm</InlineCode> exactly once on completion. A
          polite live region announces the confirmation to screen readers.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "onConfirm",
                required: true,
                type: "() => void",
                description:
                  "Fires exactly once when the hold reaches completion",
              },
              {
                prop: "duration",
                required: false,
                type: "number",
                default: "1200",
                description: "How long the button must be held, in milliseconds",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Hold to delete"`,
                description: "Idle label",
              },
              {
                prop: "confirmedLabel",
                required: false,
                type: "string",
                default: `"Deleted"`,
                description: "Label shown after a completed hold",
              },
              {
                prop: "icon",
                required: false,
                type: "React.ReactNode",
                description: "Replaces the default trash icon",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the button",
              },
              {
                prop: "resetDelay",
                required: false,
                type: "number",
                default: "1500",
                description:
                  "Milliseconds before resetting to idle after confirming; 0 keeps the confirmed state",
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
          Sizes and custom duration
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/hold-to-confirm/hold-to-confirm-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <HoldToConfirmSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
