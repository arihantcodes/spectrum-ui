"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeHighlightProps {
  code?: string;
  inTab?: boolean;
  withExpand?: boolean;
  lang?: string;
  componentName?: string;
  packageManager?: string;
}

const InstallCommand = ({
  code = "",
  inTab = false,
  withExpand = false,
  lang = "tsx",
  componentName,
  packageManager,
}: CodeHighlightProps) => {
  const [copied, setCopied] = useState(false);
  const [expand, setExpanded] = useState(!withExpand);
  const [highlighter, setHighlighter] = useState<any | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const loadHighlighter = async () => {
      const { createHighlighter } = await import("shiki");
      const highlighter = await createHighlighter({
        themes: ["vesper", "min-light"],
        langs: ["typescript", "tsx", "javascript", "jsx", "shell", "bash"],
      });
      setHighlighter(highlighter);
    };

    loadHighlighter();
  }, []);

  useEffect(() => {
    const getShikiTheme = () => {
      const currentTheme = resolvedTheme || theme;
      return currentTheme === "dark" ? "vesper" : "min-light";
    };
    if (highlighter && code) {
      try {
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
        setHighlightedCode(`<pre>${code}</pre>`);
      }
    }
  }, [highlighter, code, lang, theme, resolvedTheme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
    // Fire PostHog event — before_send in provider filters out localhost
    posthog.capture("cli_command_copied", {
      command: code,
      ...(componentName && { component_name: componentName }),
      ...(packageManager && { package_manager: packageManager }),
    });
  };

  return (
    <div className="relative  rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all">
      <Button
        className={cn(
          "absolute h-8 w-8 z-10",
          "bg-background/80 hover:bg-background/90 border border-border",
          (inTab || lang === "shell") && "right-3 top-3",
        )}
        variant="ghost"
        size="icon"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Clipboard className="h-3 w-3" />
        )}
      </Button>

      <div
        className={cn(
          "max-h-[130px]  overflow-hidden rounded-md ",
          expand && "max-h-[400px] overflow-auto",
        )}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn(
              "shiki-container bg-neutral-100 dark:bg-neutral-900",
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
          "absolute bottom-2 flex w-full items-center justify-center transition-opacity duration-300",
          inTab && "bottom-0",
          !withExpand && "hidden",
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

export default InstallCommand;
