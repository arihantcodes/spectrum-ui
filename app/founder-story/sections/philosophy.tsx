"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

const principles = [
  { id: "01", title: "Build once.", text: "Reuse forever." },
  { id: "02", title: "Animation should communicate.", text: "Not distract." },
  { id: "03", title: "Developers deserve", text: "beautiful defaults." },
  { id: "04", title: "Open source should compete", text: "with premium products." },
  { id: "05", title: "The best components disappear", text: "into your product." },
]

export function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-32 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-16 lg:gap-24">
        
        {/* Left Column (Stretches to the height of the grid, parent of sticky container) */}
        <div>
          <div className="lg:sticky lg:top-32 w-full">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                src="/arihant.jpeg"
                alt="Founder Philosophy"
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Right: Principles */}
        <div className="flex flex-col space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-neutral-900 dark:text-white">
              The Philosophy
            </h2>
          </motion.div>

          <div className="space-y-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A0A] overflow-hidden transition-all duration-500 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-neutral-100/50 to-transparent dark:from-neutral-800/20 dark:to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col space-y-4">
                  <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500">
                    {p.id}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="text-lg text-neutral-500 dark:text-neutral-400 font-serif">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
