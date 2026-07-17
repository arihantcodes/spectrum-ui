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

import FollowButtonDemo from "./follow-button-demo"
import FollowButtonSizesDemo from "./follow-button-sizes-demo"

export const metadata: Metadata = baseMetadata({
  title: "Follow Button",
  description:
    "A follow button that morphs its width, fill, and label between states. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "follow button component",
    "React follow button",
    "unfollow button animation",
    "morphing button component",
    "micro interaction component",
    "animated check icon",
    "framer motion button",
    "Next.js follow button",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/follow-button",
})

const page = () => {
  const description =
    "A follow button that morphs its width, fill, and label between states."

  return (
    <SEOWrapper
      componentName="Follow Button"
      description={description}
      url="https://ui.spectrumhq.in/docs/follow-button"
      keywords={[
        "follow button component",
        "unfollow button animation",
        "morphing button component",
        "micro interaction component",
      ]}
    >
      <PageTemplate title="Follow Button" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/follow-button/follow-button-demo.tsx"
          installCodePath="components/spectrumui/follow-button.tsx"
          cli="@spectrumui/follow-button"
          installScript="npm i framer-motion lucide-react"
        >
          <FollowButtonDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { FollowButton } from "@/components/spectrumui/follow-button"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<FollowButton onFollowingChange={(following) => console.log(following)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">FollowButton</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>button</InlineCode> element with{" "}
          <InlineCode>aria-pressed</InlineCode> reflecting the following state.
          Pass <InlineCode>following</InlineCode> to control it from outside, or{" "}
          <InlineCode>defaultFollowing</InlineCode> to let it manage its own
          state.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "following",
                required: false,
                type: "boolean",
                description:
                  "Controlled following state. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultFollowing",
                required: false,
                type: "boolean",
                default: "false",
                description: "Initial following state when uncontrolled",
              },
              {
                prop: "onFollowingChange",
                required: false,
                type: "(following: boolean) => void",
                description:
                  "Fires with the next following state on every toggle",
              },
              {
                prop: "followLabel",
                required: false,
                type: "string",
                default: `"Follow"`,
                description: "Label of the idle call-to-action pill",
              },
              {
                prop: "followingLabel",
                required: false,
                type: "string",
                default: `"Following"`,
                description: "Label shown while followed",
              },
              {
                prop: "unfollowLabel",
                required: false,
                type: "string",
                default: `"Unfollow"`,
                description: "Label revealed on hover or focus while followed",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Visual size of the button",
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
                  "Additional classes merged with the default button styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Sizes and custom labels
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/follow-button/follow-button-sizes-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <FollowButtonSizesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
