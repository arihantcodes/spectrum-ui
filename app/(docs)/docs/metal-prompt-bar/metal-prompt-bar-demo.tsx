'use client';

import * as React from 'react';
import { MetalPromptBar } from '@/components/spectrumui/metal-prompt-bar';

export default function MetalPromptBarDemo() {
  const [sent, setSent] = React.useState<string[]>([]);

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-[560px]">
        <MetalPromptBar
          chips={['Agent', 'Auto', 'Tools']}
          onSubmit={(text) => setSent((list) => [text, ...list].slice(0, 3))}
        />
      </div>
      {sent.length > 0 ? (
        <ul className="w-full max-w-[560px] space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
          {sent.map((line, index) => (
            <li key={`${line}-${index}`} className="truncate">
              → {line}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Type and press Enter — in dark mode the chips reflect the send ring.
        </p>
      )}
    </div>
  );
}
