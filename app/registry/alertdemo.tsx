"use client";

import { Alert } from "@/components/UI/Alert";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

interface Alert04Props {
  className?: string;
}

export default function Alertdemo({ className }: Alert04Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-xl mx-auto", className)}
    >
      <Alert
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-b from-violet-50 to-white",
          "dark:from-violet-950/20 dark:to-zinc-950",
          "border border-violet-100 dark:border-violet-900/50",
          "shadow-[0_1px_6px_0_rgba(139,92,246,0.06)]",
          "rounded-xl p-4",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -15, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div
              className={cn(
                "p-2.5 rounded-xl",
                "bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500",
                "dark:from-fuchsia-600 dark:via-violet-600 dark:to-indigo-600"
              )}
            >
              <PartyPopper className="h-5 w-5 text-white" />
            </div>
          </motion.div>

          <div className="space-y-1">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "font-medium",
                "text-violet-900 dark:text-violet-100"
              )}
            >
              Amazing milestone! 🎉
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={cn("text-sm", "text-violet-600 dark:text-violet-300")}
            >
              You've just hit 1,000 followers on your journey!
            </motion.p>
          </div>
        </div>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-2 -top-2 h-16 w-16 rounded-full bg-fuchsia-400 dark:bg-fuchsia-600/30 blur-2xl opacity-20" />
          <div className="absolute top-2 right-8 h-12 w-12 rounded-full bg-violet-400 dark:bg-violet-600/30 blur-2xl opacity-20" />
          <div className="absolute -right-2 -bottom-2 h-16 w-16 rounded-full bg-indigo-400 dark:bg-indigo-600/30 blur-2xl opacity-20" />
        </div>

        {/* Celebration badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.3,
            }}
            className={cn(
              "text-[11px] font-medium",
              "px-2.5 py-0.5 rounded-full",
              "bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10",
              "dark:from-fuchsia-500/20 dark:via-violet-500/20 dark:to-indigo-500/20",
              "text-violet-700 dark:text-violet-200",
              "ring-1 ring-violet-500/20 dark:ring-violet-400/20"
            )}
          >
            Milestone
          </motion.div>
        </div>
      </Alert>
    </motion.div>
  );
}
