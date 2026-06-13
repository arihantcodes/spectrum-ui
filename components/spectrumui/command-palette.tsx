/**
 * Spectrum UI — CommandPalette
 * 
 * Dependencies: framer-motion, lucide-react, next-themes, @/lib/utils
 * 
 * @example
 * <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
 */

"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Search, Home, Code, HelpCircle, Laptop, Sun, Moon, Copy, Github, CornerDownLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string
  title: string
  description: string
  category: "Navigation" | "Theme" | "Repository"
  shortcut?: string[]
  icon: React.ReactNode
  action: () => void
}

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

// ─── Animation Springs ────────────────────────────────────────────────────────

const SPRING_FLUID = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const

const SPRING_ENTRANCE = {
  type: "spring",
  stiffness: 260,
  damping: 20,
} as const

// ─── Component ───────────────────────────────────────────────────────────────

export function CommandPalette({ isOpen, onClose, className }: CommandPaletteProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      setQuery("")
      setActiveIndex(0)
    }
  }, [isOpen])

  // Copy CLI command action
  const handleCopyCommand = useCallback(() => {
    navigator.clipboard.writeText("npx -y @spectrumui/mcp").then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [])

  // Defined Command List
  const commandsList = useMemo<CommandItem[]>(() => {
    return [
      {
        id: "nav-home",
        title: "Go to Homepage",
        description: "Navigate back to the landing page",
        category: "Navigation",
        shortcut: ["G", "H"],
        icon: <Home className="h-4 w-4" />,
        action: () => {
          router.push("/")
          onClose()
        },
      },
      {
        id: "nav-components",
        title: "Explore Components",
        description: "Browse React & Next.js copy-paste components",
        category: "Navigation",
        shortcut: ["G", "C"],
        icon: <Code className="h-4 w-4" />,
        action: () => {
          router.push("/docs")
          onClose()
        },
      },
      {
        id: "nav-faqs",
        title: "Frequently Asked Questions",
        description: "Answers to common integration questions",
        category: "Navigation",
        shortcut: ["G", "F"],
        icon: <HelpCircle className="h-4 w-4" />,
        action: () => {
          router.push("/faqs")
          onClose()
        },
      },
      {
        id: "theme-light",
        title: "Set Theme to Light",
        description: "Switch to light mode interface appearance",
        category: "Theme",
        shortcut: ["T", "L"],
        icon: <Sun className="h-4 w-4" />,
        action: () => {
          setTheme("light")
          onClose()
        },
      },
      {
        id: "theme-dark",
        title: "Set Theme to Dark",
        description: "Switch to dark mode interface appearance",
        category: "Theme",
        shortcut: ["T", "D"],
        icon: <Moon className="h-4 w-4" />,
        action: () => {
          setTheme("dark")
          onClose()
        },
      },
      {
        id: "theme-system",
        title: "Set Theme to System",
        description: "Match the system device theme",
        category: "Theme",
        shortcut: ["T", "S"],
        icon: <Laptop className="h-4 w-4" />,
        action: () => {
          setTheme("system")
          onClose()
        },
      },
      {
        id: "cmd-copy",
        title: isCopied ? "CLI Command Copied!" : "Copy CLI Install Command",
        description: "Copy npx spectrum-ui installer to clipboard",
        category: "Repository",
        shortcut: ["C", "C"],
        icon: <Copy className="h-4 w-4" />,
        action: () => {
          handleCopyCommand()
        },
      },
      {
        id: "cmd-github",
        title: "View GitHub Repository",
        description: "Open the open-source spectrum-ui repo on GitHub",
        category: "Repository",
        shortcut: ["G", "R"],
        icon: <Github className="h-4 w-4" />,
        action: () => {
          window.open("https://github.com/arihantcodes/spectrum-ui", "_blank")
          onClose()
        },
      },
    ]
  }, [router, setTheme, onClose, isCopied, handleCopyCommand])

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    return commandsList.filter((item) => {
      const matchText = (item.title + " " + item.description + " " + item.category).toLowerCase()
      return matchText.includes(query.toLowerCase())
    })
  }, [commandsList, query])

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keyboard navigation logic
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((prev) => (filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((prev) => (filteredCommands.length > 0 ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const target = filteredCommands[activeIndex]
        if (target) {
          target.action()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, filteredCommands, activeIndex])

  // Scroll active item into view
  useEffect(() => {
    const activeEl = itemsContainerRef.current?.querySelector(`[data-index="${activeIndex}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex])

  // Grouped filtered commands
  const categories = useMemo(() => {
    const groups: { [key: string]: typeof filteredCommands } = {}
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = []
      }
      groups[cmd.category].push(cmd)
    })
    return groups
  }, [filteredCommands])

  // Get index mapping in the grouped list to keep index alignment consistent
  const getFlatIndex = (cmdId: string) => {
    return filteredCommands.findIndex((c) => c.id === cmdId)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/20 dark:bg-black/40 backdrop-blur-sm"
          />

          {/* Palette Dialog Box */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={shouldReduceMotion ? { duration: 0 } : SPRING_ENTRANCE}
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl z-10 flex flex-col text-left",
              "bg-white/80 dark:bg-[#0C0C0C]/75 border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-xl",
              className
            )}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200/40 dark:border-neutral-850/40">
              <Search className="h-4 w-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:ring-0 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[9px] font-medium opacity-60 text-neutral-500 bg-neutral-100/50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                ESC
              </kbd>
            </div>

            {/* Commands List Container */}
            <div
              ref={itemsContainerRef}
              className="max-h-[340px] overflow-y-auto overflow-x-hidden p-2"
            >
              {filteredCommands.length === 0 ? (
                /* Empty state */
                <div className="py-12 text-center text-sm text-neutral-400 dark:text-neutral-600 font-mono">
                  No commands found matching &quot;{query}&quot;
                </div>
              ) : (
                /* Categorized items mapping */
                Object.entries(categories).map(([category, items]) => (
                  <div key={category} className="mb-2 last:mb-0">
                    <h4 className="px-3 py-1.5 text-[9px] font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
                      {category}
                    </h4>
                    <div className="space-y-0.5 mt-1">
                      {items.map((item) => {
                        const flatIdx = getFlatIndex(item.id)
                        const isActive = flatIdx === activeIndex

                        return (
                          <div
                            key={item.id}
                            data-index={flatIdx}
                            onClick={() => {
                              item.action()
                            }}
                            onMouseEnter={() => setActiveIndex(flatIdx)}
                            className={cn(
                              "relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer select-none transition-colors group z-10",
                              isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            )}
                          >
                            {/* Layout animation active indicator card */}
                            {isActive && (
                              <motion.div
                                layoutId="active-item-pill"
                                className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl -z-10"
                                transition={shouldReduceMotion ? { duration: 0 } : SPRING_FLUID}
                              />
                            )}

                            {/* Info Left */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={cn(
                                "shrink-0 transition-colors",
                                isActive ? "text-neutral-800 dark:text-neutral-200" : "text-neutral-400 dark:text-neutral-600"
                              )}>
                                {item.icon}
                              </div>
                              <div className="min-w-0">
                                <span className="block text-sm font-medium leading-none">
                                  {item.title}
                                </span>
                                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 leading-none truncate max-w-xs">
                                  {item.description}
                                </span>
                              </div>
                            </div>

                            {/* Shortcut Badges Right */}
                            {item.shortcut && (
                              <div className="flex items-center gap-1 shrink-0 ml-4">
                                {item.shortcut.map((key, kIdx) => (
                                  <kbd
                                    key={kIdx}
                                    className="inline-flex h-5 w-5 select-none items-center justify-center rounded border font-mono text-[9px] font-medium bg-neutral-50 dark:bg-neutral-950 border-neutral-200/50 dark:border-neutral-800/50 text-neutral-400 dark:text-neutral-600"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                                {isActive && (
                                  <CornerDownLeft className="h-3 w-3 text-neutral-400 dark:text-neutral-600 ml-1.5 opacity-60 animate-pulse" />
                                )}
                              </div>
                            )}

                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-50/50 dark:bg-neutral-950/20 border-t border-neutral-200/40 dark:border-neutral-850/40 text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
              <div className="flex items-center gap-1.5">
                <span>Use arrows</span>
                <kbd className="rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900 px-1 font-mono text-[9px]">↑↓</kbd>
                <span>and</span>
                <kbd className="rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900 px-1 font-mono text-[9px]">Enter</kbd>
              </div>
              <div>Spectrum Palette</div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
