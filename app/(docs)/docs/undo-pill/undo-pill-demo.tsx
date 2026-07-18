"use client"

import React, { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { UndoPill } from "@/components/spectrumui/undo-pill"

const MESSAGES = [
  { id: 1, sender: "Ana Wells", preview: "The homepage mock is ready for review" },
  { id: 2, sender: "Dev Patel", preview: "Standup moved to 10:30 tomorrow" },
  { id: 3, sender: "Mia Chen", preview: "Shipping notes for the 2.4 release" },
]

export default function UndoPillDemo() {
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const [pendingId, setPendingId] = useState<number | null>(null)

  const visibleMessages = MESSAGES.filter(
    (message) => !deletedIds.includes(message.id) && message.id !== pendingId,
  )

  const handleDelete = useCallback(
    (id: number) => {
      // Deleting while a pill is open commits the previous pending delete
      if (pendingId !== null) {
        setDeletedIds((prev) => [...prev, pendingId])
      }
      setPendingId(id)
    },
    [pendingId],
  )

  const handleUndo = useCallback(() => {
    setPendingId(null)
  }, [])

  const handleExpire = useCallback(() => {
    if (pendingId !== null) {
      setDeletedIds((prev) => [...prev, pendingId])
    }
    setPendingId(null)
  }, [pendingId])

  return (
    <div className="relative flex min-h-[280px] w-full max-w-md flex-col justify-center py-10">
      <div className="flex flex-col">
        <AnimatePresence initial={false}>
          {visibleMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-neutral-200 py-3 dark:border-neutral-800">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {message.sender}
                  </p>
                  <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
                    {message.preview}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(message.id)}
                  aria-label={`Delete message from ${message.sender}`}
                  className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-300"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleMessages.length === 0 && pendingId === null && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              All messages deleted
            </p>
            <button
              type="button"
              onClick={() => setDeletedIds([])}
              className="text-sm font-medium text-neutral-700 underline-offset-2 hover:underline dark:text-neutral-300"
            >
              Reset list
            </button>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <UndoPill
          open={pendingId !== null}
          label="Message deleted"
          onUndo={handleUndo}
          onExpire={handleExpire}
        />
      </div>
    </div>
  )
}
