import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import AnimatedTestimonialsDemo from "./demoanimatedtest";
import Link from "next/link";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Animated Testimonials",
  description:
    "Beautiful animated testimonials component for React and Next.js. Display customer reviews and feedback with smooth animations and transitions. Perfect for landing pages and marketing sites.",
  keywords: [
    "animated testimonials",
    "testimonials component",
    "React testimonials",
    "animated reviews",
    "customer testimonials",
    "Next.js testimonials",
    "Framer Motion testimonials",
    "social proof",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animatedtestimonials",
});

const page = () => {
  
  return (
    <SEOWrapper
      componentName="Animated Testimonials"
      description="Beautiful animated testimonials component for React and Next.js. Display customer reviews and feedback with smooth animations and transitions. Perfect for landing pages and marketing sites."
      url="https://ui.spectrumhq.in/docs/animatedtestimonials"
      keywords={[
        "animated testimonials",
        "testimonials component",
        "React testimonials",
        "animated reviews",
        "customer testimonials",
        "Next.js testimonials",
        "Framer Motion testimonials",
        "social proof",
      ]}
    >
      <div>
        <PageTemplate title="Animated Testimonials" className="mt-5">
        <PreviewCodeCard
          path="app/(docs)/docs/animatedtestimonials/usages/demousages.tsx"
          cli="@spectrumui/animated-testimonials"
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
          <h2>Credits</h2>
          <p>
            This component is inspired by{" "}
            <Link href="https://www.youtube.com/watch?v=c1A4rSvQR44&t=529s">
              Aceternity UI ❤️
            </Link>
          </p>
        </div>
      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
