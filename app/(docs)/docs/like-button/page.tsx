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

import LikeButtonDemo from "./like-button-demo"
import LikeButtonSizesDemo from "./like-button-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Like Button",
  description:
    "A heart button that pops with a particle burst and rolling count. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "like button component",
    "React like button",
    "heart button animation",
    "micro interaction component",
    "particle burst button",
    "animated counter",
    "framer motion button",
    "Next.js like button",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/like-button",
})

const page = () => {
  const description =
    "A heart button that pops with a particle burst and rolling count."

  return (
    <SEOWrapper
      componentName="Like Button"
      description={description}
      url="https://ui.spectrumhq.in/docs/like-button"
      keywords={[
        "like button component",
        "heart button animation",
        "micro interaction component",
        "particle burst button",
      ]}
    >
      <PageTemplate title="Like Button" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/like-button/like-button-demo.tsx"
          installCodePath="components/spectrumui/like-button.tsx"
          cli="@spectrumui/like-button"
          installScript="npm i framer-motion"
        >
          <LikeButtonDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { LikeButton } from "@/components/spectrumui/like-button"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<LikeButton count={128} onLikedChange={(liked) => console.log(liked)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">LikeButton</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element with{" "}
          <InlineCode>aria-pressed</InlineCode> reflecting the liked state. Pass{" "}
          <InlineCode>liked</InlineCode> to control it from outside, or{" "}
          <InlineCode>defaultLiked</InlineCode> to let it manage its own state.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "liked",
                required: false,
                type: "boolean",
                description:
                  "Controlled liked state. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultLiked",
                required: false,
                type: "boolean",
                default: "false",
                description: "Initial liked state when uncontrolled",
              },
              {
                prop: "onLikedChange",
                required: false,
                type: "(liked: boolean) => void",
                description: "Fires with the next liked state on every toggle",
              },
              {
                prop: "count",
                required: false,
                type: "number",
                description:
                  "Like total excluding the current user; +1 is shown while liked. Totals of 1000+ are compacted (1.2K)",
              },
              {
                prop: "showCount",
                required: false,
                type: "boolean",
                default: "true",
                description: "Hide the rolling counter even when count is set",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the button",
              },
              {
                prop: "particleColors",
                required: false,
                type: "string[]",
                description: "Colors cycled across the burst particles",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Like"`,
                description: "Accessible name of the action",
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
        <PageSectionTitle className="mt-0">Sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/like-button/like-button-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <LikeButtonSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
