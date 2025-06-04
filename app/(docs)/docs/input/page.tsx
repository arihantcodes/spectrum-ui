/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";

import { PageSubTitle, PageTemplate } from "../components/page-template";
import { Steppers } from "@/components/ui/Steppers";
import Inputcollection from "@/components/spectrumui/Form";
const page = () => {
  return (
    <div>
      <PageTemplate title="Pre Design Inputs">
        <PageSubTitle>Installation</PageSubTitle>
        <Steppers
          withInstall
          codePath="components/spectrumui/form.tsx"
          installScript="npx shadcn@latest add input"
          withEnd
        />
        <PageSubTitle>Usage</PageSubTitle>
        <div className="mt-12">
          <Inputcollection />
        </div>
      </PageTemplate>
    </div>
  );
};

export default page;
