import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Tailwind CSS Tips That Senior Devs Actually Use',
  excerpt:
    "Most Tailwind tutorials cover the basics. Here are the patterns and tricks that experienced developers use every day to write cleaner, faster UI code.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 16, 2026',
  readTime: '15 min read',
  icon: '🌊',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        So you know Tailwind CSS. You can slap <code>bg-blue-500</code> and <code>p-4</code> on things and call it a day. That&apos;s great, but it&apos;s just scratching the surface. Tailwind has a ton of power hiding beneath the basics, and once you learn these patterns, you&apos;ll wonder how you ever lived without them. I&apos;ve been using Tailwind in production React and Next.js projects for a while now, and these are the tips and tricks I reach for every single day. Whether you&apos;re building a design system, a SaaS dashboard, or a simple landing page, these patterns will make your frontend development faster and your code cleaner.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The cn() Helper: Your New Best Friend
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Tailwind CSS with React and you&apos;re not using a class merging helper, you&apos;re making your life unnecessarily hard. The <code>cn()</code> function combines <code>clsx</code> for conditional classes with <code>tailwind-merge</code> for smart class deduplication. This is the single most important utility in any Tailwind project.
      </p>

      <CodeBlock
        filename="utils.ts"
        language="typescript"
        code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Why this matters:
cn("px-4 py-2", "px-6")
// Result: "px-6 py-2"
// Without twMerge: "px-4 py-2 px-6" (conflict! Browser picks last one... maybe)

// Use it in components:
function Button({ className, ...props }) {
  return (
    <button className={cn("bg-primary text-white px-4 py-2 rounded", className)} {...props} />
  );
}

// Now users can override styles cleanly:
<Button className="px-8">Wide Button</Button>
// The px-4 from the base styles gets properly replaced by px-8`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why tailwind-merge Is Essential
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Without <code>tailwind-merge</code>, when you pass <code>px-8</code> to a component that has <code>px-4</code>, both classes end up in the DOM. CSS specificity becomes unpredictable. Sometimes the last class wins, sometimes it doesn&apos;t, depending on the order Tailwind generates them. <code>tailwind-merge</code> understands Tailwind&apos;s class system and removes the conflicting one. It&apos;s a must-have for any component library or design system.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Component Base  │     │  User Override   │     │  cn() Output    │
│                 │     │                 │     │                 │
│  "px-4 py-2    │────▶│  + "px-8        │────▶│  "px-8 py-2     │
│   bg-primary   │     │    bg-red-500"  │     │   bg-red-500    │
│   text-white"  │     │                 │     │   text-white"   │
└─────────────────┘     └─────────────────┘     └─────────────────┘

  Conflicting classes (px-4 vs px-8) are resolved automatically.
  Non-conflicting classes (py-2, text-white) pass through.`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Group and Peer Modifiers
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is one of Tailwind&apos;s most powerful features, and a lot of developers don&apos;t even know it exists. Group and peer modifiers let you style child or sibling elements based on another element&apos;s state, all without writing a single line of JavaScript.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Group Modifier
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Add <code>group</code> to a parent element. Now any child can react to the parent&apos;s hover, focus, or active state using <code>group-hover:</code>, <code>group-focus:</code>, and so on. This is perfect for card components where hovering anywhere on the card should highlight the title or show an arrow.
      </p>

      <CodeBlock
        filename="group-modifier.tsx"
        language="tsx"
        code={`// Group: style children when parent is hovered
<div className="group rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer">
  <h3 className="font-semibold group-hover:text-primary transition-colors">
    Card Title
  </h3>
  <p className="text-muted-foreground">
    Description text that stays the same
  </p>
  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
    →
  </span>
</div>

// Named groups for nested cases
<div className="group/card">
  <div className="group/button">
    <span className="group-hover/card:text-blue-500">
      Reacts to card hover
    </span>
    <span className="group-hover/button:text-red-500">
      Reacts to button hover
    </span>
  </div>
</div>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Peer Modifier
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Peer works similarly, but for siblings. Mark an element as <code>peer</code>, and its sibling can react to its state. This is incredibly useful for form validation where you want an error message to appear when an input is invalid.
      </p>

      <CodeBlock
        filename="peer-modifier.tsx"
        language="tsx"
        code={`// Peer: style sibling based on another sibling's state
<input className="peer" type="email" placeholder="Email" required />
<p className="invisible peer-invalid:visible text-red-500 text-sm mt-1">
  Please enter a valid email address
</p>

// Floating label pattern
<div className="relative">
  <input className="peer placeholder-transparent border rounded px-3 pt-5 pb-2" placeholder="Email" />
  <label className="absolute left-3 top-1 text-xs text-muted-foreground
    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
    transition-all">
    Email
  </label>
</div>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Important: Peer Element Must Come First
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>peer</code> element must appear before the element that references it in the DOM. This is a CSS limitation since the general sibling combinator (<code>~</code>) only looks forward. If your peer-styled element isn&apos;t working, check the order first.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Data Attribute Styling
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This one is a game-changer if you use headless UI libraries like Radix UI or Headless UI. These libraries add data attributes to elements to indicate state. Tailwind lets you style based on those attributes directly.
      </p>

      <CodeBlock
        filename="data-attributes.tsx"
        language="tsx"
        code={`// Style based on data attributes (works great with Radix UI)
<div className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
  Accordion header
</div>

// Sidebar that collapses
<aside className="data-[collapsed=true]:w-16 data-[collapsed=false]:w-64 transition-all">
  <nav>...</nav>
</aside>

// Loading states
<button className="data-[loading=true]:opacity-50 data-[loading=true]:pointer-events-none">
  Submit
</button>

// Custom state management with data attributes
<div data-active={isActive} className="data-[active=true]:ring-2 data-[active=true]:ring-primary">
  Selectable item
</div>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Why Data Attributes Beat Conditional Classes
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        With data attributes, your component template stays clean. Instead of a mess of ternary operators deciding which classes to apply, you set a data attribute and let CSS handle the styling. It&apos;s cleaner, more readable, and easier to debug.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Useful Patterns I Copy-Paste Every Day
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s my personal collection of Tailwind patterns I use constantly. Save these somewhere. You&apos;ll need them.
      </p>

      <CodeBlock
        filename="patterns.tsx"
        language="tsx"
        code={`// Truncate text with ellipsis
<p className="truncate">This long text will cut off with ...</p>

// Line clamp (show 2 lines max)
<p className="line-clamp-2">Long description that only shows two lines then cuts off</p>

// Aspect ratio container (great for video embeds)
<div className="aspect-video rounded-lg overflow-hidden">
  <img src={url} className="object-cover w-full h-full" alt="thumbnail" />
</div>

// Sticky header with backdrop blur
<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
  <nav>...</nav>
</header>

// Scroll area with bottom fade
<div className="relative">
  <div className="overflow-auto max-h-64">{content}</div>
  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
</div>

// Center anything (the classic)
<div className="flex items-center justify-center min-h-screen">
  <p>Perfectly centered</p>
</div>

// Responsive container with max-width
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Animation Classes and Transitions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind ships with some handy animation utilities, and adding custom ones is super easy. Good micro-interactions make your UI feel polished and professional.
      </p>

      <CodeBlock
        filename="animations.tsx"
        language="tsx"
        code={`// Built-in Tailwind animations
<div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
<div className="animate-pulse bg-muted h-4 w-32 rounded" />
<div className="animate-bounce">↓</div>

// Custom animation in tailwind.config
// animation: { "fade-in": "fadeIn 0.3s ease-out" }
<div className="animate-fade-in">I fade in smoothly</div>

// Transition everything on hover
<div className="transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-lg p-4 border">
  Hover me for a smooth scale and shadow effect
</div>

// Staggered animation with delay utilities
<div className="animate-fade-in delay-0">First item</div>
<div className="animate-fade-in delay-100">Second item (100ms later)</div>
<div className="animate-fade-in delay-200">Third item (200ms later)</div>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Performance Tip: Use transform and opacity
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When animating elements, stick to <code>transform</code> and <code>opacity</code> properties. These are GPU-accelerated and won&apos;t cause layout reflows. Avoid animating <code>width</code>, <code>height</code>, <code>top</code>, or <code>left</code> because those trigger expensive layout recalculations and make your UI feel sluggish.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Dark Mode with Tailwind
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind makes dark mode almost trivially easy. Just prefix any utility with <code>dark:</code> and it applies only in dark mode. The key is to think about dark mode from the start, not bolt it on later.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The Best Approach: Semantic Color Tokens
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Instead of writing <code>bg-white dark:bg-gray-900</code> everywhere, define semantic tokens like <code>bg-background</code> and <code>text-foreground</code> that automatically switch between themes. This way, you write the class once and it works in both modes. This is exactly how shadcn/ui and most modern design systems handle it.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Organizing Your Tailwind Code
      </h2>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────────────────────────────────────────────────┐
│                  Class Ordering Convention                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Layout        │  flex, grid, block, hidden              │
│  2. Positioning   │  relative, absolute, sticky, z-*        │
│  3. Sizing        │  w-*, h-*, min-*, max-*                 │
│  4. Spacing       │  p-*, m-*, gap-*                        │
│  5. Typography    │  text-*, font-*, leading-*              │
│  6. Visual        │  bg-*, border-*, rounded-*, shadow-*    │
│  7. Interactive   │  hover:*, focus:*, active:*             │
│  8. Responsive    │  sm:*, md:*, lg:*                       │
│                                                             │
│  Use prettier-plugin-tailwindcss to auto-sort classes!      │
└─────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Use Prettier to Sort Classes Automatically
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Install <code>prettier-plugin-tailwindcss</code> and never think about class order again. It sorts your Tailwind classes into a consistent order every time you save. This makes code reviews much easier because everyone&apos;s classes are in the same order.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Things to Avoid
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li><strong>Don&apos;t use @apply everywhere.</strong> It defeats the purpose of utility-first CSS. Use it only in global styles for things like base typography.</li>
          <li><strong>Don&apos;t fight the framework.</strong> If you find yourself writing lots of custom CSS, step back and check if Tailwind already has a utility for it.</li>
          <li><strong>Don&apos;t duplicate long class strings.</strong> Extract them into React components instead. That&apos;s the proper abstraction layer.</li>
          <li><strong>Don&apos;t ignore dark mode.</strong> Use <code>dark:</code> variants from the start. Adding them later is painful.</li>
          <li><strong>Don&apos;t skip the IntelliSense extension.</strong> It autocompletes classes, shows colors, and even previews values. Install it immediately.</li>
          <li><strong>Don&apos;t use arbitrary values when a utility exists.</strong> Writing <code>w-[16px]</code> when <code>w-4</code> does the same thing creates inconsistency.</li>
        </ul>
      </div>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        When Custom CSS Is Actually OK
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Complex animations, very specific pseudo-element usage, and third-party library overrides. These are cases where custom CSS is fine. The goal isn&apos;t to avoid CSS entirely. It&apos;s to use Tailwind for the 95% of styling that utilities handle well, and custom CSS for the remaining 5%.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tailwind v4: What&apos;s New
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 brought some big improvements. The new CSS-first configuration means you define your theme in CSS instead of a JavaScript config file. It&apos;s faster to compile, supports container queries natively, and has a smaller output size. If you haven&apos;t upgraded yet, it&apos;s worth doing. The migration is straightforward for most projects.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Key v4 Features for Web Development
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li><strong>CSS-first configuration:</strong> Define your theme in CSS using <code>@theme</code> instead of a JS config file.</li>
          <li><strong>Native container queries:</strong> Use <code>@container</code> utilities without plugins.</li>
          <li><strong>Faster builds:</strong> The new Oxide engine is significantly faster than v3.</li>
          <li><strong>Automatic content detection:</strong> No more configuring the <code>content</code> array in your config.</li>
          <li><strong>3D transforms:</strong> New utilities for <code>rotate-x</code>, <code>rotate-y</code>, and <code>perspective</code>.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Bottom Line
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Always use <code>cn()</code> for class merging in your React components. It&apos;s non-negotiable.</li>
          <li>Group and peer modifiers replace a lot of JavaScript for interactive styling.</li>
          <li>Data attribute styling works beautifully with headless UI libraries like Radix.</li>
          <li>Learn the utility patterns: truncate, line-clamp, aspect-ratio, sticky, backdrop-blur.</li>
          <li>Extract long class strings into components, not <code>@apply</code> rules.</li>
          <li>Install the Tailwind CSS IntelliSense extension and Prettier plugin. Your productivity will jump immediately.</li>
          <li>Upgrade to Tailwind v4 for better performance and native container query support.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind CSS is one of those tools that keeps rewarding you the more you learn. The basics get you pretty far, but these advanced patterns are what separate a good frontend developer from a great one. Start with <code>cn()</code> and the group modifier if you haven&apos;t already. You&apos;ll see the difference immediately.
      </p>
    </div>
  ),
};

export default blogPost;
