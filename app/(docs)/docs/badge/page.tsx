import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import EventBadge from "./badgedemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "3D Event Badge",
  description:
    "Stunning 3D event badge component built with Three.js and React Three Fiber. Perfect for showcasing events, conferences, and special occasions with interactive 3D animations.",
  keywords: [
    "3D badge",
    "event badge",
    "Three.js badge",
    "React Three Fiber",
    "3D component",
    "interactive badge",
    "animated badge",
    "3D event card",
    "WebGL badge",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/badge",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="3D Event Badge"
      description="Stunning 3D event badge component built with Three.js and React Three Fiber. Perfect for showcasing events, conferences, and special occasions with interactive 3D animations."
      url="https://ui.spectrumhq.in/docs/badge"
      keywords={[
        "3D badge",
        "event badge",
        "Three.js badge",
        "React Three Fiber",
        "3D component",
        "interactive badge",
        "animated badge",
        "3D event card",
        "WebGL badge",
      ]}
    >
      <PageTemplate title="Vercel 3D Event Badge">
      <PreviewCodeCard
        path="app/(docs)/docs/badge/badgedemo.tsx"
        cli="@spectrumui/event-badge-3d"
      >
        <EventBadge />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/badge/badgedemo.tsx"
        withEnd
        installScript="npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline leva
"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
