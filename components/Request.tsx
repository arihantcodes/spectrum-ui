"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Upload, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/UI/AlertDialog";
import { Button } from "@/components/UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Textarea } from "@/components/UI/Textarea";

const ShineButton = () => {
  return (
    <button className=" no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <span>✨ Request For Components</span>
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};

const RequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-black text-white border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          Request a component <Sparkles className="h-5 w-5 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Describe your component</Label>
            <Textarea
              id="description"
              name="description"
              required
              className="min-h-[100px] bg-black border-gray-800 focus:border-gray-700"
              placeholder="A cool component where there are background beams going from left to right. Looks cool but I don't know how to make it."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">
              Enter a URL <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              className="bg-black border-gray-800 focus:border-gray-700"
              placeholder="spectrumui.arihant.us"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot">Upload a screenshot (max 500KB)</Label>
            <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-500" />
                <Input
                  id="screenshot"
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
                <label
                  htmlFor="screenshot"
                  className="cursor-pointer text-sm text-gray-400 text-center"
                >
                  Click to upload or drag and drop
                  <br />
                  PNG, JPG up to 500KB
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Your email <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="bg-black border-gray-800 focus:border-gray-700"
              placeholder="hi@example.com"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Sending..."
            ) : submitted ? (
              <>
                Sent <Check className="h-4 w-4" />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function RequestComponents() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>
          <ShineButton />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent ref={dialogRef} className="bg-black border-none">
        <AlertDialogDescription asChild>
          <RequestForm />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
