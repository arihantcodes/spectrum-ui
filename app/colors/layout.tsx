import Link from "next/link";

import { AnimateEnter } from "@/app/home/AnimateEnter";
import { Button } from "@/components/ui/button";

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container-frame">
        <section className="relative z-3 flex flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:py-24">
          <AnimateEnter delay={0.1} duration={1} isWhileInView={false}>
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
                Color system
              </span>
            </span>
          </AnimateEnter>

          {/* No AnimateEnter here: the chroma gradient starts transparent, so
              the sweep is the entrance — a fade wrapper would hide it. */}
          {/* pt/pb extend the background-clip paint box so ascenders/descenders
              aren't sliced by the tight leading; the margins subtract the same
              amount to keep the layout unchanged. */}
          <h1 className="chroma-text chroma-text-animate mt-[calc(1rem-0.12em)] mb-[calc(1rem-0.25em)] max-w-[620px] pt-[0.12em] pb-[0.25em] font-spectral text-[30px] font-light capitalize leading-[0.95] tracking-[-0.06em] text-black dark:text-white sm:text-[40px] lg:text-[50px] lg:leading-[48px] lg:tracking-[-3.5px]">
            Every color of the spectrum,
            <br />
            one click away.
          </h1>

          <AnimateEnter delay={0.35} duration={1} isWhileInView={false}>
            <p className="max-w-[548px] font-inter text-[14px] font-normal capitalize leading-[20px] text-[#646464]">
              Tailwind CSS palettes in HEX, RGB, and HSL. Pick a format once,
              click any swatch, and it&apos;s on your clipboard.
            </p>
          </AnimateEnter>

          <AnimateEnter delay={0.5} duration={1} isWhileInView={false} className="py-3">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#colors" className="w-full sm:w-auto">
                <Button className="h-[44px] w-full rounded-[28px] font-inter text-[16px] font-medium leading-[22.4px] sm:w-[181px]">
                  Browse palettes
                </Button>
              </a>
              <Link href="/docs" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-[44px] w-full rounded-[28px] border-transparent bg-white font-inter text-[16px] font-normal leading-[22.4px] text-black shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:bg-white hover:text-black sm:w-[206px] dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:text-white"
                >
                  Browse components
                </Button>
              </Link>
            </div>
          </AnimateEnter>
        </section>
      </div>

      <div className="container-frame">{children}</div>
    </>
  );
}
