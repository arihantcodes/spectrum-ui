'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Clipboard, Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';

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
        langs: ['typescript', 'tsx', 'javascript', 'jsx', 'shell', 'bash'],
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
          tsx: 'tsx', jsx: 'jsx', js: 'javascript',
          ts: 'typescript', shell: 'bash',
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

  // ── Locked state: clean inline panel ────────────────────────────────────
  if (isLocked) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {/* Toolbar stub */}
        <div className="bg-gray-100 dark:bg-[#0A0A0A] px-4 py-2 flex items-center justify-between">
          <span />
          <Button
            className="h-8 w-8 opacity-30 cursor-not-allowed"
            variant="ghost"
            size="icon"
            disabled
            aria-label="Sign in to copy"
          >
            <Clipboard className="h-3 w-3" />
          </Button>
        </div>

        {/* Lock panel */}
        <div className="flex flex-col items-center justify-center gap-4 py-10 px-6 bg-neutral-50 dark:bg-[#101010]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border">
            <Lock className="h-4 w-4 text-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Login to view code</p>
            <p className="text-xs text-muted-foreground mt-1">
              Create a free account to access component source code
            </p>
          </div>
          <Button
            id="code-lock-login-btn"
            size="sm"
            onClick={() => {
              trackEvent({ name: 'view_code_clicked', properties: { authenticated: false } });
              openAuthModal();
            }}
            className="h-9 px-5 font-medium"
          >
            Login to view code
          </Button>
        </div>
      </div>
    );
  }

  // ── Unlocked state: normal code block ───────────────────────────────────
  return (
    <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all">
      {/* Toolbar */}
      <div className="bg-gray-100 dark:bg-[#0A0A0A] rounded-lg px-4 py-2 flex items-center justify-between">
        <span />
        <div className="flex items-center space-x-3">
          <Button
            className={cn(
              'h-8 w-8 z-10',
              'bg-background/80 hover:bg-background/90 border border-border',
              (inTab || lang === 'shell') && 'right-3 top-3',
            )}
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Code */}
      <div
        className={cn(
          'max-h-[130px] overflow-hidden',
          expand && 'max-h-[400px] overflow-auto',
        )}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn(
              '[&_pre]:!bg-[#ffffff] dark:[&_pre]:!bg-[#101010] [&_code]:font-normal [&_code]:font-mono [&_code]:text-[14px] [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:leading-relaxed',
              lang,
            )}
          />
        ) : (
          <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900 text-muted-foreground rounded-md">
            <pre>{code}</pre>
          </div>
        )}
      </div>

      {/* Expand */}
      <div
        className={cn(
          'absolute bottom-2 flex w-full items-center justify-center transition-opacity duration-300',
          inTab && 'bottom-0',
          !withExpand && 'hidden',
        )}
      >
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expand ? 'Collapse' : 'Expand'}
        </Button>
      </div>
    </div>
  );
};

export default CodeHighlight;
