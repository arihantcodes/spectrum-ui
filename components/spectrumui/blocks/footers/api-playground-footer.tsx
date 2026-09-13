'use client';

import { useEffect, useRef, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72123 18.1441C8.36923 18.1441 8.04323 17.9591 7.86223 17.6561C6.94423 16.1161 5.76323 14.7311 4.35423 13.5401C3.93223 13.1831 3.88023 12.5521 4.23623 12.1301C4.59323 11.7071 5.22323 11.6551 5.64523 12.0121C6.78923 12.9791 7.80023 14.0621 8.66223 15.2441C10.2992 12.5971 13.5172 8.40012 18.5642 5.95512C19.0612 5.71612 19.6592 5.92112 19.9002 6.41912C20.1402 6.91612 19.9332 7.51412 19.4362 7.75512C13.8602 10.4561 10.7022 15.5491 9.60423 17.6141C9.43423 17.9321 9.10623 18.1351 8.74523 18.1441H8.72123Z"
      />
    </svg>
  );
}

function IconCopy(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2103 6.10084C15.3756 6.10037 15.5105 5.96557 15.5002 5.80053C15.3768 3.81644 14.0223 2.5 12.0594 2.5H6.86943C4.79943 2.5 3.41943 3.95 3.41943 6.1V12.79C3.41943 14.7988 4.74678 16.2448 6.68923 16.3797C6.85451 16.3912 6.98943 16.2557 6.98943 16.09V11.21C6.98943 8.26 9.06943 6.11 11.9394 6.11L15.2103 6.10084Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1347 7.61328H11.9397C9.87871 7.61328 8.49371 9.05828 8.49371 11.2093V17.9043C8.49371 20.0543 9.87871 21.5003 11.9397 21.5003H17.1337C19.1957 21.5003 20.5807 20.0543 20.5807 17.9043V11.2093C20.5807 9.05828 19.1957 7.61328 17.1347 7.61328Z"
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-api-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type ApiPlaygroundFooterVariant = 'Curl' | 'Python';

export interface ApiEndpoint {
  id: string;
  label: string;
  path: string;
  curl: string;
  python: string;
  tokens: number;
}

export interface ApiPlaygroundFooterProps {
  brand: string;
  endpoints: ApiEndpoint[];
  baseUrl?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  copyright?: string;
  variant?: ApiPlaygroundFooterVariant;
  className?: string;
}

export function ApiPlaygroundFooter({
  brand,
  endpoints,
  baseUrl = 'https://api.cormorant.ai',
  groups = [],
  copyright,
  variant = 'Curl',
  className,
}: ApiPlaygroundFooterProps) {
  const [endpointId, setEndpointId] = useState(endpoints[0]?.id);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const endpoint = endpoints.find((entry) => entry.id === endpointId) ?? endpoints[0];
  const snippet = variant === 'Python' ? endpoint?.python : endpoint?.curl;

  async function copy() {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <footer
      className={cn('w-full border-t border-white/[0.07] bg-[#08080A] text-neutral-100', className)}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-1">
                {endpoints.map((entry) => {
                  const active = entry.id === endpointId;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setEndpointId(entry.id)}
                      className={cn(
                        'h-7 rounded-lg px-2.5 font-mono text-[11.5px] transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500',
                        active
                          ? 'bg-white/[0.09] text-neutral-100'
                          : 'text-neutral-400 hover:text-neutral-300',
                      )}
                    >
                      {entry.label}
                    </button>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-neutral-400">
                POST {baseUrl}
                <span className="text-neutral-400">{endpoint?.path}</span>
              </p>
            </div>

            <div className="relative mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? 'Snippet copied' : 'Copy snippet'}
                className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-neutral-200 active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
              >
                <span className="relative grid size-3.5 place-items-center">
                  <IconCheck
                    aria-hidden
                    className={cn(
                      'absolute size-3.5 text-emerald-400 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
                      copied ? 'scale-100 opacity-100 blur-0' : 'scale-[0.25] opacity-0 blur-[4px]',
                    )}
                  />
                  <IconCopy
                    aria-hidden
                    className={cn(
                      'size-3.5 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
                      copied ? 'scale-[0.25] opacity-0 blur-[4px]' : 'scale-100 opacity-100 blur-0',
                    )}
                  />
                </span>
              </button>

              <pre
                key={`${endpointId}-${variant}`}
                className="animate-[su-api-in_200ms_cubic-bezier(0.23,1,0.32,1)] overflow-x-auto p-4 pr-12 font-mono text-[11.5px] leading-[1.65] text-neutral-300 motion-reduce:animate-none"
              >
                <code>{snippet}</code>
              </pre>

              <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 font-mono text-[10.5px] tabular-nums text-neutral-400">
                <span>{variant === 'Python' ? 'python 3.11' : 'bash'}</span>
                <span>{endpoint?.tokens} input tokens</span>
              </div>
            </div>
          </div>

          <div className="self-start">
            <p className="text-[17px] font-semibold tracking-[-0.3px]">{brand}</p>
            <p className="mt-2 max-w-[34ch] text-pretty text-[13px] leading-[1.65] text-neutral-400">
              First call in under a minute. Keys are scoped per project and rotate without downtime.
            </p>

            {groups.length > 0 && (
              <nav aria-label="Footer" className="mt-6 grid gap-8 sm:grid-cols-2">
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
          </div>
        </div>

        <p className="mt-10 border-t border-white/[0.07] pt-6 text-[12px] tabular-nums text-neutral-400">
          {copyright ?? `© ${brand}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}

export default ApiPlaygroundFooter;
