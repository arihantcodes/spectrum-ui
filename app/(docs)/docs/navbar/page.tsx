import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/Steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import DualRangeSliderDemo from "@/app/(docs)/docs/dual-range-slider/dual-range-slider-demo";
import DualRangeSliderCustomLabel from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-custom-label";
import Usage from "@/app/(docs)/docs/components/usage";
import DualRangeSliderLabelPosition from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-label-position";
import DualRangeSliderSingle from "@/app/(docs)/docs/dual-range-slider/usage/dual-range-slider-single";
import Navbardemo from "./navbardemo";
import CircularNavbar from "./usage/circular";
import Tabnavbar from "./usage/tabnavbar";
import Floatingnavbar from "./usage/floatingnavbar";
import Sidenavbar from "./usage/sidenav";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI-Navbar",
  description:
    "An enhancement slider that allows you to select a range of values.",
});

const DualRangeSliderPage = () => {
  return (
    <PageTemplate title="Navbars">
      <PreviewCodeCard
        path="app/(docs)/docs/navbar/navbardemo.tsx"
        cli="https://ui.spectrumhq.in/r/navbar-demo.json"
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
        cli="https://ui.spectrumhq.in/r/circular-navbar.json"
      >
        <CircularNavbar />
      </Usage>
      <Usage
        title="Tab Navbar"
        path="app/(docs)/docs/navbar/usage/tabnavbar.tsx"
        cli="https://ui.spectrumhq.in/r/tab-navbar.json"
      >
        <Tabnavbar />
      </Usage>
      <Usage
        title="Floating Navbar"
        path="app/(docs)/docs/navbar/usage/floatingnavbar.tsx"
        cli="https://ui.spectrumhq.in/r/floating-navbar.json"
      >
        <Floatingnavbar />
      </Usage>
      <Usage
        title="Sidebar Navbar"
        path="app/(docs)/docs/navbar/usage/sidenav.tsx"
        cli="https://ui.spectrumhq.in/r/sidenav-navbar.json"
      >
        <Sidenavbar />
      </Usage>
    </PageTemplate>
  );
};

export default DualRangeSliderPage;
