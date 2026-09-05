"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TransferSummaryRow {
  label: string;
  value: string;
  emphasized?: boolean;
}

export interface TransferFundsCardProps {
  title?: string;
  description?: string;
  amountLabel?: string;
  currencySymbol?: string;
  amount?: string;
  fromLabel?: string;
  fromAccount?: string;
  toLabel?: string;
  toAccount?: string;
  summary?: TransferSummaryRow[];
  buttonLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_SUMMARY: TransferSummaryRow[] = [
  { label: "Estimated arrival", value: "Today, Apr 14" },
  { label: "Transaction fee", value: "$0.00" },
  { label: "Total amount", value: "$1,200.00", emphasized: true },
];

function SelectField({ value }: { value: string }) {
  return (
    <motion.div
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      className="mt-3 flex h-9 cursor-pointer items-center justify-between rounded-[22px] bg-neutral-200/50 pl-3 pr-3 transition-colors hover:bg-neutral-200/70 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/70"
    >
      <span className="truncate text-sm leading-5 text-foreground">
        {value}
      </span>
      <motion.span
        variants={{
          hover: { y: [0, -2, 2, 0], transition: { duration: 0.4 } },
        }}
        className="flex shrink-0"
      >
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
      </motion.span>
    </motion.div>
  );
}

export function TransferFundsCard({
  title = "Transfer Funds",
  description = "Move money between your connected accounts.",
  amountLabel = "Amount to Transfer",
  currencySymbol = "$",
  amount = "1,200.00",
  fromLabel = "From Account",
  fromAccount = "Main Checking (··8402) — $12,450.00",
  toLabel = "To Account",
  toAccount = "High Yield Savings (··1192) — $42,100.00",
  summary = DEFAULT_SUMMARY,
  buttonLabel = "Confirm Transfer",
  onConfirm,
  onClose,
  className,
}: TransferFundsCardProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-[26px] bg-white p-6 font-inter",
        "shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_4px_6px_-1px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[16px] font-medium leading-6 text-foreground">
          {title}
        </h3>
        <motion.button
          type="button"
          onClick={onClose}
          whileTap={{ scale: 0.88 }}
          aria-label="Close"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-neutral-100 text-foreground transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          <motion.span
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
            className="flex"
          >
            <X className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>
      <p className="mt-1.5 max-w-[254px] text-sm leading-5 text-muted-foreground">
        {description}
      </p>

      {/* Amount */}
      <div className="mt-6">
        <label className="text-sm font-medium leading-[14px] text-foreground">
          {amountLabel}
        </label>
        <div className="mt-3 flex h-9 items-center gap-1.5 rounded-[26px] bg-neutral-200/50 px-3 transition-colors hover:bg-neutral-200/70 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/70">
          <span className="text-sm font-medium leading-5 text-muted-foreground">
            {currencySymbol}
          </span>
          <span className="text-sm text-foreground">{amount}</span>
        </div>
      </div>

      {/* From */}
      <div className="mt-7">
        <label className="text-sm font-medium leading-[14px] text-foreground">
          {fromLabel}
        </label>
        <SelectField value={fromAccount} />
      </div>

      {/* To */}
      <div className="mt-7">
        <label className="text-sm font-medium leading-[14px] text-foreground">
          {toLabel}
        </label>
        <SelectField value={toAccount} />
      </div>

      {/* Summary */}
      <div className="mt-7 rounded-[18px] bg-neutral-100/50 px-4 dark:bg-neutral-900/50">
        {summary.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "flex h-[46px] items-center justify-between",
              index > 0 && "border-t border-border",
            )}
          >
            <span
              className={cn(
                "text-sm leading-5",
                row.emphasized
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {row.label}
            </span>
            <span
              className={cn(
                "text-sm leading-5 text-foreground",
                row.emphasized ? "font-semibold" : "font-medium",
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Confirm */}
      <motion.button
        type="button"
        onClick={onConfirm}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
        className="mt-[25px] flex h-[34px] w-full items-center justify-center rounded-[26px] bg-black text-sm font-medium leading-5 text-[#eff6ff] transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
      >
        {buttonLabel}
      </motion.button>
    </div>
  );
}
