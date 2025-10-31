import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Feedback } from "./feedbackdemo";
import { Steppers } from "@/components/ui/steppers";

const page = () => {
  return (
    <div>
      <PageTemplate title="Feedback" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/feedback/feedbackdemo.tsx"
          cli="@spectrumui/feedback-demo"
        >
          <Feedback />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p className="text-gray-400">
          Make Utils.ts file in lib and paste the code from Step-2
        </p>
        <Steppers
          className=""
          installScript="npm i framer-motion lucide-react"
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="lib/utils.ts"
        />
      </PageTemplate>
    </div>
  );
};

export default page;
