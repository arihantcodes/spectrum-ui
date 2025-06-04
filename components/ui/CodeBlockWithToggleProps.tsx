"use client";

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Check, Clipboard, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockWithToggleProps {
  htmlCode: string;
  fileName?: string;
}

export default function CodeBlockWithToggle({
  htmlCode,
  fileName,
}: CodeBlockWithToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // Strip HTML tags to get plain text
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlCode;
    const textToCopy = tempElement.textContent || tempElement.innerText || "";

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn(
        "relative mt-3 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all",
        isExpanded ? " overflow-y-auto" : "h-52 overflow-y-auto"
      )}
    >
      {fileName && (
        <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {fileName}
          </span>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-neutral-50 dark:bg-neutral-900 overflow-x-auto p-4"
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      />
    </div>
  );
}
