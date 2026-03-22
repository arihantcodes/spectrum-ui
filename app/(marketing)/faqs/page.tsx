import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";

export default function FAQPage() {
  return (
    <div className="container max-w-2xl mx-auto space-y-12 py-24">
      <BreadcrumbNav 
        items={[{ label: 'Frequently Asked Questions' }]} 
        className="mb-4"
      />
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-[#F5F5F5]">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-neutral-500 dark:text-[#666]">
          Everything you need to know about Spectrum UI and Pro features.
        </p>
      </div>

      <div className="space-y-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-pro-1" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              What is Spectrum UI Pro?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              Spectrum UI Pro provides access to a collection of premium, 
              production-ready Next.js templates. Each template is built with 
              best practices, high-performance animations, and seamless 
              integrations like Dodo Payments and Supabase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-pro-2" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              How do I get access to Pro templates?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              After a successful purchase, repository access is automatically 
              granted to your GitHub account. You can manage your access 
              anytime from your <a href="/dashboard" className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4">Dashboard</a>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-pro-3" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              What is the refund policy?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              Due to the nature of digital products and instant access to source code, 
              we maintain a strict <strong>no-refund policy</strong>. Please 
              explore the live previews carefully before making a purchase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              Is this a component library?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              No. Spectrum UI is not a component library. It&apos;s a collection
              of re-usable components and templates that you can copy and paste into your
              projects.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              Can I use this for client work?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              Yes. You are free to use these components and templates for personal 
              and commercial projects for your clients. Redistribution of the 
              original source code is not allowed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-neutral-200 dark:border-[#222]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-[#AAA] transition-colors">
              How do I get support?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-[#666] leading-relaxed">
              If you run into any issues or have questions, reach out via email 
              at <span className="font-medium text-neutral-900 dark:text-[#F5F5F5]">jainari1208@gmail.com</span> or 
              DM us on <a href="https://x.com/arihantcodes" target="_blank" className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4">X/Twitter</a>.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
