"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function RepetitionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-150px" })

  return (
    <section ref={containerRef} className="relative w-full py-32 flex flex-col items-center justify-center min-h-screen">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24 z-20"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 dark:text-neutral-100 mb-6">
          Every project looked different.<br />
          <span className="text-neutral-400 dark:text-neutral-500">The work didn&apos;t.</span>
        </h2>
      </motion.div>

      {/* Interactive Visualization */}
      <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
        
        {/* Project A */}
        <motion.div 
          initial={{ x: -200, y: -50, rotate: -5, opacity: 0 }}
          animate={isInView ? { 
            x: [ -200, 0, 0 ], 
            y: [ -50, 0, 0 ], 
            rotate: [ -5, 0, 0 ], 
            opacity: [ 0, 1, 0 ] 
          } : {}}
          transition={{ duration: 4, times: [0, 0.4, 1], repeat: Infinity, repeatDelay: 1 }}
          className="absolute w-64 md:w-80 h-48 bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden"
        >
          <div className="h-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center px-2 space-x-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <span className="text-[8px] font-medium text-neutral-400 ml-2">Project A</span>
          </div>
          <div className="p-4 space-y-2">
             <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
             <div className="h-20 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
             <div className="h-4 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
          </div>
        </motion.div>

        {/* Project B */}
        <motion.div 
          initial={{ x: 200, y: 50, rotate: 5, opacity: 0 }}
          animate={isInView ? { 
            x: [ 200, 0, 0 ], 
            y: [ 50, 0, 0 ], 
            rotate: [ 5, 0, 0 ], 
            opacity: [ 0, 1, 0 ] 
          } : {}}
          transition={{ duration: 4, times: [0, 0.4, 1], repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
          className="absolute w-64 md:w-80 h-48 bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden"
        >
          <div className="h-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center px-2 space-x-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
             <span className="text-[8px] font-medium text-neutral-400 ml-2">Project B</span>
          </div>
          <div className="p-4 space-y-2 flex gap-2">
             <div className="h-24 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
             <div className="flex-1 space-y-2">
               <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
               <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
             </div>
          </div>
        </motion.div>

        {/* The Components Pile (Revealed when windows collapse) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: [0.8, 1, 1], opacity: [0, 0, 1] } : {}}
          transition={{ duration: 4, times: [0, 0.6, 0.8], repeat: Infinity, repeatDelay: 1 }}
          className="absolute w-64 md:w-80 h-48 flex items-center justify-center flex-col z-10"
        >
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Navbar</div>
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Card</div>
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Modal</div>
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Button</div>
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Table</div>
            <div className="h-8 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono">Dropdown</div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: [0, 0, 1], y: [10, 10, 0] } : {}}
            transition={{ duration: 4, times: [0, 0.8, 0.9], repeat: Infinity, repeatDelay: 1 }}
            className="mt-6 font-semibold tracking-widest uppercase text-neutral-900 dark:text-white"
          >
            Spectrum UI
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
