"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { cn } from "@/lib/utils";
import { Input } from "@/components/UI/Input";
interface CodePreviewProps {
  code: string;
  children: React.ReactNode;
  className?: string;
}

export function CodePreview({ code, children, className }: CodePreviewProps) {
  return (
    <div className={cn("not-prose my-8", className)}>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="preview" className="flex-1">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1">
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2">
          {children}
        </TabsContent>
        <TabsContent value="code" className="mt-2">
          <pre className="p-4 rounded-md overflow-x-auto border">
            <code className="text-sm text-blue-700 dark:text-green-400">
              {code}
            </code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
