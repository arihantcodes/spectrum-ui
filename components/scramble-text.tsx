"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?<>*+=";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms between re-scramble cycles after the initial reveal */
  loopDelay?: number;
  /** ms it takes to fully decrypt the text */
  revealDuration?: number;
  /** ms the text stays fully scrambled before decrypting */
  scrambleHold?: number;
}

export function ScrambleText({
  text,
  className,
  loopDelay = 7000,
  revealDuration = 1100,
  scrambleHold = 350,
}: ScrambleTextProps) {
  // Render the real text on the server / first paint to avoid hydration mismatch.
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const runningRef = useRef(false);

  const randomChar = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

  const scrambled = (revealedCount: number) =>
    text
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (i < revealedCount) return ch;
        return randomChar();
      })
      .join("");

  const play = () => {
    if (runningRef.current) return;
    runningRef.current = true;

    const start = performance.now();
    let lastFlicker = 0;

    const frame = (now: number) => {
      const elapsed = now - start;

      if (elapsed < scrambleHold) {
        // fully encrypted phase
        if (now - lastFlicker > 45) {
          lastFlicker = now;
          setDisplay(scrambled(0));
        }
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const progress = Math.min((elapsed - scrambleHold) / revealDuration, 1);
      const revealedCount = Math.floor(progress * text.length);

      if (progress >= 1) {
        setDisplay(text);
        runningRef.current = false;
        timerRef.current = setTimeout(play, loopDelay);
        return;
      }

      if (now - lastFlicker > 45) {
        lastFlicker = now;
        setDisplay(scrambled(revealedCount));
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  const replay = () => {
    if (runningRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    play();
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    play();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      runningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={text} onMouseEnter={replay}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
