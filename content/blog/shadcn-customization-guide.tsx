import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "How to Make Shadcn UI Components Actually Yours",
  excerpt:
    "Shadcn UI gives you great components out of the box, but the magic happens when you customize them. Here is how to make them fit your design without breaking everything.",
  author: {
    name: "Arihant Jain",
    role: "Engineering",
    avatar: "/arihant.jpeg",
  },
  date: "Oct 24, 2025",
  readTime: "15 min read",
  icon: "🎨",
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Makes Shadcn Different from Every Other Component Library
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Shadcn UI isn&apos;t like other React component libraries. With most libraries, you install a package, import components, and hope the default styling works for your project. When it doesn&apos;t, you&apos;re stuck fighting with overrides and !important rules. Shadcn takes a completely different approach. Instead of installing packages, you copy the actual source code directly into your project. You own every single line.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This means you can change whatever you want. Want to tweak the button border radius? Go ahead. Want to add a new variant to your card component? Just edit the file. No waiting for the library maintainer to accept a pull request. No digging through node_modules. The code is right there in your project, and it&apos;s yours to shape however you need.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        But with great power comes the need for a good strategy. If you start making random changes without a plan, you&apos;ll end up with a mess that&apos;s hard to maintain and even harder to update. This guide will show you exactly how to customize shadcn components the right way, whether you&apos;re building with Next.js, React, or any frontend framework that uses Tailwind CSS. Let&apos;s walk through four proven methods that will make your design system truly yours.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve been using shadcn in production apps for over a year now, and I&apos;ve tried every customization approach you can imagine. Some worked great, some created nightmares. What I&apos;m sharing here is the distilled version of all those experiments. The stuff that actually works when you&apos;re shipping real web applications with real deadlines and real teams.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Shadcn Customization Strategy:

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Install     │────▶│  Customize   │────▶│  Extend      │
│  Component   │     │  Tokens      │     │  with Wrappers│
│              │     │              │     │              │
│ npx shadcn   │     │ CSS vars     │     │ New props    │
│ add button   │     │ in globals   │     │ New features │
└──────────────┘     └──────────────┘     └──────────────┘
                                               │
                          ┌────────────────────┘
                          ▼
                   ┌──────────────┐     ┌──────────────┐
                   │  Compose     │────▶│  Your Brand  │
                   │  Patterns    │     │  Design System│
                   │              │     │              │
                   │ Forms, Cards │     │ Consistent   │
                   │ Dashboards   │     │ & Scalable   │
                   └──────────────┘     └──────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Understanding How Shadcn Components Work Under the Hood
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before you start customizing, it helps to understand the anatomy of a shadcn component. Every component follows the same pattern: Radix UI handles the behavior and accessibility (keyboard navigation, focus management, screen reader support), and Tailwind CSS handles the visual styling. The <code>cn()</code> utility function from your <code>lib/utils.ts</code> merges class names so your custom classes can override the defaults cleanly.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This architecture is genuinely clever. By separating behavior from styling, shadcn lets you reskin everything without worrying about breaking interactions. The dropdown still opens and closes correctly. The dialog still traps focus. The tabs still handle arrow key navigation. All you&apos;re changing is how things look, not how they work. That separation is what makes customization safe and predictable in your frontend development workflow.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Anatomy of a Shadcn Component
      </h3>
      <CodeBlock
        filename="Component.tsx"
        language="tsx"
        code={`// Every shadcn component follows this pattern:
import * as React from "react"
import * as RadixPrimitive from "@radix-ui/react-primitive"
import { cn } from "@/lib/utils"

const Component = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadixPrimitive.Root
    ref={ref}
    className={cn("default-tailwind-styles-here", className)}
    {...props}
  />
))
Component.displayName = "Component"

export { Component }

// Key things to notice:
// 1. Radix UI provides behavior + accessibility
// 2. Tailwind CSS provides all visual styling
// 3. cn() lets YOUR className override defaults
// 4. forwardRef enables parent DOM access`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why This Pattern Matters for Customization
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Because <code>cn()</code> uses <code>clsx</code> and <code>tailwind-merge</code> under the hood, you can pass your own className and it will intelligently merge with the defaults. If you pass <code>className=&quot;bg-red-500&quot;</code> and the default has <code>bg-primary</code>, tailwind-merge knows to use your red background instead of the default. This is what makes shadcn so pleasant to customize. You don&apos;t fight the defaults, you override them cleanly.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Understanding this merging behavior is key. Without tailwind-merge, you&apos;d end up with both <code>bg-primary</code> and <code>bg-red-500</code> in your class list, and the one that appears later in the CSS would win. That&apos;s unpredictable and frustrating. Tailwind-merge solves this by understanding which Tailwind CSS classes conflict and removing the one you&apos;re overriding. It&apos;s a small utility that makes a massive difference in your web development experience.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        How the cn() Utility Actually Works
      </h3>
      <CodeBlock
        filename="lib/utils.ts"
        language="typescript"
        code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// clsx handles conditional classes:
// cn("base", isActive && "active", className)
// → "base active custom-class"

// twMerge resolves conflicts:
// cn("bg-primary p-4", "bg-red-500")
// → "p-4 bg-red-500" (red wins, primary removed)

// This is why shadcn customization "just works"`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Method 1: Change Your Entire Theme with CSS Variables
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The easiest and most powerful way to customize shadcn is through CSS variables. All the colors in shadcn are defined as CSS custom properties in your <code>globals.css</code> file. Change these variables and your entire app gets a new look instantly. No need to hunt down every component file and edit individual classes. This is the foundation of any good design system.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Think of CSS variables as the control panel for your entire UI. Every button, every card, every input field references these variables. When you change <code>--primary</code> from blue to purple, every single element that uses the primary color updates automatically. It&apos;s the single most impactful thing you can do when setting up a new project with shadcn and Next.js.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Setting Up Your Custom Theme
      </h5>
      <CodeBlock
        filename="globals.css"
        language="css"
        code={`/* In your globals.css - this controls EVERYTHING */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --muted: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* ... dark mode overrides */
  }
}

/* Change --primary from blue to purple:
   --primary: 270 80% 60%;
   Every button, link, and accent updates automatically */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Understanding the HSL Format
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You might notice that shadcn uses a slightly unusual format for its CSS variables. Instead of full HSL like <code>hsl(221, 83%, 53%)</code>, it stores just the raw values: <code>221.2 83.2% 53.3%</code>. This is intentional. It lets Tailwind CSS apply opacity modifiers like <code>bg-primary/50</code> for a 50% transparent primary color. If you used the full hsl() syntax, opacity modifiers wouldn&apos;t work. It&apos;s a smart design choice that gives you more flexibility in your Tailwind CSS classes.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Pro Tip: Use the Shadcn Theme Generator
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Shadcn has an online theme generator that lets you pick colors visually and gives you the exact CSS variables to paste into your globals.css. It generates both light and dark mode values, saving you tons of time. Just pick your brand colors, copy the output, and paste it in. Your entire app updates in seconds. There are also community tools like shadcn-ui-theme-generator that give you even more control over the output.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`CSS Variable Theming Flow:

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   globals.css    │     │  Tailwind Config  │     │   Components     │
│                  │     │                  │     │                  │
│  --primary:      │────▶│  primary:        │────▶│  bg-primary      │
│    270 80% 60%   │     │    hsl(var(      │     │  text-primary    │
│                  │     │    --primary))   │     │  border-primary  │
│  --secondary:    │     │                  │     │                  │
│    210 40% 96%   │     │  secondary:      │     │  bg-secondary    │
│                  │     │    hsl(var(      │     │  text-secondary  │
│  --destructive:  │     │    --secondary)) │     │                  │
│    0 84% 60%     │     │                  │     │  bg-destructive  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        │
        │  Change once here
        ▼
┌──────────────────┐
│  Entire app      │
│  updates at once │
│  Light + Dark    │
└──────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Method 2: Create Custom Component Variants with CVA
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Want different button styles beyond what shadcn provides by default? That&apos;s where <code>class-variance-authority</code> (CVA) comes in. CVA is the tool that shadcn uses internally to manage component variants like &quot;default,&quot; &quot;destructive,&quot; and &quot;outline.&quot; You can add your own custom variants to any component by extending the CVA configuration.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CVA is one of those tools that changes how you think about UI components. Instead of writing conditional className logic with ternary operators everywhere, you define a clean set of variants upfront and the right Tailwind CSS classes get applied automatically. It also gives you full TypeScript support, so your IDE autocompletes variant names and catches typos at build time. That&apos;s a huge win for frontend development at scale.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Adding Custom Button Variants
      </h3>
      <CodeBlock
        filename="button-variants.tsx"
        language="tsx"
        code={`import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // YOUR CUSTOM VARIANTS:
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg", // Custom size
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Now you can use your custom variants:
<Button variant="success" size="lg">Save Changes</Button>
<Button variant="gradient">Upgrade to Pro</Button>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Compound Variants for Complex Conditions
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CVA also supports compound variants, which let you apply styles when multiple variant conditions are met simultaneously. For example, you might want a destructive button to look different when it&apos;s in the outline style versus the filled style. This is incredibly useful for building a design system with nuanced visual rules.
      </p>
      <CodeBlock
        filename="compound-variants.tsx"
        language="tsx"
        code={`const buttonVariants = cva("base-styles", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { sm: "...", lg: "..." },
  },
  compoundVariants: [
    {
      variant: "destructive",
      size: "lg",
      className: "font-bold uppercase tracking-wide",
    },
  ],
})

// Large destructive buttons get extra emphasis automatically
// This kind of rule is hard to express with plain className logic`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        When to Add Variants vs. When to Use className
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If a style will be reused across multiple places in your app, make it a variant. If it&apos;s a one-off tweak for a specific page, just use the className prop. Variants are part of your design system. One-off classes are just implementation details. Keeping this distinction clear will save you from variant bloat where your button has 20 variants that each get used once.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A good rule of thumb: if you find yourself applying the same set of Tailwind CSS classes to a component in three or more places, it&apos;s time to make it a variant. If it&apos;s just once or twice, className is fine. This keeps your variant definitions focused and meaningful, which makes them easier for other developers on your team to discover and use correctly.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Method 3: Extend Components with Wrapper Patterns
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s the golden rule of shadcn customization: don&apos;t modify the original component files if you can avoid it. Instead, create wrapper components that add your custom features on top. This keeps the base components clean and updatable, while giving you all the custom functionality you need. Think of it like building with LEGO. You don&apos;t reshape the bricks, you stack new ones on top.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The wrapper pattern is essential for teams. When a new developer joins and asks &quot;where does the loading button live?&quot; they find it in <code>components/custom/loading-button.tsx</code>, clearly separate from the base shadcn primitives. They can see exactly what custom behavior was added on top. This clarity scales incredibly well in frontend development with larger teams.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Example: A Loading Button Wrapper
      </h3>
      <CodeBlock
        filename="loading-button.tsx"
        language="tsx"
        code={`// components/loading-button.tsx
import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
}

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  )
}

// Usage - clean and readable:
<LoadingButton isLoading={submitting} loadingText="Saving...">
  Save Changes
</LoadingButton>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Example: A Confirm Button with Dialog
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a more advanced wrapper that shows how powerful this pattern can be. This button wraps a confirmation dialog around any destructive action, so you don&apos;t have to wire up dialog state manually every time someone needs a &quot;delete&quot; button in your React app.
      </p>
      <CodeBlock
        filename="confirm-button.tsx"
        language="tsx"
        code={`import { useState } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ConfirmButtonProps extends ButtonProps {
  confirmTitle?: string
  confirmDescription?: string
  onConfirm: () => void
}

export function ConfirmButton({
  confirmTitle = "Are you sure?",
  confirmDescription = "This action cannot be undone.",
  onConfirm,
  children,
  ...props
}: ConfirmButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" {...props}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        More Wrapper Ideas for Your Design System
      </h5>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>ConfirmButton:</strong> A button that shows a confirmation dialog before executing the action</li>
          <li><strong>CopyButton:</strong> A button that copies text to clipboard and shows a success checkmark</li>
          <li><strong>SearchInput:</strong> An input with a built-in search icon and debounced onChange handler</li>
          <li><strong>PasswordInput:</strong> An input with a show/hide password toggle built in</li>
          <li><strong>DatePickerInput:</strong> An input that opens a calendar popover from your UI library</li>
          <li><strong>FileUploadButton:</strong> A button that opens the native file picker and handles the selection</li>
          <li><strong>LinkButton:</strong> A button that navigates using Next.js router instead of native anchor behavior</li>
        </ul>
      </div>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Wrapper Pattern Architecture:

┌───────────────────────────────────────┐
│           Your App Code               │
│  <LoadingButton />  <SearchInput />   │
└──────────────┬────────────────────────┘
               │ uses
┌──────────────▼────────────────────────┐
│         Wrapper Components            │
│  LoadingButton  SearchInput  etc.     │
│  (your custom props + logic)          │
└──────────────┬────────────────────────┘
               │ wraps
┌──────────────▼────────────────────────┐
│         Shadcn UI Primitives          │
│  Button  Input  Dialog  Card  etc.    │
│  (Radix UI + Tailwind CSS)            │
└───────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Method 4: Compose Components to Build Complex UI
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Sometimes you need something more complex than a single component with a wrapper. You need to combine multiple shadcn components into larger, reusable patterns. This is composition, and it&apos;s one of the most powerful patterns in React development. A settings card that combines Card, Label, Input, and Button. A data filter that combines Select, DatePicker, and Button. These composed patterns become the building blocks of your specific application.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Composition is where your design system really starts to shine. Individual primitives like Button and Input are useful, but the real productivity gains come when you compose them into higher-level patterns that match your product&apos;s specific needs. A &quot;SettingsCard&quot; that your team can drop into any page is worth ten times more than the individual components it&apos;s made of, because it captures not just the UI but the entire interaction pattern.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Building a Composed Settings Card
      </h3>
      <CodeBlock
        filename="settings-card.tsx"
        language="tsx"
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function SettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" type="text" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Email Notifications</Label>
          <Switch id="notifications" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Building a Composed Data Table Header
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s another composition example that combines search, filter, and action buttons into a reusable data table header. This pattern shows up in almost every dashboard or admin panel I build with React and Next.js.
      </p>
      <CodeBlock
        filename="data-table-header.tsx"
        language="tsx"
        code={`import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search, Plus, Download } from "lucide-react"

interface DataTableHeaderProps {
  onSearch: (query: string) => void
  onFilterChange: (value: string) => void
  onAdd: () => void
  filterOptions: { label: string; value: string }[]
}

export function DataTableHeader({
  onSearch, onFilterChange, onAdd, filterOptions
}: DataTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9"
            onChange={(e) => onSearch(e.target.value)} />
        </div>
        <Select onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onAdd}><Plus className="mr-2 h-4 w-4" />Add New</Button>
    </div>
  )
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Pro Tips That Will Save You Hours
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mt-6 mb-3">Things Every Shadcn User Should Know</h3>
        <ul className="space-y-3 list-disc list-inside">
          <li><strong>Always use cn() for merging classes:</strong> Never manually concatenate Tailwind CSS classes. The cn() utility handles conflicts intelligently so you don&apos;t have to worry about specificity wars.</li>
          <li><strong>Never remove accessibility attributes:</strong> When customizing, keep all ARIA attributes and keyboard navigation. Radix UI put them there for a reason. Your users depend on them.</li>
          <li><strong>Test both light and dark mode:</strong> Every change you make needs to look good in both themes. It&apos;s easy to forget dark mode when you&apos;re developing in light mode all day.</li>
          <li><strong>Document your customizations:</strong> Keep a record of what you&apos;ve changed from the shadcn defaults. This makes updates and onboarding new team members much easier.</li>
          <li><strong>Create shared utilities:</strong> If you&apos;re applying the same custom styles in multiple places, extract them into a shared utility or variant instead of duplicating code.</li>
          <li><strong>Pin your Radix versions:</strong> Shadcn components depend on specific Radix UI versions. Unexpected major version bumps can break things. Lock your package versions in your Next.js project.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Mistakes That Will Bite You Later
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve seen these mistakes in dozens of codebases. They seem harmless at first but cause real pain down the road as your project grows. Here&apos;s what to watch out for when customizing your shadcn components.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 1: Hardcoding Colors Instead of Using Tokens
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you write <code>bg-blue-500</code> directly on a component, you&apos;re bypassing the entire theming system. If you ever need to support dark mode, rebrand, or create a white-label version, you&apos;ll have to find and replace every hardcoded color. Always use the semantic tokens like <code>bg-primary</code>, <code>text-foreground</code>, and <code>bg-muted</code>.
      </p>

      <CodeBlock
        filename="color-usage.tsx"
        language="tsx"
        code={`// Bad - hardcoded color bypasses theming
<Button className="bg-blue-500">Click me</Button>

// Good - uses design token that works in all themes
<Button className="bg-primary">Click me</Button>

// Bad - won't work in dark mode
<div className="text-gray-800">Some text</div>

// Good - automatically adapts to the current theme
<div className="text-foreground">Some text</div>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 2: Editing Base Components Directly
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you modify the Button component in <code>components/ui/button.tsx</code> to add loading state logic, you&apos;ve coupled a specific feature to your base primitive. Now every button in your app has loading-related code even when it doesn&apos;t need it. Use wrapper components instead. Keep your primitives clean and generic in your scalable design system.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 3: Forgetting Mobile and Touch
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your customizations need to work on phones too. If you add a hover effect, make sure there&apos;s also a touch feedback state. If you change sizing, verify that touch targets stay at least 44px. Test on real devices, not just browser DevTools. Responsive design is a fundamental part of modern web development.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 4: Fighting the Defaults
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you find yourself overriding almost every style on a shadcn component, step back and ask yourself: do I actually need this component, or should I build something different? Shadcn components are designed for specific use cases. If your use case is fundamentally different, it might be better to create a new component from scratch using Radix UI primitives directly.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 5: Not Planning for Updates
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Shadcn releases updates to its UI components regularly. New features, bug fixes, accessibility improvements. If you&apos;ve heavily modified the base component files, pulling in updates becomes a merge nightmare. By using the wrapper and composition patterns described above, your base components stay close to the originals and updates are painless.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Keeping Your Customizations Organized
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        As your project grows, you&apos;ll accumulate more and more customizations. Here&apos;s how to keep things tidy so your frontend stays maintainable. Organization matters more than you think, especially when multiple developers are working in the same React codebase.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        A Clean File Organization Strategy
      </h5>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>components/ui/</strong> - Base shadcn components. Touch these as little as possible.</li>
          <li><strong>components/custom/</strong> - Your wrapper components that extend shadcn primitives.</li>
          <li><strong>components/patterns/</strong> - Composed components that combine multiple primitives into reusable patterns.</li>
          <li><strong>styles/globals.css</strong> - Your CSS variable tokens. This is where theming lives.</li>
          <li><strong>lib/utils.ts</strong> - The cn() utility and any shared helpers for your design system.</li>
        </ul>
      </div>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Version Control Tip
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you first add a shadcn component, commit it separately before making any customizations. This way, you always have a clean diff showing exactly what you changed from the original. When shadcn releases updates, you can easily compare your customized version against the new default to see if you want to pull in any improvements. This is a small discipline that pays off massively over the lifetime of your project.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Scaling Shadcn Across a Team
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once you have a customization strategy that works, the next challenge is making sure everyone on your team follows it. Here are some practices that help with consistency in web development teams.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Write Component Documentation
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For every custom wrapper or composed component, add a brief JSDoc comment explaining what it does and when to use it. Storybook is even better if your team already has it set up. The goal is that any developer can find the right component without asking someone else.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Create a Component Decision Guide
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When should someone use the base Button versus the LoadingButton versus the ConfirmButton? A simple decision guide eliminates guesswork and prevents people from building yet another button wrapper when one already exists.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Review Customizations in PRs
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        During code review, specifically check for people editing files in <code>components/ui/</code> directly. If they&apos;re adding custom logic to a base component, suggest the wrapper pattern instead. This small check keeps your design system clean over time.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Bottom Line
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Change your entire theme by editing CSS variables in globals.css</li>
          <li>Add custom component variants using CVA for reusable styles</li>
          <li>Create wrapper components instead of modifying base shadcn files</li>
          <li>Compose multiple components together to build complex, reusable patterns</li>
          <li>Always use semantic color tokens, never hardcode colors</li>
          <li>Keep accessibility intact when customizing any component</li>
          <li>Test everything in both light mode, dark mode, and on mobile devices</li>
          <li>Document your customizations so your team knows what changed and why</li>
          <li>Commit base components separately from customizations for clean diffs</li>
          <li>Use compound CVA variants for nuanced styling rules</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best part about shadcn UI is that you&apos;re never stuck with someone else&apos;s design decisions. You own the code. Use these four methods to make components that match your brand perfectly while keeping all the good stuff that shadcn and Radix UI give you: accessibility, keyboard navigation, and solid component architecture. That&apos;s the foundation of a design system you&apos;ll actually enjoy working with in your web dev projects.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Start with CSS variables for the biggest impact with the least effort. Add CVA variants as your component needs grow. Wrap components when you need custom behavior. And compose them together when you need complex, reusable patterns. Follow this progression and your shadcn-based design system will scale beautifully, whether you&apos;re a solo developer or part of a large frontend team building with React, Next.js, and Tailwind CSS.
      </p>
    </div>
  ),
};

export default blogPost;
