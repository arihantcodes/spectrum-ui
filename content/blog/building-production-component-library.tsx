import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Building a Production Component Library: From shadcn Primitives to Your Own Design System',
  excerpt:
    'A complete guide to building, packaging, and shipping your own component library on top of shadcn/ui primitives. Learn monorepo setup, versioning, documentation, testing, and distribution strategies.',
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 18, 2026',
  readTime: '22 min read',
  icon: '📦',
  category: 'Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every frontend team eventually reaches the same inflection point. You started with shadcn/ui because it was
        fast, flexible, and gave you beautiful components out of the box. You copied them into your project, tweaked
        the colors, adjusted the border radius, and shipped your first feature. Then a second project started. And a
        third. Suddenly you have three codebases with three slightly different versions of your Button component. The
        design team is frustrated because the spacing on one app doesn&apos;t match the others. A new developer joins
        and asks &quot;which Button component is the canonical one?&quot; and nobody knows the answer. This is the
        moment you realize you need your own component library.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building a production component library is one of the highest-leverage investments a frontend team can make.
        It standardizes your design language, accelerates development across projects, and ensures consistency in
        quality, accessibility, and user experience. But the gap between &quot;I have some shadcn components in my
        project&quot; and &quot;I have a versioned, documented, tested component library that my whole organization
        uses&quot; is enormous. This guide is about bridging that gap. At Spectrum UI, we have gone through this
        journey ourselves, and we are going to share everything we learned along the way.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is not a quick tutorial. This is a comprehensive, 3000+ word guide covering every layer of the stack:
        monorepo setup, build tooling, component extension patterns, design tokens, testing, documentation, versioning,
        and distribution. Whether you are a solo developer building a component library for your side projects or
        a tech lead standardizing UI across a 50-person engineering team, this guide will give you a battle-tested
        roadmap to follow.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Component Library Architecture
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before we write a single line of code, let&apos;s understand the architecture. A production component library
        is not just a folder of React components. It is a layered system where each layer builds on the one below it.
        At the foundation, you have headless UI primitives from Radix UI. On top of that, shadcn/ui adds default
        styling and composition patterns. Your library adds branding, custom variants, compound components, and
        domain-specific logic. Around all of this, you have design tokens for theming, a test suite for reliability,
        and documentation for adoption.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Component Library Architecture
══════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────┐
│                        YOUR APPLICATIONS                         │
│         app-1  ·  app-2  ·  app-3  ·  marketing-site            │
└──────────────────────────┬───────────────────────────────────────┘
                           │  imports
┌──────────────────────────▼───────────────────────────────────────┐
│                   YOUR COMPONENT LIBRARY                         │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐  │
│  │  Branded   │  │  Compound  │  │  Custom     │  │  Domain   │  │
│  │  Variants  │  │  Components│  │  Hooks      │  │  Specific │  │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  └─────┬─────┘  │
│         └───────────────┼───────────────┼───────────────┘        │
└──────────────────────────┬───────────────────────────────────────┘
                           │  extends
┌──────────────────────────▼───────────────────────────────────────┐
│                      shadcn/ui COMPONENTS                        │
│                                                                  │
│     Button · Dialog · Dropdown · Input · Card · Table · ...      │
│                  styled with Tailwind CSS + cva                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │  styles
┌──────────────────────────▼───────────────────────────────────────┐
│                     RADIX UI PRIMITIVES                          │
│                                                                  │
│   Accessible · Keyboard Navigation · Focus Management · ARIA     │
└──────────────────────────────────────────────────────────────────┘

          ┌──────────────┐     ┌──────────────┐
          │ Design Tokens│     │  Test Suite   │
          │  colors      │     │  unit tests   │
          │  spacing     │     │  visual reg.  │
          │  typography  │     │  a11y tests   │
          └──────────────┘     └──────────────┘
                  ▲                    ▲
                  └───── consumed by ──┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Planning Your Library
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The biggest mistake teams make is jumping straight into code. Before you create a single file, you need to
        answer some fundamental questions. What is the scope of your library? Is it a thin branded wrapper around
        shadcn/ui, or does it include domain-specific components like data tables, charts, and form builders? Who
        are the consumers? Just your team, or multiple teams across an organization? How will it be distributed?
        As an npm package, a monorepo internal package, or a shadcn-style copy-paste registry?
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Start with a component inventory. Audit your existing applications and list every component that is used
        in more than one place. Group them into tiers. Tier 1 is your primitives: Button, Input, Label, Badge,
        Card. These are the components that every application needs. Tier 2 is your composites: Dialog, Dropdown
        Menu, Data Table, Form. These combine primitives into more complex interactions. Tier 3 is your
        domain-specific components: PricingCard, UserAvatar, NotificationBell. These encode business logic and
        are specific to your product.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Define your API conventions early. At Spectrum UI, we follow a strict set of rules: every component accepts
        <code>className</code> for style overrides, every interactive component supports both controlled and
        uncontrolled modes, every component forwards refs, and every variant is defined using <code>cva</code>.
        These conventions seem small, but they compound across dozens of components. A developer who learns the
        pattern from one component can apply it to every other component without checking the docs.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Monorepo Structure
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A monorepo is the best way to develop, test, and publish a component library alongside the applications
        that consume it. It gives you instant feedback: change a component and see the effect in your apps
        immediately. No version bumps, no publishing, no waiting. Turborepo is the recommended tool for this.
        It handles caching, task orchestration, and parallel execution out of the box.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Monorepo Structure
══════════════════

my-design-system/
├── apps/
│   ├── docs/                  # Storybook or custom docs site
│   │   ├── stories/
│   │   └── package.json
│   ├── playground/            # Live testing environment
│   │   └── package.json
│   └── web/                   # Your main application
│       └── package.json
├── packages/
│   ├── ui/                    # Core component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dialog/
│   │   │   │   ├── input/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── tokens/                # Design tokens package
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   └── typography.ts
│   │   └── package.json
│   └── tsconfig/              # Shared TypeScript config
│       ├── base.json
│       ├── react-library.json
│       └── nextjs.json
├── turbo.json
├── package.json
└── pnpm-workspace.yaml`}
        </pre>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Turborepo Configuration
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Turborepo needs to understand your task dependency graph. When you build your docs app, it should first
        build the tokens package, then the ui package, then the docs app. When you run tests, it should run
        them in parallel across all packages. Here is a minimal turbo.json configuration that handles this correctly.
      </p>

      <CodeBlock
        filename="turbo.json"
        language="json"
        code={`{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Package Configuration
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Each package in your monorepo needs a properly configured <code>package.json</code>. The UI package is
        the most important one. It needs to export both ESM and CJS formats, include TypeScript declarations,
        and specify its peer dependencies correctly. Getting this right is critical for downstream consumers.
      </p>

      <CodeBlock
        filename="packages/ui/package.json"
        language="json"
        code={`{
  "name": "@acme/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./globals.css": "./dist/globals.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "test": "vitest run",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@acme/tsconfig": "workspace:*",
    "@acme/tokens": "workspace:*",
    "tsup": "^8.0.0",
    "typescript": "^5.3.0"
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Build Pipeline with tsup
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        tsup is the recommended bundler for component libraries. It is built on esbuild, which makes it extremely
        fast. It handles TypeScript compilation, declaration generation, tree-shaking, and multiple output formats
        in a single configuration file. Unlike Rollup or Webpack, tsup requires almost zero configuration for
        the common case of bundling a React component library.
      </p>

      <CodeBlock
        filename="packages/ui/tsup.config.ts"
        language="typescript"
        code={`import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: false, // Let the consuming app handle minification
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>&quot;use client&quot;</code> banner is critical if your consumers use Next.js App Router. Without it,
        every component that uses React hooks or browser APIs will throw a server component error. By adding the
        directive at the bundle level, you ensure all components are treated as client components automatically.
        This saves your consumers from having to wrap every import in their own <code>&quot;use client&quot;</code> boundary.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Extending shadcn Components
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Now for the core question: how do you build on top of shadcn/ui? There are two strategies, wrapping and
        forking, and choosing the right one for each component is critical. Wrapping means you import the shadcn
        component and add functionality around it. Forking means you copy the shadcn source code into your
        library and modify it directly. Each has trade-offs.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Wrapping is the safer choice for most components. It preserves the ability to update the underlying
        shadcn component when new versions are released. Your wrapper adds your brand&apos;s variants, default
        props, and any additional functionality. The downside is a thin layer of indirection that can make
        debugging slightly harder. Forking gives you full control but means you are responsible for maintaining
        the component going forward, including accessibility updates from Radix.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Adding Custom Variants with cva
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The most common extension point is adding new variants. shadcn/ui uses <code>class-variance-authority</code>
        (cva) for all variant definitions. You can extend these with your own brand-specific variants while
        preserving the originals.
      </p>

      <CodeBlock
        filename="packages/ui/src/components/button/button.tsx"
        language="tsx"
        code={`import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Your custom variants
        brand: "bg-brand text-brand-foreground hover:bg-brand/90 shadow-brand/25 shadow-md",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
        warning: "bg-amber-500 text-white hover:bg-amber-600",
        gradient: "bg-gradient-to-r from-brand to-brand-accent text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Compound Component Patterns
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For more complex components, the compound component pattern is invaluable. It lets you create components
        that share implicit state through React Context while giving consumers full control over composition. This
        is the pattern that shadcn/ui uses for Dialog, Accordion, and other interactive components, and you should
        extend it for your own compound components.
      </p>

      <CodeBlock
        filename="packages/ui/src/components/stepper/stepper.tsx"
        language="tsx"
        code={`import * as React from "react";
import { cn } from "../../utils/cn";

// Context for shared state
interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within a Stepper");
  return context;
}

// Root component manages state
interface StepperProps {
  defaultStep?: number;
  step?: number;
  onStepChange?: (step: number) => void;
  children: React.ReactNode;
  className?: string;
}

function Stepper({ defaultStep = 0, step, onStepChange, children, className }: StepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultStep);
  const activeStep = step ?? internalStep;
  const totalSteps = React.Children.count(children);

  const goToStep = React.useCallback((s: number) => {
    setInternalStep(s);
    onStepChange?.(s);
  }, [onStepChange]);

  return (
    <StepperContext.Provider value={{
      activeStep,
      totalSteps,
      goToStep,
      nextStep: () => goToStep(Math.min(activeStep + 1, totalSteps - 1)),
      prevStep: () => goToStep(Math.max(activeStep - 1, 0)),
    }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </StepperContext.Provider>
  );
}

// Sub-components consume context
function StepperStep({ children, className }: { children: React.ReactNode; className?: string; index?: number }) {
  return <div className={cn("flex items-center gap-3", className)}>{children}</div>;
}

function StepperActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex gap-2 justify-end", className)}>{children}</div>;
}

export { Stepper, StepperStep, StepperActions, useStepper };`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The compound component pattern gives you the best of both worlds. The library manages complex state
        internally (step tracking, validation, transitions), but the consumer controls the structure and
        presentation. They can put step indicators at the top or bottom, add custom content between steps,
        or even build a completely custom UI using the <code>useStepper</code> hook. This flexibility is what
        separates a toy component from a production one.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Build and Publish Pipeline
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Getting your component library from source code to a published npm package involves several stages.
        Each stage has a specific job: compile TypeScript, bundle the output, generate type declarations,
        run quality checks, and finally publish. Here is the full pipeline visualized.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Build & Publish Pipeline
════════════════════════

  Source Code (.tsx)
        │
        ▼
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │   TypeScript │     │   ESLint    │     │   Vitest    │
  │   Compiler   │     │   Linter    │     │   Tests     │
  │   (tsc)      │     │             │     │             │
  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
         │                   │                   │
         ▼                   ▼                   ▼
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │  Type Check  │     │  Lint Pass  │     │  Test Pass  │
  │  ✓ or ✗     │     │  ✓ or ✗     │     │  ✓ or ✗     │
  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    All checks pass?
                      ┌──────┴──────┐
                      │  YES        │  NO ──▶ Fix & Retry
                      └──────┬──────┘
                             ▼
                  ┌──────────────────┐
                  │     tsup Build   │
                  │                  │
                  │  ├── index.js    │
                  │  ├── index.mjs   │
                  │  ├── index.d.ts  │
                  │  └── globals.css │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   Changesets     │
                  │   Version Bump   │
                  │   + Changelog    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   npm publish    │
                  │   or             │
                  │   GitHub Packages│
                  └──────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Design Token Integration
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Design tokens are the atomic values that define your visual language: colors, spacing, typography,
        shadows, border radii. They are the bridge between your design team&apos;s Figma file and your code.
        Instead of hardcoding <code>bg-blue-600</code> everywhere, you use semantic tokens like
        <code>bg-primary</code> that can be remapped to any color depending on the theme or brand.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        shadcn/ui already uses CSS custom properties for theming, and you should build on top of that pattern.
        The key insight is to organize your tokens into three layers: primitive tokens (raw values like specific
        hex colors), semantic tokens (purpose-based names like &quot;primary&quot; or &quot;destructive&quot;),
        and component tokens (component-specific overrides). This three-layer architecture lets you swap entire
        themes by changing just the semantic layer.
      </p>

      <CodeBlock
        filename="packages/tokens/src/themes/brand-a.css"
        language="css"
        code={`/* Primitive tokens - raw values */
:root {
  --color-blue-50: 210 100% 97%;
  --color-blue-500: 210 100% 50%;
  --color-blue-600: 210 100% 44%;
  --color-blue-700: 210 100% 38%;
  --color-green-500: 142 76% 36%;
  --color-red-500: 0 84% 60%;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

/* Semantic tokens - purpose-based */
:root {
  --background: 0 0% 100%;
  --foreground: 210 11% 15%;
  --primary: var(--color-blue-600);
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 210 11% 15%;
  --destructive: var(--color-red-500);
  --destructive-foreground: 0 0% 100%;
  --brand: var(--color-blue-600);
  --brand-foreground: 0 0% 100%;
  --brand-accent: 260 80% 60%;
  --ring: var(--color-blue-500);
  --radius: var(--radius-md);
}

/* Dark mode semantic overrides */
.dark {
  --background: 210 11% 10%;
  --foreground: 210 11% 95%;
  --primary: var(--color-blue-500);
  --secondary: 210 11% 18%;
  --secondary-foreground: 210 11% 95%;
}

/* Component tokens - specific overrides */
:root {
  --button-radius: var(--radius);
  --button-font-weight: 500;
  --card-radius: var(--radius-lg);
  --card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --input-radius: var(--radius);
  --input-border: 210 16% 82%;
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Multi-Brand Support
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the most powerful capabilities of a token-based architecture is multi-brand support. If your
        organization has multiple products with different visual identities, you can share the same component
        library and swap themes at the CSS level. The components are identical in structure, behavior, and
        accessibility. Only the visual tokens change. This is how large design systems like Atlassian&apos;s
        and IBM&apos;s Carbon work at scale.
      </p>

      <CodeBlock
        filename="packages/tokens/src/themes/brand-b.css"
        language="css"
        code={`/* Brand B overrides - only semantic layer changes */
[data-brand="b"] {
  --primary: 262 83% 58%;        /* Purple instead of blue */
  --primary-foreground: 0 0% 100%;
  --brand: 262 83% 58%;
  --brand-accent: 330 80% 60%;   /* Pink accent */
  --ring: 262 83% 58%;
  --radius: var(--radius-xl);    /* More rounded */
  --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

[data-brand="b"].dark {
  --primary: 262 83% 68%;
  --background: 262 11% 10%;
  --foreground: 262 11% 95%;
}`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        To switch brands, you simply add a <code>data-brand</code> attribute to your root HTML element. No
        component code changes. No conditional logic. No separate builds. This is the power of a well-designed
        token architecture. It decouples what your components do from how they look, and it means your QA team
        only needs to test behavior once because the visual differences are purely cosmetic.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Testing Your Components
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A component library without tests is a liability. Every component is used in multiple places across
        multiple applications. A bug in your Button component is a bug in every application that uses it.
        Testing is not optional; it is the foundation of trust. If your consumers do not trust that your
        library is reliable, they will stop using it and build their own components instead.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        We recommend a three-layer testing strategy: unit tests for logic and interactions, visual regression
        tests for appearance, and accessibility tests for compliance. Each layer catches a different class of
        bugs, and together they provide comprehensive coverage.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Unit Testing with Vitest
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Vitest is the recommended test runner for modern React libraries. It is fast, supports JSX out of the
        box, and has a Jest-compatible API so there is no learning curve. Combined with Testing Library, you
        can write tests that verify your components from the user&apos;s perspective.
      </p>

      <CodeBlock
        filename="packages/ui/src/components/button/button.test.tsx"
        language="tsx"
        code={`import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-destructive");
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Click</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("spreads additional props", () => {
    render(<Button data-testid="my-button" aria-label="submit form">Go</Button>);
    expect(screen.getByTestId("my-button")).toBeInTheDocument();
    expect(screen.getByLabelText("submit form")).toBeInTheDocument();
  });

  it("calls onClick handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Visual Regression Testing
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Unit tests verify behavior, but they cannot catch visual regressions. A CSS change that subtly breaks
        your layout will pass every unit test. This is where visual regression testing comes in. Tools like
        Chromatic (which integrates with Storybook) take screenshots of every component in every state and
        compare them against a baseline. Any visual difference is flagged for review. This catches the kind
        of bugs that slip through code review because the change looked fine in isolation but broke something
        in a specific state or viewport size.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Accessibility Testing with axe
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Accessibility is not something you check manually. It needs to be automated. The <code>axe-core</code>
        library can be integrated into both your unit tests and your Storybook stories. It catches common
        accessibility violations like missing labels, insufficient color contrast, and incorrect ARIA roles. We
        run axe against every component in every variant as part of our CI pipeline.
      </p>

      <CodeBlock
        filename="packages/ui/src/test-utils/a11y.tsx"
        language="tsx"
        code={`import { render, RenderOptions } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect } from "vitest";

expect.extend(toHaveNoViolations);

export async function testA11y(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  const { container } = render(ui, options);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  return results;
}

// Usage in tests:
// import { testA11y } from "../../test-utils/a11y";
//
// it("has no accessibility violations", async () => {
//   await testA11y(<Button>Click me</Button>);
// });
//
// it("has no a11y violations in all variants", async () => {
//   for (const variant of ["default", "destructive", "outline", "ghost"]) {
//     await testA11y(<Button variant={variant}>Label</Button>);
//   }
// });`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Documentation
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A component library without documentation is a component library that nobody uses. Documentation is
        not just about listing props. It is about showing developers how to use your components effectively.
        Good documentation includes live examples, prop tables, usage guidelines, accessibility notes, and
        migration guides. At Spectrum UI, we treat documentation as a first-class product, not an afterthought.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Storybook for Component Documentation
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook is the industry standard for component documentation. It provides an isolated environment
        where you can develop, test, and showcase your components. Each component gets a page with interactive
        controls, a prop table, and multiple stories showing different states. The best part is that your
        Storybook stories double as visual regression test cases when you integrate with Chromatic.
      </p>

      <CodeBlock
        filename="apps/docs/stories/button.stories.tsx"
        language="tsx"
        code={`import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@acme/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link", "brand", "gradient"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon"],
      description: "The size of the button",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner and disables the button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A versatile button component with multiple variants, sizes, and loading states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="brand">Brand</Button>
      <Button variant="gradient">Gradient</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { children: "Saving...", loading: true },
};

export const AsLink: Story = {
  args: { children: "Go to docs", asChild: true },
  render: (args) => (
    <Button {...args}>
      <a href="/docs">Go to docs</a>
    </Button>
  ),
};`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Auto-Generating Prop Tables
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Manually maintaining prop documentation is a recipe for stale docs. Instead, use tools that extract
        prop information directly from your TypeScript types. Storybook does this automatically with its
        <code>autodocs</code> feature. For custom documentation sites, <code>react-docgen-typescript</code>
        can parse your component files and generate JSON descriptions of every prop, including its type,
        default value, and description from JSDoc comments. This ensures your documentation is always in sync
        with your code.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Versioning and Publishing
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once your library is ready for consumers, you need a reliable versioning and publishing strategy.
        Semantic versioning (semver) is the standard: major versions for breaking changes, minor versions for
        new features, and patch versions for bug fixes. The challenge is tracking these changes across multiple
        packages in a monorepo. This is where Changesets comes in.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Versioning & Release Pipeline
═════════════════════════════

  Developer pushes code
         │
         ▼
  ┌─────────────────┐     ┌─────────────────┐
  │  PR includes a  │ NO  │  CI reminds dev  │
  │  changeset?     │────▶│  to add one      │
  └────────┬────────┘     └─────────────────┘
           │ YES
           ▼
  ┌─────────────────┐
  │  PR merged to   │
  │  main branch    │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐     ┌─────────────────────────┐
  │  Changesets bot  │────▶│  Creates "Version PR"   │
  │  runs in CI      │     │                         │
  └──────────────────┘     │  - Bumps package.json   │
                           │  - Updates CHANGELOG.md │
                           │  - Groups all pending   │
                           │    changesets            │
                           └────────┬────────────────┘
                                    │ Merged by maintainer
                                    ▼
                           ┌─────────────────────────┐
                           │  CI publishes to npm     │
                           │                         │
                           │  @acme/ui@1.2.0         │
                           │  @acme/tokens@1.1.0     │
                           └─────────────────────────┘`}
        </pre>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Changesets is a tool designed specifically for versioning in monorepos. Each PR that modifies a package
        includes a &quot;changeset&quot; file that describes what changed and whether it is a major, minor, or
        patch change. When changesets are merged, the Changesets bot creates a &quot;Version Packages&quot; PR
        that bumps all affected package versions and updates changelogs. Merging that PR triggers the publish
        step. This workflow ensures that every change is intentionally versioned and documented.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Private Registry Distribution
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your component library is internal to your organization, you probably do not want to publish it to
        the public npm registry. GitHub Packages and Artifactory are popular choices for private registries.
        GitHub Packages integrates seamlessly with GitHub Actions, making your CI/CD pipeline straightforward.
        You configure your package.json with the registry URL, set up authentication via an npm token, and your
        publish step works identically to a public publish.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Another option is to skip the registry entirely and use internal monorepo references. If all your
        applications live in the same monorepo as your component library, you can reference the UI package
        directly with <code>&quot;@acme/ui&quot;: &quot;workspace:*&quot;</code>. This gives you instant
        updates without any publishing step. Turborepo handles the build order automatically. The trade-off
        is that every application must live in the monorepo, which may not be feasible for larger organizations
        with multiple repositories.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Lessons from Spectrum UI
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building Spectrum UI taught us lessons that no tutorial could have prepared us for. Here are the most
        important ones, each earned through real-world pain.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lesson 1: Start With Fewer Components
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Our first impulse was to build 50 components before releasing anything. That was a mistake. We should
        have started with 10 rock-solid components and expanded from there. A small library that is reliable,
        well-tested, and well-documented is infinitely more valuable than a large library with gaps in quality.
        Your consumers will tell you which components they need next. Listen to them instead of guessing.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lesson 2: Do Not Break the API
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Nothing erodes trust faster than breaking changes. Once you publish a component API, it is a contract.
        Renaming a prop from <code>color</code> to <code>variant</code> in a minor release will break every
        consumer. Use deprecation warnings, provide codemods when possible, and batch breaking changes into
        major releases. If you must change an API, give consumers a migration path. Ship the new API alongside
        the old one, mark the old one as deprecated, and remove it in the next major version. This gives teams
        time to migrate without their builds breaking overnight.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lesson 3: Invest in Developer Experience
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best component library is the one developers choose to use, not the one they are forced to use.
        Invest in great TypeScript types so autocomplete just works. Invest in documentation with copy-paste
        examples. Invest in error messages that tell developers what went wrong and how to fix it. We added
        development-only warnings that detect common mistakes like passing both <code>value</code> and
        <code>defaultValue</code> to the same component. These warnings cost almost nothing to implement
        but save developers hours of debugging.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lesson 4: CSS is Harder Than You Think
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CSS specificity battles, style isolation, and cascade conflicts are the most common source of bugs
        in a component library. Tailwind CSS helps enormously because it generates utility classes with
        predictable specificity. But you still need to be careful. Make sure your component styles do not
        leak into surrounding elements. Make sure consumer overrides via <code>className</code> actually
        work. And test your components in the context of a real application, not just in Storybook isolation.
        A component that looks perfect in isolation can break when composed with other components in a real layout.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Lesson 5: Documentation is Never Done
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        We thought we could write the docs once and move on. We were wrong. Documentation needs to evolve with
        every release. New variants need new examples. New patterns need new guides. Bug reports often reveal
        documentation gaps. We now treat documentation updates as a required part of every PR that changes a
        component API. If you change the code but not the docs, the PR is not done.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Mistakes to Avoid
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li>
          <strong>Over-abstracting too early.</strong> Do not build a generic component system before you understand
          your specific use cases. Start concrete, extract patterns later.
        </li>
        <li>
          <strong>Ignoring bundle size.</strong> Your component library is a dependency of every application. Tree-shaking
          is essential. Use <code>sideEffects: false</code> in your package.json and ensure your bundler supports it.
        </li>
        <li>
          <strong>Not testing in consumer contexts.</strong> A component that works in isolation may break in a real
          application due to CSS conflicts, context providers, or React version mismatches. Always test in a real app.
        </li>
        <li>
          <strong>Skipping accessibility.</strong> Building on top of Radix gives you a strong foundation, but you
          still need to test with screen readers and keyboard navigation. Automated tests catch only about 30% of
          accessibility issues.
        </li>
        <li>
          <strong>Not versioning design tokens.</strong> Tokens change over time. If you do not version them alongside
          your components, you will have style mismatches between token versions and component versions.
        </li>
        <li>
          <strong>Building in isolation from your design team.</strong> Your component library should be a shared
          language between design and engineering. Involve designers in API reviews, naming decisions, and token
          definitions. The best component libraries are built collaboratively.
        </li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Conclusion: The Launch Checklist
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building a production component library is a significant undertaking, but the payoff is enormous. You
        get consistency across applications, faster development velocity, a single source of truth for your
        design system, and built-in accessibility and quality. Here is a checklist to make sure you are ready
        to ship.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Production Launch Checklist</h3>
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Monorepo is set up with Turborepo and pnpm workspaces</li>
          <li>Build pipeline produces ESM, CJS, and TypeScript declarations</li>
          <li>All components forward refs and spread props</li>
          <li>Every component has unit tests covering core behavior</li>
          <li>Accessibility tests pass for all components and variants</li>
          <li>Visual regression testing is configured in CI</li>
          <li>Design tokens are defined and documented</li>
          <li>Dark mode works correctly for every component</li>
          <li>Storybook is deployed with interactive examples and prop tables</li>
          <li>Changesets is configured for versioning and changelog generation</li>
          <li>CI/CD pipeline builds, tests, and publishes automatically</li>
          <li>Package exports are correctly configured for tree-shaking</li>
          <li>Consumer applications can install and use the library without issues</li>
          <li><code>&quot;use client&quot;</code> directive is added for Next.js App Router compatibility</li>
          <li>README includes quick start guide with installation and basic usage</li>
          <li>Migration guide exists for teams moving from raw shadcn/ui components</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The journey from shadcn/ui primitives to a production component library is not a weekend project. It
        requires careful planning, solid engineering, and ongoing investment. But once you have it, you will
        wonder how you ever shipped products without it. Every new feature starts faster because the building
        blocks are already there. Every application looks and feels consistent because they share the same
        components. Every developer is more productive because the patterns are documented and the APIs are
        intuitive. That is the promise of a well-built design system, and it is absolutely worth the effort
        to get there.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        At Spectrum UI, we continue to evolve our library every day. We add new components based on user feedback,
        refine our tokens based on design reviews, and improve our documentation based on support questions. A
        component library is a living product, not a finished artifact. Treat it that way, invest in it consistently,
        and it will become the most valuable piece of infrastructure your frontend team owns.
      </p>
    </div>
  ),
};

export default blogPost;
