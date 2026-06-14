"use client"

import { cn } from "@/lib/utils"
import { motion, type Transition } from "framer-motion"
import { 
  Bot, 
  BellRing, 
  Cloud,
  FileText,
  ImageIcon,
  Folder,
  MousePointer2
} from "lucide-react"
import React from "react"

const SPRING_FLUID: Transition = { type: "spring", stiffness: 300, damping: 30 }

// 1. AI Assistant (Dynamic Chat Interface)
export function AiAssistantDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] w-full flex-col justify-end overflow-hidden p-4">
      <div className="flex flex-col space-y-3 relative z-10">
        <motion.div 
          className="self-end rounded-2xl rounded-tr-sm bg-neutral-100 px-4 py-2 text-xs text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        >
          Can you center a div?
        </motion.div>
        
        <motion.div 
          className="self-start rounded-2xl rounded-tl-sm bg-white px-4 py-2 text-xs text-neutral-900 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
        >
          <div className="flex items-center space-x-1">
            <Bot className="h-4 w-4 text-neutral-500 mr-1" />
            <motion.div 
              initial={{ width: 0, opacity: 0 }} 
              whileInView={{ width: "auto", opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }} 
              className="overflow-hidden whitespace-nowrap"
            >
               Yes! Use <code className="bg-neutral-100 dark:bg-neutral-800 rounded px-1 py-0.5 text-[10px] mx-1">flex items-center justify-center</code>
            </motion.div>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-3 w-1 bg-neutral-400 ml-1 rounded-full"
            />
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-[#0C0C0C]/20 pointer-events-none" />
    </div>
  )
}

// 2. Analytics Demo (Beautiful SVG Area Chart)
export function AnalyticsDemo() {
  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border-b border-r border-neutral-900 dark:border-white" />
        ))}
      </div>
      <svg className="absolute bottom-0 h-[80%] w-full" viewBox="0 0 200 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className="text-neutral-900 dark:text-neutral-100" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-neutral-900 dark:text-neutral-100" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0,100 L 0,60 C 30,50 50,80 80,60 C 110,40 130,70 160,30 C 180,10 200,40 200,40 L 200,100 Z"
          fill="url(#area-gradient)"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.path
          d="M 0,60 C 30,50 50,80 80,60 C 110,40 130,70 160,30 C 180,10 200,40 200,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-900 dark:text-neutral-100"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="160"
          cy="30"
          r="4"
          className="fill-neutral-900 dark:fill-neutral-100"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, type: "spring" }}
        />
        <motion.circle
          cx="160"
          cy="30"
          r="12"
          className="fill-neutral-900/20 dark:fill-neutral-100/20"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: [1, 1.5, 1] }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  )
}

// 3. Music Player Demo (Animated Audio Equalizer)
export function MusicPlayerDemo() {
  return (
    <div className="flex h-full min-h-[160px] items-center justify-center p-4">
      <div className="relative flex w-full max-w-[200px] md:max-w-[220px] xl:max-w-[240px] items-center space-x-3 rounded-2xl bg-white/50 p-3 shadow-xl ring-1 ring-neutral-200 backdrop-blur-xl dark:bg-neutral-900/50 dark:ring-neutral-800">
        <motion.div 
          variants={{
            hover: { rotate: 360, transition: { repeat: Infinity, duration: 4, ease: "linear" } }
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 shadow-inner ring-4 ring-neutral-100 dark:ring-neutral-800"
        >
          <div className="h-3 w-3 rounded-full bg-white dark:bg-neutral-900 shadow-sm" />
        </motion.div>
        
        <div className="flex-1 overflow-hidden">
          <div className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100">Midnight City</div>
          <div className="truncate text-[10px] text-neutral-500">M83</div>
        </div>

        {/* Animated Equalizer */}
        <motion.div 
          variants={{
            hidden: { opacity: 0.5 },
            hover: { opacity: 1 }
          }}
          className="flex items-end space-x-0.5 h-6 mr-2"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i} 
              className="w-[3px] rounded-full bg-neutral-900 dark:bg-neutral-100"
              variants={{
                hidden: { height: "4px" },
                hover: { height: ["4px", i % 2 === 0 ? "20px" : "12px", "4px"] }
              }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// 4. Notifications Demo (iOS-style 3D Stack)
export function NotificationsDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] flex-col items-center justify-center p-4">
      <motion.div 
        variants={{
          hidden: {},
          hover: { transition: { staggerChildren: 0.1 } }
        }}
        className="relative w-full max-w-[180px] sm:max-w-[220px]"
      >
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { 
                y: i * 4, 
                scale: 1 - (2 - i) * 0.05, 
                zIndex: i,
                opacity: i === 0 ? 0.4 : i === 1 ? 0.7 : 1
              },
              hover: { 
                y: (i - 2) * 55, 
                scale: 1, 
                zIndex: i,
                opacity: 1
              }
            }}
            transition={SPRING_FLUID}
            className={cn(
              "absolute left-0 right-0 bottom-0 rounded-xl bg-white p-3 shadow-md ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800",
              i === 2 ? "relative" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <BellRing className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-2 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// 5. Terminal Demo (macOS-Style Terminal)
export function TerminalDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] flex-col items-center justify-center p-4">
      <div className="w-full h-full max-w-[320px] rounded-xl bg-neutral-900 shadow-2xl border border-neutral-800 overflow-hidden flex flex-col">
        {/* macOS Title Bar */}
        <div className="flex items-center px-4 py-2 border-b border-neutral-800 bg-neutral-950">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-500" />
          </div>
          <div className="mx-auto text-[10px] text-neutral-500 font-medium font-sans">bash</div>
        </div>
        {/* Terminal Body */}
        <motion.div 
          variants={{
            hidden: {},
            hover: { transition: { staggerChildren: 0.3 } }
          }}
          className="p-3 font-mono text-[10px] text-neutral-400 flex-1 space-y-2"
        >
          <p className="text-neutral-400">user@macbook:~$ <span className="text-neutral-100">npm run build</span></p>
          <motion.div 
            variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }}
            className="flex items-center space-x-2 text-neutral-300"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⠋</motion.div> 
            <span>Building premium components...</span>
          </motion.div>
          <motion.p variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }} className="text-neutral-500">
            [1/3] Resolving dependencies...
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }} className="text-neutral-500">
            [2/3] Compiling Tailwind CSS...
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }} className="text-neutral-300 flex items-center gap-2">
            <span>✔</span> <span className="text-neutral-100">Build completed in 1.2s</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// 6. Team Collaboration (Multiplayer Cursor Environment)
export function TeamMembersDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] items-center justify-center overflow-hidden">
       {/* Central Canvas Element */}
       <div className="w-32 h-20 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-center shadow-sm">
         <div className="h-2 w-12 rounded bg-neutral-200 dark:bg-neutral-800" />
       </div>
       
       {/* Cursor 1 */}
       <motion.div 
         className="absolute z-20 pointer-events-none" 
         animate={{ x: [-30, 20, -30], y: [-20, -10, -20] }} 
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       >
         <MousePointer2 className="h-4 w-4 text-neutral-900 dark:text-neutral-100 fill-neutral-900 dark:fill-neutral-100 -rotate-12 drop-shadow-md" />
         <div className="ml-3 mt-1 rounded bg-neutral-900 dark:bg-neutral-100 px-2 py-0.5 text-[9px] font-medium text-white dark:text-neutral-900 shadow-sm">Alice</div>
       </motion.div>

       {/* Cursor 2 */}
       <motion.div 
         className="absolute z-20 pointer-events-none" 
         animate={{ x: [40, -10, 40], y: [20, 0, 20] }} 
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       >
         <MousePointer2 className="h-4 w-4 text-neutral-500 dark:text-neutral-400 fill-neutral-500 dark:fill-neutral-400 -rotate-12 drop-shadow-md" />
         <div className="ml-3 mt-1 rounded bg-neutral-500 dark:bg-neutral-400 px-2 py-0.5 text-[9px] font-medium text-white shadow-sm">Bob</div>
       </motion.div>
    </div>
  )
}

// 7. File Storage (Cloud Sync Visualizer)
export function StorageDemo() {
  return (
    <div className="relative flex h-full min-h-[160px] items-center justify-center overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
       
       <div className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-xl ring-4 ring-white dark:bg-neutral-100 dark:text-neutral-900 dark:ring-[#0C0C0C]">
         <Cloud className="h-7 w-7" />
       </div>
       
       <motion.div 
         className="absolute left-[10%] pointer-events-none" 
         animate={{ x: [0, 60], y: [0, -10], opacity: [0, 1, 0], scale: [0.6, 1, 0.4] }} 
         transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
       >
         <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
           <FileText className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
         </div>
       </motion.div>

       <motion.div 
         className="absolute right-[10%] top-[20%] pointer-events-none" 
         animate={{ x: [0, -60], y: [0, 20], opacity: [0, 1, 0], scale: [0.6, 1, 0.4] }} 
         transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn", delay: 0.8 }}
       >
         <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
           <ImageIcon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
         </div>
       </motion.div>
       
       <motion.div 
         className="absolute right-[15%] bottom-[15%] pointer-events-none" 
         animate={{ x: [0, -40], y: [0, -30], opacity: [0, 1, 0], scale: [0.6, 1, 0.4] }} 
         transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn", delay: 1.5 }}
       >
         <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
           <Folder className="h-4 w-4 text-neutral-800 dark:text-neutral-200 fill-neutral-800/20 dark:fill-neutral-200/20" />
         </div>
       </motion.div>
    </div>
  )
}

// 8. Progress / Global Edge Network Demo
export function ProgressDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
       {/* Central Node */}
       <div className="absolute h-10 w-10 rounded-full bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-neutral-900">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
       </div>
       
       <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
         {/* Lines */}
         <path d="M 50,50 L 200,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-neutral-200 dark:text-neutral-800" />
         <path d="M 350,40 L 200,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-neutral-200 dark:text-neutral-800" />
         <path d="M 80,180 L 200,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-neutral-200 dark:text-neutral-800" />
         <path d="M 320,160 L 200,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-neutral-200 dark:text-neutral-800" />
         
         {/* Packets */}
         <motion.circle r="3" className="fill-neutral-900 dark:fill-neutral-100" initial={{ cx: 50, cy: 50, opacity: 0 }} animate={{ cx: 200, cy: 100, opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} />
         <motion.circle r="3" className="fill-neutral-900 dark:fill-neutral-100" initial={{ cx: 350, cy: 40, opacity: 0 }} animate={{ cx: 200, cy: 100, opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }} />
         <motion.circle r="3" className="fill-neutral-900 dark:fill-neutral-100" initial={{ cx: 80, cy: 180, opacity: 0 }} animate={{ cx: 200, cy: 100, opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }} />
         <motion.circle r="3" className="fill-neutral-900 dark:fill-neutral-100" initial={{ cx: 320, cy: 160, opacity: 0 }} animate={{ cx: 200, cy: 100, opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }} />
       </svg>
    </div>
  )
}

// 9. Calendar Events (Interactive Event Scheduler)
export function CalendarDemo() {
  return (
    <div className="flex h-full min-h-[160px] w-full items-center justify-center p-4">
      <div className="relative w-full max-w-[180px] xl:max-w-[200px] overflow-hidden rounded-xl bg-white p-3 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800">
        
        {/* Header */}
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-neutral-100">
          <span>Today</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[8px] font-medium text-neutral-500 dark:bg-neutral-800">14 Oct</span>
        </div>

        <div className="relative flex flex-col">
          {/* Time Slots Grid */}
          {["09:00", "10:00", "11:00", "12:00"].map((time, i) => (
             <div key={i} className="flex h-8 items-start space-x-2 text-[9px]">
               <span className="w-6 shrink-0 text-right font-medium text-neutral-400 tabular-nums">{time}</span>
               <div className="mt-1.5 h-px w-full bg-neutral-100 dark:bg-neutral-800" />
             </div>
          ))}

          {/* Event 1 (09:30 - 10:30) */}
          <motion.div 
            variants={{
              hidden: { scale: 0.95, opacity: 0.8 },
              hover: { scale: 1, opacity: 1, x: 2 }
            }}
            className="absolute left-[36px] right-2 top-[22px] z-10 flex h-[30px] flex-col justify-center overflow-hidden rounded-md bg-neutral-100 px-2 ring-1 ring-neutral-200 shadow-sm dark:bg-neutral-800 dark:ring-neutral-700"
          >
             <div className="text-[8px] font-bold text-neutral-900 dark:text-neutral-100">Design Sync</div>
             <div className="text-[7px] text-neutral-500">09:30 - 10:30</div>
          </motion.div>

          {/* Event 2 (11:00 - 11:30) */}
          <motion.div 
            variants={{
              hidden: { scale: 0.95, opacity: 0.6 },
              hover: { scale: 1, opacity: 1, x: 2 }
            }}
            transition={{ delay: 0.1 }}
            className="absolute left-[36px] right-6 top-[68px] z-10 flex h-[16px] items-center overflow-hidden rounded-md bg-neutral-50 px-2 ring-1 ring-neutral-200 dark:bg-neutral-800/60 dark:ring-neutral-700/60"
          >
             <div className="text-[8px] font-bold text-neutral-900 dark:text-neutral-100">Standup</div>
          </motion.div>

          {/* Animated 'Now' Line */}
          <motion.div 
            className="pointer-events-none absolute left-[32px] right-0 z-20 flex items-center"
            variants={{
               hidden: { top: "15%" },
               hover: { top: "85%" }
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-900 ring-2 ring-white shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:bg-neutral-100 dark:ring-[#0C0C0C] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            <div className="h-px w-full bg-neutral-900 dark:bg-neutral-100" />
          </motion.div>
        </div>

      </div>
    </div>
  )
}
