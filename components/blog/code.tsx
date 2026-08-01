import { codeToHtml, type BundledLanguage } from 'shiki';
import Copy from '@/components/copy';

/**
 * Server-rendered code block. Shiki highlights at build time with both
 * themes baked into CSS variables (see `.blog-code` rules in globals.css),
 * so switching light/dark never re-highlights and nothing flashes.
 */
export async function Code({
  code,
  lang = 'tsx',
  filename,
}: {
  code: string;
  lang?: BundledLanguage;
  filename?: string;
}) {
  const trimmed = code.trim();
  const html = await codeToHtml(trimmed, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });

  return (
    <figure className="not-typeset blog-code group mt-7 overflow-hidden rounded-xl bg-black/2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:bg-white/3 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <figcaption className="flex h-10 items-center justify-between gap-3 border-b border-black/5 pl-4 pr-2 dark:border-white/6">
        <span className="truncate font-mono text-[12px] text-neutral-500 dark:text-neutral-400">
          {filename ?? lang}
        </span>
        <Copy content={trimmed} />
      </figcaption>
      <div
        className="font-mono text-[13px] leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
