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

import SwipeToDeleteDemo from "./swipe-to-delete-demo"
import SwipeToDeleteCustomDemo from "./swipe-to-delete-custom-demo"

export const metadata: Metadata = baseMetadata({
  title: "Swipe to Delete",
  description:
    "A swipeable list item that reveals an iOS-style delete action on drag. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "swipe to delete component",
    "React swipe to delete",
    "swipeable list item",
    "swipe actions component",
    "iOS swipe gesture web",
    "drag to delete",
    "framer motion drag",
    "Next.js swipe to delete",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/swipe-to-delete",
})

const page = () => {
  const description =
    "A swipeable list item that reveals an iOS-style delete action on drag."

  return (
    <SEOWrapper
      componentName="Swipe to Delete"
      description={description}
      url="https://ui.spectrumhq.in/docs/swipe-to-delete"
      keywords={[
        "swipe to delete component",
        "swipeable list item",
        "swipe actions component",
        "drag to delete",
      ]}
    >
      <PageTemplate title="Swipe to Delete" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/swipe-to-delete/swipe-to-delete-demo.tsx"
          installCodePath="components/spectrumui/swipe-to-delete.tsx"
          cli="@spectrumui/swipe-to-delete"
          installScript="npm i framer-motion lucide-react"
        >
          <SwipeToDeleteDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { SwipeToDelete } from "@/components/spectrumui/swipe-to-delete"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<SwipeToDelete label="email from Ava" onDelete={() => removeEmail(id)}>
  <EmailRow />
</SwipeToDelete>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">SwipeToDelete</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Wraps its <InlineCode>children</InlineCode> as the draggable row of a{" "}
          <InlineCode>role=&quot;group&quot;</InlineCode> wrapper named by{" "}
          <InlineCode>label</InlineCode>. Pressing Delete or Backspace while the
          wrapper is focused deletes the row, and{" "}
          <InlineCode>onDelete</InlineCode> fires only after the collapse
          animation finishes — remove the item from state there.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "onDelete",
                required: true,
                type: "() => void",
                description:
                  "Fires once the collapse animation finishes; remove the item here",
              },
              {
                prop: "children",
                required: true,
                type: "ReactNode",
                description: "Row content rendered on the draggable surface",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"item"`,
                description:
                  "Accessible name of the row; also used for the delete zone label",
              },
              {
                prop: "actionWidth",
                required: false,
                type: "number",
                default: "96",
                description: "Width in pixels of the revealed delete zone",
              },
              {
                prop: "threshold",
                required: false,
                type: "number",
                default: "0.6",
                description:
                  "Fraction of actionWidth the drag must pass to commit the delete",
              },
              {
                prop: "revealOnHover",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Nudge the row on hover or focus to preview the delete zone on pointer devices",
              },
              {
                prop: "hoverPeek",
                required: false,
                type: "number",
                default: "56",
                description:
                  "How far in pixels the row nudges left for the hover preview",
              },
              {
                prop: "disabled",
                required: false,
                type: "boolean",
                default: "false",
                description:
                  "Disables dragging, the delete zone and keyboard deletion",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default wrapper styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Custom action width and threshold
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/swipe-to-delete/swipe-to-delete-custom-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <SwipeToDeleteCustomDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
