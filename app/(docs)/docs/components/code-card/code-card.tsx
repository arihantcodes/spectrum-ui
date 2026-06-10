"use client";
import React from "react";
import posthog from "posthog-js";

import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import InstallCommand from "@/app/(docs)/docs/components/code-card/parts/installcommand";
import { cn } from "@/lib/utils";
import PackageManagerTabs from "@/components/packageMangers";
import { AppWindowMac, Command, FileCode, PackageOpen } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeCardProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
  CLI?: string;
  componentName?: string;
  /** Bash install command shown in the Installation tab, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Full source of the component file shown in the Installation tab */
  installCode?: string;
}

const CodeCard = ({
  children,
  code,
  className,
  CLI,
  componentName,
  installScript,
  installCode,
}: CodeCardProps) => {
  const hasInstallTab = !!(installScript || installCode);

  const handleTabChange = (tab: string) => {
    posthog.capture("tab_switched", {
      tab,
      ...(componentName && { component_name: componentName }),
    });
  };

  return (
    <Tabs
      defaultValue="preview"
      className={cn(className)}
      onValueChange={handleTabChange}
    >
      <ScrollArea>
        <TabsList className="mb-3 gap-6 bg-transparent">
          {/* Preview */}
          <TabsTrigger
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            value="preview"
          >
            <AppWindowMac
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Preview
          </TabsTrigger>

          {/* Code */}
          <TabsTrigger
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            value="code"
          >
            <FileCode
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Code
          </TabsTrigger>

          {/* CLI */}
          <TabsTrigger
            value="CLI"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
          >
            <Command
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            CLI <span className="text-[12px] font-normal text-muted-foreground/70 ml-1">(one command installation)</span>
          </TabsTrigger>

          {/* Installation — only shown when installScript or installCode are provided */}
          {hasInstallTab && (
            <TabsTrigger
              value="installation"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            >
              <PackageOpen
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Installation
            </TabsTrigger>
          )}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ── Preview ─────────────────────────────────────────── */}
      <TabsContent value="preview" className="rounded-md border mt-4">
        {children}
      </TabsContent>

      {/* ── Code (demo file) ────────────────────────────────── */}
      <TabsContent value="code" className="rounded-2xl mt-4">
        <CodeHighlight code={code} inTab requireAuth />
      </TabsContent>

      {/* ── CLI (spectrum-ui install) ────────────────────────── */}
      <TabsContent value="CLI" className="mt-4">
        <PackageManagerTabs CLI={CLI || ""} componentName={componentName} />
      </TabsContent>

      {/* ── Installation (bash + component source) ──────────── */}
      {hasInstallTab && (
        <TabsContent value="installation" className="mt-4 flex flex-col gap-4">
          {/* Step 1 — bash install command */}
          {installScript && (
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-muted-foreground px-1">
                1. Install dependencies
              </p>
              <InstallCommand
                code={installScript}
                lang="bash"
                inTab
                requireAuth
              />
            </div>
          )}

          {/* Step 2 — component source code */}
          {installCode && (
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-muted-foreground px-1">
                {installScript ? "2." : "1."} Copy the component
              </p>
              <CodeHighlight
                code={installCode}
                inTab
                withExpand
                requireAuth
              />
            </div>
          )}
        </TabsContent>
      )}
    </Tabs>
  );
};

export default CodeCard;
