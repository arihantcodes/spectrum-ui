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
  /** Swatch colour (or gradient start when `gradient` is set). */
  swatch: string;
  /**
   * Gradient stops. When set, `.bg-primary` fills inside the preview get this
   * as a background-image while `--primary` (the midpoint) keeps strokes,
   * rings, and text accents in a matching solid.
   */
  gradient?: [string, string];
  /** Unset for `neutral` so it inherits the site's light/dark foreground. */
  vars?: Record<string, string>;
};

const solid = (
  id: string,
  label: string,
  swatch: string,
  hsl: string,
  fg = '0 0% 98%',
): Accent => ({
  id,
  label,
  swatch,
  vars: { '--primary': hsl, '--primary-foreground': fg, '--ring': hsl },
});

const gradient = (
  id: string,
  label: string,
  stops: [string, string],
  midHsl: string,
  fg = '0 0% 98%',
): Accent => ({
  id,
  label,
  swatch: stops[0],
  gradient: stops,
  vars: { '--primary': midHsl, '--primary-foreground': fg, '--ring': midHsl },
});

// Brand accents first (the landing's vermilion / lime pair), then muted tones
// that hold up on both themes. No candy colours.
const ACCENTS: Accent[] = [
  { id: 'neutral', label: 'Neutral', swatch: 'hsl(0 0% 45%)' },
  solid('vermilion', 'Vermilion', '#f9452d', '7 95% 58%'),
  solid('lime', 'Lime', '#E1F435', '66 90% 58%', '0 0% 9%'),
  solid('indigo', 'Indigo', '#4f46e5', '243 75% 59%'),
  solid('teal', 'Teal', '#0d9488', '175 84% 32%'),
  solid('ocean', 'Ocean', '#1878b0', '203 76% 39%'),
  solid('forest', 'Forest', '#34795a', '153 40% 34%'),
  solid('copper', 'Copper', '#b8672e', '25 60% 45%'),
  solid('ink', 'Ink', '#475569', '215 19% 35%'),
];

// Low hue-distance pairs read as elegant rather than loud.
const GRADIENTS: Accent[] = [
  gradient('sunset', 'Sunset', ['#f9452d', '#fb923c'], '17 95% 58%'),
  gradient('iris', 'Iris', ['#4f46e5', '#a855f7'], '257 82% 62%'),
  gradient('lagoon', 'Lagoon', ['#0d9488', '#0ea5e9'], '190 87% 39%'),
  gradient('dusk', 'Dusk', ['#334155', '#6366f1'], '235 37% 47%'),
];

const ALL_ACCENTS = [...ACCENTS, ...GRADIENTS];

const DEFAULT_ROUNDNESS = '0.75';
const DEFAULT_ACCENT = 'neutral';

const chipClass = (active: boolean) =>
  `inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring active:scale-[0.96] ${
    active
      ? 'border-primary bg-accent text-accent-foreground'
      : 'border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground'
  }`;

export function CardCustomizer({ children }: { children: ReactNode }) {
  const [roundness, setRoundness] = useState(DEFAULT_ROUNDNESS);
  const [accent, setAccent] = useState(DEFAULT_ACCENT);

  const isDefault = roundness === DEFAULT_ROUNDNESS && accent === DEFAULT_ACCENT;

  const { style, activeGradient } = useMemo(() => {
    const radius = ROUNDNESS.find((option) => option.id === roundness) ?? ROUNDNESS[3];
    const colour = ALL_ACCENTS.find((option) => option.id === accent);
    return {
      style: {
        '--radius-xl': radius.card,
        '--radius': radius.base,
        ...(colour?.vars ?? {}),
      } as CSSProperties,
      activeGradient: colour?.gradient ?? null,
    };
  }, [roundness, accent]);

  return (
    <div>
      <div className="mb-10 rounded-xl border bg-card p-5 shadow-xs sm:p-6">
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
            <RotateCcw className="size-3! transition-transform duration-300 group-hover/reset:-rotate-90" />
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
              {ACCENTS.map((option) => (
                <AccentChip
                  key={option.id}
                  option={option}
                  active={option.id === accent}
                  onSelect={() => setAccent(option.id)}
                />
              ))}
            </div>
          </div>

          <div role="radiogroup" aria-label="Accent gradient">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Gradient</p>
            <div className="flex flex-wrap gap-1.5">
              {GRADIENTS.map((option) => (
                <AccentChip
                  key={option.id}
                  option={option}
                  active={option.id === accent}
                  onSelect={() => setAccent(option.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={style} className="spectrum-cards-preview">
        {activeGradient && (
          <style
            dangerouslySetInnerHTML={{
              __html: `.spectrum-cards-preview .bg-primary{background-image:linear-gradient(135deg,${activeGradient[0]},${activeGradient[1]})}`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

function AccentChip({
  option,
  active,
  onSelect,
}: {
  option: Accent;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={chipClass(active)}
    >
      <span
        aria-hidden
        className="size-3 shrink-0 rounded-full"
        style={
          option.gradient
            ? {
                backgroundImage: `linear-gradient(135deg, ${option.gradient[0]}, ${option.gradient[1]})`,
              }
            : { backgroundColor: option.swatch }
        }
      />
      {option.label}
    </button>
  );
}
