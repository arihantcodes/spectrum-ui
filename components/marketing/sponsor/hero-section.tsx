"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Star, CheckCircle2 } from "lucide-react"

export interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <section ref={containerRef} className={cn("relative w-full flex flex-col items-center justify-start pt-32 pb-20 md:pt-40 md:pb-28", className)}>
      <motion.div style={{ opacity, scale }} className="w-full flex flex-col items-center z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 mb-8"
        >
          {/* <Star className="w-3.5 h-3.5 text-neutral-500" /> */}
          <span className="text-xs font-medium tracking-wide text-neutral-600 dark:text-neutral-300">
            Founding Sponsors Open
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl px-4 text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]"
        >
          Get your product in front of developers while they build.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mt-6 px-4 text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
        >
          Spectrum UI is where frontend engineers discover tools and components. 
          Your brand lives natively inside documentation and code snippets—not in banner ads they scroll past.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mt-10 space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="#slots" 
              className="px-8 py-3.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              View available spots
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#apply?tier=founding');
                window.dispatchEvent(new CustomEvent('open-sponsor-modal', { detail: { tier: 'founding' } }));
              }}
              className="px-8 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-transparent text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
            >
              Apply as Founding Sponsor
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> High-intent traffic</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Native placement</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Cancel anytime</span>
          </div>
        </motion.div>

        {/* Product Placement Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mt-20 px-4"
        >
          <div className="relative rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white dark:bg-[#0A0A0A] shadow-2xl overflow-hidden">
            
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md w-64 mx-auto flex items-center justify-center shadow-sm">
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">ui.spectrumhq.in/docs/components</span>
                </div>
              </div>
            </div>

            {/* Page content mockup */}
            <div className="flex min-h-[400px]">
              {/* Sidebar */}
              <div className="w-48 border-r border-neutral-200/50 dark:border-neutral-800/50 p-4 hidden md:block bg-neutral-50/30 dark:bg-transparent">
                <div className="space-y-2">
                  <div className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">Getting Started</div>
                  {["Introduction", "Installation", "Typography"].map((item) => (
                    <div key={item} className="h-6 rounded-md px-2 flex items-center text-[11px] text-neutral-500 dark:text-neutral-400">
                      {item}
                    </div>
                  ))}
                  
                  <div className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-6 mb-3">Components</div>
                  {["Button", "Card", "Dialog", "Input", "Tabs", "Toast"].map((item, i) => (
                    <div key={item} className={cn(
                      "h-7 rounded-md px-2 flex items-center text-[11px] transition-colors",
                      i === 2 ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-500 dark:text-neutral-400"
                    )}>
                      {item}
                    </div>
                  ))}

                  {/* Sidebar Sponsor Mockup */}
                  <div className="mt-8">
                    <div className="text-[9px] font-mono uppercase text-neutral-400 mb-2 px-2">Sponsored</div>
                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 flex flex-col gap-2 shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-neutral-900 dark:bg-white flex items-center justify-center">
                          <Star className="w-3 h-3 text-white dark:text-black" />
                        </div>
                        <div className="text-[11px] font-medium text-neutral-900 dark:text-white">Your Logo</div>
                      </div>
                      <div className="text-[9px] text-neutral-500 leading-tight">
                        Your product description goes here.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-8 md:p-12 text-left">
                <div className="h-4 bg-neutral-200/60 dark:bg-neutral-800/60 rounded w-24 mb-4" />
                <div className="h-8 bg-neutral-900/10 dark:bg-neutral-100/10 rounded w-64 mb-6" />
                <div className="space-y-2 mb-10">
                  <div className="h-2.5 bg-neutral-200/50 dark:bg-neutral-800/50 rounded w-full max-w-xl" />
                  <div className="h-2.5 bg-neutral-200/50 dark:bg-neutral-800/50 rounded w-5/6 max-w-lg" />
                  <div className="h-2.5 bg-neutral-200/50 dark:bg-neutral-800/50 rounded w-4/6 max-w-md" />
                </div>

                {/* Component preview */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <div className="flex items-center gap-4 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 h-10">
                    <div className="text-[11px] font-medium text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white h-full flex items-center pt-[2px]">Preview</div>
                    <div className="text-[11px] font-medium text-neutral-500">Code</div>
                  </div>
                  <div className="h-48 bg-white dark:bg-black flex items-center justify-center p-8">
                    {/* Mockup Button */}
                    <div className="h-9 px-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-md flex items-center justify-center text-sm font-medium shadow-sm">
                      Open Dialog
                    </div>
                  </div>
                </div>

                {/* Inline Sponsor Placement */}
                <div className="mt-8 flex items-start gap-4">
                  <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1 mt-3" />
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Component Sponsor</div>
                  <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1 mt-3" />
                </div>
                
                <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 p-4 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center shadow-sm">
                      <Star className="w-5 h-5 text-white dark:text-black" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">Your Brand</div>
                      <div className="text-xs text-neutral-500 mt-0.5">A short, catchy description of what your product does.</div>
                    </div>
                  </div>
                  <div className="hidden sm:flex px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                    Learn more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
