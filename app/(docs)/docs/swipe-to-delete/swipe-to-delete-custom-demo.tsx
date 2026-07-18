"use client"

import React, { useState } from "react"
import { SwipeToDelete } from "@/components/spectrumui/swipe-to-delete"

const TASKS = [
  { id: 1, title: "Ship onboarding flow", tag: "Today" },
  { id: 2, title: "Review pull requests", tag: "Today" },
  { id: 3, title: "Update changelog", tag: "Tomorrow" },
]

export default function SwipeToDeleteCustomDemo() {
  const [tasks, setTasks] = useState(TASKS)

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-sm">
        {tasks.map((task) => (
          <SwipeToDelete
            key={task.id}
            label={`task ${task.title}`}
            actionWidth={120}
            threshold={0.4}
            className="mb-2 last:mb-0"
            onDelete={() =>
              setTasks((current) =>
                current.filter((item) => item.id !== task.id),
              )
            }
          >
            <div className="flex items-center gap-3 p-3">
              <span
                aria-hidden="true"
                className="h-4 w-4 shrink-0 rounded-full border border-neutral-300 dark:border-neutral-600"
              />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {task.title}
              </span>
              <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
                {task.tag}
              </span>
            </div>
          </SwipeToDelete>
        ))}

        {tasks.length === 0 && (
          <div className="flex justify-center py-6">
            <button
              type="button"
              onClick={() => setTasks(TASKS)}
              className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
            >
              Reset tasks
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        A wider action zone (120px) that commits at 40% of the swipe
      </p>
    </div>
  )
}
