"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "./icon";

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
}

/** Compact GitHub star pill for the navbar. Count comes from our own
 *  /api/github-stars route (server-cached hourly). Microinteractions: the
 *  star fills amber and tilts on hover, the pill lifts, and the count
 *  ticks up from 0 when it loads. */
export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-stars")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.stars === "number") setStars(data.stars);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Count-up tick when the number arrives.
  useEffect(() => {
    if (stars === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(stars);
      return;
    }
    const start = performance.now();
    const duration = 700;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(stars * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stars]);

  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      aria-label={
        stars !== null
          ? `Star Spectrum UI on GitHub — ${stars.toLocaleString()} stars`
          : "Star Spectrum UI on GitHub"
      }
      className="group hidden h-8 items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 font-mono text-xs font-medium text-foreground/80 shadow-xs transition-all duration-200 ease-out hover:border-neutral-300 hover:text-foreground   dark:border-neutral-800 dark:hover:border-neutral-700 sm:flex"
    >
      <Icons.gitHub className="size-4 shrink-0" />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-3.5 shrink-0 fill-transparent stroke-current stroke-[1.5] transition-all duration-300 ease-out group-hover:fill-amber-400 group-hover:stroke-amber-400 motion-safe:group-hover:-rotate-12 motion-safe:group-hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      <span className="tabular-nums font-inter">
        {stars === null ? "Star" : formatStars(display)}
      </span>
    </Link>
  );
}
