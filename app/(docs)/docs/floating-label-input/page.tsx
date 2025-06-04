import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/Steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import FloatingLabelInputDemo from "@/app/(docs)/docs/floating-label-input/floating-label-input-demo";
import {
  Reference,
  ReferenceBorder,
} from "@/app/(docs)/docs/components/reference";
import Usage from "@/app/(docs)/docs/components/usage";
import FloatingLabelInputCustomize from "@/app/(docs)/docs/floating-label-input/usage/floating-label-customize";
import { InlineCode } from "@/components/ui/InlineCode";
import FloatingLabelInputForm from "@/app/(docs)/docs/floating-label-input/usage/floating-label-input-form";

export const metadata: Metadata = baseMetadata({
  title: "Floating Label Input",
  description: "Material UI design system floating label input",
});

const FloatingLabelPage = () => {
  return (
    <PageTemplate
      title="Floating Label Input"
      description="Material UI design system floating label."
    >
      <ReferenceBorder>
        <Reference href="https://ui.shadcn.com/docs/components/input" />
      </ReferenceBorder>
      <PreviewCodeCard
        path="app/(docs)/docs/floating-label-input/floating-label-input-demo.tsx"
        cli="https://ui.spectrumhq.in/r/floating_label_input_demo.json"
      >
        <FloatingLabelInputDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/floating-label-input.tsx"
        installScript="npx shadcn@latest add label input"
        withEnd
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Customize"
        path="app/(docs)/docs//floating-label-input/usage/floating-label-customize.tsx"
        cli="https://ui.spectrumhq.in/r/floating_label_customize.json"
        description={
          <p className="text-muted-foreground">
            You have fully control of the <InlineCode>FloatingLabel</InlineCode>{" "}
            and the <InlineCode>FloatingInput</InlineCode>
          </p>
        }
      >
        <FloatingLabelInputCustomize />
      </Usage>

      <Usage
        title="Form"
        path="app/(docs)/docs//floating-label-input/usage/floating-label-input-form.tsx"
        cli="https://ui.spectrumhq.in/r/floating_label_form.json"
      >
        <FloatingLabelInputForm />
      </Usage>
    </PageTemplate>
  );
};

export default FloatingLabelPage;
