"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, ArrowRight } from "lucide-react";
import type { Comparison, CellValue } from "@/lib/comparisons";
import { cn } from "@/lib/utils";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FrameBand } from "@/components/compare/frame";
import { FaqAccordion } from "@/components/compare/faq-accordion";

// Site-cohesive strong ease-out (matches the landing FAQ / hero).
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="-rotate-90">
        <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
      </span>
      <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
        {label}
      </span>
    </div>
  );
}

/** "Spectrum UI vs X" rendered with an editorial, muted "vs". */
function VsHeading({ competitor }: { competitor: string }) {
  return (
    <h1 className="font-spectral text-[36px] leading-[1.02] tracking-[-1.6px] text-[#111110] dark:text-neutral-50 md:text-[56px]">
      Spectrum UI
      <span className="mx-2.5 align-middle font-mono text-[0.42em] font-medium uppercase tracking-[0.12em] text-[#080808]/40 dark:text-neutral-500 md:mx-3.5">
        vs
      </span>
      {competitor}
    </h1>
  );
}

function ValueCell({ value, own }: { value: CellValue; own?: boolean }) {
  if (value === true) {
    return own ? (
      <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-[#f9452d] text-white dark:bg-[#E1F435] dark:text-black">
        <Check className="size-[13px]" strokeWidth={2.75} />
        <span className="sr-only">Yes</span>
      </span>
    ) : (
      <span className="inline-flex items-center text-[#080808]/45 dark:text-neutral-500">
        <Check className="size-[18px]" strokeWidth={2.25} />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-neutral-300 dark:text-neutral-700">
        <Minus className="size-[18px]" />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "font-inter text-[13px] leading-5 tracking-[-0.2px]",
        own
          ? "font-medium text-[#111110] dark:text-neutral-100"
          : "text-[#080808]/65 dark:text-neutral-400"
      )}
    >
      {value}
    </span>
  );
}

export function ComparisonView({
  data,
  reviewedLabel,
}: {
  data: Comparison;
  reviewedLabel: string;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <FrameBand>
        <section className="container py-16 md:py-24">
          <BreadcrumbNav
            items={[
              { label: "Compare", href: "/compare" },
              { label: `vs ${data.competitor}` },
            ]}
            className="mb-10"
          />
          <motion.div className="flex flex-col gap-6" {...reveal(reduce)}>
            <Eyebrow label="Compare" />
            <VsHeading competitor={data.competitor} />
            <p className="max-w-[62ch] font-inter text-[17px] leading-[1.65] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[19px]">
              {data.intro}
            </p>
          </motion.div>

          {/* Positioning summary — editorial accent bars, not boxes */}
          <div className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            <motion.div
              {...reveal(reduce, 0.06)}
              className="border-l-2 border-[#f9452d] pl-5 dark:border-[#E1F435]"
            >
              <div className="font-mono text-[11px] font-medium uppercase tracking-widest text-[#f9452d] dark:text-[#E1F435]">
                Spectrum UI
              </div>
              <p className="mt-2.5 font-inter text-[14.5px] leading-[1.6] tracking-[-0.2px] text-[#080808]/78 dark:text-neutral-300">
                {data.spectrumPitch}
              </p>
            </motion.div>
            <motion.div
              {...reveal(reduce, 0.12)}
              className="border-l-2 border-border pl-5"
            >
              <div className="font-mono text-[11px] font-medium uppercase tracking-widest text-[#080808]/55 dark:text-neutral-400">
                {data.competitor}
              </div>
              <p className="mt-2.5 font-inter text-[14.5px] leading-[1.6] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400">
                {data.competitorPitch}
              </p>
            </motion.div>
          </div>
        </section>
      </FrameBand>

      {/* ── Feature table ────────────────────────────────────── */}
      <FrameBand>
        <section className="container py-16 md:py-20">
          <motion.div {...reveal(reduce)} className="mb-10 flex flex-col gap-3">
            <Eyebrow label="Side by side" />
            <h2 className="font-spectral text-[26px] leading-[1.12] tracking-[-0.9px] text-[#111110] dark:text-neutral-50 md:text-[32px]">
              Feature comparison
            </h2>
          </motion.div>

          <motion.div {...reveal(reduce, 0.05)} className="max-w-[840px] overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="w-1/2 pb-4 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#080808]/45 dark:text-neutral-500">
                    Feature
                  </th>
                  <th className="w-[26%] rounded-t-xl border-t-2 border-[#f9452d] bg-[#f9452d]/5 px-5 pb-4 pt-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f9452d] dark:border-[#E1F435] dark:bg-[#E1F435]/6 dark:text-[#E1F435]">
                    Spectrum UI
                  </th>
                  <th className="w-[26%] px-5 pb-4 pt-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#080808]/45 dark:text-neutral-500">
                    {data.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => {
                  const last = i === data.rows.length - 1;
                  return (
                    <tr key={row.feature} className="group">
                      <th
                        scope="row"
                        className="border-t border-border/70 py-4 pr-4 text-left align-middle font-inter text-[14px] font-normal leading-[1.4] tracking-[-0.2px] text-[#080808]/85 dark:text-neutral-200"
                      >
                        {row.feature}
                      </th>
                      <td
                        className={cn(
                          "border-t border-[#f9452d]/12 bg-[#f9452d]/5 px-5 py-4 align-middle dark:border-[#E1F435]/12 dark:bg-[#E1F435]/6",
                          last && "rounded-b-xl"
                        )}
                      >
                        <ValueCell value={row.spectrum} own />
                      </td>
                      <td className="border-t border-border/70 px-5 py-4 align-middle">
                        <ValueCell value={row.competitor} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </section>
      </FrameBand>

      {/* ── When to choose ───────────────────────────────────── */}
      <FrameBand>
        <section className="container grid gap-y-12 py-16 md:grid-cols-2 md:gap-x-16 md:py-20">
          <motion.div {...reveal(reduce)}>
            <h2 className="font-spectral text-[21px] leading-[1.2] tracking-[-0.6px] text-[#111110] dark:text-neutral-50">
              Choose Spectrum UI when
            </h2>
            <ul className="mt-6 space-y-4">
              {data.chooseSpectrum.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span className="mt-[3px] inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#f9452d]/12 text-[#f9452d] dark:bg-[#E1F435]/12 dark:text-[#E1F435]">
                    <Check className="size-[11px]" strokeWidth={3} />
                  </span>
                  <span className="font-inter text-[14.5px] leading-[1.55] tracking-[-0.2px] text-[#080808]/72 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...reveal(reduce, 0.08)} className="md:border-l md:border-border md:pl-16">
            <h2 className="font-spectral text-[21px] leading-[1.2] tracking-[-0.6px] text-[#111110] dark:text-neutral-50">
              Choose {data.competitor} when
            </h2>
            <ul className="mt-6 space-y-4">
              {data.chooseCompetitor.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span className="mt-[3px] inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-black/5 text-[#080808]/45 dark:bg-white/6 dark:text-neutral-500">
                    <Check className="size-[11px]" strokeWidth={3} />
                  </span>
                  <span className="font-inter text-[14.5px] leading-[1.55] tracking-[-0.2px] text-[#080808]/72 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
      </FrameBand>

      {/* ── FAQ (landing accordion) ──────────────────────────── */}
      <FrameBand>
        <FaqAccordion
          eyebrow="FAQ"
          title={
            <>
              Spectrum UI vs {data.competitor}
              <br />
              questions
            </>
          }
          faqs={data.faqs}
        />
      </FrameBand>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <FrameBand>
        <section className="container py-20 md:py-24">
          <motion.div
            {...reveal(reduce)}
            className="flex flex-col items-start gap-9 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-[30ch]">
              <h2 className="font-spectral text-[30px] leading-[1.05] tracking-[-1.2px] text-[#111110] dark:text-neutral-50 md:text-[40px]">
                Ship it with Spectrum UI
              </h2>
              <p className="mt-4 font-inter text-[15px] leading-[1.6] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400">
                Free, open source, copy-paste. Browse the components or install
                with the shadcn CLI.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/docs"
                className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#111110] px-6 font-inter text-[15px] font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-black active:scale-[0.97] dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Browse components
                <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Link>
              <a
                href={data.competitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-border bg-transparent px-6 font-inter text-[15px] font-medium text-[#080808]/75 transition-[transform,border-color,color] duration-150 ease-out hover:border-[#080808]/25 hover:text-[#111110] active:scale-[0.97] dark:text-neutral-300 dark:hover:border-white/25 dark:hover:text-white"
              >
                Visit {data.competitor}
              </a>
            </div>
          </motion.div>
          <p className="mt-14 max-w-[60ch] font-inter text-[12px] leading-normal text-[#080808]/40 dark:text-neutral-600">
            Comparison based on publicly available information, last reviewed{" "}
            {reviewedLabel}. Details for {data.competitor} may change — verify
            current features on their site.
          </p>
        </section>
      </FrameBand>
    </>
  );
}
