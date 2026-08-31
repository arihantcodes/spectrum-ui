import {
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock5,
  ScanSearch,
  Send,
  TriangleAlert,
} from "lucide-react";
import React from "react";

const statuses = [
  {
    label: "Pending",
    icon: TriangleAlert,
    className:
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25",
  },
  {
    label: "Failed",
    icon: CircleX,
    className:
      "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-300/25",
  },
  {
    label: "Success",
    icon: CircleCheck,
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25",
  },
  {
    label: "In progress",
    icon: CircleDashed,
    className:
      "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-300/25",
    spin: true,
  },
  {
    label: "In review",
    icon: ScanSearch,
    className:
      "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-300/25",
  },
  {
    label: "Submitted",
    icon: Send,
    className:
      "bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-400/10 dark:text-indigo-300 dark:ring-indigo-300/25",
  },
  {
    label: "Expired",
    icon: Clock5,
    className:
      "bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-400/10 dark:text-neutral-300 dark:ring-neutral-300/20",
  },
];

const StatusDemo = () => {
  return (
    <div className="flex max-w-xl flex-wrap items-center justify-center gap-3">
      {statuses.map(({ label, icon: Icon, className, spin }) => (
        <span
          key={label}
          className={`inline-flex select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium leading-none ring-1 ring-inset ${className}`}
        >
          <Icon
            className={`size-3.5 shrink-0 ${spin ? "animate-spin [animation-duration:3s] motion-reduce:animate-none" : ""}`}
            strokeWidth={2.25}
            aria-hidden="true"
          />
          {label}
        </span>
      ))}
    </div>
  );
};

export default StatusDemo;
