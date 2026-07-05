"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, CircleAlert, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import { usePrefersReducedMotion } from "./use-typewriter";

export interface AccountCredential {
  email: string;
  /** How many password dots get "typed" for this account. */
  passwordLength?: number;
}

export interface AccountAccessCardProps {
  title?: string;
  description?: string;
  emailLabel?: string;
  passwordLabel?: string;
  forgotLabel?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  dangerTitle?: string;
  dangerDescription?: string;
  /** Accounts the card cycles through, typing each one in. */
  credentials?: AccountCredential[];
  /** Turn the auto-fill animation off and show static values. */
  animated?: boolean;
  emailValue?: string;
  passwordValue?: string;
  onSubmit?: () => void;
  onForgot?: () => void;
  onDanger?: () => void;
  className?: string;
}

const DEFAULT_CREDENTIALS: AccountCredential[] = [
  { email: "alfa@spectrum.com", passwordLength: 14 },
  { email: "john.doe@gmail.com", passwordLength: 10 },
  { email: "emma@example.com", passwordLength: 16 },
];

type ActiveField = "email" | "password" | null;

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-px inline-block h-3.5 w-px shrink-0 bg-foreground align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

export function AccountAccessCard({
  title = "Account Access",
  description = "Update your credentials or re-authenticate.",
  emailLabel = "Email Address",
  passwordLabel = "Current Password",
  forgotLabel = "Forgot?",
  buttonLabel = "Update Security",
  buttonIcon,
  dangerTitle = "Danger Zone",
  dangerDescription = "Archive account and remove access",
  credentials = DEFAULT_CREDENTIALS,
  animated = true,
  emailValue = "alfa@spectrum.com",
  passwordValue = "••••••••••••••••••••••••",
  onSubmit,
  onForgot,
  onDanger,
  className,
}: AccountAccessCardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const play = animated && inView && !reduced && credentials.length > 0;

  const [email, setEmail] = React.useState(animated ? "" : emailValue);
  const [password, setPassword] = React.useState(animated ? "" : passwordValue);
  const [activeField, setActiveField] = React.useState<ActiveField>(null);

  React.useEffect(() => {
    if (!animated) {
      setEmail(emailValue);
      setPassword(passwordValue);
      setActiveField(null);
      return;
    }
    if (reduced) {
      setEmail(credentials[0]?.email ?? emailValue);
      setPassword("•".repeat(credentials[0]?.passwordLength ?? 14));
      setActiveField(null);
      return;
    }
    if (!play) return;

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    (async () => {
      await sleep(800);
      let index = 0;
      while (!cancelled) {
        const cred = credentials[index % credentials.length];
        const dots = cred.passwordLength ?? 14;

        setActiveField("email");
        for (let i = 1; i <= cred.email.length; i++) {
          if (cancelled) return;
          setEmail(cred.email.slice(0, i));
          await sleep(80 + Math.random() * 60);
        }
        await sleep(550);

        setActiveField("password");
        for (let i = 1; i <= dots; i++) {
          if (cancelled) return;
          setPassword("•".repeat(i));
          await sleep(85 + Math.random() * 45);
        }
        setActiveField(null);
        await sleep(3200);

        for (let i = dots - 1; i >= 0; i--) {
          if (cancelled) return;
          setPassword("•".repeat(i));
          await sleep(18);
        }
        for (let i = cred.email.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setEmail(cred.email.slice(0, i));
          await sleep(24);
        }
        await sleep(750);
        index++;
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, animated, reduced]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full rounded-[24px] bg-white p-5",
        "shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]",
        "dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <h3 className="text-[16px] font-medium leading-6 text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
        {description}
      </p>

      {/* Email */}
      <div className="mt-5">
        <label className="text-sm font-medium leading-[19.25px] text-foreground">
          {emailLabel}
        </label>
        <div
          className={cn(
            "mt-3 flex h-8 items-center rounded-[18px] bg-neutral-200/50 px-2.5 transition-all duration-300 dark:bg-neutral-800/50",
            activeField === "email" &&
              "bg-neutral-200/80 ring-1 ring-neutral-300 dark:bg-neutral-800/80 dark:ring-neutral-700",
          )}
        >
          <span className="flex min-w-0 items-center text-sm text-muted-foreground">
            <span className="truncate">{email}</span>
            {activeField === "email" ? <Caret /> : null}
          </span>
        </div>
      </div>

      {/* Password */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-[19.25px] text-foreground">
            {passwordLabel}
          </label>
          <motion.button
            type="button"
            onClick={onForgot}
            whileTap={{ scale: 0.94 }}
            className="text-xs font-medium uppercase leading-4 tracking-[0.6px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {forgotLabel}
          </motion.button>
        </div>
        <div
          className={cn(
            "mt-3 flex h-8 items-center rounded-[18px] bg-neutral-200/50 px-2.5 transition-all duration-300 dark:bg-neutral-800/50",
            activeField === "password" &&
              "bg-neutral-200/80 ring-1 ring-neutral-300 dark:bg-neutral-800/80 dark:ring-neutral-700",
          )}
        >
          <span className="flex min-w-0 items-center text-sm leading-none text-muted-foreground">
            <span className="truncate pt-0.5 tracking-[1px]">{password}</span>
            {activeField === "password" ? <Caret /> : null}
          </span>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="button"
        onClick={onSubmit}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        className="mt-[21px] flex h-[30px] w-full items-center justify-center gap-2 rounded-[18px] bg-black text-sm font-medium leading-5 text-[#eff6ff] transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
      >
        <motion.span
          variants={{
            hover: {
              rotate: [0, -12, 10, -6, 0],
              transition: { duration: 0.5 },
            },
          }}
          className="flex"
        >
          {buttonIcon ?? <Lock className="h-4 w-4" />}
        </motion.span>
        {buttonLabel}
      </motion.button>

      {/* Danger zone */}
      <motion.button
        type="button"
        onClick={onDanger}
        whileTap={{ scale: 0.985 }}
        className="group mt-[17px] flex min-h-[73px] w-full items-center gap-3.5 rounded-[18px] bg-neutral-100/50 p-4 text-left transition-colors hover:bg-neutral-100 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
      >
        <CircleAlert className="h-4 w-4 shrink-0 self-start text-red-500" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-[19.25px] text-foreground">
            {dangerTitle}
          </span>
          <span className="mt-1 block truncate text-sm leading-5 text-muted-foreground">
            {dangerDescription}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
      </motion.button>
    </div>
  );
}
