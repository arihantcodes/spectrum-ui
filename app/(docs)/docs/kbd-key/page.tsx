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

import KbdKeyDemo from "./kbd-key-demo"
import KbdKeyArrowsDemo from "./kbd-key-arrows-demo"

export const metadata: Metadata = baseMetadata({
  title: "Kbd Key",
  description:
    "A 3D keycap that physically depresses when the matching key is pressed. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "kbd component",
    "keyboard key component",
    "React keyboard shortcut",
    "3D keycap component",
    "keyboard shortcut UI",
    "command k component",
    "framer motion keycap",
    "Next.js kbd component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/kbd-key",
})

const page = () => {
  const description =
    "A 3D keycap that physically depresses when the matching key is pressed."

  return (
    <SEOWrapper
      componentName="Kbd Key"
      description={description}
      url="https://ui.spectrumhq.in/docs/kbd-key"
      keywords={[
        "kbd component",
        "keyboard key component",
        "3D keycap component",
        "keyboard shortcut UI",
      ]}
    >
      <PageTemplate title="Kbd Key" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/kbd-key/kbd-key-demo.tsx"
          installCodePath="components/spectrumui/kbd-key.tsx"
          cli="@spectrumui/kbd-key"
          installScript="npm i framer-motion"
        >
          <KbdKeyDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { KbdKey, KbdCombo } from "@/components/spectrumui/kbd-key"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<KbdKey>K</KbdKey>
<KbdCombo keys="meta+k" onTrigger={() => console.log("open palette")} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">KbdKey</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a single <InlineCode>kbd</InlineCode> element styled as a
          keycap. With <InlineCode>listen</InlineCode> enabled it depresses
          while the matching real key is held; when{" "}
          <InlineCode>onPress</InlineCode> is provided the cap is wrapped in a
          focusable <InlineCode>button</InlineCode>.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "children",
                required: true,
                type: "React.ReactNode",
                description: `Cap legend, e.g. "K", "⌘" or "esc"`,
              },
              {
                prop: "keyName",
                required: false,
                type: "string",
                description:
                  'Key matched against KeyboardEvent.key, case-insensitively. Friendly names work: "meta", "ctrl", "shift", "alt", "enter", "escape", "space", "up"… Derived from children when it is a plain string; symbol legends like "⌘" need an explicit keyName',
              },
              {
                prop: "listen",
                required: false,
                type: "boolean",
                default: "true",
                description:
                  "Depress the cap while the real key is held, via a window listener",
              },
              {
                prop: "onPress",
                required: false,
                type: "() => void",
                description:
                  "Fires once per press — on a matching keydown or a pointer tap. Also wraps the cap in a button for accessibility",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Visual size of the cap",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the default cap styles",
              },
            ]}
          />
        </div>

        <PageSectionTitle>KbdCombo</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders one <InlineCode>KbdKey</InlineCode> per key joined by{" "}
          <InlineCode>+</InlineCode> separators. Each cap listens to its own
          key; when every key is down at the same time the whole combo pulses
          once and <InlineCode>onTrigger</InlineCode> fires.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "keys",
                required: true,
                type: "string",
                description: `"+"-separated keys, e.g. "meta+k" or "shift+?". Names map to glyphs: meta → ⌘, shift → ⇧, alt → ⌥, ctrl → ⌃, enter → ↵, space → ␣, escape → esc, arrows → ↑ ↓ ← →`,
              },
              {
                prop: "listen",
                required: false,
                type: "boolean",
                default: "true",
                description: "Depress each cap while its real key is held",
              },
              {
                prop: "onTrigger",
                required: false,
                type: "() => void",
                description:
                  "Fires once each time every key in the combo is held down simultaneously",
              },
              {
                prop: "size",
                required: false,
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Visual size of the caps",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged with the combo wrapper styles",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Arrow cluster</PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/kbd-key/kbd-key-arrows-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <KbdKeyArrowsDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
