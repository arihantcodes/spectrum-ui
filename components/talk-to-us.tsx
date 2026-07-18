"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";

const BUBBLE_ID = "spectrum-chat-bubble";

/** Inlined from public/new-icon/Chat.svg — rendered via <img> the SVG is a
 *  separate document, so currentColor can't inherit the theme color there;
 *  inlined it follows the button's text color on theme switch. */
const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.6898 22.7595C30.5954 22.7595 29.7046 21.8687 29.7046 20.7743C29.7046 19.6799 30.5954 18.7871 31.6898 18.7871C32.7842 18.7871 33.677 19.6799 33.677 20.7743C33.677 21.8687 32.7842 22.7595 31.6898 22.7595ZM23.9983 22.7595C22.9039 22.7595 22.013 21.8687 22.013 20.7743C22.013 19.6799 22.9039 18.7871 23.9983 18.7871C25.0946 18.7871 25.9855 19.6799 25.9855 20.7743C25.9855 21.8687 25.0946 22.7595 23.9983 22.7595ZM16.3068 22.7595C15.2124 22.7595 14.3215 21.8687 14.3215 20.7743C14.3215 19.6799 15.2124 18.7871 16.3068 18.7871C17.4031 18.7871 18.294 19.6799 18.294 20.7743C18.294 21.8687 17.4031 22.7595 16.3068 22.7595ZM33.7193 6.04785H14.285C9.84983 6.04785 6.24023 9.65553 6.24023 14.0907V27.3695C6.24023 31.8027 9.84983 35.4123 14.285 35.4123H16.3356C17.3014 35.4123 18.246 35.8021 18.9238 36.4837L21.654 39.2139C22.2818 39.8399 23.1151 40.1874 24.0022 40.1874C24.8873 40.1855 25.7225 39.8399 26.3465 39.2139L29.0767 36.4856C29.7679 35.7944 30.6895 35.4123 31.6668 35.4123H33.7193C38.1526 35.4123 41.7602 31.8027 41.7602 27.3695V14.0907C41.7602 9.65553 38.1526 6.04785 33.7193 6.04785Z"
      fill="currentColor"
    />
  </svg>
);

/** Custom-styled launcher for the Spectrum Chat widget (chat.spectrumhq.in).
 *  The widget script exposes no public API — it renders its own bubble and
 *  keeps open/close handlers private. So we hide the built-in bubble with CSS
 *  and drive the chat by programmatically clicking it (a .click() fires even
 *  on display:none elements). */
export function TalkToUs() {
  const [open, setOpen] = useState(false);
  const pendingOpen = useRef(false);

  // Mirror the widget's open state: it toggles an `open` class on its bubble.
  useEffect(() => {
    let observer: MutationObserver | null = null;

    const attach = () => {
      const bubble = document.getElementById(BUBBLE_ID);
      if (!bubble) return false;
      observer = new MutationObserver(() => {
        setOpen(bubble.classList.contains("open"));
      });
      observer.observe(bubble, { attributes: true, attributeFilter: ["class"] });
      return true;
    };

    // The script loads lazily — poll until its bubble exists, then observe.
    if (attach()) return () => observer?.disconnect();
    const timer = setInterval(() => {
      if (attach()) clearInterval(timer);
    }, 500);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
    };
  }, []);

  const toggleChat = () => {
    const bubble = document.getElementById(BUBBLE_ID);
    if (bubble) {
      bubble.click();
    } else {
      // Clicked before the lazy script finished loading — open once it does.
      pendingOpen.current = true;
    }
  };

  return (
    <>
      <Script
        id="spectrum-chat"
        src="https://chat.spectrumhq.in/chat.js"
        data-color="#1972F5"
        strategy="lazyOnload"
        onLoad={() => {
          if (pendingOpen.current) {
            pendingOpen.current = false;
            document.getElementById(BUBBLE_ID)?.click();
          }
        }}
      />

      {/* Our button replaces the widget's built-in launcher. */}
      <style>{`#${BUBBLE_ID} { display: none !important; }`}</style>

      <Button
        onClick={toggleChat}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-50 gap-1.5 rounded-full border border-neutral-200 px-3 py-2.5 h-[40px] font-inter text-base font-normal tracking-wide shadow-md [&_svg]:size-6"
      >
        <ChatIcon aria-hidden className="size-6 shrink-0" />
        {open ? "Close chat" : "Talk to us"}
      </Button>
    </>
  );
}
