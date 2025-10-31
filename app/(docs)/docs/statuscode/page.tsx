import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import Ststuscodelist from "./demostatus";

const page = () => {
  return (
    <div>
      <PageTemplate title="HTTP Status Code" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/statuscode/demostatus.tsx"
          cli="@spectrumui/http-status-code"
        >
          <Ststuscodelist />
        </PreviewCodeCard>
      </PageTemplate>
    </div>
  );
};

export default page;
