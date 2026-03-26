'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
}

export function PreviewModal({ isOpen, onClose, imageSrc, alt }: PreviewModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-background/40">
            <h2 className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">{alt} — Full Preview</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.open(imageSrc, '_blank')}
                className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
                title="Open original"
              >
                <IconExternalLink size={20} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-muted hover:bg-accent text-foreground transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>
          </div>

          {/* Image Container (Scrollable) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 scrollbar-hide">
            <div className="max-w-5xl mx-auto w-full">
              <Image
                src={imageSrc}
                alt={alt}
                width={2000}
                height={5000}
                className="w-full h-auto rounded-lg shadow-2xl"
                quality={100}
                unoptimized
              />
            </div>
          </div>
          
          {/* Footer Info (Mobile Only) */}
          <div className="md:hidden p-4 bg-muted text-center text-muted-foreground text-xs">
            Scroll to see full landing page
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
