'use client';

import { useEffect, useRef, useState } from 'react';

export const REVEAL_KEYFRAMES = `
@keyframes su-reveal { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
@keyframes su-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes su-sheen { 0%, 62% { transform: translateX(-110%) } 100% { transform: translateX(110%) } }
`;

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

export function revealClass(shown: boolean) {
  return shown
    ? '[animation:su-reveal_480ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none'
    : '';
}

export function revealDelay(shown: boolean, index: number) {
  return shown ? { animationDelay: `${index * 70}ms` } : undefined;
}
