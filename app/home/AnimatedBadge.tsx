"use client";

import Link from "next/link";

import { useState } from "react";

import { motion } from "motion/react";

import { cn } from "@//lib/utils";
import { ArrowRight } from "lucide-react";

export function AnimatedBadge() {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href="https://vercel.com/oss"
      className="group relative outline-none block rounded-full py-[5px] pr-3 pl-1.5 bg-[#eeeeee] dark:bg-[#161616] dark:shadow-inner dark:shadow-neutral-800/80 border border-neutral-400/20 dark:border-neutral-700/70"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={cn(
          "absolute -inset-px rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] pointer-events-none",
          "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        )}
      >
        <motion.div
          animate={{ opacity: isHover ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute aspect-square bg-gradient-to-r from-transparent via-neutral-300 to-neutral-400 dark:from-transparent dark:via-neutral-600 dark:to-neutral-400"
            animate={{
              offsetDistance: isHover ? "0%" : ["0%", "100%"],
            }}
            style={{
              width: 18,
              offsetPath: `rect(0 auto auto 0 round ${18}px)`,
            }}
            transition={
              isHover
                ? { delay: 0.5 }
                : {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "linear",
                  }
            }
          />
        </motion.div>
      </div>
      <div className="relative z-10 flex items-center justify-between px-2">
      
        <div className="flex items-center justify-center gap-2">
            Backed by
            <span className="flex items-center gap-2 justify-center">
              <svg
                height="13"
                width="13"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                aria-label="Vercel logo"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 1L16 15H0L8 1Z"
                  fill="currentColor"
                ></path>
              </svg>
              Vercel OSS
            </span>
          </div>
          {/* <ArrowRight className="h-4 w-4 ml-2" /> */}
      </div>
      <div
        aria-hidden
        className={cn(
          "absolute z-0 rounded-[inherit] inset-0 size-full bg-gradient-to-t from-neutral-500/10 duration-200 ease-out",
          "dark:from-neutral-900/40 dark:to-neutral-800/60 opacity-0 group-hover:opacity-100",
        )}
      />
      <motion.div
        aria-hidden
        className={cn(
          "absolute inset-0 size-full bg-amber-500/55 dark:bg-white/15 blur-[6px] -z-[1] rounded-full",
          isHover && "delay-300 animate-pulse",
        )}
        animate={!isHover ? { opacity: 0 } : {}}
        transition={{ duration: 0.7 }}
      />
    </Link>
  );
}
