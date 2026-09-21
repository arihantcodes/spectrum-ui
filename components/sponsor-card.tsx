"use client";

import Link from "next/link";
import { BorderBeam } from "border-beam";

import { IconlyHeart } from "@/components/icons/iconly";
import { ChevronRightIcon } from "@/app/(docs)/layout-parts/docs-icons";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { useSurfaceTheme } from "@/components/spectrumui/use-surface-theme";

/**
 * Sponsor CTA for the narrow rails: the docs and blog "On This Page" gutter,
 * and the blocks nav.
 *
 * Deliberately inverted against the page — black in light mode, white in dark —
 * because every rail it lands in is otherwise low-contrast grey, and a
 * monochrome card can only earn focus through contrast, not colour.
 *
 * `source` is passed straight through to the analytics event so each placement
 * can be compared against the navbar button on its own.
 */
export default function SponsorCard({
  className,
  source,
}: {
  className?: string;
  source: string;
}) {
  // The card surface is inverted against the page, so the beam sits on a dark
  // background in light mode and a light one in dark mode — hand BorderBeam the
  // opposite of the page theme or its glow is tuned for the wrong surface.
  const pageTheme = useSurfaceTheme();
  const beamTheme = pageTheme === "dark" ? "light" : "dark";

  return (
    <BorderBeam
      size="line"
      colorVariant="mono"
      staticColors
      brightness={2.6}
      theme={beamTheme}
      borderRadius={12}
      className={cn("block rounded-[12px]", className)}
    >
      <Link
        href={siteConfig.links.sponsors}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent({ name: "sponsor_button_clicked", properties: { source } })
        }
        aria-label="Sponsor Spectrum UI on GitHub"
        className="group block rounded-[12px] bg-[#0a0a0a] p-3 text-white dark:bg-white dark:text-[#0a0a0a]"
      >
        <span className="flex size-7 items-center justify-center rounded-[8px] bg-white/10 dark:bg-black/8">
          <IconlyHeart className="size-4 text-white transition-transform duration-300 motion-safe:group-hover:scale-110 dark:text-[#0a0a0a]" />
        </span>

        <p className="mt-2.5 text-[13px] font-medium leading-[18px]">
          Sponsor Spectrum UI
        </p>
        <p className="mt-1 text-[11px] leading-4 text-white/60 dark:text-black/60">
          Every component here is free and open source. Sponsors keep it that
          way.
        </p>

        {/* filled pill, inverted again against the card so the CTA actually
            reads as the thing to click rather than one more line of text */}
        <span className="mt-3 flex h-7 items-center justify-center gap-0.5 rounded-[7px] bg-white text-[11px] font-medium text-[#0a0a0a] transition-opacity group-hover:opacity-90 dark:bg-[#0a0a0a] dark:text-white">
          Become a sponsor
          <ChevronRightIcon className="size-3 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        </span>
      </Link>
    </BorderBeam>
  );
}
