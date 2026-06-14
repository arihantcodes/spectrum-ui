"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Copy } from "lucide-react"

interface WindowProps {
  title: string
  content: string
  className: string
  rotate: number
  hoverRotate: number
  x: number
  y: number
  hoverX: number
  hoverY: number
}

function ChaosWindow({ title, content, className, rotate, hoverRotate, x, y, hoverX, hoverY }: WindowProps) {
  return (
    <motion.div
      initial={{ x, y, rotate }}
      whileHover={{ 
        x: hoverX, 
        y: hoverY, 
        rotate: hoverRotate,
        scale: 1.05,
        zIndex: 50
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`absolute p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg w-40 sm:w-52 font-mono text-[8.5px] sm:text-[10px] text-neutral-400 select-none ${className}`}
    >
      <div className="flex items-center space-x-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-150 dark:bg-neutral-900" />
        <span className="text-[8px] text-neutral-400 dark:text-neutral-500 pl-1">{title}</span>
      </div>
      <p className="font-sans text-neutral-600 dark:text-neutral-300 leading-normal text-[11px] font-medium">{content}</p>
    </motion.div>
  )
}

function ClarityWindow() {
  const [copied, setCopied] = useState(false)
  const code = `npx spectrum-ui add button`

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(code)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative w-full max-w-[420px] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A0A] p-6 shadow-2xl flex flex-col space-y-6 overflow-hidden group/clarity">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-100/50 to-transparent dark:from-neutral-850/20 dark:to-transparent pointer-events-none" />
      
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 relative z-10">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">spectrum-ui</span>
      </div>
      
      {/* Content */}
      <div className="flex flex-col space-y-4 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span>Interactive Button</span>
          <span className="text-neutral-900 dark:text-neutral-100 font-semibold">Ready</span>
        </div>
        
        {/* Mock component view */}
        <div className="h-24 w-full rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/30 flex items-center justify-center relative group/btn">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="px-6 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-xs cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <span>{copied ? "Copied" : "Copy Code"}</span>
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </motion.button>
        </div>
        
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed text-center">
          Beautiful defaults. Zero NPM bloat. Copy, paste, customize.
        </p>
      </div>
    </div>
  )
}

export function ComparisonSection() {
  const statementRef = useRef<HTMLDivElement>(null)
  const isStatementInView = useInView(statementRef, { once: true, margin: "-100px" })

  const deskRef = useRef<HTMLDivElement>(null)
  const isDeskInView = useInView(deskRef, { once: true, margin: "-100px" })

  return (
    <div className="flex flex-col w-full">
      {/* Big Statement */}
      <section ref={statementRef} className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-400 dark:text-neutral-500 max-w-4xl"
        >
          We weren&apos;t lacking creativity.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-neutral-900 dark:text-white max-w-4xl mt-4"
        >
          We were wasting it.
        </motion.p>
      </section>

      {/* Desk Before vs After */}
      <section ref={deskRef} className="py-16 md:py-20 max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Messy Desk (Chaos) */}
          <div className="flex flex-col items-center justify-center relative min-h-[450px] bg-neutral-100/30 dark:bg-neutral-900/10 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 overflow-hidden group">
            <h4 className="absolute top-6 left-6 text-xs font-mono tracking-wider text-neutral-450 uppercase">
              The Before (Tab Hell)
            </h4>
            
            <div className="relative w-full h-[280px] scale-[0.85] sm:scale-100 origin-center">
              <ChaosWindow 
                title="stackoverflow.com"
                content="How to override layout boundary component tailwind overrides..."
                className="top-4 left-2"
                x={-10} y={-10} rotate={-6}
                hoverX={-25} hoverY={-20} hoverRotate={-12}
              />
              <ChaosWindow 
                title="tailwind-playground"
                content="Configuring border beam anim colors manually..."
                className="top-8 right-2"
                x={10} y={-5} rotate={8}
                hoverX={25} hoverY={-15} hoverRotate={14}
              />
              <ChaosWindow 
                title="framer-motion-docs"
                content="AnimatePresence layoutId mismatch inside router layouts..."
                className="bottom-4 left-2"
                x={-15} y={15} rotate={-10}
                hoverX={-30} hoverY={25} hoverRotate={-15}
              />
              <ChaosWindow 
                title="dev-tutorial-blog"
                content="How to build the ultimate responsive modal dialog..."
                className="bottom-8 right-2"
                x={15} y={10} rotate={5}
                hoverX={30} hoverY={20} hoverRotate={10}
              />
              <ChaosWindow 
                title="github.com/issues"
                content="Warning: React has detected a layout shift inside Server Components..."
                className="top-[32%] left-[22%]"
                x={0} y={0} rotate={2}
                hoverX={5} hoverY={-5} hoverRotate={-4}
              />
            </div>
            
            <p className="mt-8 text-[11px] text-neutral-450 dark:text-neutral-500 font-mono">
              Hover to trigger workflow fatigue.
            </p>
          </div>

          {/* Right: Clean Window (Clarity) */}
          <div className="flex flex-col items-center">
            <div className="w-full text-left mb-6 lg:pl-4">
              <h4 className="text-xs font-mono tracking-wider text-neutral-900 dark:text-neutral-100 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
                The After (Spectrum UI)
              </h4>
            </div>
            <ClarityWindow />
          </div>

        </div>
      </section>
    </div>
  )
}
