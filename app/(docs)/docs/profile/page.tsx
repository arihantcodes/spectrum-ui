import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Link from "next/link";
import WalletProfile from "./profiledemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Profile Dropdown",
  description:
    "Profile dropdown menu component for React and Next.js. Beautiful user profile menu with avatar, settings, and logout options. Perfect for dashboards and applications. Built with Radix UI and Tailwind CSS.",
  keywords: [
    "profile dropdown",
    "user menu",
    "React profile menu",
    "Next.js dropdown",
    "avatar menu",
    "user dropdown",
    "profile menu",
    "account menu",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/profile",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Profile Dropdown"
      description="Profile dropdown menu component for React and Next.js. Beautiful user profile menu with avatar, settings, and logout options. Perfect for dashboards and applications. Built with Radix UI and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/profile"
      keywords={[
        "profile dropdown",
        "user menu",
        "React profile menu",
        "Next.js dropdown",
        "avatar menu",
        "user dropdown",
        "profile menu",
        "account menu",
      ]}
    >
      <PageTemplate title="Profile Dropdown">
      <PreviewCodeCard
        path="app/(docs)/docs/profile/profiledemo.tsx"
        cli="@spectrumui/profile-dropdown"
      >
        <WalletProfile />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/profile/profiledemo.tsx"
        withEnd
        installScript="npm i lucide-react framer-motion"
      />

      <div className="flex items-center gap-2">
        <h2 className="text-neutral-700 dark:text-neutral-400">
          Design Credit -
        </h2>
        <Link href="https://x.com/_heyrico">@heyrico</Link>
      </div>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
