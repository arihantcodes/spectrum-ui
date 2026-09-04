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

import RecentActivityDemo from "./recent-activity-demo"

export const metadata: Metadata = baseMetadata({
  title: "Recent Activity",
  description:
    "An activity feed card that lists agent runs with duration and recency chips. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "recent activity component",
    "React activity feed",
    "activity log card",
    "agent run history",
    "timeline list component",
    "dashboard activity widget",
    "Next.js activity feed",
    "Tailwind activity list",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/recent-activity",
})

const page = () => {
  const description =
    "An activity feed card that lists agent runs with duration and recency chips."

  return (
    <SEOWrapper
      componentName="Recent Activity"
      description={description}
      url="https://ui.spectrumhq.in/docs/recent-activity"
      keywords={[
        "recent activity component",
        "React activity feed",
        "activity log card",
        "dashboard activity widget",
      ]}
    >
      <PageTemplate title="Recent Activity" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/recent-activity/recent-activity-demo.tsx"
          installCodePath="components/spectrumui/recent-activity.tsx"
          cli="@spectrumui/recent-activity"
          installScript="npm i motion lucide-react"
        >
          <RecentActivityDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { RecentActivity } from "@/components/spectrumui/recent-activity"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<RecentActivity
  title="Recent Activity"
  items={[
    { title: "Peer Review", duration: "15s", description: "Reviewed and approved 3 pull requests", timeAgo: "30H" },
    { title: "SEO Audit", duration: "5m", description: "Checked 50 web pages for issues", timeAgo: "12H" },
  ]}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">RecentActivity</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A framed card with a titled header and one row per item. Rows fade in as
          they scroll into view. The duration chip sits next to the title and the
          recency chip is right-aligned; both are optional.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "items",
                required: false,
                type: "{ icon?: ReactNode; title: string; duration?: string; description: string; timeAgo?: string }[]",
                description: "Rows to render, top to bottom",
              },
              {
                prop: "title",
                required: false,
                type: "string",
                default: `"Recent Activity"`,
                description: "Header text",
              },
              {
                prop: "titleIcon",
                required: false,
                type: "ReactNode",
                description: "Icon rendered before the title; defaults to a workflow glyph",
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
