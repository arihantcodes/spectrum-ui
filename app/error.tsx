"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/Button";
import { NotFound } from "@/components/ui/NotFoundPage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="min-h-screen w-full bg-white">
        <NotFound />
      </div>
    </>
  );
}
