"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import * as DialogPrimitive from "@radix-ui/react-dialog";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}

export default function ImagePreview({
  src = "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  alt = "Preview image",
  width = 400,
  height = 400,
  className = "cursor-pointer rounded-lg hover:opacity-90 transition-opacity",
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onClick={() => setIsOpen(true)}
      />

      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[90vw] max-h-[90vh] w-auto h-auto p-0 bg-transparent border-0 z-51">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-hidden"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                className="object-contain"
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
