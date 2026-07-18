import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import AnimatedTestimonialsDemo from "./demoanimatedtest";
import Link from "next/link";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Animated Testimonials",
  description:
    "An animated testimonials section for showcasing customer reviews and social proof. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
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
      description="An animated testimonials section for showcasing customer reviews and social proof."
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
        <PageTemplate
          title="Animated Testimonials"
          description="An animated testimonials section for showcasing customer reviews and social proof."
          className="mt-5"
        >
        <PreviewCodeCard
          path="app/(docs)/docs/animatedtestimonials/usages/demousages.tsx"
          cli="@spectrumui/animated-testimonials"
        
        installScript="npm i lucide-react framer-motion"
        installCodePath="app/(docs)/docs/animatedtestimonials/usages/demousages.tsx"
      >
          <AnimatedTestimonialsDemo />
        </PreviewCodeCard>
      <p>
          Create a new file called <code>ImagePreview.tsx</code> in the
          {" components"}
        </p>

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
