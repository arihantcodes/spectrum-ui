import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Dark Mode Done Right: A Practical Guide for Web Apps',
  excerpt:
    "Dark mode is more than inverting colors. Here's how to build dark mode that actually looks good and doesn't break your UI.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 12, 2026',
  readTime: '15 min read',
  icon: '🌙',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Dark mode is everywhere now. Every major app has it. Your users expect it. And honestly, as developers, most of us prefer coding in dark mode anyway. But here&apos;s the thing most tutorials don&apos;t tell you: building dark mode that actually looks good is way harder than just inverting your colors. A proper dark theme needs its own carefully crafted palette, its own design decisions, and its own testing. You can&apos;t just slap a CSS filter on your light theme and call it a day.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In this guide, I&apos;ll walk you through everything I&apos;ve learned about implementing dark mode in React and Next.js web apps using Tailwind CSS and CSS custom properties. We&apos;ll cover the theory behind good dark palettes, the technical implementation with design tokens, how to wire up theme switching without that annoying flash, and all the little design tips that separate amateur dark modes from professional ones. No shortcuts, no hacks, just the approach that actually works in production frontend development.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why &quot;Just Invert the Colors&quot; Doesn&apos;t Work
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The most common dark mode mistake is flipping white to black and black to white. It seems logical, right? But the result is almost always terrible. Pure black backgrounds (<code>#000000</code>) are harsh on the eyes. Pure white text on pure black has too much contrast, which causes eye strain during long reading sessions. Shadows that look great on light backgrounds become invisible on dark ones. And bright, saturated colors that pop nicely on white look like neon signs on dark backgrounds.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Good dark mode is a completely separate design exercise. It&apos;s not a filter you apply on top of your light theme. It&apos;s its own thing. Think of it like designing a second version of your UI, one where all the rules about depth, contrast, and emphasis get re-evaluated from scratch. This is why companies like Apple, Google, and Vercel invest serious design time into their dark themes. They know it&apos;s not a simple toggle.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let me show you the difference between a naive approach and a proper one. Look at how the light and dark themes use fundamentally different strategies for creating depth and hierarchy. This is the core mental model you need before writing a single line of CSS or Tailwind CSS.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────────┐          ┌─────────────────────┐
│    Light Theme       │          │    Dark Theme         │
│                     │          │                       │
│  BG: #FFFFFF        │          │  BG: #09090B          │
│  (pure white)       │          │  (very dark gray,     │
│                     │          │   NOT pure black)     │
│  Text: #0A0A0A      │          │  Text: #EDEDED        │
│  (near black)       │          │  (off-white, NOT      │
│                     │          │   pure white)         │
│  Card: #FFFFFF      │          │  Card: #111113        │
│  (same as bg)       │          │  (slightly lighter    │
│                     │          │   than bg)            │
│  Depth: shadows     │          │  Depth: lighter       │
│                     │          │  surface colors       │
└─────────────────────┘          └─────────────────────┘

  Light: depth via shadows  →  Dark: depth via surface lightness`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Foundation: Semantic Design Tokens
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The key to maintainable dark mode is semantic design tokens. Instead of using raw color values everywhere, you define meaningful variable names that change between themes. Your React components never reference colors directly. They use tokens like <code>background</code>, <code>foreground</code>, <code>card</code>, and <code>muted</code>. The tokens themselves switch when the theme changes. This is the exact same approach that shadcn/ui uses, and it&apos;s the industry standard for modern design system architecture.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The beauty of this approach is that your UI components never know which theme is active. They just reference tokens. When the theme changes, the CSS custom properties update and everything re-paints instantly. No JavaScript re-renders, no conditional classes scattered throughout your codebase. It&apos;s clean, performant, and scales beautifully across large frontend development projects.
      </p>

      <CodeBlock
        filename="theme-tokens.css"
        language="css"
        code={`/* Light theme tokens */
:root {
  --background: 0 0% 100%;        /* white */
  --foreground: 222 84% 5%;       /* near-black */
  --card: 0 0% 100%;              /* white */
  --card-foreground: 222 84% 5%;  /* near-black */
  --muted: 210 40% 96%;           /* light gray */
  --muted-foreground: 215 16% 47%; /* medium gray */
  --border: 214 32% 91%;          /* subtle gray */
  --primary: 222 84% 30%;         /* brand blue */
  --primary-foreground: 210 40% 98%; /* white */
  --destructive: 0 84% 60%;       /* red */
}

/* Dark theme - NOT just inverted! */
.dark {
  --background: 222 84% 5%;       /* very dark blue, not pure black */
  --foreground: 210 40% 98%;      /* off-white, not pure white */
  --card: 222 84% 7%;             /* slightly lighter than bg */
  --card-foreground: 210 40% 98%; /* off-white */
  --muted: 217 33% 17%;           /* dark gray with blue tint */
  --muted-foreground: 215 20% 65%; /* lighter than light theme's muted-fg */
  --border: 217 33% 17%;          /* subtle border */
  --primary: 217 91% 60%;         /* brighter blue (increased lightness) */
  --primary-foreground: 222 84% 5%; /* dark text on bright bg */
  --destructive: 0 63% 50%;       /* less saturated red */
}

/* Components just use the tokens. They never change. */
.card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why HSL Values?
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You might notice the tokens use HSL values without the <code>hsl()</code> wrapper. This is intentional and it&apos;s one of the cleverest tricks in modern CSS architecture. It lets you add opacity directly: <code>hsl(var(--primary) / 0.5)</code> gives you a 50% transparent version of your primary color. You can&apos;t do this with hex values. It&apos;s a small trick that gives you a ton of flexibility, especially for hover states, overlays, and glassmorphism effects. Once you start using this pattern, you&apos;ll wonder how you ever lived without it.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Naming Your Tokens
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use semantic names, not descriptive ones. <code>--background</code> is good because it means &quot;whatever the background color should be.&quot; <code>--dark-gray</code> is bad because dark gray has different meanings in light and dark themes. Every token name should describe its purpose, not its appearance. This principle is crucial when you&apos;re building a design system that needs to support multiple themes. If your token names describe colors instead of roles, they become meaningless when you add a third theme like high contrast or sepia.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The Foreground Pattern
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For every background token, define a matching foreground token. <code>--card</code> gets <code>--card-foreground</code>. <code>--primary</code> gets <code>--primary-foreground</code>. This ensures text is always readable against its background in both themes. shadcn/ui uses this pattern extensively and it works brilliantly. It&apos;s also great for accessibility because you can validate contrast ratios at the token level rather than checking every single component individually.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Token Naming Convention Summary
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Keep it simple: <code>background</code>, <code>foreground</code>, <code>card</code>, <code>card-foreground</code>, <code>popover</code>, <code>popover-foreground</code>, <code>primary</code>, <code>primary-foreground</code>, <code>secondary</code>, <code>secondary-foreground</code>, <code>muted</code>, <code>muted-foreground</code>, <code>accent</code>, <code>accent-foreground</code>, <code>destructive</code>, <code>destructive-foreground</code>, <code>border</code>, <code>input</code>, <code>ring</code>. That set covers 99% of what you&apos;ll need in any React application.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Token Design Flow:

┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│  Define       │     │  Map to CSS    │     │  Reference    │
│  Semantic     │────▶│  Custom        │────▶│  in Tailwind  │
│  Names        │     │  Properties    │     │  Config       │
└──────────────┘     └───────────────┘     └──────────────┘
       │                     │                      │
       ▼                     ▼                      ▼
  background            --background         bg-background
  card                  --card               bg-card
  primary               --primary            bg-primary
  muted                 --muted              bg-muted
  destructive           --destructive        bg-destructive

Each token auto-switches when .dark class is toggled.
Components never change. Only the CSS variables do.`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Implementing Theme Switching in Next.js
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>next-themes</code> library is the standard way to handle theming in Next.js apps. It handles system preference detection, persistence via localStorage, and the dreaded flash of wrong theme on page load. If you&apos;re doing any kind of frontend development with Next.js, this is the library you want. Here&apos;s the full setup from start to finish.
      </p>

      <CodeBlock
        filename="ThemeProvider.tsx"
        language="tsx"
        code={`// 1. Install: npm install next-themes
// 2. Create a provider wrapper

"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// 3. Wrap your layout
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// 4. Build a theme toggle
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-accent transition-colors"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Avoiding the Flash of Wrong Theme
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The flash happens because Next.js server-renders your page without knowing the user&apos;s theme preference. The page loads in light mode, then switches to dark mode after JavaScript runs. You get this ugly blink of white before the dark theme kicks in. It looks terrible and makes your app feel janky. <code>next-themes</code> handles this by injecting a tiny blocking script that sets the theme class before the page paints. That&apos;s why <code>suppressHydrationWarning</code> on the <code>html</code> tag is important: it prevents React from complaining about the mismatch between server and client.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Mounted Check Pattern
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Notice the <code>mounted</code> state in the toggle component. On the server, <code>next-themes</code> doesn&apos;t know the theme yet. If you render the Sun/Moon icon based on the theme during server rendering, it will mismatch with the client. The mounted check ensures you only render the icon after hydration, when the actual theme is known. This is a pattern you&apos;ll use in any client-side-dependent UI component in your React and Next.js applications.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The disableTransitionOnChange Prop
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You might wonder about the <code>disableTransitionOnChange</code> prop. Without it, when you toggle themes, every element with a CSS transition will animate between its light and dark colors. This creates a distracting ripple effect across the whole page. The prop temporarily disables all transitions during the switch so the theme change happens instantly and cleanly. Some designers actually prefer the animated transition, so this one&apos;s up to you, but most production apps disable it for a snappier feel.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Design Tips for a Beautiful Dark Theme
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Getting the technical implementation right is only half the battle. The design decisions are what make your dark mode look professional versus amateur. Here&apos;s what I&apos;ve learned from building dark themes for production web applications over the years. These tips apply whether you&apos;re building with Tailwind CSS, vanilla CSS, or any other styling approach.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Reduce Color Saturation
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Bright, saturated colors that look beautiful on a white background look like neon signs on dark backgrounds. This is because dark surfaces amplify the perceived brightness of colors. Reduce the saturation and increase the lightness of your accent colors for dark mode. A blue that&apos;s <code>hsl(222, 84%, 30%)</code> in light mode might become <code>hsl(217, 91%, 60%)</code> in dark mode: similar hue, but lighter and slightly less saturated. Your reds, greens, and yellows need the same treatment. The goal is colors that feel vibrant but comfortable, not blinding.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Elevation Instead of Shadows
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In light mode, shadows create a sense of depth. Cards float above the background because of their drop shadow. But shadows are nearly invisible on dark backgrounds because you can&apos;t make something darker than a near-black surface. Instead, use slightly lighter surface colors to create elevation. A card on a <code>#09090B</code> background should be <code>#111113</code>. A popup on top of that card should be even lighter. This is how Material Design handles dark mode, and it works great. The higher something is in the visual stack, the lighter its background color becomes.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Dark Mode Elevation Scale:

Layer 0 (base):     #09090B  ████████████████  Background
                        │
Layer 1 (card):     #111113  ████████████████  Cards, sidebars
                        │
Layer 2 (raised):   #1A1A1D  ████████████████  Dropdowns, popovers
                        │
Layer 3 (overlay):  #222226  ████████████████  Modals, dialogs
                        │
Layer 4 (top):      #2A2A2F  ████████████████  Tooltips, toasts

Each layer is slightly lighter. No shadows needed.
The lightness itself communicates depth.`}
        </pre>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Don&apos;t Use Pure Black
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        <code>#000000</code> is too harsh. It creates a &quot;hole&quot; effect where the background feels like it disappears into the void. Use a very dark gray with a slight color tint instead. <code>#09090B</code> has a tiny blue tint that feels cozy and warm. <code>#0A0A0A</code> is a neutral dark gray that works in any context. Both feel much more natural than pure black. Your users&apos; eyes will thank you during those late-night coding sessions and reading marathons.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mind Your Contrast Ratios
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        While you want to avoid too much contrast (pure white on pure black), you also need to maintain enough contrast for accessibility. WCAG requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. The sweet spot for dark mode body text is usually an off-white like <code>#EDEDED</code> or <code>#E0E0E0</code> on a dark background of <code>#09090B</code> to <code>#111113</code>. This gives you excellent readability without the harshness of pure white. Use browser DevTools or the axe accessibility checker to verify your ratios.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Handle Images and Illustrations
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Logos and illustrations designed for light backgrounds often look wrong on dark ones. White logos disappear. Bright illustrations clash with the subdued dark palette. You have a few options: provide dark mode variants of your images, add a subtle rounded background behind images using a slightly lighter surface color, or use CSS filters like <code>filter: brightness(0.9)</code> to slightly tone down images in dark mode. For hero images and photographs, a subtle brightness reduction goes a long way toward making them feel native to the dark theme.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Quick Tailwind Trick for Images
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Add <code>dark:brightness-90</code> to images that look too bright in dark mode. It&apos;s a subtle change that prevents images from being blinding on dark backgrounds. For SVG illustrations, consider using <code>currentColor</code> so they automatically adapt to the text color. And for logos, keep both a light and dark variant in your assets folder and swap them conditionally. It&apos;s a small effort that makes a massive difference in how polished your web development feels.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Using Dark Mode with Tailwind CSS
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind CSS makes dark mode styling straightforward with the <code>dark:</code> variant. But the real power comes from combining it with CSS custom properties for your design tokens. When you use the token-based approach, you rarely need the <code>dark:</code> prefix at all because the tokens handle the switch automatically. This is the approach that keeps your markup clean and your codebase maintainable as your design system grows.
      </p>

      <CodeBlock
        filename="tailwind-dark-mode.tsx"
        language="tsx"
        code={`// If you use semantic tokens, you rarely need dark: prefixes
// The tokens handle the switch automatically
<div className="bg-background text-foreground">
  <div className="bg-card border border-border rounded-lg p-4">
    <h3 className="text-card-foreground">Card Title</h3>
    <p className="text-muted-foreground">Description</p>
  </div>
</div>

// For cases where you DO need explicit dark mode styling:
<div className="bg-white dark:bg-zinc-900">
  <img
    src="/logo.svg"
    className="dark:invert"  // Invert logo for dark mode
  />
  <div className="shadow-md dark:shadow-none dark:border dark:border-border">
    In light mode: shadow. In dark mode: border instead.
  </div>
</div>

// Ring and focus styles that adapt
<input className="ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" />`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        When to Use dark: Prefix vs Tokens
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a simple rule of thumb: use tokens for all your standard UI components. Colors, backgrounds, text, borders, everything that&apos;s part of your design system should go through tokens. Use the <code>dark:</code> prefix only for one-off overrides, like adjusting image brightness, swapping between shadow and border strategies, or handling third-party content that doesn&apos;t use your token system. If you find yourself using <code>dark:</code> on more than 10% of your elements, you probably need more tokens.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Problems and How to Fix Them
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Even with a solid architecture, dark mode bugs will sneak in. Here are the most common ones I&apos;ve encountered across dozens of React and Next.js projects, along with their fixes. Bookmark this section because you&apos;ll come back to it.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-3 list-disc list-inside ml-4">
          <li><strong>Flash of wrong theme on load:</strong> Use <code>next-themes</code> with <code>suppressHydrationWarning</code> on the html tag. The library injects a blocking script to set the theme class before paint.</li>
          <li><strong>Hard-coded colors in your codebase:</strong> Search for <code>bg-white</code>, <code>text-black</code>, <code>bg-gray-</code>, or hex values. Replace them with semantic tokens like <code>bg-background</code> and <code>text-foreground</code>. This is the single biggest source of dark mode bugs.</li>
          <li><strong>Third-party components ignoring dark mode:</strong> Override their CSS variables or wrap them with your own themed container. Some libraries let you pass a theme prop directly.</li>
          <li><strong>Borders disappearing in dark mode:</strong> Light gray borders are invisible on dark backgrounds. Use separate border color tokens for each theme, or use <code>border-border</code> which automatically adapts.</li>
          <li><strong>Charts and data visualizations:</strong> Most charting libraries support theming. Pass your token colors to the chart config. Don&apos;t use fixed color arrays that only work on one background.</li>
          <li><strong>User-generated content:</strong> If users can write rich text or embed content, you might need to inject a theme-aware stylesheet into their content area to ensure readability.</li>
          <li><strong>Code blocks and syntax highlighting:</strong> You need separate syntax themes for light and dark mode. Libraries like Shiki support this natively with dual theme configuration.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Testing Your Dark Mode Implementation
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t just toggle dark mode and glance at a couple of pages. Dark mode bugs hide in unexpected places: inside modals you rarely open, in error states you never trigger during dev, in third-party components you forgot about. Here&apos;s a thorough testing approach that catches everything.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Manual Testing Checklist
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Visit every page in your app in dark mode. Don&apos;t skip any.</li>
          <li>Check all modal dialogs, dropdowns, and popovers. These are the most commonly missed.</li>
          <li>Look at form states: empty, filled, error, disabled, focused. Each one needs to work.</li>
          <li>Check loading states, skeleton screens, and empty states.</li>
          <li>Toggle between themes rapidly. Watch for flashes or layout shifts.</li>
          <li>Test with the system theme preference set to both light and dark.</li>
          <li>Check on mobile. Some dark mode bugs only appear on smaller screens where layout differences expose hidden elements.</li>
          <li>Review any email templates or notification toasts that might use inline styles.</li>
        </ul>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Automated Checks
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Add visual regression tests for both themes using tools like Playwright or Chromatic. Run contrast ratio checks with axe-core to ensure text remains readable in dark mode. And consider adding a Storybook dark mode toggle so designers can review UI components in both themes without running the full application. If you&apos;re using Playwright, you can set the color scheme preference in your test configuration and run your entire test suite twice, once per theme.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        CI Pipeline Integration
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best teams add dark mode visual regression checks to their CI pipeline. Every pull request generates screenshots in both themes. This catches dark mode regressions before they ship. Tools like Chromatic make this easy by capturing stories in multiple viewports and themes automatically. It takes some setup but saves countless hours of manual QA down the road.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Beyond Light and Dark: Supporting Multiple Themes
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once you have the token system in place, adding more themes is surprisingly easy. A high-contrast theme for accessibility, a dim theme for AMOLED screens, or brand-specific themes for white-label products. Each theme is just a new set of CSS variable values under a different class name. Your React components don&apos;t change at all. This is the ultimate payoff of the token-based architecture. The upfront investment pays dividends every time you need a new visual variant.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Some applications even let users customize their own theme by picking accent colors. With the token approach, this is as simple as updating a few CSS custom properties based on user preferences. Notion, Linear, and GitHub all use variations of this pattern to let users personalize their experience while maintaining overall design consistency.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Performance Consideration
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CSS custom properties update instantly without any JavaScript overhead. When you switch themes, the browser recalculates styles in a single pass. It&apos;s extremely fast, usually under a millisecond even on mobile devices. There&apos;s no performance penalty for supporting multiple themes this way, which is one more reason to use the token-based approach for your web development projects. Compare this to approaches that use JavaScript to swap class names on individual elements, and the performance advantage is massive.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Bottom Line
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Dark mode needs its own carefully designed palette. Never just invert your light theme.</li>
          <li>Use CSS custom properties (design tokens) so components work in both themes without any changes.</li>
          <li>Avoid pure black. Use very dark grays with a slight color tint like <code>#09090B</code>.</li>
          <li>Reduce color saturation for dark backgrounds. Bright colors become neon on dark surfaces.</li>
          <li>Use elevation (lighter surfaces) instead of shadows for depth in dark mode.</li>
          <li>Use <code>next-themes</code> for easy, flash-free theme switching in Next.js.</li>
          <li>Search your codebase for hard-coded colors and replace them with semantic tokens.</li>
          <li>Test every page, modal, and component state in dark mode. Bugs love to hide in overlooked corners.</li>
          <li>Maintain proper contrast ratios for accessibility compliance.</li>
          <li>Consider supporting additional themes beyond just light and dark for a truly flexible design system.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Dark mode done right isn&apos;t a feature you bolt on at the end. It&apos;s a design decision you make at the start. Set up your token system early, design both palettes intentionally, and your UI will look great in any theme your users choose. The extra effort you put into getting dark mode right will pay off in user satisfaction, reduced eye strain complaints, and an app that feels truly polished at every hour of the day. Whether you&apos;re building a side project with Next.js or a production design system used by thousands, these principles will serve you well.
      </p>
    </div>
  ),
};

export default blogPost;
