"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  ChartNoAxesColumn,
  CircleHelp,
  CreditCard,
  FileText,
  MessagesSquare,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface NavListItem {
  icon?: React.ReactNode;
  label: string;
  href?: string;
}

export interface NavListCardProps {
  title?: string;
  items?: NavListItem[];
  className?: string;
}

export const PLANNING_NAV_ITEMS: NavListItem[] = [
  { icon: <FileText />, label: "Documents" },
  { icon: <CreditCard />, label: "Budget" },
  { icon: <ChartNoAxesColumn />, label: "Reports" },
];

export const SUPPORT_NAV_ITEMS: NavListItem[] = [
  { icon: <CircleHelp />, label: "Help Center" },
  { icon: <BookOpen />, label: "Docs" },
  { icon: <MessagesSquare />, label: "Contact Us" },
];

export function NavListCard({
  title = "Planning",
  items = PLANNING_NAV_ITEMS,
  className,
}: NavListCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-[16px] bg-white pb-2 pt-4",
        "shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]",
        "dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <p className="px-5 text-xs font-medium leading-4 text-foreground/70">
        {title}
      </p>
      <ul className="mt-2 space-y-1 px-2">
        {items.map((item) => {
          const inner = (
            <motion.span
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.3 }}
              className="flex h-8 items-center gap-2 rounded-full px-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {item.icon ? (
                <span className="flex shrink-0 text-foreground [&_svg]:h-4 [&_svg]:w-4">
                  {item.icon}
                </span>
              ) : null}
              <span className="truncate text-sm leading-5 text-foreground">
                {item.label}
              </span>
            </motion.span>
          );
          return (
            <li key={item.label}>
              {item.href ? (
                <a href={item.href} className="block">
                  {inner}
                </a>
              ) : (
                <button type="button" className="block w-full text-left">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
