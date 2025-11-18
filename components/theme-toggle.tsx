"use client";

import React from "react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="flex items-center justify-between p-1 rounded-full bg-neutral-100 dark:bg-black/90 w-fit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ThemeButton
        active={theme === "light"}
        onClick={() => setTheme("light")}
        icon={<Sun size={16} />}
      />
      <ThemeButton
        active={theme === "system"}
        onClick={() => setTheme("system")}
        icon={<Monitor size={16} />}
      />
      <ThemeButton
        active={theme === "dark"}
        onClick={() => setTheme("dark")}
        icon={<Moon size={16} />}
      />
    </motion.div>
  );
}

interface ThemeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function ThemeButton({ active, onClick, icon }: ThemeButtonProps) {
  // Determine label based on icon component
  let label = "Toggle theme";
  if (React.isValidElement(icon) && icon.type) {
    if (icon.type === Sun) label = "Switch to light theme";
    else if (icon.type === Moon) label = "Switch to dark theme";
    else if (icon.type === Monitor) label = "Switch to system theme";
  }
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
          layoutId="activeTheme"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
    </motion.button>
  );
}
