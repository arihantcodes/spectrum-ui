"use client";

import React, { useState } from "react";
import { Lightbulb, Upload, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RequestComponents() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open}  onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-foreground overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span
            className="absolute inset-[-200%] animate-[gradient-spin_3s_linear_infinite]
              bg-[conic-gradient(from_0deg,#f97316,#ec4899,#8b5cf6,#3b82f6,#06b6d4,#f97316)]"
          />
          <span className="absolute inset-[1.5px] rounded-full bg-background" />
          <Lightbulb className="relative z-10 h-3.5 w-3.5 text-amber-500" />
          <span className="relative z-10">Request Component</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-xl border-border/50 bg-background p-0 gap-0 overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                <Check className="h-7 w-7 text-emerald-500" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Request received
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-[300px]">
              We&apos;ll review your idea and build it if it&apos;s a good fit
              for the library. We&apos;ve sent a confirmation to your email.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-lg px-6"
              onClick={() => {
                setOpen(false);
                setTimeout(() => setSubmitted(false), 300);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="px-6 pt-6 pb-1">
              <DialogHeader>
                <DialogTitle className="text-xl tracking-tight">
                  Request a component
                </DialogTitle>
                <DialogDescription className="text-[13px] leading-relaxed">
                  Describe the component you need and we&apos;ll consider
                  adding it to the library.
                </DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-3 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="req-description" className="text-[13px]">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="req-description"
                  name="description"
                  required={true}
                  className="min-h-[100px] resize-none rounded-lg border-border/60 bg-muted/30 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring/30"
                  placeholder="A card component with a hover effect that reveals extra details..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="req-url" className="text-[13px]">
                  Inspiration URL{" "}
                  <span className="text-muted-foreground/60 font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="req-url"
                  name="url"
                  type="url"
                  className="rounded-lg border-border/60 bg-muted/30 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring/30"
                  placeholder="https://example.com/component"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="req-screenshot" className="text-[13px]">
                  Screenshot{" "}
                  <span className="text-muted-foreground/60 font-normal">
                    (optional, max 500KB)
                  </span>
                </Label>
                <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40">
                  <label
                    htmlFor="req-screenshot"
                    className="flex cursor-pointer flex-col items-center gap-2 text-center"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/60">
                      <Upload className="h-4 w-4 text-muted-foreground/70" />
                    </div>
                    <span className="text-xs text-muted-foreground/70">
                      Click to upload &middot; PNG, JPG up to 500KB
                    </span>
                  </label>
                  <Input
                    id="req-screenshot"
                    name="screenshot"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 500 * 1024) {
                        alert("File size must be less than 500KB");
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="req-email" className="text-[13px]">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="req-email"
                  required={true}
                  name="email"
                  type="email"
                  className="rounded-lg border-border/60 bg-muted/30 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring/30"
                  placeholder="you@example.com"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
