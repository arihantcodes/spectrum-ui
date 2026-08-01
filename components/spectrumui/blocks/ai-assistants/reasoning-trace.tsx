"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReasoningStep } from "./types";

const KEYFRAMES = `
@keyframes su-shimmer-text { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
@keyframes su-step-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type ReasoningTraceVariant = "Steps" | "Reasoning";

export interface ReasoningTraceProps {
  steps: ReasoningStep[];
  status: "thinking" | "complete";
  durationMs?: number;
  variant?: ReasoningTraceVariant;
  defaultOpen?: boolean;
  className?: string;
}

function useThinkingClock(active: boolean) {
  const [ds, setDs] = useState(0);
  const wasActive = useRef(active);
  useEffect(() => {
    if (active && !wasActive.current) setDs(0);
    wasActive.current = active;
    if (!active) return;
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, [active]);
  return ds / 10;
}

export function ReasoningTrace({
  steps,
  status,
  durationMs,
  variant = "Steps",
  defaultOpen = false,
  className,
}: ReasoningTraceProps) {
  const [open, setOpen] = useState(defaultOpen);
  const thinking = status === "thinking";
  const elapsed = useThinkingClock(thinking);

  const seconds = thinking
    ? elapsed.toFixed(1)
    : ((durationMs ?? elapsed * 1000) / 1000).toFixed(1);

  return (
    <div className={cn("w-full max-w-[440px] text-[13px]", className)}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-lg py-1 text-neutral-600 transition-[color,transform] duration-150 hover:text-neutral-900 active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <Sparkles
          aria-hidden
          className={cn("size-3.5", thinking && "motion-safe:animate-pulse")}
        />
        {thinking ? (
          <span
            className="bg-clip-text font-medium text-transparent motion-reduce:!animate-none motion-reduce:!text-current"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #a3a3a3 35%, currentColor 50%, #a3a3a3 65%)",
              backgroundSize: "200% 100%",
              animation: "su-shimmer-text 1.4s linear infinite",
            }}
          >
            Thinking
          </span>
        ) : (
          <span className="font-medium">Thought for {seconds}s</span>
        )}
        {thinking && (
          <span className="font-mono text-[12px] tabular-nums text-neutral-400 dark:text-neutral-500">
            {seconds}s
          </span>
        )}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 text-neutral-400 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-[240ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="ml-[7px] mt-1 border-l border-neutral-200 pb-1 pl-4 pt-1 dark:border-neutral-800">
            {variant === "Steps" ? (
              <ol className="space-y-2.5">
                {steps.map((step, i) => (
                  <li
                    key={step.id}
                    className="flex gap-2.5 leading-[1.6] text-neutral-500 motion-safe:animate-[su-step-in_240ms_cubic-bezier(0.23,1,0.32,1)_both] dark:text-neutral-400"
                  >
                    <span className="mt-px font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.content}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="leading-[1.7] text-neutral-500 dark:text-neutral-400">
                {steps.map((step) => step.content).join(" ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasoningTrace;
