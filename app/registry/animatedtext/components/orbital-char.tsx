'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
  char: string;
  index: number;
  radius: number;
  duration: number;
  decay: number;
};

export function OrbitalChar({ char, index, radius, duration, decay }: Props) {
  const initialX = (Math.random() - 0.5) * 40;
  const initialY = (Math.random() - 0.5) * 40;
  const initialRot = (Math.random() - 0.5) * 30;


  const springX = useSpring(initialX, { stiffness: 100, damping: 15 });
  const springY = useSpring(initialY, { stiffness: 100, damping: 15 });
  const springRot = useSpring(initialRot, { stiffness: 100, damping: 15 });
  const springOpacity = useSpring(0, { stiffness: 100, damping: 15 });
  const springBlur = useSpring(4, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const animateChar = async () => {

      springX.set(initialX);
      springY.set(initialY);
      springRot.set(initialRot);
      springOpacity.set(0);
      springBlur.set(4);

      await Promise.all([
        springX.set(0),
        springY.set(0),
        springRot.set(0),
        springOpacity.set(1),
        springBlur.set(0),
      ]);

      let currentAmp = 1;
      let currentPhase = (Math.random() * Math.PI * 2 + index * 0.4) % (Math.PI * 2);
      let startTime: number | null = null;

      const step = (t: number) => {
        if (!startTime) startTime = t;
        const elapsed = t - startTime;
        const normalized = Math.min(1, elapsed / duration);

        currentAmp *= decay + (1 - decay) * (1 - normalized);
        currentPhase += 0.004 + index * 0.003; 

        const r = radius * currentAmp;
        const newX = Math.sin(currentPhase) * r;
        const newY = Math.cos(currentPhase * 0.9) * (r * 0.65);
        const newRot = Math.sin(currentPhase * 0.7) * (currentAmp * 8);

        springX.set(newX);
        springY.set(newY);
        springRot.set(newRot);
        springOpacity.set(0.75 + 0.25 * (1 - currentAmp));
        springBlur.set(currentAmp * 1.2);

        if (normalized < 1 || currentAmp > 0.005) {
          requestAnimationFrame(step);
        } else {
          // Settle perfectly
          springX.set(0);
          springY.set(0);
          springRot.set(0);
          springOpacity.set(1);
          springBlur.set(0);
        }
      };
      requestAnimationFrame(step);
    };
    animateChar();
  }, [char, index, radius, duration, decay, initialX, initialY, initialRot, springX, springY, springRot, springOpacity, springBlur]);

  return (
    <motion.span
      style={{
        x: springX,
        y: springY,
        rotate: springRot,
        opacity: springOpacity,
        filter: useTransform(springBlur, (b) => `blur(${b}px)`),
      }}
      className="inline-block will-change-transform"
      onMouseEnter={() => {
        springX.set((Math.random() - 0.5) * 40);
        springY.set((Math.random() - 0.5) * 40);
        springRot.set((Math.random() - 0.5) * 30);
        springOpacity.set(0);
        springBlur.set(4);
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}
