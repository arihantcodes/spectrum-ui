import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "View Transitions API: Building Smooth Page Animations Without JavaScript",
  excerpt:
    "Learn how the View Transitions API enables native-feeling page transitions in web apps. Build cinematic route animations, shared element transitions, and smooth state changes with minimal code.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 20, 2026',
  readTime: '18 min read',
  icon: '✨',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        For years, building smooth page transitions on the web meant reaching for JavaScript animation libraries. Framer Motion, GSAP, Barba.js — we stacked dependency on dependency just to get a simple crossfade between routes. Native mobile apps had buttery smooth transitions built into the platform, while the web felt stuck with jarring, instant page swaps. That era is over. The View Transitions API is a browser-native solution that lets you animate between DOM states — including full page navigations — with CSS alone. No JavaScript animation libraries required. No complex state management. No fighting with AnimatePresence. The browser captures a snapshot of your old page, captures the new page, and animates between them using CSS. It&apos;s the single biggest improvement to web animations since CSS transitions were introduced, and it fundamentally changes how we think about page navigation on the web.
      </p>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        In this guide, we&apos;ll go deep into the View Transitions API. We&apos;ll cover the fundamentals of how it works under the hood, how to implement it in vanilla JavaScript and in Next.js applications, how to build shared element transitions that rival native mobile apps, and how to create advanced animation patterns that will make your users think they&apos;re using a native application. Whether you&apos;re building a single-page app, a multi-page site, or anything in between, the View Transitions API gives you a powerful new primitive for creating delightful navigation experiences.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        How the View Transitions API Works
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Before we write any code, let&apos;s understand what the browser is actually doing when you trigger a view transition. The process is surprisingly elegant and happens in four distinct phases. The browser captures a screenshot of the current DOM state, takes a snapshot, creates a tree of pseudo-elements to hold both the old and new states, animates between them using CSS animations, and finally reveals the new DOM state. This all happens in a single frame-synchronous operation, which is why it feels so smooth.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`View Transitions API: Complete Lifecycle

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. CAPTURE      │────▶│  2. SNAPSHOT     │────▶│  3. ANIMATE      │────▶│  4. REVEAL       │
│  Old DOM State   │     │  Create Pseudo   │     │  CSS Transitions │     │  New DOM State   │
│                  │     │  Element Tree    │     │  Between States  │     │                  │
│  Browser takes   │     │  ::view-transition│     │  Old fades out   │     │  Pseudo-elements │
│  a rasterized    │     │  root element    │     │  New fades in    │     │  are removed     │
│  screenshot of   │     │  holds both old  │     │  (or custom      │     │  New DOM is now  │
│  current page    │     │  and new images  │     │  animation)      │     │  fully visible   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘

         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
   document.start         Callback runs           CSS @keyframes          transition.finished
   ViewTransition()       to update DOM           execute on              Promise resolves
   is called              (sync or async)         pseudo-elements

Timeline:  ──────────────────────────────────────────────────────────────────────────▶
           Frame 0              Frame 1            Frames 2-N              Final Frame

Key Insight: The old state is a SCREENSHOT (raster image).
             The new state is a LIVE DOM snapshot.
             The browser animates between these two layers.`}
        </pre>
      </div>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The critical insight here is that the old state is a rasterized image — a flat screenshot. It&apos;s not live DOM anymore. The new state, however, is the actual live DOM. This means the transition is essentially animating from a picture of the old page to the real new page. This design choice is what makes view transitions so performant. The browser doesn&apos;t need to keep two live DOM trees in memory. It only needs one screenshot and one live DOM.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Browser Support and Progressive Enhancement
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        As of early 2026, the View Transitions API has excellent browser support. Chrome and Edge have had full support since version 111. Safari added support in version 18. Firefox shipped support in version 129. This means the vast majority of users on modern browsers can experience view transitions. However, you should always implement progressive enhancement so that users on older browsers still get a functional experience — they just won&apos;t see the animations.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Feature Detection
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The best practice is to check for API support before attempting to use it. If the API isn&apos;t available, simply update the DOM directly without any transition. The user still gets the correct content — they just don&apos;t see the animation. This is the beauty of progressive enhancement: the core functionality always works, and the animation is a layer on top.
      </p>

      <CodeBlock
        filename="feature-detection.ts"
        language="typescript"
        code={`// Feature detection for View Transitions API
function navigateWithTransition(updateCallback: () => void) {
  // Check if the API is supported
  if (!document.startViewTransition) {
    // Fallback: just update the DOM directly
    updateCallback();
    return;
  }

  // Use the View Transitions API
  const transition = document.startViewTransition(() => {
    updateCallback();
  });

  // You can also handle errors gracefully
  transition.finished.catch((err) => {
    console.warn('View transition failed:', err);
  });
}

// CSS-based feature detection
// In your global CSS:
// @supports (view-transition-name: none) {
//   /* View Transitions are supported */
//   ::view-transition-old(root),
//   ::view-transition-new(root) {
//     animation-duration: 300ms;
//   }
// }`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Fallback Strategies
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li>Use <code>@supports (view-transition-name: none)</code> in CSS to conditionally apply transition styles.</li>
        <li>Check <code>document.startViewTransition</code> existence in JavaScript before calling it.</li>
        <li>Provide CSS-only fallback animations using standard <code>@keyframes</code> for older browsers.</li>
        <li>Use a polyfill like <code>view-transitions-polyfill</code> if you absolutely need cross-browser support now, though native support is broad enough for most production apps.</li>
        <li>Test with DevTools throttling to ensure transitions degrade gracefully on slower devices.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Pseudo-Element Architecture
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When a view transition runs, the browser creates a tree of pseudo-elements that overlay the page. Understanding this tree is essential for customizing your transitions. The root pseudo-element contains groups, and each group contains an old and new image pair. By default, there&apos;s just one group for the entire page (called &quot;root&quot;), but you can create named groups for individual elements to get shared element transitions.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Pseudo-Element Tree During a View Transition

::view-transition                          ← Root overlay (covers entire viewport)
├── ::view-transition-group(root)          ← Container for the full-page transition
│   ├── ::view-transition-image-pair(root) ← Holds old + new screenshots
│   │   ├── ::view-transition-old(root)    ← Screenshot of OLD page (fading out)
│   │   └── ::view-transition-new(root)    ← Live snapshot of NEW page (fading in)
│   │
├── ::view-transition-group(hero-image)    ← Named group (shared element)
│   ├── ::view-transition-image-pair(hero-image)
│   │   ├── ::view-transition-old(hero-image)  ← Old hero image position/size
│   │   └── ::view-transition-new(hero-image)  ← New hero image position/size
│   │
├── ::view-transition-group(page-title)    ← Another named group
│   ├── ::view-transition-image-pair(page-title)
│   │   ├── ::view-transition-old(page-title)
│   │   └── ::view-transition-new(page-title)
│   │
└── ::view-transition-group(card-42)       ← Dynamic named group
    ├── ::view-transition-image-pair(card-42)
    │   ├── ::view-transition-old(card-42)
    │   └── ::view-transition-new(card-42)

Key Points:
• ::view-transition-old is ALWAYS a replaced element (like <img>)
• ::view-transition-new is ALSO a replaced element (screenshot of new state)
• ::view-transition-group animates width, height, and transform
• You can target ANY of these with CSS to customize animations
• Named groups enable shared element transitions (elements morph between states)`}
        </pre>
      </div>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Each pseudo-element in this tree can be targeted with CSS. The <code>::view-transition-old</code> and <code>::view-transition-new</code> pseudo-elements are what you&apos;ll style most often. By default, the old state fades out while the new state fades in. But you can override this with any CSS animation you want — slides, scales, rotations, or completely custom keyframes.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Basic View Transitions
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Let&apos;s start with the simplest possible view transition. The <code>document.startViewTransition()</code> method is the entry point for all same-document transitions. You pass it a callback function that updates the DOM. The browser handles everything else — capturing the old state, running the callback, capturing the new state, and animating between them.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Same-Document Transitions
      </h3>

      <CodeBlock
        filename="basic-transition.ts"
        language="typescript"
        code={`// The simplest possible view transition
document.startViewTransition(() => {
  // Update the DOM however you want
  document.querySelector('.content').innerHTML = newContent;
});

// With async operations (e.g., fetching data)
document.startViewTransition(async () => {
  const data = await fetch('/api/page-data').then(r => r.json());
  document.querySelector('.content').innerHTML = renderPage(data);
});

// The returned ViewTransition object gives you control
const transition = document.startViewTransition(() => {
  updateDOM();
});

// Wait for different phases
transition.ready.then(() => {
  // The pseudo-elements are created — you can start custom animations
  console.log('Pseudo-elements ready');
});

transition.updateCallbackDone.then(() => {
  // The DOM update callback has finished
  console.log('DOM updated');
});

transition.finished.then(() => {
  // The entire transition animation is complete
  console.log('Transition complete');
});

// Skip the transition if needed
transition.skipTransition();`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Cross-Document Transitions (Multi-Page Apps)
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Cross-document view transitions work for traditional multi-page applications where each navigation is a full page load. This is huge because it means server-rendered sites, PHP apps, Rails apps, and even static HTML sites can now have smooth page transitions without a single line of JavaScript. You enable them with a CSS rule and a meta tag.
      </p>

      <CodeBlock
        filename="cross-document.html"
        language="html"
        code={`<!-- Add this meta tag to BOTH the source and destination pages -->
<head>
  <meta name="view-transition" content="same-origin" />

  <style>
    /* Customize the default crossfade */
    ::view-transition-old(root) {
      animation: fade-out 300ms ease-out;
    }

    ::view-transition-new(root) {
      animation: fade-in 300ms ease-in;
    }

    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Named elements that persist across pages */
    .site-header {
      view-transition-name: site-header;
    }

    .hero-image {
      view-transition-name: hero-image;
    }

    /* The header won't crossfade — it will morph in place */
    ::view-transition-group(site-header) {
      animation-duration: 0s;
    }
  </style>
</head>`}
      />

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Cross-document transitions are the most exciting part of this API. They bring SPA-like smoothness to traditional multi-page architectures. Your server-rendered pages can now transition as smoothly as a React SPA, without any client-side routing framework. The only requirement is that both pages are on the same origin and both opt in with the meta tag.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Styling the Pseudo-Elements
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The default transition is a simple crossfade, which works well for many cases. But you can completely customize the animation by targeting the pseudo-elements with CSS. The <code>::view-transition-old</code> pseudo-element represents the outgoing state, and <code>::view-transition-new</code> represents the incoming state. You can apply any CSS animation to either of them.
      </p>

      <CodeBlock
        filename="custom-transitions.css"
        language="css"
        code={`/* Slide transition: old page slides left, new page slides in from right */
::view-transition-old(root) {
  animation: slide-out-left 400ms ease-in-out;
}

::view-transition-new(root) {
  animation: slide-in-from-right 400ms ease-in-out;
}

@keyframes slide-out-left {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slide-in-from-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Scale + fade transition (great for modal-like navigations) */
::view-transition-old(root) {
  animation: scale-fade-out 300ms ease-in;
}

::view-transition-new(root) {
  animation: scale-fade-in 300ms ease-out;
}

@keyframes scale-fade-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
}

@keyframes scale-fade-in {
  from { transform: scale(1.05); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    animation-duration: 0s;
  }
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        View Transitions in Next.js
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Next.js has embraced the View Transitions API with experimental support in the App Router. This integration makes it incredibly easy to add smooth route transitions to your Next.js applications. The framework handles the timing of DOM updates and coordinates with the browser&apos;s transition lifecycle, so you can focus on designing the animations rather than managing state.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Setting Up View Transitions in Next.js
      </h3>

      <CodeBlock
        filename="next.config.ts"
        language="typescript"
        code={`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;`}
      />

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        With the flag enabled, Next.js will automatically wrap route changes in <code>document.startViewTransition()</code>. Every time a user navigates between pages using <code>next/link</code> or <code>router.push()</code>, the browser will capture the old state, update to the new route, and animate between them. The default animation is a crossfade, but you can customize it with CSS.
      </p>

      <CodeBlock
        filename="app/globals.css"
        language="css"
        code={`/* Global transition styles for Next.js App Router */

/* Default crossfade for all route changes */
::view-transition-old(root) {
  animation: fade-and-scale-out 250ms ease-out forwards;
}

::view-transition-new(root) {
  animation: fade-and-scale-in 250ms ease-in forwards;
}

@keyframes fade-and-scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.98);
  }
}

@keyframes fade-and-scale-in {
  from {
    opacity: 0;
    transform: scale(1.02);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Keep the navigation bar stable during transitions */
nav {
  view-transition-name: main-nav;
}

::view-transition-group(main-nav) {
  animation: none;
}

/* Transition the main content area separately */
main {
  view-transition-name: main-content;
}

::view-transition-old(main-content) {
  animation: slide-down-fade-out 300ms ease-out forwards;
}

::view-transition-new(main-content) {
  animation: slide-up-fade-in 300ms ease-in forwards;
}

@keyframes slide-down-fade-out {
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Route-Aware Transitions with Next.js
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        One of the most powerful patterns is creating different transitions based on the navigation direction. When a user navigates deeper into your app (e.g., from a list to a detail page), you might want a forward slide. When they go back, a reverse slide. You can achieve this by setting CSS custom properties or classes on the document before the transition starts.
      </p>

      <CodeBlock
        filename="hooks/use-directional-transition.ts"
        language="typescript"
        code={`'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Map routes to a depth level for directional transitions
const routeDepth: Record<string, number> = {
  '/': 0,
  '/blog': 1,
  '/blog/[slug]': 2,
  '/components': 1,
  '/components/[name]': 2,
};

function getDepth(pathname: string): number {
  // Simple depth calculation based on path segments
  return pathname.split('/').filter(Boolean).length;
}

export function useDirectionalTransition() {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevDepth = getDepth(prevPathRef.current);
    const currentDepth = getDepth(pathname);

    if (currentDepth > prevDepth) {
      document.documentElement.dataset.transitionDirection = 'forward';
    } else if (currentDepth < prevDepth) {
      document.documentElement.dataset.transitionDirection = 'back';
    } else {
      document.documentElement.dataset.transitionDirection = 'lateral';
    }

    prevPathRef.current = pathname;
  }, [pathname]);
}

// Then in your CSS:
// [data-transition-direction="forward"] ::view-transition-old(root) {
//   animation: slide-out-left 300ms ease-in-out;
// }
// [data-transition-direction="forward"] ::view-transition-new(root) {
//   animation: slide-in-from-right 300ms ease-in-out;
// }
// [data-transition-direction="back"] ::view-transition-old(root) {
//   animation: slide-out-right 300ms ease-in-out;
// }
// [data-transition-direction="back"] ::view-transition-new(root) {
//   animation: slide-in-from-left 300ms ease-in-out;
// }`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Transition Lifecycle
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Understanding the exact sequence of events during a view transition is critical for building reliable animations. Here is the complete lifecycle, showing when each pseudo-element is created, when your callback runs, and when the animation plays.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`View Transition Lifecycle (Detailed)

  startViewTransition(callback)
              │
              ▼
  ┌───────────────────────┐
  │ 1. CAPTURE OLD STATE  │  Browser renders current DOM to an image
  │    - Rasterize page   │  Each named view-transition-name element
  │    - Store snapshots  │  gets its own separate snapshot
  └───────────┬───────────┘
              │
              ▼
  ┌───────────────────────┐
  │ 2. RUN CALLBACK       │  Your callback() executes here
  │    - Update the DOM   │  This can be sync or async
  │    - Fetch data       │  Page is frozen (no rendering) until done
  │    - Change route     │
  └───────────┬───────────┘
              │
              ▼                    transition.updateCallbackDone resolves
  ┌───────────────────────┐
  │ 3. CAPTURE NEW STATE  │  Browser renders updated DOM to an image
  │    - Rasterize again  │  Matches named elements old ↔ new
  │    - Build pairs      │
  └───────────┬───────────┘
              │
              ▼                    transition.ready resolves
  ┌───────────────────────┐
  │ 4. CREATE PSEUDO TREE │  ::view-transition pseudo-elements appear
  │    - ::v-t-old(*)     │  Old state = static image
  │    - ::v-t-new(*)     │  New state = static image (becomes live at end)
  │    - ::v-t-group(*)   │  Groups animate size/position
  └───────────┬───────────┘
              │
              ▼
  ┌───────────────────────┐
  │ 5. ANIMATE            │  CSS animations run on pseudo-elements
  │    - Default: fade    │  Default duration: 250ms
  │    - Custom: anything │  You can override with CSS
  │    - GPU accelerated  │  Composited layer = smooth 60fps
  └───────────┬───────────┘
              │
              ▼                    transition.finished resolves
  ┌───────────────────────┐
  │ 6. CLEANUP            │  Pseudo-elements removed
  │    - Remove overlays  │  Live DOM is now visible
  │    - Show real DOM    │  User interacts with actual page
  └───────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Shared Element Transitions
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Shared element transitions are where the View Transitions API truly shines. By giving elements matching <code>view-transition-name</code> values on different pages, the browser will automatically animate the element from its old position and size to its new position and size. This creates the kind of fluid, connected transitions you see in native mobile apps — a thumbnail growing into a full hero image, a card expanding into a detail page, or a title morphing from a list item into a page header.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The view-transition-name Property
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The <code>view-transition-name</code> CSS property is the key to shared element transitions. When the browser captures snapshots, it groups elements with the same transition name together. The old snapshot and new snapshot of a named element form a pair, and the browser animates between them. There&apos;s one important rule: every <code>view-transition-name</code> must be unique within a page at the time of capture. You cannot have two visible elements with the same name.
      </p>

      <CodeBlock
        filename="shared-element.tsx"
        language="tsx"
        code={`// List page: each card has a unique transition name
function ProductList({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={\`/products/\${product.id}\`}
          className="group"
        >
          <div className="rounded-lg border overflow-hidden">
            {/* This image will animate to the detail page */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-video object-cover"
              style={{
                viewTransitionName: \`product-image-\${product.id}\`,
              }}
            />
            {/* Title also transitions */}
            <h3
              className="p-3 font-medium"
              style={{
                viewTransitionName: \`product-title-\${product.id}\`,
              }}
            >
              {product.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Detail page: same transition names, different layout
function ProductDetail({ product }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Same view-transition-name as the list thumbnail */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-[21/9] object-cover rounded-xl"
        style={{
          viewTransitionName: \`product-image-\${product.id}\`,
        }}
      />
      {/* Same view-transition-name as the list title */}
      <h1
        className="text-3xl font-bold mt-6"
        style={{
          viewTransitionName: \`product-title-\${product.id}\`,
        }}
      >
        {product.name}
      </h1>
      <p className="mt-4 text-muted-foreground">
        {product.description}
      </p>
    </div>
  );
}`}
      />

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When a user clicks a product card, the browser captures the thumbnail image and title at their current positions and sizes. After the route changes and the detail page renders, the browser sees the same <code>view-transition-name</code> values on the hero image and page title. It then smoothly animates the image from its small thumbnail size to the full-width hero, and morphs the title from a small font to a large heading. The result is a fluid, connected navigation that tells a visual story.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Card Expand Animations
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        One of the most satisfying patterns is expanding a card from a grid into a full detail view. The card seems to grow and fill the page, with its contents rearranging smoothly. This is achieved by naming multiple elements within the card and having corresponding named elements on the detail page.
      </p>

      <CodeBlock
        filename="card-expand.css"
        language="css"
        code={`/* Customize the shared element transition animation */

/* The group pseudo-element animates size and position */
::view-transition-group(product-image-*) {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Crossfade the content areas that don't have shared names */
::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
  /* Start fading immediately */
}

::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
  /* Delay so old content fades first */
  animation-delay: 150ms;
  animation-fill-mode: backwards;
}

/* Override the default crossfade for shared elements */
/* We want them to morph, not fade */
::view-transition-old(product-image-*),
::view-transition-new(product-image-*) {
  /* No fade — just let the group handle the size/position morph */
  animation: none;
  /* Fill the group container */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Stagger the title animation slightly after the image */
::view-transition-group(product-title-*) {
  animation-duration: 350ms;
  animation-delay: 50ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Advanced Animation Patterns
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Once you understand the basics, you can create some truly impressive animation patterns. The View Transitions API is flexible enough to handle directional slides, morphing shapes, staggered group animations, and even combining multiple techniques for cinematic effects. Let&apos;s explore some advanced patterns that will take your transitions to the next level.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Directional Transitions Based on Navigation
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        One of the most polished patterns is sliding pages in different directions based on navigation. Forward navigation slides the new page in from the right. Back navigation slides it in from the left. This mirrors the native behavior on iOS and Android, making your web app feel like a first-class citizen on mobile devices.
      </p>

      <CodeBlock
        filename="directional-transitions.css"
        language="css"
        code={`/* Forward navigation: slide right */
[data-transition-direction="forward"] ::view-transition-old(main-content) {
  animation: slide-out-to-left 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
[data-transition-direction="forward"] ::view-transition-new(main-content) {
  animation: slide-in-from-right 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Back navigation: slide left */
[data-transition-direction="back"] ::view-transition-old(main-content) {
  animation: slide-out-to-right 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
[data-transition-direction="back"] ::view-transition-new(main-content) {
  animation: slide-in-from-left 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Lateral navigation (same depth): crossfade */
[data-transition-direction="lateral"] ::view-transition-old(main-content) {
  animation: fade-out 200ms ease-out forwards;
}
[data-transition-direction="lateral"] ::view-transition-new(main-content) {
  animation: fade-in 200ms ease-in 100ms forwards;
}

@keyframes slide-out-to-left {
  from { transform: translateX(0%); opacity: 1; }
  to { transform: translateX(-30%); opacity: 0; }
}

@keyframes slide-in-from-right {
  from { transform: translateX(30%); opacity: 0; }
  to { transform: translateX(0%); opacity: 1; }
}

@keyframes slide-out-to-right {
  from { transform: translateX(0%); opacity: 1; }
  to { transform: translateX(30%); opacity: 0; }
}

@keyframes slide-in-from-left {
  from { transform: translateX(-30%); opacity: 0; }
  to { transform: translateX(0%); opacity: 1; }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Staggered Group Transitions
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When transitioning pages that have multiple distinct sections (a header, a sidebar, main content, and a footer), you can stagger the transitions so each section animates in sequence. This creates a cascading reveal effect that feels incredibly polished. The key is giving each section its own <code>view-transition-name</code> and then applying incrementally delayed animations.
      </p>

      <CodeBlock
        filename="staggered-transitions.css"
        language="css"
        code={`/* Give each section a unique transition name */
.page-header { view-transition-name: page-header; }
.page-sidebar { view-transition-name: page-sidebar; }
.page-main { view-transition-name: page-main; }
.page-footer { view-transition-name: page-footer; }

/* Stagger the entrance of each section */
::view-transition-new(page-header) {
  animation: slide-up-fade-in 300ms ease-out forwards;
  animation-delay: 0ms;
}

::view-transition-new(page-sidebar) {
  animation: slide-up-fade-in 300ms ease-out forwards;
  animation-delay: 50ms;
  animation-fill-mode: backwards;
}

::view-transition-new(page-main) {
  animation: slide-up-fade-in 300ms ease-out forwards;
  animation-delay: 100ms;
  animation-fill-mode: backwards;
}

::view-transition-new(page-footer) {
  animation: slide-up-fade-in 300ms ease-out forwards;
  animation-delay: 150ms;
  animation-fill-mode: backwards;
}

/* All old states fade out simultaneously */
::view-transition-old(page-header),
::view-transition-old(page-sidebar),
::view-transition-old(page-main),
::view-transition-old(page-footer) {
  animation: fade-out 150ms ease-out forwards;
}

@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Morphing Transitions
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Morphing transitions are when an element changes shape, size, and position simultaneously. The <code>::view-transition-group</code> pseudo-element handles this automatically when you use shared transition names. It interpolates the width, height, and transform between the old and new states. You can enhance this with custom timing functions to create elastic, bouncy, or snappy morphs.
      </p>

      <CodeBlock
        filename="morph-transitions.css"
        language="css"
        code={`/* Elastic morph for a profile avatar */
::view-transition-group(user-avatar) {
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  /* This cubic-bezier creates a slight overshoot/bounce */
}

/* Spring-like morph for expanding cards */
::view-transition-group(feature-card) {
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Snappy morph for navigation elements */
::view-transition-group(nav-indicator) {
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Combine morph with a rotation */
::view-transition-old(expandable-panel) {
  animation: morph-out 400ms ease-in forwards;
}

::view-transition-new(expandable-panel) {
  animation: morph-in 400ms ease-out forwards;
}

@keyframes morph-out {
  to {
    opacity: 0;
    transform: scale(0.9) rotateX(5deg);
    transform-origin: top center;
  }
}

@keyframes morph-in {
  from {
    opacity: 0;
    transform: scale(1.1) rotateX(-5deg);
    transform-origin: bottom center;
  }
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Transition Pattern Reference
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Here is a visual reference for the most common transition patterns and when to use each one. Choosing the right transition for the right context is important. A slide transition makes sense for navigation depth changes, while a crossfade works better for lateral navigation. Morphs are ideal for shared elements, and expands work for drill-down interactions.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Common Transition Patterns

1. CROSSFADE (default)            2. SLIDE
   Best for: lateral navigation      Best for: forward/back navigation

   ┌─────────┐  ┌─────────┐         ┌─────────┐  ┌─────────┐
   │ Old Page │  │ New Page │         │ Old Page│──▶│New Page │
   │  ░░░░░  │→ │  ████   │         │ ◀──────│  │──────▶ │
   │  ░░░░░  │  │  ████   │         └─────────┘  └─────────┘
   └─────────┘  └─────────┘         Old slides out, new slides in
   Opacity 1→0    Opacity 0→1       from the navigation direction

3. MORPH (shared element)         4. EXPAND (drill-down)

   ┌───┐                            ┌─────────────────┐
   │ A │ ──────────▶ ┌────────┐     │  ┌───┐          │
   └───┘             │   A    │     │  │ X │ ────┐    │
   Small box morphs  │        │     │  └───┘     │    │
   to large box:     │        │     │            ▼    │
   size + position   └────────┘     │  ┌─────────────┐│
   interpolated                     │  │      X      ││
                                    │  │  (expanded)  ││
                                    │  └─────────────┘│
                                    └─────────────────┘

5. STAGGER (cascading reveal)     6. ZOOM (modal/overlay)

   ┌──────────────────┐            ┌─────────┐
   │ ████ Header      │ ←delay 0   │         │
   │ ████ Nav         │ ←delay 50  │  ┌───┐  │
   │ ████ Content     │ ←delay 100 │  │ · │──┼──▶ ████████
   │ ████ Footer      │ ←delay 150 │  └───┘  │    ████████
   └──────────────────┘            └─────────┘    ████████
   Each section appears             Small element zooms
   sequentially                     to fill the viewport

Choose Your Pattern:
• Same-level navigation    → Crossfade
• Deeper/shallower nav     → Slide (directional)
• Element persists across  → Morph (shared element)
• List item to detail      → Expand
• Multiple content areas   → Stagger
• Opening overlays         → Zoom`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Integration with Component Libraries
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        View Transitions work beautifully with component libraries like shadcn/ui and Spectrum UI. Since transitions are driven by CSS and browser-level APIs, they&apos;re compatible with any component framework. The key is knowing where to apply <code>view-transition-name</code> and how to coordinate transitions with component state changes. Here are some practical integration patterns.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Tabs with View Transitions
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Tab components are a perfect candidate for view transitions. Instead of content instantly swapping when the user clicks a tab, you can make the content crossfade or slide. This also works with the active tab indicator — give it a <code>view-transition-name</code> and it will smoothly morph between tab positions.
      </p>

      <CodeBlock
        filename="tabs-with-transitions.tsx"
        language="tsx"
        code={`'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function AnimatedTabs({ tabs }: { tabs: TabData[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  function handleTabChange(value: string) {
    if (!document.startViewTransition) {
      setActiveTab(value);
      return;
    }

    document.startViewTransition(() => {
      setActiveTab(value);
    });
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
            {activeTab === tab.value && (
              <span
                className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                style={{ viewTransitionName: 'active-tab-indicator' }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          style={{ viewTransitionName: 'tab-content' }}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// CSS for the tab transitions:
// ::view-transition-group(active-tab-indicator) {
//   animation-duration: 200ms;
//   animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
// }
// ::view-transition-old(tab-content) {
//   animation: fade-out 150ms ease-out;
// }
// ::view-transition-new(tab-content) {
//   animation: fade-in 150ms ease-in 50ms backwards;
// }`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Dialog Open/Close Transitions
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Dialogs and modals can benefit from view transitions too. Instead of using JavaScript-driven spring animations for dialog open and close, you can use view transitions to smoothly morph a trigger element into the dialog. This creates a connected, spatial animation where the dialog appears to expand from the button that opened it.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Page Layout Transitions
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        For Spectrum UI components that manage page layouts — like sidebars, headers, and content areas — view transitions provide a way to animate layout changes. Collapsing a sidebar, switching between grid and list views, or toggling a panel can all be wrapped in <code>startViewTransition()</code> for smooth state changes. The browser handles the interpolation between the old and new layout, including size and position changes of every named element.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Performance Best Practices
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        View transitions are designed to be performant by default, but there are still ways to optimize them and pitfalls to avoid. The browser composites the transition on the GPU, which means you get 60fps animations for free in most cases. However, certain patterns can cause performance issues, especially on lower-end devices.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Avoiding Layout Shifts
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The biggest performance killer with view transitions is layout shift during the DOM update callback. If your callback causes the page layout to jump (e.g., content reflowing because new content has different dimensions), the transition will capture a mid-shift state and the animation will look janky. To avoid this, make sure your new content has predictable dimensions. Use CSS Grid or fixed-height containers where possible. Preload images that will appear in the new state so they don&apos;t cause layout shifts when they load.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li>Use <code>aspect-ratio</code> on images and media to reserve space before they load.</li>
        <li>Avoid transitions that change the scroll position — capture happens at the current scroll offset.</li>
        <li>Keep your DOM update callback fast. The page is frozen while it runs, so slow callbacks cause visible freezes.</li>
        <li>For async callbacks, show a loading state quickly rather than waiting for slow network requests.</li>
        <li>Use <code>content-visibility: auto</code> on off-screen content to reduce the capture cost.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        GPU-Accelerated Properties
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The pseudo-elements created during a view transition are composited on the GPU by default. This means <code>transform</code> and <code>opacity</code> animations are free. However, if you add CSS properties that force paint operations (like <code>filter</code>, <code>backdrop-filter</code>, or <code>clip-path</code> animations), you may see dropped frames. Stick to transforms and opacity for the actual animation keyframes. Use other properties for the static initial and final states, but don&apos;t animate them.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Reducing the Number of Snapshots
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Every element with a <code>view-transition-name</code> generates its own snapshot pair. The browser has to rasterize each one independently. If you have 50 named elements on a page, that&apos;s 100 snapshots the browser needs to capture and composite. On a high-end laptop, this is fine. On a budget Android phone, it might cause a noticeable delay before the animation starts. Be judicious with named elements. Transition the three or four most important elements, and let the rest participate in the default root crossfade.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Accessibility Considerations
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Animations enhance the experience for most users but can be problematic for people with vestibular disorders, motion sensitivity, or cognitive disabilities. Respecting user preferences and ensuring your transitions don&apos;t create barriers is not optional — it&apos;s a fundamental part of building for the web.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Respecting prefers-reduced-motion
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The most important accessibility measure is honoring the <code>prefers-reduced-motion</code> media query. Users who enable this setting on their operating system have explicitly asked for less motion. Your view transitions should either be disabled entirely or replaced with minimal, non-moving alternatives like a simple opacity change.
      </p>

      <CodeBlock
        filename="reduced-motion.css"
        language="css"
        code={`/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  /* Option 1: Disable transitions entirely */
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
    animation-duration: 0s !important;
  }

  /* Option 2: Use a very subtle, short crossfade instead */
  ::view-transition-old(root) {
    animation: gentle-fade-out 100ms ease-out forwards;
  }
  ::view-transition-new(root) {
    animation: gentle-fade-in 100ms ease-in forwards;
  }

  /* Disable all sliding/scaling/morphing */
  ::view-transition-old(*):not(::view-transition-old(root)),
  ::view-transition-new(*):not(::view-transition-new(root)) {
    animation: none !important;
  }

  @keyframes gentle-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes gentle-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

/* You can also check in JavaScript */
/* const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches; */
/* if (prefersReduced) transition.skipTransition(); */`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Screen Reader Behavior
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        View transitions don&apos;t affect screen reader behavior directly. The accessibility tree is updated based on the DOM changes, not the visual transition. However, you should ensure that focus management is correct after the transition completes. When navigating to a new page, focus should move to the main content area or the page heading. Use <code>transition.finished.then(() =&gt; focusMainContent())</code> to manage focus after the animation completes. Also ensure that ARIA live regions announce any important content changes that happen during the transition, since the visual animation might mask the fact that content has changed.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Duration and Easing Guidelines
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Keep transition durations between 200ms and 400ms. Anything shorter than 150ms is too fast to register. Anything longer than 500ms feels sluggish and can trigger discomfort in motion-sensitive users. Use ease-out for entrances (content decelerating into place) and ease-in for exits (content accelerating away). Avoid linear timing, which feels robotic. The <code>cubic-bezier(0.4, 0, 0.2, 1)</code> curve (Material Design&apos;s standard easing) is a safe default for most transitions.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Common Pitfalls and Debugging Tips
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Even though the View Transitions API is relatively straightforward, there are some common mistakes that can trip you up. Here are the issues I see most often and how to fix them.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li><strong>Duplicate view-transition-name values:</strong> Every visible element must have a unique <code>view-transition-name</code> at capture time. If two elements share a name, the transition will fail silently. Use dynamic names like <code>card-{`{id}`}</code> for lists.</li>
        <li><strong>Transition names on hidden elements:</strong> If an element with a <code>view-transition-name</code> is <code>display: none</code>, it won&apos;t be captured. This is usually fine, but can cause confusion if you expect it to participate in the transition.</li>
        <li><strong>Slow async callbacks:</strong> The page is frozen during the callback. If your callback takes 2 seconds to fetch data, the user sees a frozen page for 2 seconds. Either preload data or update the DOM instantly with a skeleton and fill in data later.</li>
        <li><strong>Z-index conflicts:</strong> View transition pseudo-elements render in a layer above the page. If you have z-index values in the thousands, they can conflict. The <code>::view-transition</code> root has its own stacking context.</li>
        <li><strong>Scrolling during transitions:</strong> The page is unscrollable during a transition. Keep animations short (under 400ms) so users don&apos;t notice the scroll lock.</li>
        <li><strong>Testing tip:</strong> Chrome DevTools has a &quot;View Transitions&quot; panel under the Animations tab. You can slow down, pause, and step through transitions frame by frame. This is invaluable for debugging timing issues.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Implementation Checklist
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Enable <code>experimental.viewTransition</code> in your Next.js config (or add the meta tag for MPAs).</li>
          <li>Add a default crossfade transition in your global CSS targeting <code>::view-transition-old(root)</code> and <code>::view-transition-new(root)</code>.</li>
          <li>Identify 2-3 key elements that should have shared transitions between pages and give them unique <code>view-transition-name</code> values.</li>
          <li>Add directional transition logic if your app has a clear navigation hierarchy (list → detail → sub-detail).</li>
          <li>Keep persistent elements (nav bars, footers) stable by giving them a <code>view-transition-name</code> and setting <code>animation: none</code> on their group.</li>
          <li>Add <code>@media (prefers-reduced-motion: reduce)</code> rules that disable or simplify all transition animations.</li>
          <li>Test on mobile devices and throttled connections to ensure transitions feel smooth.</li>
          <li>Use Chrome DevTools View Transitions panel to debug timing, stacking, and snapshot issues.</li>
          <li>Manage focus after transitions complete — use <code>transition.finished</code> to set focus appropriately.</li>
          <li>Feature-detect before using the API: always wrap <code>startViewTransition</code> calls with a support check so older browsers work without errors.</li>
          <li>Keep the total number of named elements under 10 per page for optimal performance on all devices.</li>
          <li>Prefer short durations (200-400ms) with ease-out curves for natural-feeling animations.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Bottom Line
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The View Transitions API represents a fundamental shift in how we build web animations. For the first time, the browser gives us a native, performant, CSS-driven way to animate between page states. No JavaScript animation libraries. No complex state management for enter/exit animations. No fighting with layout thrashing. Just declare your transition names in CSS, let the browser handle the snapshot and compositing, and customize the animations with standard CSS keyframes.
      </p>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The practical impact is enormous. SPAs get smoother route transitions with less JavaScript. MPAs get SPA-like transitions with zero JavaScript. Shared element transitions — once the exclusive domain of native mobile apps — are now achievable on the web with a single CSS property. And because the API is built on progressive enhancement, adding view transitions to an existing app is zero-risk. Browsers that don&apos;t support it simply skip the animation. No broken functionality. No error handling required.
      </p>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Start with the basics: enable the API, add a global crossfade, and identify two or three elements that should have shared transitions. Once you see how little code is needed for such a significant UX improvement, you&apos;ll wonder how we ever built web apps without it. The web finally feels like a first-class platform for navigation animations, and the View Transitions API is the reason why.
      </p>
    </div>
  ),
};

export default blogPost;
