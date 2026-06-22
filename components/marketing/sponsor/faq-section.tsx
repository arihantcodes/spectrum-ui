"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FaqSectionProps {
  className?: string
}

const faqs = [
  {
    question: "How does billing work?",
    answer: "Monthly placements are billed at the start of each cycle. Newsletter and Launch Feature spots are one-time payments per instance. You can cancel monthly placements anytime — your spot stays active until the end of the billing period."
  },
  {
    question: "What happens when a placement sells out?",
    answer: "We cap inventory to protect value. If your preferred spot is filled, you can join the waitlist. We notify you the moment a slot opens up."
  },
  {
    question: "Can I track performance?",
    answer: "Every sponsor link includes UTM parameters. You'll see traffic and conversions directly in your analytics. We also send a monthly report with impression data for your placements."
  },
  {
    question: "What do I need to provide?",
    answer: "A square logo (SVG or PNG, min 128px), a one-line tagline, and a destination URL. For Launch Features, we'll work with you on the content."
  },
  {
    question: "Can I change my logo or link later?",
    answer: "Yes. Email us anytime to update your creative assets. Changes go live within 24 hours."
  },
  {
    question: "Do you offer custom packages?",
    answer: "If you want multiple placements bundled or a long-term commitment, reach out. We can put together a custom deal with better rates."
  }
]

export function FaqSection({ className }: FaqSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className={cn("py-32 w-full max-w-3xl mx-auto", className)}>

      {/* Animated divider */}
      <div className="w-full flex justify-center mb-20">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-neutral-200 dark:bg-neutral-800 max-w-xs"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-16">
          Common questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-neutral-200/60 dark:border-neutral-800/60 py-1">
              <AccordionTrigger className="text-left text-lg font-medium text-neutral-900 dark:text-neutral-100 py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-500 dark:text-neutral-400 pb-6 leading-relaxed font-serif">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
