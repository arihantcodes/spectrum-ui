import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Responsive Design in 2026: Modern CSS That Actually Works',
  excerpt:
    "Forget media query spaghetti. Modern CSS gives you responsive layouts with way less code. Here's what you should be using right now.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 18, 2026',
  readTime: '15 min read',
  icon: '📱',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let&apos;s be honest. If you&apos;ve been building websites for more than a year, you&apos;ve probably written hundreds of media queries. Desktop looks good? Great. Tablet? Add a breakpoint. Phone? Another breakpoint. Some weird in-between size? Yet another breakpoint. It gets old fast. The good news is that modern CSS has changed the game completely. Responsive design in 2026 looks nothing like it did even two years ago. You can build layouts that adapt naturally with way less code, fewer headaches, and better results. Whether you&apos;re using React, Next.js, or plain HTML, these techniques will make your frontend development life so much easier.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Media Queries Alone Don&apos;t Cut It Anymore
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Media queries check the viewport width. That&apos;s it. They have no clue what&apos;s happening inside your actual layout. Think about it: a card component sitting in a wide main content area needs to look different from the exact same card sitting in a narrow sidebar. But the screen width hasn&apos;t changed. Media queries can&apos;t help you there.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        That&apos;s why the web development community has moved toward intrinsic design. Instead of telling the browser exactly what to do at every pixel, you give it smart rules and let it figure out the best layout. The result? Code that&apos;s simpler, more maintainable, and works across every screen size, even ones that don&apos;t exist yet.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Old Approach       │     │   Transition          │     │   Modern Approach    │
│                     │     │                       │     │                     │
│  Fixed breakpoints  │────▶│  Mobile-first media   │────▶│  Intrinsic design   │
│  px-based layouts   │     │  queries + flexbox    │     │  Container queries  │
│  Tons of overrides  │     │  Fewer breakpoints    │     │  CSS Grid + clamp() │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘

        Old: "At 768px, do this"  →  New: "Adapt to available space"`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Container Queries: The Biggest CSS Feature in Years
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Container queries are the single most important addition to responsive design in recent memory. Instead of asking &quot;how wide is the screen?&quot; they ask &quot;how wide is my parent container?&quot; This is a huge deal for building reusable UI components in any design system.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        How Container Queries Work
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        First, you tell CSS which element is a container. Then you write styles that respond to that container&apos;s size. It&apos;s that simple.
      </p>

      <CodeBlock
        filename="container-queries.css"
        language="css"
        code={`/* Step 1: Define a container */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Step 2: Style based on the container, not the screen */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}

/* The card adapts to where it lives, not the viewport.
   Sidebar? Stacked. Main content? Side by side. Automatically. */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        When Should You Reach for Container Queries?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Any time a component could end up in different-sized containers across your app. Cards, navigation items, form fields, media objects. If your React component might live in a sidebar one day and a full-width section the next, container queries are your friend.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Browser Support in 2026
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Container queries are now supported in all major browsers. Chrome, Firefox, Safari, Edge. You can use them in production today. No polyfills needed. If you&apos;re still holding off, there&apos;s no reason to wait any longer.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        CSS Grid: Your Responsive Layout Workhorse
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CSS Grid has been around for a while, but too many developers still default to flexbox for everything. Don&apos;t get me wrong, flexbox is great. But CSS Grid can build responsive layouts without a single media query. The magic combo is <code>auto-fill</code> and <code>minmax()</code>.
      </p>

      <CodeBlock
        filename="auto-grid.css"
        language="css"
        code={`/* Cards that auto-wrap based on available space */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* That's it. No breakpoints. No media queries.
   3 columns on big screens, 2 on medium, 1 on small.
   The browser handles it all. */

/* For a more complex layout with a sidebar: */
.page-layout {
  display: grid;
  grid-template-columns: minmax(200px, 300px) 1fr;
  gap: 2rem;
}

/* On small screens, stack them: */
@media (max-width: 768px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Grid vs. Flexbox: When to Use Which
      </h3>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────┐     ┌──────────────────────────┐
│        CSS Grid           │     │        Flexbox            │
│                          │     │                          │
│  ✓ Two-dimensional       │     │  ✓ One-dimensional       │
│    layouts (rows + cols) │     │    layouts (row OR col)  │
│  ✓ Page-level structure  │     │  ✓ Component-level       │
│  ✓ Card grids            │     │    alignment             │
│  ✓ Dashboard layouts     │     │  ✓ Nav bars, toolbars    │
│  ✓ Auto-fill responsive  │     │  ✓ Centering content     │
│    grids                 │     │  ✓ Space distribution    │
└──────────────────────────┘     └──────────────────────────┘

  Rule of thumb: Grid for layout, Flexbox for alignment.
  Use both together for the best results.`}
        </pre>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Subgrid: The Missing Piece
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Subgrid lets child elements align to the parent grid&apos;s tracks. This solves the age-old problem of cards in a grid where the titles, descriptions, and buttons don&apos;t line up. With subgrid, they all snap to the same rows automatically. It&apos;s a subtle improvement, but it makes your UI look significantly more polished.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Fluid Typography with clamp()
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Remember setting font sizes at different breakpoints? <code>text-2xl</code> on mobile, <code>text-3xl</code> on tablet, <code>text-4xl</code> on desktop? That creates jumps. The text snaps between sizes as you resize. The <code>clamp()</code> function makes text scale smoothly instead.
      </p>

      <CodeBlock
        filename="fluid-type.css"
        language="css"
        code={`/* Font size scales smoothly from 1.5rem to 3rem */
h1 {
  font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem);
}

/* The three values:
   1. Minimum size (1.5rem) - never smaller than this
   2. Preferred size (4vw + 0.5rem) - scales with viewport
   3. Maximum size (3rem) - never bigger than this */

/* Works for spacing too */
.section {
  padding: clamp(1rem, 3vw, 3rem);
}

.container {
  max-width: clamp(320px, 90vw, 1200px);
  margin-inline: auto;
}

/* No breakpoints. Text and spacing just flow. */`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        A Quick Tip for Calculating clamp() Values
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t overthink the math. There are online calculators that generate clamp() values for you. Just plug in your minimum font size, maximum font size, and the viewport range, and it spits out the perfect formula. Search for &quot;fluid type calculator&quot; and you&apos;ll find plenty.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Responsive Design with Tailwind CSS
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Tailwind CSS (and honestly, you probably should be for most projects), responsive design is baked right in. Tailwind&apos;s mobile-first breakpoint system is intuitive and pairs perfectly with modern CSS features.
      </p>

      <CodeBlock
        filename="responsive-tailwind.tsx"
        language="tsx"
        code={`// Responsive stack → row layout
<div className="flex flex-col sm:flex-row gap-4">
  <Card className="flex-1" />
  <Card className="flex-1" />
</div>

// Responsive grid - no custom CSS needed
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Show/hide content at breakpoints
<span className="hidden md:inline">Full description text here</span>
<span className="md:hidden">Short text</span>

// Responsive text sizes with Tailwind
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Page Title
</h1>

// Responsive padding and margins
<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
  {children}
</section>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Custom Breakpoints in Tailwind
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind&apos;s default breakpoints work for most projects. But if you need custom ones, it&apos;s easy to add them in your config. You can also use arbitrary values like <code>min-[800px]:grid-cols-2</code> for one-off cases without touching your config file at all.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Combining Tailwind with Container Queries
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tailwind v4 has first-class support for container queries. You can use <code>@container</code> utilities directly in your class names. This means you get the power of container queries with the convenience of utility-first CSS. It&apos;s a perfect match for building UI components in a design system.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Logical Properties Advantage
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re building for an international audience, logical properties are a must. Instead of <code>margin-left</code> and <code>margin-right</code>, you use <code>margin-inline-start</code> and <code>margin-inline-end</code>. They automatically flip for right-to-left languages like Arabic and Hebrew. Tailwind supports these too with the <code>ms-</code> and <code>me-</code> utilities.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Testing Your Responsive Layouts
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building responsive layouts is one thing. Making sure they actually work is another. Here&apos;s a testing strategy that catches most issues before your users do.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Device Testing Checklist
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Resize your browser slowly from 320px to 1920px. Watch for layout breaks.</li>
          <li>Test on actual phones and tablets, not just browser dev tools.</li>
          <li>Check landscape orientation on mobile devices.</li>
          <li>Try zooming in to 200%. Content should still be usable.</li>
          <li>Test with long content. What happens when a title wraps to three lines?</li>
          <li>Check touch targets. Buttons need at least 44px hit areas on mobile.</li>
        </ul>
      </div>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Pro Tip
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use the responsive design mode in Firefox. It&apos;s arguably better than Chrome&apos;s device toolbar. You can drag to resize freely and see exactly where your layout breaks.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Responsive Design Mistakes
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li><strong>Fixed widths in pixels:</strong> Use percentages, fr units, or min/max instead of hard-coded px widths. Let the layout breathe.</li>
          <li><strong>Forgetting touch targets:</strong> Buttons and links need to be at least 44px on mobile. Fingers are bigger than mouse cursors.</li>
          <li><strong>Hiding too much on mobile:</strong> If content is important, show it. Just reorganize it for the smaller screen.</li>
          <li><strong>Testing only on your phone:</strong> There are hundreds of screen sizes out there. Use browser dev tools to try different dimensions.</li>
          <li><strong>Ignoring landscape mode:</strong> Phones turn sideways. Make sure your layout still works when they do.</li>
          <li><strong>Not testing with real content:</strong> &quot;Lorem ipsum&quot; is always the perfect length. Real content isn&apos;t. Test with actual data.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Performance Matters for Responsive Design
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Responsive design isn&apos;t just about layout. Performance is a huge part of the mobile experience. Nobody wants to wait three seconds for a page to load on their phone. Here are the big wins.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Image Optimization
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use the <code>picture</code> element or Next.js <code>Image</code> component to serve different image sizes for different screens. Don&apos;t send a 2000px wide hero image to a 375px phone. That&apos;s wasted bandwidth and slower load times. Next.js handles this automatically with its built-in image optimization.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Lazy Loading Below the Fold
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Content below the fold doesn&apos;t need to load immediately. Use <code>loading=&quot;lazy&quot;</code> on images and consider lazy loading heavy components with React&apos;s <code>Suspense</code> and <code>lazy()</code>. This makes your initial page load much faster, especially on slower mobile connections.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Putting It All Together: A Modern Responsive Workflow
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s the approach I use on every new project. It combines all of these modern CSS techniques into a workflow that just works.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. Layout    │────▶│  2. Type &    │────▶│  3. Component │────▶│  4. Test &    │
│              │     │   Spacing     │     │   Queries     │     │   Optimize   │
│  CSS Grid    │     │              │     │              │     │              │
│  for page    │     │  clamp() for │     │  Container   │     │  Resize test │
│  structure   │     │  fluid sizes │     │  queries for │     │  Real device │
│              │     │              │     │  components  │     │  Performance │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘

  Start mobile-first  →  Add fluid scaling  →  Context-aware  →  Verify`}
        </pre>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Step-by-Step
      </h3>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li><strong>Start with CSS Grid</strong> for your page-level layout. Sidebars, main content, footers.</li>
          <li><strong>Use clamp()</strong> for all typography and spacing. No more breakpoint-based font size changes.</li>
          <li><strong>Add container queries</strong> for components that need to adapt to their context.</li>
          <li><strong>Use Tailwind CSS breakpoints</strong> for the remaining edge cases where you truly need viewport-based changes.</li>
          <li><strong>Test at every size</strong> from 320px up, including landscape orientation.</li>
          <li><strong>Optimize images and lazy load</strong> content below the fold for mobile performance.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Bottom Line
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Responsive design in 2026 is less about writing media queries and more about building layouts that are inherently flexible. CSS Grid with auto-fill handles most responsive grids with zero breakpoints. Container queries let your UI components adapt to their context, not just the viewport. The <code>clamp()</code> function gives you smooth, fluid typography and spacing. And Tailwind CSS ties it all together with a developer experience that&apos;s hard to beat.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The web is viewed on more screen sizes than ever. Phones, tablets, laptops, desktops, TVs, car dashboards. You can&apos;t write a breakpoint for every one of them. But you can write CSS that adapts to all of them naturally. That&apos;s the real power of modern responsive design.
      </p>
    </div>
  ),
};

export default blogPost;
