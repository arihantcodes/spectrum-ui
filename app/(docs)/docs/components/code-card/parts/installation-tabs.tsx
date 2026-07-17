"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CommandFigure from "@/app/(docs)/docs/components/code-card/parts/command-figure";
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";

interface InstallationTabsProps {
  /** Registry slug, e.g. "@spectrumui/input" */
  cli?: string;
  /** Raw dependency install command, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Component source shown in the Manual tab */
  installCode?: string;
  /** Extra content rendered at the end of the Manual tab */
  installContent?: React.ReactNode;
  componentName?: string;
  className?: string;
}

/**
 * "Installation" section body — CLI | Manual pill tabs, per the docs redesign.
 * CLI shows a package-manager aware command figure; Manual shows the
 * dependency command plus the component source to copy.
 */
const InstallationTabs = ({
  cli,
  installScript,
  installCode,
  installContent,
  componentName,
  className,
}: InstallationTabsProps) => {
  const hasCli = !!cli || !!installScript;
  const hasManual = !!installCode || !!installContent;
  const [tab, setTab] = useState<"cli" | "manual">(hasCli ? "cli" : "manual");

  if (!hasCli && !hasManual) return null;

  return (
    <div className={cn(className)}>
      {hasCli && hasManual && (
        <div className="flex items-center" role="tablist" aria-label="Installation method">
          {(
            [
              { id: "cli", label: "CLI" },
              { id: "manual", label: "Manual" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "h-8 rounded-[10px] px-2.5 text-sm font-medium leading-5 transition-colors",
                tab === t.id
                  ? "bg-black/[0.04] text-[#262626] dark:bg-white/[0.08] dark:text-neutral-100"
                  : "text-[#686868]/70 hover:text-[#262626] dark:text-neutral-500 dark:hover:text-neutral-200",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {tab === "cli" && hasCli ? (
        <CommandFigure
          cli={cli}
          command={installScript}
          componentName={componentName}
          className="mt-2"
          requireAuth={!!cli}
        />
      ) : (
        <div className="mt-2 flex flex-col gap-4">
          {installScript && (
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[#686868] dark:text-neutral-400">
                Install the following dependencies
              </p>
              <CommandFigure
                command={installScript}
                componentName={componentName}
              />
            </div>
          )}
          {installCode && (
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[#686868] dark:text-neutral-400">
                Copy and paste the following code into your project
              </p>
              <CodeHighlight code={installCode} inTab withExpand requireAuth />
            </div>
          )}
          {installContent && <div>{installContent}</div>}
        </div>
      )}
    </div>
  );
};

export default InstallationTabs;
