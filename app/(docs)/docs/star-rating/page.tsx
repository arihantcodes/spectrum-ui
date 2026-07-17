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

import StarRatingDemo from "./star-rating-demo"
import StarRatingReadonlyDemo from "./star-rating-readonly-demo"

export const metadata: Metadata = baseMetadata({
  title: "Star Rating",
  description:
    "An animated star rating input with hover preview and sparkle burst effects. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "star rating component",
    "React star rating",
    "rating input animation",
    "micro interaction component",
    "animated rating stars",
    "framer motion rating",
    "accessible star rating",
    "Next.js star rating",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/star-rating",
})

const page = () => {
  const description =
    "An animated star rating input with hover preview and sparkle burst effects."

  return (
    <SEOWrapper
      componentName="Star Rating"
      description={description}
      url="https://ui.spectrumhq.in/docs/star-rating"
      keywords={[
        "star rating component",
        "rating input animation",
        "micro interaction component",
        "animated rating stars",
      ]}
    >
      <PageTemplate title="Star Rating" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/star-rating/star-rating-demo.tsx"
          installCodePath="components/spectrumui/star-rating.tsx"
          cli="@spectrumui/star-rating"
          installScript="npm i framer-motion"
        >
          <StarRatingDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { StarRating } from "@/components/spectrumui/star-rating"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<StarRating showValue onValueChange={(value) => console.log(value)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">StarRating</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a <InlineCode>radiogroup</InlineCode> of star buttons with
          full arrow-key, Home/End and Space/Enter keyboard support. Pass{" "}
          <InlineCode>value</InlineCode> to control it from outside, or{" "}
          <InlineCode>defaultValue</InlineCode> to let it manage its own state.
          In <InlineCode>readOnly</InlineCode> mode it renders a static,
          fraction-capable display.
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
                  "Controlled rating value. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultValue",
                required: false,
                type: "number",
                default: "0",
                description: "Initial rating when uncontrolled",
              },
              {
                prop: "onValueChange",
                required: false,
                type: "(value: number) => void",
                description: "Fires with the next rating on every commit",
              },
              {
                prop: "max",
                required: false,
                type: "number",
                default: "5",
                description: "Number of stars rendered",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the stars (16 / 22 / 28 px icons)",
              },
              {
                prop: "allowClear",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Clicking the committed star again clears the rating to 0",
              },
              {
                prop: "readOnly",
                required: false,
                type: "boolean",
                default: "false",
                description:
                  "Display-only mode without hover or click interactivity; supports fractional values like 4.3",
              },
              {
                prop: "showValue",
                required: false,
                type: "boolean",
                default: "false",
                description:
                  'Show a rolling "4/5" value label that tracks the current or previewed rating',
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Rating"`,
                description: "Accessible name of the rating group",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default container styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Read-only and sizes
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/star-rating/star-rating-readonly-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <StarRatingReadonlyDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
