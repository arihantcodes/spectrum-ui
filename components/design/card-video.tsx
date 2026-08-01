"use client";

import { useEffect, useRef } from "react";

/**
 * Feed video per spec §7: muted, looping, inline, metadata-only preload.
 * Plays only while ≥50% in the viewport, pauses when scrolled away or the tab
 * is hidden, and never autoplays under prefers-reduced-motion. GIF submissions
 * are transcoded to mp4 at ingest, so this is also the "GIF" path — a real
 * GIF would cost megabytes and decode on the main thread.
 */
export function CardVideo({
  src,
  webm,
  poster,
  className,
}: {
  src: string;
  webm?: string | null;
  poster?: string | null;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    const sync = () => {
      if (inView && !document.hidden && !reduced.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.5 },
    );
    io.observe(video);

    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster ?? undefined}
      className={className}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
