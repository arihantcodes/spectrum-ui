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

import ShareButtonDemo from "./share-button-demo"
import ShareButtonDirectionDemo from "./share-button-direction-demo"

export const metadata: Metadata = baseMetadata({
  title: "Share Button",
  description:
    "A share button that fans out into copy-link and custom share actions. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "share button component",
    "React share button",
    "share menu animation",
    "copy link button",
    "micro interaction component",
    "fan out menu",
    "framer motion button",
    "Next.js share button",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/share-button",
})

const page = () => {
  const description =
    "A share button that fans out into copy-link and custom share actions."

  return (
    <SEOWrapper
      componentName="Share Button"
      description={description}
      url="https://ui.spectrumhq.in/docs/share-button"
      keywords={[
        "share button component",
        "share menu animation",
        "copy link button",
        "micro interaction component",
      ]}
    >
      <PageTemplate title="Share Button" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/share-button/share-button-demo.tsx"
          installCodePath="components/spectrumui/share-button.tsx"
          cli="@spectrumui/share-button"
          installScript="npm i framer-motion lucide-react"
        >
          <ShareButtonDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { ShareButton } from "@/components/spectrumui/share-button"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<ShareButton
  copyValue="https://ui.spectrumhq.in"
  actions={[
    { icon: <Twitter size={15} />, label: "Share on X", onSelect: () => shareOnX() },
  ]}
/>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">ShareButton</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a round trigger <InlineCode>button</InlineCode> with{" "}
          <InlineCode>aria-expanded</InlineCode> and{" "}
          <InlineCode>aria-haspopup</InlineCode>, and an action row with{" "}
          <InlineCode>role=&quot;menu&quot;</InlineCode>. Each entry in{" "}
          <InlineCode>actions</InlineCode> is a{" "}
          <InlineCode>ShareAction</InlineCode>:{" "}
          <InlineCode>icon: React.ReactNode</InlineCode> rendered inside the
          round button, <InlineCode>label: string</InlineCode> used as the
          tooltip and accessible name, and{" "}
          <InlineCode>onSelect: () =&gt; void</InlineCode> fired on click. When{" "}
          <InlineCode>copyValue</InlineCode> is set, a copy-link button is
          prepended that writes to the clipboard and flashes an emerald check.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "actions",
                required: false,
                type: "ShareAction[]",
                default: "[]",
                description:
                  "Custom actions fanned out after the built-in copy action",
              },
              {
                prop: "copyValue",
                required: false,
                type: "string",
                description:
                  "URL or text for the built-in copy-link first action; omit to hide it",
              },
              {
                prop: "direction",
                required: false,
                type: `"left" | "right"`,
                default: `"right"`,
                description: "Side the actions fan out toward",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description:
                  "Visual size of the trigger; actions are one step smaller",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Share"`,
                description: "Accessible name of the trigger",
              },
              {
                prop: "closeOnSelect",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Collapse the row shortly after a custom action is selected",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged onto the root element",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Direction and sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/share-button/share-button-direction-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <ShareButtonDirectionDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
