"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Users, Target, Activity } from "lucide-react"

export interface BenefitsSectionProps {
  className?: string
}

const SPRING_ENTRANCE = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
}

const features = [
  {
    icon: Users,
    title: "Developer-first audience",
    description: "Our community consists of frontend engineers, design engineers, and technical founders building real products."
  },
  {
    icon: Target,
    title: "High intent traffic",
    description: "Visitors are actively looking for tools, libraries, and services to speed up their development workflow."
  },
  {
    icon: Activity,
    title: "Long-term visibility",
    description: "Sponsor logos become a native part of the UI, ensuring your brand stays top-of-mind for returning developers."
  }
]

export function BenefitsSection({ className }: BenefitsSectionProps) {
  return (
    <section className={cn("w-full py-24 bg-white dark:bg-[#0C0C0C]", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Why sponsor Spectrum UI?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Get your product in front of the right people at the right time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...SPRING_ENTRANCE, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-start p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-12 w-12 rounded-2xl bg-white dark:bg-[#0C0C0C] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
              </div>
              
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
