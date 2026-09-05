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

import AIChatCardDemo from "./ai-chat-card-demo"

export const metadata: Metadata = baseMetadata({
  title: "AI Chat Card",
  description:
    "An AI chat card that types prompts into its composer, with send, attach and reset actions. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "AI chat card",
    "React chat composer",
    "AI assistant UI component",
    "chat input animation",
    "typewriter prompt demo",
    "LLM chat interface",
    "Next.js chat component",
    "AI app UI kit",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/ai-chat-card",
})

const page = () => {
  const description =
    "An AI chat card that types prompts into its composer, with send, attach and reset actions."

  return (
    <SEOWrapper
      componentName="AI Chat Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/ai-chat-card"
      keywords={[
        "AI chat card",
        "React chat composer",
        "AI assistant UI component",
        "LLM chat interface",
      ]}
    >
      <PageTemplate title="AI Chat Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/ai-chat-card/ai-chat-card-demo.tsx"
          installCodePath="components/spectrumui/ai-chat-card.tsx"
          cli="@spectrumui/ai-chat-card"
          installScript="npm i motion lucide-react"
        >
          <AIChatCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { AIChatCard } from "@/components/spectrumui/ai-chat-card"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<AIChatCard
  greeting="Morning, Arihant!"
  prompts={["Make my hero section feel more premium", "Add a pricing table"]}
  onSend={(message) => console.log(message)}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">AIChatCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Shows an empty-state greeting above a composer. While in view the composer
          types each entry of <InlineCode>prompts</InlineCode> on a loop; clicking into
          it hands the text over to the user and stops the typing. The reset button in
          the header clears the composer and restarts the loop.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "prompts",
                required: false,
                type: "string[]",
                description: "Prompts the composer types out on a loop",
              },
              {
                prop: "autoType",
                required: false,
                type: "boolean",
                default: "true",
                description: "Turn the prompt-typing animation off",
              },
              {
                prop: "title",
                required: false,
                type: "string",
                default: `"New Chat"`,
                description: "Header title",
              },
              {
                prop: "subtitle",
                required: false,
                type: "string",
                default: `"How can I help you today?"`,
                description: "Header subtitle",
              },
              {
                prop: "greeting",
                required: false,
                type: "string",
                default: `"Morning, Arihant!"`,
                description: "Empty-state heading",
              },
              {
                prop: "prompt",
                required: false,
                type: "string",
                description: "Empty-state copy under the greeting",
              },
              {
                prop: "placeholder",
                required: false,
                type: "string",
                default: `"Ask anything…"`,
                description: "Composer placeholder while empty",
              },
              {
                prop: "icon",
                required: false,
                type: "ReactNode",
                description: "Empty-state icon; defaults to a dashed chat bubble",
              },
              {
                prop: "onSend",
                required: false,
                type: "(message: string) => void",
                description: "Fires with the composer text when send is pressed",
              },
              {
                prop: "onReset",
                required: false,
                type: "() => void",
                description: "Fires when the header reset button is pressed",
              },
              {
                prop: "onAttach",
                required: false,
                type: "() => void",
                description: "Fires when the attach button is pressed",
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
