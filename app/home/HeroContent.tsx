"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AnimateEnter } from "./AnimateEnter";
import { CornerBadge } from "./CornerBadge";

export function HeroContent() {
  return (
    <div className="z-[3] flex w-full flex-col ">
      {/* Hero */}
      <div className="flex min-h-[68vh] flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:py-24">
        <AnimateEnter delay={0.1} duration={1} isWhileInView={false}>
          <CornerBadge />
        </AnimateEnter>

        <AnimateEnter delay={0.2} duration={1} isWhileInView={false}>
          <h1 className="max-w-[553px] my-4 font-spectral font-light capitalize text-[34px] leading-[0.95] tracking-[-0.09em] text-black dark:text-white sm:text-[42px] lg:text-[54px] lg:leading-[51px] lg:tracking-[-5px]">
            The component library
            <br />
            your AI agents are missing.
          </h1>
        </AnimateEnter>

        <AnimateEnter delay={0.35} duration={1} isWhileInView={false}>
          <p className="max-w-[548px] font-inter text-[14px] font-normal capitalize leading-[20px] text-[#646464]">
            Connect the Spectrum UI MCP once, then ask Cursor or Claude for any
            of 250+ animated components installed in one line, wired to your
            project.
          </p>
        </AnimateEnter>

        <AnimateEnter delay={0.5} duration={1} isWhileInView={false} className="py-3">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/docs" className="w-full sm:w-auto">
              <Button
                className="h-[44px] w-full rounded-[28px] font-inter text-[16px] font-medium leading-[22.4px] sm:w-[161px]"
              >
                Install MCP
              </Button>
            </Link>
            <Link href="/docs/components" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-[44px] w-full rounded-[28px] border-transparent bg-white font-inter text-[16px] font-normal leading-[22.4px] text-black shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:bg-white hover:text-black sm:w-[206px] dark:bg-transparent dark:text-white dark:hover:text-white"
              >
                Browse components
              </Button>
            </Link>
          </div>
        </AnimateEnter>
      </div>

      {/* Built with */}
      <AnimateEnter
        delay={0.7}
        duration={1}
        isWhileInView={false}
        className="w-full border-t border-border"
      >
        <div className="flex flex-col items-center gap-4 px-4 py-6">
          <p className="text-sm font-semibold text-foreground">Built with</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-0">
            <div className="flex items-center justify-center sm:px-8">
              <Image
                src="/shadcn.svg"
                alt="shadcn/ui"
                width={137}
                height={32}
                className="h-6 w-auto"
                loading="lazy"
              />
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-border sm:block" />

            <div className="flex items-center justify-center sm:px-8">
              <Image
                src="/tailwind.svg"
                alt="Tailwind CSS"
                width={194}
                height={24}
                className="h-5 w-auto"
                loading="lazy"
              />
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-border sm:block" />

            <div className="flex items-center justify-center gap-2 sm:px-8">
              <Image
                src="/framer.svg"
                alt="Motion"
                width={20}
                height={20}
                className="h-[18px] w-[18px]"
                loading="lazy"
              />
              <span className="text-[15px] font-semibold text-[#797C7C]">
                Motion
              </span>
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-border sm:block" />

            <div className="flex items-center justify-center sm:px-8">
              <Image
                src="/nextjs.svg"
                alt="Next.js"
                width={120}
                height={24}
                className="h-5 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </AnimateEnter>
    </div>
  );
}
