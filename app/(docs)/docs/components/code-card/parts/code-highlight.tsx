'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Check, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';
import { Copy1Icon, LockBoldIcon } from '@/app/(docs)/layout-parts/docs-icons';

interface CodeHighlightProps {
  code?: string;
  inTab?: boolean;
  withExpand?: boolean;
  title?: string;
  lang?: string;
  /**
   * Gate this block behind auth (default: true).
   * Pass requireAuth={false} for public blocks like install bash commands.
   */
  requireAuth?: boolean;
}

const CodeHighlight = ({
  code = '',
  inTab = false,
  withExpand = false,
  lang = 'tsx',
  title = '',
  requireAuth = true,
}: CodeHighlightProps) => {
  const [copied, setCopied] = useState(false);
  const [expand, setExpanded] = useState(!withExpand);
  const [highlighter, setHighlighter] = useState<any | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const { theme, resolvedTheme } = useTheme();
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const isLocked = requireAuth && !isAuthenticated;

  useEffect(() => {
    const loadHighlighter = async () => {
      const { createHighlighter } = await import('shiki');
      const h = await createHighlighter({
        themes: ['vesper', 'github-light'],
        langs: ['typescript', 'tsx', 'javascript', 'jsx', 'shell', 'bash', 'json'],
      });
      setHighlighter(h);
    };
    loadHighlighter();
  }, []);

  useEffect(() => {
    const getShikiTheme = () => {
      const currentTheme = resolvedTheme || theme;
      return currentTheme === 'dark' ? 'vesper' : 'github-light';
    };
    if (highlighter && code) {
      try {
        const languageMap: Record<string, string> = {
          tsx: 'tsx',
          jsx: 'jsx',
          js: 'javascript',
          ts: 'typescript',
          shell: 'bash',
          json: 'json',
        };
        const mappedLang = languageMap[lang] || lang;
        const html = highlighter.codeToHtml(code, {
          lang: mappedLang,
          theme: getShikiTheme(),
        });
        setHighlightedCode(html);
      } catch {
        setHighlightedCode(`<pre>${code}</pre>`);
      }
    }
  }, [highlighter, code, lang, theme, resolvedTheme]);

  const handleCopy = () => {
    if (isLocked) {
      trackEvent({ name: 'copy_code_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    trackEvent({ name: 'copy_code_clicked', properties: { authenticated: true } });
    navigator.clipboard.writeText(code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // ── Locked state: "Login to view code" panel ─────────────────────────────
  if (isLocked) {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-center overflow-hidden rounded-[14px] border border-black/[0.08] bg-white px-6 dark:border-white/10 dark:bg-[#101010]',
          // Match the preview panel height so switching tabs doesn't jump the page
          inTab ? 'min-h-[452px] pt-[109px]' : 'justify-center py-12',
        )}
      >
        <span className="flex size-[34px] items-center justify-center rounded-md border border-[#e5e5e5] dark:border-white/10">
          <LockBoldIcon className="text-black dark:text-white" />
        </span>
        <span className="mt-2 flex max-w-96 flex-col text-center text-sm leading-5">
          <span className="font-medium text-black dark:text-neutral-100">Login to view code</span>
          <span className="text-black/60 dark:text-neutral-400">
            Create a free account to access component source code
          </span>
        </span>
        <button
          type="button"
          id="code-lock-login-btn"
          onClick={() => {
            trackEvent({ name: 'view_code_clicked', properties: { authenticated: false } });
            openAuthModal();
          }}
          className="mt-7 h-7 rounded-full bg-neutral-900 px-10 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-[#0a0a0a] dark:hover:bg-neutral-100"
        >
          Login
        </button>
      </div>
    );
  }

  // ── Unlocked state: normal code block ───────────────────────────────────
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[14px] border border-black/[0.08] bg-white transition-all dark:border-white/10 dark:bg-[#101010]',
        // Match the preview panel height so switching tabs doesn't jump the page
        inTab && 'min-h-[452px]',
      )}
    >
      {/* Filename header (when a title is provided) */}
      {title && (
        <div className="flex h-[41px] items-center gap-2 border-b border-black/[0.05] px-4 dark:border-white/[0.06]">
          <FileCode2 className="size-4 shrink-0 text-[#686868] dark:text-neutral-400" />
          <span className="truncate font-mono text-[13px] text-[#686868] dark:text-neutral-400">
            {title}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code"
            className="ml-auto flex size-8 items-center justify-center rounded-[10px] opacity-70 transition hover:bg-black/[0.04] hover:opacity-100 dark:hover:bg-white/[0.06]"
          >
            {copied ? (
              <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy1Icon className="size-4 text-[#262626] dark:text-neutral-300" />
            )}
          </button>
        </div>
      )}

      {/* Floating copy button */}
      {!title && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute right-1.5 top-1.5 z-10 flex size-8 items-center justify-center rounded-[10px] bg-white/80 opacity-70 backdrop-blur transition hover:bg-black/[0.04] hover:opacity-100 dark:bg-neutral-900/80 dark:hover:bg-white/[0.06]"
        >
          {copied ? (
            <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy1Icon className="size-4 text-[#262626] dark:text-neutral-300" />
          )}
        </button>
      )}

      {/* Code */}
      <div
        className={cn(
          'max-h-[130px] overflow-hidden',
          expand && (inTab ? 'max-h-[450px] overflow-auto' : 'max-h-[400px] overflow-auto'),
        )}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn(
              '[&_pre]:!bg-white dark:[&_pre]:!bg-[#101010] [&_code]:font-normal [&_code]:font-mono [&_code]:text-[13px] [&_pre]:overflow-auto [&_pre]:p-4 [&_pre]:pr-12 [&_pre]:leading-[1.5]',
              lang,
            )}
          />
        ) : (
          <div className="bg-white px-4 py-4 font-mono text-[13px] text-muted-foreground dark:bg-[#101010]">
            <pre className="overflow-auto">{code}</pre>
          </div>
        )}
      </div>

      {/* Expand */}
      <div
        className={cn(
          'absolute bottom-2 flex w-full items-center justify-center transition-opacity duration-300',
          inTab && 'bottom-2',
          !withExpand && 'hidden',
        )}
      >
        <Button
          variant="outline"
          className="h-8 rounded-[10px] text-xs"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expand ? 'Collapse' : 'Expand'}
        </Button>
      </div>
    </div>
  );
};

export default CodeHighlight;
