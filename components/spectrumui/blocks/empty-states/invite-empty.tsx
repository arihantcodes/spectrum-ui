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
  SPRING_SNAPPY,
  usePropState,
} from './empty-state-kit';

export type InviteEmptyVariant = 'Invite' | 'Link' | 'Sent';

export interface InviteSeat {
  name: string;
  src: string;
}

export interface InviteCandidate extends InviteSeat {
  id: string;
  /** Why this person is suggested — an org, a shared project, a past repo. */
  detail: string;
}

export interface InviteEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  owner?: InviteSeat;
  /**
   * People the reader already works with, shown as faces rather than as dashed
   * holes. An empty team screen that offers only placeholders asks them to
   * remember an address; this asks them to recognise someone, which is the
   * easier of the two by a long way.
   */
  candidates?: InviteCandidate[];
  inviteLink?: string;
  placeholder?: string;
  sendLabel?: string;
  onInvite?: (value: string) => void;
  variant?: InviteEmptyVariant;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const OWNER: InviteSeat = { name: 'You', src: '/avatars/people/03.jpg' };

const CANDIDATES: InviteCandidate[] = [
  { id: 'dana', name: 'Dana Whitlock', detail: 'Same org', src: '/avatars/people/07.jpg' },
  { id: 'marco', name: 'Marco Bellini', detail: 'Same org', src: '/avatars/people/11.jpg' },
  { id: 'iris', name: 'Iris Adeyemi', detail: 'Shared a project', src: '/avatars/people/05.jpg' },
  { id: 'theo', name: 'Theo Lindqvist', detail: 'Shared a project', src: '/avatars/people/09.jpg' },
];

/**
 * Half speed, deliberately.
 *
 * Five faces arriving on the usual entrance spring read as a flicker — you
 * register that something happened, not who. A softer spring over a longer
 * stagger lets each face land on its own, which is the only reason to show
 * faces instead of circles.
 */
const AVATAR_SPRING = { type: 'spring', stiffness: 150, damping: 22, mass: 1.1 } as const;
const AVATAR_STAGGER = 0.11;

export function InviteEmpty({
  panelTitle = 'Team',
  title = 'It is just you in here',
  description = 'Everything you build stays private until someone else can see it. Invite one of the people you already work with, or type any address.',
  owner = OWNER,
  candidates = CANDIDATES,
  inviteLink = 'spectrumhq.in/join/9K2-QT4',
  placeholder = 'teammate@company.com',
  sendLabel = 'Send invite',
  onInvite,
  variant = 'Invite',
  className,
}: InviteEmptyProps) {
  const [email, setEmail] = React.useState('');
  const [invited, setInvited] = usePropState<string[]>(
    variant === 'Sent' ? candidates.slice(0, 2).map((person) => person.id) : [],
    variant,
  );
  const [typed, setTyped] = usePropState<string[]>([], variant);
  const [error, setError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const inputId = React.useId();
  const reduced = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const sent = invited.length + typed.length;

  function toggle(person: InviteCandidate) {
    setInvited((current) =>
      current.includes(person.id)
        ? current.filter((id) => id !== person.id)
        : [...current, person.id],
    );
    if (!invited.includes(person.id)) onInvite?.(person.name);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(true);
      return;
    }
    setError(false);
    setTyped((current) => (current.includes(value) ? current : [...current, value]));
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

  return (
    <EmptyPanel
      title={panelTitle}
      meta={sent ? `${1 + sent} of 5 seats used` : '1 of 5 seats used'}
      className={className}
    >
      <EmptyState
        icon={<IconAddUser />}
        backdrop="rays"
        tone={sent ? 'positive' : 'neutral'}
        title={sent ? `${sent} invite${sent > 1 ? 's' : ''} on the way` : title}
        description={
          sent
            ? 'They land on this project as soon as they accept, not on an empty account.'
            : description
        }
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
            <span className="font-mono text-[12.5px] text-neutral-600 dark:text-neutral-400">
              {inviteLink} · expires in 7 days
            </span>
          ) : (
            <>Invites expire after 7 days. Roles can be changed any time.</>
          )
        }
      >
        <div className="flex w-full max-w-[430px] flex-col items-center gap-6">
          <ul className="flex items-end gap-3">
            <Seat
              index={0}
              reduced={Boolean(reduced)}
              src={owner.src}
              name={owner.name}
              caption="You"
              state="owner"
            />
            {candidates.map((person, index) => (
              <Seat
                key={person.id}
                index={index + 1}
                reduced={Boolean(reduced)}
                src={person.src}
                name={person.name}
                caption={invited.includes(person.id) ? 'Invited' : person.name.split(' ')[0]}
                hint={person.detail}
                state={invited.includes(person.id) ? 'invited' : 'candidate'}
                onClick={() => toggle(person)}
              />
            ))}
          </ul>

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
                    'h-9 min-w-0 flex-1 rounded-xl border-black/[0.1] bg-white text-[14px] shadow-none placeholder:text-neutral-400',
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
                      className="text-[12.5px] text-red-600 dark:text-red-400"
                    >
                      Enter an address like name@example.com
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                  {typed.map((address) => (
                    <motion.p
                      key={address}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING_SNAPPY}
                      className="truncate text-[12.5px] text-neutral-600 dark:text-neutral-400"
                    >
                      Invited {address}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            </form>
          )}
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}

function Seat({
  index,
  reduced,
  src,
  name,
  caption,
  hint,
  state,
  onClick,
}: {
  index: number;
  reduced: boolean;
  src: string;
  name: string;
  /** First name, or the state once they are invited. Anything longer truncates. */
  caption: string;
  hint?: string;
  state: 'owner' | 'candidate' | 'invited';
  onClick?: () => void;
}) {
  const interactive = state !== 'owner';
  const label = state === 'invited' ? `Cancel the invite to ${name}` : `Invite ${name}`;

  const photo = (
    <span className="relative block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={cn(
          'size-11 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10',
          'transition-[filter,opacity] duration-200 ease-out',
          state === 'candidate' &&
            'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0',
        )}
      />
      <AnimatePresence initial={false}>
        {state === 'invited' && (
          <motion.span
            key="tick"
            initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="absolute -bottom-0.5 -right-0.5 grid size-[18px] place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white [&_svg]:size-3 dark:ring-neutral-950"
          >
            <IconTickSquare />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );

  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={reduced ? { duration: 0.2 } : { ...AVATAR_SPRING, delay: index * AVATAR_STAGGER }}
      className="flex w-[62px] flex-col items-center gap-1.5"
    >
      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          aria-pressed={state === 'invited'}
          title={hint ? `${name} · ${hint}` : name}
          className={cn(
            'group cursor-pointer rounded-full transition-transform duration-150 ease-out',
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
            'dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950',
            /* Tailwind v4 gates `hover:` behind (hover: hover) already, so a tap
               never leaves a phone stuck in the lifted state. */
            'hover:-translate-y-0.5 active:scale-[0.96]',
          )}
        >
          {photo}
        </button>
      ) : (
        photo
      )}
      <span
        className={cn(
          'w-full truncate text-center text-[12px] leading-[1.3] tracking-[-0.002em]',
          state === 'invited'
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-neutral-600 dark:text-neutral-400',
        )}
      >
        {caption}
      </span>
    </motion.li>
  );
}
