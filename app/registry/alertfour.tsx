"use client";

import { Alert } from "@/components/UI/Alert";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";

export default function Alert04() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Alert
        className={cn(
          "relative overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-emerald-100 dark:border-emerald-900/50",
          "shadow-sm",
          "p-4 rounded-xl"
        )}
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full",
                "bg-emerald-50 dark:bg-emerald-950/50",
                "flex items-center justify-center",
                "ring-8 ring-emerald-50/50 dark:ring-emerald-950/25"
              )}
            >
              <CircleDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-emerald-900 dark:text-emerald-100">
                  You got paid!
                </h3>
                <span className="px-1.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                  $2,400.00
                </span>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                The payment has been processed and added to your account
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-2 -top-2 w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/25 blur-2xl opacity-50" />
          <div className="absolute -right-2 -bottom-2 w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/25 blur-2xl opacity-50" />
        </div>
      </Alert>
    </motion.div>
  );
}
