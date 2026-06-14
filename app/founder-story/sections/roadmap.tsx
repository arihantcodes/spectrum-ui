"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

const roadmapItems = [
  { title: "The Idea", status: "past" },
  { title: "Spectrum UI Launch", status: "past" },
  { title: "100+ Components", status: "past" },
  { title: "Blocks", status: "past" },
  { title: "MCP Server", status: "present" },
  { title: "Templates", status: "future" },
  { title: "AI Generation", status: "future" },
  { title: "Developer Community", status: "future" },
  { title: "The Spectrum Ecosystem", status: "future" },
]

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-32 max-w-4xl mx-auto w-full">
      <div className="mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          The Roadmap
        </motion.h2>
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2" />

        <div className="space-y-16">
          {roadmapItems.map((item, i) => {
            const isLeft = i % 2 === 0
            const isPresent = item.status === "present"
            const isPast = item.status === "past"

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full z-10 transition-colors duration-500 ${
                    isPresent ? 'bg-neutral-900 dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)]' :
                    isPast ? 'bg-neutral-400 dark:bg-neutral-600' :
                    'bg-neutral-200 dark:bg-neutral-800'
                  }`} />
                  {/* Glow ring for present */}
                  {isPresent && (
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute w-8 h-8 rounded-full border border-neutral-900 dark:border-white z-0"
                    />
                  )}
                </div>

                {/* Content Box */}
                <div className={`w-5/12 ${isLeft ? 'text-right pr-8 md:pr-12' : 'text-left pl-8 md:pl-12'}`}>
                  <span className={`text-lg md:text-2xl font-medium tracking-tight ${
                    isPresent ? 'text-neutral-900 dark:text-white' :
                    isPast ? 'text-neutral-500 dark:text-neutral-400' :
                    'text-neutral-400 dark:text-neutral-600'
                  }`}>
                    {item.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
