import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import DockDemo from "./dock-demo";
import Usage from "@/app/(docs)/docs/components/usage";
import DockGlassDemo from "./usage/dock-glass";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { dockProp, dockIconProp } from "./dock-prop";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Dock Menu",
  description:
    "macOS-Style Animated Dock Menu component for React and Next.js. Features smooth dynamic magnifying hover effect, click bounce animations, and hover tooltips. Built with Framer Motion and Tailwind CSS.",
  keywords: [
    "dock menu",
    "macOS dock",
    "animated dock",
    "magnifying navigation",
    "React dock component",
    "Next.js dock",
    "Framer Motion navigation",
    "interactive dock navbar",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/dock",
});

const DockPage = () => {
  const installContent = (
    <div className="flex flex-col gap-8 mt-4">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Dock Props</h3>
        <PropsTable props={dockProp} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">DockIcon Props</h3>
        <PropsTable props={dockIconProp} />
      </div>
    </div>
  );

  return (
    <SEOWrapper
      componentName="Dock Menu"
      description="macOS-Style Animated Dock Menu component for React and Next.js. Features smooth dynamic magnifying hover effect, click bounce animations, and hover tooltips. Built with Framer Motion and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/dock"
      keywords={[
        "dock menu",
        "macOS dock",
        "animated dock",
        "magnifying navigation",
        "React dock component",
        "Next.js dock",
        "Framer Motion navigation",
        "interactive dock navbar",
      ]}
    >
      <PageTemplate
        title="Dock Menu"
        description="A sleek, interactive macOS-style floating dock menu with magnifying hover effects."
      >
        <PreviewCodeCard
          path="app/(docs)/docs/dock/dock-demo.tsx"
          cli="@spectrumui/dock-demo"
          installScript="npm i framer-motion"
          installCodePath="components/ui/dock.tsx"
          installContent={installContent}
        >
          <DockDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <Usage
          title="Glassmorphism Variant"
          path="app/(docs)/docs/dock/usage/dock-glass.tsx"
          cli="@spectrumui/dock-glass"
        >
          <DockGlassDemo />
        </Usage>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default DockPage;
