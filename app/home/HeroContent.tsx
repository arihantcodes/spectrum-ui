'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';

import { AnimateEnter } from './AnimateEnter';
import { CornerBadge } from './CornerBadge';

// Bounce-free spring for tactile press + hover lift on the CTAs. bounce:0 keeps
// it crisp and controlled — never springy — which is what reads as "premium".
const CTA_SPRING = { type: 'spring', stiffness: 400, damping: 26, mass: 0.6 } as const;

export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const lift = reduceMotion ? undefined : { y: -2 };
  const press = reduceMotion ? undefined : { scale: 0.96 };

  return (
    <div className="z-3 flex w-full flex-col ">
      {/* Hero */}
      <div className="flex min-h-[68vh] flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:py-24">
        <AnimateEnter delay={0.1} isWhileInView={false}>
          <CornerBadge />
        </AnimateEnter>

        {/* No AnimateEnter here: the chroma gradient starts transparent, so the
            sweep is the entrance — a fade wrapper would hide it. */}
        {/* pt/pb extend the background-clip paint box so ascenders/descenders
            aren't sliced by the tight leading; the margins subtract the same
            amount to keep the layout unchanged. */}
        <h1 className="chroma-text chroma-text-animate max-w-[553px] mt-[calc(1rem-0.12em)] mb-[calc(1rem-0.25em)] pt-[0.12em] pb-[0.25em] font-spectral font-light capitalize text-[30px] leading-[0.95] tracking-[-0.09em] text-black dark:text-white sm:text-[42px] lg:text-[54px] lg:leading-[51px] lg:tracking-[-5px]">
          The component library
          <br />
          your AI agents are missing.
        </h1>

        <AnimateEnter delay={0.28} isWhileInView={false}>
          <p className="max-w-[548px] font-inter text-[14px] font-normal capitalize leading-[20px] text-[#646464]">
            Connect the Spectrum UI MCP once, then ask Cursor or Claude for any of 250+ animated
            components installed in one line, wired to your project.
          </p>
        </AnimateEnter>

        <AnimateEnter delay={0.42} isWhileInView={false} className="py-3">
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
            <motion.div
              className="shrink-0"
              whileHover={lift}
              whileTap={press}
              transition={CTA_SPRING}
            >
              <Link href="/docs/mcp" className="block">
                <Button className="h-[44px] rounded-[28px] px-5 font-inter text-[16px] font-medium leading-[22.4px] sm:w-[161px]">
                  Install MCP
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="shrink-0"
              whileHover={lift}
              whileTap={press}
              transition={CTA_SPRING}
            >
              <Link href="/docs" className="block">
                <Button
                  variant="outline"
                  className="h-[44px] rounded-[28px] border-transparent bg-white px-5 font-inter text-[16px] font-normal leading-[22.4px] text-black shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:bg-white hover:text-black sm:w-[206px] dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:text-white"
                >
                  View components
                </Button>
              </Link>
            </motion.div>
          </div>
        </AnimateEnter>
      </div>

      {/* Built with */}
      <AnimateEnter
        delay={0.58}
        isWhileInView={false}
        className="w-full border-t border-border"
      >
        <div className="flex flex-col items-center gap-4 px-4 py-6">
          <p className="text-sm font-semibold text-foreground">Built with</p>
          {/* Each wordmark SVG packs its glyphs into its viewBox differently
              (shadcn has a tall `//` icon + small text; tailwind's word nearly
              fills its box; Next is all-caps). Heights are tuned per logo so the
              *words* read at a matching optical size across the row rather than
              matching raw SVG heights. */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-0">
            <div className="flex h-8 items-center justify-center sm:px-8">
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

            <div className="flex h-8 items-center justify-center sm:px-8">
              <Image
                src="/tailwind.svg"
                alt="Tailwind CSS"
                width={194}
                height={24}
                className="h-4 w-auto"
                loading="lazy"
              />
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-border sm:block" />

            <div className="flex h-8 items-center justify-center gap-2 sm:px-8">
              <Image
                src="/framer.svg"
                alt="Motion"
                width={20}
                height={20}
                className="h-4 w-4"
                loading="lazy"
              />
              <span className="text-[16px] font-semibold leading-none text-[#797C7C]">Motion</span>
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-border sm:block" />

            <div className="flex h-8 items-center justify-center sm:px-8">
              <Image
                src="/nextjs.svg"
                alt="Next.js"
                width={120}
                height={24}
                className="h-[15px] w-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </AnimateEnter>
    </div>
  );
}
