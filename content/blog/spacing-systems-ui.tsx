import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Spacing Systems: Why Your UI Looks Off (And How to Fix It)',
  excerpt:
    "Inconsistent spacing is the #1 reason UIs look unprofessional. Here's how to set up a spacing system that makes everything look clean and aligned.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 19, 2026',
  readTime: '15 min read',
  icon: '📏',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Spacing Is the Secret Sauce of Great UI
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You built a page. It works. The colors look good. The fonts are nice. But something feels &quot;off.&quot; You stare at it, tweak a few things, and still can&apos;t figure out what&apos;s wrong. Sound familiar? Nine times out of ten, the problem is spacing. Random margins here, inconsistent padding there, gaps that are 12px in one spot and 15px in another. It adds up fast, and your users notice it even if they can&apos;t put it into words.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Spacing is one of those things that separates amateur frontend work from professional design engineering. When you get it right, everything just clicks. Your React components look polished. Your Tailwind CSS layouts feel balanced. Your entire design system breathes. And the best part? It&apos;s not that hard once you understand the rules.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In this guide, we&apos;ll break down exactly how to build a spacing system for your UI. Whether you&apos;re working with Next.js, shadcn components, or any other frontend stack, these principles will make your work look ten times more professional. Let&apos;s get into it.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Is a Spacing System and Why Should You Care?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A spacing system is simply a set of predefined values that you use for all your margins, padding, and gaps. Instead of picking random numbers every time you need some space, you pick from a fixed scale. Think of it like a ruler with specific marks. You only use those marks, never the spots in between.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Why does this matter? Because consistency is what makes a UI feel professional. When every element on your page follows the same spacing rules, things automatically look aligned and intentional. Your design system becomes predictable. Your team stops arguing about how much padding a card should have. And your users get an experience that feels smooth and trustworthy.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Random Spacing  │────▶│  Looks Messy     │────▶│  Users Leave    │
│  12px, 15px, 9px │     │  Nothing Aligns  │     │  Trust Drops    │
└─────────────────┘     └─────────────────┘     └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  4px Grid System │────▶│  Clean & Aligned │────▶│  Users Stay     │
│  8, 16, 24, 32  │     │  Feels Polished  │     │  Trust Builds   │
└─────────────────┘     └─────────────────┘     └─────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The 4px Base Grid: Your New Best Friend
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most modern design systems, from Google&apos;s Material Design to Apple&apos;s Human Interface Guidelines, use a 4px base unit. The idea is simple: every spacing value in your entire app should be a multiple of 4. That&apos;s it. That&apos;s the whole rule. It sounds almost too simple, but this one constraint will transform how your UI looks and feels.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Complete 4px Scale
      </h3>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>4px</strong> (0.25rem) - Tiny gaps. Between an icon and its label text.</li>
          <li><strong>8px</strong> (0.5rem) - Small gaps. Between closely related items in a list.</li>
          <li><strong>12px</strong> (0.75rem) - Medium-small. Inside compact components like tags or badges.</li>
          <li><strong>16px</strong> (1rem) - Medium. Your default padding. Between form fields. Inside buttons.</li>
          <li><strong>24px</strong> (1.5rem) - Large. Between sections within a card. Between form groups.</li>
          <li><strong>32px</strong> (2rem) - Extra large. Between cards or major content blocks.</li>
          <li><strong>48px</strong> (3rem) - Between page sections on desktop.</li>
          <li><strong>64px</strong> (4rem) - Page-level padding. Hero sections. Major layout gaps.</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        How This Maps to Tailwind CSS
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s the beautiful thing: Tailwind CSS already uses a 4px grid by default. So if you&apos;re building with Tailwind, you&apos;re halfway there. The utility classes map perfectly to our spacing scale. <code>p-1</code> is 4px, <code>p-2</code> is 8px, <code>p-4</code> is 16px, <code>p-6</code> is 24px, and so on. Stick to these values and everything lines up automatically.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Quick Reference: Tailwind Spacing Values
      </h5>
      <CodeBlock
        filename="tailwind-spacing-map.tsx"
        language="tsx"
        code={`// Tailwind class -> Pixel value -> Use case
// p-1   ->  4px  -> Icon-to-text gaps
// p-2   ->  8px  -> Between list items, small internal gaps
// p-3   -> 12px  -> Inside compact components
// p-4   -> 16px  -> Default padding, form field gaps
// p-6   -> 24px  -> Card internal sections, form groups
// p-8   -> 32px  -> Between cards, major blocks
// p-12  -> 48px  -> Between page sections
// p-16  -> 64px  -> Page-level padding, hero sections

// These same values work for margin (m-), gap (gap-), and space (space-y-)`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Four Golden Rules of Spacing
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Knowing the scale is one thing. Knowing when to use each value is another. Here are the four rules that professional design engineers follow every single day. Once you internalize these, your layouts will improve dramatically.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Rule 1: Related Things Get Closer Together
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is the most important rule in spacing. Items that belong together should be visually close. A label and its input field should be tight. A heading and its paragraph should be snug. This is called the principle of proximity, and it&apos;s the foundation of good UI design. When users see two elements close together, their brain automatically groups them as related. Use this to your advantage.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Rule 2: Separate Groups Get More Space
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The flip side of Rule 1. When you want to show that two things are different groups, put more space between them. The email field group and the password field group should have more space between them than the label and input within each group. This creates a clear visual hierarchy that helps users scan your page quickly.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Rule 3: Component Padding Should Be Consistent
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every card in your app should have the same internal padding. Every button should use the same horizontal and vertical padding. This consistency is what makes a scalable design system work. When you open any page in your app, the components should feel like they belong to the same family.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Rule 4: Page Sections Get the Most Space
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The biggest gaps on your page should be between major sections. Think of the space between your hero section and your features section, or between your pricing table and your FAQ. These large gaps give your content room to breathe and help users understand the structure of your page at a glance.
      </p>

      <CodeBlock
        filename="spacing-rules.tsx"
        language="tsx"
        code={`// Rule 1: Related things are closer together
<div className="space-y-1.5">   {/* 6px - label and input are tight */}
  <Label>Email</Label>
  <Input type="email" />
</div>

// Rule 2: Groups are separated by more space
<div className="space-y-6">     {/* 24px - between form groups */}
  <div className="space-y-1.5">
    <Label>Email</Label>
    <Input type="email" />
  </div>
  <div className="space-y-1.5">
    <Label>Password</Label>
    <Input type="password" />
  </div>
</div>

// Rule 3: Component padding is consistent
<Card className="p-6">           {/* 24px padding everywhere */}
  <CardHeader className="pb-4"> {/* 16px bottom padding */}
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Rule 4: Page sections get the most space
<div className="space-y-12">     {/* 48px between page sections */}
  <HeroSection />
  <FeaturesSection />
  <PricingSection />
</div>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Spacing Hierarchy: A Visual Breakdown
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Think of spacing as layers. Each layer of your UI has a different scale of spacing. Here&apos;s how it all fits together from the smallest to the largest. This is the mental model that will help you pick the right spacing value every single time.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`                    ┌──────────────────────────────┐
                    │     PAGE LEVEL (48-64px)      │
                    │  ┌────────────────────────┐   │
                    │  │  SECTION LEVEL (24-32px)│   │
                    │  │  ┌──────────────────┐  │   │
                    │  │  │ COMPONENT (16px)  │  │   │
                    │  │  │ ┌──────────────┐ │  │   │
                    │  │  │ │ELEMENT (4-8px)│ │  │   │
                    │  │  │ │ Icon + Text   │ │  │   │
                    │  │  │ └──────────────┘ │  │   │
                    │  │  └──────────────────┘  │   │
                    │  └────────────────────────┘   │
                    └──────────────────────────────┘

Element gaps:    4-8px   (icon+text, label+input)
Component gaps:  16px    (padding inside cards, buttons)
Section gaps:    24-32px (between cards, form groups)
Page gaps:       48-64px (between hero, features, pricing)`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Spacing Mistakes (And How to Fix Them)
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Even experienced frontend developers make these mistakes. Let&apos;s go through each one so you can spot them in your own code and fix them right away.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 1: Using Random Arbitrary Values
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you find yourself writing <code>mt-[13px]</code> or <code>p-[7px]</code> in your Tailwind CSS, something&apos;s gone wrong. Arbitrary values break the grid and make your UI look inconsistent. Always snap to the nearest value on your 4px scale. If 12px feels too small and 16px feels too big, go with 16px. Consistency beats perfection every time.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 2: Same Spacing Everywhere
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Using 16px for everything might seem consistent, but it actually makes your UI look flat and confusing. If the gap between a label and input is the same as the gap between two sections, users can&apos;t tell what belongs together. You need spacing hierarchy. Small gaps for related items, big gaps for separate groups. That contrast is what creates visual structure.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 3: Forgetting Internal Component Spacing
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        People often focus on the gap between components but forget about the padding inside them. The space inside a card matters just as much as the space between cards. Make sure your component internal padding is consistent across your entire design system. Every card, every button, every dialog should use the same internal spacing rules.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 4: Tight Spacing on Mobile
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Touch targets on mobile need more breathing room than desktop click targets. Apple recommends a minimum of 44px for touch targets. If your buttons and links are too close together on a phone screen, users will tap the wrong thing constantly. Use responsive spacing to increase gaps on smaller screens where fingers, not cursors, do the navigating.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Mistake 5: Fear of White Space
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        White space is not wasted space. It&apos;s one of the most powerful tools in UI design. Generous spacing makes content easier to scan, reduces cognitive load, and gives your interface a premium feel. Look at Apple&apos;s website or Stripe&apos;s dashboard. They use tons of white space, and it looks fantastic. Don&apos;t be afraid to let your content breathe.
      </p>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
          Quick Self-Check for Your Spacing
        </h5>
        <ul className="space-y-2 list-disc list-inside">
          <li>Are all your spacing values multiples of 4?</li>
          <li>Can users tell which items belong together just by the spacing?</li>
          <li>Is internal component padding consistent across similar components?</li>
          <li>Do touch targets have enough breathing room on mobile?</li>
          <li>Are there clear gaps between major page sections?</li>
          <li>Does your page feel cramped or does it have room to breathe?</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Responsive Spacing: Making It Work on Every Screen
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your spacing needs to adapt to different screen sizes. What looks perfect on a 27-inch monitor might feel cramped on a phone or way too spread out on a tablet. Tailwind CSS makes responsive spacing easy with its breakpoint prefixes. Start with your mobile spacing as the default, then increase it at larger breakpoints.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The Responsive Spacing Strategy
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Mobile screens need tighter layouts to fit content, but touch targets still need room. Desktop screens can afford more generous spacing. The trick is to scale your gaps proportionally across breakpoints so the visual hierarchy stays intact at every size.
      </p>

      <CodeBlock
        filename="responsive-spacing.tsx"
        language="tsx"
        code={`// Card padding: tighter on mobile, roomier on desktop
<div className="p-4 sm:p-6 lg:p-8">
  Card content here
</div>

// Page sections: less gap on mobile, more on desktop
<div className="space-y-8 sm:space-y-12 lg:space-y-16">
  <HeroSection />
  <FeaturesSection />
  <PricingSection />
</div>

// Page wrapper with responsive horizontal padding
<div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
  <main>Your content</main>
</div>

// Grid gaps that adapt to screen size
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  <Card />
  <Card />
  <Card />
</div>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Building Your Spacing Scale in a Design System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re building a scalable design system for your team, you want to formalize your spacing tokens. This means defining them in one place so everyone on the team uses the same values. Here&apos;s how to do it with CSS custom properties and Tailwind CSS.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Step 1: Define Your Tokens
      </h6>
      <CodeBlock
        filename="globals.css"
        language="css"
        code={`@layer base {
  :root {
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
    --spacing-3xl: 4rem;     /* 64px */
  }
}`}
      />

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Step 2: Use Them Consistently
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once your tokens are defined, use them everywhere. If someone on your team wants to add spacing to a new component, they check the token list and pick the right one. No guessing, no random values. This is how companies like Airbnb, Shopify, and GitHub keep their UIs looking consistent even with hundreds of developers working on the same codebase.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Quick Reference Cheat Sheet
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Bookmark this section. You&apos;ll come back to it often. Here are the most common spacing patterns you&apos;ll use in your React and Next.js projects with Tailwind CSS:
      </p>

      <CodeBlock
        filename="spacing-cheatsheet.tsx"
        language="tsx"
        code={`// Icon + text alignment
<span className="flex items-center gap-1.5">  {/* 6px */}
  <Icon /> Label
</span>

// Button content padding
<button className="px-4 py-2">   {/* 16px horizontal, 8px vertical */}

// Card padding (responsive)
<div className="p-4 sm:p-6">     {/* 16px mobile, 24px desktop */}

// Between list items
<ul className="space-y-2">       {/* 8px between items */}

// Between form fields
<div className="space-y-4">      {/* 16px between fields */}

// Between form sections
<div className="space-y-8">      {/* 32px between sections */}

// Between page sections
<div className="space-y-16">     {/* 64px between sections */}

// Page wrapper
<div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Spacing in Practice: A Real-World Form Example
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let&apos;s put everything together with a real example. Here&apos;s a signup form that uses proper spacing hierarchy. Notice how the spacing tells users what belongs together without needing any extra visual cues. The proximity of each label to its input makes it obvious which field is which, while the larger gaps between groups create clear visual sections.
      </p>

      <CodeBlock
        filename="signup-form.tsx"
        language="tsx"
        code={`export function SignupForm() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6">
      {/* Page-level top spacing */}
      <div className="py-12 sm:py-16">

        {/* Form heading - 24px gap to form */}
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        {/* Form groups - 24px between groups */}
        <form className="space-y-6">

          {/* Name group - 6px between label and input */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Jane Smith" />
          </div>

          {/* Email group */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>

          {/* Password group */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
            <p className="text-sm text-muted-foreground">
              At least 8 characters
            </p>
          </div>

          {/* Button with extra top spacing */}
          <div className="pt-2">
            <Button className="w-full">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  )
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tools That Help You Maintain Spacing Consistency
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You don&apos;t have to rely on willpower alone. There are tools and practices that help your team stick to the spacing system without even thinking about it.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Linting and Automation
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use ESLint plugins or custom lint rules to flag arbitrary Tailwind values. If someone writes <code>mt-[13px]</code>, the linter catches it before it ever makes it to production. You can also use Prettier with the Tailwind plugin to keep your classes organized and easy to review in pull requests.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Design Tokens in Figma
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your design team uses Figma, set up spacing tokens there too. When designers and developers use the same spacing values, the handoff is seamless. No more &quot;can you make it a little more spaced out?&quot; conversations. The spacing is defined, documented, and shared across disciplines.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Component Libraries Like Spectrum UI
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you use a component library like Spectrum UI or shadcn, the spacing is already baked into the components. Cards have consistent padding. Buttons have the right proportions. Form fields are properly spaced. This gives you a huge head start and means you only need to worry about spacing at the layout level, not inside every individual component.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Use a 4px grid. Every spacing value should be a multiple of 4.</li>
          <li>Related things get small gaps. Separate groups get big gaps.</li>
          <li>Stick to Tailwind&apos;s built-in scale. No arbitrary values.</li>
          <li>Internal padding of components should be consistent across your design system.</li>
          <li>Use responsive spacing to adapt for mobile, tablet, and desktop.</li>
          <li>Increase touch target spacing on smaller screens for better usability.</li>
          <li>White space makes things feel professional, not empty.</li>
          <li>Define spacing tokens once and share them with your whole team.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Spacing might seem like a small detail, but it&apos;s the difference between a UI that feels amateur and one that feels polished. Start with the 4px grid, follow the four golden rules, and use Tailwind CSS to keep everything consistent. Your users will notice the difference, even if they can&apos;t explain why. And your team will thank you for making web dev just a little less chaotic.
      </p>
    </div>
  ),
};

export default blogPost;
