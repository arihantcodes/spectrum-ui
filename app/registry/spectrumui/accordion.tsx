"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionVariant = "default" | "card" | "filled" | "ghost";
type AccordionIndicator = "chevron" | "plus" | "none";

const AccordionStyleContext = React.createContext<{
  variant: AccordionVariant;
  indicator: AccordionIndicator;
}>({ variant: "default", indicator: "chevron" });

const rootStyles: Record<AccordionVariant, string> = {
  default: "divide-y divide-black/[0.07] dark:divide-white/10",
  card: "space-y-3",
  filled: "space-y-2",
  ghost: "space-y-1",
};

const itemStyles: Record<AccordionVariant, string> = {
  default: "",
  card: "overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-colors data-[state=open]:border-black/[0.14] dark:border-white/10 dark:bg-white/[0.02] dark:data-[state=open]:border-white/20",
  filled:
    "overflow-hidden rounded-xl bg-black/[0.03] transition-colors data-[state=open]:bg-black/[0.05] dark:bg-white/[0.04] dark:data-[state=open]:bg-white/[0.07]",
  ghost: "",
};

const triggerStyles: Record<AccordionVariant, string> = {
  default:
    "gap-4 py-4 text-[15px] hover:text-black dark:hover:text-white [&[data-state=open]]:text-black dark:[&[data-state=open]]:text-white",
  card: "gap-4 px-5 py-4 text-[15px] hover:text-black dark:hover:text-white",
  filled:
    "gap-4 px-4 py-3.5 text-[15px] hover:text-black dark:hover:text-white",
  ghost:
    "gap-3 rounded-lg py-3 text-[15px] hover:text-black dark:hover:text-white",
};

const contentStyles: Record<AccordionVariant, string> = {
  default: "pb-5 pr-8",
  card: "px-5 pb-5 pr-10",
  filled: "px-4 pb-4 pr-10",
  ghost: "pb-4 pr-8",
};

const Accordion = ({
  className,
  variant = "default",
  indicator = "chevron",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
  indicator?: AccordionIndicator;
}) => (
  <AccordionStyleContext.Provider value={{ variant, indicator }}>
    <AccordionPrimitive.Root
      className={cn(rootStyles[variant], className)}
      {...props}
    />
  </AccordionStyleContext.Provider>
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionStyleContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(itemStyles[variant], className)}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const PlusIndicator = () => (
  <span
    aria-hidden="true"
    className="relative size-4 shrink-0 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
  >
    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full bg-current" />
    <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-out group-data-[state=open]:scale-y-0" />
  </span>
);

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { variant, indicator } = React.useContext(AccordionStyleContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between text-left font-medium text-neutral-700 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900/15 dark:text-neutral-200 dark:focus-visible:ring-white/25",
          triggerStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
        {indicator === "chevron" && (
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-neutral-400 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 dark:text-neutral-500"
            strokeWidth={2}
          />
        )}
        {indicator === "plus" && <PlusIndicator />}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionStyleContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm leading-relaxed text-neutral-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-neutral-400"
      {...props}
    >
      <div className={cn(contentStyles[variant], className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const usePrefersReducedMotion = () =>
  React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

const useIsOpen = (ref: React.RefObject<HTMLElement | null>) => {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const node = ref.current;
      if (!node) return () => {};
      const observer = new MutationObserver(onChange);
      observer.observe(node, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
      return () => observer.disconnect();
    },
    [ref],
  );
  const getSnapshot = React.useCallback(
    () => ref.current?.getAttribute("data-state") === "open",
    [ref],
  );
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
};

const StreamShell = ({
  text,
  label,
  icon,
  streaming,
  children,
}: {
  text: string;
  label: string;
  icon?: React.ReactNode;
  streaming?: boolean;
  children?: React.ReactNode;
}) => (
  <>
    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-500">
      {icon}
      <span>{label}</span>
      {streaming && (
        <span aria-hidden="true" className="flex items-center gap-0.5">
          <span className="size-1 animate-pulse rounded-full bg-current [animation-duration:1s]" />
          <span className="size-1 animate-pulse rounded-full bg-current [animation-delay:200ms] [animation-duration:1s]" />
          <span className="size-1 animate-pulse rounded-full bg-current [animation-delay:400ms] [animation-duration:1s]" />
        </span>
      )}
    </div>
    <div className="relative">
      <p aria-hidden="true" className="invisible whitespace-pre-wrap">
        {text}
        <span className="inline-block w-1" />
      </p>
      {children}
      <span className="sr-only">{text}</span>
    </div>
  </>
);

const StreamedAnswer = ({
  text,
  speed,
  startDelay,
  streamingLabel,
  doneLabel,
  icon,
}: {
  text: string;
  speed: number;
  startDelay: number;
  streamingLabel: string;
  doneLabel: string;
  icon?: React.ReactNode;
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = React.useState(
    reducedMotion ? text.length : 0,
  );
  const [thinking, setThinking] = React.useState(!reducedMotion);

  React.useEffect(() => {
    if (reducedMotion) return;

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const chunk = 1 + (index % 3);
      index = Math.min(text.length, index + chunk);
      setRevealed(index);
      if (index >= text.length) return;
      const pause = /[.,!?;:]\s?$/.test(text.slice(0, index)) ? 5 : 1;
      timer = setTimeout(tick, speed * chunk * pause);
    };

    timer = setTimeout(() => {
      setThinking(false);
      tick();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, speed, startDelay, reducedMotion]);

  const done = revealed >= text.length;

  return (
    <StreamShell
      text={text}
      icon={icon}
      label={done ? doneLabel : streamingLabel}
      streaming={!done}
    >
      <p aria-hidden="true" className="absolute inset-0 whitespace-pre-wrap">
        {thinking ? (
          <span className="inline-block h-[1em] w-24 animate-pulse rounded bg-current align-middle opacity-20 [animation-duration:1.2s]" />
        ) : (
          text.slice(0, revealed)
        )}
        {!done && !thinking && (
          <span className="ml-0.5 inline-block h-[0.95em] w-[3px] translate-y-[1px] animate-pulse rounded-full bg-neutral-900 align-middle [animation-duration:1s] dark:bg-neutral-100" />
        )}
      </p>
    </StreamShell>
  );
};

const AccordionStreamingContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  Omit<
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    "children"
  > & {
    text: string;
    speed?: number;
    startDelay?: number;
    streamingLabel?: string;
    doneLabel?: string;
    icon?: React.ReactNode;
  }
>(
  (
    {
      className,
      text,
      speed = 14,
      startDelay = 420,
      streamingLabel = "Generating",
      doneLabel = "Generated answer",
      icon,
      ...props
    },
    ref,
  ) => {
    const { variant } = React.useContext(AccordionStyleContext);
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const open = useIsOpen(contentRef);

    const assignRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <AccordionPrimitive.Content
        ref={assignRef}
        className="overflow-hidden text-sm leading-relaxed text-neutral-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-neutral-400"
        {...props}
      >
        <div className={cn(contentStyles[variant], className)}>
          {open ? (
            <StreamedAnswer
              text={text}
              speed={speed}
              startDelay={startDelay}
              streamingLabel={streamingLabel}
              doneLabel={doneLabel}
              icon={icon}
            />
          ) : (
            <StreamShell text={text} label={doneLabel} icon={icon} />
          )}
        </div>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionStreamingContent.displayName = "AccordionStreamingContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionStreamingContent,
};
