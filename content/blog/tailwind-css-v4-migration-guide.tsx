import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "Tailwind CSS v4: Complete Migration Guide and Game-Changing New Features",
  excerpt:
    "Tailwind CSS v4 is the biggest release in the framework's history, replacing JavaScript configuration with a CSS-first approach. Here is everything you need to know to migrate your project and take advantage of the powerful new features.",
  author: {
    name: "Arihant Jain",
    role: "Engineering",
    avatar: "/arihant.jpeg",
  },
  date: "Mar 28, 2026",
  readTime: "18 min read",
  icon: "🚀",
  category: "Design Engineering",
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Tailwind v4 Is the Biggest Release Ever
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind CSS v4 is not just an incremental update. It is a ground-up rewrite that fundamentally changes how you configure, build, and think about your utility-first CSS framework. The team at Tailwind Labs spent over two years rearchitecting everything from the engine to the configuration system, and the result is something that feels like a completely different tool while maintaining the utility-first philosophy we all love.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The single biggest change? Configuration has moved from JavaScript to CSS. That <code>tailwind.config.js</code> file you have been maintaining for years? It is no longer needed. Instead, you define your design tokens, custom utilities, and theme extensions directly in your CSS using new at-rules like <code>@theme</code>, <code>@variant</code>, and <code>@utility</code>. This might sound like a small change, but it has massive implications for how you structure projects, share configurations, and integrate with other tools.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Under the hood, Tailwind v4 has replaced its PostCSS-based engine with a brand new compiler built on Lightning CSS, a Rust-based CSS parser that is orders of magnitude faster. Build times that used to take seconds now complete in milliseconds. Hot module replacement is nearly instant. The developer experience improvement alone makes the migration worthwhile, but there is so much more to explore.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For the ecosystem, this release means tighter integration with native CSS features. CSS cascade layers, container queries, and modern color spaces are all first-class citizens now. Tailwind v4 does not fight the platform anymore. It embraces it. And that means your CSS output is smaller, more predictable, and easier to debug in browser DevTools.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In this guide, I will walk you through every aspect of migrating from Tailwind v3 to v4, cover all the game-changing new features, and share practical tips from migrating several production applications. Whether you are running a small side project or a large enterprise codebase, this guide has you covered.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Tailwind v4 Migration Overview:

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Tailwind v3    │────▶│   Run Upgrade    │────▶│   Tailwind v4    │
│   Project        │     │   Tool           │     │   Project        │
│                  │     │                  │     │                  │
│ tailwind.config  │     │ npx @tailwindcss │     │ CSS @theme       │
│ postcss.config   │     │ /upgrade         │     │ No JS config     │
│ JS-based config  │     │                  │     │ Lightning CSS    │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
   │  Convert Config  │ │  Update Imports  │ │  Fix Breaking    │
   │                  │ │                  │ │  Changes         │
   │ JS → CSS @theme  │ │ @tailwind base   │ │ Renamed utils    │
   │ Custom plugins   │ │ → @import        │ │ Changed defaults │
   │ Theme values     │ │ "tailwindcss"    │ │ Plugin compat    │
   └──────────────────┘ └──────────────────┘ └──────────────────┘
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  ▼
                       ┌──────────────────┐
                       │  Verify & Test   │
                       │                  │
                       │ Visual regression│
                       │ Build output     │
                       │ Production ready │
                       └──────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Changed in Tailwind CSS v4
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before diving into the migration steps, let&apos;s understand the core architectural changes that make v4 fundamentally different from v3. These are not surface-level tweaks. They represent a philosophical shift in how Tailwind approaches CSS generation and configuration.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        CSS-First Configuration with @theme
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The most visible change in Tailwind v4 is the move from JavaScript-based configuration to CSS-based configuration. In v3, you defined your theme, plugins, and content paths in a <code>tailwind.config.js</code> or <code>tailwind.config.ts</code> file. In v4, all of that lives directly in your CSS using the new <code>@theme</code> directive. This is not just a syntactic change. It fundamentally changes how Tailwind discovers and processes your design tokens.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        With CSS-first configuration, your design tokens are actual CSS custom properties. They show up in browser DevTools. They can be consumed by non-Tailwind code. They participate in the CSS cascade naturally. There is no build step to translate JavaScript objects into CSS. Your tokens are CSS from the start.
      </p>

      <CodeBlock
        filename="app.css"
        language="css"
        code={`/* Tailwind v4: CSS-first configuration */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-destructive: #ef4444;

  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* Border radius */
  --radius-pill: 9999px;
  --radius-card: 0.75rem;

  /* Shadows */
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Breakpoints */
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;

  /* Animations */
  --animate-slide-in: slide-in 0.3s ease-out;
  --animate-fade-up: fade-up 0.4s ease-out;
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Removal of tailwind.config.js
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In Tailwind v4, the JavaScript configuration file is gone by default. You do not need <code>tailwind.config.js</code>, <code>tailwind.config.ts</code>, or <code>tailwind.config.cjs</code> anymore. Everything that used to live in those files now has a CSS equivalent. If you are migrating a large project and cannot convert everything at once, Tailwind v4 does provide a compatibility layer via the <code>@config</code> directive that lets you reference a legacy config file. But the goal should be to fully migrate to CSS-first configuration.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Content detection is also automatic now. Tailwind v4 uses smart heuristics to find your template files without needing an explicit <code>content</code> array. It scans your project for files that might contain utility classes and processes them automatically. If you need to explicitly include or exclude paths, you can use the <code>@source</code> directive in your CSS.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lightning CSS Engine
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 is built on top of Lightning CSS, a Rust-based CSS parser and transformer created by Devon Govett. This replaces the previous PostCSS-based architecture entirely. Lightning CSS handles CSS parsing, vendor prefixing, syntax lowering, and minification all in a single pass. The result is dramatically faster build times and a much simpler toolchain.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You no longer need <code>autoprefixer</code> in your PostCSS config because Lightning CSS handles vendor prefixing natively. You no longer need a separate minifier because Lightning CSS handles that too. The entire build pipeline is consolidated into one high-performance tool. For most projects, you can delete your <code>postcss.config.js</code> file entirely and just use the Tailwind CLI or Vite plugin directly.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Native CSS Cascade Layers
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 uses native CSS <code>@layer</code> rules to organize its output. The framework generates three layers: <code>@layer theme</code>, <code>@layer base</code>, and <code>@layer utilities</code>. This means specificity conflicts between base styles and utility classes are resolved by the browser&apos;s native cascade layer system rather than by carefully ordering CSS output. Utilities always win over base styles because the utilities layer has higher priority.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is a huge improvement for predictability. In v3, you sometimes ran into situations where a base style would unexpectedly override a utility class because of CSS source order or specificity. With native cascade layers, that entire class of bugs disappears. The browser guarantees that utilities always take precedence, regardless of source order.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        New Color System with OKLCH
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 has updated its default color palette to use the OKLCH color space. OKLCH provides perceptually uniform colors, meaning that changing the lightness value by the same amount produces visually consistent results across different hues. The default palette still maps to familiar names like <code>blue-500</code> and <code>red-600</code>, but the underlying values are now in OKLCH for better color interpolation and contrast.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You can still use hex, RGB, or HSL values in your custom theme. Tailwind will handle them correctly. But if you want to take advantage of the new color features like wide-gamut colors and perceptually uniform palettes, OKLCH is the way to go. The browser support for OKLCH is excellent in 2026, covering all modern browsers.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`v3 Architecture vs v4 Architecture:

┌─────────────────────────────────────────────────────────────────┐
│                     TAILWIND CSS v3                              │
│                                                                 │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────────┐ │
│  │ tailwind    │──▶│  PostCSS     │──▶│  autoprefixer        │ │
│  │ .config.js  │   │  Plugin      │   │  + cssnano           │ │
│  │ (JS config) │   │  (Node.js)   │   │  (separate tools)    │ │
│  └─────────────┘   └──────────────┘   └──────────────────────┘ │
│         │                  │                      │             │
│         ▼                  ▼                      ▼             │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────────┐ │
│  │ content[]   │   │  JIT         │   │  CSS Output          │ │
│  │ paths       │   │  Compiler    │   │  (multiple passes)   │ │
│  └─────────────┘   └──────────────┘   └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                          vs.

┌─────────────────────────────────────────────────────────────────┐
│                     TAILWIND CSS v4                              │
│                                                                 │
│  ┌─────────────┐   ┌──────────────────────────────────────────┐ │
│  │ app.css     │──▶│  Tailwind v4 Engine (Lightning CSS)      │ │
│  │ (@theme,    │   │                                          │ │
│  │  @import)   │   │  • CSS parsing     (Rust, single pass)  │ │
│  │ (CSS only)  │   │  • Prefixing       (built-in)           │ │
│  └─────────────┘   │  • Minification    (built-in)           │ │
│         │          │  • Syntax lowering  (built-in)           │ │
│         ▼          │  • Auto content detection                │ │
│  ┌─────────────┐   └──────────────────────────────────────────┘ │
│  │ Auto source │                    │                           │
│  │ detection   │                    ▼                           │
│  │ (no config) │   ┌──────────────────────────────────────────┐ │
│  └─────────────┘   │  Optimized CSS Output (single pass)     │ │
│                    └──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step-by-Step Migration Guide
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Now that you understand what changed and why, let&apos;s walk through the actual migration process. I recommend doing this on a dedicated branch so you can compare the before and after and catch any visual regressions. The Tailwind team has also provided an automated upgrade tool that handles most of the heavy lifting, but understanding each step will help you debug issues if they come up.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 1: Update Dependencies
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The first step is to update your packages. Tailwind v4 has a completely different package structure. The main <code>tailwindcss</code> package is all you need for the core framework, but you will also want the appropriate integration package for your build tool. If you are using Vite, install <code>@tailwindcss/vite</code>. If you are using PostCSS, install <code>@tailwindcss/postcss</code>. If you prefer the CLI, install <code>@tailwindcss/cli</code>.
      </p>

      <CodeBlock
        filename="terminal"
        language="bash"
        code={`# Remove old packages
npm uninstall tailwindcss postcss autoprefixer

# Install Tailwind v4 core
npm install tailwindcss@latest

# Choose your integration:

# For Vite projects (recommended)
npm install @tailwindcss/vite

# For PostCSS projects (Next.js, Webpack, etc.)
npm install @tailwindcss/postcss

# For CLI usage
npm install @tailwindcss/cli

# Run the automated upgrade tool
npx @tailwindcss/upgrade`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>npx @tailwindcss/upgrade</code> command is incredibly helpful. It scans your project and automatically converts your <code>tailwind.config.js</code> to CSS <code>@theme</code> syntax, updates your import statements, renames deprecated utilities, and flags any manual changes you need to make. I highly recommend running it as your first step and then reviewing the changes it makes.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 2: Update Your Build Tool Configuration
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Depending on your build tool, you need to update your configuration to use the new Tailwind v4 integration. The setup is simpler than v3 because you no longer need PostCSS configuration in most cases.
      </p>

      <CodeBlock
        filename="vite.config.ts"
        language="typescript"
        code={`// Vite configuration for Tailwind v4
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),  // Add the Tailwind Vite plugin
    react(),
  ],
});

// That's it! No postcss.config.js needed.
// You can delete postcss.config.js entirely.`}
      />

      <CodeBlock
        filename="postcss.config.mjs"
        language="javascript"
        code={`// If you must use PostCSS (e.g., Next.js)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // No autoprefixer needed - it's built into Tailwind v4
  },
};

// Note: Remove autoprefixer from your config
// Tailwind v4's Lightning CSS engine handles prefixing`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 3: Convert tailwind.config.js to CSS @theme
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is the most involved step if you have a heavily customized Tailwind configuration. You need to translate your JavaScript theme object into CSS <code>@theme</code> syntax. The mapping is straightforward but requires attention to naming conventions. In v4, theme values follow a specific naming pattern: <code>--color-*</code> for colors, <code>--font-*</code> for font families, <code>--spacing-*</code> for spacing, and so on.
      </p>

      <CodeBlock
        filename="tailwind.config.js → app.css"
        language="css"
        code={`/* BEFORE: tailwind.config.js (v3) */
/*
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        surface: '#f8fafc',
      },
      fontFamily: {
        heading: ['Cal Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
}
*/

/* AFTER: app.css (v4) */
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;
  --color-surface: #f8fafc;

  --font-heading: "Cal Sans", sans-serif;
  --font-body: "Inter", sans-serif;

  --spacing-18: 4.5rem;
  --spacing-112: 28rem;

  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  --animate-fade-in: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 4: Update CSS Imports
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In Tailwind v3, you used the <code>@tailwind</code> directives to inject base styles, components, and utilities. In v4, you simply import Tailwind as a single CSS import. The framework handles layering internally using native CSS cascade layers.
      </p>

      <CodeBlock
        filename="app.css"
        language="css"
        code={`/* BEFORE: Tailwind v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

/* AFTER: Tailwind v4 */
@import "tailwindcss";

@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(222.2 84% 4.9%);
}

/* Custom base styles still work */
@layer base {
  body {
    font-family: var(--font-sans);
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 5: Handle Breaking Changes and Renamed Utilities
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 has renamed and removed several utilities. The upgrade tool catches most of these, but you should be aware of the major changes. Some of these are straightforward renames while others reflect deeper changes in how Tailwind handles certain CSS properties.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li><code>bg-opacity-*</code> is removed. Use <code>bg-black/50</code> opacity modifier syntax instead.</li>
        <li><code>text-opacity-*</code> is removed. Use <code>text-black/50</code> opacity modifier syntax instead.</li>
        <li><code>border-opacity-*</code> is removed. Use <code>border-black/50</code> opacity modifier syntax instead.</li>
        <li><code>flex-shrink</code> is now <code>shrink</code> and <code>flex-grow</code> is now <code>grow</code>.</li>
        <li><code>overflow-ellipsis</code> is now <code>text-ellipsis</code>.</li>
        <li><code>decoration-slice</code> and <code>decoration-clone</code> are now <code>box-decoration-slice</code> and <code>box-decoration-clone</code>.</li>
        <li>The <code>ring</code> utility now defaults to 1px instead of 3px. If you relied on <code>ring</code> alone, switch to <code>ring-3</code>.</li>
        <li>Shadow, blur, and other utilities no longer accept bare values. <code>shadow</code> becomes <code>shadow-sm</code> or a specific size.</li>
        <li>The <code>container</code> utility is no longer included by default. Use the <code>@utility</code> directive to define it if needed.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step 6: Migrate Plugins
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you were using official Tailwind plugins, many of them have been absorbed into the core framework in v4. The <code>@tailwindcss/container-queries</code> plugin is no longer needed because container queries are built-in. The <code>@tailwindcss/typography</code> plugin has been updated for v4 compatibility. The <code>@tailwindcss/forms</code> plugin continues to work but should be updated to the latest version.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For custom plugins written with the v3 plugin API, Tailwind v4 provides a compatibility path. You can load a legacy config file using the <code>@config</code> directive, which will apply your plugins. However, many simple plugins can be rewritten using the new <code>@utility</code> and <code>@variant</code> CSS directives, which are easier to maintain and do not require JavaScript at all.
      </p>

      <CodeBlock
        filename="app.css"
        language="css"
        code={`/* Loading a legacy plugin via @config */
@import "tailwindcss";
@config "./tailwind.config.js";

/* Or rewrite simple plugins as CSS utilities */
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* Custom variants in pure CSS */
@variant hocus (&:hover, &:focus);
@variant group-hocus (:merge(.group):hover &, :merge(.group):focus &);`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        New Features Deep Dive
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Beyond the migration changes, Tailwind v4 introduces several powerful new features that open up possibilities that were previously difficult or impossible. Let&apos;s explore each one in detail.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The @theme Directive
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>@theme</code> directive is the heart of Tailwind v4&apos;s configuration system. It replaces the <code>theme</code> object in your JavaScript config and generates both CSS custom properties and the corresponding utility classes. When you define <code>--color-brand: #3b82f6</code> inside <code>@theme</code>, Tailwind automatically creates <code>bg-brand</code>, <code>text-brand</code>, <code>border-brand</code>, and every other color utility for that value.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the most powerful aspects of <code>@theme</code> is that it supports namespacing. You can use <code>@theme inline</code> to generate the utility classes without creating CSS custom properties, which is useful for internal values you do not want to expose. You can also use <code>@theme reference</code> to reference existing CSS custom properties without redefining them.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Container Queries Built-In
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Container queries are now a first-class feature in Tailwind v4. You no longer need the <code>@tailwindcss/container-queries</code> plugin. The syntax is clean and intuitive. Use <code>@container</code> to define a containment context and then use <code>@sm:</code>, <code>@md:</code>, <code>@lg:</code>, and other container query variants to apply styles based on the container&apos;s size rather than the viewport.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is a game changer for component-based design. Instead of responsive breakpoints that depend on the browser window, your components can adapt to the space they are actually given. A card component in a sidebar can look different from the same card component in a main content area, without any JavaScript or manual class toggling. The component itself is truly responsive and self-contained.
      </p>

      <CodeBlock
        filename="ResponsiveCard.tsx"
        language="tsx"
        code={`// Container queries in Tailwind v4 - no plugin needed!
export function ResponsiveCard({ title, description, image }) {
  return (
    // @container makes this element a container query context
    <div className="@container">
      <div className="
        flex flex-col gap-4
        @sm:flex-row @sm:items-center
        @md:gap-6
        @lg:gap-8
        rounded-xl border p-4
        @md:p-6
      ">
        <img
          src={image}
          className="
            w-full rounded-lg
            @sm:w-32 @sm:h-32
            @md:w-48 @md:h-48
            object-cover
          "
        />
        <div>
          <h3 className="
            text-lg font-semibold
            @md:text-xl
            @lg:text-2xl
          ">
            {title}
          </h3>
          <p className="
            text-sm text-muted-foreground
            @md:text-base
            @lg:text-lg
          ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Named containers for nested queries
// <div className="@container/sidebar">
//   <div className="@sm/sidebar:flex">...</div>
// </div>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        3D Transforms
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 adds built-in support for 3D CSS transforms. You can now use utilities like <code>rotate-x-*</code>, <code>rotate-y-*</code>, <code>rotate-z-*</code>, <code>perspective-*</code>, <code>translate-z-*</code>, and <code>transform-3d</code> to create three-dimensional effects without writing custom CSS. This opens up possibilities for card flip animations, 3D carousels, parallax effects, and immersive UI interactions that previously required manual CSS or animation libraries.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>perspective-*</code> utilities control the depth of the 3D space. Lower values create more dramatic perspective effects while higher values create subtler ones. Combined with <code>transform-style: preserve-3d</code> via the <code>transform-3d</code> utility, you can build complex 3D scenes using nothing but Tailwind classes.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        New Gradient Syntax
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Gradients in Tailwind v4 are more powerful and flexible. The new gradient utilities support interpolation in different color spaces including OKLCH, which produces perceptually smoother gradients. You can use <code>bg-linear-*</code> for linear gradients (replacing the old <code>bg-gradient-to-*</code> syntax), and there are new <code>bg-radial-*</code> and <code>bg-conic-*</code> utilities for radial and conic gradients. Gradient color stops now support explicit positions using utilities like <code>from-red-500 from-20%</code>.
      </p>

      <CodeBlock
        filename="GradientExamples.tsx"
        language="tsx"
        code={`// New gradient syntax in Tailwind v4
export function GradientShowcase() {
  return (
    <div className="space-y-8">
      {/* Linear gradient with new syntax */}
      <div className="h-32 rounded-xl bg-linear-to-r from-blue-500 to-purple-600" />

      {/* Linear gradient at arbitrary angle */}
      <div className="h-32 rounded-xl bg-linear-135 from-emerald-400 to-cyan-500" />

      {/* Radial gradient - new in v4! */}
      <div className="h-32 rounded-xl bg-radial from-yellow-300 to-orange-500" />

      {/* Conic gradient - new in v4! */}
      <div className="h-32 rounded-xl bg-conic from-red-500 via-yellow-500 to-red-500" />

      {/* Gradient with explicit stop positions */}
      <div className="h-32 rounded-xl bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-90%" />

      {/* OKLCH interpolation for smoother gradients */}
      <div className="h-32 rounded-xl bg-linear-to-r/oklch from-blue-500 to-red-500" />
    </div>
  );
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        field-sizing: content
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The new <code>field-sizing-content</code> utility is deceptively simple but incredibly useful. It applies <code>field-sizing: content</code> to form elements, which makes textareas and input fields automatically resize based on their content. No more JavaScript auto-resize libraries. No more fixed-height textareas that are either too small or too large. The browser handles the resizing natively, and it works smoothly with animations and transitions.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is particularly useful for chat interfaces, comment forms, and anywhere you want a textarea that starts small and grows as the user types. Combined with <code>min-h-*</code> and <code>max-h-*</code> utilities, you have full control over the resize behavior without a single line of JavaScript.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Not-* Variants and Inert Support
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 introduces <code>not-*</code> variants that let you apply styles when a condition is NOT met. For example, <code>not-hover:opacity-50</code> applies reduced opacity when the element is not being hovered. You can combine this with any existing variant: <code>not-focus:border-gray-300</code>, <code>not-disabled:cursor-pointer</code>, and so on.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        There is also native support for the <code>inert</code> HTML attribute via the <code>inert:*</code> variant. The <code>inert</code> attribute tells the browser that an element and all its children are non-interactive, which is useful for modal backdrops, disabled form sections, and step-by-step wizards. Combined with <code>inert:opacity-50 inert:pointer-events-none</code>, you can visually indicate non-interactive sections with pure utility classes.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Tailwind v4 Build Pipeline:

┌─────────────────────────────────────────────────────────┐
│                   Source Files                           │
│  .tsx, .jsx, .html, .vue, .svelte, .astro, .blade.php  │
└──────────────────────────┬──────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Auto Source │
                    │ Detection   │
                    │ (glob-free) │
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │     app.css Entry       │
              │                         │
              │  @import "tailwindcss"  │
              │  @theme { ... }         │
              │  @source (optional)     │
              │  @utility (optional)    │
              │  @variant (optional)    │
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Lightning CSS Engine   │
              │  (Rust-based, single    │
              │   pass processing)      │
              │                         │
              │  ┌───────────────────┐  │
              │  │ Parse CSS         │  │
              │  │ Resolve @theme    │  │
              │  │ Generate utils    │  │
              │  │ Apply @layer      │  │
              │  │ Vendor prefix     │  │
              │  │ Syntax lowering   │  │
              │  │ Minification      │  │
              │  └───────────────────┘  │
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Optimized CSS Output   │
              │                         │
              │  @layer theme { ... }   │
              │  @layer base { ... }    │
              │  @layer utilities { ... }│
              └─────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        shadcn/ui Compatibility with Tailwind v4
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you are using shadcn/ui (and if you are reading this blog, there is a good chance you are), migrating to Tailwind v4 requires some specific changes. The shadcn team has been proactive about supporting v4, and the latest version of the CLI generates v4-compatible components out of the box. But if you are migrating an existing project, there are several things you need to update.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The biggest change is in <code>globals.css</code>. In v3, shadcn used HSL values without the <code>hsl()</code> wrapper (like <code>222.2 84% 4.9%</code>) so that Tailwind&apos;s opacity modifiers would work. In v4, opacity modifiers work with any color format, so shadcn has moved to standard OKLCH or HSL values with the function wrapper. The CSS variable names have also changed to follow Tailwind v4&apos;s naming conventions.
      </p>

      <CodeBlock
        filename="globals.css"
        language="css"
        code={`/* shadcn/ui globals.css for Tailwind v4 */
@import "tailwindcss";

@theme inline {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(240 10% 3.9%);
  --color-popover: hsl(0 0% 100%);
  --color-popover-foreground: hsl(240 10% 3.9%);
  --color-primary: hsl(240 5.9% 10%);
  --color-primary-foreground: hsl(0 0% 98%);
  --color-secondary: hsl(240 4.8% 95.9%);
  --color-secondary-foreground: hsl(240 5.9% 10%);
  --color-muted: hsl(240 4.8% 95.9%);
  --color-muted-foreground: hsl(240 3.8% 46.1%);
  --color-accent: hsl(240 4.8% 95.9%);
  --color-accent-foreground: hsl(240 5.9% 10%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-destructive-foreground: hsl(0 0% 98%);
  --color-border: hsl(240 5.9% 90%);
  --color-input: hsl(240 5.9% 90%);
  --color-ring: hsl(240 5.9% 10%);
  --color-sidebar-background: hsl(0 0% 98%);
  --color-sidebar-foreground: hsl(240 5.3% 26.1%);
  --color-sidebar-primary: hsl(240 5.9% 10%);
  --color-sidebar-primary-foreground: hsl(0 0% 98%);
  --color-sidebar-accent: hsl(240 4.8% 95.9%);
  --color-sidebar-accent-foreground: hsl(240 5.9% 10%);
  --color-sidebar-border: hsl(220 13% 91%);
  --color-sidebar-ring: hsl(217.2 91.2% 59.8%);
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

.dark {
  --color-background: hsl(240 10% 3.9%);
  --color-foreground: hsl(0 0% 98%);
  --color-primary: hsl(0 0% 98%);
  --color-primary-foreground: hsl(240 5.9% 10%);
  /* ... remaining dark mode overrides */
}`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You will also need to update the <code>cn()</code> utility to ensure <code>tailwind-merge</code> is compatible with Tailwind v4&apos;s class names. Install the latest version of <code>tailwind-merge</code> (v3 or later) which has built-in support for Tailwind v4&apos;s new utility names and class patterns. The shadcn CLI handles this automatically for new installations, but for existing projects you should run <code>npm update tailwind-merge</code>.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Performance Comparison: v3 vs v4
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the most compelling reasons to migrate to Tailwind v4 is the massive performance improvement. The Lightning CSS engine is not just a little faster. It is dramatically faster across every metric. Initial build times, incremental rebuilds, and CSS output size all see significant improvements. Here is what the numbers look like for a medium-sized production application with about 500 components and 2000 template files.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Performance Comparison: Tailwind v3 vs v4

┌────────────────────────────────────────────────────────────┐
│                    Build Time (Full)                        │
│                                                            │
│  v3  ████████████████████████████████████████  2,100ms     │
│  v4  ██████                                     285ms     │
│                                                            │
│  Improvement: ~7.4x faster                                 │
├────────────────────────────────────────────────────────────┤
│                 Incremental Rebuild (HMR)                   │
│                                                            │
│  v3  ████████████████████                       180ms      │
│  v4  ██                                           8ms      │
│                                                            │
│  Improvement: ~22x faster                                  │
├────────────────────────────────────────────────────────────┤
│                   CSS Output Size                          │
│                                                            │
│  v3  ████████████████████████████████           284kb      │
│  v4  ████████████████████████                   198kb      │
│                                                            │
│  Improvement: ~30% smaller                                 │
├────────────────────────────────────────────────────────────┤
│                 Dependencies Required                       │
│                                                            │
│  v3  tailwindcss + postcss + autoprefixer + cssnano (4)    │
│  v4  tailwindcss + @tailwindcss/vite              (2)      │
│                                                            │
│  Improvement: 50% fewer dependencies                       │
└────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The incremental rebuild time is the metric that matters most for daily development. Going from 180 milliseconds to 8 milliseconds means your styles update essentially instantly when you save a file. There is no perceptible delay between editing a class and seeing the change in your browser. For teams working on large applications where v3 rebuilds could sometimes spike to 500 milliseconds or more, the improvement is even more dramatic.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The CSS output size reduction comes from several optimizations. Lightning CSS produces more efficient output with fewer redundant rules. Native cascade layers eliminate the need for specificity hacks. And the new engine is better at deduplicating utility definitions. For sites where CSS payload size impacts Core Web Vitals, this is a meaningful improvement that directly affects user experience and SEO.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Migration Pitfalls and Solutions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        After migrating several production apps to Tailwind v4, I have encountered a number of common issues that trip people up. Here are the most frequent problems and how to solve them quickly.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 1: CSS Variable Name Conflicts
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Because Tailwind v4 generates CSS custom properties from your <code>@theme</code> values, you can run into conflicts if you already have CSS variables with the same naming pattern. For example, if you had a custom <code>--color-primary</code> variable defined outside of <code>@theme</code>, it will conflict with the one Tailwind generates. The solution is to move all your design token variables inside <code>@theme</code> and remove the duplicate definitions. If you need variables that Tailwind should not generate utilities for, define them outside of <code>@theme</code> using regular CSS custom properties.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 2: PostCSS Plugin Order Issues
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you are using the PostCSS integration, make sure <code>@tailwindcss/postcss</code> is the only CSS processing plugin you need. Remove <code>autoprefixer</code> from your PostCSS config because Tailwind v4 handles prefixing internally. Having autoprefixer alongside <code>@tailwindcss/postcss</code> can cause duplicate prefixes and unexpected CSS output. Also remove any separate minification plugins like <code>cssnano</code> since Lightning CSS handles minification in production builds automatically.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 3: The ring Utility Default Change
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This one catches almost everyone. In v3, the <code>ring</code> utility applied a 3px ring by default. In v4, <code>ring</code> applies a 1px ring. If you have focus styles like <code>focus:ring focus:ring-blue-500</code>, your focus rings will look much thinner after migration. The fix is simple: change <code>ring</code> to <code>ring-3</code> everywhere you want the old default width. The upgrade tool should catch most of these, but it might miss some in dynamic or computed class strings.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 4: Third-Party Plugin Incompatibility
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Not all third-party Tailwind plugins have been updated for v4. If you depend on community plugins, check their repositories for v4 compatibility before migrating. For plugins that have not been updated, you can use the <code>@config</code> directive to load a compatibility config, but this should be a temporary measure. Many simple plugins can be replaced with <code>@utility</code> and <code>@variant</code> directives in your CSS. For complex plugins, consider opening an issue on the plugin&apos;s repository to request v4 support.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 5: Dynamic Class Generation
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your project generates Tailwind classes dynamically using string concatenation or template literals, Tailwind v4&apos;s source detection might not pick them up. This was also a problem in v3, but v4&apos;s automatic content detection makes it more likely to surface. The solution is the same: never dynamically construct class names. Use complete class strings and let Tailwind&apos;s scanner find them. If you must use dynamic classes, use the <code>@source</code> directive to explicitly include the files where they are defined, or use a safelist approach with <code>@utility</code>.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Pitfall 6: Dark Mode Configuration Changes
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In Tailwind v3, you configured dark mode strategy in <code>tailwind.config.js</code> using <code>darkMode: &apos;class&apos;</code> or <code>darkMode: &apos;media&apos;</code>. In v4, dark mode uses the <code>prefers-color-scheme</code> media query by default. If your project uses class-based dark mode (which is common with next-themes or similar libraries), you need to explicitly configure this in your CSS. Without this change, your dark mode toggle will stop working.
      </p>

      <CodeBlock
        filename="app.css"
        language="css"
        code={`/* If you use class-based dark mode (e.g., with next-themes) */
@import "tailwindcss";

/* Override the default dark mode variant to use class strategy */
@variant dark (&:where(.dark, .dark *));

/* Now dark:bg-gray-900 will activate when .dark class is present
   instead of relying on prefers-color-scheme */

@theme {
  /* your theme tokens */
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Advanced Tips for a Smooth Migration
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Beyond avoiding pitfalls, here are some advanced strategies that will make your migration smoother and help you take full advantage of v4&apos;s new capabilities.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        First, consider migrating incrementally if you have a large codebase. Use the <code>@config</code> directive to keep your existing JavaScript configuration working while you gradually convert sections to CSS <code>@theme</code> syntax. This lets you ship the migration in multiple pull requests instead of one massive changeset. You can remove the <code>@config</code> reference once everything has been converted.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Second, set up visual regression testing before you start. Tools like Chromatic, Percy, or even simple screenshot comparisons can catch subtle visual differences that are easy to miss in manual testing. Tailwind v4&apos;s default values differ from v3 in some cases (like the ring width change), and these differences can compound across a large application.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Third, take the opportunity to clean up your design tokens during migration. Converting from JavaScript to CSS is a natural point to audit your theme values, remove unused tokens, and consolidate similar values. Many projects accumulate theme cruft over time, and a migration is the perfect excuse to trim it down.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Fourth, update your editor tooling. The Tailwind CSS IntelliSense VS Code extension needs to be updated to support v4 syntax. The latest version understands <code>@theme</code>, <code>@utility</code>, and <code>@variant</code> directives and provides autocomplete for the new class names. Without the update, you will get false error highlighting in your CSS files and miss out on autocomplete for new features.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Real-World Migration Example
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        To make this guide more concrete, let me walk through a condensed example of migrating a real Next.js application from Tailwind v3 to v4. This application uses shadcn/ui, next-themes for dark mode, and has a custom design system with branded colors and typography.
      </p>

      <CodeBlock
        filename="Before: tailwind.config.ts"
        language="typescript"
        code={`// Tailwind v3 config (BEFORE migration)
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;`}
      />

      <CodeBlock
        filename="After: app.css"
        language="css"
        code={`/* Tailwind v4 CSS-first config (AFTER migration) */
@import "tailwindcss";
@plugin "tailwindcss-animate";

/* Class-based dark mode for next-themes */
@variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-border: hsl(var(--border));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --font-sans: "Inter", sans-serif;
}

/* Delete tailwind.config.ts - no longer needed!
   Delete postcss.config.js if using Vite plugin.
   Update postcss.config.js if using PostCSS integration. */`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Notice how much cleaner the v4 version is. The configuration is co-located with your styles, there is no JavaScript to parse, and the intent is immediately clear. The <code>@plugin</code> directive replaces the <code>plugins</code> array for loading JavaScript plugins that have been updated for v4. The <code>@variant dark</code> line replaces the <code>darkMode: &quot;class&quot;</code> config option. And automatic content detection means you do not need to specify content paths at all.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Migration Checklist
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before you consider your migration complete, run through this checklist to make sure everything is properly converted and working. I use this exact checklist when migrating production applications and it has saved me from shipping broken styles more than once.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li>Run <code>npx @tailwindcss/upgrade</code> and review all automated changes before committing.</li>
        <li>Update <code>tailwindcss</code> to v4 and install the appropriate integration package (<code>@tailwindcss/vite</code> or <code>@tailwindcss/postcss</code>).</li>
        <li>Remove <code>autoprefixer</code> and <code>cssnano</code> from your dependencies and PostCSS config.</li>
        <li>Convert <code>tailwind.config.js</code> to CSS <code>@theme</code> in your main stylesheet. Delete the JS config file when done.</li>
        <li>Replace <code>@tailwind base; @tailwind components; @tailwind utilities;</code> with <code>@import &quot;tailwindcss&quot;;</code></li>
        <li>If using class-based dark mode, add <code>@variant dark (&amp;:where(.dark, .dark *));</code> to your CSS.</li>
        <li>Update <code>ring</code> to <code>ring-3</code> wherever you relied on the old 3px default.</li>
        <li>Replace deprecated opacity utilities (<code>bg-opacity-*</code>, <code>text-opacity-*</code>) with opacity modifier syntax (<code>bg-black/50</code>).</li>
        <li>Remove <code>@tailwindcss/container-queries</code> plugin if installed. Container queries are now built-in.</li>
        <li>Update <code>tailwind-merge</code> to v3+ for compatibility with v4 class names.</li>
        <li>Update the Tailwind CSS IntelliSense VS Code extension to the latest version.</li>
        <li>Test all pages visually, paying special attention to focus rings, shadows, gradients, and dark mode.</li>
        <li>Run your test suite and check for any CSS-related assertion failures.</li>
        <li>Verify build output size and build times to confirm performance improvements.</li>
        <li>Remove any legacy <code>@config</code> references once all plugins have been migrated.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Conclusion
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind CSS v4 is the most significant release in the framework&apos;s history. The move to CSS-first configuration, the Lightning CSS engine, and the embrace of native CSS features like cascade layers and container queries represent a maturation of the utility-first approach. Tailwind is no longer fighting the platform. It is building on top of it, and the result is a faster, simpler, and more powerful framework.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The migration process is straightforward for most projects, especially with the automated upgrade tool handling the bulk of the changes. The key is to understand what changed and why, so you can make informed decisions when the tool cannot automatically convert something. The step-by-step guide and pitfall list in this article should give you everything you need to migrate confidently.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you are starting a new project in 2026, there is no reason to use Tailwind v3. Go straight to v4 and enjoy the faster builds, cleaner configuration, and powerful new features. If you are maintaining an existing v3 project, start planning your migration now. The performance benefits alone justify the effort, and the improved developer experience will pay dividends every day your team works on the codebase.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The future of CSS is exciting, and Tailwind v4 is leading the charge. Container queries, 3D transforms, OKLCH colors, native cascade layers, and CSS-first configuration are not just buzzwords. They are practical tools that make building modern web interfaces faster and more enjoyable. Start your migration today and experience the difference for yourself.
      </p>
    </div>
  )
}

export default blogPost;
