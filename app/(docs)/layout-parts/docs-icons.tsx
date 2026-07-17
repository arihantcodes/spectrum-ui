import * as React from "react";
import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

/** shadcn-style squircle with a diagonal slash (installation figure header) */
export function ShadcnIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path
        d="M8 14C10.4998 14 11.7497 14 12.6259 13.3634C12.9089 13.1578 13.1578 12.9089 13.3634 12.6259C14 11.7497 14 10.4998 14 8C14 5.50018 14 4.25027 13.3634 3.37405C13.1578 3.09107 12.9089 2.84221 12.6259 2.63661C11.7497 2 10.4998 2 8 2C5.50018 2 4.25027 2 3.37405 2.63661C3.09107 2.84221 2.84221 3.09107 2.63661 3.37405C2 4.25027 2 5.50018 2 8C2 10.4998 2 11.7497 2.63661 12.6259C2.84221 12.9089 3.09107 13.1578 3.37405 13.3634C4.25027 14 5.50018 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 4.66667L5.33333 11.3333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Iconly-pro "monitor display" — Preview tab icon */
export function MonitorIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.89975 1.46859H4.09967C2.64308 1.46859 1.45833 2.65392 1.45833 4.1105V7.29318C1.45833 8.75035 2.64308 9.93568 4.09967 9.93568H9.89975C11.3563 9.93568 12.5417 8.75035 12.5417 7.29318V4.1105C12.5417 2.65392 11.3563 1.46859 9.89975 1.46859Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.58872 11.5106H4.34395C4.0622 11.5106 3.83354 11.7398 3.83354 12.021C3.83354 12.3022 4.0622 12.5314 4.34395 12.5314H9.58872C9.86988 12.5314 10.0991 12.3022 10.0991 12.021C10.0991 11.7398 9.86988 11.5106 9.58872 11.5106Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Iconly-pro "Terminal" — Code tab icon */
export function TerminalIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.34617 9.29892H7.41883C7.17733 9.29892 6.98133 9.10292 6.98133 8.86142C6.98133 8.61992 7.17733 8.42392 7.41883 8.42392H9.34617C9.58767 8.42392 9.78367 8.61992 9.78367 8.86142C9.78367 9.10292 9.58767 9.29892 9.34617 9.29892ZM6.34725 7.45208L4.96358 8.83575C4.87842 8.9215 4.76642 8.96408 4.65442 8.96408C4.54242 8.96408 4.43042 8.9215 4.34525 8.83575C4.17433 8.66483 4.17433 8.38775 4.34525 8.21742L5.41975 7.14292L4.34525 6.06842C4.17433 5.8975 4.17433 5.62042 4.34525 5.4495C4.51617 5.27858 4.79267 5.27858 4.96358 5.4495L6.34725 6.83317C6.51817 7.00408 6.51817 7.28117 6.34725 7.45208ZM9.4605 1.45833H4.54008C2.69675 1.45833 1.45833 2.75333 1.45833 4.68183V9.31758C1.45833 11.2461 2.69675 12.5417 4.54008 12.5417H9.45992C11.3033 12.5417 12.5417 11.2461 12.5417 9.31758V4.68183C12.5417 2.75333 11.3033 1.45833 9.4605 1.45833Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Iconly-pro "Copy 1" two-tone copy — package chip + Copy Prompt button */
export function Copy1Icon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5", className)}
      {...props}
    >
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.93048 3.56417C8.99488 3.56417 9.04744 3.51185 9.04447 3.44749C8.99284 2.32823 8.19892 1.45833 7.03465 1.45833H4.00713C2.79963 1.45833 1.99463 2.30417 1.99463 3.55833V7.46083C1.99463 8.6527 2.79564 9.50489 3.96048 9.55821C4.02484 9.56113 4.07713 9.50863 4.07713 9.44417V6.53917C4.07713 4.81833 5.29047 3.56417 6.96465 3.56417H8.93048Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99524 4.44108H6.96483C5.76255 4.44108 4.95463 5.284 4.95463 6.53876V10.4442C4.95463 11.6983 5.76255 12.5418 6.96483 12.5418H9.99466C11.1975 12.5418 12.0054 11.6983 12.0054 10.4442V6.53876C12.0054 5.284 11.1975 4.44108 9.99524 4.44108Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  );
}

/** "On This Page" list icon — three lines (50% / 66% / 33% widths) per Figma */
export function TocIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5", className)}
      {...props}
    >
      <path d="M2.33 2.92h7" stroke="currentColor" strokeWidth="1.17" strokeLinecap="round" />
      <path d="M2.33 7h9.34" stroke="currentColor" strokeWidth="1.17" strokeLinecap="round" />
      <path d="M2.33 11.08H7" stroke="currentColor" strokeWidth="1.17" strokeLinecap="round" />
    </svg>
  );
}

/** Pager chevrons — exact stroke weight from the design (1.33 @ 16px) */
export function ChevronLeftIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Iconly-pro bold "Lock" — auth-gated code/CLI panels */
export function LockBoldIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16.0556 18.8889"
      fill="none"
      aria-hidden="true"
      className={cn("h-4 w-3.5", className)}
      {...props}
    >
      <path
        d="M8.01338 0C10.9116 0 13.2437 2.28063 13.2437 5.09623V6.54438C14.8703 7.05213 16.0556 8.52468 16.0556 10.2835V14.9461C16.0556 17.1235 14.2504 18.8889 12.0249 18.8889H4.03164C1.80517 18.8889 0 17.1235 0 14.9461V10.2835C0 8.52468 1.18617 7.05213 2.81188 6.54438V5.09623C2.82148 2.28063 5.15352 0 8.01338 0ZM8.02298 10.7518C7.56233 10.7518 7.18805 11.1178 7.18805 11.5683V13.6519C7.18805 14.1118 7.56233 14.4778 8.02298 14.4778C8.49322 14.4778 8.8675 14.1118 8.8675 13.6519V11.5683C8.8675 11.1178 8.49322 10.7518 8.02298 10.7518ZM8.03257 1.64243C6.08441 1.64243 4.50093 3.18162 4.49133 5.07746V6.34072H11.5642V5.09623C11.5642 3.19101 9.98074 1.64243 8.03257 1.64243Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** npm wordmark logo shown in the package chip */
export function NpmIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("size-5", className)}
      {...props}
    >
      <path
        d="M0.3125 6.01562H19.6875V12.8453H10V13.9844H5.69375V12.8453H0.3125V6.01562ZM1.38906 11.7078H3.54219V8.29219H4.61875V11.7078H5.69531V7.15469H1.38906V11.7078ZM6.77031 7.15469V12.8453H8.92344V11.7078H11.0766V7.15469H6.77031ZM8.92344 8.29375H10V10.5687H8.92344V8.29375ZM12.1531 7.15469V11.7078H14.3062V8.29219H15.3828V11.7078H16.4594V8.29219H17.5359V11.7078H18.6125V7.15469H12.1531Z"
        fill="#CB3837"
      />
    </svg>
  );
}
