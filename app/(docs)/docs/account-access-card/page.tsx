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

import AccountAccessCardDemo from "./account-access-card-demo"

export const metadata: Metadata = baseMetadata({
  title: "Account Access Card",
  description:
    "A credentials card that auto-fills email and password on a loop, with a danger zone. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "account access card",
    "React credentials form",
    "animated login form",
    "auto typing form demo",
    "password field animation",
    "danger zone component",
    "Next.js account settings",
    "security settings card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/account-access-card",
})

const page = () => {
  const description =
    "A credentials card that auto-fills email and password on a loop, with a danger zone."

  return (
    <SEOWrapper
      componentName="Account Access Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/account-access-card"
      keywords={[
        "account access card",
        "React credentials form",
        "animated login form",
        "security settings card",
      ]}
    >
      <PageTemplate title="Account Access Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/account-access-card/account-access-card-demo.tsx"
          installCodePath="components/spectrumui/account-access-card.tsx"
          cli="@spectrumui/account-access-card"
          installScript="npm i motion lucide-react"
        >
          <AccountAccessCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { AccountAccessCard } from "@/components/spectrumui/account-access-card"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<AccountAccessCard
  credentials={[{ email: "alfa@spectrum.com", passwordLength: 14 }]}
  onSubmit={() => console.log("update security")}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">AccountAccessCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Cycles through <InlineCode>credentials</InlineCode>, typing each email and
          a masked password into the fields while the card is in view. Set{" "}
          <InlineCode>animated</InlineCode> to <InlineCode>false</InlineCode> to show{" "}
          <InlineCode>emailValue</InlineCode> and <InlineCode>passwordValue</InlineCode>{" "}
          statically. Users who prefer reduced motion see the first credential without
          typing.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "credentials",
                required: false,
                type: "{ email: string; passwordLength?: number }[]",
                description: "Accounts the card cycles through, typing each one in",
              },
              {
                prop: "animated",
                required: false,
                type: "boolean",
                default: "true",
                description: "Turn the auto-fill animation off and show static values",
              },
              {
                prop: "emailValue",
                required: false,
                type: "string",
                default: `"alfa@spectrum.com"`,
                description: "Email shown when animated is false",
              },
              {
                prop: "passwordValue",
                required: false,
                type: "string",
                description: "Masked password shown when animated is false",
              },
              {
                prop: "title",
                required: false,
                type: "string",
                default: `"Account Access"`,
                description: "Card heading",
              },
              {
                prop: "description",
                required: false,
                type: "string",
                default: `"Update your credentials or re-authenticate."`,
                description: "Supporting copy under the heading",
              },
              {
                prop: "emailLabel",
                required: false,
                type: "string",
                default: `"Email Address"`,
                description: "Label for the email field",
              },
              {
                prop: "passwordLabel",
                required: false,
                type: "string",
                default: `"Current Password"`,
                description: "Label for the password field",
              },
              {
                prop: "forgotLabel",
                required: false,
                type: "string",
                default: `"Forgot?"`,
                description: "Text of the forgot-password link",
              },
              {
                prop: "buttonLabel",
                required: false,
                type: "string",
                default: `"Update Security"`,
                description: "Primary button text",
              },
              {
                prop: "buttonIcon",
                required: false,
                type: "ReactNode",
                description: "Icon rendered inside the primary button; defaults to a lock",
              },
              {
                prop: "dangerTitle",
                required: false,
                type: "string",
                default: `"Danger Zone"`,
                description: "Heading of the danger row",
              },
              {
                prop: "dangerDescription",
                required: false,
                type: "string",
                default: `"Archive account and remove access"`,
                description: "Copy of the danger row",
              },
              {
                prop: "onSubmit",
                required: false,
                type: "() => void",
                description: "Fires when the primary button is pressed",
              },
              {
                prop: "onForgot",
                required: false,
                type: "() => void",
                description: "Fires when the forgot-password link is pressed",
              },
              {
                prop: "onDanger",
                required: false,
                type: "() => void",
                description: "Fires when the danger row is pressed",
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
