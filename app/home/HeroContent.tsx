'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/components/spectrumui/use-typewriter';

import { AnimateEnter } from './AnimateEnter';
import { CornerBadge } from './CornerBadge';
import { HeroStage } from './HeroStage';

// Bounce-free spring for tactile press + hover lift on the CTAs. bounce:0 keeps
// it crisp and controlled — never springy — which is what reads as "premium".
const CTA_SPRING = { type: 'spring', stiffness: 400, damping: 26, mass: 0.6 } as const;

export function HeroContent() {
  // SSR-safe: starts false on both server and first client render, so the CTA
  // wrappers hydrate without a tabindex mismatch for reduced-motion users.
  const reduceMotion = usePrefersReducedMotion();
  const lift = reduceMotion ? undefined : { y: -2 };
  const press = reduceMotion ? undefined : { scale: 0.96 };

  return (
    <div className="z-3 flex w-full flex-col">
      <div className="relative flex flex-col lg:h-[calc(100dvh-3.5rem)] lg:max-h-[880px] lg:min-h-[640px] lg:flex-row">
        <div className="relative z-10 flex flex-col items-start justify-center gap-3 px-4 pb-10 pt-12 text-start sm:pt-16 lg:w-[46%] lg:min-w-[440px] lg:pt-0 lg:pb-16 lg:pe-8 xl:ps-6">
          <AnimateEnter delay={0.1} isWhileInView={false}>
            <CornerBadge />
          </AnimateEnter>

          <h1 className="chroma-text chroma-text-animate max-w-[553px] mb-[calc(1rem-0.25em)] pt-[0.12em] pb-[0.25em] text-balance font-spectral font-light capitalize text-[30px] leading-[0.95] tracking-[-0.09em] text-black dark:text-white sm:text-[42px] lg:text-[54px] lg:leading-[51px] lg:tracking-[-5px]">
            The component library
            <br />
            your AI agents are missing.
          </h1>

          <AnimateEnter delay={0.28} isWhileInView={false}>
            <p className="max-w-[548px] text-pretty font-inter text-[14px] font-medium capitalize leading-[20px] text-[#646464]">
              Connect the Spectrum UI MCP once, then ask Cursor or Claude for any of 250+ animated
              components installed in one line, wired to your project.
            </p>
          </AnimateEnter>

          <AnimateEnter delay={0.42} isWhileInView={false} className="py-3">
            {/* min-w (not w) keeps the pills their designed size while letting a
                longer label grow instead of clipping. */}
            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3">
              <motion.div
                className="shrink-0"
                whileHover={lift}
                whileTap={press}
                transition={CTA_SPRING}
              >
                <Link href="/docs/mcp" className="block">
                  <Button className="h-[44px] rounded-[28px] px-5 font-inter text-[16px] font-medium leading-[22.4px] sm:min-w-[161px]">
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
                    className="h-[44px] rounded-[28px] border-transparent bg-white px-5 font-inter text-[16px] font-normal leading-[22.4px] text-black shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:bg-white hover:text-black sm:min-w-[206px] dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:text-white"
                  >
                    View components
                  </Button>
                </Link>
              </motion.div>
            </div>
          </AnimateEnter>

          {/* Built with — a quiet supporting group under the CTAs. The gap above
              it (mt-7 on top of the CTA wrapper's py-3 ≈ 40px) is >2× the 12px
              gap inside the CTA row, so the two groups read as separate; spacing
              alone carries the split, no divider lines. */}
          <AnimateEnter delay={0.56} isWhileInView={false} className="mt-7 flex flex-col gap-3">
            <span className="flex items-center gap-2 font-inter text-[11px] font-medium uppercase leading-4 tracking-[0.04em] text-neutral-500 dark:text-neutral-400">
              <span
                aria-hidden
                className="h-[7px] w-[7px] border-s-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              Built with
            </span>
            {/* Each wordmark SVG packs its glyphs into its viewBox differently
                (shadcn has a tall `//` icon + small text; tailwind's word nearly
                fills its box; Next is all-caps). Heights are tuned per logo so the
                *words* read at a matching optical size across the row rather than
                matching raw SVG heights. */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-6">
              <Image
                src="/shadcn.svg"
                alt="shadcn/ui"
                width={137}
                height={32}
                className="h-4 w-auto sm:h-5"
                loading="eager"
              />
              <Image
                src="/tailwind.svg"
                alt="Tailwind CSS"
                width={194}
                height={24}
                className="h-[11px] w-auto sm:h-3.5"
                loading="eager"
              />
              <span className="flex items-center gap-1.5">
                <Image
                  src="/framer.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  loading="eager"
                />
                <span className="text-[12px] font-semibold leading-none text-[#797C7C] sm:text-[14px]">
                  Motion
                </span>
              </span>
              <Image
                src="/nextjs.svg"
                alt="Next.js"
                width={120}
                height={24}
                className="h-[11px] w-auto sm:h-[13px]"
                loading="eager"
              />
            </div>
          </AnimateEnter>
        </div>

        {/* Stage: absolutely positioned on desktop so it can overlap the copy
            column by a few percent — the left fade blends that seam. Past the
            1400px frame it runs on to the viewport edge: the right offset is
            half the gap between the frame (100%) and the page (100cqw, from the
            @container in page.tsx), so the clipped canvas never ends mid-air. */}
        <div className="relative h-[56dvh] w-full lg:absolute lg:inset-y-0 lg:left-[42%] lg:right-[calc((100%_-_100cqw)/2)] lg:h-auto lg:w-auto">
          <HeroStage className="absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background via-background/70 to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[22%] bg-linear-to-r from-background via-background/70 to-transparent lg:block"
          />
        </div>
      </div>
    </div>
  );
}
