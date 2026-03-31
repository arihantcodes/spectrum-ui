import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 lg:py-28 px-4">

      <p className="text-sm font-medium text-muted-foreground mb-6 tracking-wide uppercase">
        Spectrum Pro
      </p>

      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl
        font-semibold leading-tight md:leading-tight text-foreground max-w-2xl">
        Stop building from scratch.
        <br />
        Ship faster with Pro templates.
      </h2>

      <p className="text-muted-foreground text-base md:text-lg mt-5 mb-10 text-center max-w-lg">
        Premium Next.js templates built on Spectrum UI.
        Dark. Animated. Production-ready.
      </p>

      <Link href="/pro">
        <Button size="lg" className="rounded-lg px-8 text-sm font-medium">
          Browse templates — Starting at $49
        </Button>
      </Link>

    </div>
  );
};

export default Cta;
