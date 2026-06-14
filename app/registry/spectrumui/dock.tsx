"use client";

import React, { useRef, useState, useContext } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
  variant?: "normal" | "glass";
}

export interface DockIconProps {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const DockContext = React.createContext<{
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  variant: "normal" | "glass";
} | null>(null);

const SPRING_TACTILE = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.1,
} as const;

export function Dock({
  children,
  className,
  magnification = 80,
  distance = 140,
  variant = "normal",
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, variant }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "mx-auto flex h-16 items-end gap-4 rounded-3xl pb-3",
          variant === "glass"
            ? "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] px-4"
            : "bg-neutral-100/80 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 px-4",
          className
        )}
        role="navigation"
        aria-label="Desktop Dock"
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export function DockIcon({
  children,
  label,
  onClick,
  className,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, variant } = context;

  // Calculate distance from mouse pointer to center of icon
  const distanceTransform = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const centerX = bounds.x + bounds.width / 2;
    return val - centerX;
  });

  // Calculate dynamic width based on proximity
  const widthTransform = useTransform(distanceTransform, (d) => {
    if (mouseX.get() === Infinity) return 40; // Base width
    const power = Math.max(0, 1 - Math.abs(d) / distance);
    return 40 + (magnification - 40) * power;
  });

  // Smooth width adjustments
  const width = useSpring(widthTransform, SPRING_TACTILE);

  const handleIconClick = () => {
    if (isBouncing) return;
    setIsBouncing(true);
    onClick?.();
    setTimeout(() => {
      setIsBouncing(false);
    }, 600);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleIconClick}
      className="relative flex items-center justify-center cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleIconClick();
        }
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900 px-2.5 py-1 text-[10px] font-medium text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-md border border-neutral-800 dark:border-neutral-200 select-none pointer-events-none whitespace-nowrap"
            role="tooltip"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        style={{ width, height: width }}
        animate={isBouncing ? { y: [0, -16, 0, -8, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cn(
          "flex items-center justify-center rounded-2xl transition-colors",
          variant === "glass"
            ? "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg text-neutral-800 dark:text-neutral-100 hover:bg-white/20 dark:hover:bg-white/10"
            : "bg-neutral-200 dark:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700",
          className
        )}
      >
        <div className="flex h-3/5 w-3/5 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
