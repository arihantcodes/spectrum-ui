'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronLeft, IconChevronRight, IconMaximize } from '@tabler/icons-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PreviewModal } from './PreviewModal'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
        <span className="text-muted-foreground text-sm">No preview available</span>
      </div>
    )
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group">
        
        {/* Mobile View: Compact with Maximize Button */}
        <div className="lg:hidden relative">
          <div className="aspect-[16/10] overflow-hidden">
             <Image
              src={images[currentIndex]}
              alt={`${alt} mobile preview`}
              width={800}
              height={500}
              className="w-full h-full object-cover object-top"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <IconMaximize size={18} />
              View Full Preview
            </button>
          </div>
        </div>

        {/* Desktop View: Full Length scrollable (as planned before) */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-auto cursor-zoom-in"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Image
                src={images[currentIndex]}
                alt={`${alt} preview ${currentIndex + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto block"
                quality={100}
                priority
                unoptimized={images[currentIndex].endsWith('.webp')}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Overlays (Only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <IconChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <IconChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all",
                currentIndex === index 
                  ? "border-[#6366F1] ring-2 ring-[#6366F1]/20" 
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image 
                src={image} 
                alt={`${alt} thumbnail ${index + 1}`} 
                fill 
                className="object-cover object-top" 
              />
            </button>
          ))}
        </div>
      )}

      {/* Full Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={images[currentIndex]}
        alt={alt}
      />
    </div>
  )
}
