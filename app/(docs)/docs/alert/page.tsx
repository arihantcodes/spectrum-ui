import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";

import { Steppers } from "@/components/ui/Steppers";
import Alertdemo from "./alertdemo";
import Usage from "../components/usage";
import Alert02 from "./usage/alerttwo";
import Alert03 from "./usage/alertthree";
import Alert04 from "./usage/alertfour";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <PageTemplate title="Animated Alert" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/alert/alertdemo.tsx"
          cli="https://ui.spectrumhq.in/r/alert-demo.json"
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
          cli="https://ui.spectrumhq.in/r/alert-2.json"
        >
          <Alert02 />
        </Usage>
        <Usage
          path="app/(docs)/docs/alert/usage/alertthree.tsx"
          cli="https://ui.spectrumhq.in/r/alert-3.json"
        >
          <Alert03 />
        </Usage>
        <Usage
          path="app/(docs)/docs/alert/usage/alertfour.tsx"
          cli="https://ui.spectrumhq.in/r/alert-4.json"
        >
          <Alert04 />
        </Usage>
        <div className="font-bold text-neutral-500 flex gap-4">
          <h1>Credits -</h1>
          <Link href="https://kokonut.dev/">kokonut UI</Link>
        </div>
      </PageTemplate>
    </div>
  );
};

export default page;
