'use client';

import { useEffect, useRef, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconArrowUp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(6, 3)"
        d="M6.36070466,10.1634443 L6.00660914,10.1649677 C4.53497338,10.1649677 3.19331742,10.0787869 2.31870755,9.94897032 L1.77483018,9.83524442 C1.48678171,9.77197246 1.15880301,9.68879165 0.991371397,9.60206543 C0.378924178,9.28461473 1.77635684e-15,8.66389498 1.77635684e-15,7.9995394 L1.77635684e-15,7.94172192 C0.0143198091,7.50863626 0.394345511,6.59882911 0.407563797,6.59882911 C1.02183092,5.13484685 2.87571834,2.31045764 4.19738844,1.00599741 L4.59418673,0.626928643 C4.70172939,0.527663907 4.82900679,0.41614041 4.92821737,0.346904886 C5.23444098,0.115634962 5.61336516,1.77635684e-15 5.99228933,1.77635684e-15 C6.41527446,1.77635684e-15 6.80851845,0.129816608 7.13016339,0.375268179 L7.55047018,0.764727545 L7.6401689,0.851989673 C8.9234441,2.03561169 11.0218469,5.12611968 11.6640352,6.74282736 L11.7575787,6.98691531 C11.8628603,7.28063902 11.988434,7.69217949 12,7.94172192 C12,8.25917262 11.9261979,8.56244167 11.7807968,8.85152907 C11.5770149,9.2126156 11.2553699,9.50061211 10.8764457,9.65988291 C10.6142831,9.76133623 9.82669359,9.92060702 9.81237378,9.92060702 C9.01825987,10.0666192 7.76518207,10.1512831 6.36070466,10.1634443 Z M5.99955939,18 C5.1612998,18 4.48165963,17.3269172 4.48165963,16.4967455 L4.80881219,12.7975176 C4.80881219,12.1462528 5.3419497,11.6182592 5.99955939,11.6182592 C6.65827061,11.6182592 7.19030659,12.1462528 7.19030659,12.7975176 L7.51745915,16.4967455 C7.51745915,17.3269172 6.83781898,18 5.99955939,18 Z"
      />
    </svg>
  );
}

function IconSparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(1.99962, 2.5001)"
        d="M15.9188758,11.82 C15.6598758,12.071 15.5408758,12.434 15.5998758,12.79 L16.4888758,17.71 C16.5638758,18.127 16.3878758,18.549 16.0388758,18.79 C15.6968758,19.04 15.2418758,19.07 14.8688758,18.87 L10.4398758,16.56 C10.2858758,16.478 10.1148758,16.434 9.93987581,16.429 L9.66887581,16.429 C9.57487581,16.443 9.48287581,16.473 9.39887581,16.519 L4.96887581,18.84 C4.74987581,18.95 4.50187581,18.989 4.25887581,18.95 C3.66687581,18.838 3.27187581,18.274 3.36887581,17.679 L4.25887581,12.759 C4.31787581,12.4 4.19887581,12.035 3.93987581,11.78 L0.32887581,8.28 C0.0268758104,7.987 -0.0781241896,7.547 0.0598758104,7.15 C0.19387581,6.754 0.53587581,6.465 0.94887581,6.4 L5.91887581,5.679 C6.29687581,5.64 6.62887581,5.41 6.79887581,5.07 L8.98887581,0.58 C9.04087581,0.48 9.10787581,0.388 9.18887581,0.31 L9.27887581,0.24 C9.32587581,0.188 9.37987581,0.145 9.43987581,0.11 L9.54887581,0.07 L9.71887581,5.32907052e-15 L10.1398758,5.32907052e-15 C10.5158758,0.039 10.8468758,0.264 11.0198758,0.6 L13.2388758,5.07 C13.3988758,5.397 13.7098758,5.624 14.0688758,5.679 L19.0388758,6.4 C19.4588758,6.46 19.8098758,6.75 19.9488758,7.15 C20.0798758,7.551 19.9668758,7.991 19.6588758,8.28 L15.9188758,11.82 Z"
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-ask-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes su-ask-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
@keyframes su-ask-dot { 0%, 100% { opacity: 0.25 } 50% { opacity: 1 } }
`;

export type AskDocsFooterVariant = 'Inline' | 'Expanded';

export interface AskCitation {
  index: number;
  title: string;
  href: string;
}

export interface AskDocsFooterProps {
  brand: string;
  headline?: string;
  placeholder?: string;
  suggestions?: string[];
  answer: string;
  citations?: AskCitation[];
  chunk?: number;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: AskDocsFooterVariant;
  className?: string;
}

type Phase = 'idle' | 'thinking' | 'streaming';

export function AskDocsFooter({
  brand,
  headline = 'Ask the docs anything.',
  placeholder = 'How do I stream a completion?',
  suggestions = [],
  answer,
  citations = [],
  chunk = 3,
  links = [],
  copyright,
  variant = 'Inline',
  className,
}: AskDocsFooterProps) {
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState('');
  const [phase, setPhase] = useState<Phase>(variant === 'Expanded' ? 'streaming' : 'idle');
  const [revealed, setRevealed] = useState(variant === 'Expanded' ? answer.length : 0);
  const inputRef = useRef<HTMLInputElement>(null);

  const complete = phase === 'streaming' && revealed >= answer.length;

  useEffect(() => {
    if (phase !== 'thinking') return;
    const timer = setTimeout(() => setPhase('streaming'), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'streaming' || revealed >= answer.length) return;
    const timer = setTimeout(() => setRevealed((current) => current + chunk), 16);
    return () => clearTimeout(timer);
  }, [answer.length, chunk, phase, revealed]);

  function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setAsked(trimmed);
    setQuestion('');
    setRevealed(0);
    setPhase('thinking');
  }

  const showPanel = phase !== 'idle';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[820px] px-6 py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:border-white/[0.1] dark:text-neutral-400">
            <IconSparkle className="size-3" />
            {brand} docs
          </span>
          <h2 className="mt-4 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.7px]">
            {headline}
          </h2>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(question);
          }}
          className="group mx-auto mt-6 flex h-12 max-w-[560px] items-center gap-2 rounded-2xl border border-black/[0.1] bg-white pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-200 focus-within:border-black/[0.28] focus-within:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.12)] dark:border-white/[0.1] dark:bg-white/[0.03] dark:shadow-none dark:focus-within:border-white/[0.3]"
        >
          <input
            ref={inputRef}
            value={question}
            placeholder={placeholder}
            aria-label="Ask the documentation"
            onChange={(event) => setQuestion(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden dark:text-neutral-100 dark:placeholder:text-neutral-600"
          />
          <button
            type="submit"
            aria-label="Ask"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white transition-[transform,opacity] duration-150 ease-out active:scale-[0.96] disabled:opacity-35 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
            disabled={!question.trim()}
          >
            <IconArrowUp className="size-4" />
          </button>
        </form>

        {suggestions.length > 0 && !showPanel && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="h-7 rounded-full border border-black/[0.08] px-3 text-[12px] text-neutral-500 transition-[color,border-color,scale] duration-150 ease-out hover:border-black/[0.18] hover:text-neutral-900 active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:text-neutral-400 dark:hover:border-white/[0.2] dark:hover:text-neutral-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {showPanel && (
          <div className="mx-auto mt-5 max-w-[640px] animate-[su-ask-in_260ms_cubic-bezier(0.23,1,0.32,1)] rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-5 motion-reduce:animate-none dark:border-white/[0.09] dark:bg-white/[0.03]">
            {asked && (
              <p className="text-[12.5px] font-medium text-neutral-500 dark:text-neutral-400">
                {asked}
              </p>
            )}

            {phase === 'thinking' ? (
              <p className="mt-2 flex items-center gap-1.5 text-[13.5px] text-neutral-500 dark:text-neutral-400">
                Searching the docs
                <span aria-hidden className="flex gap-[3px]">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1 rounded-full bg-current animate-[su-ask-dot_1.1s_ease-in-out_infinite] motion-reduce:animate-none"
                      style={{ animationDelay: `${dot * 160}ms` }}
                    />
                  ))}
                </span>
              </p>
            ) : (
              <p className="mt-2 text-pretty text-[14px] leading-[1.65] text-neutral-800 dark:text-neutral-200">
                {answer.slice(0, revealed)}
                {!complete && (
                  <span
                    aria-hidden
                    className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-[su-ask-caret_1s_steps(1,end)_infinite] bg-current motion-reduce:animate-none"
                  />
                )}
              </p>
            )}

            {complete && citations.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-4 dark:border-white/[0.07]">
                {citations.map((citation) => (
                  <li key={citation.index}>
                    <a
                      href={citation.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] text-neutral-600 transition-colors duration-150 hover:border-black/[0.18] hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      <span className="font-mono text-[10px] tabular-nums text-neutral-500 dark:text-neutral-400">
                        {citation.index}
                      </span>
                      {citation.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-black/[0.07] pt-6 text-[12px] text-neutral-500 dark:border-white/[0.08] sm:flex-row sm:justify-between">
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default AskDocsFooter;
