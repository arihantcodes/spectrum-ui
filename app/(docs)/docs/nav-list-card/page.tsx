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

import NavListCardDemo from "./nav-list-card-demo"

export const metadata: Metadata = baseMetadata({
  title: "Nav List Card",
  description:
    "A compact navigation card that lists links with icons, with a spring slide on hover. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "nav list card",
    "React navigation card",
    "sidebar link list",
    "icon link list component",
    "hover slide animation",
    "settings navigation menu",
    "Next.js nav component",
    "Tailwind link card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/nav-list-card",
})

const page = () => {
  const description =
    "A compact navigation card that lists links with icons, with a spring slide on hover."

  return (
    <SEOWrapper
      componentName="Nav List Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/nav-list-card"
      keywords={[
        "nav list card",
        "React navigation card",
        "icon link list component",
        "settings navigation menu",
      ]}
    >
      <PageTemplate title="Nav List Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/nav-list-card/nav-list-card-demo.tsx"
          installCodePath="components/spectrumui/nav-list-card.tsx"
          cli="@spectrumui/nav-list-card"
          installScript="npm i motion lucide-react"
        >
          <NavListCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { NavListCard } from "@/components/spectrumui/nav-list-card"
import { BookOpen, CircleHelp } from "lucide-react"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<NavListCard
  title="Support"
  items={[
    { icon: <CircleHelp />, label: "Help Center", href: "/help" },
    { icon: <BookOpen />, label: "Docs", href: "/docs" },
  ]}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">NavListCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a small titled card with one pill row per item. Items with an{" "}
          <InlineCode>href</InlineCode> render as links, the rest as buttons. Two
          item sets ship with the component: <InlineCode>PLANNING_NAV_ITEMS</InlineCode>{" "}
          (the default) and <InlineCode>SUPPORT_NAV_ITEMS</InlineCode>.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "items",
                required: false,
                type: "{ icon?: ReactNode; label: string; href?: string }[]",
                description: "Rows to render; defaults to PLANNING_NAV_ITEMS",
              },
              {
                prop: "title",
                required: false,
                type: "string",
                default: `"Planning"`,
                description: "Small caption above the list",
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
