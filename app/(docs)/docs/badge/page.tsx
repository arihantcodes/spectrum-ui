import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import EventBadge from "./badgedemo";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI- 3D Event Badge",
  description:
    "An enhancement slider that allows you to select a range of values.",
});

const DualRangeSliderPage = () => {
  return (
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
  );
};

export default DualRangeSliderPage;
