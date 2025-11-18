import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import Alertdemo from "./alertdemo";
import Usage from "../components/usage";
import Alert02 from "./usage/alerttwo";
import Alert03 from "./usage/alertthree";
import Alert04 from "./usage/alertfour";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Animated Alert",
  description:
    "Beautiful animated alert component for React and Next.js. Display notifications, warnings, and messages with smooth animations. Perfect for user feedback and system notifications. Built with Framer Motion and Tailwind CSS.",
  keywords: [
    "animated alert",
    "alert component",
    "React alert",
    "Next.js alert",
    "notification component",
    "toast alert",
    "message alert",
    "Framer Motion alert",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/alert",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Animated Alert"
      description="Beautiful animated alert component for React and Next.js. Display notifications, warnings, and messages with smooth animations. Perfect for user feedback and system notifications. Built with Framer Motion and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/alert"
      keywords={[
        "animated alert",
        "alert component",
        "React alert",
        "Next.js alert",
        "notification component",
        "toast alert",
        "message alert",
        "Framer Motion alert",
      ]}
    >
      <div>
        <PageTemplate title="Animated Alert" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/alert/alertdemo.tsx"
          cli="@spectrumui/alert-1"
        >
          <Alertdemo />
        </PreviewCodeCard>
        <PageSubTitle>Installation</PageSubTitle>

        {/* <PageSubTitle>Installation</PageSubTitle> */}

        <Steppers
          installScript="npm i framer-motion lucide-react"
          codePath="lib/utils.ts"
          withInstall
          withEnd
        />

        <PageSubTitle>Usage</PageSubTitle>

        <Usage
          path="app/(docs)/docs/alert/usage/alertthree.tsx"
          cli="@spectrumui/alert-2"
        >
          <Alert02 />
        </Usage>
        <Usage
          path="app/(docs)/docs/alert/usage/alertthree.tsx"
          cli="@spectrumui/alert-3"
        >
          <Alert03 />
        </Usage>
        <Usage
          path="app/(docs)/docs/alert/usage/alertfour.tsx"
          cli="@spectrumui/alert-4"
        >
          <Alert04 />
        </Usage>
     
      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
