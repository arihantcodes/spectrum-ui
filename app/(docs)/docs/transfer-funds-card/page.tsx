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

import TransferFundsCardDemo from "./transfer-funds-card-demo"

export const metadata: Metadata = baseMetadata({
  title: "Transfer Funds Card",
  description:
    "A money transfer form card with account pickers, a summary and a confirm action. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "transfer funds card",
    "React payment form",
    "money transfer UI",
    "fintech form component",
    "banking dashboard card",
    "account picker form",
    "Next.js payment component",
    "Tailwind fintech UI",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/transfer-funds-card",
})

const page = () => {
  const description =
    "A money transfer form card with account pickers, a summary and a confirm action."

  return (
    <SEOWrapper
      componentName="Transfer Funds Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/transfer-funds-card"
      keywords={[
        "transfer funds card",
        "React payment form",
        "fintech form component",
        "banking dashboard card",
      ]}
    >
      <PageTemplate title="Transfer Funds Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/transfer-funds-card/transfer-funds-card-demo.tsx"
          installCodePath="components/spectrumui/transfer-funds-card.tsx"
          cli="@spectrumui/transfer-funds-card"
          installScript="npm i motion lucide-react"
        >
          <TransferFundsCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { TransferFundsCard } from "@/components/spectrumui/transfer-funds-card"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<TransferFundsCard
  amount="1,200.00"
  fromAccount="Main Checking (··8402) — ,450.00"
  toAccount="High Yield Savings (··1192) — ,100.00"
  onConfirm={() => console.log("confirm")}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">TransferFundsCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A presentational form: amount, source and destination pickers, a{" "}
          <InlineCode>summary</InlineCode> table and a confirm button. Every label and
          value is a prop, so the card can be wired to real data or used as a static
          showcase.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "amount",
                required: false,
                type: "string",
                default: `"1,200.00"`,
                description: "Formatted amount shown in the amount field",
              },
              {
                prop: "currencySymbol",
                required: false,
                type: "string",
                default: `"$"`,
                description: "Symbol shown before the amount",
              },
              {
                prop: "fromAccount",
                required: false,
                type: "string",
                description: "Text of the source account picker",
              },
              {
                prop: "toAccount",
                required: false,
                type: "string",
                description: "Text of the destination account picker",
              },
              {
                prop: "summary",
                required: false,
                type: "{ label: string; value: string; emphasized?: boolean }[]",
                description: "Rows of the summary table; emphasized rows render bold",
              },
              {
                prop: "title",
                required: false,
                type: "string",
                default: `"Transfer Funds"`,
                description: "Card heading",
              },
              {
                prop: "description",
                required: false,
                type: "string",
                default: `"Move money between your connected accounts."`,
                description: "Supporting copy under the heading",
              },
              {
                prop: "amountLabel",
                required: false,
                type: "string",
                default: `"Amount to Transfer"`,
                description: "Label for the amount field",
              },
              {
                prop: "fromLabel",
                required: false,
                type: "string",
                default: `"From Account"`,
                description: "Label for the source picker",
              },
              {
                prop: "toLabel",
                required: false,
                type: "string",
                default: `"To Account"`,
                description: "Label for the destination picker",
              },
              {
                prop: "buttonLabel",
                required: false,
                type: "string",
                default: `"Confirm Transfer"`,
                description: "Confirm button text",
              },
              {
                prop: "onConfirm",
                required: false,
                type: "() => void",
                description: "Fires when the confirm button is pressed",
              },
              {
                prop: "onClose",
                required: false,
                type: "() => void",
                description: "Fires when the close button in the header is pressed",
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
