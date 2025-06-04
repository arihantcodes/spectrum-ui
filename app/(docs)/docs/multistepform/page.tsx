import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import Multistepdemo from "./multistepdemo";
import { Steppers } from "@/components/UI/Steppers";

const page = () => {
  return (
    <div>
      <PageTemplate title="Multistep Form" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/multistepform/multistepdemo.tsx"
          cli="https://ui.spectrumhq.in/r/multiple-step-form-demo.json"
        >
          <Multistepdemo />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p className="text-gray-400">
          Make Utils.ts file in lib and paste the code from Step-2
        </p>
        <Steppers
          className=""
          installScript="npx shadcn@latest add sonner card input label textarea select checkbox radio-group"
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="lib/utils.ts"
        />
      </PageTemplate>
    </div>
  );
};

export default page;
