"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowDown } from "lucide-react"

const oldWorkflow = [
  "Create project",
  "Search component",
  "Open 15 tabs",
  "Copy code",
  "Fix bugs",
  "Restyle",
  "Repeat"
]

const newWorkflow = [
  "Open Spectrum UI",
  "Copy",
  "Customize",
  "Ship"
]

export function ComparisonSection() {
  const statementRef = useRef<HTMLDivElement>(null)
  const isStatementInView = useInView(statementRef, { once: true, margin: "-100px" })

  const comparisonRef = useRef<HTMLDivElement>(null)
  const isComparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" })

  return (
    <div className="flex flex-col w-full">
      
      {/* SECTION 3: Big Statement */}
      <section ref={statementRef} className="py-48 flex items-center justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-center leading-[1.2]"
        >
          We weren&apos;t lacking creativity.<br />
          <span className="text-neutral-400 dark:text-neutral-600">We were wasting it.</span>
        </motion.h2>
      </section>

      {/* SECTION 4: Interactive Comparison */}
      <section ref={comparisonRef} className="py-24 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12">
          
          {/* Old Workflow */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-400 mb-12">
              Old Workflow
            </h3>
            <div className="flex flex-col items-center">
              {oldWorkflow.map((step, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isComparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm w-48 text-center text-neutral-600 dark:text-neutral-300 font-medium"
                  >
                    {step}
                  </motion.div>
                  {i !== oldWorkflow.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={isComparisonInView ? { opacity: 1, height: 24 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: (i * 0.15) + 0.1 }}
                      className="my-2 flex flex-col items-center text-neutral-300 dark:text-neutral-700"
                    >
                      <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800" />
                      <ArrowDown className="w-4 h-4 -mt-2 text-neutral-300 dark:text-neutral-700" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* New Workflow */}
          <div className="flex flex-col items-center relative">
             <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-900 dark:text-white mb-12 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                New Workflow
             </h3>
             <div className="flex flex-col items-center relative z-10">
               {newWorkflow.map((step, i) => (
                 <React.Fragment key={i}>
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={isComparisonInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.6, delay: 1.5 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
                     className="px-6 py-3 rounded-lg border-2 border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 shadow-xl w-48 text-center text-white dark:text-neutral-900 font-bold"
                   >
                     {step}
                   </motion.div>
                   {i !== newWorkflow.length - 1 && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={isComparisonInView ? { opacity: 1, height: 24 } : { opacity: 0, height: 0 }}
                       transition={{ duration: 0.3, delay: 1.5 + (i * 0.2) + 0.1 }}
                       className="my-2 flex flex-col items-center"
                     >
                       <div className="w-0.5 h-full bg-neutral-900 dark:bg-neutral-100" />
                       <ArrowDown className="w-5 h-5 -mt-2 text-neutral-900 dark:text-neutral-100" />
                     </motion.div>
                   )}
                 </React.Fragment>
               ))}
             </div>
             
             {/* Glow background behind new workflow */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={isComparisonInView ? { opacity: 1 } : { opacity: 0 }}
               transition={{ duration: 1, delay: 1.5 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full blur-[80px] -z-10"
             />
          </div>

        </div>
      </section>

    </div>
  )
}
