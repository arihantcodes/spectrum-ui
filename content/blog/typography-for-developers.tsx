import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Typography for Developers: The Only Guide You Need',
  excerpt:
    "Typography makes or breaks your UI. Here's everything a developer needs to know about fonts, sizing, spacing, and readability.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 6, 2026',
  readTime: '15 min read',
  icon: '🔤',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Typography Is 90% of Your UI
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most of what users see on screen is text. Think about it. Headings, paragraphs, labels,
        buttons, navigation items, error messages, tooltips, table cells. It&apos;s all text. If your
        typography is off, everything feels wrong even if you can&apos;t quite explain why. A website
        can have beautiful colors, perfect spacing, and stunning illustrations, but if the text is
        hard to read or the hierarchy is unclear, the whole thing falls apart.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Good typography makes content easy to read, creates clear visual hierarchy, and makes your
        app feel professional. The best part? You don&apos;t need to be a designer to get typography
        right. You just need to understand a handful of principles and apply them consistently. This
        guide covers everything a frontend developer needs to know about typography in React and
        Next.js applications, from picking fonts to setting up a type scale that works across your
        entire design system.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│                Typography Decision Flow                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Pick a Font ──▶ 2. Set Type Scale ──▶ 3. Line Height    │
│       │                    │                    │            │
│       ▼                    ▼                    ▼            │
│  One sans-serif      Use Tailwind&apos;s      Body: 1.5-1.75   │
│  (Inter, Geist,      built-in scale       Headings: 1.1-1.3 │
│   system fonts)      (xs through 5xl)     Small: 1.5 min    │
│                                                              │
│  4. Line Length ──▶ 5. Font Weights ──▶ 6. Text Color       │
│       │                    │                    │            │
│       ▼                    ▼                    ▼            │
│  50-75 chars max     2-3 weights only    foreground +        │
│  (max-w-prose)       (400, 500, 600-700)  muted-foreground   │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Pick One Font (Maybe Two, but Probably Just One)
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You don&apos;t need five fonts. You don&apos;t even need three. One good sans-serif font
        handles 99% of what a web application needs. Inter, Geist, and system fonts are all excellent
        choices that work beautifully across every operating system and browser. If you absolutely need
        a second font, use a monospace for code blocks. That&apos;s it. Two fonts maximum.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why System Fonts Are a Legitimate Choice
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        System fonts load instantly because they&apos;re already on the user&apos;s device. No network
        request, no flash of unstyled text, no cumulative layout shift. San Francisco on macOS, Segoe
        UI on Windows, and Roboto on Android are all excellent fonts. If you&apos;re building a SaaS
        dashboard or internal tool where brand fonts aren&apos;t critical, system fonts are genuinely
        the best choice for web development performance.
      </p>

      <CodeBlock
        filename="fonts.tsx"
        language="tsx"
        code={`// Next.js font setup - clean and performant
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// In layout.tsx
<html className={inter.variable}>
  <body className="font-sans">
    {children}
  </body>
</html>

// Or use system fonts for zero download:
// font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

// For monospace (code blocks):
import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Font Loading Performance Tips
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Next.js (which you probably should be for any serious React project),
        the built-in font optimization handles everything for you. It downloads fonts at build time,
        self-hosts them, and eliminates the layout shift that comes with loading fonts from Google
        Fonts directly. This is one of those things that&apos;s trivial with Next.js and annoyingly
        complicated without it. Always use <code>next/font</code> instead of a Google Fonts link tag.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Type Scale: Your Sizing System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t invent random font sizes. Every size in your application should come from a
        consistent scale. Tailwind CSS gives you a beautiful built-in type scale that covers every
        use case. Use it as-is and you&apos;ll never have to argue about whether a subtitle should
        be 17px or 18px. The scale is designed so each step up feels noticeably bigger without being
        jarring.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><code>text-xs</code> (12px) - Fine print, badges, timestamps, metadata</li>
          <li><code>text-sm</code> (14px) - Secondary text, form labels, captions, sidebar items</li>
          <li><code>text-base</code> (16px) - Body text. This is your default. Everything starts here.</li>
          <li><code>text-lg</code> (18px) - Lead paragraphs, card titles, emphasized content</li>
          <li><code>text-xl</code> (20px) - Section headings, modal titles</li>
          <li><code>text-2xl</code> (24px) - Page headings, feature section headers</li>
          <li><code>text-3xl</code> (30px) - Hero text, landing page headlines</li>
          <li><code>text-4xl</code>+ - Marketing pages, splash screens, very large displays</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The 16px Baseline Rule
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your body text should be 16px. Not 14px, not 15px. 16px. This is the browser default for a
        reason. It&apos;s the size that most people can read comfortably at a normal viewing distance.
        Going smaller for body text is one of the most common typography mistakes in web development.
        You might think 14px looks cleaner, but your users will strain to read it, especially on
        mobile devices. Save smaller sizes for secondary content like labels and metadata.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Line Height: The Secret to Readable Text
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Line height (or leading, as designers call it) is the vertical space between lines of text.
        Bad line height makes text feel either cramped and claustrophobic or floaty and disconnected.
        Getting it right is one of the highest-impact changes you can make to your UI&apos;s
        readability. Here are the rules I follow in every project.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Body text:</strong> 1.5 to 1.75 (Tailwind&apos;s <code>leading-relaxed</code> or <code>leading-loose</code>). This gives your paragraphs room to breathe.</li>
        <li><strong>Headings:</strong> 1.1 to 1.3 (Tailwind&apos;s <code>leading-tight</code>). Large text needs less relative spacing.</li>
        <li><strong>Small text:</strong> 1.5 minimum. Small text with tight line height is basically unreadable.</li>
        <li><strong>UI text (buttons, labels):</strong> 1 to 1.25. Single-line elements can be tighter.</li>
      </ul>

      <CodeBlock
        filename="line-height.tsx"
        language="tsx"
        code={`// Body text - generous line height for readability
<p className="text-base leading-relaxed text-foreground">
  This paragraph has comfortable spacing between lines.
  It's easy to read even in long blocks of text. Users
  can follow from one line to the next without losing
  their place.
</p>

// Heading - tighter line height looks better on large text
<h1 className="text-3xl font-bold leading-tight tracking-tight">
  Page Title That Might Wrap to Two Lines
  on Smaller Screens
</h1>

// Small text - still needs breathing room
<span className="text-sm leading-normal text-muted-foreground">
  Published on March 10, 2026
</span>

// Button text - can be tight since it's single line
<button className="text-sm font-medium leading-none px-4 py-2">
  Save Changes
</button>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why Headings Need Tighter Line Height
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This trips up a lot of developers. At small sizes, you need generous line height because the
        characters are small and your eye needs help finding the next line. But at large sizes (like
        headings), the characters themselves provide enough visual anchoring. Too much line height on
        headings makes them look disconnected, like each line is a separate element. Keep headings at
        1.1 to 1.3 line height and they&apos;ll look cohesive and intentional.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Line Length: The 65-Character Rule
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Lines that are too long are hard to read. Your eye loses its place when traveling from the
        end of one line to the beginning of the next. Lines that are too short create too many line
        breaks and make reading feel choppy. The sweet spot is 50-75 characters per line, with 65
        being the ideal target. Tailwind CSS has a utility specifically for this.
      </p>

      <CodeBlock
        filename="line-length.tsx"
        language="tsx"
        code={`// Constrain text width for readability
<article className="max-w-prose mx-auto">
  <p>This text will stay within a comfortable reading width,
  regardless of how wide the screen is.</p>
</article>

// max-w-prose = 65ch (about 65 characters wide)
// That's the sweet spot for comfortable reading

// For blog/article layouts
<main className="max-w-3xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-6">Article Title</h1>
  <div className="prose prose-neutral dark:prose-invert">
    {/* Content with automatically constrained line lengths */}
  </div>
</main>

// For dashboard content where you need wider layouts
<div className="max-w-7xl mx-auto">
  <div className="grid grid-cols-3 gap-6">
    {/* Cards and widgets - line length is naturally constrained by the grid */}
  </div>
</div>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Font Weight Hierarchy: Less Is More
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Font weight is one of your most powerful tools for creating visual hierarchy. But the key is
        restraint. Two or three weights is enough. More than that and things get messy and confusing.
        When everything is bold, nothing is bold.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Regular (400):</strong> Body text, descriptions, most content. This is your default.</li>
          <li><strong>Medium (500):</strong> Labels, nav items, emphasis within body text, table headers.</li>
          <li><strong>Semibold/Bold (600-700):</strong> Headings, titles, important callouts, buttons.</li>
        </ul>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200 mt-3">
          Skip light (300) and black (900) for app UI. They have niche uses in marketing pages but
          create more problems than they solve in application interfaces. Light weights are hard to
          read at small sizes, and black weights feel heavy and aggressive.
        </p>
      </div>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│              Visual Hierarchy Through Typography              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Page Title (text-2xl, font-bold, foreground)          │  │
│  │  ════════════════════════════════════════════           │  │
│  │                                                        │  │
│  │  Section Heading (text-xl, font-semibold)              │  │
│  │  ────────────────────────────────────────              │  │
│  │                                                        │  │
│  │  Body text in regular weight at text-base size.        │  │
│  │  This is where most of your content lives. It          │  │
│  │  should be comfortable to read in long blocks.         │  │
│  │                                                        │  │
│  │  Secondary text (text-sm, muted-foreground)            │  │
│  │  Metadata, timestamps, helper text                     │  │
│  │                                                        │  │
│  │  [BADGE] (text-xs, font-medium)  12:34 PM             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Hierarchy = Size + Weight + Color working together          │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Letter Spacing (Tracking) Tips
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Letter spacing is subtle but important. The general rule is: the bigger the text, the tighter
        the tracking. Large headings look better with slightly negative tracking (letters closer
        together). Body text looks fine at default tracking. Small uppercase text like badges and
        labels benefits from wider tracking for readability.
      </p>

      <CodeBlock
        filename="tracking.tsx"
        language="tsx"
        code={`// Large headings - tighter tracking looks polished
<h1 className="text-4xl font-bold tracking-tight">
  Welcome to Our Platform
</h1>

// Body text - default tracking is fine
<p className="text-base tracking-normal">
  Regular paragraph text doesn't need adjusted tracking.
</p>

// Uppercase labels and badges - wider tracking aids readability
<span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
  New Feature
</span>

// Small all-caps section labels
<h6 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
  Account Settings
</h6>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Text Color for Hierarchy
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Color is another powerful lever for creating hierarchy. But keep it simple. You really only
        need two levels for 95% of your UI, plus a couple of special-purpose colors. This works
        perfectly with Tailwind CSS and design tokens.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Primary text:</strong> <code>text-foreground</code> - Headings, body text, important information. Full contrast against background.</li>
        <li><strong>Secondary text:</strong> <code>text-muted-foreground</code> - Descriptions, timestamps, helper text, placeholders. Reduced contrast for visual hierarchy.</li>
        <li><strong>Links:</strong> <code>text-primary</code> - Links and actionable text. Should be obviously clickable.</li>
        <li><strong>Danger:</strong> <code>text-destructive</code> - Error messages and validation failures. Red draws attention to problems.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Don&apos;t Use Color Alone for Hierarchy
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a common mistake: using only color to distinguish between primary and secondary
        text. This fails for colorblind users and in high-contrast modes. Always combine color with
        size or weight differences. If your heading and your body text are the same size and weight
        but different colors, the hierarchy is fragile. Instead, use size, weight, and color together
        so the hierarchy is clear even in grayscale.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Responsive Typography
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your type scale needs to work across all screen sizes, from tiny phones to ultrawide monitors.
        The good news is that Tailwind CSS makes responsive typography straightforward with its
        breakpoint prefixes. The key principle is: body text stays the same size, but headings and
        hero text can scale down on mobile.
      </p>

      <CodeBlock
        filename="responsive-type.tsx"
        language="tsx"
        code={`// Hero heading that scales with screen size
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
  Build Better UIs
</h1>

// Page heading - scale down one step on mobile
<h2 className="text-xl sm:text-2xl font-semibold">
  Dashboard Overview
</h2>

// Body text stays the same across breakpoints
<p className="text-base leading-relaxed">
  Body text at 16px works on all screen sizes. Don't
  make it smaller on mobile - that's a readability trap.
</p>

// Or use clamp() for fluid typography (no breakpoints)
// In your global CSS:
// h1 { font-size: clamp(1.875rem, 1.5rem + 1.5vw, 3.75rem); }`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Rem, Not Px
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Always use <code>rem</code> units (which Tailwind does by default) instead of <code>px</code>.
        Rem units are relative to the root font size, which means your typography respects user
        browser preferences. If someone has set their browser default to 20px because they have poor
        eyesight, rem-based text scales up accordingly. Px-based text ignores their preference entirely.
        Accessibility isn&apos;t just about screen readers. It&apos;s about respecting user choices.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Building a Typography Component
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For any serious React design system, you&apos;ll want a reusable typography component that
        enforces your type scale. This prevents developers from using arbitrary sizes and keeps
        everything consistent. Here&apos;s a simple but effective approach.
      </p>

      <CodeBlock
        filename="Typography.tsx"
        language="tsx"
        code={`import { cn } from '@/lib/utils';

const variants = {
  h1: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-semibold tracking-tight',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-semibold',
  p: 'text-base leading-relaxed',
  lead: 'text-lg leading-relaxed text-muted-foreground',
  small: 'text-sm text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
} as const;

type Variant = keyof typeof variants;

interface TypographyProps {
  variant: Variant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

export function Typography({ variant, as, className, children }: TypographyProps) {
  const Component = as || (variant === 'p' || variant === 'lead' ? 'p' : variant);
  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}

// Usage
<Typography variant="h1">Page Title</Typography>
<Typography variant="lead">A longer description paragraph</Typography>
<Typography variant="small">Last updated 2 hours ago</Typography>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Typography Mistakes in Frontend Development
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        After reviewing dozens of React codebases, I see the same typography mistakes over and over.
        Here are the biggest offenders and how to fix them.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Using Too Many Font Sizes
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your app has 12 different font sizes, something is wrong. Stick to the Tailwind scale and
        use 5-7 sizes maximum across your entire application. More sizes don&apos;t create more
        hierarchy. They create confusion.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Ignoring Line Length on Wide Screens
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A full-width paragraph on a 4K monitor can easily reach 200 characters per line. That&apos;s
        brutal to read. Always constrain text content with <code>max-w-prose</code> or a similar
        max-width. Your layout can be wide. Your text lines shouldn&apos;t be.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Making Body Text Too Small
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        14px body text might look sleek on your design, but it&apos;s hard to read for extended
        periods. 16px is the minimum for body content. If you think 16px looks too big, the problem
        is likely your spacing or line height, not the font size.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Not Testing with Real Content
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Lorem ipsum hides typography problems. Test your UI components with real content of varying
        lengths. What happens when a heading wraps to three lines? What about a single-word heading?
        How does a paragraph with technical terms and long URLs behave? Real content reveals issues
        that placeholder text never will.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Typography Checklist
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>One font for your app. Two maximum (sans-serif + monospace).</li>
          <li>Use <code>next/font</code> for automatic optimization in Next.js projects.</li>
          <li>Stick to Tailwind&apos;s built-in type scale. Don&apos;t invent custom sizes.</li>
          <li>Body text at 16px (<code>text-base</code>). Never smaller for main content.</li>
          <li>Body line height: 1.5-1.75. Headings: 1.1-1.3. Small text: 1.5 minimum.</li>
          <li>Keep lines under 75 characters. Use <code>max-w-prose</code> for content areas.</li>
          <li>2-3 font weights only: regular (400), medium (500), semibold/bold (600-700).</li>
          <li>Two text colors for most UI: <code>text-foreground</code> and <code>text-muted-foreground</code>.</li>
          <li>Tighter tracking on large headings, wider tracking on small uppercase text.</li>
          <li>Use rem units (Tailwind default) so text respects user browser preferences.</li>
          <li>Test with real content at all breakpoints. Lorem ipsum hides problems.</li>
          <li>Build a Typography component to enforce consistency across your design system.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Typography isn&apos;t glamorous, but it&apos;s foundational. Get these basics right and your
        entire UI immediately feels more professional and polished. The best part is that these rules
        are simple and mechanical. You don&apos;t need a designer&apos;s eye. You just need to follow
        the system and apply it consistently across your React components. Start with the type scale,
        set your line heights, constrain your line lengths, and let the hierarchy do the rest.
      </p>
    </div>
  ),
};

export default blogPost;
