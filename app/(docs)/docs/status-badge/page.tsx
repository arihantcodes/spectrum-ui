import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

import StatusDemo from "./statusdemo";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI- Status Badge",
  description:
    "An enhancement slider that allows you to select a range of values.",
});

const DualRangeSliderPage = () => {
  return (
    <PageTemplate title="Status Badge">
      <PreviewCodeCard
        cli="@spectrumui/status-badge"
        path="app/(docs)/docs/status-badge/statusdemo.tsx"
      >
        <StatusDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/status-badge/statusdemo.tsx"
        withEnd
        installScript="npm i lucide-react"
      />
    </PageTemplate>
  );
};

export default DualRangeSliderPage;
