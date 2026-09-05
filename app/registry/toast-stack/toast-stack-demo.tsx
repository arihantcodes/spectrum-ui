'use client';

import * as React from 'react';
import {
  AnimatedToastStack,
  useAnimatedToastStack,
} from '@/components/motion/animated-toast-stack';

function PillButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-black/10 px-3.5 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-black/4 active:scale-[0.97] dark:border-white/12 dark:text-neutral-200 dark:hover:bg-white/6"
    >
      {children}
    </button>
  );
}

export default function ToastStackDemo() {
  const { toasts, showToast, updateToast, dismissToast } = useAnimatedToastStack({ limit: 4 });

  const deploy = () => {
    const id = showToast({ status: 'loading', title: 'Deploying to production…', duration: 0 });
    window.setTimeout(() => {
      updateToast(id, {
        status: 'success',
        title: 'Deployed',
        description: 'spectrum-ui · 42s · 3 regions',
        duration: 4200,
        action: { label: 'Open', onClick: () => undefined },
      });
    }, 1800);
  };

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <PillButton onClick={deploy}>Deploy</PillButton>
        <PillButton
          onClick={() =>
            showToast({
              status: 'info',
              title: 'New comment',
              description: 'Ava replied on “Empty states”.',
            })
          }
        >
          Info
        </PillButton>
        <PillButton
          onClick={() =>
            showToast({
              status: 'error',
              title: 'Payment failed',
              description: 'Card declined. Try another method.',
              action: { label: 'Retry', onClick: () => undefined },
            })
          }
        >
          Error
        </PillButton>
        <PillButton onClick={() => showToast({ status: 'neutral', title: 'Copied to clipboard' })}>
          Neutral
        </PillButton>
      </div>
      <div className="relative flex min-h-[220px] w-full max-w-[480px] items-end justify-center">
        <AnimatedToastStack
          toasts={toasts}
          onDismiss={dismissToast}
          placement="static"
          position="bottom-center"
        />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Toasts stack, morph between statuses and swipe away.
      </p>
    </div>
  );
}
