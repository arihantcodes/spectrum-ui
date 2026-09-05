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

import CommandSearchDemo from "./command-search-demo"

export const metadata: Metadata = baseMetadata({
  title: "Command Search",
  description:
    "A command palette that types queries and live-filters grouped results, with keyboard navigation. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "command search component",
    "React command palette",
    "search palette animation",
    "typewriter search demo",
    "keyboard navigable list",
    "grouped search results",
    "Next.js command menu",
    "shadcn command palette",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/command-search",
})

const page = () => {
  const description =
    "A command palette that types queries and live-filters grouped results, with keyboard navigation."

  return (
    <SEOWrapper
      componentName="Command Search"
      description={description}
      url="https://ui.spectrumhq.in/docs/command-search"
      keywords={[
        "command search component",
        "React command palette",
        "typewriter search demo",
        "grouped search results",
      ]}
    >
      <PageTemplate title="Command Search" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/command-search/command-search-demo.tsx"
          installCodePath="components/spectrumui/command-search.tsx"
          cli="@spectrumui/command-search"
          installScript="npm i motion lucide-react"
        >
          <CommandSearchDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { CommandSearch } from "@/components/spectrumui/command-search"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<CommandSearch
  queries={["chart", "button", "pricing"]}
  onSelect={(item) => console.log(item.label)}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">CommandSearch</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a <InlineCode>listbox</InlineCode> with a search field on top. By
          default it types each entry of <InlineCode>queries</InlineCode> into the
          field and filters <InlineCode>groups</InlineCode> as it goes; the typing
          pauses while the palette is off-screen. Arrow keys move the highlight and{" "}
          <InlineCode>Enter</InlineCode> selects.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "groups",
                required: false,
                type: "{ label: string; items: { label: string; icon?: ReactNode }[] }[]",
                description: "Grouped results rendered below the search field",
              },
              {
                prop: "queries",
                required: false,
                type: "string[]",
                description: "Queries the palette types out and live-filters by",
              },
              {
                prop: "autoType",
                required: false,
                type: "boolean",
                default: "true",
                description: "Type the queries automatically; set false to show a static query",
              },
              {
                prop: "query",
                required: false,
                type: "string",
                default: `"anim"`,
                description: "Static text for the search field when autoType is false",
              },
              {
                prop: "placeholder",
                required: false,
                type: "string",
                default: `"Search…"`,
                description: "Placeholder shown while the field is empty",
              },
              {
                prop: "onSelect",
                required: false,
                type: "(item: CommandSearchItem) => void",
                description: "Called with the item when a row is clicked or chosen with Enter",
              },
              {
                prop: "height",
                required: false,
                type: "number",
                default: "408",
                description: "Fixed height of the palette; overflowing results are clipped",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description: "Additional classes merged with the root styles",
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
