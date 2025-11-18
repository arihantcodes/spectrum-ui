import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Usage from "@/app/(docs)/docs/components/usage";
import Navbardemo from "./navbardemo";
import CircularNavbar from "./usage/circular";
import Tabnavbar from "./usage/tabnavbar";
import Floatingnavbar from "./usage/floatingnavbar";
import Sidenavbar from "./usage/sidenav";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Navbar",
  description:
    "Beautiful, responsive navbar components for React and Next.js. Includes circular, tab, floating, and sidebar navigation patterns. Built with Tailwind CSS and TypeScript.",
  keywords: [
    "React navbar",
    "Next.js navbar",
    "navigation component",
    "navbar component",
    "responsive navbar",
    "mobile navbar",
    "sidebar navigation",
    "floating navbar",
    "circular navbar",
    "tab navigation",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/navbar",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Navbar"
      description="Beautiful, responsive navbar components for React and Next.js. Includes circular, tab, floating, and sidebar navigation patterns. Built with Tailwind CSS and TypeScript."
      url="https://ui.spectrumhq.in/docs/navbar"
      keywords={[
        "React navbar",
        "Next.js navbar",
        "navigation component",
        "navbar component",
        "responsive navbar",
        "mobile navbar",
        "sidebar navigation",
        "floating navbar",
        "circular navbar",
        "tab navigation",
      ]}
    >
      <PageTemplate title="Navbars">
      <PreviewCodeCard
        path="app/(docs)/docs/navbar/navbardemo.tsx"
        cli="@spectrumui/navbar-demo"
      >
        <Navbardemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/navbar/navbardemo.tsx"
        withEnd
        installScript="npm i lucide-react"
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Circular Navbar"
        path="app/(docs)/docs/navbar/usage/circular.tsx"
        cli="@spectrumui/circular-navbar"
      >
        <CircularNavbar />
      </Usage>
      <Usage
        title="Tab Navbar"
        path="app/(docs)/docs/navbar/usage/tabnavbar.tsx"
        cli="@spectrumui/tab-navbar"
      >
        <Tabnavbar />
      </Usage>
      <Usage
        title="Floating Navbar"
        path="app/(docs)/docs/navbar/usage/floatingnavbar.tsx"
        cli="@spectrumui/floating-navbar"
      >
        <Floatingnavbar />
      </Usage>
      <Usage
        title="Sidebar Navbar"
        path="app/(docs)/docs/navbar/usage/sidenav.tsx"
        cli="@spectrumui/sidebar-navbar"
      >
        <Sidenavbar />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
