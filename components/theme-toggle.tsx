"use client";

import React from "react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex items-center justify-between p-1 rounded-full bg-neutral-100 dark:bg-black/90 w-fit"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <LayoutGroup id="theme-toggle">
        <ThemeButton
          active={mounted && theme === "light"}
          onClick={() => setTheme("light")}
          icon={<Sun size={16} />}
          label="Switch to light theme"
        />
        <ThemeButton
          active={mounted && theme === "system"}
          onClick={() => setTheme("system")}
          icon={<Monitor size={16} />}
          label="Switch to system theme"
        />
        <ThemeButton
          active={mounted && theme === "dark"}
          onClick={() => setTheme("dark")}
          icon={<Moon size={16} />}
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
      className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
        active ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-500"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      aria-pressed={active}
    >
      {active && (
        <motion.div
          className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 rounded-full"
          layoutId="theme-active-indicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
    </motion.button>
  );
}
