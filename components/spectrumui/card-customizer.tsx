'use client';

import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Live theming for the card gallery, styled after shadcn's theme customizer.
 *
 * Roundness drives `--radius-xl` (what `rounded-xl` resolves to) plus `--radius`
 * so the controls inside each card round in proportion. Colour overrides
 * `--primary`, which every accent in the gallery is wired to.
 *
 * Both are plain CSS variables set on a wrapper, so nothing outside the preview
 * is affected and the copy-paste snippets stay idiomatic `rounded-xl` / `bg-primary`.
 */

type Roundness = {
  id: string;
  label: string;
  /** What `rounded-xl` resolves to. */
  card: string;
  /** Base radius for nested controls (inputs, buttons, badges). */
  base: string;
};

const ROUNDNESS: Roundness[] = [
  { id: 'none', label: '0', card: '0px', base: '0px' },
  { id: 'sm', label: '0.25', card: '4px', base: '2px' },
  { id: 'md', label: '0.375', card: '6px', base: '4px' },
  { id: 'lg', label: '0.5', card: '8px', base: '6px' },
  { id: 'xl', label: '0.75', card: '12px', base: '8px' },
  { id: '2xl', label: '1.0', card: '16px', base: '10px' },
];

type Accent = {
  id: string;
  label: string;
  /** Swatch colour. */
  swatch: string;
  /** Unset for `neutral` so it inherits the site's light/dark foreground. */
  vars?: Record<string, string>;
};

const ACCENTS: Accent[] = [
  { id: 'neutral', label: 'Neutral', swatch: 'hsl(0 0% 45%)' },
  {
    id: 'blue',
    label: 'Blue',
    swatch: 'hsl(221 83% 53%)',
    vars: {
      '--primary': '221 83% 53%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '221 83% 53%',
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    swatch: 'hsl(262 83% 58%)',
    vars: {
      '--primary': '262 83% 58%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '262 83% 58%',
    },
  },
  {
    id: 'green',
    label: 'Green',
    swatch: 'hsl(142 71% 40%)',
    vars: {
      '--primary': '142 71% 40%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '142 71% 40%',
    },
  },
  {
    id: 'amber',
    label: 'Amber',
    swatch: 'hsl(38 92% 50%)',
    vars: { '--primary': '38 92% 50%', '--primary-foreground': '0 0% 9%', '--ring': '38 92% 50%' },
  },
  {
    id: 'rose',
    label: 'Rose',
    swatch: 'hsl(347 77% 50%)',
    vars: {
      '--primary': '347 77% 50%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '347 77% 50%',
    },
  },
];

const DEFAULT_ROUNDNESS = 'xl';
const DEFAULT_ACCENT = 'neutral';

const chipClass = (active: boolean) =>
  `inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-[0.96] ${
    active
      ? 'border-primary bg-accent text-accent-foreground'
      : 'border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground'
  }`;

export function CardCustomizer({ children }: { children: ReactNode }) {
  const [roundness, setRoundness] = useState(DEFAULT_ROUNDNESS);
  const [accent, setAccent] = useState(DEFAULT_ACCENT);

  const isDefault = roundness === DEFAULT_ROUNDNESS && accent === DEFAULT_ACCENT;

  const style = useMemo(() => {
    const radius = ROUNDNESS.find((option) => option.id === roundness) ?? ROUNDNESS[4];
    const colour = ACCENTS.find((option) => option.id === accent);
    return {
      '--radius-xl': radius.card,
      '--radius': radius.base,
      ...(colour?.vars ?? {}),
    } as CSSProperties;
  }, [roundness, accent]);

  return (
    <div>
      <div className="mb-10 rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-base font-semibold leading-none tracking-tight">Customize</p>
            <p className="text-sm text-muted-foreground">
              Preview every card in your radius and accent. Copied code stays clean.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setRoundness(DEFAULT_ROUNDNESS);
              setAccent(DEFAULT_ACCENT);
            }}
            disabled={isDefault}
            className="group/reset h-8 shrink-0 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="!size-3 transition-transform duration-300 group-hover/reset:-rotate-90" />
            Reset
          </Button>
        </div>

        <div className="mt-5 space-y-4">
          <div role="radiogroup" aria-label="Card radius">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Radius</p>
            <div className="flex flex-wrap gap-1.5">
              {ROUNDNESS.map((option) => {
                const active = option.id === roundness;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRoundness(option.id)}
                    className={`${chipClass(active)} min-w-12 justify-center font-mono`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div role="radiogroup" aria-label="Accent color">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Color</p>
            <div className="flex flex-wrap gap-1.5">
              {ACCENTS.map((option) => {
                const active = option.id === accent;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setAccent(option.id)}
                    className={chipClass(active)}
                  >
                    <span
                      aria-hidden
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: option.swatch }}
                    />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={style}>{children}</div>
    </div>
  );
}
