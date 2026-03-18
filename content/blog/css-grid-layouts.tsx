import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'CSS Grid Layouts You Will Use on Every Project',
  excerpt:
    "Stop Googling CSS Grid every time. Here are the grid patterns that solve 90% of layout problems, with copy-paste code.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 2, 2026',
  readTime: '15 min read',
  icon: '📐',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Grid Patterns You&apos;ll Actually Use
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let&apos;s be honest for a second. How many times have you Googled &quot;CSS Grid template columns&quot;
        this month? If you&apos;re like most frontend developers, the answer is &quot;too many.&quot; CSS Grid
        is incredibly powerful, but most of us only need a handful of patterns for our day-to-day web development
        work. The problem is that Grid has so many features that it can feel overwhelming. You read the MDN docs,
        see terms like &quot;implicit grid tracks&quot; and &quot;grid-template-areas,&quot; and your brain just
        checks out. But here&apos;s the thing: you don&apos;t need to master every single Grid property to be
        productive. You need the same six or seven patterns, and you need to know them well enough that you
        can reach for them without thinking.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In this post, I&apos;m going to walk you through the CSS Grid layouts that I use on literally every
        project. Whether I&apos;m building a dashboard in Next.js, laying out a marketing page with Tailwind CSS,
        or putting together a design system, these are the patterns that come up again and again. Each one
        includes copy-paste-ready code so you can drop them straight into your React components.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌────────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│  Layout Problem     │────▶│  Pick a Grid Pattern  │────▶│  Copy & Paste Code │
│  (cards, sidebar,   │     │  (auto-fit, holy      │     │  (Tailwind classes  │
│   dashboard, etc.)  │     │   grail, form grid)   │     │   ready to go)     │
└────────────────────┘     └──────────────────────┘     └────────────────────┘
                                     │
                                     ▼
                           ┌──────────────────────┐
                           │  Customize for Your   │
                           │  Specific Breakpoints │
                           │  and Spacing Needs    │
                           └──────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        1. Auto-Fit Card Grid
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is probably the most commonly needed layout in all of frontend development. You have a bunch of
        cards and you want them to fill the available space, wrapping automatically as the screen gets smaller.
        No media queries. No breakpoint math. Just cards that figure out their own arrangement. The secret
        sauce here is the combination of <code>auto-fill</code> (or <code>auto-fit</code>) with
        the <code>minmax()</code> function. You tell CSS Grid the minimum and maximum size for each column,
        and it figures out how many columns fit in the available space. When the container gets narrower, it
        automatically drops columns and wraps. It&apos;s honestly magical.
      </p>

      <CodeBlock
        filename="auto-grid.tsx"
        language="tsx"
        code={`// Auto-wrapping card grid - the most useful pattern
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Tailwind shorthand for common breakpoints:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// auto-fill vs auto-fit:
// auto-fill: creates empty tracks if there's extra space
// auto-fit: collapses empty tracks, stretching items to fill
// For most card grids, auto-fill is what you want`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        When to Use auto-fill vs Breakpoint Columns
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>auto-fill</code> approach is great when you want a truly fluid layout. Cards will fill
        whatever space is available, and you don&apos;t have to think about breakpoints at all. But sometimes
        you want more control. Maybe you specifically want two columns on tablet and three on desktop, regardless
        of the container width. In that case, the breakpoint approach (<code>sm:grid-cols-2 lg:grid-cols-3</code>)
        gives you that precision. In my experience, I use the breakpoint approach about 70% of the time because
        designers usually have a specific layout in mind for each screen size.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Handling Different Card Heights
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One gotcha with card grids: if your cards have varying heights, the grid rows will stretch to fit
        the tallest card in each row. This is usually fine, but if it bothers you, you can
        use <code>grid-auto-rows: min-content</code> or consider a masonry layout. For most UI components
        in a design system, keeping cards the same height actually looks cleaner anyway.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        2. Sidebar Layout
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Almost every web application has a sidebar. Email clients, dashboards, admin panels, documentation sites.
        The sidebar layout is one of those patterns you&apos;ll build over and over in your frontend development
        career. The key insight with CSS Grid is that you can have a fixed-width sidebar and a flexible main
        content area in one line of code. No absolute positioning. No calc() hacks. Just a simple grid template
        that does exactly what you want.
      </p>

      <CodeBlock
        filename="sidebar.tsx"
        language="tsx"
        code={`// Fixed sidebar + flexible main content
<div className="grid grid-cols-[260px_1fr] min-h-screen">
  <aside className="border-r p-4">
    <nav>Sidebar navigation</nav>
  </aside>
  <main className="p-6">
    Main content fills the rest
  </main>
</div>

// Collapsible sidebar with smooth transition
<div className={cn(
  "grid min-h-screen transition-all duration-300",
  collapsed ? "grid-cols-[64px_1fr]" : "grid-cols-[260px_1fr]"
)}>
  <aside>...</aside>
  <main>...</main>
</div>

// Responsive: sidebar becomes top nav on mobile
<div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen">
  <aside className="md:border-r border-b md:border-b-0 p-4">
    Navigation
  </aside>
  <main className="p-6">Content</main>
</div>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Making the Sidebar Collapsible
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The collapsible sidebar pattern is really clean with CSS Grid and Tailwind CSS. You just toggle between
        two grid-template-columns values. The <code>transition-all duration-300</code> handles the animation
        smoothly. Inside the sidebar component, you&apos;d conditionally show icon-only navigation when collapsed
        and full labels when expanded. This is one of those React component patterns that every design system
        needs, and CSS Grid makes the layout part trivially easy.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Dealing with Sidebar Overflow
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A common issue with sidebar layouts is content overflow. If your sidebar has a long navigation list,
        you want it to scroll independently from the main content. Add <code>overflow-y-auto</code> to the
        sidebar and <code>h-screen sticky top-0</code> to keep it fixed while the main content scrolls. This
        gives you the classic app layout that users expect from modern web applications.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        3. Holy Grail Layout
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The &quot;Holy Grail&quot; layout has been a classic web development challenge since the early days
        of CSS. Header at the top, footer at the bottom, main content that stretches to fill the remaining
        space. For years, developers used all sorts of hacks to achieve this: negative margins, calc() with
        viewport units, flexbox tricks. With CSS Grid, it&apos;s literally one property. The
        pattern <code>grid-rows-[auto_1fr_auto]</code> says: first row is as tall as its content, middle row
        takes all remaining space, last row is as tall as its content. That&apos;s it.
      </p>

      <CodeBlock
        filename="holy-grail.tsx"
        language="tsx"
        code={`// Header, main content, footer. Main stretches to fill.
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
  <header className="border-b p-4">Header</header>
  <main className="p-6">
    Content fills available space
  </main>
  <footer className="border-t p-4">Footer</footer>
</div>

// Full holy grail with sidebar
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
  <header className="border-b p-4 col-span-full">
    Global header
  </header>
  <div className="grid grid-cols-[260px_1fr]">
    <aside className="border-r p-4">Sidebar</aside>
    <main className="p-6">Main content</main>
  </div>
  <footer className="border-t p-4 col-span-full">
    Global footer
  </footer>
</div>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why min-h-screen Matters
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Without <code>min-h-screen</code>, the grid container will only be as tall as its content. That means
        on pages with very little content, the footer won&apos;t stick to the bottom of the viewport. It&apos;ll
        be floating somewhere in the middle of the page, which looks terrible. The <code>min-h-screen</code> class
        ensures the grid is at least as tall as the viewport, pushing the footer to the bottom even on
        short-content pages. This is a tiny detail that makes a huge difference in how professional your
        Next.js application looks.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        4. Dashboard Grid
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Dashboards are where CSS Grid really shines. You typically have stat cards at the top, a big chart
        in the middle, and some tables or lists at the bottom. The different sections need different column
        configurations, and Grid handles this beautifully. You can mix and match column counts, span items
        across multiple columns, and create asymmetric layouts that would be a nightmare with Flexbox alone.
      </p>

      <CodeBlock
        filename="dashboard.tsx"
        language="tsx"
        code={`// Stats cards + wide chart + table
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatsCard title="Revenue" value="$45,231" />
  <StatsCard title="Users" value="2,350" />
  <StatsCard title="Orders" value="1,234" />
  <StatsCard title="Growth" value="+12%" />
</div>

{/* Chart spans full width */}
<div className="mt-4">
  <RevenueChart />
</div>

{/* Two-column section with weighted split */}
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
  <div className="lg:col-span-4">
    <RecentOrders />
  </div>
  <div className="lg:col-span-3">
    <TopProducts />
  </div>
</div>

{/* Three equal sections */}
<div className="grid gap-4 md:grid-cols-3 mt-4">
  <ActivityFeed />
  <NotificationsList />
  <QuickActions />
</div>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The 7-Column Trick
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Notice that weird <code>lg:grid-cols-7</code> in the dashboard example? That&apos;s a trick for creating
        non-50/50 splits. With 7 columns, you can do a 4/3 split, which looks much more intentional than a
        boring 50/50. You could also use <code>grid-cols-12</code> for a traditional 12-column grid system, but
        I find that most dashboard layouts only need 2, 3, 4, or 7 columns. Keep it simple. The 7-column trick
        is particularly useful in design systems where you want to give more space to primary content without
        making the secondary content feel cramped.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Making Dashboards Responsive
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The beautiful thing about this pattern is how easily it goes responsive. On mobile, everything stacks
        into a single column. On tablet, you get two columns. On desktop, you get the full multi-column layout.
        All with just Tailwind CSS utility classes. No custom CSS, no media query objects, no separate mobile
        components. This is why Tailwind CSS and CSS Grid work so well together for modern web development.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Dashboard Layout Hierarchy
═══════════════════════════

┌─────────┬─────────┬─────────┬─────────┐
│  Stat 1 │  Stat 2 │  Stat 3 │  Stat 4 │   ◀── 4 equal columns
├─────────┴─────────┴─────────┴─────────┤
│              Revenue Chart             │   ◀── Full width
├──────────────────────┬────────────────┤
│    Recent Orders     │  Top Products  │   ◀── 4/3 weighted split
│    (col-span-4)      │  (col-span-3)  │
├──────────┬───────────┬────────────────┤
│  Feed    │  Alerts   │  Quick Actions │   ◀── 3 equal columns
└──────────┴───────────┴────────────────┘

Mobile: Everything stacks to 1 column
Tablet: 2 columns for stats, 1 for rest
Desktop: Full layout as shown above`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        5. Centered Content
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Centering things in CSS has been a running joke in the web development community for years. But with
        Grid, it&apos;s genuinely trivial. The <code>place-items-center</code> utility is the shortest path
        to perfect centering, both horizontally and vertically. I use this for login pages, empty states, error
        pages, loading screens, and any other situation where you want content dead center in its container.
      </p>

      <CodeBlock
        filename="centered.tsx"
        language="tsx"
        code={`// Center anything vertically and horizontally
<div className="grid place-items-center min-h-screen">
  <div className="w-full max-w-md p-6">
    <LoginForm />
  </div>
</div>

// Also works for empty states:
<div className="grid place-items-center h-64">
  <div className="text-center">
    <InboxIcon className="mx-auto h-12 w-12 text-muted-foreground" />
    <p className="mt-2 text-muted-foreground">No messages yet</p>
  </div>
</div>

// Error page centered on screen
<div className="grid place-items-center min-h-[80vh]">
  <div className="text-center space-y-4">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-muted-foreground">Page not found</p>
    <Button asChild>
      <Link href="/">Go home</Link>
    </Button>
  </div>
</div>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        place-items vs place-content
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Quick clarification because this trips people up. <code>place-items-center</code> centers each item
        within its grid cell. <code>place-content-center</code> centers the entire grid content as a group.
        For most centering use cases, <code>place-items-center</code> is what you want. But if you have multiple
        items and want them clustered together in the center, <code>place-content-center</code> is your friend.
        Both are equally valid approaches in modern CSS layout, and both work perfectly with Tailwind CSS.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        6. Form Layout
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Forms are everywhere in web applications, and getting the layout right is crucial for usability. A
        two-column form grid with the ability to have some fields span both columns is one of the most practical
        CSS Grid patterns. It gives you a clean, organized layout on desktop while stacking gracefully on mobile.
        The key is the <code>col-span-2</code> utility for fields that need the full width, like email addresses
        or text areas.
      </p>

      <CodeBlock
        filename="form-grid.tsx"
        language="tsx"
        code={`// Two-column form with full-width fields
<form className="grid gap-4 sm:grid-cols-2">
  <div className="space-y-2">
    <Label>First name</Label>
    <Input />
  </div>
  <div className="space-y-2">
    <Label>Last name</Label>
    <Input />
  </div>
  {/* Full width field spans both columns */}
  <div className="space-y-2 sm:col-span-2">
    <Label>Email</Label>
    <Input type="email" />
  </div>
  <div className="space-y-2 sm:col-span-2">
    <Label>Message</Label>
    <Textarea />
  </div>
  <Button className="sm:col-span-2">Submit</Button>
</form>

// Settings form with sections
<form className="space-y-8">
  <fieldset className="grid gap-4 sm:grid-cols-2">
    <legend className="text-lg font-semibold sm:col-span-2 mb-2">
      Profile
    </legend>
    <Input placeholder="First name" />
    <Input placeholder="Last name" />
    <Input placeholder="Email" className="sm:col-span-2" />
  </fieldset>

  <fieldset className="grid gap-4 sm:grid-cols-2">
    <legend className="text-lg font-semibold sm:col-span-2 mb-2">
      Address
    </legend>
    <Input placeholder="Street" className="sm:col-span-2" />
    <Input placeholder="City" />
    <Input placeholder="State" />
    <Input placeholder="ZIP" />
    <Input placeholder="Country" />
  </fieldset>
</form>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Fieldset Grouping for Better Accessibility
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Wrapping related form fields in <code>fieldset</code> elements with <code>legend</code> labels is
        not just about organization. It&apos;s an accessibility requirement. Screen readers use fieldset/legend
        to group related inputs and announce the group name before each field. This is a perfect example of
        how CSS Grid layout and HTML semantics work together to create better UI components. Your forms will
        look better and be more accessible at the same time.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        7. Content + Aside Layout
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Blog posts, documentation pages, and long-form content often need a main content area with a sticky
        sidebar for navigation or related content. This is different from the app sidebar layout because the
        sidebar content needs to be sticky as the main content scrolls. CSS Grid handles the layout, and a
        touch of sticky positioning handles the scroll behavior.
      </p>

      <CodeBlock
        filename="content-aside.tsx"
        language="tsx"
        code={`// Blog/docs layout with sticky table of contents
<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 max-w-6xl mx-auto">
  <article className="prose dark:prose-invert max-w-none">
    <h1>Article title</h1>
    <p>Article content goes here...</p>
  </article>
  <aside className="hidden lg:block">
    <div className="sticky top-20 space-y-4">
      <h4 className="font-semibold">On this page</h4>
      <TableOfContents />
    </div>
  </aside>
</div>

// Flipped: aside on the left (docs pattern)
<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-8">
  <nav className="hidden lg:block">
    <div className="sticky top-20">
      <DocsSidebar />
    </div>
  </nav>
  <main>Content</main>
  <aside className="hidden lg:block">
    <div className="sticky top-20">
      <TableOfContents />
    </div>
  </aside>
</div>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Grid vs Flexbox: When to Use Which
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is the question that every frontend developer asks at some point, and the answer is simpler
        than you think. It&apos;s not about which one is &quot;better.&quot; They solve different problems, and
        the best React component patterns use both. Here&apos;s my mental model after years of building
        UI components with both.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">The Decision Framework</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Grid:</strong> When you need rows AND columns. Dashboards, page layouts, card grids, form layouts.</li>
          <li><strong>Flexbox:</strong> When you need one direction. Nav bars, button groups, centering, inline elements.</li>
          <li><strong>Both:</strong> Grid for the page layout, Flexbox inside individual components. This is the most common pattern.</li>
          <li><strong>Flexbox wrap:</strong> When items can be different sizes. Tag lists, chip groups, toolbar buttons.</li>
          <li><strong>Grid auto-fill:</strong> When items should be the same size. Card grids, image galleries, product listings.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        A Real-World Example: Navigation Bar
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Consider a typical navigation bar. You have a logo on the left, nav links in the middle, and user
        actions on the right. You might think Grid is the answer because you have three distinct areas. But
        Flexbox is actually better here because the middle section has a variable number of items that need to
        be evenly spaced. Flexbox&apos;s <code>justify-between</code> handles this perfectly. On the other
        hand, the page layout that contains that nav bar is a Grid job. The nav goes in the header row,
        the content goes in the main row, and the footer goes at the bottom. It&apos;s Grid and Flexbox
        working together.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Advanced Grid Techniques
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Once you&apos;re comfortable with the basic patterns, here are some advanced techniques that can
        save you a lot of time in your web development projects.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Subgrid for Aligned Content
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Subgrid lets child elements align with the parent grid&apos;s tracks. This is incredibly useful for
        card grids where you want the title, description, and action button of each card to align across the
        row, regardless of content length. Browser support is now excellent. If you&apos;re building a design
        system with React and Tailwind CSS, subgrid is a game changer for consistent card layouts.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Named Grid Areas
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For complex layouts, named grid areas can make your code much more readable. Instead of counting
        column spans, you give each area a name and draw the layout visually with strings. While Tailwind CSS
        doesn&apos;t have built-in utilities for this, you can use arbitrary values or add them to your
        Tailwind config. This is especially helpful for layouts that change dramatically between mobile
        and desktop breakpoints.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Container Queries and Grid
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Container queries are changing how we think about responsive design in modern CSS. Instead of responding
        to the viewport width, components can respond to their own container&apos;s width. This pairs beautifully
        with CSS Grid. Imagine a card component that switches from horizontal to vertical layout based on how
        much space it has in the grid, regardless of the screen size. Tailwind CSS now supports container
        queries, and they&apos;re a perfect complement to Grid-based layouts.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Pitfalls and How to Avoid Them
      </h2>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The Overflow Problem
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Grid items with long text or wide images can overflow their grid cells, breaking the layout. Always
        add <code>min-w-0</code> to grid items that contain text content. Without it, the minimum width of
        a grid item defaults to <code>auto</code>, which means it can push the grid wider than intended.
        This is probably the most common CSS Grid bug in React applications, and the fix is always the same:
        add <code>min-w-0</code> or <code>overflow-hidden</code>.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Gap Inconsistency
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use a consistent gap scale across your entire design system. If your card grid uses <code>gap-6</code>,
        your dashboard grid should probably use the same. Mixing <code>gap-2</code>, <code>gap-4</code>,
        and <code>gap-8</code> randomly makes the UI feel unpolished. Pick two or three gap values and stick
        with them. Your Tailwind CSS config can enforce this with a custom spacing scale.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Pro Tip: Debug with Borders
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When a Grid layout isn&apos;t behaving as expected, add <code>border border-red-500</code> to each
        grid item temporarily. This makes the grid structure visible and helps you see exactly where items
        are being placed. Chrome DevTools also has a grid overlay tool that shows grid lines, but sometimes
        a quick border is faster for debugging during frontend development.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><code>auto-fill</code> + <code>minmax</code> = responsive cards without breakpoints</li>
          <li><code>grid-cols-[fixed_1fr]</code> = sidebar layout</li>
          <li><code>grid-rows-[auto_1fr_auto]</code> = header/content/footer</li>
          <li><code>place-items-center</code> = center anything</li>
          <li><code>col-span-2</code> = full-width fields in a form grid</li>
          <li>Grid for 2D layouts, Flexbox for 1D layouts, both together for real apps</li>
          <li>Always add <code>min-w-0</code> to grid items with text content</li>
          <li>Use a consistent gap scale across your design system</li>
          <li>Container queries + Grid = the future of responsive UI components</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CSS Grid has fundamentally changed how we build layouts for the web. The patterns in this post cover
        the vast majority of what you&apos;ll need for real-world frontend development with React, Next.js,
        and Tailwind CSS. Bookmark this page, steal the code snippets, and stop Googling CSS Grid template
        columns. You&apos;ve got this.
      </p>
    </div>
  ),
};

export default blogPost;
