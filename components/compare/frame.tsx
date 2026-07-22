import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A small circle sitting on the container-frame's vertical border, echoing the
 * footer's corner treatment. Only shown ≥1400px where the frame border is visible.
 */
export function CornerDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 hidden size-5 items-center justify-center rounded-full bg-background min-[1400px]:flex",
        className
      )}
    >
      <span className="size-[3px] rounded-full bg-foreground" />
    </span>
  );
}

/**
 * A full-bleed section band aligned to the site's `container-frame`
 * (max-w-[1400px] with visible side borders ≥1400px), matching the landing page.
 */
export function FrameBand({
  children,
  className,
  border = "bottom",
  dots = false,
}: {
  children: ReactNode;
  className?: string;
  border?: "bottom" | "top" | "none";
  dots?: boolean;
}) {
  return (
    <div
      className={cn(
        "container-frame relative",
        border === "bottom" && "border-b border-border",
        border === "top" && "border-t border-border",
        className
      )}
    >
      {dots && (
        <>
          <CornerDot className="-left-2.5 -top-2.5" />
          <CornerDot className="-right-2.5 -top-2.5" />
          <CornerDot className="-bottom-2.5 -left-2.5" />
          <CornerDot className="-bottom-2.5 -right-2.5" />
        </>
      )}
      {children}
    </div>
  );
}
