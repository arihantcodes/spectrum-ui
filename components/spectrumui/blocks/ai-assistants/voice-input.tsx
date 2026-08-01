'use client';

import { useEffect, useState } from 'react';
import { Check, Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-eq { 0%, 100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }
`;

const BAR_COUNT = 18;
const BAR_SEED = Array.from({ length: BAR_COUNT }, (_, i) => ({
  delay: (i * 67) % 480,
  duration: 640 + ((i * 131) % 420),
  height: 8 + ((i * 53) % 12),
}));

export type VoiceInputState = 'idle' | 'recording' | 'processing';

export interface VoiceInputProps {
  state?: VoiceInputState;
  onStart?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

function useRecordingClock(active: boolean) {
  const [ds, setDs] = useState(0);
  useEffect(() => {
    if (!active) {
      setDs(0);
      return;
    }
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, [active]);
  const total = ds / 10;
  return `0:${String(Math.floor(total)).padStart(2, '0')}`;
}

export function VoiceInput({
  state: stateProp,
  onStart,
  onConfirm,
  onCancel,
  className,
}: VoiceInputProps) {
  const [stateState, setStateState] = useState<VoiceInputState>('idle');
  const state = stateProp !== undefined ? stateProp : stateState;
  const clock = useRecordingClock(state === 'recording');

  function start() {
    setStateState('recording');
    onStart?.();
  }
  function confirm() {
    setStateState('processing');
    onConfirm?.();
  }
  function cancel() {
    setStateState('idle');
    onCancel?.();
  }

  return (
    <div
      className={cn(
        'flex h-11 w-fit items-center gap-2 rounded-full border border-black/[0.08] bg-white py-1.5 pl-1.5 pr-2 shadow-xs dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {state === 'idle' && (
        <>
          <button
            type="button"
            aria-label="Start recording"
            onClick={start}
            className="grid size-8 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <Mic className="size-3.5" />
          </button>
          <span className="pr-1.5 text-[12.5px] text-neutral-400 dark:text-neutral-500">
            Tap to speak
          </span>
        </>
      )}

      {state === 'recording' && (
        <>
          <button
            type="button"
            aria-label="Cancel recording"
            onClick={cancel}
            className="grid size-8 shrink-0 place-items-center rounded-full text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
          >
            <X className="size-3.5" />
          </button>

          <span aria-hidden className="flex h-6 items-center gap-[2.5px] px-1">
            {BAR_SEED.map((bar, index) => (
              <span
                key={index}
                className="w-[2.5px] rounded-full bg-neutral-800 motion-reduce:!animate-none motion-reduce:!scale-y-50 dark:bg-neutral-200"
                style={{
                  height: bar.height,
                  animation: `su-eq ${bar.duration}ms ease-in-out ${bar.delay}ms infinite`,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </span>

          <span
            role="timer"
            aria-label={`Recording ${clock}`}
            className="font-mono text-[11.5px] tabular-nums text-neutral-500 dark:text-neutral-400"
          >
            {clock}
          </span>

          <button
            type="button"
            aria-label="Finish recording"
            onClick={confirm}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <Check className="size-3.5" />
          </button>
        </>
      )}

      {state === 'processing' && (
        <>
          <span aria-hidden className="flex h-8 items-center gap-[2.5px] px-2 opacity-50">
            {BAR_SEED.slice(0, 10).map((bar, index) => (
              <span
                key={index}
                className="w-[2.5px] scale-y-[0.35] rounded-full bg-neutral-800 dark:bg-neutral-200"
                style={{ height: bar.height }}
              />
            ))}
          </span>
          <span className="pr-1.5 text-[12.5px] text-neutral-400 dark:text-neutral-500" role="status">
            Transcribing…
          </span>
        </>
      )}
    </div>
  );
}

export default VoiceInput;
