"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const faqs = [
  {
    question: "Is Spectrum UI a component library?",
    answer: "No, Spectrum UI is a curated collection of copy-paste React, Next.js, and Tailwind CSS components. Rather than installing it as a heavy package dependency, you copy the source code directly into your own project. This gives you 100% control over the styling, responsiveness, and performance."
  },
  {
    question: "How do I add components to my project?",
    answer: "You can copy-paste code snippets directly from our documentation. Alternatively, you can use our developer CLI! Simply run 'npx spectrum-ui add <component-name>' in your project terminal to automatically install the component and all of its required dependencies."
  },
  {
    question: "Can I use Spectrum UI with Next.js App Router & Server Components?",
    answer: "Yes, absolutely! All of our components are designed with Next.js App Router and React Server Components (RSC) best practices in mind. Interactive components are pre-configured with the 'use client' directive, while layout and visual items remain server-renderable for peak speed."
  },
  {
    question: "What styling dependencies are required?",
    answer: "Our design system is built entirely on Tailwind CSS and Framer Motion for high-fidelity animations. Some interactive overlays use Radix UI primitives. The installation documentation for each individual component clearly details any package prerequisites."
  },
  {
    question: "Can I use these components in commercial projects or client work?",
    answer: "Yes, you can use all free and Pro templates/components in commercial projects, personal portfolios, SaaS apps, and client work. The only restriction is that you cannot redistribute or resell the raw source code as a competing component library or boilerplate."
  },
  {
    question: "What is Spectrum UI Pro?",
    answer: "Spectrum UI Pro is our premium collection of production-ready Next.js templates. Each template features professional animated UI interfaces, fully configured Supabase databases, built-in Dodo Payments integrations, and secure NextAuth authentication out of the box."
  },
  {
    question: "How do I get access to Pro templates after purchasing?",
    answer: "Access is granted immediately to your GitHub account upon purchase. You can link your GitHub account and manage your template repositories at any time from your Spectrum UI Dashboard."
  },
  {
    question: "What is the refund policy?",
    answer: "Due to the digital nature of our products and the immediate delivery of full source code access, we maintain a strict no-refund policy. We encourage you to try our free components and explore Pro live previews carefully before making a purchase."
  },
  {
    question: "How do I get support or report bugs?",
    answer: "If you run into any issues, you can contact us via email at jainari1208@gmail.com, ask questions in our active developer chat, or send a direct message on X/Twitter @arihantcodes."
  }
]

export function FAQSection() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      {/* Title & Description */}
      <div className="space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-[#F5F5F5] sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 dark:text-[#666] max-w-xl mx-auto">
          Everything you need to know about Spectrum UI, component installation, CLI usage, and Pro templates.
        </p>
      </div>

      {/* Accordion container */}
      <div className="max-w-3xl mx-auto bg-white/40 dark:bg-[#0C0C0C]/40  backdrop-blur-[2px] rounded-2xl p-6 sm:p-8 ">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-neutral-200 dark:border-[#1F1F1F] last:border-b-0"
            >
              <AccordionTrigger className="text-left py-4 text-neutral-800 dark:text-[#E5E5E5] hover:no-underline hover:text-neutral-950 dark:hover:text-white transition-colors font-medium text-sm sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed text-sm pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
