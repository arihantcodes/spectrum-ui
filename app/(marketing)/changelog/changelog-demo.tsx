'use client';

import { LoadingState } from '@/components/spectrumui/blocks/ai-assistants/loading-state';
import { ThinkingDots } from '@/components/spectrumui/blocks/ai-assistants/thinking-dots';
import { VoiceInput } from '@/components/spectrumui/blocks/ai-assistants/voice-input';
import { CodeBlock } from '@/components/spectrumui/blocks/ai-assistants/code-block';
import type { ChangelogMediaKind } from '@/content/changelog';

const CARD_SNIPPET = `export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-semibold">{plan.price}</span>
        <span className="text-muted-foreground">/month</span>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start free trial</Button>
      </CardFooter>
    </Card>
  );
}`;

const CARET = `@keyframes su-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`;

/**
 * The large media panel inside a changelog entry — sized like the reference
 * changelogs' screenshots, except these run for real: live blocks, an
 * interactive voice recorder, a terminal with a blinking caret.
 */
export function ChangelogMedia({ media }: { media: ChangelogMediaKind }) {
  if (media.kind === 'terminal') {
    const tokens = media.command.split(' ');
    return (
      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-neutral-950 shadow-xs dark:border-white/[0.09] dark:bg-black">
        <style dangerouslySetInnerHTML={{ __html: CARET }} />
        <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
          {['#f9452d', '#febc2e', '#28c840'].map((color) => (
            <span key={color} aria-hidden className="size-2.5 rounded-full opacity-80" style={{ backgroundColor: color }} />
          ))}
          <span className="ml-2 font-mono text-[11px] text-neutral-500">spectrum-ui — zsh</span>
        </div>
        <div className="overflow-x-auto px-5 py-10 md:py-12">
          <code className="block whitespace-nowrap font-mono text-[13px] leading-relaxed md:text-[14px]">
            <span aria-hidden className="mr-2.5 select-none text-neutral-600">❯</span>
            {tokens.map((token, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? 'text-emerald-400'
                    : token.startsWith('@') || token.includes('@')
                      ? 'text-sky-400'
                      : 'text-neutral-300'
                }
              >
                {token}
                {index < tokens.length - 1 ? ' ' : ''}
              </span>
            ))}
            <span
              aria-hidden
              className="ml-1 inline-block h-[1.05em] w-[7px] translate-y-[0.15em] bg-neutral-400 motion-safe:animate-[su-caret_1s_steps(1,end)_infinite]"
            />
          </code>
        </div>
      </div>
    );
  }

  if (media.kind === 'codeblock') {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[20px] border border-black/[0.06] bg-[#F2F2F3] px-5 py-12 md:min-h-[480px] dark:border-white/[0.07] dark:bg-white/[0.035]">
        <CodeBlock
          code={CARD_SNIPPET}
          filename="pricing-card.tsx"
          collapsedLines={9}
          variant="Numbered"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-12 rounded-[20px] border border-black/[0.06] bg-[#F2F2F3] px-6 py-16 md:min-h-[520px] dark:border-white/[0.07] dark:bg-white/[0.035]">
      <LoadingState label="Shipping" />
      <ThinkingDots label="Portside is thinking" />
      <VoiceInput />
    </div>
  );
}
