'use client';

import * as React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { TextStates } from '@/components/spectrumui/text-states';

type Phase = 'idle' | 'saving' | 'saved';
const LABEL: Record<Phase, string> = { idle: 'Save changes', saving: 'Saving…', saved: 'Saved' };

export default function TextStatesDemo() {
  const [phase, setPhase] = React.useState<Phase>('idle');

  const save = () => {
    if (phase !== 'idle') return;
    setPhase('saving');
    window.setTimeout(() => setPhase('saved'), 1400);
    window.setTimeout(() => setPhase('idle'), 3200);
  };

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <button
        type="button"
        onClick={save}
        className="inline-flex h-11 min-w-[168px] items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 text-[15px] font-medium text-white transition-[transform,background-color] hover:bg-neutral-800 active:scale-[0.97] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
      >
        {phase === 'saving' && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {phase === 'saved' && <Check className="size-4" aria-hidden />}
        <TextStates text={LABEL[phase]} />
      </button>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Click — the label exits up with blur and the next state enters from below.
      </p>
    </div>
  );
}
