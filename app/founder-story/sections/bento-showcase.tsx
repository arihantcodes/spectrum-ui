"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { BentoGrid } from "@/app/registry/bento-grid/bento-grid"
import { BentoCard } from "@/app/registry/bento-grid/bento-card"
import { 
  Bot, 
  Terminal, 
  Layers, 
  Sliders, 
  Palette, 
  Code2,
  Check,
  Copy
} from "lucide-react"

// 1. Copy-Paste Code Demo
function CodeCopyDemo() {
  const [copied, setCopied] = useState(false)
  const code = `export function Button({ children }) {
  return (
    <motion.button whileTap={{ scale: 0.98 }}>
      {children}
    </motion.button>
  )
}`

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCopied(true)
    navigator.clipboard.writeText(code)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-end p-4 font-mono text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500">
      <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-3 relative group/code overflow-hidden">
        <div className="absolute right-2 top-2 opacity-0 group-hover/code:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleCopy} 
            className="p-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
        <pre className="overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

// 2. Spring Visualizer Demo
function SpringVisualizerDemo() {
  const [active, setActive] = useState(false)

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={active ? { scale: [1, 1.2, 1], y: [0, -20, 0] } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="h-12 w-12 rounded-full bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center cursor-pointer shadow-md"
          onClick={() => setActive(!active)}
        >
          <div className="h-4 w-4 rounded-full bg-white dark:bg-neutral-900" />
        </motion.div>
        <button 
          onClick={() => setActive(!active)}
          className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-850 px-2 py-1 rounded-md bg-white dark:bg-neutral-950 transition-colors"
        >
          Trigger Spring
        </button>
      </div>
    </div>
  )
}

// 3. CLI Terminal Simulation
function CliDemo() {
  const [copied, setCopied] = useState(false)
  const command = "npx spectrum-ui add button"

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCopied(true)
    navigator.clipboard.writeText(command)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-[220px] rounded-lg bg-neutral-900 border border-neutral-800 p-3 font-mono text-[10px] text-neutral-400 flex flex-col space-y-2 relative group/cli">
        <div className="absolute right-2 top-2 opacity-0 group-hover/cli:opacity-100 transition-opacity duration-300">
          <button onClick={handleCopy} className="p-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors">
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
        <p className="text-neutral-150 flex items-center">
          <span className="text-neutral-500 mr-1.5">$</span>
          <span>{command}</span>
        </p>
        <p className="text-[9px] text-neutral-500 font-sans pt-1 border-t border-neutral-800">
          ✔ Added button.tsx to components/ui
        </p>
      </div>
    </div>
  )
}

// 4. Monochrome Color Palette
function PaletteDemo() {
  const colors = [
    { bg: "bg-white dark:bg-neutral-900", label: "50" },
    { bg: "bg-neutral-100 dark:bg-neutral-800", label: "100" },
    { bg: "bg-neutral-400 dark:bg-neutral-500", label: "450" },
    { bg: "bg-neutral-900 dark:bg-neutral-100", label: "900" },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-2 w-full max-w-[200px]">
        {colors.map((color, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className={`h-12 w-full rounded-lg border border-neutral-200 dark:border-neutral-800/80 ${color.bg} shadow-sm`} />
            <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">{color.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 5. AI Agent Assistant Demo
function AiFirstDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] w-full flex-col justify-end p-4">
      <div className="flex flex-col space-y-2 relative z-10 font-mono text-[10px]">
        <div className="self-end rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 text-[9px] text-neutral-600 dark:text-neutral-350">
          {"\"Create a clean monochrome card layout\""}
        </div>
        
        <div className="self-start rounded-xl bg-white dark:bg-neutral-900 px-3 py-1.5 text-[9px] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col space-y-1 w-[90%]">
          <div className="flex items-center space-x-1.5 text-neutral-400 text-[8px] border-b border-neutral-100 dark:border-neutral-800 pb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>AI Assistant</span>
          </div>
          <code className="text-neutral-500 text-[8px] leading-relaxed">
            {"<div className='border border-neutral-200 bg-white ...' />"}
          </code>
        </div>
      </div>
    </div>
  )
}

// 6. Extensibility Customization
function CustomizationDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 font-mono text-[10px]">
      <div className="flex items-center space-x-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3 rounded-xl shadow-sm">
        <span className="line-through text-neutral-350 dark:text-neutral-600">bg-blue-500</span>
        <span className="text-neutral-400">→</span>
        <span className="text-neutral-900 dark:text-white font-semibold">bg-neutral-900</span>
      </div>
    </div>
  )
}

export function BentoShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-32 max-w-6xl mx-auto w-full">
      <div className="mb-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          What is Spectrum UI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-neutral-500 dark:text-neutral-400"
        >
          A design engineering library built around the core values of speed, clarity, and control.
        </motion.p>
      </div>

      <BentoGrid>
        {/* ROW 1 */}
        <BentoCard
          title="Zero NPM Bloat"
          description="Copy raw TypeScript code directly. Complete ownership over dependencies."
          icon={<Code2 className="h-5 w-5" />}
          colSpan={2}
          rowSpan={1}
          tilt={true}
        >
          <CodeCopyDemo />
        </BentoCard>

        <BentoCard
          title="Spring Physics"
          description="Pre-tuned animations that feel native."
          icon={<Sliders className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <SpringVisualizerDemo />
        </BentoCard>

        <BentoCard
          title="CLI First"
          description="Add elements with a single terminal command."
          icon={<Terminal className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <CliDemo />
        </BentoCard>

        {/* ROW 2 */}
        <BentoCard
          title="Monochrome Palette"
          description="Clean contrast levels and beautiful dark modes by default."
          icon={<Palette className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <PaletteDemo />
        </BentoCard>

        <BentoCard
          title="Extensible styling"
          description="No vendor lock-in. Custom overrides using tailwind utilities."
          icon={<Layers className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
          tilt={true}
        >
          <CustomizationDemo />
        </BentoCard>

        <BentoCard
          title="Built for AI Pairing"
          description="Structured TypeScript shapes that LLMs generate and edit flawlessly."
          icon={<Bot className="h-5 w-5" />}
          colSpan={2}
          rowSpan={1}
        >
          <AiFirstDemo />
        </BentoCard>
      </BentoGrid>
    </section>
  )
}
