import React from "react";
import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Link from "next/link";
import WalletProfile from "./profiledemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Profile Dropdown",
  description:
    "A user profile dropdown menu with avatar, settings, and logout actions. A free React and Next.js component built with Radix UI and Tailwind CSS.",
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
      description="A user profile dropdown menu with avatar, settings, and logout actions."
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
      <PageTemplate
        title="Profile Dropdown"
        description="A user profile dropdown menu with avatar, settings, and logout actions."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/profile/profiledemo.tsx"
        cli="@spectrumui/profile-dropdown"
      
        installScript="npm i lucide-react framer-motion"
        installCodePath="app/(docs)/docs/profile/profiledemo.tsx"
      >
        <WalletProfile />
      </PreviewCodeCard>

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
