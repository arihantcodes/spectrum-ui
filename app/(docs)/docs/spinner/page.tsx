import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/Steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Usage from "@/app/(docs)/docs/components/usage";
import SpinnerDemo from "@/app/(docs)/docs/spinner/spinner-demo";
import SpinnerSize from "@/app/(docs)/docs/spinner/usage/spinner-size";
import SpinnerWithText from "@/app/(docs)/docs/spinner/usage/spinner-with-text";
import SpinnerToggle from "@/app/(docs)/docs/spinner/usage/spinner-toggle";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { spinnerProp } from "@/app/(docs)/docs/spinner/spinner-prop";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI-Spinner",
  description: "A simple spinner for displaying loading state",
});

const SpinnerPage = () => {
  return (
    <PageTemplate
      title="Spinner"
      description="A simple spinner for displaying loading state"
    >
      <PreviewCodeCard
        path="app/(docs)/docs/spinner/spinner-demo.tsx"
        cli="https://ui.spectrumhq.in/r/spinner_demo.json"
      >
        <SpinnerDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers withInstall codePath="components/ui/spinner.tsx" withEnd />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Size"
        path="app/(docs)/docs//spinner/usage/spinner-size.tsx"
        cli="https://ui.spectrumhq.in/r/spinner_size.json"
      >
        <SpinnerSize />
      </Usage>
      <Usage
        title="With text and custom style"
        path="app/(docs)/docs//spinner/usage/spinner-with-text.tsx"
        cli="https://ui.spectrumhq.in/r/spinner_with_text.json"
      >
        <SpinnerWithText />
      </Usage>

      <Usage
        title="Toggle spinner"
        path="app/(docs)/docs//spinner/usage/spinner-toggle.tsx"
        cli="https://ui.spectrumhq.in/r/spinner_toggle.json"
      >
        <SpinnerToggle />
      </Usage>

      <PropsTable props={spinnerProp} />
    </PageTemplate>
  );
};

export default SpinnerPage;
