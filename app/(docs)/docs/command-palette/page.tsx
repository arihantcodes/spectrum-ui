import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { CommandPaletteDemo } from "./command-palette-demo"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"

export const metadata: Metadata = baseMetadata({
  title: "Command Palette",
  description:
    "Accessible keyboard-driven command palette for React and Next.js projects. Browse pages, trigger actions, and change themes using keyboard shortcuts. Built with Framer Motion.",
  keywords: [
    "command palette component",
    "React command palette",
    "CMD K menu",
    "Next.js command palette",
    "accessible command menu",
    "keyboard navigation",
    "Framer Motion command menu",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/command-palette",
})

export default function CommandPaletteDocsPage() {
  const description =
    "An interactive, keyboard-driven command menu that provides shortcuts for navigation, switching visual themes, and executing platform actions. Supports Arrow navigation, Enter selection, and Escape exit."

  return (
    <SEOWrapper
      componentName="Command Palette"
      description={description}
      url="https://ui.spectrumhq.in/docs/command-palette"
      keywords={[
        "command palette component",
        "React command menu",
        "CMD K menu",
        "keyboard shortcuts",
      ]}
    >
      <PageTemplate
        title="Command Palette"
        description={description}
      >
        <PreviewCodeCard
          path="app/(docs)/docs/command-palette/command-palette-demo.tsx"
          installCodePath="components/spectrumui/command-palette.tsx"
          cli="@spectrumui/command-palette"
          installScript="npm i framer-motion lucide-react next-themes"
        >
          <CommandPaletteDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
