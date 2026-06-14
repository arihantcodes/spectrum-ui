"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { Clipboard, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { trackEvent } from "@/lib/events";

interface CodeHighlightProps {
  code?: string;
  inTab?: boolean;
  withExpand?: boolean;
  lang?: string;
  componentName?: string;
  packageManager?: string;
  /**
   * Gate this block behind auth (default: true).
   * Pass requireAuth={false} for public CLI blocks.
   */
  requireAuth?: boolean;
}

const InstallCommand = ({
  code = "",
  inTab = false,
  withExpand = false,
  lang = "tsx",
  componentName,
  packageManager,
  requireAuth = true,
}: CodeHighlightProps) => {
  const [copied, setCopied] = useState(false);
  const [expand, setExpanded] = useState(!withExpand);
  const [highlighter, setHighlighter] = useState<any | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const { theme, resolvedTheme } = useTheme();
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const isLocked = requireAuth && !isAuthenticated;

  useEffect(() => {
    const loadHighlighter = async () => {
      const { createHighlighter } = await import("shiki");
      const h = await createHighlighter({
        themes: ["vesper", "min-light"],
        langs: ["typescript", "tsx", "javascript", "jsx", "shell", "bash"],
      });
      setHighlighter(h);
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
          tsx: "tsx", jsx: "jsx", js: "javascript",
          ts: "typescript", shell: "bash",
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
      trackEvent({ name: "copy_cli_clicked", properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    trackEvent({ name: "copy_cli_clicked", properties: { authenticated: true } });
    posthog.capture("cli_command_copied", {
      command: code,
      ...(componentName && { component_name: componentName }),
      ...(packageManager && { package_manager: packageManager }),
    });
  };

  // ── Locked state: clean inline panel ────────────────────────────────────
  if (isLocked) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      

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

  // ── Unlocked state: normal CLI block ────────────────────────────────────
  return (
    <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all">
      <Button
        className={cn(
          "absolute h-8 w-8 z-10",
          "bg-background/80 hover:bg-background/90 border border-border",
          (inTab || lang === "shell") && "right-3 top-3",
        )}
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label="Copy CLI command"
      >
        {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-3 w-3" />}
      </Button>

      <div
        className={cn(
          "max-h-[130px] overflow-hidden rounded-md",
          expand && "max-h-[400px] overflow-auto",
        )}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn("shiki-container bg-neutral-100 dark:bg-neutral-900", lang)}
          />
        ) : (
          <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900 text-muted-foreground rounded-md">
            <pre>{code}</pre>
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
        <Button variant="outline" onClick={() => setExpanded((prev) => !prev)}>
          {expand ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
};

export default InstallCommand;
