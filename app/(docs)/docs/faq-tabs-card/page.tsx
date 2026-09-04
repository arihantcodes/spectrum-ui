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

import FAQTabsCardDemo from "./faq-tabs-card-demo"

export const metadata: Metadata = baseMetadata({
  title: "FAQ Tabs Card",
  description:
    "A tabbed FAQ card with animated accordion answers and a support footer. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "FAQ tabs card",
    "React FAQ component",
    "tabbed accordion",
    "animated FAQ accordion",
    "help center card",
    "support FAQ widget",
    "Next.js FAQ component",
    "Tailwind accordion tabs",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/faq-tabs-card",
})

const page = () => {
  const description =
    "A tabbed FAQ card with animated accordion answers and a support footer."

  return (
    <SEOWrapper
      componentName="FAQ Tabs Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/faq-tabs-card"
      keywords={[
        "FAQ tabs card",
        "React FAQ component",
        "tabbed accordion",
        "help center card",
      ]}
    >
      <PageTemplate title="FAQ Tabs Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/faq-tabs-card/faq-tabs-card-demo.tsx"
          installCodePath="components/spectrumui/faq-tabs-card.tsx"
          cli="@spectrumui/faq-tabs-card"
          installScript="npm i motion lucide-react"
        >
          <FAQTabsCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { FAQTabsCard } from "@/components/spectrumui/faq-tabs-card"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<FAQTabsCard
  tabs={[
    {
      label: "General",
      faqs: [{ question: "Is my data encrypted?", answer: "Yes, at rest and in transit." }],
    },
    {
      label: "Billing",
      faqs: [{ question: "Can I cancel anytime?", answer: "Yes, from the billing page." }],
    },
  ]}
  onFooterClick={() => console.log("contact support")}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">FAQTabsCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A pill tab bar switches between FAQ sets; within a set, one answer is open at
          a time and expands with a height animation. The footer button is a hook for
          a support action. Passing an empty <InlineCode>tabs</InlineCode> array falls
          back to the built-in sample content.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "tabs",
                required: false,
                type: "{ label: string; faqs: { question: string; answer: string }[] }[]",
                description: "Tab labels with their FAQ lists",
              },
              {
                prop: "defaultTab",
                required: false,
                type: "number",
                default: "0",
                description: "Index of the tab selected initially",
              },
              {
                prop: "defaultOpenIndex",
                required: false,
                type: "number",
                default: "0",
                description: "Index of the FAQ expanded initially; -1 for none",
              },
              {
                prop: "footerLabel",
                required: false,
                type: "string",
                default: `"Contact Support"`,
                description: "Footer button text",
              },
              {
                prop: "onFooterClick",
                required: false,
                type: "() => void",
                description: "Fires when the footer button is pressed",
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
