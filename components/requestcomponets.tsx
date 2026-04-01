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
      setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
      }, 1500);
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
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle>Request a component</DialogTitle>
          <DialogDescription>
            Describe the component you need and we&apos;ll build it for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="req-description">Description</Label>
            <span className="text-red-500 font-bold">*</span>
            <Textarea
              id="req-description"
              name="description"
              required={true}
              className="min-h-[100px] resize-none"
              placeholder="A card component with a hover effect that reveals extra details..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="req-url">
              Inspiration URL{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="req-url"
              name="url"
              type="url"
              placeholder="https://example.com/component"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="req-screenshot">
              Screenshot{" "}
              <span className="text-muted-foreground font-normal">
                (optional, max 500KB)
              </span>
            </Label>
            <div className="rounded-lg border border-dashed p-4 transition-colors hover:border-foreground/30">
              <label
                htmlFor="req-screenshot"
                className="flex cursor-pointer flex-col items-center gap-1.5 text-center"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
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
            <Label htmlFor="req-email">
              Email{" "}
              <span className="text-red-500 font-bold">*</span>
            </Label>
            <Input
              id="req-email"
              required={true}
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || submitted}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : submitted ? (
              <>
                <Check className="h-4 w-4" />
                Sent!
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
