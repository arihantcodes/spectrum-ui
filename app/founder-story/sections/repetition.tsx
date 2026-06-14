"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const steps = [
  { name: "SaaS Application", subtitle: "User lists, billing portals, control panels." },
  { name: "Analytics Dashboard", subtitle: "Data visualizations, active counts, metrics." },
  { name: "Design Portfolio", subtitle: "Project galleries, contact hooks, news sub-actions." },
  { name: "Creative Agency", subtitle: "Immersive hero titles, inline validation, testimonials." },
  { name: "E-commerce Shop", subtitle: "Product details, filter dropdowns, overlay carts." },
  { name: "The Building Blocks", subtitle: "Stripping away the custom wrappers." },
  { name: "Spectrum UI", subtitle: "Build once. Reuse forever." },
]

export function RepetitionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length)
    }, 3500) // Slightly longer loop time to enjoy the details

    return () => clearInterval(interval)
  }, [isInView])

  const tagClasses = "px-3 py-1.5 rounded-lg border border-neutral-250 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] font-mono text-neutral-800 dark:text-neutral-200 font-semibold shadow-sm flex items-center justify-center cursor-default hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors select-none"

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Title block */}
      <div className="text-center mb-16 z-20 max-w-4xl px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 dark:text-neutral-100"
        >
          Every project looked different.<br />
          <span className="text-neutral-400 dark:text-neutral-500 font-light font-serif italic">The work didn&apos;t.</span>
        </motion.h2>
      </div>

      {/* Active layout phase indicator */}
      <div className="text-center mb-8 h-16 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
              Phase 0{step + 1}
            </span>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {steps[step].name}
            </h3>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-serif mt-0.5">
              {steps[step].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Layout Sandbox Container */}
      <div className="w-full max-w-2xl px-4 min-h-[380px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {/* SaaS Layout */}
          {step === 0 && (
            <motion.div 
              key="saas"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm flex gap-4 shadow-sm"
            >
              {/* Sidebar */}
              <div className="w-[30%] border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl p-3 flex flex-col justify-between bg-neutral-50/50 dark:bg-neutral-900/10">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <div className="h-5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-shrink-0" />
                    <div className="h-2 w-16 rounded bg-neutral-300 dark:bg-neutral-800" />
                  </div>
                  <div className="space-y-2">
                    {["Overview", "Customers", "Billing", "Keys"].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div layoutId="dropdown" className={tagClasses}>Dropdown</motion.div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-2">
                  <motion.div layoutId="input" className={`${tagClasses} w-32`}>Input</motion.div>
                  <motion.div layoutId="button" className={`${tagClasses} bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white px-4`}>Button</motion.div>
                </div>
                
                {/* Active Card */}
                <motion.div layoutId="card" className="flex-1 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-4 bg-white dark:bg-neutral-900/40 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Subscription</h4>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Enterprise Scale Plan</p>
                    </div>
                    <span className="text-xs font-mono font-bold">$49/mo</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[8px] font-mono text-neutral-400">
                      <span>API Limits</span>
                      <span>84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full w-[84%] bg-neutral-900 dark:bg-neutral-200 rounded-full" />
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex justify-center">
                  <motion.div layoutId="dialog" className={tagClasses}>Dialog</motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dashboard Layout */}
          {step === 1 && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm grid grid-cols-3 gap-4 shadow-sm"
            >
              <div className="col-span-2 flex flex-col gap-4">
                <div className="flex gap-4">
                  <motion.div layoutId="input" className={`${tagClasses} flex-1`}>Input</motion.div>
                  <motion.div layoutId="dropdown" className={`${tagClasses} flex-1`}>Dropdown</motion.div>
                </div>
                
                {/* Large graph card */}
                <motion.div layoutId="card" className="flex-1 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-4 bg-white dark:bg-neutral-900/40 flex flex-col justify-between shadow-sm">
                  <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
                    <span className="text-[10px] font-mono text-neutral-400">Visitor Velocity</span>
                    <span className="text-[10px] font-mono font-bold text-neutral-900 dark:text-neutral-100">+12.4%</span>
                  </div>
                  {/* Miniature SVG Chart */}
                  <div className="h-16 w-full flex items-end">
                    <svg className="h-full w-full opacity-60 dark:opacity-85 text-neutral-400 dark:text-neutral-500" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M 0,25 C 20,20 40,5 60,15 C 80,25 100,5 120,5 L 100,30 L 0,30 Z" fill="currentColor" opacity="0.1" />
                      <path d="M 0,25 C 20,20 40,5 60,15 C 80,25 100,5 120,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Right side stats widget */}
                <div className="flex-1 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-4 bg-white dark:bg-neutral-900/40 flex flex-col justify-between shadow-sm">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-neutral-450 uppercase">Active Users</div>
                    <div className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">1,482</div>
                  </div>
                  <motion.div layoutId="button" className={`${tagClasses} bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white w-full`}>Button</motion.div>
                </div>
                <motion.div layoutId="dialog" className={`${tagClasses} w-full`}>Dialog</motion.div>
              </div>
            </motion.div>
          )}

          {/* Portfolio Layout */}
          {step === 2 && (
            <motion.div 
              key="portfolio"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm flex flex-col justify-between shadow-sm"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <span className="text-xs font-mono font-bold tracking-tight text-neutral-900 dark:text-white">Arihant J.</span>
                <motion.div layoutId="dropdown" className={tagClasses}>Dropdown</motion.div>
              </div>
              <div className="flex-1 flex gap-4 my-3">
                
                {/* Visual Project Card */}
                <motion.div layoutId="card" className="w-2/3 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-3 bg-white dark:bg-neutral-900/40 flex flex-col justify-between shadow-sm">
                  <div className="relative aspect-[16/9] w-full rounded-lg bg-neutral-100 dark:bg-neutral-850 overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-center">
                    {/* Visual Placeholder Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200/50 to-transparent dark:from-neutral-900/50" />
                    <span className="text-[9px] font-mono text-neutral-400">spectrum-ui.jpg</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    <h5 className="text-[11px] font-semibold text-neutral-900 dark:text-white leading-none">Spectrum Design System</h5>
                    <p className="text-[9px] text-neutral-400 font-serif">Designing premium modular interfaces.</p>
                  </div>
                </motion.div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <motion.div layoutId="dialog" className={`${tagClasses} w-full`}>Dialog</motion.div>
                  <div className="space-y-2">
                    <span className="text-[8px] font-mono text-neutral-400 pl-1">Join the waitlist</span>
                    <motion.div layoutId="input" className={`${tagClasses} w-full`}>Input</motion.div>
                    <motion.div layoutId="button" className={`${tagClasses} w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white`}>Button</motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Agency Layout */}
          {step === 3 && (
            <motion.div 
              key="agency"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm grid grid-cols-2 gap-6 items-center shadow-sm"
            >
              <div className="h-full border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white dark:bg-neutral-900/40 p-4 flex flex-col justify-between shadow-sm relative">
                <div className="space-y-2">
                  <h4 className="text-[18px] font-bold leading-tight tracking-tight text-neutral-900 dark:text-white">WE BUILD WEBSITES THAT DISAPPEAR.</h4>
                  <p className="text-[9px] text-neutral-450 dark:text-neutral-500 leading-normal">Premium engineering with carefully designed micro-interactions and transitions.</p>
                </div>
                <motion.div layoutId="dialog" className={tagClasses}>Dialog</motion.div>
              </div>
              <div className="flex flex-col gap-3 h-full justify-between py-2">
                
                {/* Agency Testimonial Card */}
                <motion.div layoutId="card" className="border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-3 bg-white dark:bg-neutral-900/40 shadow-sm flex flex-col justify-between">
                  <p className="text-[9px] font-serif text-neutral-500 italic leading-relaxed">&ldquo;Their defaults are better than our custom designs.&rdquo;</p>
                  <span className="text-[8px] font-mono text-neutral-400 mt-2">— VP Design, SaaS Startup</span>
                </motion.div>
                
                <div className="flex gap-2">
                  <motion.div layoutId="input" className={`${tagClasses} flex-1`}>Input</motion.div>
                  <motion.div layoutId="dropdown" className={`${tagClasses} w-10`}>▾</motion.div>
                </div>
                <motion.div layoutId="button" className={`${tagClasses} w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white`}>Button</motion.div>
              </div>
            </motion.div>
          )}

          {/* E-commerce Layout */}
          {step === 4 && (
            <motion.div 
              key="ecommerce"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm flex flex-col justify-between shadow-sm"
            >
              <div className="flex gap-4 items-center">
                <motion.div layoutId="input" className={`${tagClasses} flex-1`}>Input</motion.div>
                <motion.div layoutId="dropdown" className={tagClasses}>Dropdown</motion.div>
              </div>
              <div className="flex-1 flex gap-4 my-3">
                
                {/* E-comm Product Card */}
                <motion.div layoutId="card" className="flex-1 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-3 bg-white dark:bg-neutral-900/40 flex flex-col justify-between shadow-sm">
                  <div className="relative aspect-[16/10] w-full rounded-lg bg-neutral-50 dark:bg-neutral-850/50 border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-center">
                    {/* SVG Minimalist product outline */}
                    <svg className="w-10 h-10 text-neutral-300 dark:text-neutral-650" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="7" />
                      <line x1="12" y1="5" x2="12" y2="12" />
                      <line x1="12" y1="12" x2="15" y2="15" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <h5 className="text-[10px] font-bold text-neutral-900 dark:text-white">Chrono Classic</h5>
                      <span className="text-[8px] text-neutral-400 font-mono">$1,250</span>
                    </div>
                    <motion.div layoutId="button" className={`${tagClasses} bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white py-1 text-[9px] px-2`}>Button</motion.div>
                  </div>
                </motion.div>
                
                {/* Secondary product item (smaller, faded) */}
                <div className="flex-1 border border-neutral-200/50 dark:border-neutral-850/80 rounded-xl p-3 bg-neutral-50/20 dark:bg-neutral-900/5 flex flex-col justify-between opacity-40 select-none">
                  <div className="h-16 w-full bg-neutral-100 dark:bg-neutral-800/30 rounded" />
                  <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800/40 rounded" />
                </div>
              </div>
              <div className="flex justify-end">
                <motion.div layoutId="dialog" className={tagClasses}>Dialog</motion.div>
              </div>
            </motion.div>
          )}

          {/* Scattered Building Blocks Layout */}
          {step === 5 && (
            <motion.div 
              key="scattered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] flex items-center justify-center"
            >
              <div className="flex flex-wrap gap-4 max-w-md justify-center">
                <motion.div layoutId="button" className={tagClasses}>Button</motion.div>
                <motion.div layoutId="card" className={tagClasses}>Card</motion.div>
                <motion.div layoutId="dialog" className={tagClasses}>Dialog</motion.div>
                <motion.div layoutId="input" className={tagClasses}>Input</motion.div>
                <motion.div layoutId="dropdown" className={tagClasses}>Dropdown</motion.div>
              </div>
            </motion.div>
          )}

          {/* Snapped Spectrum UI Card Layout */}
          {step === 6 && (
            <motion.div 
              key="snapped"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[340px] flex flex-col items-center justify-center"
            >
              <motion.div 
                layoutId="card"
                className="px-8 py-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white shadow-2xl flex flex-col items-center space-y-2 w-64 text-center relative overflow-hidden"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-100/50 to-transparent dark:from-neutral-850/20 dark:to-transparent pointer-events-none" />
                
                <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest relative z-10">Rebuilt Once</span>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white relative z-10">Spectrum UI</h3>
                
                {/* Collapsed elements fade inside wrapper */}
                <div className="absolute opacity-0 pointer-events-none">
                  <motion.div layoutId="button" />
                  <motion.div layoutId="dialog" />
                  <motion.div layoutId="input" />
                  <motion.div layoutId="dropdown" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manifesto Quote revealed during collapse/snap */}
      <div className="h-24 mt-12 text-center flex items-center justify-center">
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="px-4"
            >
              <p className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-150 leading-relaxed font-serif">
                &ldquo;We weren&apos;t building new interfaces.<br />
                We were rebuilding the same ones.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}
