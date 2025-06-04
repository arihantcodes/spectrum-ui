"use client";

import { Check, CheckCheck, Clipboard } from "lucide-react";
import { Button } from "./UI/Button";
import { useState } from "react";

export default function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      {isCopied ? (
        <Check className="w-3 h-3 " />
      ) : (
        <Clipboard className="w-3 h-3" />
      )}
    </Button>
  );
}
