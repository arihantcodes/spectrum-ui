"use client"

import React from "react"
import { HeroSection } from "./sections/hero"
import { TimelineSection } from "./sections/timeline"
import { RepetitionSection } from "./sections/repetition"
import { ComparisonSection } from "./sections/comparison"
import { PhilosophySection } from "./sections/philosophy"
import { BentoShowcaseSection } from "./sections/bento-showcase"
import { MetricsSection } from "./sections/metrics"
import { RoadmapSection } from "./sections/roadmap"
import { LetterSection } from "./sections/letter"
import { FinaleSection } from "./sections/finale"

export default function StoryPage() {
  return (
    <div className="relative w-full bg-neutral-50 dark:bg-[#0C0C0C] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Subtle background noise/grid */}
      {/* <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" /> */}

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col pb-32">
        <HeroSection />
        <TimelineSection />
        <RepetitionSection />
        <ComparisonSection />
        <PhilosophySection />
        <BentoShowcaseSection />
        <MetricsSection />
        <RoadmapSection />
        <LetterSection />
        <FinaleSection />
      </main>
    </div>
  )
}
