"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Component as ComponentIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const componentsList = [
  { name: "Accordion", description: "A vertically stacked set of interactive headings that each reveal an associated section of content.", href: "/docs/accordion" },
  { name: "Alert", description: "Displays a callout for user attention.", href: "/docs/alert" },
  { name: "Animated Card", description: "A beautifully animated card component.", href: "/docs/animatedcard" },
  { name: "Animated Chart", description: "Interactive and animated SVG charts.", href: "/docs/animatedchart" },
  { name: "Animated Drawer", description: "A modern, animated sliding drawer.", href: "/docs/animateddrawer" },
  { name: "Animated Testimonials", description: "An interactive, animated testimonials slider.", href: "/docs/animatedtestimonials" },
  { name: "Animated Text", description: "Text that animates playfully into view.", href: "/docs/animatedtext" },
  { name: "Autosize Textarea", description: "A textarea that automatically resizes to its content.", href: "/docs/autosize-textarea" },
  { name: "Badge", description: "Displays a small badge or label.", href: "/docs/badge" },
  { name: "Button", description: "Interactive button component with various styles.", href: "/docs/button" },
  { name: "Card", description: "Displays a card with header, content, and footer.", href: "/docs/card" },
  { name: "Datetime Picker", description: "A customizable date and time picker.", href: "/docs/datetime-picker" },
  { name: "Disclose Image", description: "An interactive image disclosure effect.", href: "/docs/discloseimage" },
  { name: "Dual Range Slider", description: "A slider with two handles for a range of values.", href: "/docs/dual-range-slider" },
  { name: "Event Calendar", description: "A premium event calendar component.", href: "/docs/eventcalendar" },
  { name: "Feedback", description: "A widget for submitting user feedback.", href: "/docs/feedback" },
  { name: "Floating Label Input", description: "Input field with a floating label animation.", href: "/docs/floating-label-input" },
  { name: "Footer", description: "Pre-designed footer sections for your site.", href: "/docs/footer" },
  { name: "Github Card", description: "A card displaying GitHub repository status.", href: "/docs/github-card" },
  { name: "Heading with Anchor", description: "A heading that includes an anchor link.", href: "/docs/heading-with-anchor" },
  { name: "Image Preview", description: "Preview images on click or hover.", href: "/docs/imagepreview" },
  { name: "Infinite Scroll", description: "Implement infinite scrolling lists.", href: "/docs/infinite-scroll" },
  { name: "Input", description: "Standard text input field.", href: "/docs/input" },
  { name: "Input Model", description: "An input with special modal behavior.", href: "/docs/input-model" },
  { name: "Kanban", description: "A draggable Kanban board UI.", href: "/docs/kanban" },
  { name: "Loading Button", description: "A button with a loading spinner state.", href: "/docs/loading-button" },
  { name: "Login", description: "Pre-built elegant login pages and forms.", href: "/docs/login" },
  { name: "Multiple Selector", description: "A dropdown that allows multiple selections.", href: "/docs/multiple-selector" },
  { name: "Multistep Form", description: "A multi-step form wizard layout.", href: "/docs/multistepform" },
  { name: "Navbar", description: "Pre-designed top navigation bars.", href: "/docs/navbar" },
  { name: "Product Card", description: "A card tailored for e-commerce products.", href: "/docs/product-card" },
  { name: "Profile", description: "User profile components and cards.", href: "/docs/profile" },
  { name: "Progress with Value", description: "A progress bar that displays its numerical value.", href: "/docs/progress-with-value" },
  { name: "Responsive Modal", description: "A modal that adjusts gracefully to screen sizes.", href: "/docs/responsive-modal" },
  { name: "Skeleton", description: "Placeholder loading states for content.", href: "/docs/skeleton" },
  { name: "Spinner", description: "A simple loading spinner.", href: "/docs/spinner" },
  { name: "Status Badge", description: "A badge indicating an operational status.", href: "/docs/status-badge" },
  { name: "Status Code", description: "UI for displaying HTTP status code states.", href: "/docs/statuscode" },
  { name: "Testimonials", description: "Elegant testimonial sections.", href: "/docs/testimonials" },
];

export default function DocsIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = componentsList.filter(comp =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground">
          Browse and search through all available Spectrum UI components.
        </p>
        <div className="relative max-w-lg mt-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search components..." 
            className="pl-10 h-11 text-base bg-background shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredComponents.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground flex flex-col items-center">
          <ComponentIcon className="h-12 w-12 mb-4 opacity-20" />
          <p>No components found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((comp) => (
            <Link key={comp.href} href={comp.href}>
              <div className="group relative rounded-xl border bg-card h-full transition-all hover:border-foreground/30 hover:shadow-md overflow-hidden">
                <div className="h-32 w-full bg-neutral-100 dark:bg-neutral-900 border-b flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors">
                  <ComponentIcon className="h-8 w-8 text-neutral-400 dark:text-neutral-600 transition-transform group-hover:scale-110" />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground tracking-tight">{comp.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {comp.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
