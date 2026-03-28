"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getTimeLeft() {
  // Set deadline to 3 days from first visit (stored in localStorage)
  const now = Date.now();
  let deadline: number;

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("promo-deadline");
    if (stored) {
      deadline = parseInt(stored, 10);
    } else {
      deadline = now + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem("promo-deadline", deadline.toString());
    }
  } else {
    deadline = now + 3 * 24 * 60 * 60 * 1000;
  }

  const diff = Math.max(0, deadline - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function PromoBanner() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <Link
      href="/pro"
      className="block w-full bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors"
    >
      <div className="flex items-center justify-center gap-3 py-2.5 px-4 text-white">
        <span className="text-sm font-medium">
          <span className="font-bold">Introducing Spectrum Pro</span>
          {" "}&mdash;
          <span className="hidden sm:inline">
            {" "}Launch price: <span className="font-bold">$49</span>
            {" "}<span className="line-through opacity-75">(goes up to $79)</span>
          </span>
        </span>
        <span className="hidden sm:inline text-xs sm:text-sm opacity-90">Offer ends in</span>
        {mounted && (
          <span className="hidden sm:inline-flex items-center gap-0.5 font-mono text-xs sm:text-sm bg-white/15 px-2.5 py-1 rounded-md border border-white/20">
            {time.days}d : {pad(time.hours)}h : {pad(time.minutes)}m : {pad(time.seconds)}s
          </span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="opacity-75"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
