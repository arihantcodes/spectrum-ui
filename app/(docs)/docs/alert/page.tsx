import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";

import { Steppers } from "@/components/ui/steppers";
import Alertdemo from "./alertdemo";
import Usage from "../components/usage";
import Alert02 from "./usage/alerttwo";
import Alert03 from "./usage/alertthree";
import Alert04 from "./usage/alertfour";

const page = () => {
  return (
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
  );
};

export default page;
