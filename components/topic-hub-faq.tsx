'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion, useReducedMotion } from 'framer-motion';

import type { TopicHubFAQ } from '@/content/topic-hubs';

const revealEase = [0.22, 1, 0.36, 1] as const;

function PlusMinusIcon() {
  return (
    <span
      aria-hidden
      className="relative size-4 shrink-0 text-neutral-400 transition-all duration-300 ease-out group-hover:text-neutral-900 group-data-[state=open]:rotate-180 dark:text-neutral-500 dark:group-hover:text-neutral-100"
    >
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[11px] -translate-x-1/2 -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-1/2 h-[11px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ease-out group-data-[state=open]:scale-y-0" />
    </span>
  );
}

export function TopicHubFaq({ faqs }: { faqs: readonly TopicHubFAQ[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <AccordionPrimitive.Root type="single" collapsible className="mt-8 w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: index * 0.045, ease: revealEase }}
        >
          <AccordionPrimitive.Item
            value={`faq-${index}`}
            className="border-b border-neutral-200 transition-colors duration-300 first:border-t hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group flex w-full items-center gap-3.5 py-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600">
                <PlusMinusIcon />
                <span className="font-regular text-base font-medium tracking-[-0.01em] text-neutral-900 transition-transform duration-300 ease-out group-hover:translate-x-0.5 dark:text-neutral-100">
                  {faq.question}
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-faq-close data-[state=open]:animate-faq-open motion-reduce:animate-none">
              <div className="pb-6 pl-[30px] pr-4">
                <p className="max-w-2xl animate-fade-up font-inter text-[15px] leading-7 text-neutral-600 motion-reduce:animate-none dark:text-neutral-400">
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
