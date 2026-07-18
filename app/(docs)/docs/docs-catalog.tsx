'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Component as ComponentIcon } from 'lucide-react';

type ComponentItem = { name: string; description: string; href: string };
type Category = { name: string; components: ComponentItem[] };

const categories: Category[] = [
  {
    name: 'Layout & Structure',
    components: [
      {
        name: 'Accordion',
        description:
          'A vertically stacked set of interactive headings that each reveal an associated section of content.',
        href: '/docs/accordion',
      },
      {
        name: 'Card',
        description: 'Displays a card with header, content, and footer.',
        href: '/docs/card',
      },
      {
        name: 'Infinite Scroll',
        description: 'Implement infinite scrolling lists.',
        href: '/docs/infinite-scroll',
      },
      { name: 'Kanban', description: 'A draggable Kanban board UI.', href: '/docs/kanban' },
    ],
  },
  {
    name: 'Forms & Inputs',
    components: [
      {
        name: 'Floating Label Input',
        description: 'Input field with a floating label animation.',
        href: '/docs/floating-label-input',
      },
      {
        name: 'Autosize Textarea',
        description: 'A textarea that automatically resizes to its content.',
        href: '/docs/autosize-textarea',
      },
      {
        name: 'Datetime Picker',
        description: 'A customizable date and time picker.',
        href: '/docs/datetime-picker',
      },
      {
        name: 'Dual Range Slider',
        description: 'A slider with two handles for a range of values.',
        href: '/docs/dual-range-slider',
      },
      {
        name: 'Multiple Selector',
        description: 'A dropdown that allows multiple selections.',
        href: '/docs/multiple-selector',
      },
      {
        name: 'Multistep Form',
        description: 'A multi-step form wizard layout.',
        href: '/docs/multistepform',
      },
      {
        name: 'Input Model',
        description: 'An input with special modal behavior.',
        href: '/docs/input-model',
      },
      {
        name: 'Animated Switch',
        description: 'An iOS-style toggle switch with a stretchy knob you can drag or flick.',
        href: '/docs/animated-switch',
      },
      {
        name: 'Face Rating',
        description: 'A five-level rating input where an SVG face morphs between moods.',
        href: '/docs/face-rating',
      },
      {
        name: 'Password Strength',
        description:
          'A password input with an animated strength meter and requirements checklist.',
        href: '/docs/password-strength',
      },
      {
        name: 'Quantity Stepper',
        description:
          'A quantity input with rolling digits, hold-to-repeat buttons, and boundary shake.',
        href: '/docs/quantity-stepper',
      },
      {
        name: 'Star Rating',
        description: 'An animated star rating input with hover preview and sparkle burst effects.',
        href: '/docs/star-rating',
      },
      {
        name: 'Task Checkbox',
        description:
          'A todo checkbox that celebrates completion with a confetti burst and strikethrough.',
        href: '/docs/task-checkbox',
      },
    ],
  },
  {
    name: 'Buttons & Actions',
    components: [
      {
        name: 'Button',
        description: 'Interactive button component with various styles.',
        href: '/docs/button',
      },
      {
        name: 'Loading Button',
        description: 'A button with a loading spinner state.',
        href: '/docs/loading-button',
      },
      {
        name: 'Feedback',
        description: 'A widget for submitting user feedback.',
        href: '/docs/feedback',
      },
      { name: 'Alert', description: 'Displays a callout for user attention.', href: '/docs/alert' },
      {
        name: 'Follow Button',
        description: 'A follow button that morphs its width, fill, and label between states.',
        href: '/docs/follow-button',
      },
      {
        name: 'Hold to Confirm',
        description:
          'A press-and-hold button that fills a progress ring before confirming destructive actions.',
        href: '/docs/hold-to-confirm',
      },
      {
        name: 'Like Button',
        description: 'A heart button that pops with a particle burst and rolling count.',
        href: '/docs/like-button',
      },
      {
        name: 'Morph Button',
        description: 'An async button that morphs between idle, loading, success, and error states.',
        href: '/docs/morph-button',
      },
      {
        name: 'Notification Bell',
        description: 'A bell button that swings on new notifications with a rolling unread badge.',
        href: '/docs/notification-bell',
      },
      {
        name: 'Reaction Bar',
        description: 'A Slack-style emoji reaction bar with animated chips and rolling counts.',
        href: '/docs/reaction-bar',
      },
      {
        name: 'Share Button',
        description: 'A share button that fans out into copy-link and custom share actions.',
        href: '/docs/share-button',
      },
    ],
  },
  {
    name: 'Status & Progress',
    components: [
      { name: 'Badge', description: 'Displays a small badge or label.', href: '/docs/badge' },
      {
        name: 'Status Badge',
        description: 'A badge indicating an operational status.',
        href: '/docs/status-badge',
      },
      {
        name: 'Progress with Value',
        description: 'A progress bar that displays its numerical value.',
        href: '/docs/progress-with-value',
      },
      { name: 'Spinner', description: 'A simple loading spinner.', href: '/docs/spinner' },
      {
        name: 'Undo Pill',
        description: 'An inline undo pill with a draining countdown ring that pauses on hover.',
        href: '/docs/undo-pill',
      },
    ],
  },
  {
    name: 'Data & Content',
    components: [
      {
        name: 'Animated Chart',
        description: 'Interactive and animated SVG charts.',
        href: '/docs/animatedchart',
      },
      { name: 'Profile', description: 'User profile components and cards.', href: '/docs/profile' },
      {
        name: 'Avatar Stack',
        description:
          'An overlapping avatar row that fans apart on hover with springy name tooltips.',
        href: '/docs/avatar-stack',
      },
      {
        name: 'Kbd Key',
        description: 'A 3D keycap that physically depresses when the matching key is pressed.',
        href: '/docs/kbd-key',
      },
    ],
  },
  {
    name: 'Media & Overlays',
    components: [
      {
        name: 'Animated Card',
        description: 'A beautifully animated card component.',
        href: '/docs/animatedcard',
      },
      {
        name: 'Animated Drawer',
        description: 'A modern, animated sliding drawer.',
        href: '/docs/animateddrawer',
      },
      {
        name: 'Image Preview',
        description: 'Preview images on click or hover.',
        href: '/docs/imagepreview',
      },
      {
        name: 'Login',
        description: 'Pre-built elegant login pages and forms.',
        href: '/docs/login',
      },
      {
        name: '3D Tilt Card',
        description: 'A 3D card that tilts toward the pointer with parallax depth and glare.',
        href: '/docs/tilt-card',
      },
      {
        name: 'Scratch Card',
        description: 'A scratch-to-reveal card that wipes away a canvas foil overlay on drag.',
        href: '/docs/scratch-card',
      },
      {
        name: 'Swipe to Delete',
        description: 'A swipeable list item that reveals an iOS-style delete action on drag.',
        href: '/docs/swipe-to-delete',
      },
    ],
  },
];

const allComponents = categories.flatMap((cat) =>
  cat.components.map((c) => ({ ...c, category: cat.name })),
);

const sortedComponents = [...allComponents].sort((a, b) => a.name.localeCompare(b.name));

const slugOf = (href: string) => href.replace('/docs/', '');

/** One table cell — component name only, used in both browse and search views */
function ComponentRow({ item }: { item: ComponentItem }) {
  return (
    <div className="group relative border-b border-r border-black/[0.06] dark:border-white/[0.08]">
      <Link
        href={item.href}
        className="flex h-11 items-center justify-center gap-1.5 px-4 text-sm font-medium leading-5 text-[#404040] antialiased transition-colors duration-150 hover:bg-black/[0.02] hover:text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/20 dark:text-neutral-300 dark:hover:bg-white/[0.04] dark:hover:text-neutral-50 dark:focus-visible:ring-white/30"
      >
        <span className="truncate">{item.name}</span>
        {/* Negative margin cancels the arrow's footprint so the name stays truly centered */}
        <ArrowUpRight className="-mr-5 h-3.5 w-3.5 shrink-0 -translate-x-0.5 text-[#a3a3a3] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
      </Link>
    </div>
  );
}

export function DocsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    return sortedComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query),
    );
  }, [query]);

  return (
    // A minimum height keeps the docs card from collapsing while searching,
    // so the pager below doesn't jump around.
    <div className="min-h-[600px] w-full">
      {/* Header — introduction on the left, search on the right */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-2xl leading-10 text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            React components and blocks
          </h1>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Spectrum UI is an open-source React component and block library featuring
            animation-ready, copy-paste components built with React, Next.js, Tailwind CSS, Motion,
            TypeScript, and shadcn/ui for SaaS dashboards, landing pages, AI applications, and admin
            panels.
          </p>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Choose a component, copy its source or add it with the shadcn CLI, and keep the source in
            your project. Components can be adapted to the project&apos;s design system and application
            requirements.
          </p>
          <p className="mt-3 tracking-wide text-[15px] text-neutral-600  font-normal dark:text-neutral-300 leading-7">
            Components are authored in TypeScript, and each documentation page lists the source and
            dependencies for that implementation. You can also connect the{' '}
            <Link
              href="/docs/mcp"
              className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
            >
              Spectrum UI MCP server
            </Link>{' '}
            so your AI editor can add components for you.
          </p>
        </div>
        {/* <div className="group relative w-full sm:w-80 lg:w-72 lg:shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3a3a3] transition-colors duration-150 group-focus-within:text-[#686868] dark:text-neutral-500 dark:group-focus-within:text-neutral-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search components..."
            className="h-10 w-full rounded-[10px] border border-black/[0.08] bg-white pl-9 pr-9 text-sm text-[#262626] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#a3a3a3] hover:border-black/[0.14] focus:border-black/[0.18] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.02] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:hover:border-white/20 dark:focus:border-white/25 dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#a3a3a3] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626] dark:text-neutral-500 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div> */}
      </div>

      {/* Components */}
      <div className="mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <h2
          id="components"
          className="scroll-m-24 font-regular text-xl font-medium leading-7 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50"
        >
          Components
        </h2>
        <p className="mt-1 font-inter text-[13px] leading-5 tracking-wide text-neutral-500 dark:text-neutral-400">
          {allComponents.length} components that you can copy into your project.
        </p>
      </div>

      {query ? (
        /* ---------- Search results ---------- */
        results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-black/[0.12] py-24 text-center dark:border-white/15">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
              <ComponentIcon className="h-5 w-5 text-[#a3a3a3] dark:text-neutral-500" />
            </div>
            <p className="text-sm font-medium text-[#262626] dark:text-neutral-100">
              No components found
            </p>
            <p className="mt-1 text-[13px] leading-5 text-[#686868] dark:text-neutral-400">
              Nothing matches &ldquo;{searchQuery}&rdquo;. Try a different keyword.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-5 h-8 rounded-[10px] border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-[#262626] transition-all duration-150 hover:border-black/[0.16] hover:bg-black/[0.02] active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-neutral-100 dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 font-mono text-[13px] leading-4 text-[#686868] dark:text-neutral-400">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}
              &rdquo;
            </p>
            <div className="overflow-hidden rounded-[14px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]">
              <div className="overflow-hidden">
                <div className="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((c) => (
                    <ComponentRow key={c.href} item={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        /* ---------- Browse: one flat table, three centered names per row ---------- */
        <div
          className="animate-fade-up overflow-hidden rounded-[14px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
          style={{ animationDelay: '120ms' }}
        >
          {/* -mr/-mb tuck the outermost cell borders under the container edge */}
          <div className="overflow-hidden">
            <div className="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sortedComponents.map((c) => (
                <ComponentRow key={c.href} item={c} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
