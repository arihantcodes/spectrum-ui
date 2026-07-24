import type React from 'react';
import { cn } from '@/lib/utils';

/**
 * Blog cover art.
 *
 * Every post gets a small, hand-drawn CSS vignette on a fixed-tone tile —
 * warm paper or near-black ink — so the listing grid alternates light and
 * dark tiles the way the reference does, in both site themes. Pure
 * CSS/SVG: no images to load, crisp at any size.
 *
 * Accent discipline: at most one accent per tile — coral #f9452d on paper,
 * chartreuse #E1F435 on ink.
 */

type Tone = 'paper' | 'ink';

/* ---------------------------------------------------------------- atoms */

function MiniCard({
  ink,
  className,
  children,
}: {
  ink: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-lg',
        ink
          ? 'bg-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Pill({
  ink,
  children,
  active,
  className,
}: {
  ink: boolean;
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center justify-center rounded-full px-2.5 font-mono text-[9px] leading-none tracking-tight',
        active
          ? ink
            ? 'bg-white text-black shadow-[0_0_14px_rgba(255,255,255,0.25)]'
            : 'bg-neutral-900 text-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
          : ink
            ? 'bg-white/[0.07] text-neutral-300 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]'
            : 'bg-white text-neutral-600 shadow-[0_0_0_1px_rgba(0,0,0,0.09)]',
        className,
      )}
    >
      {children}
    </span>
  );
}

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center', className)}>{children}</div>;
}

const hair = (ink: boolean) => (ink ? 'bg-white/[0.14]' : 'bg-black/[0.12]');
const soft = (ink: boolean) => (ink ? 'text-neutral-400' : 'text-neutral-500');
const strong = (ink: boolean) => (ink ? 'text-neutral-100' : 'text-neutral-900');
const accent = (ink: boolean) => (ink ? '#E1F435' : '#f9452d');

/* ------------------------------------------------------------- vignettes */

function ArtCurve({ ink }: { ink: boolean }) {
  return (
    <svg viewBox="0 0 200 120" className="w-[62%]" aria-hidden="true">
      <path
        d="M0 118 L200 118 M0 118 L0 0"
        stroke={ink ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)'}
        strokeWidth="1.5"
      />
      <path
        d="M0 118 C 30 118, 40 8, 200 4"
        fill="none"
        stroke={accent(ink)}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="0" cy="118" r="3.5" fill={ink ? '#fff' : '#171717'} />
      <circle cx="200" cy="4" r="3.5" fill={ink ? '#fff' : '#171717'} />
    </svg>
  );
}

function ArtToggle() {
  // Split tile: the one cover that carries both tones itself.
  return (
    <div className="absolute inset-0 flex">
      <div className="flex flex-1 items-center justify-end bg-[#fafaf9] pr-[9%]">
        <span className="size-9 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.12)]" />
      </div>
      <div className="flex flex-1 items-center justify-start bg-[#0c0c0c] pl-[9%]">
        <span className="flex h-9 w-16 items-center rounded-full bg-white/[0.12] p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.14)]">
          <span className="ml-auto size-7 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
        </span>
      </div>
    </div>
  );
}

function ArtSpecimen({ ink }: { ink: boolean }) {
  return (
    <div className="flex items-end gap-5">
      <span className={cn('font-spectral text-[84px] font-light leading-none tracking-tighter', strong(ink))}>
        Ag
      </span>
      <div className="mb-3 flex flex-col gap-2">
        <span className={cn('font-spectral text-[24px] leading-none', soft(ink))}>Aa</span>
        <span className={cn('font-mono text-[13px] leading-none', soft(ink))}>Aa</span>
        <span className={cn('h-px w-12', hair(ink))} />
      </div>
    </div>
  );
}

function ArtRuler({ ink }: { ink: boolean }) {
  const steps = [8, 14, 22, 34, 52];
  return (
    <div className="flex items-end gap-3">
      {steps.map((h, i) => (
        <div key={h} className="flex flex-col items-center gap-2">
          <span
            className={cn('w-7 rounded-md', ink ? 'bg-white/[0.16]' : 'bg-neutral-900/[0.82]')}
            style={{ height: h, backgroundColor: i === 3 ? accent(ink) : undefined }}
          />
          <span className={cn('font-mono text-[9px]', soft(ink))}>{h - 4}</span>
        </div>
      ))}
    </div>
  );
}

function ArtRamp({ ink }: { ink: boolean }) {
  const stops = ['#FFE8E2', '#FFC5B5', '#FB8A6C', '#f9452d', '#B22412', '#5C130A'];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5">
        {stops.map((c) => (
          <span
            key={c}
            className="size-9 rounded-lg"
            style={{ backgroundColor: c, boxShadow: ink ? '0 0 0 1px rgba(255,255,255,0.08)' : '0 0 0 1px rgba(0,0,0,0.06)' }}
          />
        ))}
      </div>
      <div className="flex w-full justify-between px-0.5">
        <span className={cn('font-mono text-[9px]', soft(ink))}>50</span>
        <span className={cn('font-mono text-[9px]', soft(ink))}>950</span>
      </div>
    </div>
  );
}

function ArtGrid({ ink }: { ink: boolean }) {
  return (
    <div className="grid w-[58%] grid-cols-3 grid-rows-2 gap-2">
      <MiniCard ink={ink} className="col-span-2 h-12" />
      <MiniCard ink={ink} className="h-12" />
      <MiniCard ink={ink} className="h-12" />
      <MiniCard ink={ink} className="col-span-2 h-12" />
    </div>
  );
}

function ArtViewports({ ink }: { ink: boolean }) {
  return (
    <div className="flex items-end gap-3">
      <MiniCard ink={ink} className="h-16 w-10" />
      <MiniCard ink={ink} className="h-20 w-16" />
      <MiniCard ink={ink} className="h-24 w-28" />
    </div>
  );
}

function ArtField({ ink }: { ink: boolean }) {
  return (
    <div className="flex w-[62%] flex-col gap-2.5">
      <span className={cn('h-2 w-10 rounded-full', hair(ink))} />
      <div
        className={cn(
          'flex h-10 items-center rounded-lg px-3',
          ink
            ? 'bg-white/[0.06] shadow-[0_0_0_1.5px_rgba(255,255,255,0.35)]'
            : 'bg-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.55)]',
        )}
      >
        <span className={cn('font-mono text-[11px]', soft(ink))}>you@team.com</span>
        <span className="ml-0.5 h-4 w-px animate-pulse bg-current opacity-60" />
      </div>
      <span
        className={cn(
          'flex h-9 items-center justify-center rounded-lg text-[11px] font-medium',
          ink ? 'bg-white text-black' : 'bg-neutral-900 text-white',
        )}
      >
        Continue
      </span>
    </div>
  );
}

function ArtTap({ ink }: { ink: boolean }) {
  return (
    <div className="relative flex items-center gap-4">
      <Pill ink={ink} className="h-10 px-5 text-[11px]">
        Hover
      </Pill>
      <span className="relative">
        <Pill ink={ink} active className="h-10 scale-[0.96] px-5 text-[11px]">
          Press
        </Pill>
        <span
          className="absolute -bottom-1.5 -right-1.5 size-4 rounded-full"
          style={{ backgroundColor: accent(ink), opacity: 0.9 }}
        />
      </span>
    </div>
  );
}

function ArtTokens({ ink }: { ink: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <Row className="gap-2">
        <Pill ink={ink}>--radius: 12px</Pill>
        <Pill ink={ink}>--space-4</Pill>
      </Row>
      <span className={cn('h-3 w-px', hair(ink))} />
      <MiniCard ink={ink} className="flex h-14 w-40 items-center justify-center rounded-xl">
        <span className={cn('h-2 w-16 rounded-full', hair(ink))} />
      </MiniCard>
    </div>
  );
}

function ArtLayers({ ink }: { ink: boolean }) {
  return (
    <div className="relative h-[104px] w-[52%]">
      <MiniCard ink={ink} className="absolute inset-x-8 top-0 h-16 opacity-40" />
      <MiniCard ink={ink} className="absolute inset-x-4 top-4 h-16 opacity-70" />
      <MiniCard ink={ink} className="absolute inset-x-0 top-8 flex h-16 items-center gap-2 px-4">
        <span className="size-6 rounded-md" style={{ backgroundColor: accent(ink) }} />
        <div className="flex flex-col gap-1.5">
          <span className={cn('h-1.5 w-20 rounded-full', hair(ink))} />
          <span className={cn('h-1.5 w-12 rounded-full', hair(ink))} />
        </div>
      </MiniCard>
    </div>
  );
}

function ArtTerminal({ ink, line }: { ink: boolean; line: string }) {
  return (
    <MiniCard ink={ink} className="w-[70%] rounded-xl">
      <div className={cn('flex h-7 items-center gap-1.5 border-b px-3', ink ? 'border-white/[0.08]' : 'border-black/[0.06]')}>
        <span className={cn('size-2 rounded-full', hair(ink))} />
        <span className={cn('size-2 rounded-full', hair(ink))} />
        <span className={cn('size-2 rounded-full', hair(ink))} />
      </div>
      <div className="flex flex-col gap-2 px-3.5 py-3.5">
        <span className={cn('font-mono text-[10.5px]', strong(ink))}>
          <span style={{ color: accent(ink) }}>▲</span> {line}
        </span>
        <span className={cn('h-1.5 w-24 rounded-full', hair(ink))} />
        <span className={cn('h-1.5 w-16 rounded-full', hair(ink))} />
      </div>
    </MiniCard>
  );
}

function ArtCommand({ ink }: { ink: boolean }) {
  return (
    <MiniCard ink={ink} className="w-[64%] rounded-xl p-2">
      <div className={cn('mb-2 flex h-8 items-center justify-between rounded-lg px-3', ink ? 'bg-white/[0.06]' : 'bg-black/[0.04]')}>
        <span className={cn('font-mono text-[10px]', soft(ink))}>search tools…</span>
        <span className={cn('font-mono text-[9px]', soft(ink))}>⌘K</span>
      </div>
      {['Figma', 'Cursor', 'Linear'].map((t, i) => (
        <div key={t} className={cn('flex h-7 items-center gap-2 rounded-md px-3', i === 0 && (ink ? 'bg-white/[0.08]' : 'bg-black/[0.05]'))}>
          <span className={cn('size-2.5 rounded-[4px]', i === 0 ? '' : hair(ink))} style={i === 0 ? { backgroundColor: accent(ink) } : undefined} />
          <span className={cn('font-mono text-[10px]', i === 0 ? strong(ink) : soft(ink))}>{t}</span>
        </div>
      ))}
    </MiniCard>
  );
}

function ArtBoxesFlow({ ink, from, to }: { ink: boolean; from: string; to: string }) {
  return (
    <div className="flex items-center gap-3">
      <MiniCard ink={ink} className="flex h-16 w-24 items-center justify-center">
        <span className={cn('font-mono text-[10px] uppercase tracking-[0.08em]', strong(ink))}>{from}</span>
      </MiniCard>
      <svg width="34" height="12" viewBox="0 0 34 12" aria-hidden="true">
        <path d="M0 6 H30 M26 1.5 L31 6 L26 10.5" fill="none" stroke={accent(ink)} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <MiniCard ink={ink} className="flex h-16 w-24 items-center justify-center">
        <span className={cn('font-mono text-[10px] uppercase tracking-[0.08em]', soft(ink))}>{to}</span>
      </MiniCard>
    </div>
  );
}

function ArtGauge({ ink }: { ink: boolean }) {
  return (
    <div className="flex w-[60%] flex-col gap-3.5">
      {[
        { label: 'LCP', w: '38%', good: true },
        { label: 'CLS', w: '22%', good: true },
        { label: 'JS', w: '86%', good: false },
      ].map((m) => (
        <div key={m.label} className="flex items-center gap-3">
          <span className={cn('w-8 font-mono text-[10px]', soft(ink))}>{m.label}</span>
          <div className={cn('h-2 flex-1 overflow-hidden rounded-full', ink ? 'bg-white/[0.08]' : 'bg-black/[0.06]')}>
            <span
              className="block h-full rounded-full"
              style={{ width: m.w, backgroundColor: m.good ? accent(ink) : ink ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ArtFocus({ ink }: { ink: boolean }) {
  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          'flex h-11 items-center rounded-full px-6 text-[12px] font-medium',
          ink ? 'bg-white text-black' : 'bg-neutral-900 text-white',
        )}
      >
        Submit
      </span>
      <span
        aria-hidden="true"
        className="absolute -inset-[5px] rounded-full"
        style={{ boxShadow: `0 0 0 2.5px ${accent(ink)}` }}
      />
    </span>
  );
}

function ArtQuote({ ink, text }: { ink: boolean; text: React.ReactNode }) {
  return (
    <p className={cn('max-w-[75%] text-center font-spectral text-[19px] font-light leading-[1.45] tracking-tight', strong(ink))}>
      {text}
    </p>
  );
}

function ArtChecks({ ink, done }: { ink: boolean; done: number }) {
  const rows = ['Tokens named', 'States covered', 'Motion specced'];
  return (
    <div className="flex w-[58%] flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r} className="flex items-center gap-3">
          <span
            className={cn('flex size-5 items-center justify-center rounded-[7px]', i < done ? '' : ink ? 'shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.25)]' : 'shadow-[inset_0_0_0_1.5px_rgba(0,0,0,0.2)]')}
            style={i < done ? { backgroundColor: accent(ink) } : undefined}
          >
            {i < done && (
              <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden="true">
                <path d="M1 4 L3.6 6.6 L9 1" fill="none" stroke={ink ? '#000' : '#fff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className={cn('text-[12px]', i < done ? strong(ink) : soft(ink))}>{r}</span>
        </div>
      ))}
    </div>
  );
}

function ArtFrameToCode({ ink, dashed }: { ink: boolean; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          'relative flex h-20 w-24 items-center justify-center rounded-lg',
          dashed
            ? cn('border-[1.5px] border-dashed', ink ? 'border-white/[0.35]' : 'border-black/[0.3]')
            : ink
              ? 'bg-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'
              : 'bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]',
        )}
      >
        <span className={cn('absolute -left-1 -top-1 size-2 rounded-[3px]', ink ? 'bg-white' : 'bg-neutral-900')} />
        <span className={cn('absolute -right-1 -top-1 size-2 rounded-[3px]', ink ? 'bg-white' : 'bg-neutral-900')} />
        <span className={cn('absolute -bottom-1 -left-1 size-2 rounded-[3px]', ink ? 'bg-white' : 'bg-neutral-900')} />
        <span className={cn('absolute -bottom-1 -right-1 size-2 rounded-[3px]', ink ? 'bg-white' : 'bg-neutral-900')} />
        <span className={cn('h-2 w-12 rounded-full', hair(ink))} />
      </span>
      <span className={cn('font-mono text-[13px]', soft(ink))}>→</span>
      <span className={cn('font-mono text-[22px] font-medium tracking-tight', strong(ink))}>
        {'</>'}
      </span>
    </div>
  );
}

function ArtPrompt({ ink }: { ink: boolean }) {
  return (
    <div className="flex w-[64%] flex-col gap-2.5">
      <span
        className={cn(
          'self-end rounded-2xl rounded-br-md px-3.5 py-2 font-mono text-[10.5px]',
          ink ? 'bg-white text-black' : 'bg-neutral-900 text-white',
        )}
      >
        make the empty state feel alive
      </span>
      <MiniCard ink={ink} className="flex flex-col gap-2 self-start rounded-2xl rounded-bl-md px-3.5 py-3">
        <span className={cn('h-1.5 w-32 rounded-full', hair(ink))} />
        <span className={cn('h-1.5 w-24 rounded-full', hair(ink))} />
        <span className="h-1.5 w-16 rounded-full" style={{ backgroundColor: accent(ink) }} />
      </MiniCard>
    </div>
  );
}

function ArtSizes({ ink }: { ink: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Pill ink={ink} className="h-7 px-3">sm</Pill>
      <Pill ink={ink} active className="h-9 px-4 text-[10px]">md</Pill>
      <Pill ink={ink} className="h-11 px-5 text-[11px]">lg</Pill>
    </div>
  );
}

function ArtSidebarCanvas({ ink }: { ink: boolean }) {
  return (
    <MiniCard ink={ink} className="flex h-[104px] w-[64%] overflow-hidden rounded-xl">
      <div className={cn('flex w-1/3 flex-col gap-2 border-r p-3', ink ? 'border-white/[0.08]' : 'border-black/[0.06]')}>
        <span className={cn('h-1.5 w-10 rounded-full', hair(ink))} />
        <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accent(ink) }} />
        <span className={cn('h-1.5 w-8 rounded-full', hair(ink))} />
        <span className={cn('h-1.5 w-11 rounded-full', hair(ink))} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Pill ink={ink} active className="h-8 px-4 text-[10px]">Button</Pill>
      </div>
    </MiniCard>
  );
}

function ArtMisaligned({ ink }: { ink: boolean }) {
  return (
    <div className="relative w-[56%]">
      <div className="flex flex-col gap-2.5">
        <MiniCard ink={ink} className="h-9 w-full" />
        <MiniCard ink={ink} className="ml-6 h-9 w-full" />
        <MiniCard ink={ink} className="h-9 w-3/4" />
      </div>
      <span
        className="absolute -right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold"
        style={{ backgroundColor: accent(ink), color: ink ? '#000' : '#fff' }}
      >
        !
      </span>
    </div>
  );
}

function ArtBadge({ ink, label }: { ink: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={cn('font-mono text-[56px] font-medium leading-none tracking-tighter', strong(ink))}>{label}</span>
      <span className="h-1.5 w-24 rounded-full" style={{ backgroundColor: accent(ink) }} />
    </div>
  );
}

function ArtChips({ ink }: { ink: boolean }) {
  return (
    <div className="flex max-w-[70%] flex-wrap items-center justify-center gap-2">
      {['flex', 'gap-2', 'size-9', 'rounded-xl', 'group-hover:*'].map((c, i) => (
        <span
          key={c}
          className={cn(
            'rounded-md px-2 py-1 font-mono text-[10px]',
            i === 4
              ? ''
              : ink
                ? 'bg-white/[0.08] text-neutral-300 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'
                : 'bg-white text-neutral-600 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]',
          )}
          style={i === 4 ? { backgroundColor: accent(ink), color: ink ? '#000' : '#fff' } : undefined}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function ArtCrossfade({ ink }: { ink: boolean }) {
  return (
    <div className="relative flex items-center">
      <MiniCard ink={ink} className="h-20 w-28 opacity-45" />
      <MiniCard ink={ink} className="-ml-10 flex h-20 w-28 items-center justify-center">
        <span className={cn('h-2 w-14 rounded-full', hair(ink))} />
      </MiniCard>
      <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2" width="46" height="10" viewBox="0 0 46 10" aria-hidden="true">
        <path d="M2 5 H42 M38 1.5 L43 5 L38 8.5" fill="none" stroke={accent(ink)} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ArtSteps({ ink }: { ink: boolean }) {
  return (
    <div className="flex w-[58%] flex-col gap-2.5">
      {['Learn the system', 'Ship one component', 'Own the polish'].map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-6 items-center justify-center rounded-full font-mono text-[10px]',
              i === 0
                ? ''
                : ink
                  ? 'bg-white/[0.08] text-neutral-300'
                  : 'bg-white text-neutral-600 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]',
            )}
            style={i === 0 ? { backgroundColor: accent(ink), color: ink ? '#000' : '#fff' } : undefined}
          >
            {i + 1}
          </span>
          <span className={cn('text-[12px]', i === 0 ? strong(ink) : soft(ink))}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function ArtAvatars({ ink }: { ink: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex -space-x-2.5">
        <span className={cn('size-10 rounded-full', ink ? 'bg-white/[0.25] ring-2 ring-[#0e0e0e]' : 'bg-neutral-300 ring-2 ring-[#fafaf9]')} />
        <span className="size-10 rounded-full ring-2" style={{ backgroundColor: accent(ink), ['--tw-ring-color' as never]: ink ? '#0e0e0e' : '#fafaf9' }} />
      </div>
      <MiniCard ink={ink} className="flex items-center gap-2 rounded-full px-3.5 py-2">
        <span className={cn('h-1.5 w-20 rounded-full', hair(ink))} />
        <span className={cn('h-1.5 w-8 rounded-full', hair(ink))} />
      </MiniCard>
    </div>
  );
}

/* ------------------------------------------------------------------ map */

const COVERS: Record<string, { tone: Tone; art: (ink: boolean) => React.ReactNode }> = {
  /* Design systems */
  'scalable-design-system': { tone: 'ink', art: (i) => <ArtLayers ink={i} /> },
  'design-tokens-single-source': { tone: 'paper', art: (i) => <ArtTokens ink={i} /> },
  'design-systems-engineers-love': { tone: 'ink', art: (i) => <ArtFrameToCode ink={i} /> },
  'storybook-design-systems': { tone: 'paper', art: (i) => <ArtSidebarCanvas ink={i} /> },
  'component-api-design': { tone: 'ink', art: (i) => <ArtSizes ink={i} /> },
  'building-production-component-library': { tone: 'paper', art: (i) => <ArtLayers ink={i} /> },
  'shadcn-customization-guide': { tone: 'ink', art: (i) => <ArtTokens ink={i} /> },
  'spectrum-ui-development-speed': { tone: 'paper', art: (i) => <ArtTerminal ink={i} line="npx shadcn add tilted-card" /> },

  /* Interface craft */
  'typography-for-developers': { tone: 'paper', art: (i) => <ArtSpecimen ink={i} /> },
  'spacing-systems-ui': { tone: 'ink', art: (i) => <ArtRuler ink={i} /> },
  'color-systems-web-apps': { tone: 'paper', art: (i) => <ArtRamp ink={i} /> },
  'dark-mode-done-right': { tone: 'ink', art: () => <ArtToggle /> },
  'forms-that-dont-suck': { tone: 'paper', art: (i) => <ArtField ink={i} /> },
  'common-ui-ux-mistakes': { tone: 'ink', art: (i) => <ArtMisaligned ink={i} /> },
  'psychology-of-ui': {
    tone: 'paper',
    art: (i) => <ArtQuote ink={i} text={<>Users don&rsquo;t read interfaces. They feel them.</>} />,
  },
  'micro-interactions-guide': { tone: 'ink', art: (i) => <ArtTap ink={i} /> },
  'motion-design-for-engineers': { tone: 'ink', art: (i) => <ArtCurve ink={i} /> },

  /* CSS & layout */
  'css-grid-layouts': { tone: 'ink', art: (i) => <ArtGrid ink={i} /> },
  'responsive-design-modern-css': { tone: 'paper', art: (i) => <ArtViewports ink={i} /> },
  'tailwind-tips-tricks': { tone: 'paper', art: (i) => <ArtChips ink={i} /> },
  'tailwind-css-v4-migration-guide': { tone: 'ink', art: (i) => <ArtBadge ink={i} label="v4" /> },
  'view-transitions-api-guide': { tone: 'paper', art: (i) => <ArtCrossfade ink={i} /> },

  /* React & performance */
  'nextjs-server-components-guide': { tone: 'ink', art: (i) => <ArtBoxesFlow ink={i} from="server" to="client" /> },
  'react-19-server-actions-guide': { tone: 'paper', art: (i) => <ArtBoxesFlow ink={i} from="form" to="action" /> },
  'performance-ui-engineering': { tone: 'ink', art: (i) => <ArtGauge ink={i} /> },
  'accessibility-day-one': { tone: 'paper', art: (i) => <ArtFocus ink={i} /> },

  /* Workflow & career */
  'design-engineer-playbook': { tone: 'paper', art: (i) => <ArtSteps ink={i} /> },
  'figma-to-functional-workflow': { tone: 'ink', art: (i) => <ArtFrameToCode ink={i} /> },
  'art-of-prototyping': { tone: 'paper', art: (i) => <ArtFrameToCode ink={i} dashed /> },
  'design-handoff-checklist': { tone: 'ink', art: (i) => <ArtChecks ink={i} done={2} /> },
  'collaboration-patterns-design-engineering': { tone: 'paper', art: (i) => <ArtAvatars ink={i} /> },
  'design-engineer-tools-2026': { tone: 'ink', art: (i) => <ArtCommand ink={i} /> },
  'design-engineer-interview-prep': { tone: 'paper', art: (i) => <ArtChecks ink={i} done={3} /> },
  'ai-powered-ui-development': { tone: 'ink', art: (i) => <ArtPrompt ink={i} /> },
  'future-of-design-engineering': {
    tone: 'paper',
    art: (i) => <ArtQuote ink={i} text={<>The craft isn&rsquo;t going away. The busywork is.</>} />,
  },
};

/* -------------------------------------------------------------- wrapper */

/**
 * Fixed-tone cover tile. Fills its parent (give the parent an aspect ratio
 * and rounding). Falls back to a serif monogram for unmapped slugs.
 */
export function PostCover({ slug, title, className }: { slug: string; title?: string; className?: string }) {
  const cover = COVERS[slug];
  const tone: Tone = cover?.tone ?? 'paper';
  const ink = tone === 'ink';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        ink ? 'bg-[#0e0e0e]' : 'bg-[#fafaf9]',
        className,
      )}
    >
      {cover ? (
        cover.art(ink)
      ) : (
        <span className={cn('font-spectral text-[64px] font-light', strong(ink))}>
          {(title ?? slug).charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
