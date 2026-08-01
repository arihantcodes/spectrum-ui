"use client";

import React from "react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { trackEvent } from "@/lib/events";

// Inlined from public/new-icon/*.svg with fill="currentColor" so the
// active/inactive state colors apply; an <img src> can't be recolored.
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.20886 4.88993C4.3023 4.98337 4.42582 5.03009 4.54806 5.03009C4.67158 5.03009 4.79382 4.98337 4.8879 4.88993C5.07542 4.70177 5.07542 4.39777 4.8879 4.21025L4.26646 3.59009C4.07894 3.40257 3.77494 3.40321 3.58742 3.59009C3.3999 3.77825 3.3999 4.08161 3.58742 4.26913L4.20886 4.88993Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.5968C8.26498 3.5968 8.48002 3.38176 8.48002 3.1168V2.24C8.48002 1.97504 8.26498 1.76 8.00002 1.76C7.73506 1.76 7.52002 1.97504 7.52002 2.24V3.1168C7.52002 3.38176 7.73506 3.5968 8.00002 3.5968Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.59785 7.99994C3.59785 7.73498 3.38281 7.51994 3.11785 7.51994H2.23977C1.97481 7.51994 1.75977 7.73498 1.75977 7.99994C1.75977 8.2649 1.97481 8.47994 2.23977 8.47994H3.11785C3.38281 8.47994 3.59785 8.2649 3.59785 7.99994Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.452 5.03024C11.5742 5.03024 11.6978 4.98352 11.7912 4.89008L12.4126 4.26928C12.6002 4.08176 12.6002 3.77776 12.4126 3.59024C12.2251 3.40336 11.9211 3.40272 11.7336 3.59024L11.1128 4.2104C10.9253 4.39792 10.9253 4.70192 11.1128 4.88944C11.2062 4.98352 11.3291 5.03024 11.452 5.03024Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.7914 11.11C11.6032 10.9231 11.2992 10.9231 11.1123 11.11C10.9248 11.2981 10.9248 11.6021 11.1123 11.7896L11.7338 12.4098C11.8278 12.5032 11.9507 12.55 12.073 12.55C12.1965 12.55 12.3187 12.5032 12.4128 12.4098C12.6003 12.2216 12.6003 11.9183 12.4128 11.7308L11.7914 11.11Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.20886 11.11L3.58742 11.7308C3.3999 11.9183 3.3999 12.2216 3.58742 12.4098C3.6815 12.5032 3.80374 12.55 3.92726 12.55C4.0495 12.55 4.17238 12.5032 4.26646 12.4098L4.8879 11.7896C5.07542 11.6021 5.07542 11.2981 4.8879 11.11C4.70102 10.9231 4.39702 10.9231 4.20886 11.11Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.7599 7.51994H12.8819C12.6169 7.51994 12.4019 7.73498 12.4019 7.99994C12.4019 8.2649 12.6169 8.47994 12.8819 8.47994H13.7599C14.0249 8.47994 14.2399 8.2649 14.2399 7.99994C14.2399 7.73498 14.0249 7.51994 13.7599 7.51994Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.00002 12.4031C7.73506 12.4031 7.52002 12.6181 7.52002 12.8831V13.7599C7.52002 14.0248 7.73506 14.2399 8.00002 14.2399C8.26498 14.2399 8.48002 14.0248 8.48002 13.7599V12.8831C8.48002 12.6181 8.26498 12.4031 8.00002 12.4031Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.99179C6.34296 4.99179 4.99512 6.34091 4.99512 7.99981C4.99512 9.65869 6.34296 11.0078 7.99992 11.0078C9.65752 11.0078 11.0054 9.65869 11.0054 7.99981C11.0054 6.34091 9.65752 4.99179 7.99992 4.99179Z" fill="currentColor"/>
  </svg>
);

const SystemIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.3332 3.67789V7.34453C14.3332 7.4182 14.2735 7.47787 14.1998 7.47787H1.79984C1.7262 7.47787 1.6665 7.4182 1.6665 7.34453V3.67789C1.6665 2.38456 2.71317 1.33789 4.0065 1.33789H11.9932C13.2865 1.33789 14.3332 2.38456 14.3332 3.67789Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.1998 8.47787C14.2735 8.47787 14.3332 8.53753 14.3332 8.6112V8.67787C14.3332 9.96453 13.2865 11.0112 11.9932 11.0112H4.0065C2.71317 11.0112 1.6665 9.96453 1.6665 8.67787V8.6112C1.6665 8.53753 1.7262 8.47787 1.79984 8.47787H14.1998Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.6877 11.8889C9.6237 11.7769 9.5037 11.7196 9.38304 11.7243L9.37704 11.7236C9.36904 11.7243 6.56772 11.7236 6.56772 11.7236V11.7289C6.47038 11.7436 6.38038 11.7956 6.32705 11.8869L5.24305 13.3189C5.08238 13.6003 5.08305 13.9356 5.24505 14.2149C5.40772 14.4943 5.69838 14.6616 6.02372 14.6616H9.97837C10.2997 14.6616 10.5884 14.4956 10.751 14.2169C10.9137 13.9389 10.917 13.6056 10.7584 13.3249L9.6877 11.8889Z" fill="currentColor"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.184 9.2494C14.08 9.17407 13.9047 9.16473 13.7867 9.22407C11.7967 10.2821 9.29 9.90607 7.692 8.30873C6.09197 6.71007 5.71397 4.20408 6.77533 2.20741C6.84 2.07741 6.826 1.92608 6.73934 1.81141C6.65597 1.70275 6.4753 1.63941 6.34063 1.67808C3.5893 2.46541 1.66797 5.01475 1.66797 7.87807C1.66797 11.4367 4.56197 14.3314 8.11933 14.3314C10.9833 14.3314 13.5333 12.4061 14.3207 9.6494C14.3587 9.51473 14.296 9.33207 14.184 9.2494Z" fill="currentColor"/>
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex h-8 items-center justify-between gap-1 p-0.5 rounded-full bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 w-fit"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <LayoutGroup id="theme-toggle">
        <ThemeButton
          active={mounted && theme === "light"}
          onClick={() => {
            setTheme("light");
            trackEvent({ name: "theme_toggled", properties: { theme: "light" } });
          }}
          icon={<SunIcon />}
          label="Switch to light theme"
        />
        <ThemeButton
          active={mounted && theme === "system"}
          onClick={() => {
            setTheme("system");
            trackEvent({ name: "theme_toggled", properties: { theme: "system" } });
          }}
          icon={<SystemIcon />}
          label="Switch to system theme"
        />
        <ThemeButton
          active={mounted && theme === "dark"}
          onClick={() => {
            setTheme("dark");
            trackEvent({ name: "theme_toggled", properties: { theme: "dark" } });
          }}
          icon={<MoonIcon />}
          label="Switch to dark theme"
        />
      </LayoutGroup>
    </div>
  );
}

interface ThemeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ThemeButton({ active, onClick, icon, label }: ThemeButtonProps) {
  return (
    <motion.button
      className={`relative flex items-center justify-center size-[26px] rounded-full transition-colors ${
        active
          ? "text-[#323232] dark:text-neutral-100"
          : "text-[#626262] dark:text-neutral-500"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      aria-pressed={active}
    >
      {active && (
        <motion.div
          className="absolute inset-0 bg-white border border-neutral-200 shadow-xs  dark:bg-neutral-800 dark:border-neutral-700 rounded-full"
          layoutId="theme-active-indicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
    </motion.button>
  );
}
