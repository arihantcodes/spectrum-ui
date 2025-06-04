import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Steppers } from "@/components/UI/Steppers";
import AnimatedTestimonialsDemo from "./demoanimatedtest";
import Link from "next/link";

const page = () => {
  const baseurl =
    process.env.NODE_ENV === "development"
      ? "https://ui.spectrumhq.in"
      : "https://ui.spectrumhq.in";
  return (
    <div>
      <PageTemplate title="Animated Testimonials" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/animatedtestimonials/usages/demousages.tsx"
          cli={`${baseurl}/r/animated_testimonials.json`}
        >
          <AnimatedTestimonialsDemo />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p>
          Create a new file called <code>ImagePreview.tsx</code> in the
          {" components"}
        </p>

        <Steppers
          className=""
          installScript="npm i lucide-react framer-motion
 "
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="app/(docs)/docs/imagepreview/ImagePreview.tsx"
        />
        <div>
          <h1>Credits</h1>
          <p>
            This component is inspired by{" "}
            <Link href="https://www.youtube.com/watch?v=c1A4rSvQR44&t=529s">
              Aceternity UI ❤️
            </Link>
          </p>
        </div>
      </PageTemplate>
    </div>
  );
};

export default page;
