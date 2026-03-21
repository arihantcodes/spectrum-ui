'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeHighlightProps {
  code?: string;
  inTab?: boolean;
  withExpand?: boolean;
  title?: string;
  lang?: string;
}

const CodeHighlight = ({
  code = '',
  inTab = false,
  withExpand = false,
  lang = 'tsx',
  title = '',
}: CodeHighlightProps) => {
  const [copied, setCopied] = useState(false);
  const [expand, setExpanded] = useState(!withExpand);
  const [highlighter, setHighlighter] = useState<any | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const loadHighlighter = async () => {
      const { createHighlighter } = await import('shiki');
      const highlighter = await createHighlighter({
        themes: ['vesper', 'github-light'],
        langs: ['typescript', 'tsx', 'javascript', 'jsx', 'shell', 'bash'],
      });
      setHighlighter(highlighter);
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
        // Map common language aliases
        const languageMap: Record<string, string> = {
          tsx: 'tsx',
          jsx: 'jsx',
          js: 'javascript',
          ts: 'typescript',
          shell: 'bash',
        };

        const mappedLang = languageMap[lang] || lang;
        const shikiTheme = getShikiTheme();

        const html = highlighter.codeToHtml(code, {
          lang: mappedLang,
          theme: shikiTheme,
        });
        setHighlightedCode(html);
      } catch (error) {
        // Fallback to plain text if language not supported
        setHighlightedCode(`<pre>${code}</pre>`);
      }
    }
  }, [highlighter, code, lang, theme, resolvedTheme]); // Add theme dependencies

  return (
    <div className="relative  rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all">
      <div className="bg-gray-100 dark:bg-[#0A0A0A] rounded-lg px-4 py-2 flex items-center justify-between ">
        <span></span>
        <div className="flex items-center  space-x-3">
          <Button
            className={cn(
              ' h-8 w-8 z-10',
              'bg-background/80 hover:bg-background/90 border border-border',
              (inTab || lang === 'shell') && 'right-3 top-3',
            )}
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(code || '');
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'max-h-[130px]  overflow-hidden ',
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
            <pre className="">{code}</pre>
          </div>
        )}
      </div>
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
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
        >
          {expand ? 'Collapse' : 'Expand'}
        </Button>
      </div>
    </div>
  );
};

export default CodeHighlight;
