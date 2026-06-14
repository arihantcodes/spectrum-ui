"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function LetterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-32 w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-center mb-16">
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
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12 text-2xl md:text-3xl lg:text-4xl font-serif text-neutral-800 dark:text-neutral-200 leading-[1.6] md:leading-[1.7] tracking-tight"
      >
        <p>
          &quot;When I started building products, I thought the difficult part would be solving problems.
        </p>
        <p>
          Instead, I spent years rebuilding buttons, cards, dialogs, and layouts.
        </p>
        <p>
          The internet has millions of components. But very few feel thoughtfully crafted.
        </p>
        <p>
          Spectrum UI exists because developers deserve better defaults.
        </p>
        <p>
          I don&apos;t want another component library. I want a library that developers trust enough to start every project with.&quot;
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full mt-24 flex justify-end pr-8"
      >
        <div className="flex flex-col items-end space-y-1">
           <span className="font-serif italic text-3xl text-neutral-900 dark:text-white">Arihant</span>
           <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">Founder, Spectrum UI</span>
        </div>
      </motion.div>
    </section>
  )
}
