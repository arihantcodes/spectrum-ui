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

import QuantityStepperDemo from "./quantity-stepper-demo"
import QuantityStepperSizesDemo from "./quantity-stepper-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Quantity Stepper",
  description:
    "A quantity input with rolling digits, hold-to-repeat buttons, and boundary shake. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "quantity stepper component",
    "React quantity input",
    "number stepper animation",
    "cart quantity selector",
    "animated counter input",
    "hold to repeat button",
    "framer motion stepper",
    "Next.js quantity stepper",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/quantity-stepper",
})

const page = () => {
  const description =
    "A quantity input with rolling digits, hold-to-repeat buttons, and boundary shake."

  return (
    <SEOWrapper
      componentName="Quantity Stepper"
      description={description}
      url="https://ui.spectrumhq.in/docs/quantity-stepper"
      keywords={[
        "quantity stepper component",
        "React quantity input",
        "cart quantity selector",
        "animated counter input",
      ]}
    >
      <PageTemplate title="Quantity Stepper" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/quantity-stepper/quantity-stepper-demo.tsx"
          installCodePath="components/spectrumui/quantity-stepper.tsx"
          cli="@spectrumui/quantity-stepper"
          installScript="npm i framer-motion lucide-react"
        >
          <QuantityStepperDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { QuantityStepper } from "@/components/spectrumui/quantity-stepper"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<QuantityStepper min={1} max={10} onValueChange={(value) => console.log(value)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">QuantityStepper</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a <InlineCode>group</InlineCode> containing a keyboard
          operable <InlineCode>spinbutton</InlineCode> value between two step
          buttons. Pass <InlineCode>value</InlineCode> to control it from
          outside, or <InlineCode>defaultValue</InlineCode> to let it manage
          its own state. The value is always clamped to{" "}
          <InlineCode>min</InlineCode> and <InlineCode>max</InlineCode>.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "value",
                required: false,
                type: "number",
                description:
                  "Controlled value. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultValue",
                required: false,
                type: "number",
                default: "1",
                description: "Initial value when uncontrolled",
              },
              {
                prop: "onValueChange",
                required: false,
                type: "(value: number) => void",
                description: "Fires with the next clamped value on every change",
              },
              {
                prop: "min",
                required: false,
                type: "number",
                default: "0",
                description: "Lowest allowed value",
              },
              {
                prop: "max",
                required: false,
                type: "number",
                default: "99",
                description: "Highest allowed value",
              },
              {
                prop: "step",
                required: false,
                type: "number",
                default: "1",
                description:
                  "Amount added or removed per press. PageUp and PageDown jump by ten steps",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the stepper",
              },
              {
                prop: "disabled",
                required: false,
                type: "boolean",
                default: "false",
                description: "Disables pointer and keyboard interaction",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default pill styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Sizes and limits</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/quantity-stepper/quantity-stepper-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <QuantityStepperSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
