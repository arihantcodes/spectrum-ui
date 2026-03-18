import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Building a Color System for Your Web App (Without a Designer)',
  excerpt:
    "You don't need a designer to have great colors. Here's a practical system for choosing, organizing, and using colors in your web app.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 25, 2026',
  readTime: '15 min read',
  icon: '🌈',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        You Need Less Color Than You Think
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let me tell you something that took me way too long to figure out: most great web apps use
        surprisingly few colors. Seriously. Go look at the apps you use every day. Stripe, Linear,
        Notion, Vercel. They&apos;re all basically gray with one accent color and a few semantic
        colors for things like errors and success states. That&apos;s it. The problem most frontend
        developers run into isn&apos;t picking colors. It&apos;s organizing them so they work together,
        stay consistent across your entire UI, and don&apos;t turn into a maintenance nightmare six
        months down the road.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re building a React or Next.js app with Tailwind CSS and you don&apos;t have a
        designer handing you a polished color palette, don&apos;t worry. You can build a professional
        color system yourself. This guide walks you through the entire process, from picking your
        first neutral scale to setting up design tokens that make dark mode a breeze.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Neutral Scale  │     │   Brand Color    │     │ Semantic Colors  │
│                 │     │                 │     │                 │
│  Grays for text │────▶│  One accent for  │────▶│  Red, Amber,    │
│  backgrounds,   │     │  buttons, links, │     │  Green, Blue    │
│  borders        │     │  highlights      │     │  for feedback   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                   ┌─────────────────────────┐
                   │    Design Tokens Layer   │
                   │                         │
                   │  Semantic names like     │
                   │  --background,           │
                   │  --foreground,           │
                   │  --primary, --muted      │
                   └─────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Start With Neutrals: They Do 80% of the Work
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s the thing about UI design that nobody tells you early enough: neutrals are the
        backbone of your entire interface. Backgrounds, text, borders, dividers, disabled states,
        placeholder text, card surfaces. All of that is handled by your neutral palette. Get a good
        neutral scale and you&apos;re basically 80% done with your color system.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why Pure Grays Look Dead
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A common mistake in web development is using perfectly neutral grays. They look lifeless and
        sterile. Every professional design system adds a subtle tint to their grays. Cool tints like
        blue or slate feel modern and techy, which is why you see them in developer tools and SaaS
        dashboards. Warm tints like yellow or stone feel friendly and approachable, perfect for
        consumer-facing products. Pick one direction and stay consistent.
      </p>

      <CodeBlock
        filename="neutrals.css"
        language="css"
        code={`:root {
  /* A neutral scale with a slight cool tint */
  --gray-50:  210 20% 98%;   /* lightest - page background */
  --gray-100: 220 14% 96%;   /* card background, muted areas */
  --gray-200: 220 13% 91%;   /* borders, dividers */
  --gray-300: 216 12% 84%;   /* disabled text, placeholders */
  --gray-400: 218 11% 65%;   /* secondary text (light mode) */
  --gray-500: 220 9%  46%;   /* body text (light mode) */
  --gray-600: 215 14% 34%;   /* emphasis */
  --gray-700: 217 19% 27%;   /* strong emphasis */
  --gray-800: 215 28% 17%;   /* headings */
  --gray-900: 221 39% 11%;   /* primary text */
  --gray-950: 224 71% 4%;    /* darkest */
}

/* Tip: Pure grays look dead. Add a subtle tint.
   Cool tints (blue/slate) feel modern.
   Warm tints (yellow/stone) feel friendly. */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        How Many Shades Do You Actually Need?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Eleven shades (50 through 950) might seem like a lot, but you&apos;ll use most of them. The
        lightest values handle backgrounds and subtle surfaces. The middle range covers borders and
        secondary text. The darkest values are for headings and primary content. When you&apos;re
        building UI components in React, having this full range gives you enough flexibility to
        create depth and hierarchy without reaching for random hex values.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Pick One Brand Color and Generate a Scale
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your brand color is the star of the show. It&apos;s what makes your app feel like your app.
        Buttons, links, focus rings, active states, selected items. All of these use your brand
        color. But here&apos;s the key: you don&apos;t just need one shade. You need a full scale
        so you can handle hover states, disabled states, subtle backgrounds, and more.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Generating Your Brand Scale
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t try to pick each shade by hand. That&apos;s a recipe for inconsistency. Use a
        tool like the Tailwind CSS color generator, Radix Colors, or Leonardo Color to generate a
        perceptually uniform scale from a single starting color. These tools understand color science
        and will give you shades that look natural together.
      </p>

      <CodeBlock
        filename="brand-color.css"
        language="css"
        code={`:root {
  /* Brand color scale - blue example */
  --primary-50:  214 100% 97%;
  --primary-100: 214 95% 93%;
  --primary-200: 213 97% 87%;
  --primary-300: 212 96% 78%;
  --primary-400: 213 94% 68%;
  --primary-500: 217 91% 60%;  /* your main brand color */
  --primary-600: 221 83% 53%;  /* buttons, links */
  --primary-700: 224 76% 48%;  /* hover state */
  --primary-800: 226 71% 40%;
  --primary-900: 224 64% 33%;

  /* You use maybe 3-4 of these regularly:
     500 for backgrounds, 600 for buttons,
     700 for hover, 100 for subtle tints */
}`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Picking a Good Starting Color
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you don&apos;t have a brand color yet, blue is the safest default. It&apos;s universally
        associated with trust and professionalism, which is why so many tech companies use it.
        That said, don&apos;t be afraid to go with something more distinctive. Purple signals
        creativity, green suggests growth or finance, and orange feels energetic and playful. Just
        make sure your chosen color has enough saturation to stand out against your neutral palette
        but not so much that it feels garish.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Semantic Colors: The Universal Language of UI
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Semantic colors are the ones that carry meaning regardless of your brand. Every user on the
        planet understands that red means danger, green means success, and amber means caution. These
        colors are hardwired into our brains. Your design system needs all four, and they should be
        consistent across every component in your app.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Red / Destructive:</strong> Errors, delete buttons, warnings about data loss. Use this sparingly so it retains its urgency.</li>
          <li><strong>Amber / Warning:</strong> Caution states, approaching limits, things that need attention but aren&apos;t critical.</li>
          <li><strong>Green / Success:</strong> Success messages, active states, confirmations, positive metrics.</li>
          <li><strong>Blue / Info:</strong> Informational alerts, links (if not using brand color), neutral callouts.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Each Semantic Color Needs Multiple Shades Too
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You don&apos;t need a full 11-shade scale for each semantic color, but you do need at least
        three or four: a light tint for backgrounds (like a subtle red wash behind an error message),
        a main color for text and icons, and a dark shade for hover states. This is especially
        important when you&apos;re building accessible UI components, because you need enough contrast
        between the background tint and the foreground text.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Put It Together with Design Tokens
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Okay, so you&apos;ve got your neutral scale, your brand scale, and your semantic colors.
        Now comes the crucial step that separates amateur color systems from professional ones:
        design tokens. Instead of using your raw color values directly in components, you create
        a semantic mapping layer. This layer gives meaningful names to your colors based on their
        purpose, not their appearance.
      </p>

      <CodeBlock
        filename="color-system.css"
        language="css"
        code={`:root {
  /* Map semantic names to your palette */
  --background: var(--gray-50);
  --foreground: var(--gray-900);
  --card: 0 0% 100%;
  --muted: var(--gray-100);
  --muted-foreground: var(--gray-500);
  --border: var(--gray-200);

  --primary: var(--primary-600);
  --primary-foreground: 0 0% 100%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --success: 142 71% 45%;
  --warning: 38 92% 50%;
}

/* Dark mode - just remap the tokens */
.dark {
  --background: var(--gray-950);
  --foreground: var(--gray-50);
  --card: var(--gray-900);
  --muted: var(--gray-800);
  --muted-foreground: var(--gray-400);
  --border: var(--gray-700);
}

/* Now use these everywhere in your components:
   bg-background, text-foreground, bg-primary, etc.
   Never use raw color values in components. */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why This Abstraction Layer Matters
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you use tokens like <code>bg-background</code> and <code>text-foreground</code> instead
        of <code>bg-gray-50</code> and <code>text-gray-900</code>, you get two massive benefits.
        First, dark mode becomes trivial. You just remap the tokens in a dark class and every
        component automatically updates. Second, theming and rebranding become possible. Want to
        change your brand color from blue to purple? Update one variable and you&apos;re done. No
        hunting through hundreds of components replacing color classes.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│                    Color Token Flow                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Raw Palette          Semantic Tokens        Components      │
│  ──────────          ───────────────        ──────────       │
│                                                              │
│  gray-50  ──────▶  --background    ──────▶  bg-background   │
│  gray-900 ──────▶  --foreground    ──────▶  text-foreground  │
│  gray-200 ──────▶  --border        ──────▶  border-border    │
│  gray-100 ──────▶  --muted         ──────▶  bg-muted         │
│  blue-600 ──────▶  --primary       ──────▶  bg-primary       │
│  red-500  ──────▶  --destructive   ──────▶  text-destructive │
│                                                              │
│  In dark mode, just remap the left column:                   │
│  gray-950 ──────▶  --background                              │
│  gray-50  ──────▶  --foreground                              │
│                                                              │
│  Components never change. Tokens do the switching.           │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The 60-30-10 Rule for Color Distribution
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is a classic design principle that works every single time. It comes from interior design,
        but it applies perfectly to web development. The idea is simple: distribute your colors in a
        60/30/10 ratio across your interface.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>60% - Dominant:</strong> Background and neutral colors. This is your canvas. White or near-white in light mode, dark gray or near-black in dark mode.</li>
          <li><strong>30% - Secondary:</strong> Cards, sections, muted areas. Creates visual depth and separates content regions. Think sidebar backgrounds, card surfaces, and table header rows.</li>
          <li><strong>10% - Accent:</strong> Brand color. Buttons, links, highlights, focus rings. Used sparingly so it actually stands out and draws the eye.</li>
        </ul>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200 mt-3">
          If your brand color covers more than 10% of the screen, it stops feeling like an accent and
          starts feeling overwhelming. This is one of the most common mistakes I see in frontend
          development. More color doesn&apos;t mean more personality. Restraint is what makes a UI
          feel polished.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Accessibility and Contrast Ratios
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A beautiful color system is worthless if people can&apos;t read your text. Accessibility
        isn&apos;t optional. It&apos;s a legal requirement in many jurisdictions and, more importantly,
        it&apos;s just good engineering. WCAG guidelines define minimum contrast ratios, and you need
        to check every color combination in your design system against them.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Contrast Checklist for Your Design System
      </h3>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>Body text on background: minimum 4.5:1 ratio (WCAG AA)</li>
        <li>Large text (18px+ bold or 24px+ regular): minimum 3:1 ratio</li>
        <li>UI elements like borders, icons, and form controls: minimum 3:1 ratio</li>
        <li>Button text on button background: minimum 4.5:1 ratio</li>
        <li>Placeholder text: minimum 4.5:1 for accessibility (many sites fail this)</li>
        <li>Use WebAIM&apos;s contrast checker or the Chrome DevTools accessibility panel to verify</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Common Contrast Pitfalls
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Light gray text on white backgrounds is the most common accessibility failure I see in React
        apps. Your gray-400 might look fine on your expensive high-contrast monitor, but it&apos;s
        unreadable on a cheap laptop in a sunlit room. Always test your colors under real conditions.
        Another common issue is colored text on colored backgrounds, like red error text on a light
        red background. Make sure there&apos;s enough contrast between the two.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Implementing Your Color System in Tailwind CSS
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Tailwind CSS (and you probably should be for any modern Next.js project),
        setting up your color system is straightforward. You define your CSS custom properties in your
        global stylesheet and then reference them in your Tailwind configuration. This is exactly how
        shadcn/ui does it, and it&apos;s become the standard approach in the React ecosystem.
      </p>

      <CodeBlock
        filename="tailwind-colors.css"
        language="css"
        code={`/* globals.css */
@layer base {
  :root {
    --background: 210 20% 98%;
    --foreground: 221 39% 11%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;
    --border: 220 13% 91%;
    --ring: 221 83% 53%;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 210 20% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 221 39% 11%;
    --muted: 215 28% 17%;
    --muted-foreground: 218 11% 65%;
    --border: 217 19% 27%;
    --ring: 217 91% 60%;
  }
}

/* In your Tailwind config, map these to utilities:
   colors: {
     background: "hsl(var(--background))",
     foreground: "hsl(var(--foreground))",
     primary: { DEFAULT: "hsl(var(--primary))" },
   }
*/`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Testing Your Color System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once you&apos;ve set up your color system, you need to test it properly. Don&apos;t just look
        at it on your main screen and call it a day. Here are the tests I run every time I build or
        update a color system for a web application.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Light Mode and Dark Mode Side by Side
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Toggle between both modes and look for anything that disappears or becomes hard to read. Pay
        special attention to borders, which often vanish in dark mode, and colored backgrounds, which
        might not have enough contrast against the dark surface.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Grayscale Test
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use a browser extension or CSS filter to view your UI in grayscale. If you can still tell
        what&apos;s a button, what&apos;s a link, and what&apos;s an error message, your color system
        is robust. This test also ensures your app is usable for colorblind users, which is roughly
        8% of men and 0.5% of women worldwide.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Reduced Motion and High Contrast
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Test with your operating system&apos;s high contrast mode enabled. Modern CSS lets you
        detect this with <code>@media (forced-colors: active)</code> and adjust your tokens
        accordingly. This matters more than most frontend developers realize.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tools That Make Color Selection Easier
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Radix Colors:</strong> Beautiful, accessible color scales with built-in dark mode support. Designed specifically for UI.</li>
          <li><strong>Tailwind CSS Color Generator:</strong> Generates a full scale from a single hex value. Great for brand colors.</li>
          <li><strong>Leonardo Color:</strong> Adobe&apos;s tool for creating perceptually uniform, accessible color palettes.</li>
          <li><strong>Realtime Colors:</strong> Lets you preview your color choices on a realistic UI mockup in real time.</li>
          <li><strong>WebAIM Contrast Checker:</strong> The gold standard for verifying WCAG contrast ratios.</li>
          <li><strong>Chrome DevTools:</strong> Built-in contrast ratio checking in the color picker. Fast and convenient.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Mistakes to Avoid
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        After building color systems for several React and Next.js projects, I keep seeing the same
        mistakes. Here are the biggest ones so you can avoid them.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Using Raw Color Values in Components
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Never put <code>bg-blue-600</code> directly in a component. Always use your semantic tokens
        like <code>bg-primary</code>. Raw values make theming and dark mode impossible without a
        massive find-and-replace operation.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Too Many Brand Colors
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One brand color is enough. If you need a second, maybe for a secondary action style, derive
        it from your brand color or use a neutral variant. Adding multiple bright colors fragments
        the visual identity of your app and makes everything feel chaotic.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Ignoring Dark Mode Until Later
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you set up your token layer from the start, dark mode is nearly free. If you skip it and
        use raw colors everywhere, adding dark mode later means auditing every single component.
        Build the token layer on day one. You&apos;ll thank yourself later.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Checklist
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>One neutral scale with a subtle tint (11 shades, cool or warm)</li>
          <li>One brand color with a full scale (10 shades)</li>
          <li>Four semantic colors: red, amber, green, blue (3-4 shades each)</li>
          <li>Semantic design tokens that map to your palette</li>
          <li>Dark mode token remapping in a .dark class</li>
          <li>60/30/10 color distribution across your interface</li>
          <li>All text combinations checked for WCAG AA contrast (4.5:1 minimum)</li>
          <li>Grayscale and colorblind testing completed</li>
          <li>No raw color values in any React component. Tokens only.</li>
          <li>Tools like Radix Colors or Leonardo used for scale generation</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building a color system might seem like a lot of upfront work, but it pays for itself
        within the first week. You stop second-guessing which shade of gray to use for a border.
        Dark mode works out of the box. New components automatically look consistent with existing
        ones. And when your product manager inevitably says &quot;can we try a different brand
        color?&quot; you change one CSS variable and call it a day. That&apos;s the power of a
        well-built design system.
      </p>
    </div>
  ),
};

export default blogPost;
