"use client"

import React from "react"
import { BentoGrid } from "./bento-grid"
import { BentoCard } from "./bento-card"
import { 
  Bot, 
  BarChart3, 
  BellRing, 
  Users2, 
  TerminalSquare, 
  Zap,
  HardDrive,
  CalendarDays,
  PlaySquare
} from "lucide-react"

import {
  AiAssistantDemo,
  AnalyticsDemo,
  NotificationsDemo,
  TeamMembersDemo,
  ProgressDemo,
  TerminalDemo,
  StorageDemo,
  CalendarDemo,
  MusicPlayerDemo
} from "./demo-cards"

export default function BentoGridDemo() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-4 md:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
          Premium Bento Grid
        </h2>
        <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
          Highly animated, interactive, and beautifully crafted components.
        </p>
      </div>

      <BentoGrid>
        {/* ROW 1 (4 Columns Total) */}
        <BentoCard
          title="AI Assistant Integration"
          description="Build powerful AI experiences with custom models."
          icon={<Bot className="h-5 w-5" />}
          colSpan={2}
          rowSpan={1}
          tilt={true}
        >
          <AiAssistantDemo />
        </BentoCard>

        <BentoCard
          title="Advanced Analytics"
          description="Track user behavior and metrics."
          icon={<BarChart3 className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <AnalyticsDemo />
        </BentoCard>

        <BentoCard
          title="Media Player"
          description="Rich media controls."
          icon={<PlaySquare className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <MusicPlayerDemo />
        </BentoCard>

        {/* ROW 2 (4 Columns Total) */}
        <BentoCard
          title="Smart Notifications"
          description="Deliver the right message at the right time."
          icon={<BellRing className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <NotificationsDemo />
        </BentoCard>

        <BentoCard
          title="Team Collaboration"
          description="Work together seamlessly."
          icon={<Users2 className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
          tilt={true}
        >
          <TeamMembersDemo />
        </BentoCard>

        <BentoCard
          title="Command Line Interface"
          description="Automate workflows and deploy with zero configuration."
          icon={<TerminalSquare className="h-5 w-5" />}
          colSpan={2}
          rowSpan={1}
          background={
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-neutral-200/50 blur-[80px] dark:bg-neutral-800/50" />
          }
        >
          <TerminalDemo />
        </BentoCard>

        {/* ROW 3 (4 Columns Total) */}
        <BentoCard
          title="File Storage"
          description="Secure cloud storage."
          icon={<HardDrive className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
        >
          <StorageDemo />
        </BentoCard>

        <BentoCard
          title="Lightning Fast"
          description="Optimized for performance and speed."
          icon={<Zap className="h-5 w-5" />}
          colSpan={2}
          rowSpan={1}
        >
          <ProgressDemo />
        </BentoCard>

        <BentoCard
          title="Calendar Events"
          description="Schedule and manage."
          icon={<CalendarDays className="h-5 w-5" />}
          colSpan={1}
          rowSpan={1}
          tilt={true}
        >
          <CalendarDemo />
        </BentoCard>

      </BentoGrid>
    </div>
  )
}
