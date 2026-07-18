import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Installation",
  description:
    "Install Spectrum UI in a Next.js project with Tailwind CSS and shadcn/ui. Step-by-step setup so you can copy-paste React components in minutes.",
  keywords: [
    "Spectrum UI installation",
    "React setup",
    "Next.js setup",
    "shadcn installation",
    "Tailwind CSS setup",
    "UI library setup",
    "component library installation",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/installation",
});

export default function InstallationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SEOWrapper
      componentName="Installation"
      description="Install Spectrum UI in a Next.js project with Tailwind CSS and shadcn/ui."
      url="https://ui.spectrumhq.in/docs/installation"
      keywords={[
        "Spectrum UI installation",
        "Next.js setup",
        "Tailwind CSS setup",
        "shadcn installation",
      ]}
    >
      {children}
    </SEOWrapper>
  );
}
