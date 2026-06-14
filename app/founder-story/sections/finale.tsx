"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Heart, Code2 } from "lucide-react"

const communityCards = [
  { title: "Contribute", description: "Help build the next generation of components.", icon: Github },
  { title: "Sponsor", description: "Support the ongoing development of the ecosystem.", icon: Heart },
  { title: "Build", description: "Start using Spectrum UI in your projects today.", icon: Code2 },
]

export function FinaleSection() {
  const communityRef = useRef<HTMLDivElement>(null)
  const isCommunityInView = useInView(communityRef, { once: true, margin: "-100px" })

  const finaleRef = useRef<HTMLDivElement>(null)
  const isFinaleInView = useInView(finaleRef, { once: true, margin: "-100px" })

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* FINAL SECTION */}
      <section ref={finaleRef} className="min-h-screen w-full flex flex-col justify-center items-center py-48 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isFinaleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-32"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.2] text-neutral-900 dark:text-white">
            The goal was never to build components.<br />
            <span className="text-neutral-400 dark:text-neutral-500">The goal was to give developers more time to build ideas.</span>
          </h1>

          <div className="flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-2xl tracking-widest uppercase font-bold text-neutral-900 dark:text-white">Spectrum UI</span>
              <div className="flex space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
                <span>Built in public.</span>
                <span>•</span>
                <span>Built for developers.</span>
                <span>•</span>
                <span>Built to last.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/docs" className="px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:scale-105 transition-transform duration-300">
                Explore Components
              </a>
              <a href="https://github.com/arihantcodes/spectrum-ui" className="px-8 py-4 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
                Support the Project
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
