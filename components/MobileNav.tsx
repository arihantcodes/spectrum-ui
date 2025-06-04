"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import * as React from "react";

import { Icons } from "@/components/Icon";

import { ScrollArea } from "@/components/UI/ScrollArea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/UI/Sheet";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { Button } from "./UI/Button";

interface NavItem {
  title?: string;
  label?: string;
  href?: string;
  url?: string;
  value?: string;
  items: NavItem[];
  disabled?: boolean;
  event?: string;
  paid?: boolean;
  new?: boolean;
}

interface NavSection {
  title?: string;
  groupKey?: string;
  groupValue?: string;
  items: NavItem[];
  url?: string;
}

const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Blocks",
    href: "/blocks",
  },
];

const sidebarNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", items: [] },
      {
        title: "Installation",
        href: "/docs/installation",
        items: [],
      },
    ],
  },
  {
    title: "Components",
    groupKey: "components",
    groupValue: "Components",
    items: [
      { label: "Alert", value: "alert", url: "/docs/alert", items: [] },
      {
        label: "Animated SVG Chart",
        value: "animatedchart",
        url: "/docs/animatedchart",
        items: [],
      },
      {
        label: "Animated Testimonials",
        value: "animatedtestimonials",
        url: "/docs/animatedtestimonials",
        items: [],
      },
      {
        label: "Autosize Textarea",
        value: "autosize-textarea",
        url: "/docs/autosize-textarea",
        items: [],
      },
      { label: "Button", value: "button", url: "/docs/button", items: [] },
      { label: "Card", value: "card", url: "/docs/card", items: [] },
      {
        label: "Datetime Picker",
        value: "datetime-picker",
        url: "/docs/datetime-picker",
        items: [],
      },
      {
        label: "Dual Range Slider",
        value: "dual-range-slider",
        url: "/docs/dual-range-slider",
        items: [],
      },
      {
        label: "Event Calendar",
        value: "eventcalendar",
        url: "/docs/eventcalendar",
        items: [],
      },
      {
        label: "Event Badge",
        value: "eventbadge",
        url: "/docs/badge",
        new: true,
        items: [],
      },
      {
        label: "Feedback Card",
        value: "feedback",
        url: "/docs/feedback",
        items: [],
      },
      {
        label: "Floating Label Input",
        value: "floating-label-input",
        url: "/docs/floating-label-input",
        items: [],
      },
      { label: "Footer", value: "footer", url: "/docs/footer", items: [] },
      {
        label: "HTTP Status Code",
        value: "statuscode",
        url: "/docs/statuscode",
        items: [],
      },
      {
        label: "Image Preview",
        value: "imagepreview",
        url: "/docs/imagepreview",
        items: [],
      },
      {
        label: "Infinite Scroll",
        value: "infiniteScroll",
        url: "/docs/infinite-scroll",
        items: [],
      },
      { label: "Input", value: "input", url: "/docs/input", items: [] },
      {
        label: "Loading Button",
        value: "loading-button",
        url: "/docs/loading-button",
        items: [],
      },
      {
        label: "Multiple Selector",
        value: "multipleSelector",
        url: "/docs/multiple-selector",
        items: [],
      },
      {
        label: "Multistep Form",
        value: "multistepform",
        url: "/docs/multistepform",
        new: true,
        items: [],
      },
      { label: "Navbar", value: "navbar", url: "/docs/navbar", items: [] },
      {
        label: "Profile Dropdown",
        value: "profile-dropdown",
        url: "/docs/profile",
        new: true,
        items: [],
      },
      {
        label: "Progress With Value",
        value: "progress-with-value",
        url: "/docs/progress-with-value",
        items: [],
      },
      {
        label: "Responsive Modal",
        value: "responsive-modal",
        url: "/docs/responsive-modal",
        items: [],
      },
      { label: "Spinner", value: "spinner", url: "/docs/spinner", items: [] },
      {
        label: "Skeleton",
        value: "skeleton",
        url: "/docs/skeleton",
        items: [],
      },
    ],
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <Link
          href="/"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center h-16 px-4 border-b border-border"
        >
          <Icons.logo className="mr-2 size-4" />
          <span className="font-semibold">Spectrum UI</span>
        </Link>
        <ScrollArea className="h-[calc(100vh-4rem)] flex-1">
          <div className="flex flex-col space-y-4 p-4">
            {/* Main Navigation */}
            <div className="flex flex-col space-y-1.5">
              {mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setIsOpen}
                    >
                      {item.title}
                    </MobileLink>
                  )
              )}
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-col space-y-6">
              {sidebarNav.map((section, sectionIndex) => (
                <div
                  key={section.title || `section-${sectionIndex}`}
                  className="space-y-2"
                >
                  {section.title && (
                    <h4 className="font-medium text-sm text-muted-foreground px-2">
                      {section.title}
                    </h4>
                  )}

                  <div className="flex flex-col space-y-1">
                    {section.items.map((item) => (
                      <MobileLink
                        key={
                          item.value ||
                          item.href ||
                          `item-${item.title || item.label}`
                        }
                        href={item.url || item.href || "#"}
                        onOpenChange={setIsOpen}
                        className={item.new ? "relative" : ""}
                      >
                        {item.title || item.label}
                        {item.new && (
                          <span className="absolute right-2 top-1 px-1.5 py-0.5 text-[10px] font-medium rounded-sm bg-primary/20 text-primary">
                            NEW
                          </span>
                        )}
                      </MobileLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
        }}
        className={cn(
          "p-2 text-[15px] rounded-md flex items-center justify-between",
          isActive
            ? "bg-secondary font-medium text-primary border-l-2 border-primary/70"
            : "text-foreground hover:bg-secondary/50",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  );
}
