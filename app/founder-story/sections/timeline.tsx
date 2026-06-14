"use client"

import React, { useRef } from "react"
import { motion, useInView, useScroll } from "framer-motion"

function ScrollRevealLine({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  })

  return (
    <div ref={ref} className="relative inline-block text-2xl md:text-4xl font-semibold tracking-tighter">
      {/* Base Layer (Gray) */}
      <span className="text-neutral-300 dark:text-neutral-700">
        {text}
      </span>
      {/* Active Layer (Black/White) */}
      <motion.span
        style={{ opacity: scrollYProgress }}
        className="absolute inset-0 left-0 top-0 w-full h-full text-neutral-900 dark:text-neutral-100 select-none text-center"
      >
        {text}
      </motion.span>
    </div>
  )
}
const timelineData = [
  {
    year: "2022",
    title: "The Beginning",
    description:
      "Learning, experimenting, and building every project from scratch.",
  },
  {
    year: "2023",
    title: "Real-World Experience",
    description:
      "Working with startups and clients taught me how products are actually built under deadlines.",
  },
  {
    year: "2024",
    title: "The Repetition",
    description:
      "Every project looked different, but every project started with the same components and the same repetitive work.",
  },
  {
    year: "Nov 2024",
    title: "Spectrum UI",
    description:
      "A simple idea: build beautiful components once, so developers can focus on building ideas instead of rebuilding interfaces.",
  },
  {
    year: "2025–Present",
    title: "The Mission",
    description:
      "Creating an open-source ecosystem of world-class components and tools that developers can trust to start every project with.",
  },
]
const problems = [
  "Same components.",
  "Same animations.",
  "Same problems."
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
            How it started
          </h2>
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
        </motion.div>

        <div className="space-y-16">
          {timelineData.map((item, index) => {
            return (
              <TimelineItem key={index} item={item} index={index} />
            )
          })}
          
          <div className="pt-24 space-y-6 flex flex-col items-center justify-center text-center">
             <div className="w-px h-24 bg-gradient-to-b from-neutral-200 to-transparent dark:from-neutral-800 absolute -mt-32" />
             {problems.map((prob, i) => (
                <ScrollRevealLine key={i} text={prob} />
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start group"
    >
      <div className="md:col-span-3 flex md:justify-end">
         <span className="text-xl md:text-2xl font-serif text-neutral-400 dark:text-neutral-500 tabular-nums">
           {item.year}
         </span>
      </div>
      
      <div className="hidden md:flex md:col-span-1 justify-center relative h-full">
         <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 absolute top-4 group-last:bg-gradient-to-b group-last:from-neutral-200 group-last:to-transparent dark:group-last:from-neutral-800" />
         <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2 z-10 ring-4 ring-neutral-50 dark:ring-[#0C0C0C] transition-colors duration-500 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100" />
      </div>

      <div className="md:col-span-8 flex flex-col space-y-2">
         <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100">
           {item.title}
         </h3>
         <p className="text-neutral-500 dark:text-neutral-400 font-serif">
           {item.description}
         </p>
      </div>
    </motion.div>
  )
}
