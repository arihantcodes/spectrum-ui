"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] w-full flex flex-col justify-center pt-24 pb-12">
      <motion.div style={{ opacity, y: yText }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              Founding Story
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-neutral-900 dark:text-neutral-50"
          >
            Building interfaces should feel like creating.<br />
            <span className="text-neutral-400 dark:text-neutral-600">Not repeating.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-xl space-y-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif"
          >
            <p>Every new project started with the same problem.</p>
            <p>Navbar. Cards. Buttons. Dialogs. Animations.</p>
            <p>We weren&apos;t building products.</p>
            <p>We were rebuilding components. Again. Again. Again.</p>
          </motion.div>
        </div>

        {/* Right Content (Founder Image) */}
        <motion.div 
          style={{ y: yImage }}
          className="lg:col-span-5 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
        >
          {/* Base Image */}
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src="/arihant.jpeg" 
            alt="Founder Arihant" 
            className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-105"
          />
          
          {/* Subtle noise overlay that fades on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-8"
      >
        <div className="flex flex-col items-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">Scroll to read the story</span>
          <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
             <motion.div 
               animate={{ y: [0, 48] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="w-full h-1/2 bg-neutral-900 dark:bg-neutral-100"
             />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
