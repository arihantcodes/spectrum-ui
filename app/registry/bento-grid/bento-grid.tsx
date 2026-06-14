import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { ReactNode } from "react"

export interface BentoGridProps {
  className?: string
  children?: ReactNode
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
