import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import Demoimages from "./usages/useone";

const page = () => {
  return (
    <div>
      <PageTemplate title="Image Preview" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/imagepreview/usages/useone.tsx"
          cli="@spectrumui/image-preview"
        >
          <Demoimages />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p>
          Create a new file called <code>ImagePreview.tsx</code> in the
          {" components"}
        </p>

        <Steppers
          className=""
          installScript="npm i lucide-react 
 "
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="app/(docs)/docs/imagepreview/ImagePreview.tsx"
        />
      </PageTemplate>
    </div>
  );
};

export default page;
