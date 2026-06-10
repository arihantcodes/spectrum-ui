"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show unless user dismissed in this session
    const dismissed = sessionStorage.getItem("mcp-banner-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem("mcp-banner-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Link href="/docs/mcp" className="relative block w-full bg-neutral-950 dark:bg-white border-b border-neutral-800 dark:border-neutral-200">
      {/* Dismiss button — sits above the link */}
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-md text-white/50 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-900 hover:bg-white/10 dark:hover:bg-neutral-900/10 transition-colors"
      >
        <X size={14} />
      </button>

        <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-2.5 px-4 pr-10 sm:px-10 sm:pr-12 text-white dark:text-neutral-900">
          {/* Pulse dot */}
          <span className="flex-shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-wide hidden sm:inline">New</span>
          </span>

          <span className="text-xs sm:text-sm font-medium truncate">
            <span className="font-bold">Spectrum UI MCP Server</span>
            <span className="hidden sm:inline text-white/70 dark:text-neutral-600">
              {" "}— Install components directly from Claude, Cursor & Windsurf
            </span>
          </span>

          <span className="hidden md:inline-flex items-center gap-1.5 bg-white/10 dark:bg-neutral-900/10 border border-white/20 dark:border-neutral-900/20 rounded-full px-3 py-0.5 text-xs font-mono text-white/90 dark:text-neutral-700 flex-shrink-0">
            npx -y @spectrumui/mcp
          </span>

          <span className="text-white/60 dark:text-neutral-500 text-xs flex items-center gap-1 ml-1 flex-shrink-0">
            <span className="hidden sm:inline">Learn more</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
    </Link>
  );
}

