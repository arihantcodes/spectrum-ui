'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconAddUser,
  IconSend,
  IconTickSquare,
  IconUsers,
  SPRING_ENTRANCE,
  SPRING_SNAPPY,
  VIEWPORT,
} from './empty-state-kit';

export type InviteEmptyVariant = 'Invite' | 'Link' | 'Sent';

export interface InviteSeat {
  name: string;
  src: string;
}

export interface InviteEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  owner?: InviteSeat;
  seats?: number;
  inviteLink?: string;
  placeholder?: string;
  sendLabel?: string;
  onInvite?: (email: string) => void;
  variant?: InviteEmptyVariant;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const OWNER: InviteSeat = { name: 'You', src: '/avatars/people/03.jpg' };

export function InviteEmpty({
  panelTitle = 'Team',
  title = 'It is just you in here',
  description = 'Everything you build stays private until someone else can see it. Invite a teammate and they land on this project, not on an empty account.',
  owner = OWNER,
  seats = 4,
  inviteLink = 'spectrumhq.in/join/9K2-QT4',
  placeholder = 'teammate@company.com',
  sendLabel = 'Send invite',
  onInvite,
  variant = 'Invite',
  className,
}: InviteEmptyProps) {
  const [email, setEmail] = React.useState('');
  const [pending, setPending] = React.useState<string[]>(
    variant === 'Sent' ? ['dana@northbend.io'] : [],
  );
  const [error, setError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const inputId = React.useId();
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(true);
      return;
    }
    setError(false);
    setPending((current) => (current.includes(value) ? current : [...current, value]));
    setEmail('');
    onInvite?.(value);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${inviteLink}`);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  const openSeats = Math.max(0, seats - pending.length);

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${1 + pending.length} of ${1 + seats} seats used`}
      className={className}
    >
      <EmptyState
        icon={<IconAddUser />}
        backdrop="rays"
        title={
          pending.length
            ? `${pending.length} invite${pending.length > 1 ? 's' : ''} on the way`
            : title
        }
        description={description}
        actions={
          variant === 'Link' ? (
            <>
              <EmptyAction icon={copied ? <IconTickSquare /> : <IconUsers />} onClick={copyLink}>
                {copied ? 'Link copied' : 'Copy invite link'}
              </EmptyAction>
              <EmptyAction emphasis="quiet">Manage roles</EmptyAction>
            </>
          ) : undefined
        }
        footnote={
          variant === 'Link' ? (
            <span className="font-mono text-[11.5px] text-neutral-400 dark:text-neutral-500">
              {inviteLink} · expires in 7 days
            </span>
          ) : (
            <>Invites expire after 7 days. Roles can be changed any time.</>
          )
        }
      >
        <div className="flex w-full max-w-[420px] flex-col items-center gap-5">
          <div className="flex items-center -space-x-2">
            <motion.img
              src={owner.src}
              alt=""
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={SPRING_ENTRANCE}
              className="size-9 rounded-full object-cover ring-2 ring-white dark:ring-neutral-950"
            />
            <AnimatePresence initial={false} mode="popLayout">
              {pending.map((address) => (
                <motion.span
                  key={address}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={SPRING_SNAPPY}
                  title={address}
                  className="grid size-9 place-items-center rounded-full border border-dashed border-black/20 bg-white font-mono text-[11px] font-medium uppercase text-neutral-500 ring-2 ring-white dark:border-white/25 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-950"
                >
                  {address.slice(0, 2)}
                </motion.span>
              ))}
            </AnimatePresence>
            {Array.from({ length: openSeats }).map((_, index) => (
              <span
                key={index}
                aria-hidden
                className="size-9 rounded-full border border-dashed border-black/[0.14] bg-white ring-2 ring-white dark:border-white/[0.16] dark:bg-neutral-950 dark:ring-neutral-950"
              />
            ))}
          </div>

          {variant !== 'Link' && (
            <form onSubmit={submit} noValidate className="w-full">
              <label htmlFor={inputId} className="sr-only">
                Teammate email address
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  value={email}
                  placeholder={placeholder}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(false);
                  }}
                  aria-invalid={error}
                  className={cn(
                    'h-9 min-w-0 flex-1 rounded-xl border-black/[0.1] bg-white text-[13px] shadow-none placeholder:text-neutral-400',
                    'dark:border-white/[0.12] dark:bg-white/[0.04]',
                    error && 'border-red-500/60 dark:border-red-500/60',
                  )}
                />
                <EmptyAction type="submit" icon={<IconSend />} className="shrink-0">
                  {sendLabel}
                </EmptyAction>
              </div>
              <div className="min-h-[18px] pt-1.5 text-left">
                <AnimatePresence initial={false}>
                  {error && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING_SNAPPY}
                      className="text-[11.5px] text-red-600 dark:text-red-400"
                    >
                      That address is missing an @ or a domain.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          )}
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}
