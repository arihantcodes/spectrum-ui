"use client";
import { useState, useEffect } from "react";
import { type Highlighter, createHighlighter } from "shiki";
import { useTheme } from "next-themes";
import { Button } from "@/components/UI/Button";
import { Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeHighlightProps {
  code?: string;
  inTab?: boolean;
  withExpand?: boolean;
  title?: string;
  lang?: string;
}

const CodeHighlight = ({
  code = "",
  inTab = false,
  withExpand = false,
  lang = "tsx",
  title = "",
}: CodeHighlightProps) => {
  const [copied, setCopied] = useState(false);
  const [expand, setExpanded] = useState(!withExpand);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const { theme, resolvedTheme } = useTheme();

  // Determine which theme to use based on current theme
  const getShikiTheme = () => {
    const currentTheme = resolvedTheme || theme;
    return currentTheme === "dark" ? "vesper" : "min-light";
  };

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["vesper", "min-light"],
        langs: ["typescript", "tsx", "javascript", "jsx", "shell", "bash"],
      });
      setHighlighter(highlighter);
    };

    loadHighlighter();
  }, []);

  useEffect(() => {
    if (highlighter && code) {
      try {
        // Map common language aliases
        const languageMap: Record<string, string> = {
          tsx: "tsx",
          jsx: "jsx",
          js: "javascript",
          ts: "typescript",
          shell: "bash",
        };

        const mappedLang = languageMap[lang] || lang;
        const shikiTheme = getShikiTheme();

        const html = highlighter.codeToHtml(code, {
          lang: mappedLang,
          theme: shikiTheme,
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain text if language not supported
        setHighlightedCode(`<pre>${code}</pre>`);
      }
    }
  }, [highlighter, code, lang, theme, resolvedTheme]); // Add theme dependencies

  return (
    <div className="relative mt- rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all">
      <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {title || ""}
        </span>
        <div className="flex items-center space-x-3">
          <Button
            className={cn(
              " h-8 w-8 z-10",
              "bg-background/80 hover:bg-background/90 border border-border",
              (inTab || lang === "shell") && "right-3 top-3"
            )}
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(code || "");
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Clipboard className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "max-h-[130px]  overflow-hidden rounded-md ",
          expand && "max-h-[400px] overflow-auto"
        )}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn(
              "shiki-container bg-neutral-100 dark:bg-neutral-900",
              lang
            )}
          />
        ) : (
          <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900text-muted-foreground rounded-md">
            <pre className="">{code}</pre>
          </div>
        )}
      </div>
      <div
        className={cn(
          "absolute bottom-2 flex w-full items-center justify-center transition-opacity duration-300",
          inTab && "bottom-0",
          !withExpand && "hidden"
        )}
      >
        <Button
          variant="outline"
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
        >
          {expand ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
};

export default CodeHighlight;
