import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-5 mt-4 lg:mt-8 px-4">

      {/* <div className="inline-flex items-center gap-2 bg-accent/10 border 
        border-accent/20 text-accent-text text-xs font-medium px-3 py-1.5 
        rounded-full mb-6">
        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        Spectrum Pro — Early Access
      </div> */}

      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl 
        font-semibold mb-4 md:leading-tight text-foreground max-w-2xl">
        Stop building from scratch.
        <br />
        <span className="bg-gradient-to-r from-[#6366F1] to-purple-400 
          bg-clip-text text-transparent">
          Ship fast with Spectrum Pro.
        </span>
      </h1>

      <p className="text-[#666] text-base mb-8 text-center max-w-md">
        Premium Next.js templates built on Spectrum UI. 
        Dark. Animated. Production-ready. From $49.
      </p>

      <div className="flex items-center gap-3">
        <Link href="https://pro.spectrumhq.in">
          <Button className="rounded-md px-6 text-sm font-medium">
            Get access 
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default Cta;