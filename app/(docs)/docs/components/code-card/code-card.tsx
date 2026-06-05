"use client";
import React from "react";
import posthog from "posthog-js";

import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import { cn } from "@/lib/utils";
import PackageManagerTabs from "@/components/packageMangers";
import { AppWindowMac, Command, FileCode } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeCardProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
  CLI?: string;
  componentName?: string;
}

const CodeCard = ({ children, code, className, CLI, componentName }: CodeCardProps) => {
  const handleTabChange = (tab: string) => {
    // Fire PostHog event when user switches between Preview / Code / CLI
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
          <TabsTrigger
            value="CLI"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
          >
            <Command
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            CLI
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="preview" className="rounded-md border mt-4">
        {children}
      </TabsContent>
      <TabsContent value="code" className="rounded-2xl mt-4">
        <CodeHighlight code={code} inTab />
      </TabsContent>
      <TabsContent value="CLI" className="mt-4">
        <PackageManagerTabs CLI={CLI || ""} componentName={componentName} />
      </TabsContent>
    </Tabs>
  );
};

export default CodeCard;
