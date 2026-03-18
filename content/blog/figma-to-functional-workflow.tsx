import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'From Figma to Functional: My Design-to-Development Workflow',
  excerpt:
    "Turning Figma designs into clean React code doesn't have to be painful. Here's the exact workflow I use to go from mockup to production-ready Next.js components.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 8, 2026',
  readTime: '15 min read',
  icon: '🔄',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">TL;DR</h3>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Going from a Figma design to production React code is a multi-step process. Study the design first,
          map values to design tokens, plan your component tree, build small pieces, then assemble the full page.
          This workflow saves hours of refactoring and keeps your codebase clean with Tailwind CSS and
          reusable UI components.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Handoff Problem Everyone Knows
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        We&apos;ve all been there. A designer sends you a gorgeous Figma file. You open it up and your first
        thought is &quot;okay cool, but what about the mobile version?&quot; Or &quot;what happens when this
        text is really long?&quot; Or &quot;where&apos;s the empty state?&quot;
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The gap between a Figma mockup and working frontend code isn&apos;t just about turning colors into hex
        codes. It&apos;s about all the stuff that a static picture can&apos;t show you. Loading states, error
        handling, edge cases with long content, responsive behavior on different screen sizes, accessibility,
        and keyboard navigation.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        After doing this hundreds of times, building React components from Figma designs for web applications
        of all sizes, I&apos;ve got a system that works. Let me walk you through it step by step.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This isn&apos;t some theoretical framework from a blog post I read somewhere. This is the actual workflow
        I use every single day when building production frontend code. It&apos;s been refined through real
        projects, real deadlines, and real feedback from designers who care deeply about their work being
        translated faithfully into the browser. Whether you&apos;re building with Next.js, plain React, or any
        other frontend framework, the principles are the same.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   STEP 1     │    │   STEP 2     │    │   STEP 3     │    │   STEP 4     │    │   STEP 5     │
│              │    │              │    │              │    │              │    │              │
│  Study the   │───▶│  Map to      │───▶│  Plan the    │───▶│  Build small │───▶│  Responsive  │
│  design      │    │  tokens      │    │  components  │    │  first       │    │  pass        │
│              │    │              │    │              │    │              │    │              │
│  15-20 min   │    │  30 min      │    │  20 min      │    │  Hours       │    │  1-2 hours   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 1: Study the Design Before You Code
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before I write a single line of code, I spend 15 to 20 minutes just looking at the design in Figma
        Dev Mode. Not glancing at it. Actually studying it. This is the most important step and the one most
        frontend developers skip.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I know what you&apos;re thinking. &quot;I don&apos;t have time to just stare at a design for 20 minutes.&quot;
        But here&apos;s the thing: every minute you spend studying the design saves you five minutes of
        refactoring later. I&apos;ve seen developers jump straight into coding and end up rewriting their
        entire component structure three times because they didn&apos;t notice a pattern in the design that
        should have been a shared component. That&apos;s hours wasted, not minutes saved.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">What I Look For</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Spacing patterns:</strong> Is everything on an 8px grid? 4px? Is the spacing consistent throughout?</li>
        <li><strong>Color usage:</strong> Which colors match our existing design tokens? Are there any new ones?</li>
        <li><strong>Typography:</strong> What font sizes and weights are being used? Do they match our type scale?</li>
        <li><strong>Component boundaries:</strong> Where does one UI component end and another begin?</li>
        <li><strong>Repeated patterns:</strong> What shows up more than once? That&apos;s definitely a reusable component.</li>
        <li><strong>Interactive states:</strong> Are hover, focus, active, and disabled states designed?</li>
        <li><strong>Layout structure:</strong> Is it a grid? Flexbox? How does the layout hierarchy work?</li>
        <li><strong>Iconography:</strong> What icon set is being used? Do we already have these icons?</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Asking the Right Questions</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        While studying the design, I write down every question that pops into my head. Things designers
        sometimes forget to spec out but engineers need to know. This is especially important in frontend
        development where the gap between a static mockup and a dynamic web application is huge.
      </p>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Questions I Always Ask</h5>
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>What happens when the list is empty? Is there an empty state design?</li>
          <li>Does this text truncate with an ellipsis or wrap to multiple lines?</li>
          <li>What does the loading state look like? Skeleton screens or spinners?</li>
          <li>What happens on error? Is there an error state for this form?</li>
          <li>How does this layout respond on tablet and mobile screen sizes?</li>
          <li>Are there any animations or transitions between states?</li>
          <li>What about keyboard navigation and screen reader accessibility?</li>
          <li>What&apos;s the maximum and minimum width of this container?</li>
          <li>Does this component need to support right-to-left languages?</li>
        </ul>
        <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">Pro Tip</h6>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Batch all your questions and send them to the designer at once. Way better than pinging them every
          10 minutes throughout the day. Designers appreciate focused, thoughtful feedback. I usually compile
          my questions into a single message with numbered items and reference screenshots. This shows
          you&apos;ve actually studied their work carefully, and they&apos;re much more likely to give you
          thorough answers in return.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 2: Map Design Values to Tokens
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is where most frontend developers mess up. They see a color in the Figma design and hard-code
        the hex value directly into their CSS or Tailwind classes. Then six months later when the brand
        colors change, they&apos;re updating values in 47 files across the codebase.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Instead, I map every value in the design to an existing design token first. Design tokens are the
        shared language between your design system in Figma and your code in React. They&apos;re the bridge
        that makes the handoff smooth and maintainable. When both designers and developers speak the same
        language of tokens, you eliminate an entire category of miscommunication.
      </p>

      <CodeBlock
        filename="token-mapping.ts"
        language="typescript"
        code={`// Design shows: #6366F1, 16px font, 24px gap, 8px radius

// I check our tokens:
// #6366F1 → that's --primary (already exists!)
// 16px → text-base (Tailwind default)
// 24px → gap-6 (6 * 4px grid)
// 8px → rounded-lg (in our system)

// If something doesn't match a token, I ask:
// 1. Should we make a new token? (yes if it'll be reused)
// 2. Is it a one-off? (use the closest existing token)
// 3. Did the designer use a wrong value by accident? (happens a lot)

// My mapping document looks like this:
const tokenMap = {
  // Colors from the design
  "#6366F1": "bg-primary",      // Primary brand color
  "#F1F5F9": "bg-muted",        // Background sections
  "#64748B": "text-muted-foreground", // Secondary text
  "#EF4444": "bg-destructive",   // Error states

  // Spacing from the design
  "8px":  "p-2 / gap-2",        // Tight spacing
  "16px": "p-4 / gap-4",        // Standard spacing
  "24px": "p-6 / gap-6",        // Comfortable spacing
  "32px": "p-8 / gap-8",        // Section spacing
}`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Why Tokens Matter So Much</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Design tokens are the secret to building maintainable web applications. When you use tokens like
        <code> bg-primary</code> instead of <code> bg-[#6366F1]</code> in your Tailwind CSS classes, you get
        dark mode support for free. You get theme switching for free. You get consistent colors across your
        entire React component library. And when the design team decides to change the primary color from
        indigo to teal, you update one CSS variable and the entire application follows. That&apos;s the kind
        of maintainability that separates amateur projects from professional ones.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Token Categories to Check</h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Colors:</strong> Primary, secondary, destructive, muted, accent, background, foreground</li>
        <li><strong>Typography:</strong> Font family, sizes (xs through 4xl), weights, line heights</li>
        <li><strong>Spacing:</strong> Padding, margin, and gap values on the 4px grid</li>
        <li><strong>Border radius:</strong> sm, md, lg, xl, full</li>
        <li><strong>Shadows:</strong> sm, md, lg, xl for elevation levels</li>
        <li><strong>Transitions:</strong> Duration and easing for animations</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Handling Values That Don&apos;t Map</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Sometimes a design includes values that don&apos;t match any existing token. Maybe the designer used
        a 14px font size that sits between your <code>text-xs</code> (12px) and <code>text-sm</code> (14px).
        Or a color that&apos;s close to but not exactly your primary color. This is where communication becomes
        critical. I always bring these discrepancies up with the designer rather than making assumptions. Nine
        times out of ten, it was unintentional and they&apos;re happy to snap it to the nearest token value.
        That one time out of ten, it&apos;s a deliberate choice and we should add a new token to our design system.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 3: Plan the Component Tree
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before touching any code, I sketch out what React components I need. I literally write this out as
        notes or comments. It saves hours of refactoring later because I know exactly what to build and
        what already exists in our design system.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This planning step is where experience really pays off. A junior developer might look at a settings
        page and see one big page to build. A senior developer sees five reusable components that can be
        assembled in different configurations. The senior developer&apos;s code is more flexible, more
        testable, and takes about the same amount of time to write. The difference is entirely in the
        planning phase.
      </p>

      <CodeBlock
        filename="planning.tsx"
        language="tsx"
        code={`// Looking at a settings page design, I break it down:

// What I need to build new:
// - SettingsSection (card with title + content - reusable!)
// - SettingsRow (label + control + description - reusable!)
// - AvatarUpload (specific to profile)

// What already exists in our design system:
// - Button, Input, Switch, Card, Avatar
// - No need to rebuild these!

// So my actual work is:
// 2 new reusable components
// 1 specific component
// 1 page that puts it all together
// Everything else is just composing existing stuff

// I also note the data requirements:
// - User profile data (name, email, avatar)
// - Notification preferences (boolean toggles)
// - Plan information (read-only display)
// This helps me plan the props interface early`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">The Component Decision Framework</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For every piece of UI in the design, I ask three questions to decide what to do. This framework
        has saved me from building dozens of unnecessary components over the years. It keeps your codebase
        lean and your design system focused.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`                    ┌──────────────────────────┐
                    │  Does this UI pattern     │
                    │  exist in our system?      │
                    └─────────┬────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                   YES                  NO
                    │                   │
                    ▼                   ▼
          ┌─────────────────┐  ┌─────────────────────┐
          │ Use the existing │  │ Will it be reused    │
          │ component as-is  │  │ elsewhere?           │
          └─────────────────┘  └────────┬────────────┘
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                             YES                  NO
                              │                   │
                              ▼                   ▼
                    ┌──────────────────┐ ┌──────────────────┐
                    │ Build a reusable │ │ Build it inline  │
                    │ component with   │ │ on the page.     │
                    │ props and docs.  │ │ Extract later if │
                    │ Add to Storybook.│ │ needed.          │
                    └──────────────────┘ └──────────────────┘`}
        </pre>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">The Component Naming Convention</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Naming matters more than you think. I follow a simple convention: generic components get generic
        names (Card, Button, Input), while composed or feature-specific components get descriptive names
        (SettingsCard, UserProfileForm, NotificationToggle). This makes it immediately clear which components
        are part of the base design system and which are built for specific features. It also helps with
        code search. When someone asks &quot;where&apos;s the settings card?&quot; they can find it instantly.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 4: Build Small First, Then Compose
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I always start with the smallest pieces and work my way up. Build the reusable UI components first.
        The page layout comes last. This is the core of good React component architecture and it makes
        your codebase so much easier to maintain.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        There&apos;s a reason this approach works so well. When you build bottom-up, each piece gets your full
        attention. You handle edge cases properly. You write clean TypeScript interfaces. You make sure the
        component looks good in isolation. Then when you compose them together on the page, everything just
        works because each piece was built correctly. Compare this to the top-down approach where you build
        the entire page at once and then try to extract components later. That extraction almost never happens
        cleanly because the pieces are tangled together.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Building a Reusable Component</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s what one of those small, reusable components looks like. Notice how it uses TypeScript
        for type safety and Tailwind CSS for styling. Every prop has a clear purpose and nothing is
        overcomplicated.
      </p>

      <CodeBlock
        filename="SettingsRow.tsx"
        language="tsx"
        code={`interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="space-y-0.5 flex-1 mr-4">
        <label className="text-sm font-medium">{label}</label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// Now using it is super clean:
<SettingsRow
  label="Email notifications"
  description="Get emails about account activity"
>
  <Switch checked={emailOn} onCheckedChange={setEmailOn} />
</SettingsRow>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Why Small Components Win</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Small React components are easier to test, easier to reuse, and easier to understand. When each
        component does one thing well, composing them into complex pages becomes straightforward. This is
        the foundation of every good design system and component library. It&apos;s also much easier to review
        in pull requests. When a PR changes a small, focused component, the reviewer can understand the change
        in seconds. When a PR changes a 500-line page component, the review takes forever and bugs slip through.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Composing the Page</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once all the small pieces are built and tested, assembling the page is almost anticlimactic. It&apos;s
        just importing components and arranging them. The page file reads like a table of contents for the UI.
        Each section is clearly named, and the overall structure is easy to scan.
      </p>
      <CodeBlock
        filename="SettingsPage.tsx"
        language="tsx"
        code={`import { SettingsSection } from "@/components/settings-section"
import { SettingsRow } from "@/components/settings-row"
import { AvatarUpload } from "@/components/avatar-upload"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <SettingsSection title="Profile" description="Your public information">
        <AvatarUpload currentAvatar={user.avatar} />
        <SettingsRow label="Display Name">
          <Input defaultValue={user.name} className="max-w-xs" />
        </SettingsRow>
        <SettingsRow label="Email">
          <Input defaultValue={user.email} className="max-w-xs" />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Notifications" description="How we contact you">
        <SettingsRow label="Email alerts" description="Weekly digest of activity">
          <Switch />
        </SettingsRow>
        <SettingsRow label="Push notifications" description="Real-time browser alerts">
          <Switch />
        </SettingsRow>
      </SettingsSection>

      <Button>Save Changes</Button>
    </div>
  )
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 5: Make It Work on Every Screen Size
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most Figma designs only show the desktop version. But real people use phones, tablets, and everything
        in between. Responsive design is not optional in modern web development. I do a separate pass just
        for responsive behavior after the desktop version looks good.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I intentionally save the responsive pass for after the desktop version is solid. Trying to build
        desktop and mobile at the same time splits your focus and leads to messy compromises. Get the layout
        right on desktop first, then adjust for smaller screens. Tailwind CSS makes this easy with its
        mobile-first responsive prefixes.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Responsive Patterns in Tailwind CSS</h4>

      <CodeBlock
        filename="responsive.tsx"
        language="tsx"
        code={`// Patterns I use all the time:

// Stack on phone, side by side on desktop
<div className="flex flex-col sm:flex-row gap-4">
  <ProfileSection className="flex-1" />
  <ActivitySection className="flex-1" />
</div>

// Fewer columns on smaller screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>

// Different content for different screen sizes
<Button className="hidden sm:inline-flex">Full Label</Button>
<Button className="sm:hidden" size="icon"><Icon /></Button>

// Responsive padding and spacing
<div className="p-4 sm:p-6 lg:p-8">
  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Title</h1>
</div>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Mobile-First Approach</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind CSS uses a mobile-first responsive system. Your base styles are for mobile, and you add
        breakpoint prefixes like <code>sm:</code>, <code>md:</code>, and <code>lg:</code> to override for
        larger screens. This approach forces you to think about the smallest screen first, which usually
        results in cleaner, simpler markup. The mobile version strips away the nice-to-haves and focuses
        on the core content, which is actually a better starting point for any layout.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">Breakpoints I Use Most</h6>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>sm (640px):</strong> Large phones in landscape, small tablets</li>
        <li><strong>md (768px):</strong> Tablets and small laptops</li>
        <li><strong>lg (1024px):</strong> Standard laptops and desktops</li>
        <li><strong>xl (1280px):</strong> Large screens and wide monitors</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Testing Responsive Behavior</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t just resize your browser window and call it done. Test on actual devices when you can.
        iOS Safari and Android Chrome have quirks that desktop browser dev tools don&apos;t simulate. Touch
        targets need to be at least 44px. Scroll behavior differs between mobile browsers. The viewport
        height on mobile is tricky because of the address bar. These are the kinds of things you only
        catch by testing on real hardware.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Step 6: Handle the States Nobody Designs
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is my bonus step that turns good frontend work into great frontend work. Every feature has
        states beyond the &quot;happy path&quot; that the Figma design shows. Building these states is what
        separates a polished web application from a prototype.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`UI States Every Component Needs:

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   LOADING    │    │   SUCCESS    │    │    ERROR     │
│              │    │              │    │              │
│  Skeleton or │    │  Show data   │    │  Error msg   │
│  spinner     │    │  normally    │    │  + retry     │
└──────┬───────┘    └──────────────┘    └──────┬───────┘
       │                                       │
       │         ┌──────────────┐              │
       └────────▶│    EMPTY     │◀─────────────┘
                 │              │   (after retry
                 │  Empty state │    still fails)
                 │  illustration│
                 │  + CTA       │
                 └──────────────┘`}
        </pre>
      </div>

      <CodeBlock
        filename="stateful-component.tsx"
        language="tsx"
        code={`// A component that handles all states properly
function UserList() {
  const { data, isLoading, error } = useUsers()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-2">Failed to load users</p>
        <Button variant="outline" onClick={refetch}>Try again</Button>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No users yet</p>
        <Button className="mt-4">Invite someone</Button>
      </div>
    )
  }

  return data.map(user => <UserCard key={user.id} user={user} />)
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Mistakes to Avoid
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve seen these mistakes hundreds of times in code reviews. Here&apos;s what to watch out for
        when turning Figma designs into React components for your web applications.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Hard-Coding Pixel Values</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          If you&apos;re writing <code>margin-top: 23px</code>, something is wrong. The designer probably
          meant 24px, which maps to <code>mt-6</code> in Tailwind CSS. Always round to the nearest value in
          your spacing system. Just ask the designer if you&apos;re unsure.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Building Components That Already Exist</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Before making a new React component, always check your design system library first. If something
          close exists, add a variant to it instead of creating a whole new component. This keeps your
          component library lean and consistent.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Only Building the Happy Path</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          The Figma design shows perfect data. But real web applications need empty states, loading skeletons,
          error messages, and handling for super long text that breaks your layout. Push back on designs that
          skip these. Users will hit every edge case you can imagine.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Forgetting Dark Mode</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          If your Next.js app has dark mode, every component needs to work in both themes. Using semantic
          tokens like <code>bg-card</code> instead of <code>bg-white</code> in Tailwind CSS handles this
          automatically. It&apos;s one of the biggest benefits of using design tokens.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Pixel-Perfect Over Good Engineering</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          The goal isn&apos;t to match every pixel. It&apos;s to capture the design intent while building
          something that lasts. A component that&apos;s 2 pixels off but uses proper tokens, handles all
          states, and is accessible is better than a pixel-perfect component with hard-coded values.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tools I Actually Use Every Day
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        There are tons of tools out there for design-to-code workflows. Here are the ones I actually use
        in my daily work as a design engineer building with React and Next.js.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Design Inspection</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Figma Dev Mode:</strong> For grabbing exact spacing, colors, and font values from designs</li>
        <li><strong>Figma Tokens plugin:</strong> Keeps design tokens in sync between Figma and your codebase</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Development and Testing</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Storybook:</strong> Building and testing React components in isolation before they hit the page</li>
        <li><strong>Chromatic:</strong> Automated visual regression testing that catches UI bugs in pull requests</li>
        <li><strong>Tailwind IntelliSense:</strong> VS Code extension that autocompletes Tailwind CSS classes</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Quality Checks</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>axe DevTools:</strong> Browser extension for quick accessibility audits</li>
        <li><strong>Responsively:</strong> Preview your UI on multiple screen sizes at once</li>
        <li><strong>Vercel Preview Deploys:</strong> Share running code with designers for feedback before merge</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Working Well With Designers
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The workflow isn&apos;t just tools and steps. It&apos;s fundamentally about collaboration. The
        relationship between you and your designer makes or breaks the quality of the final product.
        Here are the habits that make the biggest difference.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Show Running Code Early</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t wait until you&apos;re done to show the designer. Deploy a preview build on Vercel and share
        the link. They&apos;ll spot things in a running web app that they never would have noticed in a
        static design review. Real browsers reveal real issues. Interactive states feel different when you
        can actually click them. Animations need to be experienced, not imagined.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Explain Technical Constraints</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you have to change something for technical reasons, always explain why and suggest an alternative
        that achieves the same design intent. Don&apos;t just say &quot;we can&apos;t do that.&quot; Say
        &quot;we can&apos;t do that because of X, but here&apos;s an approach that gets us 95% there.&quot;
        Designers respect engineers who understand design intent, even when the implementation needs to differ.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Share Your Component Library</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Give designers access to your Storybook. Let them see what UI components already exist so they can
        design with real constraints. This prevents them from designing things that would require building
        entirely new components when a variant of an existing one would work just as well.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Celebrate Good Specs</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When a build matches the design perfectly on the first try, tell the designer. It means their spec
        was excellent. Positive feedback encourages them to keep providing detailed, well-thought-out designs.
        This small habit improves the quality of every future handoff you receive.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Handling Edge Cases Like a Pro
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Edge cases are where good frontend development separates itself from great frontend development.
        Here are the edge cases I check for on every single feature I build.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Content Edge Cases</h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>What if the title is 200 characters long?</li>
        <li>What if there are zero items in the list?</li>
        <li>What if there are 10,000 items?</li>
        <li>What if the user&apos;s name contains special characters or emojis?</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">State Edge Cases</h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>Loading state when data is being fetched</li>
        <li>Error state when the API call fails</li>
        <li>Empty state when there&apos;s no data yet</li>
        <li>Stale state when data might be outdated</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Device Edge Cases</h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>Very small screens (320px width)</li>
        <li>Very large screens (4K monitors)</li>
        <li>Touch vs. mouse vs. keyboard interaction</li>
        <li>Slow network connections</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Workflow Summary
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Your Design-to-Code Checklist</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Spend 15-20 minutes studying the Figma design before writing any code</li>
          <li>Map every design value to an existing token or Tailwind CSS class first</li>
          <li>Plan your React component tree on paper or in comments</li>
          <li>Build the smallest reusable UI components first, page layout last</li>
          <li>Do a separate responsive design pass for mobile, tablet, and desktop</li>
          <li>Build loading, error, and empty states for every data-driven component</li>
          <li>Use semantic design tokens so dark mode and theming just work</li>
          <li>Check all edge cases: empty, loading, error, long content, and small screens</li>
          <li>Talk to your designer early and often, and show running code on preview deploys</li>
          <li>Test accessibility with keyboard navigation and a screen reader</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This workflow might seem like a lot of steps, but it actually saves time. When you plan before you
        code, you avoid the painful refactoring that happens when you dive in too fast. Every hour spent
        studying a design and planning components saves three hours of rewriting code later.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best frontend developers I know all have a system like this. It doesn&apos;t have to be exactly
        my system. But having any structured approach to turning Figma designs into React components will
        make your code cleaner, your designs more accurate, and your relationship with designers way better.
        Whether you&apos;re working with Next.js, Tailwind CSS, or any other tools in the frontend
        ecosystem, the principles remain the same: study first, plan second, build third. Your future
        self will thank you for it.
      </p>
    </div>
  ),
};

export default blogPost;
