export const FAQS_PART_A: Record<string, { question: string; answer: string }[]> = {
  "scalable-design-system": [
    {
      question: "How do you structure a design system that scales?",
      answer:
        "Layer it. A scalable design system has four layers built on each other: tokens (raw color, spacing, radius, type), primitives (button, input, card that read those tokens), patterns (login forms, headers, tables composed from primitives), and docs on top. Each layer depends only on the ones beneath it.",
    },
    {
      question: "How should you govern a design system without slowing the team down?",
      answer:
        "Govern it in the pull request, not in committees. A new component merges only if it passes a review checklist: no existing primitive covers it, it uses tokens, it's keyboard-accessible, and it's documented. A CI rule that fails the build on any raw hex or px value outside the token file catches most rot.",
    },
    {
      question: "Where should you start when building a design system?",
      answer:
        "Start small: define about ten tokens and one button this week, then ship them. Add a primitive only when a screen needs it, a pattern only when two screens repeat the same shape, and a doc the moment someone asks how something works. The system earns each layer instead of guessing all four up front.",
    },
  ],
  "design-tokens-single-source": [
    {
      question: "What are design tokens and why do you need them?",
      answer:
        "Design tokens give every visual decision one name, defined once and used everywhere, creating a shared language for colors, spacing, and fonts between designers and developers. They prevent codebases from accumulating forty ad-hoc grays, because there's always a named value to reach for instead of a hardcoded hex.",
    },
    {
      question: "How should you name design tokens?",
      answer:
        "Name tokens by purpose, not appearance. A token called --color-blue-500 lies the day you rebrand to purple, but --primary keeps meaning whatever primary is today. The four semantic tokens to reach for first are background, foreground, border, and primary, so a component using bg-primary never needs to know the underlying value.",
    },
    {
      question: "How do you connect design tokens to Tailwind CSS?",
      answer:
        "Define token values as CSS variables in :root, then point your Tailwind theme at them using @theme inline so utilities like bg-primary and border-border resolve through the whole chain. You can then switch themes by reassigning the CSS variables at runtime, with no rebuild or component edits.",
    },
  ],
  "design-systems-engineers-love": [
    {
      question: "Why do engineers avoid using design systems?",
      answer:
        "Engineers avoid design systems that feel like black boxes they can't change. A package you npm install forces you to file an issue and wait, or fork and eat the maintenance, whenever a component doesn't fit. Adoption comes from ownership, not enforcement, so give engineers editable source they can read and change.",
    },
    {
      question: "How do you build a React component library engineers actually adopt?",
      answer:
        "Ship components as copy-paste source that lands in components/ui, type every prop with real unions like variant: 'default' | 'ghost' | 'destructive', and leave escape hatches such as a className passthrough and an asChild prop. Engineers adopt a library when using it beats rolling their own, not when it's mandated.",
    },
  ],
  "storybook-design-systems": [
    {
      question: "What is Storybook used for in a design system?",
      answer:
        "Storybook is a development environment where you build each component on a clean bench with every state one click away. Beyond a viewer, a story is the component's contract: list out default, loading, disabled, error, and long-label stories and you've specified the component, making the stories the definition of done.",
    },
    {
      question: "How do you test component behavior in Storybook?",
      answer:
        "Use Storybook's play function, which drives the component after it mounts, for example clicking a trigger and asserting a dialog opens, using the story itself as the fixture. Wire it into CI and every story doubles as an interaction test, so one artifact serves as spec, live demo, and regression test.",
    },
    {
      question: "How can designers review components before they ship?",
      answer:
        "Publish the built Storybook on every pull request through Chromatic or a static deploy, so reviewers open a URL and see the actual component states. Designers then catch problems like a wrong hover color in review instead of production, and the story you wrote to build the component becomes what the team signs off on.",
    },
  ],
  "component-api-design": [
    {
      question: "What makes a good component API?",
      answer:
        "A good component API favors composition over configuration: instead of piling props like headerTitle and showFooter onto one component, expose parts like Card, CardHeader, CardContent, and CardFooter and let people arrange them. This keeps type signatures small and lets callers build layouts you never imagined with plain JSX.",
    },
    {
      question: "How do you keep component props consistent across a library?",
      answer:
        "Pick one vocabulary and use it everywhere: variant for visual style (default, ghost, destructive) and size for scale (sm, default, lg). When Button, Badge, and Alert all take the same variant names, people guess right the first time and stop reading prop tables. Two names, learned once, applied across every component.",
    },
    {
      question: "What are escape hatches in component design?",
      answer:
        "Escape hatches let callers handle cases you didn't predict without forking your source. The two that cover almost everything are a className prop merged via tailwind-merge, so a caller can adjust one edge case, and asChild, which renders your component as its child through Radix Slot, so a Button can become a Next.js Link.",
    },
  ],
  "building-production-component-library": [
    {
      question: "How do you turn a folder of components into a real component library?",
      answer:
        "Move the components into one versioned package, for example @acme/ui, with a build step and an exports map, managed in a monorepo with pnpm or Turborepo. Consumers then install a version instead of copying files, which eliminates the whole class of works-in-app-A-breaks-in-app-B bugs caused by drifting copies.",
    },
    {
      question: "How should you version a component library?",
      answer:
        "Treat every exposed prop as a contract and follow semver, since even renaming a ghost variant to subtle is a breaking change when nothing on screen looks different. Let Changesets track versions and generate a changelog, so downstream teams can plan a major upgrade instead of dreading one.",
    },
    {
      question: "What separates a production component library from a repo of components?",
      answer:
        "The unglamorous plumbing: visual regression tests so a shadow tweak can't silently break screens, an automated accessibility check running in CI on every pull request, a published changelog with a deprecated path for retired props, and one peerDependencies range for React rather than a bundled copy. Each component also needs a docs page.",
    },
  ],
  "shadcn-customization-guide": [
    {
      question: "How do you customize shadcn/ui components?",
      answer:
        "Follow an order: re-theme with CSS variables in globals.css, extend styles by adding a key to the component's cva call, wrap the primitive for app-specific behavior, and fork only as a last resort. shadcn is source code in your repo, so you customize by changing the right layer rather than fighting updates.",
    },
    {
      question: "How do you re-theme shadcn/ui without editing every component?",
      answer:
        "Open globals.css and change the CSS variables shadcn wires every color and radius to. The four tokens worth setting first are --background, --foreground, --primary, and --radius; change those and every button, card, and input updates at once. Because they're custom properties, you can even swap them per tenant at runtime.",
    },
    {
      question: "When should you add a variant versus fork a shadcn component?",
      answer:
        "Add a variant by adding a key to the component's cva call, which TypeScript infers as a new prop with zero new files. Fork only when you're fighting the structure itself, such as a different root element or accessibility wiring the primitive doesn't expose. For app-specific behavior, wrap the primitive instead of editing it.",
    },
  ],
  "spectrum-ui-development-speed": [
    {
      question: "What is Spectrum UI and how does it speed up development?",
      answer:
        "Spectrum UI is a set of 44 React components built on Tailwind and shadcn primitives, including dialogs, comboboxes, and data tables. You copy the source into your project via the shadcn CLI instead of installing a package, so a feature that used to cost a day of primitive-wrangling starts from working, accessible parts you own.",
    },
    {
      question: "How do you install Spectrum UI components?",
      answer:
        "Point the shadcn CLI at Spectrum UI's registry and run npx shadcn add with the component you want; its source is written straight into components/ui, fully editable. There's no package in node_modules and no wrapper API to learn, and upgrades work the same way you already know from shadcn.",
    },
    {
      question: "How does Spectrum UI keep design consistent?",
      answer:
        "Every Spectrum UI component reads from the same CSS variables, so consistency is the default rather than a review comment. Set --primary once and all 44 components match; change the radius token and every corner in the app rounds together, so the components can't drift apart because they point at the same values.",
    },
  ],
  "tailwind-tips-tricks": [
    {
      question: "What's the best way to space elements in Tailwind CSS?",
      answer:
        "Wrap siblings in a flex or grid container and set gap-4 rather than putting a margin on each child. Margins collapse, leak past edges, and force :last-child resets, while gap owns only the space between items and keeps outer edges clean, removing most spacing bugs in a typical list.",
    },
    {
      question: "How do you style a child element when its parent is hovered in Tailwind?",
      answer:
        "Add the group class to the parent and group-hover: to the child; peer is the sibling version, behind custom checkboxes with peer-checked:. This keeps the state in your markup and skips a useState just to drive hover styling. When nesting, name the groups, like group/row and group-hover/row:.",
    },
    {
      question: "How can Tailwind react to a component's state like an open dropdown?",
      answer:
        "Read the data attributes that Radix and shadcn components expose, using variants like data-[state=open]:rotate-180 to flip a chevron the moment a dropdown opens. No effect, ref, or manual class toggling is needed; the same syntax reads data-[side=top]: and data-[disabled]:, covering most of Radix.",
    },
  ],
  "tailwind-css-v4-migration-guide": [
    {
      question: "What changed in Tailwind CSS v4?",
      answer:
        "Tailwind CSS v4 moves configuration out of JavaScript and into CSS: tailwind.config.js is gone and you define your theme in an @theme block, where every token becomes a real CSS variable. There's also no content array to maintain, since v4 scans template files automatically, which is part of why builds are faster.",
    },
    {
      question: "How do I migrate a project to Tailwind CSS v4?",
      answer:
        "Work on a fresh branch and run the official codemod, npx @tailwindcss/upgrade, then read every line of the diff. First upgrade to Node 20+ and set a modern browser target, run the upgrade, move theme.extend values into an @theme block, and delete tailwind.config.js once nothing imports it.",
    },
    {
      question: "What breaks when upgrading to Tailwind CSS v4, and when should you wait?",
      answer:
        "The renames break builds: shadow-sm becomes shadow-xs, outline-none becomes outline-hidden, the @tailwind directives are replaced by a single import, and the PostCSS plugin moved to @tailwindcss/postcss. Wait if a critical plugin lacks a v4 build or you support older browsers, since v4 assumes Safari 16.4+, Chrome 111+, and Firefox 128+.",
    },
  ],
  "css-grid-layouts": [
    {
      question: "How do you build a responsive card grid in CSS without media queries?",
      answer:
        "Use grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) with a gap. auto-fit packs in as many columns as fit, and minmax(240px, 1fr) makes each column at least 240px wide while growing to share leftover space, so cards reflow on their own as the window resizes. One rule replaces three breakpoints.",
    },
    {
      question: "When should you use CSS Grid versus Flexbox?",
      answer:
        "Use grid when placing items into a defined two-dimensional structure where rows and columns line up, and flex when distributing items along a single line where content decides the size, like wrapping tags or a toolbar. Most real pages use both: grid for the page skeleton and flex inside the pieces.",
    },
    {
      question: "How do you align card internals across a row with CSS Grid?",
      answer:
        "Use subgrid: set grid-template-rows: subgrid on each card and span the rows it should share, so the card inherits the parent grid's rows and titles, bodies, and footers align across the whole row. Without it, buttons don't line up because every card sizes itself independently. Subgrid is in every modern browser now.",
    },
  ],
  "responsive-design-modern-css": [
    {
      question: "How do you make font sizes responsive without media queries?",
      answer:
        "Use the CSS clamp() function, for example font-size: clamp(1.75rem, 1rem + 3vw, 3rem). The middle value scales with the viewport while the outer two set a minimum and maximum, so text never gets tiny on phones or absurd on monitors, in one line with no breakpoints. It works for spacing too.",
    },
    {
      question: "What are container queries and when should you use them?",
      answer:
        "Container queries let a component respond to its own container's width rather than the viewport, so the same card lays out wide in a main column and stacked in a sidebar. Set container-type: inline-size on the parent, then style children with @container (min-width: 400px). It changes how you build components.",
    },
    {
      question: "How can you reduce the number of breakpoints in a responsive layout?",
      answer:
        "Start with fluid values and container queries and reach for a breakpoint only when the layout genuinely needs to change, not just resize. Many media queries only nudge a font size, which clamp() handles, or add columns, which repeat(auto-fit, minmax(...)) and flex-wrap: wrap handle intrinsically without arbitrary widths.",
    },
  ],
};
