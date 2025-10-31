import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";

import { Steppers } from "@/components/ui/steppers";
import { Chart } from "./animateddemo";

const page = () => {
  let baseurl =
    process.env.NODE_ENV === "development"
      ? "https://ui.spectrumhq.in"
      : "https://ui.spectrumhq.in";

  return (
    <div>
      <PageTemplate title="Animated SVG Chart" className="mt-5">
        <PreviewCodeCard
          className=""
          path="app/(docs)/docs/animatedchart/animateddemo.tsx"
          cli="@spectrumui/animated-SVG-chart"
        >
          <Chart />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>

        <Steppers
          className=""
          installScript="npm i framer-motion mini-svg-data-uri"
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="lib/sample.ts"
        />
      </PageTemplate>
    </div>
  );
};

export default page;
