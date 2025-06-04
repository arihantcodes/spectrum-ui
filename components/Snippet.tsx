"use client";

import React, { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import Copy from "./HandleCopy";

interface SnippetProps {
  text: string;
  width?: string;
}

export function Snippet({ text, width }: SnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card
      className={`flex items-center justify-between p-2 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[740px] ${
        width ? "max-w-none" : ""
      }`}
    >
      <code className="text-sm font-mono truncate flex-1 mr-2">{text}</code>
      <Copy content={text} />
    </Card>
  );
}
