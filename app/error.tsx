"use client"; // Error components must be Client Components

import { Button } from "@/components/UI/Button";
import { NotFound } from "@/components/UI/NotFoundPage";
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
