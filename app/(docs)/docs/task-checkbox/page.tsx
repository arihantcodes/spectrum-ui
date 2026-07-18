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

import TaskCheckboxDemo from "./task-checkbox-demo"
import TaskCheckboxSizesDemo from "./task-checkbox-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Task Checkbox",
  description:
    "A todo checkbox that celebrates completion with a confetti burst and strikethrough. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "task checkbox component",
    "React checkbox animation",
    "todo list checkbox",
    "animated strikethrough",
    "confetti checkbox",
    "micro interaction component",
    "framer motion checkbox",
    "Next.js checkbox",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/task-checkbox",
})

const page = () => {
  const description =
    "A todo checkbox that celebrates completion with a confetti burst and strikethrough."

  return (
    <SEOWrapper
      componentName="Task Checkbox"
      description={description}
      url="https://ui.spectrumhq.in/docs/task-checkbox"
      keywords={[
        "task checkbox component",
        "todo list checkbox",
        "animated strikethrough",
        "confetti checkbox",
      ]}
    >
      <PageTemplate title="Task Checkbox" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/task-checkbox/task-checkbox-demo.tsx"
          installCodePath="components/spectrumui/task-checkbox.tsx"
          cli="@spectrumui/task-checkbox"
          installScript="npm i framer-motion"
        >
          <TaskCheckboxDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { TaskCheckbox } from "@/components/spectrumui/task-checkbox"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<TaskCheckbox label="Ship the changelog" onCheckedChange={(checked) => console.log(checked)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">TaskCheckbox</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a row with a <InlineCode>button</InlineCode> exposing{" "}
          <InlineCode>role=&quot;checkbox&quot;</InlineCode> and{" "}
          <InlineCode>aria-checked</InlineCode>; the label text toggles too.
          Pass <InlineCode>checked</InlineCode> to control it from outside, or{" "}
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
                description: "Fires with the next checked state on every toggle",
              },
              {
                prop: "label",
                required: true,
                type: "React.ReactNode",
                description:
                  "Task text next to the box; struck through while checked",
              },
              {
                prop: "description",
                required: false,
                type: "React.ReactNode",
                description: "Optional secondary line rendered under the label",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the row",
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
                  "Additional classes merged onto the row wrapper",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/task-checkbox/task-checkbox-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <TaskCheckboxSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
