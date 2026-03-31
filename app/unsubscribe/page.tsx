"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function UnsubscribeForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleUnsubscribe = async () => {
    if (!token || !email) {
      setStatus("error")
      setMessage("Invalid unsubscribe link.")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Something went wrong.")
        return
      }

      setStatus("done")
      setMessage(data.message)
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Unsubscribe
        </h1>

        {status === "idle" && (
          <>
            <p className="text-muted-foreground text-sm">
              Are you sure you want to unsubscribe
              {email ? <span className="font-medium text-foreground"> {email}</span> : null} from
              Spectrum UI updates?
            </p>
            <Button
              onClick={handleUnsubscribe}
              variant="outline"
              className="rounded-lg"
            >
              Yes, unsubscribe me
            </Button>
          </>
        )}

        {status === "loading" && (
          <p className="text-muted-foreground text-sm">Processing...</p>
        )}

        {status === "done" && (
          <>
            <p className="text-muted-foreground text-sm">{message}</p>
            <Link href="/">
              <Button variant="outline" className="rounded-lg mt-2">
                Back to Spectrum UI
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
            <Link href="/">
              <Button variant="outline" className="rounded-lg mt-2">
                Back to Spectrum UI
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    }>
      <UnsubscribeForm />
    </Suspense>
  )
}
