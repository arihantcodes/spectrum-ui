"use client";

import { Check, Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuthGate } from "@/hooks/use-auth-gate";

export default function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();

  async function handleCopy() {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy} aria-label={isAuthenticated ? "Copy code" : "Sign in to copy code"}>
      {isCopied ? (
        <Check className="w-3 h-3" />
      ) : (
        <Clipboard className="w-3 h-3" />
      )}
    </Button>
  );
}
