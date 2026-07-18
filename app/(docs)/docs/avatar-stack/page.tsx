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

import AvatarStackDemo from "./avatar-stack-demo"
import AvatarStackSizesDemo from "./avatar-stack-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Avatar Stack",
  description:
    "An overlapping avatar row that fans apart on hover with springy name tooltips. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "avatar stack component",
    "React avatar group",
    "overlapping avatars",
    "avatar tooltip animation",
    "facepile component",
    "team members avatars",
    "framer motion avatars",
    "Next.js avatar stack",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/avatar-stack",
})

const page = () => {
  const description =
    "An overlapping avatar row that fans apart on hover with springy name tooltips."

  return (
    <SEOWrapper
      componentName="Avatar Stack"
      description={description}
      url="https://ui.spectrumhq.in/docs/avatar-stack"
      keywords={[
        "avatar stack component",
        "React avatar group",
        "overlapping avatars",
        "facepile component",
      ]}
    >
      <PageTemplate title="Avatar Stack" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/avatar-stack/avatar-stack-demo.tsx"
          installCodePath="components/spectrumui/avatar-stack.tsx"
          cli="@spectrumui/avatar-stack"
          installScript="npm i framer-motion"
        >
          <AvatarStackDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { AvatarStack } from "@/components/spectrumui/avatar-stack"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<AvatarStack
  items={[
    { name: "Arjun Mehta", src: "/avatars/01.png" },
    { name: "Priya Nair" },
    { name: "Noah Kim" },
  ]}
  onAvatarClick={(item) => console.log(item.name)}
/>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">AvatarStack</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a <InlineCode>role=&quot;group&quot;</InlineCode> of avatar
          buttons with roving arrow-key focus; each item is an{" "}
          <InlineCode>AvatarItem</InlineCode> of shape{" "}
          <InlineCode>{`{ name: string; src?: string }`}</InlineCode>. When{" "}
          <InlineCode>src</InlineCode> is omitted, initials are derived from the
          first two words of <InlineCode>name</InlineCode>. The name also
          becomes the button&apos;s <InlineCode>aria-label</InlineCode> and the
          tooltip text, and <InlineCode>Escape</InlineCode> collapses an
          expanded stack.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "items",
                required: true,
                type: "AvatarItem[]",
                description:
                  "People to render; the first max are visible, the rest sit behind the +N pill",
              },
              {
                prop: "max",
                required: false,
                type: "number",
                default: "4",
                description:
                  "Number of avatars shown before overflowing into the +N pill",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Avatar diameter: 28, 36 or 44px",
              },
              {
                prop: "expandable",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Whether clicking the +N pill expands the hidden avatars with a stagger",
              },
              {
                prop: "onAvatarClick",
                required: false,
                type: "(item: AvatarItem, index: number) => void",
                description:
                  "Fires when an avatar is clicked or activated with Enter/Space",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged onto the group container",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Sizes</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/avatar-stack/avatar-stack-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <AvatarStackSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
