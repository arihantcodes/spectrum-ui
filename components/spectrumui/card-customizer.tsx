'use client';

import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Check, RotateCcw } from 'lucide-react';

/**
 * Live theming for the card gallery.
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
  { id: 'none', label: 'none', card: '0px', base: '0px' },
  { id: 'sm', label: 'sm', card: '4px', base: '2px' },
  { id: 'md', label: 'md', card: '6px', base: '4px' },
  { id: 'lg', label: 'lg', card: '8px', base: '6px' },
  { id: 'xl', label: 'xl', card: '12px', base: '8px' },
  { id: '2xl', label: '2xl', card: '16px', base: '10px' },
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
      <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-xl border bg-muted/20 px-4 py-3">
        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Card roundness</legend>
          <span className="text-xs font-medium text-muted-foreground">Radius</span>
          <div className="flex items-center gap-1">
            {ROUNDNESS.map((option) => {
              const active = option.id === roundness;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRoundness(option.id)}
                  aria-pressed={active}
                  className={`h-7 min-w-9 rounded-md border px-2 font-mono text-xs transition-colors ${
                    active
                      ? 'border-foreground/30 bg-background text-foreground shadow-sm'
                      : 'border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Accent colour</legend>
          <span className="text-xs font-medium text-muted-foreground">Color</span>
          <div className="flex items-center gap-1.5">
            {ACCENTS.map((option) => {
              const active = option.id === accent;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAccent(option.id)}
                  aria-pressed={active}
                  aria-label={option.label}
                  title={option.label}
                  className={`flex size-6 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-transform duration-150 hover:scale-110 active:scale-95 ${
                    active ? 'ring-2 ring-foreground/40' : ''
                  }`}
                  style={{ backgroundColor: option.swatch }}
                >
                  {active && <Check className="size-3 text-white drop-shadow" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => {
            setRoundness(DEFAULT_ROUNDNESS);
            setAccent(DEFAULT_ACCENT);
          }}
          disabled={isDefault}
          className="group/reset ml-auto flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <RotateCcw className="size-3 transition-transform duration-300 group-hover/reset:-rotate-90" />
          Reset
        </button>
      </div>

      <div style={style}>{children}</div>
    </div>
  );
}
