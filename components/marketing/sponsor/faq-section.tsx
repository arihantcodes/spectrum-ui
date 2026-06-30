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
    question: "When do I need to pay?",
    answer: "Payment is collected upfront before your placement goes live. Once we receive your application and confirm the slot, we'll send a payment link. Your ad goes live within 48 hours of payment clearing."
  },
  {
    question: "How does billing work?",
    answer: "Monthly placements are billed at the start of each cycle. Your first payment covers the first month. Renewals are charged automatically on the same date each month. You can cancel anytime — your spot stays active until the end of the paid period."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards via Stripe. For annual commitments or custom packages, we can also arrange bank transfers or invoicing."
  },
  {
    question: "Can I get a refund?",
    answer: "Since placements go live immediately after payment, we don't offer refunds once your ad is live. If there's a technical issue on our end causing your placement not to show, we'll either fix it within 24 hours or issue a prorated credit."
  },
  {
    question: "Can I track performance?",
    answer: "Every sponsor link includes UTM parameters so you see traffic and conversions directly in your own analytics. We also send a monthly impressions report."
  },
  {
    question: "What do I need to provide?",
    answer: "A square logo (SVG or PNG, min 128px), a one-line tagline, and a destination URL. That's it — we handle the rest."
  },
  {
    question: "What happens when a placement sells out?",
    answer: "We cap inventory to protect value for existing sponsors. If your preferred slot is filled, submit your application and we'll add you to the waitlist — you'll be notified the moment a spot opens."
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes. If you want multiple placements bundled or a long-term commitment, reach out and we'll put together a custom deal with better rates."
  }
]

export function FaqSection({ className }: FaqSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className={cn("py-16 w-full max-w-3xl mx-auto", className)}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-8">
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
