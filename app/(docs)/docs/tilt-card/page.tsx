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

import TiltCardDemo from "./tilt-card-demo"
import TiltCardGlareDemo from "./tilt-card-glare-demo"

export const metadata: Metadata = baseMetadata({
  title: "3D Tilt Card",
  description:
    "A 3D card that tilts toward the pointer with parallax depth and glare. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "3d card effect",
    "tilt card component",
    "React 3d card",
    "parallax card",
    "hover tilt effect",
    "glare card",
    "micro interaction card",
    "framer motion card",
    "Next.js 3d card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/tilt-card",
})

const page = () => {
  const description =
    "A 3D card that tilts toward the pointer with parallax depth and glare."

  return (
    <SEOWrapper
      componentName="3D Tilt Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/tilt-card"
      keywords={[
        "3d card effect",
        "tilt card component",
        "parallax card",
        "glare card",
      ]}
    >
      <PageTemplate title="3D Tilt Card" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/tilt-card/tilt-card-demo.tsx"
          installCodePath="components/spectrumui/tilt-card.tsx"
          cli="@spectrumui/tilt-card"
          installScript="npm i framer-motion"
        >
          <TiltCardDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<TiltCard className="max-w-sm p-6">
  <TiltCardItem depth={60}>Floats above the card</TiltCardItem>
  <TiltCardItem depth={30}>Floats a little less</TiltCardItem>
</TiltCard>`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">TiltCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The perspective container and card surface. Wrap any content;
          use <InlineCode>TiltCardItem</InlineCode> for pieces that should lift
          toward the viewer while hovered.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "maxTilt",
                required: false,
                type: "number",
                default: "12",
                description: "Maximum rotation toward the pointer in degrees",
              },
              {
                prop: "tiltReverse",
                required: false,
                type: "boolean",
                default: "false",
                description:
                  "Invert the tilt so the card leans away from the pointer",
              },
              {
                prop: "scale",
                required: false,
                type: "number",
                default: "1.02",
                description: "Scale applied to the card while hovered",
              },
              {
                prop: "perspective",
                required: false,
                type: "number",
                default: "1000",
                description: "CSS perspective distance in pixels",
              },
              {
                prop: "glare",
                required: false,
                type: "boolean",
                default: "true",
                description: "Show the pointer-following glare highlight",
              },
              {
                prop: "glareColor",
                required: false,
                type: "string",
                default: `"rgba(255, 255, 255, 0.35)"`,
                description: "Color at the center of the glare gradient",
              },
              {
                prop: "containerClassName",
                required: false,
                type: "string",
                description: "Classes for the outer perspective wrapper",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the card surface styles",
              },
            ]}
          />
        </div>

        <PageSectionTitle>TiltCardItem</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A depth layer inside the card. While the card is hovered it
          translates on the Z axis by <InlineCode>depth</InlineCode> pixels,
          creating the parallax pop-out effect.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "depth",
                required: false,
                type: "number",
                default: "0",
                description:
                  "Lift toward the viewer in pixels while the card is hovered",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description: "Additional classes for the layer element",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Custom Tilt and Glare
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/tilt-card/tilt-card-glare-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <TiltCardGlareDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
