"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { ArrowUp, MessageCircleDashed, Plus, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

import { useTypewriter } from "./use-typewriter";

export interface AIChatCardProps {
  title?: string;
  subtitle?: string;
  greeting?: string;
  prompt?: string;
  /** Prompts the composer types out on a loop. */
  prompts?: string[];
  /** Turn the prompt-typing animation off. */
  autoType?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  onSend?: (message: string) => void;
  onReset?: () => void;
  onAttach?: () => void;
  className?: string;
}

const DEFAULT_PROMPTS = [
  "I'm building a chat for our app and the scroll behavior is driving me nuts. Every…",
  "Add a pricing table with a monthly/annual toggle",
  "Make my hero section feel more premium",
  "Generate a changelog page from our GitHub releases",
];

export function AIChatCard({
  title = "New Chat",
  subtitle = "How can I help you today?",
  greeting = "Morning, Arihant!",
  prompt = "What are we working on today? Press send to start a new conversation",
  prompts = DEFAULT_PROMPTS,
  autoType = true,
  placeholder = "Ask anything…",
  icon,
  onSend,
  onReset,
  onAttach,
  className,
}: AIChatCardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const inView = useInView(rootRef, { margin: "-10% 0px" });

  const [userActive, setUserActive] = React.useState(false);
  const [userMessage, setUserMessage] = React.useState("");
  const [spins, setSpins] = React.useState(0);

  const { text: typedMessage, phase } = useTypewriter(prompts, {
    typeMs: 48,
    deleteMs: 14,
    holdMs: 3400,
    gapMs: 900,
    enabled: autoType && inView && !userActive,
  });

  const message = userActive || !autoType ? userMessage : typedMessage;

  const takeOver = () => {
    if (userActive || !autoType) return;
    setUserMessage(typedMessage);
    setUserActive(true);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "flex w-full flex-col rounded-[24px] bg-white",
        "shadow-[0_0_16.4px_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]",
        "dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 pb-4 pt-5">
        <div>
          <h3 className="text-[16px] font-medium leading-6 text-foreground">
            {title}
          </h3>
          <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <motion.button
          type="button"
          onClick={() => {
            setSpins((count) => count + 1);
            setUserActive(false);
            setUserMessage("");
            onReset?.();
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Reset conversation"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[18px] border border-border bg-white text-muted-foreground transition-colors hover:text-foreground dark:bg-neutral-950"
        >
          <motion.span
            animate={{ rotate: spins * 360 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
            className="flex"
          >
            <RefreshCw className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-neutral-100 dark:bg-neutral-900"
        >
          {icon ?? <MessageCircleDashed className="h-5 w-5 text-foreground" />}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-4 text-[18px] font-medium leading-7 tracking-[-0.45px] text-foreground"
        >
          {greeting}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-1.5 max-w-[190px] text-sm leading-[22.75px] text-muted-foreground"
        >
          {prompt}
        </motion.p>
      </div>

      {/* Composer */}
      <div className="px-5 pb-5">
        <div className="rounded-[18px] bg-neutral-200/50 p-3 transition-colors focus-within:bg-neutral-200/70 dark:bg-neutral-800/50 dark:focus-within:bg-neutral-800/70">
          {userActive || !autoType ? (
            <textarea
              ref={textareaRef}
              value={userMessage}
              onChange={(event) => setUserMessage(event.target.value)}
              placeholder={placeholder}
              rows={2}
              className="w-full resize-none bg-transparent text-sm leading-5 text-foreground outline-hidden placeholder:text-muted-foreground"
            />
          ) : (
            <div
              onClick={takeOver}
              className="min-h-10 w-full cursor-text text-left text-sm leading-5 text-foreground"
            >
              {message}
              <motion.span
                aria-hidden
                className="ml-px inline-block h-3.5 w-px bg-foreground align-middle"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.5, 0.5, 1],
                }}
              />
              {!message ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : null}
            </div>
          )}
          <div className="mt-2 flex items-center justify-between">
            <motion.button
              type="button"
              onClick={onAttach}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
              aria-label="Add files"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[18px] border border-border bg-white text-foreground dark:bg-neutral-950"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onSend?.(message)}
              whileHover={{
                scale: 1.08,
                transition: { type: "spring", bounce: 0.5, duration: 0.4 },
              }}
              whileTap={{
                scale: 0.88,
                transition: { type: "spring", bounce: 0.5, duration: 0.4 },
              }}
              animate={
                phase === "holding" && !userActive
                  ? { scale: [1, 1.14, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.35, 1] }}
              aria-label="Send message"
              className="group flex h-[30px] w-[30px] items-center justify-center rounded-[18px] bg-black text-white dark:bg-white dark:text-neutral-950"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
