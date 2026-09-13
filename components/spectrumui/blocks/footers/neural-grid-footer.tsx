'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-node-drift { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes su-edge-flow { to { stroke-dashoffset: -24 } }
`;

export type NeuralGridFooterVariant = 'Lattice' | 'Constellation';

export interface NeuralGridFooterProps {
  brand: string;
  headline?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  legal?: { label: string; href: string }[];
  copyright?: string;
  radius?: number;
  variant?: NeuralGridFooterVariant;
  className?: string;
}

const WIDTH = 1000;
const DEFAULT_RATIO = 0.4;

interface LatticeNode {
  id: number;
  nx: number;
  ny: number;
}

/**
 * Deterministic pseudo-random in [0, 1).
 *
 * Rounded to six places on purpose: `Math.sin` is only required to be
 * *approximately* correct, so Node and the browser disagree in the last couple
 * of bits. Unrounded, that reaches the DOM as `cy="316.217558184359"` against
 * `cy="316.21755818425714"` and React throws a hydration mismatch on every
 * node in the lattice.
 */
function seeded(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return Math.round((value - Math.floor(value)) * 1e6) / 1e6;
}

function buildNodes(variant: NeuralGridFooterVariant): LatticeNode[] {
  if (variant === 'Constellation') {
    return Array.from({ length: 54 }, (_, index) => ({
      id: index,
      nx: 0.02 + seeded(index) * 0.96,
      ny: 0.06 + seeded(index + 500) * 0.88,
    }));
  }
  const columns = 14;
  const rows = 7;
  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      id: index,
      nx: (column + 0.5) / columns + (seeded(index) - 0.5) * 0.03,
      ny: (row + 0.5) / rows + (seeded(index + 900) - 0.5) * 0.035,
    };
  });
}

function buildEdges(nodes: LatticeNode[], height: number, maxDistance: number) {
  const edges: { from: number; to: number }[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = (nodes[i].nx - nodes[j].nx) * WIDTH;
      const dy = (nodes[i].ny - nodes[j].ny) * height;
      if (Math.hypot(dx, dy) <= maxDistance) edges.push({ from: i, to: j });
    }
  }
  return edges;
}

function Lattice({
  nodes,
  edges,
  height,
  bright,
}: {
  nodes: LatticeNode[];
  edges: { from: number; to: number }[];
  height: number;
  bright: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <g
        stroke={bright ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.075)'}
        strokeWidth={bright ? 1 : 0.7}
      >
        {edges.map((edge, index) => (
          <line
            key={index}
            x1={nodes[edge.from].nx * WIDTH}
            y1={nodes[edge.from].ny * height}
            x2={nodes[edge.to].nx * WIDTH}
            y2={nodes[edge.to].ny * height}
            strokeDasharray={bright ? '3 5' : undefined}
            className={
              bright
                ? 'animate-[su-edge-flow_1.6s_linear_infinite] motion-reduce:animate-none'
                : undefined
            }
          />
        ))}
      </g>
      <g fill={bright ? '#ffffff' : 'rgba(255,255,255,0.24)'}>
        {nodes.map((node, index) => (
          <circle
            key={node.id}
            cx={node.nx * WIDTH}
            cy={node.ny * height}
            r={bright ? 2.4 : 1.5}
            className="animate-[su-node-drift_5s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationDelay: `${(index % 11) * 180}ms` }}
          />
        ))}
      </g>
    </svg>
  );
}

export function NeuralGridFooter({
  brand,
  headline = 'Every request routed, every token accounted for.',
  groups = [],
  legal = [],
  copyright,
  radius = 190,
  variant = 'Lattice',
  className,
}: NeuralGridFooterProps) {
  const stage = useRef<HTMLDivElement>(null);
  const lit = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  useEffect(() => {
    const node = stage.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box || box.width === 0) return;
      setRatio(Math.round((box.height / box.width) * 50) / 50);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const height = WIDTH * ratio;
  const nodes = useMemo(() => buildNodes(variant), [variant]);
  const edges = useMemo(
    () => buildEdges(nodes, height, variant === 'Constellation' ? 150 : 120),
    [height, nodes, variant],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const clientX = event.clientX;
      const clientY = event.clientY;
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const box = stage.current?.getBoundingClientRect();
        const layer = lit.current;
        if (!box || !layer) return;
        const mask = `radial-gradient(${radius}px circle at ${clientX - box.left}px ${clientY - box.top}px, #000 0%, rgba(0,0,0,0.5) 50%, transparent 78%)`;
        layer.style.opacity = '1';
        layer.style.webkitMaskImage = mask;
        layer.style.maskImage = mask;
      });
    },
    [radius],
  );

  const onPointerLeave = useCallback(() => {
    if (lit.current) lit.current.style.opacity = '0';
  }, []);

  return (
    <footer
      className={cn('w-full border-t border-white/[0.07] bg-[#08080A] text-neutral-100', className)}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div
        ref={stage}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative isolate overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <Lattice nodes={nodes} edges={edges} height={height} bright={false} />
        </div>
        <div
          ref={lit}
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        >
          <Lattice nodes={nodes} edges={edges} height={height} bright />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_20%_30%,#08080A_18%,rgba(8,8,10,0.72)_46%,transparent_78%)]"
        />

        <div className="mx-auto w-full max-w-[1180px] px-6 py-14">
          <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-400">
            {brand}
          </p>
          <h2 className="mt-3 max-w-[22ch] text-balance text-[clamp(22px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.9px]">
            {headline}
          </h2>

          {groups.length > 0 && (
            <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="text-[13px] font-medium text-neutral-50">{group.title}</p>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[13.5px] text-neutral-400 transition-colors duration-150 hover:text-neutral-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}

          <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-[12px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-150 hover:text-neutral-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NeuralGridFooter;
