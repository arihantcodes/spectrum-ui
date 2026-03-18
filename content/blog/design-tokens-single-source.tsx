import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "Design Tokens: The Single Source of Truth Your Team Needs",
  excerpt:
    "Design tokens create a shared language between designers and developers for colors, spacing, and fonts. Learn how to set up a token system for your design system.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 28, 2026',
  readTime: '15 min read',
  icon: '🎨',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Problem Every Team Hits
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Picture this. A designer says &quot;use the primary blue.&quot; You open the codebase and find three different blues. <code>#3B82F6</code> in one component. <code>#2563EB</code> in another. <code>rgb(59, 130, 246)</code> somewhere else. They&apos;re all supposed to be &quot;primary blue,&quot; but they&apos;re all slightly different. Now multiply that by every color, spacing value, font size, border radius, and shadow in your entire React application. You&apos;ve got a mess on your hands.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is one of the most common problems in frontend development. It happens on every team, at every company, no matter how talented the people are. Without a system, design decisions drift apart. Engineers make their best guess at values. Designers update their Figma files but forget to tell anyone. Before you know it, your UI looks inconsistent and nobody can figure out which shade of blue is the &quot;real&quot; one.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve personally seen this play out at multiple companies. One startup I worked with had over forty unique shades of gray in their codebase. Forty. Nobody planned that. It just happened one hardcoded value at a time over a couple of years. And the worst part? Fixing it was a nightmare because the values were scattered across hundreds of files with no central reference point.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Design tokens fix this problem completely. Instead of a raw hex code, you use a named variable like <code>--color-primary</code>. Instead of writing <code>16px</code> directly, you use <code>--spacing-4</code>. One definition. Used everywhere. Changed in one place. Done. That&apos;s the whole idea behind design tokens, and it&apos;s one of the most impactful things you can do for your design system and your web development workflow.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Exactly Are Design Tokens?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Think of design tokens as the smallest building blocks of your design system. They&apos;re named values that store visual design decisions: colors, spacing, typography, shadows, border radii, and more. They&apos;re not components. They&apos;re the raw ingredients that components are built from. If a button has a blue background, rounded corners, and some padding, each of those values comes from a token.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The beauty of design tokens is that they work as a shared language between designers and developers. When a designer says &quot;use the primary color,&quot; both the Figma file and the React code point to the same token. No guessing. No drift. No more &quot;which blue is it?&quot; conversations in Slack. This is huge for user experience consistency across your entire product.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;ve used Tailwind CSS, you&apos;re already halfway there. Tailwind&apos;s color scales and spacing utilities are essentially a predefined set of tokens. But design tokens take the concept further by making those values customizable, portable across platforms, and connected to your design tools. They&apos;re the bridge between what a designer envisions and what an engineer implements in frontend development.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Design Tool    │────▶│  Design Tokens   │────▶│   Code Output    │
│  (Figma, Sketch) │     │   (JSON / CSS)   │     │ (CSS, iOS, Droid)│
│                  │     │                  │     │                  │
│  Colors, fonts,  │     │  Named values    │     │  Variables used  │
│  spacing values  │     │  shared by all   │     │  in components   │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Single Source    │
                    │   of Truth       │
                    │                  │
                    │  One change here │
                    │  updates ALL     │
                    │  platforms       │
                    └──────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Three Layers of a Token System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A well-structured token system has three layers. Each one builds on the layer below it. This structure is what makes tokens so powerful and flexible. It&apos;s also what separates a token system that actually scales from one that turns into a tangled mess after six months. Let me walk you through each one in detail.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Layer 1: Primitive Tokens
      </h3>
      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Raw Palette
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Primitive tokens are the raw values in your system. Think of them as your color palette, your spacing scale, your font sizes. They describe what exists, not what anything means. You&apos;d never use these directly in a component. They&apos;re just the foundation that everything else references. For example, <code>--blue-500</code> is a primitive. It&apos;s just a color. It doesn&apos;t say anything about whether it should be used for buttons, links, or backgrounds.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The key insight here is restraint. You don&apos;t need every shade of every color. A good primitive palette for most web development projects has maybe 8 to 10 hues, each with 8 to 10 shades, plus a neutral scale. That&apos;s it. If you find yourself with more than 100 primitive color tokens, you&apos;ve probably gone too far. Keep the palette tight and your downstream tokens will be much easier to manage.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Layer 2: Semantic Tokens
      </h3>
      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        What Colors Mean
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Semantic tokens describe purpose, not appearance. Instead of &quot;blue-600,&quot; you say &quot;primary.&quot; Instead of &quot;gray-50,&quot; you say &quot;background.&quot; This is the layer that makes dark mode, theming, and rebranding possible without touching any component code. It&apos;s also the layer that makes your codebase self-documenting. When you read <code>bg-destructive</code> in a React component, you instantly know that element is communicating danger or a breaking action.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Semantic tokens are where most of the magic happens. They&apos;re the layer your UI components should reference directly. And they&apos;re the layer that changes when you switch themes. Light mode? <code>--color-background</code> points to a light gray. Dark mode? Same token name, but now it points to a dark slate. Your component code stays identical.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Layer 3: Component Tokens
      </h3>
      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Fine-Grained Control
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Component tokens are optional but useful for complex UI components that need their own specific values. A button might have its own background, padding, and border-radius tokens. These reference the semantic layer but let you customize individual components without affecting the whole system. Think of them as overrides. Most of the time you won&apos;t need them, but when you do, they prevent you from having to hack around your semantic tokens.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A good rule of thumb is to start without component tokens. If you find yourself wanting to change a specific component&apos;s look without affecting everything else that uses the same semantic token, that&apos;s when you introduce a component token. Don&apos;t over-engineer this layer upfront. Let it emerge from real needs as your design system grows.
      </p>

      <CodeBlock
        filename="tokens.css"
        language="css"
        code={`/* Layer 1: Primitive tokens (raw values) */
/* Your color palette. These never show up in component code. */
:root {
  --blue-500: 217 91% 60%;
  --blue-600: 221 83% 53%;
  --gray-50: 210 20% 98%;
  --gray-100: 220 14% 96%;
  --gray-900: 221 39% 11%;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Layer 2: Semantic tokens (what it means) */
/* These describe purpose, not appearance */
:root {
  --color-primary: var(--blue-600);
  --color-background: var(--gray-50);
  --color-foreground: var(--gray-900);
  --color-muted: var(--gray-100);
  --color-border: var(--gray-200);
}

/* Layer 3: Component tokens (specific parts) */
/* Optional. For complex components that need their own tokens */
:root {
  --button-bg: var(--color-primary);
  --button-radius: var(--radius-md);
  --button-padding: var(--spacing-2) var(--spacing-4);
  --card-bg: var(--color-background);
  --card-radius: var(--radius-lg);
  --card-padding: var(--spacing-6);
}`}
      />

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────┐
│  COMPONENT       │  --button-bg, --card-radius
│  TOKENS          │  (specific parts)
├─────────────────┤
│  SEMANTIC        │  --color-primary, --color-background
│  TOKENS          │  (purpose & meaning)
├─────────────────┤
│  PRIMITIVE       │  --blue-600, --gray-50, --spacing-4
│  TOKENS          │  (raw values)
└─────────────────┘

        ▲ Each layer references the one below
        │
  Change a primitive → semantics update → components update
  Change a semantic  → only that meaning changes
  Change a component → only that component changes`}
        </pre>
      </div>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
          Why Three Layers?
        </h5>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Primitives say what colors exist. Semantic tokens say what they mean. Component tokens say how specific pieces look. Want to rebrand your entire app? Swap the primitives. Want dark mode? Swap the semantics. Want to tweak just one button? Change the component layer. Each layer gives you control at a different level of specificity. This is the foundation of a great design system. And it&apos;s the same approach used by companies like GitHub, Shopify, and Adobe in their production design systems.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Dark Mode Becomes Almost Free
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s where design tokens really pay off. Without tokens, adding dark mode to a web application means going through every single component and adding dark variants. With tokens, you just flip the semantic layer. Your components don&apos;t change at all. This is a massive win for frontend development speed and code maintainability.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I remember a project where we added dark mode to an app with about 200 React components. Because we had tokens in place, the entire dark mode implementation took about two days. One day to define the dark semantic values, and one day to test and tweak edge cases. Without tokens, the same project would have taken weeks of find-and-replace across every component file. That&apos;s not a hypothetical. I&apos;ve seen it take weeks on other projects that didn&apos;t have tokens.
      </p>

      <CodeBlock
        filename="dark-mode.css"
        language="css"
        code={`/* Light mode - default semantic values */
:root {
  --color-background: var(--gray-50);
  --color-foreground: var(--gray-900);
  --color-card: 0 0% 100%;
  --color-muted: var(--gray-100);
  --color-border: var(--gray-200);
}

/* Dark mode - same token names, different values */
.dark {
  --color-background: var(--gray-900);
  --color-foreground: var(--gray-50);
  --color-card: 224 71% 8%;
  --color-muted: 215 20% 16%;
  --color-border: 215 20% 20%;
}

/* Your components don't change at all.
   bg-background and text-foreground
   just work in both themes automatically.
   Zero component changes needed. */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Beyond Just Dark Mode
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The same pattern works for any theming scenario. High contrast mode for accessibility? Create a new semantic layer. Brand themes for white-label products? Same approach. Seasonal themes? Easy. Once your token architecture is solid, adding new themes is just writing a new set of semantic values. No component changes. No CSS rewrites. This is the kind of thing that makes the user experience feel polished and professional.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Some companies take this even further with dynamic theming. Imagine a SaaS product where each customer can set their brand color and the entire UI adjusts automatically. With tokens, you just swap out a handful of primitive values and everything cascades. Without tokens, you&apos;d need a completely custom CSS build for every client. Tokens make dynamic theming practical instead of a pipe dream.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Naming Things Well
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Bad names kill design systems faster than bad design. Seriously. If your team can&apos;t figure out which token to use, they&apos;ll just hardcode a value and you&apos;re right back where you started. Good naming is probably the single most important thing you can get right when building out your token system. I&apos;ve seen teams spend hours debating naming conventions, and honestly, that time is well spent. A bad naming scheme creates friction every single day.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Naming Conventions That Work
      </h5>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Primitives:</strong> <code>--blue-500</code>, <code>--gray-100</code> (color + shade number)</li>
          <li><strong>Semantic:</strong> <code>--color-primary</code>, <code>--color-destructive</code> (by purpose, never by color name)</li>
          <li><strong>States:</strong> <code>--color-primary-hover</code>, <code>--color-primary-active</code> (purpose + state)</li>
          <li><strong>Spacing:</strong> <code>--spacing-1</code> through <code>--spacing-16</code> (sequential numbers)</li>
          <li><strong>Shadows:</strong> <code>--shadow-sm</code>, <code>--shadow-md</code>, <code>--shadow-lg</code> (t-shirt sizes)</li>
          <li><strong>Typography:</strong> <code>--font-size-sm</code>, <code>--font-size-base</code>, <code>--font-size-lg</code></li>
          <li><strong>Radii:</strong> <code>--radius-sm</code>, <code>--radius-md</code>, <code>--radius-lg</code></li>
        </ul>
      </div>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        The Golden Rule of Token Naming
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Name by purpose, not by appearance. Use <code>--color-primary</code>, not <code>--color-blue</code>. Use <code>--color-destructive</code>, not <code>--color-red</code>. Why? Because if your brand changes from blue to purple next year, <code>--color-primary</code> still makes sense. <code>--color-blue</code> that actually outputs purple is going to confuse every new developer who joins the team. This sounds obvious, but you&apos;d be surprised how many production codebases have tokens named after their current visual appearance.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Handling Token Naming at Scale
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        As your design system grows, you&apos;ll find yourself needing more nuanced names. What happens when you have a primary button background, a primary link color, and a primary icon color, and they&apos;re all slightly different shades? This is where a structured naming convention pays off. A pattern like <code>--color-{'{'}category{'}'}-{'{'}property{'}'}-{'{'}state{'}'}</code> scales well. For example: <code>--color-primary-bg-hover</code> or <code>--color-destructive-text-disabled</code>. It&apos;s a bit verbose, but it&apos;s unambiguous, which is what matters when twenty engineers are using your tokens in their React components every day.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│                    Token Naming Decision Tree                 │
└──────────────────────────────────────────────────────────────┘

  Is it a raw value (hex, px, rem)?
  ├── YES → Primitive Token
  │         Name: --{color}-{shade} or --spacing-{number}
  │         Example: --blue-600, --spacing-4
  │
  └── NO → Does it describe a purpose?
           ├── YES → Semantic Token
           │         Name: --color-{purpose} or --{property}-{purpose}
           │         Example: --color-primary, --color-destructive
           │
           └── NO → Is it for a specific component?
                    └── YES → Component Token
                              Name: --{component}-{property}
                              Example: --button-bg, --card-radius`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Using Tokens with Tailwind CSS
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re building with Tailwind CSS and Next.js (which a lot of modern frontend development uses), design tokens and Tailwind work beautifully together. You define your tokens as CSS custom properties, then hook them into your Tailwind config. This gives you the best of both worlds: a solid token foundation with the speed of utility-first CSS.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The approach is straightforward. You store your token values as CSS custom properties using HSL format (without the <code>hsl()</code> wrapper), and then reference those properties in your Tailwind configuration. This way, Tailwind generates utility classes like <code>bg-primary</code> or <code>text-muted-foreground</code> that pull values directly from your token system. It&apos;s clean, it&apos;s fast, and it means theme changes happen at the CSS variable level without needing a Tailwind rebuild.
      </p>

      <CodeBlock
        filename="tailwind.config.ts"
        language="typescript"
        code={`const config = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        border: "hsl(var(--color-border))",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      spacing: {
        // You can map tokens to spacing too
      },
    },
  },
};

// Now you write: bg-primary text-primary-foreground
// It pulls from your CSS variables automatically.
// Switch themes? Just change the CSS variables.
// No Tailwind rebuild needed.`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why This Combo Works So Well
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you write <code>bg-primary</code> in your React component, Tailwind CSS generates a class that references your CSS variable. That variable points to your semantic token, which points to your primitive token. The whole chain is connected, but your component code stays clean and readable. This is exactly the approach that libraries like shadcn/ui use, and it&apos;s proven to work at scale for design systems of all sizes.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Tailwind CSS v4 and Native Token Support
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        With Tailwind CSS v4, there&apos;s even more native support for this pattern. The new CSS-first configuration approach means you can define your tokens directly in CSS and Tailwind picks them up automatically. No more JavaScript config file for colors and spacing. This makes the connection between your token system and your utility classes even more seamless. If you&apos;re starting a new Next.js project, v4 is the way to go.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Keeping Design and Code in Sync
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tokens are only a single source of truth if designers and developers actually use the same values. If the Figma file says one thing and the code says another, you haven&apos;t solved the problem. You&apos;ve just added a layer of indirection. Here are the tools that keep everything in sync for real.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Sync Tools Worth Knowing
      </h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Tokens Studio:</strong> A Figma plugin that exports tokens as JSON. It can automatically create pull requests on GitHub when tokens change. This is a game-changer for keeping design and code in sync.</li>
        <li><strong>Style Dictionary:</strong> An open-source tool by Amazon that takes token JSON and transforms it into CSS variables, Swift constants, Android XML, Kotlin values, or whatever format your platform needs.</li>
        <li><strong>Figma Variables:</strong> Figma&apos;s built-in token system. Works with Dev Mode so engineers can see exact token values when inspecting designs.</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Setting Up Automated Sync
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The gold standard is a fully automated pipeline. Here&apos;s how it works in practice. A designer updates a color in Figma. Tokens Studio detects the change and pushes the updated JSON to a Git branch. A CI pipeline runs Style Dictionary to transform the JSON into CSS custom properties. A pull request is created automatically. An engineer reviews it, maybe runs visual regression tests, and merges. The new values are deployed to production. The whole cycle can happen in under an hour with minimal manual effort.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This might sound like overkill for a small team, and honestly, it is for a team of two or three. But once you have more than a handful of engineers and designers, the time saved by automated sync far outweighs the setup cost. And the consistency gains are immediate. No more &quot;I thought we changed that color last week&quot; confusion.
      </p>

      <CodeBlock
        filename="tokens.json"
        language="json"
        code={`{
  "color": {
    "primary": {
      "$value": "{color.blue.600}",
      "$type": "color",
      "$description": "Main brand color for buttons and links"
    },
    "background": {
      "$value": "{color.gray.50}",
      "$type": "color",
      "$description": "Default page background"
    },
    "destructive": {
      "$value": "{color.red.600}",
      "$type": "color",
      "$description": "Error states and destructive actions"
    }
  },
  "spacing": {
    "sm": { "$value": "0.5rem", "$type": "dimension" },
    "md": { "$value": "1rem", "$type": "dimension" },
    "lg": { "$value": "1.5rem", "$type": "dimension" }
  }
}`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This JSON format follows the W3C Design Tokens Community Group specification. It&apos;s becoming the industry standard. Style Dictionary can take this file and generate platform-specific output for web, iOS, and Android all from a single source. That&apos;s a huge win for teams building cross-platform products.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Token Pipeline in Practice
      </h2>
      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        From Design to Production
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In a mature design system, the token flow looks something like this. A designer updates a color in Figma. Tokens Studio picks up the change and creates a pull request. Style Dictionary transforms the tokens into CSS. The PR gets reviewed and merged. The new values are live in production. The whole thing can happen in under an hour with minimal human effort.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌────────────┐    ┌──────────────┐    ┌────────────────┐    ┌────────────┐
│  Designer   │───▶│ Tokens Studio│───▶│ Style          │───▶│ Production │
│  updates    │    │ creates PR   │    │ Dictionary     │    │ deploy     │
│  Figma      │    │ with JSON    │    │ transforms     │    │            │
└────────────┘    └──────────────┘    └────────────────┘    └────────────┘
                                             │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
                     │  CSS Vars    │ │  Swift        │ │  Android     │
                     │  (Web)       │ │  (iOS)        │ │  (Kotlin)    │
                     └──────────────┘ └──────────────┘ └──────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Versioning and Governance
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        As your token system matures, you&apos;ll need to think about versioning. What happens when you rename a token? What about deprecating one? Tokens are a dependency just like any npm package, and breaking changes to token names can break components across your entire application.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best approach I&apos;ve seen is to treat token changes like API changes. Additions are fine and non-breaking. Renames and removals are breaking changes that need a migration path. Some teams use a deprecation period where the old token name still works but logs a warning. This gives everyone time to update their code before the old name is removed entirely.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Governance Best Practices
      </h6>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Document every token</strong> with a clear description of when and where to use it</li>
          <li><strong>Review token changes</strong> the same way you review code changes, with pull requests and approvals</li>
          <li><strong>Use semantic versioning</strong> for your token package so consuming teams know what changed</li>
          <li><strong>Run lint rules</strong> that catch hardcoded values and suggest the appropriate token</li>
          <li><strong>Track usage analytics</strong> so you know which tokens are actually used and which are dead weight</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Mistakes to Avoid
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve seen teams make the same mistakes over and over when setting up design tokens. Here&apos;s what to watch out for so you can skip the pain.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Too Many Tokens Too Early
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t try to tokenize everything on day one. Start with colors, spacing, and border-radius. Add more as you need them. A lean token set that people actually use beats a comprehensive one that nobody can navigate. I&apos;ve seen teams create 500+ tokens before they even had 10 components. Most of those tokens never got used. Start small, measure what&apos;s needed, and grow from there.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Naming by Appearance
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your semantic tokens include color names like <code>--color-blue-action</code>, you&apos;ve lost the main benefit. When you rebrand, those names will lie to you. Always name by purpose. This is the single most common mistake I see in the wild and the hardest one to fix retroactively because renaming tokens means updating every file that references them.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Skipping Documentation
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every token should have a description. When should you use <code>--color-muted</code> vs <code>--color-card</code>? If you don&apos;t write it down, people will guess. And they&apos;ll guess differently. Good documentation is essential for a design system that actually scales. Include usage examples, screenshots, and do/don&apos;t guidelines for each token category.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Not Involving Designers
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tokens are a shared language. If only engineers define them, designers won&apos;t use them. Get both sides involved from the start. Run naming workshops together. Make token names something both teams understand and agree on. This is fundamental to good collaboration in design engineering. The best token systems I&apos;ve seen were co-created by designers and engineers sitting in the same room hashing out names and categories together.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Getting Started: A Practical Checklist
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re convinced that design tokens are worth the effort (they are), here&apos;s a simple step-by-step to get going without over-engineering it.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ol className="space-y-2 list-decimal list-inside">
          <li>Audit your current codebase. Find all the unique colors, spacing values, and font sizes being used. You&apos;ll probably be surprised how many there are.</li>
          <li>Define your primitive palette. Pick your colors and spacing scale. Keep it tight. You don&apos;t need 50 shades of gray.</li>
          <li>Create semantic tokens for colors, spacing, typography, and radii. Name everything by purpose.</li>
          <li>Hook your tokens into Tailwind CSS config so they&apos;re available as utility classes.</li>
          <li>Set up Figma Variables or Tokens Studio so designers work with the same values.</li>
          <li>Gradually migrate existing components to use tokens instead of hardcoded values.</li>
          <li>Add component tokens only where individual components need fine-grained control.</li>
          <li>Set up a lint rule that flags hardcoded color and spacing values in your React components.</li>
          <li>Document every token with a description, usage example, and visual preview.</li>
          <li>Review and prune your tokens quarterly. Remove unused ones and consolidate duplicates.</li>
        </ol>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Real-World Impact
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let me share some concrete wins I&apos;ve seen from teams that adopted design tokens properly. One team reduced their unique color values from 87 to 24 after a token migration. Another team added dark mode to their entire application in three days instead of the estimated three weeks. A third team used tokens to ship a white-label version of their product in under a week because all they had to do was swap out the primitive layer.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        These aren&apos;t edge cases. This is the normal outcome when you invest in a solid token foundation. The upfront cost is maybe a week of setup and migration work. The ongoing savings are measured in weeks per year of avoided inconsistency debugging, faster theming, and smoother designer-engineer handoffs. For any serious web development project, design tokens are a no-brainer investment.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Design tokens give every design decision a name. One definition, used everywhere across your design system.</li>
          <li>Three layers: primitives (raw values), semantic (meaning and purpose), component (specific overrides).</li>
          <li>Dark mode and theming become almost free. Just swap the semantic layer. Zero component changes needed.</li>
          <li>Name by purpose, not by appearance. <code>--color-primary</code> not <code>--color-blue</code>.</li>
          <li>Tailwind CSS plus CSS custom properties gives you the best developer experience for web development.</li>
          <li>Use Tokens Studio or Figma Variables to keep design and code in sync automatically.</li>
          <li>Start small. Colors, spacing, and radii first. Expand as you need to.</li>
          <li>Treat token changes like API changes. Version them and document migration paths.</li>
          <li>Co-create tokens with designers. They&apos;re a shared language, not an engineering artifact.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Design tokens feel like extra work when you first set them up. But the first time you need to update brand colors across your entire application, add dark mode support, build a high-contrast accessibility theme, or ship your design system to a new platform, you&apos;ll be incredibly glad you invested the time. They&apos;re one of those things that pays off more and more the longer you use them. And once your team gets used to them, nobody will want to go back to hardcoded values. Trust me on that one.
      </p>
    </div>
  ),
};

export default blogPost;
