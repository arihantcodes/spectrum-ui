"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@//lib/utils";

type AnimateEnterProps = {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  isWhileInView?: boolean;
  duration?: number;
};

// Refined ease-out (expo-style): decelerates hard at the tail so elements
// "settle" into place instead of sliding to a linear stop. This single curve
// is what separates a premium entrance from a generic fade.
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function AnimateEnter({
  className,
  delay = 0,
  children,
  duration = 0.6,
  isWhileInView = true,
}: AnimateEnterProps) {
  const reduceMotion = useReducedMotion();

  // Fade alone reads flat. Pair opacity with a small rise + de-blur so content
  // resolves into focus. Reduced-motion users get opacity only — no movement,
  // no blur — which is the accessible, non-nauseating path.
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 14, filter: "blur(6px)" };
  const shown = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  const transition = { duration, delay, ease: PREMIUM_EASE };

  if (!isWhileInView) {
    return (
      <motion.div
        className={cn(className)}
        initial={hidden}
        animate={shown}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
