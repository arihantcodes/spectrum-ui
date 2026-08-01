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

import NotificationBellDemo from "./notification-bell-demo"
import NotificationBellDotDemo from "./notification-bell-dot-demo"

export const metadata: Metadata = baseMetadata({
  title: "Notification Bell",
  description:
    "A bell button that swings on new notifications with a rolling unread badge. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "notification bell component",
    "React notification bell",
    "bell shake animation",
    "unread badge component",
    "micro interaction component",
    "animated badge counter",
    "framer motion bell",
    "Next.js notification bell",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/notification-bell",
})

const page = () => {
  const description =
    "A bell button that swings on new notifications with a rolling unread badge."

  return (
    <SEOWrapper
      componentName="Notification Bell"
      description={description}
      url="https://ui.spectrumhq.in/docs/notification-bell"
      keywords={[
        "notification bell component",
        "bell shake animation",
        "unread badge component",
        "micro interaction component",
      ]}
    >
      <PageTemplate title="Notification Bell" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/notification-bell/notification-bell-demo.tsx"
          installCodePath="components/spectrumui/notification-bell.tsx"
          cli="@spectrumui/notification-bell"
          installScript="npm i framer-motion"
        >
          <NotificationBellDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { NotificationBell } from "@/components/spectrumui/notification-bell"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<NotificationBell count={3} onClick={() => console.log("open inbox")} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">NotificationBell</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element whose{" "}
          <InlineCode>aria-label</InlineCode> reflects the unread count. The
          bell swings automatically whenever <InlineCode>count</InlineCode>{" "}
          increases, and unread changes are announced through a polite live
          region.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "count",
                required: false,
                type: "number",
                default: "0",
                description:
                  "Number of unread notifications. Increases trigger the ring-3 swing and badge animations",
              },
              {
                prop: "max",
                required: false,
                type: "number",
                default: "99",
                description: `Counts above this render as "max+" (99+ by default)`,
              },
              {
                prop: "dot",
                required: false,
                type: "boolean",
                default: "false",
                description:
                  "Show a small pinging dot instead of the numeric badge",
              },
              {
                prop: "ringOnMount",
                required: false,
                type: "boolean",
                default: "false",
                description: "Play the ring-3 swing once when the component mounts",
              },
              {
                prop: "onClick",
                required: false,
                type: "React.MouseEventHandler<HTMLButtonElement>",
                description: "Click handler for the bell button",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the button",
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
        <PageSectionTitle className="mt-0">Dot mode and sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/notification-bell/notification-bell-dot-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <NotificationBellDotDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
