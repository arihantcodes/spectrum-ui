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

import FaceRatingDemo from "./face-rating-demo"
import FaceRatingSizesDemo from "./face-rating-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Face Rating",
  description:
    "A five-level rating input where an SVG face morphs between moods. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "face rating component",
    "React rating component",
    "emoji rating widget",
    "feedback rating component",
    "svg morph animation",
    "smiley rating scale",
    "framer motion rating",
    "Next.js rating component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/face-rating",
})

const page = () => {
  const description =
    "A five-level rating input where an SVG face morphs between moods."

  return (
    <SEOWrapper
      componentName="Face Rating"
      description={description}
      url="https://ui.spectrumhq.in/docs/face-rating"
      keywords={[
        "face rating component",
        "emoji rating widget",
        "feedback rating component",
        "svg morph animation",
      ]}
    >
      <PageTemplate title="Face Rating" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/face-rating/face-rating-demo.tsx"
          installCodePath="components/spectrumui/face-rating.tsx"
          cli="@spectrumui/face-rating"
          installScript="npm i framer-motion"
        >
          <FaceRatingDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { FaceRating } from "@/components/spectrumui/face-rating"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<FaceRating onValueChange={(value) => console.log(value)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">FaceRating</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a decorative morphing face above a{" "}
          <InlineCode>radiogroup</InlineCode> of five segment buttons, movable
          with <InlineCode>ArrowLeft</InlineCode> and{" "}
          <InlineCode>ArrowRight</InlineCode>. Pass{" "}
          <InlineCode>value</InlineCode> to control it from outside, or{" "}
          <InlineCode>defaultValue</InlineCode> to let it manage its own state.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "value",
                required: false,
                type: "number",
                description:
                  "Controlled rating from 1-5; 0 means unset. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultValue",
                required: false,
                type: "number",
                default: "0",
                description: "Initial rating when uncontrolled; 0 means unset",
              },
              {
                prop: "onValueChange",
                required: false,
                type: "(value: number) => void",
                description: "Fires with the next rating on every commit",
              },
              {
                prop: "labels",
                required: false,
                type: "[string, string, string, string, string]",
                default: `["Terrible", "Bad", "Okay", "Good", "Amazing"]`,
                description:
                  "Mood names for levels 1-5, shown under the widget and read to screen readers",
              },
              {
                prop: "showLabel",
                required: false,
                type: "boolean",
                default: "true",
                description: "Show the mood label under the segments",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the widget (56 / 72 / 96px face)",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"How was your experience?"`,
                description: "Accessible name of the radio group",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the root container styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/face-rating/face-rating-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <FaceRatingSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
