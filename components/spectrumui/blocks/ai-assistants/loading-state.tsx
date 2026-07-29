"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const KEYFRAMES = `
@keyframes su-pixel-on { 0%, 100% { opacity: 0.15 } 40% { opacity: 1 } }
@keyframes su-shimmer-text { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
`;

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3),
    c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

export type LoadingStateVariant = "Drive" | "Dots" | "Orbit";

const PATTERNS: Record<
  LoadingStateVariant,
  { delays: (number | null)[]; dur: number; round: boolean }
> = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true },
  Orbit: { delays: orbit, dur: 950, round: false },
};

function useElapsed() {
  const [ds, setDs] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);
  const total = ds / 10;
  if (total < 60) return `${total.toFixed(1)}s`;
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
}

export interface LoadingStateProps {
  label?: string;
  variant?: LoadingStateVariant;
  className?: string;
}

export function LoadingState({
  label = "Churning",
  variant = "Drive",
  className,
}: LoadingStateProps) {
  const elapsed = useElapsed();
  const { delays, dur, round } = PATTERNS[variant] ?? PATTERNS.Drive;

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2.5 text-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <span aria-hidden className="grid grid-cols-[repeat(3,4px)] gap-[1.5px]">
        {delays.map((d, i) => (
          <span
            key={i}
            className={cn(
              "size-[4px] bg-current motion-reduce:!animate-none",
              round ? "rounded-full" : "rounded-[1px]",
            )}
            style={{
              opacity: d === null ? 0.07 : 0.15,
              animation:
                d === null
                  ? "none"
                  : `su-pixel-on ${dur}ms ease-in-out ${d}ms infinite`,
            }}
          />
        ))}
      </span>

      <span
        className="bg-clip-text text-[13px] font-medium text-transparent motion-reduce:!animate-none motion-reduce:!text-current"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #a3a3a3 35%, currentColor 50%, #a3a3a3 65%)",
          backgroundSize: "200% 100%",
          animation: "su-shimmer-text 1.4s linear infinite",
        }}
      >
        {label}
      </span>

      <span
        role="timer"
        aria-label={`Elapsed time ${elapsed}`}
        className="font-mono text-[12px] tabular-nums text-neutral-400 dark:text-neutral-500"
      >
        {elapsed}
      </span>
    </div>
  );
}

export default LoadingState;
