'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconArrowUp, IconSparkle, FooterBar, type FooterSocial } from './footer-kit';

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
  socials?: FooterSocial[];
  brand: string;
  headline?: string;
  placeholder?: string;
  suggestions?: string[];
  /** Link columns under the ask surface. Without them this is a search box. */
  groups?: { title: string; links: { label: string; href: string }[] }[];
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
  socials,
  brand,
  headline = 'Ask the docs anything.',
  placeholder = 'How do I stream a completion?',
  suggestions = [],
  groups = [],
  answer,
  citations = [],
  chunk = 3,
  links,
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

      <div className="mx-auto w-full max-w-[1180px] px-6 py-14">
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
          className="group mx-auto mt-6 flex h-[52px] max-w-[580px] items-center gap-2 rounded-2xl border border-black/[0.1] bg-white pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-200 focus-within:border-black/[0.28] focus-within:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.12)] dark:border-white/[0.1] dark:bg-white/[0.03] dark:shadow-none dark:focus-within:border-white/[0.3]"
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
          <div className="mx-auto mt-5 max-w-[660px] animate-[su-ask-in_260ms_cubic-bezier(0.23,1,0.32,1)] rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-5 motion-reduce:animate-none dark:border-white/[0.09] dark:bg-white/[0.03]">
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

        {groups.length > 0 && (
          <nav
            aria-label="Footer"
            className="mt-12 grid gap-8 border-t border-black/[0.07] pt-9 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
          >
            {groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
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

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default AskDocsFooter;
