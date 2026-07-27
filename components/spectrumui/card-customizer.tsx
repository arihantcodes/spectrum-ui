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
  { id: '0', label: '0', card: '0px', base: '0px' },
  { id: '0.25', label: '0.25', card: '4px', base: '2px' },
  { id: '0.5', label: '0.5', card: '8px', base: '6px' },
  { id: '0.75', label: '0.75', card: '12px', base: '8px' },
  { id: '1', label: '1.0', card: '16px', base: '10px' },
  { id: '1.25', label: '1.25', card: '20px', base: '12px' },
  { id: '1.5', label: '1.5', card: '24px', base: '14px' },
];

type Accent = {
  id: string;
  label: string;
  /** Swatch colour. */
  swatch: string;
  /** Unset for `neutral` so it inherits the site's light/dark foreground. */
  vars?: Record<string, string>;
};

// Brand accents first (the landing's vermilion / lime pair), then a small set
// of muted tones that hold up on both themes. No candy colours.
const ACCENTS: Accent[] = [
  { id: 'neutral', label: 'Neutral', swatch: 'hsl(0 0% 45%)' },
  {
    id: 'vermilion',
    label: 'Vermilion',
    swatch: '#f9452d',
    vars: {
      '--primary': '7 95% 58%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '7 95% 58%',
    },
  },
  {
    id: 'lime',
    label: 'Lime',
    swatch: '#E1F435',
    vars: {
      '--primary': '66 90% 58%',
      '--primary-foreground': '0 0% 9%',
      '--ring': '66 90% 58%',
    },
  },
  {
    id: 'indigo',
    label: 'Indigo',
    swatch: '#4f46e5',
    vars: {
      '--primary': '243 75% 59%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '243 75% 59%',
    },
  },
  {
    id: 'teal',
    label: 'Teal',
    swatch: '#0d9488',
    vars: {
      '--primary': '175 84% 32%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '175 84% 32%',
    },
  },
  {
    id: 'ink',
    label: 'Ink',
    swatch: '#475569',
    vars: {
      '--primary': '215 19% 35%',
      '--primary-foreground': '0 0% 98%',
      '--ring': '215 19% 35%',
    },
  },
];

const DEFAULT_ROUNDNESS = '0.75';
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
    const radius = ROUNDNESS.find((option) => option.id === roundness) ?? ROUNDNESS[3];
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
          <div className="space-y-2">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] shrink-0 border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
                Customize
              </span>
            </span>
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
