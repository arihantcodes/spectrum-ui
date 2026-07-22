"use client";

import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

function PlusMinusIcon() {
  return (
    <span
      aria-hidden
      className="relative size-4 shrink-0 text-[#080808] transition-all duration-300 ease-out group-hover:text-[#f9452d] group-data-[state=open]:rotate-180 dark:text-neutral-200 dark:group-hover:text-[#E1F435]"
    >
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[11px] -translate-x-1/2 -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-1/2 h-[11px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ease-out group-data-[state=open]:scale-y-0" />
    </span>
  );
}

/**
 * Reusable FAQ accordion that matches the landing page FAQ exactly
 * (see components/faq-section.tsx) but accepts custom content.
 */
export function FaqAccordion({
  eyebrow = "FAQ",
  title,
  faqs,
}: {
  eyebrow?: string;
  title: ReactNode;
  faqs: { question: string; answer: string }[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container py-16">
      {/* Header */}
      <motion.div
        className="flex flex-col gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: revealEase }}
      >
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="-rotate-90">
            <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
          </span>
          <span className="font-mono text-[12px] font-medium uppercase leading-[16.8px] text-[#171717] dark:text-neutral-200">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-spectral text-[24px] leading-[28.8px] tracking-[-1px] text-[#2d2f2e] dark:text-neutral-100">
          {title}
        </h2>
      </motion.div>

      {/* Accordion */}
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mt-10 w-full max-w-[960px]"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.045, ease: revealEase }}
          >
            <AccordionPrimitive.Item
              value={`faq-${index}`}
              className="border-b border-[#f5f5f5] transition-colors duration-300 hover:border-[#e8e8e8] dark:border-[#1f1f1f] dark:hover:border-neutral-800"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="group flex w-full items-center gap-3.5 px-4 py-4 text-left outline-none transition-colors duration-300 hover:bg-[#fafafa] focus-visible:bg-[#fafafa] dark:hover:bg-neutral-900/50 dark:focus-visible:bg-neutral-900/50">
                  <PlusMinusIcon />
                  <span className="font-spectral text-lg leading-[1.3] tracking-[-0.4px] text-[#080808]/95 transition-[transform,color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-[#080808] dark:text-neutral-100 dark:group-hover:text-white">
                    {faq.question}
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-faq-close data-[state=open]:animate-faq-open motion-reduce:animate-none">
                <div className="pb-[18px] pl-[46px] pr-4">
                  <p className="max-w-[620px] animate-fade-up font-inter text-base leading-6 tracking-[-0.32px] text-[#080808]/75 motion-reduce:animate-none dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          </motion.div>
        ))}
      </AccordionPrimitive.Root>
    </section>
  );
}
