import React from "react"
import { HeroSection } from "@/components/marketing/sponsor/hero-section"
import { StatsSection } from "@/components/marketing/sponsor/stats-section"
import { InventorySection } from "@/components/marketing/sponsor/placements-section"
import { SlotsSection } from "@/components/marketing/sponsor/pricing-section"
import { SponsorForm } from "@/components/marketing/sponsor/sponsor-form"
import { FaqSection } from "@/components/marketing/sponsor/faq-section"
import { CtaSection } from "@/components/marketing/sponsor/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sponsor Spectrum UI | Reach 10,000+ Frontend Developers",
  description: "Put your product inside the workflow of frontend developers. Limited sponsor inventory across homepage, docs, components, and newsletter.",
}

export default function SponsorPage() {
  return (
    <div className="relative w-full bg-neutral-50 dark:bg-[#0C0C0C] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Subtle background grid — matching founder-story */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col pb-32">
        <HeroSection />
        <StatsSection />
        <InventorySection />
        <SlotsSection />
        <SponsorForm />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  )
}
