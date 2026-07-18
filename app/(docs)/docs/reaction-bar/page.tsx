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

import ReactionBarDemo from "./reaction-bar-demo"
import ReactionBarControlledDemo from "./reaction-bar-controlled-demo"

export const metadata: Metadata = baseMetadata({
  title: "Reaction Bar",
  description:
    "A Slack-style emoji reaction bar with animated chips and rolling counts. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "reaction bar component",
    "React emoji reactions",
    "Slack style reactions",
    "emoji picker popover",
    "animated reaction chips",
    "micro interaction component",
    "framer motion reactions",
    "Next.js reaction bar",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/reaction-bar",
})

const page = () => {
  const description =
    "A Slack-style emoji reaction bar with animated chips and rolling counts."

  return (
    <SEOWrapper
      componentName="Reaction Bar"
      description={description}
      url="https://ui.spectrumhq.in/docs/reaction-bar"
      keywords={[
        "reaction bar component",
        "React emoji reactions",
        "Slack style reactions",
        "animated reaction chips",
      ]}
    >
      <PageTemplate title="Reaction Bar" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/reaction-bar/reaction-bar-demo.tsx"
          installCodePath="components/spectrumui/reaction-bar.tsx"
          cli="@spectrumui/reaction-bar"
          installScript="npm i framer-motion lucide-react"
        >
          <ReactionBarDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { ReactionBar } from "@/components/spectrumui/reaction-bar"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<ReactionBar
  defaultReactions={[
    { emoji: "👍", count: 3, reacted: true },
    { emoji: "🎉", count: 1 },
  ]}
  onReactionsChange={(reactions) => console.log(reactions)}
/>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">ReactionBar</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a row of reaction chips, each a{" "}
          <InlineCode>button</InlineCode> with{" "}
          <InlineCode>aria-pressed</InlineCode> reflecting whether you have
          reacted. Reactions use the exported{" "}
          <InlineCode>Reaction</InlineCode> type:{" "}
          <InlineCode>{`{ emoji: string; count: number; reacted?: boolean }`}</InlineCode>
          . Pass <InlineCode>reactions</InlineCode> to control the list from
          outside, or <InlineCode>defaultReactions</InlineCode> to let it manage
          its own state. Toggling a chip adjusts its count by one, and a chip
          whose count reaches zero is removed.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "reactions",
                required: false,
                type: "Reaction[]",
                description:
                  "Controlled reactions. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultReactions",
                required: false,
                type: "Reaction[]",
                default: "[]",
                description: "Initial reactions when uncontrolled",
              },
              {
                prop: "onReactionsChange",
                required: false,
                type: "(reactions: Reaction[]) => void",
                description:
                  "Fires with the next reactions array on every change",
              },
              {
                prop: "availableEmojis",
                required: false,
                type: "string[]",
                default: `["👍", "❤️", "😂", "🎉", "😮", "🚀"]`,
                description: "Emojis offered in the add popover",
              },
              {
                prop: "addable",
                required: false,
                type: "boolean",
                default: "true",
                description: "Show the plus button that opens the emoji popover",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Visual size of the chips",
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
          Controlled and read-only
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/reaction-bar/reaction-bar-controlled-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <ReactionBarControlledDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
