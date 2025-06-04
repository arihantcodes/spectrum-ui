/* eslint-disable @next/next/no-img-element */
"use client";
import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

export default function DiscloseImage({
  className,
  doorClassName,
  vertical = false,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  doorClassName?: string;
  vertical?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseClassName =
    "ease-slow duration-mid absolute bg-sky-500 transition-all animate-out fill-mode-forwards";

  return (
    <div className="relative h-64 w-52 overflow-hidden rounded-md bg-yellow-100">
      <img
        alt=""
        onLoad={() => setImageLoaded(true)}
        {...props}
        className={cn("h-full w-full object-cover", className)}
      />

      {imageLoaded && (
        <>
          <div
            className={cn(baseClassName, doorClassName, {
              "top-0 h-1/2 w-full slide-out-to-top-full": vertical,
              "bottom-0 left-0 top-0 w-1/2 slide-out-to-left-full": !vertical,
            })}
          />
          <div
            className={cn(baseClassName, doorClassName, {
              "bottom-0 h-1/2 w-full slide-out-to-bottom-full": vertical,
              "bottom-0 right-0 top-0 w-1/2 slide-out-to-right-full": !vertical,
            })}
          />
        </>
      )}
    </div>
  );
}
