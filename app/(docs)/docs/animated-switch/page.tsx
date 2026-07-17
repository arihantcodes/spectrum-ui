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

import AnimatedSwitchDemo from "./animated-switch-demo"
import AnimatedSwitchIconsDemo from "./animated-switch-icons-demo"

export const metadata: Metadata = baseMetadata({
  title: "Animated Switch",
  description:
    "An iOS-style toggle switch with a stretchy knob you can drag or flick. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "animated switch component",
    "React toggle switch",
    "iOS switch animation",
    "drag to toggle switch",
    "knob stretch animation",
    "framer motion switch",
    "accessible switch component",
    "Next.js switch component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animated-switch",
})

const page = () => {
  const description =
    "An iOS-style toggle switch with a stretchy knob you can drag or flick."

  return (
    <SEOWrapper
      componentName="Animated Switch"
      description={description}
      url="https://ui.spectrumhq.in/docs/animated-switch"
      keywords={[
        "animated switch component",
        "iOS switch animation",
        "drag to toggle switch",
        "knob stretch animation",
      ]}
    >
      <PageTemplate title="Animated Switch" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/animated-switch/animated-switch-demo.tsx"
          installCodePath="components/spectrumui/animated-switch.tsx"
          cli="@spectrumui/animated-switch"
          installScript="npm i framer-motion"
        >
          <AnimatedSwitchDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { AnimatedSwitch } from "@/components/spectrumui/animated-switch"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<AnimatedSwitch defaultChecked onCheckedChange={(checked) => console.log(checked)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">AnimatedSwitch</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element with{" "}
          <InlineCode>role=&quot;switch&quot;</InlineCode> and{" "}
          <InlineCode>aria-checked</InlineCode> reflecting the state. Pass{" "}
          <InlineCode>checked</InlineCode> to control it from outside, or{" "}
          <InlineCode>defaultChecked</InlineCode> to let it manage its own
          state.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "checked",
                required: false,
                type: "boolean",
                description:
                  "Controlled checked state. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultChecked",
                required: false,
                type: "boolean",
                default: "false",
                description: "Initial checked state when uncontrolled",
              },
              {
                prop: "onCheckedChange",
                required: false,
                type: "(checked: boolean) => void",
                description:
                  "Fires with the next checked state whenever a toggle commits — by click, keyboard, drag or flick",
              },
              {
                prop: "onIcon",
                required: false,
                type: "React.ReactNode",
                description:
                  "Icon shown inside the knob while on; crossfades with offIcon on toggle",
              },
              {
                prop: "offIcon",
                required: false,
                type: "React.ReactNode",
                description:
                  "Icon shown inside the knob while off; crossfades with onIcon on toggle",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description:
                  "Visual size of the switch — 32×18, 44×24 or 56×30 track",
              },
              {
                prop: "disabled",
                required: false,
                type: "boolean",
                default: "false",
                description: "Disables pointer and keyboard interaction",
              },
              {
                prop: "label",
                required: false,
                type: "string",
                default: `"Toggle"`,
                description: "Accessible name of the switch",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default track styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Icons and sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/animated-switch/animated-switch-icons-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <AnimatedSwitchIconsDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
