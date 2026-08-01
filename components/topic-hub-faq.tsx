'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion, useReducedMotion } from 'framer-motion';

import type { TopicHubFAQ } from '@/content/topic-hubs';

const revealEase = [0.22, 1, 0.36, 1] as const;

/** Same plus/minus glyph as the landing FAQ (components/faq-section.tsx). */
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

/** Hub FAQ — one-for-one restyle of the landing page FAQ accordion. */
export function TopicHubFaq({ faqs }: { faqs: readonly TopicHubFAQ[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue="faq-0"
      className="mt-9 w-full max-w-[960px]"
    >
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.55,
            delay: index * 0.045,
            ease: revealEase,
          }}
        >
          <AccordionPrimitive.Item
            value={`faq-${index}`}
            className="border-b border-[#f5f5f5] transition-colors duration-300 hover:border-[#e8e8e8] dark:border-[#1f1f1f] dark:hover:border-neutral-800"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group flex w-full items-center gap-3.5 px-4 py-4 text-left outline-hidden transition-colors duration-300 hover:bg-[#fafafa] focus-visible:bg-[#fafafa] dark:hover:bg-neutral-900/50 dark:focus-visible:bg-neutral-900/50">
                <PlusMinusIcon />
                <span className="font-spectral text-lg leading-[1.3] tracking-[-0.4px] text-[#080808]/95 transition-[transform,color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-[#080808] dark:text-neutral-100 dark:group-hover:text-white">
                  {faq.question}
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-faq-close data-[state=open]:animate-faq-open motion-reduce:animate-none">
              <div className="pb-[18px] pl-[46px] pr-4">
                <p className="max-w-[520px] animate-fade-up font-inter text-base leading-6 tracking-[-0.32px] text-[#080808]/75 motion-reduce:animate-none dark:text-neutral-400">
                  {faq.answer}
                </p>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </motion.div>
      ))}
    </AccordionPrimitive.Root>
  );
}
