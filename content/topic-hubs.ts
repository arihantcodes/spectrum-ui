import componentCatalog from '@/content/component-catalog.json';
import { TOPIC_HUB_LINKS, type TopicHubSlug, topicHubPath } from '@/lib/topic-hub-links';

export interface TopicHubUseCase {
  title: string;
  description: string;
}

export interface TopicHubGuideLink {
  title: string;
  description: string;
  href: string;
}

export interface TopicHubFAQ {
  question: string;
  answer: string;
}

export interface TopicHubCodeExample {
  title: string;
  description: string;
  installCommands: readonly string[];
  code: string;
}

export interface TopicHub {
  slug: TopicHubSlug;
  label: string;
  metadataTitle: string;
  title: string;
  description: string;
  keywords: readonly string[];
  intro: readonly [string, string];
  definition: readonly [string, string];
  whenToUse: readonly TopicHubUseCase[];
  componentSlugs: readonly string[];
  codeExample: TopicHubCodeExample;
  guideLinks: readonly TopicHubGuideLink[];
  relatedSlugs: readonly TopicHubSlug[];
  faqs: readonly TopicHubFAQ[];
}

export const TOPIC_HUBS: readonly TopicHub[] = [
  {
    slug: 'react-component-library',
    label: 'React Component Library',
    metadataTitle: 'React Component Library Guide',
    title: 'Open-source React component library with copy-paste source',
    description:
      'Learn how a copy-paste React component library works and browse Spectrum UI components for forms, navigation, feedback, data, and layouts.',
    keywords: [
      'React component library',
      'open source React components',
      'copy paste React components',
      'TypeScript components',
      'React UI source code',
    ],
    intro: [
      'A React component library is a reusable set of interface primitives with documented behavior and APIs. This guide explains Spectrum UI’s open-source, copy-paste approach and connects the core components used for forms, navigation, feedback, overlays, and data display.',
      'Instead of adding one runtime package that owns every visual decision, you install or copy individual component source files. The source then lives in your application, where it can follow your TypeScript, styling, accessibility, and release requirements.',
    ],
    definition: [
      'Component libraries reduce repeated interface work by giving teams named, testable building blocks. Useful libraries document installation, dependencies, props, behavior, and accessibility constraints so a component can be evaluated before it enters an application.',
      'Spectrum UI combines local React source with Tailwind CSS and, where the implementation requires it, Motion or shadcn/ui primitives. Each component page identifies the actual technologies and dependencies used by that source rather than assigning one stack to the entire catalog.',
    ],
    whenToUse: [
      {
        title: 'You need reusable interface primitives',
        description:
          'Use components when buttons, inputs, disclosures, status feedback, or overlays repeat across more than one screen.',
      },
      {
        title: 'Your team needs source ownership',
        description:
          'A copy-paste library fits teams that want to review, test, and change component internals inside the application repository.',
      },
      {
        title: 'You are assembling a design system',
        description:
          'Start from documented behavior, then align spacing, color, type, motion, and variants with your product tokens.',
      },
    ],
    componentSlugs: [
      'accordion',
      'alert',
      'button',
      'card',
      'infinite-scroll',
      'progress-with-value',
      'spinner',
    ],
    codeExample: {
      title: 'Compose an accessible product FAQ',
      description:
        'The Accordion installation provides the local primitive used by this minimal React example.',
      installCommands: ['npx shadcn@latest add @spectrumui/accordion'],
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ProductFaq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="billing">
        <AccordionTrigger>Can I change plans later?</AccordionTrigger>
        <AccordionContent>
          Yes. Plan changes can be handled from the billing settings page.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Building a production component library',
        description: 'Plan ownership, documentation, testing, and release boundaries.',
        href: '/blog/building-production-component-library',
      },
      {
        title: 'Component API design',
        description: 'Design props and composition surfaces that remain understandable.',
        href: '/blog/component-api-design',
      },
      {
        title: 'Install Spectrum UI',
        description: 'Initialize shadcn/ui and add the first local source file.',
        href: '/docs/installation',
      },
    ],
    relatedSlugs: ['react-block-library', 'tailwind-component-library', 'nextjs-ui-library'],
    faqs: [
      {
        question: 'What makes Spectrum UI a copy-paste React component library?',
        answer:
          'Its documented components are installed as source files that remain in your project. You can inspect and edit the implementation instead of depending on a closed visual runtime.',
      },
      {
        question: 'Do Spectrum UI React components stay in my repository?',
        answer:
          'Yes. The CLI or manual installation places the relevant source in your application, along with any declared component dependencies.',
      },
      {
        question: 'Can Spectrum UI components be used with React Server Components?',
        answer:
          'Static components can remain server-rendered. Interactive components keep their use client boundary, so place that boundary as low in the tree as the interaction allows.',
      },
      {
        question: 'When should I choose a React component instead of a block?',
        answer:
          'Choose a component for one reusable behavior or primitive. Choose a block when you need several components already composed into a larger interface section.',
      },
    ],
  },
  {
    slug: 'react-block-library',
    label: 'React Block Library',
    metadataTitle: 'React Block Library Guide',
    title: 'React block library for complete interface sections',
    description:
      'Understand React UI blocks and browse editable Spectrum UI compositions for authentication, dashboards, forms, navigation, and marketing pages.',
    keywords: [
      'React block library',
      'React UI blocks',
      'copy paste React sections',
      'dashboard blocks',
      'authentication UI blocks',
    ],
    intro: [
      'A React block library provides larger interface sections assembled from multiple components, such as a login card, calendar, kanban board, or testimonial section. This guide maps Spectrum UI’s composite examples to the application flows they can accelerate.',
      'Blocks are useful starting points, not hidden page builders. Their source remains editable, and product teams still connect authentication, data loading, validation, analytics, and other application behavior.',
    ],
    definition: [
      'A component usually owns one focused interaction or visual primitive. A block combines several primitives with layout and sample content to demonstrate a complete section of a workflow.',
      'Good blocks expose the structure clearly enough to remove, replace, or restyle their parts. Spectrum UI documents the source and dependencies for each composite example so teams can decide whether to adopt the full block or extract only the useful pieces.',
    ],
    whenToUse: [
      {
        title: 'You are prototyping a complete flow',
        description:
          'Start from a login, calendar, feedback, or dashboard composition when validating layout and interaction order.',
      },
      {
        title: 'The same section appears across products',
        description:
          'Blocks give platform teams a reviewable reference for repeated page sections without locking every product to identical content.',
      },
      {
        title: 'You need a concrete integration example',
        description:
          'Use a block to see how primitives are composed before extracting a smaller component API for your design system.',
      },
    ],
    componentSlugs: ['login', 'multistepform', 'kanban', 'animateddrawer', 'feedback'],
    codeExample: {
      title: 'Place the login block on an authentication route',
      description:
        'The installed login card is a client-side UI example; connect its controls to your own authentication service.',
      installCommands: ['npx shadcn@latest add @spectrumui/login-card'],
      code: `import LoginCard from '@/components/spectrumui/logincard';

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <LoginCard />
    </main>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Design systems engineers love',
        description: 'Connect reusable primitives to product-facing compositions.',
        href: '/blog/design-systems-engineers-love',
      },
      {
        title: 'Figma to functional workflow',
        description: 'Move from a visual section to maintainable application code.',
        href: '/blog/figma-to-functional-workflow',
      },
      {
        title: 'Explore all components',
        description: 'Inspect the primitives that can be substituted inside a block.',
        href: '/docs',
      },
    ],
    relatedSlugs: ['react-component-library', 'dashboard-components', 'landing-page-components'],
    faqs: [
      {
        question: 'What is the difference between a React block and a component?',
        answer:
          'A component handles a focused behavior or primitive. A block composes multiple components into a larger section such as authentication, scheduling, or social proof.',
      },
      {
        question: 'Can I remove parts of a Spectrum UI block?',
        answer:
          'Yes. Blocks are delivered as local source, so you can remove sample content, replace primitives, and adapt the layout to your application.',
      },
      {
        question: 'Do Spectrum UI blocks include a backend or data model?',
        answer:
          'No. They are interface source. Connect forms, authentication, persistence, analytics, and data fetching to the services chosen by your application.',
      },
      {
        question: 'Should I install a whole block for one small interaction?',
        answer:
          'Usually not. Inspect the block first, then install or retain only the source and dependencies needed for the interaction you are building.',
      },
    ],
  },
  {
    slug: 'tailwind-component-library',
    label: 'Tailwind Component Library',
    metadataTitle: 'Tailwind Component Library Guide',
    title: 'Tailwind component library with editable React source',
    description:
      'Learn how Spectrum UI uses Tailwind CSS in local React components and browse practical controls, cards, forms, navigation, and status patterns.',
    keywords: [
      'Tailwind component library',
      'Tailwind CSS React components',
      'editable Tailwind components',
      'Tailwind UI source',
      'shadcn Tailwind components',
    ],
    intro: [
      'A Tailwind component library packages reusable interface behavior with utility-class styling that can be inspected beside the JSX. This guide explains how Spectrum UI components use local Tailwind CSS source and where that approach fits forms, cards, navigation, status, and layout work.',
      'Because the utilities live in the copied file, teams can replace spacing, color, typography, breakpoints, and state styles without waiting for a theme API. Component pages identify additional packages or shadcn/ui primitives when the source requires them.',
    ],
    definition: [
      'Tailwind CSS supplies low-level utility classes; a component library supplies repeatable structure, states, and interaction behavior. Combining them makes the styling contract visible at the point where the component renders.',
      'This approach is most useful when a team already has Tailwind tokens and wants to keep component changes inside normal code review. It still requires testing responsive layouts, focus states, contrast, and any class changes introduced by a Tailwind upgrade.',
    ],
    whenToUse: [
      {
        title: 'Your product already uses Tailwind CSS',
        description:
          'Local utilities let the component inherit existing spacing, color, typography, and breakpoint conventions.',
      },
      {
        title: 'You want styling changes in code review',
        description:
          'Utility changes remain beside the JSX, making the visual diff and affected states easier to inspect together.',
      },
      {
        title: 'A fixed theme API is too limiting',
        description:
          'Edit the source directly when a component needs structural changes beyond colors or variant names.',
      },
    ],
    componentSlugs: [
      'button',
      'card',
      'status-badge',
      'floating-label-input',
      'dual-range-slider',
      'accordion',
      'profile',
      'quantity-stepper',
      'task-checkbox',
      'loading-button',
    ],
    codeExample: {
      title: 'Adapt a button with local Tailwind utilities',
      description:
        'The shadcn/ui button remains composable while route-specific spacing and focus treatment stay at the call site.',
      installCommands: ['npx shadcn@latest add button'],
      code: `import { Button } from '@/components/ui/button';

export function SaveActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button className="rounded-full px-5">Save changes</Button>
      <Button variant="outline" className="rounded-full">
        Cancel
      </Button>
    </div>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Tailwind CSS v4 migration guide',
        description: 'Review utilities, configuration, and migration boundaries before upgrading.',
        href: '/blog/tailwind-css-v4-migration-guide',
      },
      {
        title: 'Tailwind tips and tricks',
        description: 'Apply utility patterns without obscuring component intent.',
        href: '/blog/tailwind-tips-tricks',
      },
      {
        title: 'shadcn/ui customization guide',
        description: 'Understand how local primitives and Tailwind tokens work together.',
        href: '/blog/shadcn-customization-guide',
      },
    ],
    relatedSlugs: ['react-component-library', 'nextjs-ui-library', 'motion-components'],
    faqs: [
      {
        question: 'Does Spectrum UI ship compiled CSS for its Tailwind components?',
        answer:
          'The documented components expose their source and Tailwind utility classes. Install any declared global styles or dependencies shown by the specific component.',
      },
      {
        question: 'Can Spectrum UI components use my Tailwind design tokens?',
        answer:
          'Yes. Replace or extend the copied utility classes so spacing, colors, type, radii, and breakpoints align with your project configuration.',
      },
      {
        question: 'Are all Spectrum UI components tied to one Tailwind version?',
        answer:
          'Use the source against the project setup documented by the repository, and review utility or configuration changes when upgrading Tailwind in your application.',
      },
      {
        question: 'Does every Tailwind component require shadcn/ui?',
        answer:
          'No. Each component page lists the actual shadcn/ui or Radix dependencies detected for that implementation. Install only what the selected source uses.',
      },
    ],
  },
  {
    slug: 'nextjs-ui-library',
    label: 'Next.js UI Library',
    metadataTitle: 'Next.js UI Library Guide',
    title: 'Next.js UI library for App Router interfaces',
    description:
      'Build Next.js App Router interfaces with editable Spectrum UI React source, clear client boundaries, Tailwind CSS, and documented dependencies.',
    keywords: [
      'Next.js UI library',
      'Next.js App Router components',
      'React Server Components UI',
      'Next.js Tailwind components',
      'copy paste Next.js UI',
    ],
    intro: [
      'A Next.js UI library should work with the App Router’s server-first rendering model while isolating browser interactions in explicit client components. This guide shows how Spectrum UI’s editable React source fits route layouts, navigation, loading states, forms, overlays, and content pages.',
      'Spectrum UI is not a replacement for Next.js routing, data fetching, caching, or image configuration. It supplies interface source that you place within those framework boundaries and connect to application data.',
    ],
    definition: [
      'Next.js App Router pages are Server Components by default. A practical UI library therefore avoids forcing an entire route into the client bundle just because one nested control needs state, gestures, or a browser API.',
      'Spectrum UI component pages expose whether an implementation carries a use client directive and which packages it imports. Keep server-rendered content above that boundary, pass serializable props into interactive leaves, and use Next.js primitives where the route needs framework-aware links or images.',
    ],
    whenToUse: [
      {
        title: 'You are building with the App Router',
        description:
          'Use server-rendered route shells and place interactive Spectrum UI source only where a client boundary is required.',
      },
      {
        title: 'You need framework-aware navigation',
        description:
          'Compose local UI primitives with Next.js Link, route layouts, loading states, and metadata instead of hiding routing inside the component.',
      },
      {
        title: 'You want inspectable dependencies',
        description:
          'Review each component page before installation to see its source paths, client behavior, and declared packages.',
      },
    ],
    componentSlugs: ['imagepreview', 'login', 'card', 'button', 'animateddrawer'],
    codeExample: {
      title: 'Keep a settings route server-rendered',
      description:
        'This App Router page composes local card and button primitives without introducing a page-level client boundary.',
      installCommands: ['npx shadcn@latest add card button'],
      code: `import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/settings/profile">Edit profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Next.js Server Components guide',
        description: 'Separate server-rendered data and content from interactive client leaves.',
        href: '/blog/nextjs-server-components-guide',
      },
      {
        title: 'React 19 Server Actions guide',
        description:
          'Connect forms to server-side mutations without moving the whole page client-side.',
        href: '/blog/react-19-server-actions-guide',
      },
      {
        title: 'Spectrum UI installation',
        description: 'Initialize the project and add components through the registry.',
        href: '/docs/installation',
      },
    ],
    relatedSlugs: ['react-component-library', 'tailwind-component-library', 'ai-ui-components'],
    faqs: [
      {
        question: 'Does Spectrum UI work with the Next.js App Router?',
        answer:
          'Yes. The Spectrum UI documentation site uses the App Router, and component source can be placed inside App Router pages and layouts with the documented client boundaries preserved.',
      },
      {
        question: 'Do Next.js pages need to become client components to use Spectrum UI?',
        answer:
          'No. Keep the page and static composition server-rendered. Only interactive components that use state, effects, gestures, or browser APIs need a use client directive.',
      },
      {
        question: 'Does Spectrum UI configure next/image or remote hosts?',
        answer:
          'No global image policy is applied by the library. Review image-using source and configure sizes, remote hosts, and optimization for your application.',
      },
      {
        question: 'Can the React source be adapted to the Next.js Pages Router?',
        answer:
          'Many components are ordinary React source, but route APIs and server boundaries differ. Adapt any App Router-specific imports or conventions before using them in a Pages Router project.',
      },
    ],
  },
  {
    slug: 'motion-components',
    label: 'Motion Components',
    metadataTitle: 'Motion Components for React',
    title: 'Motion components for stateful React interactions',
    description:
      'Browse Spectrum UI components that actually use Motion for switches, confirmations, reactions, ratings, notifications, and direct manipulation.',
    keywords: [
      'motion components',
      'React motion components',
      'Framer Motion UI',
      'animated React controls',
      'gesture components',
    ],
    intro: [
      'Motion components use animation to explain state changes, direct manipulation, progress, or feedback inside a React interaction. This guide links only Spectrum UI components whose documented source or registry dependencies include Motion, including switches, confirmation controls, reactions, ratings, and notifications.',
      'Animation should support the interaction rather than delay it. Review the spring or tween values in the copied source, preserve keyboard behavior, and add or verify a reduced-motion path before production use.',
    ],
    definition: [
      'A motion component owns both interface state and the visual transition between states. Useful examples include a switch knob following a drag gesture, a hold control showing confirmation progress, or a reaction button acknowledging an action.',
      'Spectrum UI uses Motion only where the implementation calls for it; the technology list on each component page is generated from source and registry evidence. That distinction helps teams avoid adding an animation dependency to components that do not need one.',
    ],
    whenToUse: [
      {
        title: 'State changes need spatial continuity',
        description:
          'Use motion when a control changes shape, position, or progress and the transition clarifies what happened.',
      },
      {
        title: 'The interaction includes a gesture',
        description:
          'Drag, press-and-hold, and swipe interactions benefit from feedback that follows the pointer before committing state.',
      },
      {
        title: 'Feedback must remain compact',
        description:
          'A contained icon, count, or progress transition can acknowledge an action without adding another persistent panel.',
      },
    ],
    componentSlugs: [
      'animated-switch',
      'follow-button',
      'hold-to-confirm',
      'like-button',
      'morph-button',
      'notification-bell',
      'reaction-bar',
      'swipe-to-delete',
      'task-checkbox',
      'undo-pill',
      'face-rating',
      'star-rating',
    ],
    codeExample: {
      title: 'Control an animated preference switch',
      description:
        'The switch exposes a controlled checked state while its installed source owns the drag and transition behavior.',
      installCommands: ['npx shadcn@latest add @spectrumui/animated-switch'],
      code: `'use client';

import { useState } from 'react';
import { AnimatedSwitch } from '@/components/spectrumui/animated-switch';

export function NotificationPreference() {
  const [enabled, setEnabled] = useState(false);

  return (
    <AnimatedSwitch
      checked={enabled}
      onCheckedChange={setEnabled}
      label="Email notifications"
    />
  );
}`,
    },
    guideLinks: [
      {
        title: 'Motion design for engineers',
        description: 'Choose timing, easing, and transition purpose from interaction requirements.',
        href: '/blog/motion-design-for-engineers',
      },
      {
        title: 'Micro-interactions guide',
        description: 'Use feedback and state transitions without adding visual noise.',
        href: '/blog/micro-interactions-guide',
      },
      {
        title: 'Accessibility from day one',
        description: 'Test keyboard operation, focus, announcements, and reduced-motion behavior.',
        href: '/blog/accessibility-day-one',
      },
    ],
    relatedSlugs: ['animation-library', 'react-component-library', 'tailwind-component-library'],
    faqs: [
      {
        question: 'Which Spectrum UI components require Motion?',
        answer:
          'The components on this page were selected because Motion usage was detected in their documented source or registry dependencies. Confirm the exact package on the individual component page.',
      },
      {
        question: 'Do all Spectrum UI motion components handle reduced motion?',
        answer:
          'No universal claim is made. Each component page reports whether a reduced-motion marker was detected and calls out when a production implementation still needs one.',
      },
      {
        question: 'Can I change the spring or duration in a motion component?',
        answer:
          'Yes. The transition configuration is part of the copied source. Retest gestures, focus, interruption, and reduced-motion behavior after changing it.',
      },
      {
        question: 'Can Motion be removed after copying a component?',
        answer:
          'Yes, but the interaction must be rewritten to preserve its state and feedback without the Motion APIs. Removing the import alone is not sufficient for gesture-driven components.',
      },
    ],
  },
  {
    slug: 'animation-library',
    label: 'Animation Library',
    metadataTitle: 'React Animation Library Guide',
    title: 'React animation library for interface transitions',
    description:
      'Explore Spectrum UI animation patterns for charts, cards, drawers, text, navigation, media, testimonials, and responsive page sections.',
    keywords: [
      'React animation library',
      'UI animation components',
      'animated React components',
      'interface transitions',
      'Tailwind animation examples',
    ],
    intro: [
      'A React animation library provides reusable transition patterns for content entry, navigation, data changes, media reveals, and interactive feedback. This guide groups Spectrum UI examples by what the animation communicates rather than treating every moving component as the same interaction.',
      'Some linked components use Motion, while others combine SVG, CSS, pointer input, or Three.js. Check the Technologies and Accessibility sections on each component page before adopting its implementation.',
    ],
    definition: [
      'Interface animation includes more than control-state transitions. It can stage a chart, reveal media, preserve continuity when a drawer opens, explain hierarchy in a bento layout, or direct attention through a testimonial sequence.',
      'The implementation choice should follow the visual property and interaction. Transform and opacity are usually cheaper than layout animation, while canvas or 3D work needs separate performance and input testing. A copied example remains a starting point, not a guarantee for every content size or device.',
    ],
    whenToUse: [
      {
        title: 'A layout change needs context',
        description:
          'Use a transition to preserve continuity when content enters, leaves, expands, or moves between regions.',
      },
      {
        title: 'Data should reveal progressively',
        description:
          'Chart and progress animation can establish reading order when it does not obscure the final values.',
      },
      {
        title: 'A marketing sequence needs pacing',
        description:
          'Text, card, media, and testimonial reveals can establish emphasis when their timing respects reduced-motion preferences.',
      },
    ],
    componentSlugs: [
      'animatedcard',
      'animatedchart',
      'animateddrawer',
      'avatar-stack',
      'scratch-card',
      'tilt-card',
    ],
    codeExample: {
      title: 'Render the animated chart as a client leaf',
      description:
        'The installed chart owns its animation; the surrounding route can remain a Server Component.',
      installCommands: ['npx shadcn@latest add @spectrumui/animated-SVG-chart'],
      code: `import { Chart } from '@/components/spectrumui/animatedemo';

export default function AnalyticsPage() {
  return (
    <section aria-labelledby="revenue-chart">
      <h2 id="revenue-chart">Revenue trend</h2>
      <Chart />
    </section>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Performance UI engineering',
        description: 'Measure rendering, JavaScript, images, and interaction costs together.',
        href: '/blog/performance-ui-engineering',
      },
      {
        title: 'View Transitions API guide',
        description: 'Understand when browser-level navigation transitions fit the problem.',
        href: '/blog/view-transitions-api-guide',
      },
      {
        title: 'Psychology of UI',
        description: 'Connect visual feedback and attention to user expectations.',
        href: '/blog/psychology-of-ui',
      },
    ],
    relatedSlugs: ['motion-components', 'landing-page-components', 'hero-sections'],
    faqs: [
      {
        question: 'How is an animation library different from motion components?',
        answer:
          'Motion components focus on stateful controls and gestures. This broader animation collection also covers content staging, media reveals, charts, navigation, and page-section transitions.',
      },
      {
        question: 'Does every Spectrum UI animation use the same package?',
        answer:
          'No. Implementations vary. The component page lists detected technologies such as Motion, SVG, Three.js-related packages, Tailwind CSS, or local React code.',
      },
      {
        question: 'What should I measure before shipping interface animation?',
        answer:
          'Check main-thread work, layout and paint activity, bundle cost, interruption behavior, input response, and the experience under reduced motion.',
      },
      {
        question: 'Should decorative animation be announced to screen readers?',
        answer:
          'Usually decorative layers should remain hidden from assistive technology, while the meaningful content and control state need semantic text, labels, and announcements.',
      },
    ],
  },
  {
    slug: 'dashboard-components',
    label: 'Dashboard Components',
    metadataTitle: 'React Dashboard Components',
    title: 'React dashboard components for operational interfaces',
    description:
      'Compose React dashboards with Spectrum UI charts, calendars, kanban boards, navigation, status, progress, profile, loading, and task components.',
    keywords: [
      'dashboard components',
      'React admin dashboard UI',
      'SaaS dashboard components',
      'analytics dashboard UI',
      'operations interface components',
    ],
    intro: [
      'Dashboard components organize changing data, tasks, status, navigation, and actions for people operating a product. This guide groups Spectrum UI components for analytics, scheduling, kanban work, progress, notifications, profile access, and loading states in React dashboards and admin panels.',
      'The components provide interface source, not an analytics or data platform. Connect them to typed application data, define loading and error states, and test dense layouts with realistic labels and values.',
    ],
    definition: [
      'A dashboard is an operational surface, so its components must support scanning and action rather than decoration alone. Information hierarchy, status language, data freshness, filters, and responsive behavior are part of the component decision.',
      'Spectrum UI includes both focused primitives and larger examples. Use charts and calendars when the data shape matches, kanban for ordered work states, status and progress for compact feedback, and skeletons only when a predictable layout is genuinely loading.',
    ],
    whenToUse: [
      {
        title: 'Users monitor changing information',
        description:
          'Charts, calendars, notifications, status labels, and progress indicators help establish a readable operational overview.',
      },
      {
        title: 'Users move work through stages',
        description:
          'Kanban, task controls, command navigation, and profile actions support repeated operational workflows.',
      },
      {
        title: 'The interface must work at several densities',
        description:
          'Test linked components with realistic table-adjacent content, narrow viewports, long labels, and loading states.',
      },
    ],
    componentSlugs: [
      'animatedchart',
      'datetime-picker',
      'kanban',
      'status-badge',
      'progress-with-value',
      'notification-bell',
      'profile',
      'task-checkbox',
    ],
    codeExample: {
      title: 'Add a scheduling surface to a dashboard',
      description:
        'The calendar example supplies the UI; load and persist events through your application layer.',
      installCommands: ['npx shadcn@latest add @spectrumui/event-calendar'],
      code: `import EventCalendar from '@/components/spectrumui/event-calendar';

export default function SchedulePage() {
  return (
    <section aria-labelledby="team-schedule">
      <h1 id="team-schedule">Team schedule</h1>
      <EventCalendar />
    </section>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Scalable design system',
        description:
          'Set shared tokens and component boundaries before dashboard variants multiply.',
        href: '/blog/scalable-design-system',
      },
      {
        title: 'Performance UI engineering',
        description: 'Keep dense data and interaction surfaces responsive under realistic load.',
        href: '/blog/performance-ui-engineering',
      },
      {
        title: 'Accessibility from day one',
        description:
          'Plan focus order, labels, status announcements, and keyboard workflows early.',
        href: '/blog/accessibility-day-one',
      },
    ],
    relatedSlugs: ['react-block-library', 'ai-ui-components', 'authentication-components'],
    faqs: [
      {
        question: 'Do Spectrum UI dashboard components fetch data?',
        answer:
          'No shared data client is imposed. The components provide interface source that you connect to server-rendered data, route handlers, APIs, or a client data layer.',
      },
      {
        question: 'Can dashboard components be used in admin panels?',
        answer:
          'Yes, when their interaction and information shape fit the admin workflow. Add application authorization, audit behavior, and destructive-action safeguards separately.',
      },
      {
        question: 'Are the dashboard examples responsive by default?',
        answer:
          'Some source includes responsive Tailwind variants, but behavior differs by component. Test every selected layout with realistic content and target breakpoints.',
      },
      {
        question: 'How should dashboard loading states be chosen?',
        answer:
          'Use a stable skeleton when the final layout is predictable, a spinner for a contained indeterminate action, and explicit empty or error content when loading is not the current state.',
      },
    ],
  },
  {
    slug: 'landing-page-components',
    label: 'Landing Page Components',
    metadataTitle: 'React Landing Page Components',
    title: 'React landing page components for product narratives',
    description:
      'Build landing pages with Spectrum UI navigation, animated text, bento layouts, testimonials, cards, media reveals, social actions, and footers.',
    keywords: [
      'landing page components',
      'React marketing components',
      'SaaS landing page UI',
      'animated landing page',
      'copy paste landing sections',
    ],
    intro: [
      'Landing page components turn a product narrative into scannable sections such as navigation, hero content, feature layouts, social proof, media, calls to action, and footers. This guide links Spectrum UI building blocks that can be composed into SaaS and product landing pages without adopting a fixed page template.',
      'Start with content hierarchy and conversion intent, then add animation where it supports reading order. The linked source remains editable, so layout and motion can be reduced when the page’s copy, performance budget, or accessibility needs call for it.',
    ],
    definition: [
      'A landing page is a sequence, not a pile of unrelated effects. Each section should answer a specific question: what the product is, who it serves, how it works, why it is credible, and what action comes next.',
      'Spectrum UI provides composable pieces rather than a single canonical landing page. Combine navigation and text with bento or card layouts, choose one social-proof pattern, use media reveals selectively, and close with clear follow-up navigation in the footer.',
    ],
    whenToUse: [
      {
        title: 'You are explaining a product or feature',
        description:
          'Use text, cards, bento layouts, and media to break a technical value proposition into an ordered narrative.',
      },
      {
        title: 'The page needs verifiable social proof',
        description:
          'Use testimonial components with real attributed content and avoid presenting placeholder statements as customer evidence.',
      },
      {
        title: 'You need a reusable marketing system',
        description:
          'Keep sections as local components so campaigns can share structure without duplicating an entire page implementation.',
      },
    ],
    componentSlugs: ['imagepreview', 'animatedcard', 'share-button', 'follow-button'],
    codeExample: {
      title: 'Build a compact feature section with Bento Grid',
      description:
        'Bento Grid supplies the responsive structure while each card keeps its own title and description.',
      installCommands: ['npx shadcn@latest add @spectrumui/bento-grid'],
      code: `import { BentoCard } from '@/components/spectrumui/bento-card';
import { BentoGrid } from '@/components/spectrumui/bento-grid';

export function FeatureSection() {
  return (
    <BentoGrid>
      <BentoCard
        title="Source ownership"
        description="Copy the component into your repository and edit it locally."
        colSpan={2}
      />
      <BentoCard
        title="Documented dependencies"
        description="Install only the packages used by the selected source."
        colSpan={2}
      />
    </BentoGrid>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Responsive design with modern CSS',
        description: 'Plan section behavior across content widths and input modes.',
        href: '/blog/responsive-design-modern-css',
      },
      {
        title: 'Typography for developers',
        description: 'Build a readable hierarchy for headlines, evidence, and calls to action.',
        href: '/blog/typography-for-developers',
      },
      {
        title: 'Dark mode done right',
        description: 'Treat dark mode as a complete contrast and state system.',
        href: '/blog/dark-mode-done-right',
      },
    ],
    relatedSlugs: ['hero-sections', 'pricing-sections', 'animation-library'],
    faqs: [
      {
        question: 'Does Spectrum UI provide one complete landing page template?',
        answer:
          'This hub focuses on composable components and blocks. Assemble the sections that match your content instead of importing every example into one page.',
      },
      {
        question: 'Can landing page content remain server-rendered?',
        answer:
          'Yes. Keep headings, copy, links, and static layout in Server Components, then isolate animated or stateful components behind their existing client boundaries.',
      },
      {
        question: 'Do landing page components need animation?',
        answer:
          'No. Animation is optional and should support hierarchy or feedback. Static content, reduced-motion behavior, and page performance remain valid reasons to simplify it.',
      },
      {
        question: 'Which landing page sections should be built first?',
        answer:
          'Start with the product definition, audience, evidence, and primary action. Add navigation, feature structure, social proof, pricing, and footer links only where the narrative needs them.',
      },
    ],
  },
  {
    slug: 'hero-sections',
    label: 'Hero Sections',
    metadataTitle: 'React Hero Section Guide',
    title: 'React hero sections built from focused components',
    description:
      'Compose accessible React hero sections with Spectrum UI text effects, media, navigation, cards, buttons, and optional animation-ready components.',
    keywords: [
      'hero sections',
      'React hero component',
      'SaaS hero section',
      'animated hero UI',
      'landing page hero code',
    ],
    intro: [
      'A hero section is the opening region of a page that identifies the product, audience, primary value, and next action. Spectrum UI currently provides focused building blocks for that composition—text effects, media reveals, navigation, cards, and buttons—rather than one fixed hero component.',
      'That distinction keeps the most important page content under your control. Use semantic headings and server-rendered copy first, then add an animated leaf only when it improves hierarchy without delaying comprehension.',
    ],
    definition: [
      'A useful hero is a content decision expressed through layout. It needs one clear heading, supporting evidence or context, a primary action, and only the media necessary to explain the product at the top of the page.',
      'Component libraries can supply the ingredients but cannot decide the message. Build the static structure with HTML and Tailwind CSS, choose one visual treatment, preserve the heading in the document, and ensure the calls to action remain identifiable without animation.',
    ],
    whenToUse: [
      {
        title: 'A page needs immediate orientation',
        description:
          'Use a hero when visitors must quickly understand the product, intended user, and primary next step.',
      },
      {
        title: 'A launch needs one visual focal point',
        description:
          'Pair concise copy with one media reveal, text effect, product card, or event badge instead of competing effects.',
      },
      {
        title: 'Several pages share a content structure',
        description:
          'Create a local hero composition with explicit slots for copy and actions while allowing each route to supply distinct content.',
      },
    ],
    componentSlugs: [
      'button',
      'animatedcard',
      'tilt-card',
      'badge',
      'imagepreview',
      'follow-button',
    ],
    codeExample: {
      title: 'Add an optional text effect without hiding the H1',
      description:
        'The semantic heading remains readable content; the hologram treatment acts as a separate visual label.',
      installCommands: [
        'npx shadcn@latest add @spectrumui/holographic',
        'npx shadcn@latest add button',
      ],
      code: `import { HologramText } from '@/components/spectrumui/hologram-text';
import { Button } from '@/components/ui/button';

export function ProductHero() {
  return (
    <section aria-labelledby="product-heading" className="py-20">
      <HologramText text="SPECTRUM UI" />
      <h1 id="product-heading" className="mt-6 text-5xl font-medium">
        Build interface motion from editable React source
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Install individual components, inspect their dependencies, and keep the code.
      </p>
      <Button className="mt-8">Browse components</Button>
    </section>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Typography for developers',
        description: 'Create a heading hierarchy that survives every visual treatment.',
        href: '/blog/typography-for-developers',
      },
      {
        title: 'Psychology of UI',
        description: 'Use attention and visual hierarchy without obscuring the primary action.',
        href: '/blog/psychology-of-ui',
      },
      {
        title: 'Responsive design with modern CSS',
        description: 'Adapt the opening composition to content width, not a single device mockup.',
        href: '/blog/responsive-design-modern-css',
      },
    ],
    relatedSlugs: ['landing-page-components', 'animation-library', 'pricing-sections'],
    faqs: [
      {
        question: 'Does Spectrum UI have one dedicated hero section component?',
        answer:
          'Not currently. This guide shows how to compose existing text, media, navigation, card, and button components into a hero that matches the page’s content.',
      },
      {
        question: 'What content belongs in a product hero section?',
        answer:
          'Include a specific heading, short supporting context, the primary action, and only the evidence or media needed to understand the product at that point.',
      },
      {
        question: 'Should an animated hero hide its text before JavaScript loads?',
        answer:
          'No. Meaningful headings and copy should remain available in the server-rendered document. Treat animation as enhancement around readable content.',
      },
      {
        question: 'How should a hero section behave on small screens?',
        answer:
          'Preserve reading order, keep actions reachable, avoid fixed heights that clip content, and test long headings, zoom, reduced motion, and narrow widths.',
      },
    ],
  },
  {
    slug: 'pricing-sections',
    label: 'Pricing Sections',
    metadataTitle: 'React Pricing Section Guide',
    title: 'React pricing sections with clear plan comparison',
    description:
      'Compose React pricing sections with Spectrum UI cards, buttons, status, quantity, disclosures, progress, and optional billing-period controls.',
    keywords: [
      'pricing sections',
      'React pricing cards',
      'SaaS pricing UI',
      'pricing comparison component',
      'subscription interface',
    ],
    intro: [
      'A pricing section presents plan differences, billing units, included limits, and the next purchase or contact action. This guide shows how Spectrum UI card, button, status, quantity, disclosure, and switch components can be composed into an understandable React pricing interface.',
      'The UI does not create products, prices, checkout sessions, taxes, or subscription state. Load authoritative plan data from your application and keep the displayed amount, billing period, and action destination consistent.',
    ],
    definition: [
      'Pricing is structured product information, not just a row of decorative cards. Users need to compare equivalent attributes, understand recurring periods and usage limits, and identify which action begins checkout versus a sales conversation.',
      'Use local cards for plan structure, buttons for explicit actions, accordions for secondary policy details, and switches only when every displayed amount updates together. A recommended-plan treatment should reflect a real product decision rather than an arbitrary visual default.',
    ],
    whenToUse: [
      {
        title: 'Plans differ by features or limits',
        description:
          'A structured card grid makes equivalent features, units, and exclusions easier to compare across tiers.',
      },
      {
        title: 'Billing periods can be changed',
        description:
          'Use a labeled switch only when monthly and annual amounts, units, savings language, and checkout parameters update together.',
      },
      {
        title: 'Purchase details need progressive disclosure',
        description:
          'Keep the primary comparison visible and move longer billing, cancellation, or usage explanations into accessible disclosures.',
      },
    ],
    componentSlugs: [
      'card',
      'button',
      'loading-button',
      'animated-switch',
      'status-badge',
      'quantity-stepper',
      'accordion',
      'notification-bell',
      'share-button',
      'progress-with-value',
    ],
    codeExample: {
      title: 'Render plan data with local card primitives',
      description:
        'The plans stay as data, while the Card and Button primitives provide the visible comparison and action.',
      installCommands: ['npx shadcn@latest add card button'],
      code: `import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  { name: 'Starter', price: '$12', summary: 'For one product workspace' },
  { name: 'Team', price: '$29', summary: 'For collaborative product teams' },
];

export function PricingGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.name}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">{plan.price}/month</p>
            <p className="mt-2 text-muted-foreground">{plan.summary}</p>
            <Button className="mt-6 w-full">Choose {plan.name}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Spacing systems for UI',
        description: 'Keep repeated plan content aligned without relying on fixed card heights.',
        href: '/blog/spacing-systems-ui',
      },
      {
        title: 'Common UI and UX mistakes',
        description: 'Avoid ambiguous actions, hidden costs, and inconsistent comparison rows.',
        href: '/blog/common-ui-ux-mistakes',
      },
      {
        title: 'Forms that do not get in the way',
        description: 'Carry the selected plan into a clear checkout or contact flow.',
        href: '/blog/forms-that-dont-suck',
      },
    ],
    relatedSlugs: ['landing-page-components', 'hero-sections', 'react-block-library'],
    faqs: [
      {
        question: 'Does Spectrum UI include subscription billing logic?',
        answer:
          'No. Pricing components are interface source. Your application remains responsible for products, prices, checkout, taxes, entitlements, and subscription lifecycle events.',
      },
      {
        question: 'Is there a dedicated Spectrum UI pricing card?',
        answer:
          'The Card collection includes pricing-oriented examples, and the local Card primitives can be composed around authoritative plan data as shown here.',
      },
      {
        question: 'When should a pricing section use a billing-period switch?',
        answer:
          'Use one only when the period meaningfully changes the displayed plans and every amount, unit, savings statement, and checkout value updates consistently.',
      },
      {
        question: 'How can a pricing comparison remain accessible?',
        answer:
          'Use headings for plan names, readable text for price units, explicit action labels, consistent feature order, sufficient contrast, and keyboard-operable disclosures or switches.',
      },
    ],
  },
  {
    slug: 'authentication-components',
    label: 'Authentication Components',
    metadataTitle: 'React Authentication Components',
    title: 'React authentication components for account flows',
    description:
      'Compose sign-in, registration, password, verification, and recovery interfaces with editable Spectrum UI React form and feedback components.',
    keywords: [
      'authentication components',
      'React login components',
      'signup form UI',
      'password strength component',
      'Next.js authentication UI',
    ],
    intro: [
      'Authentication components collect account identifiers, credentials, verification details, and recovery input while explaining validation and request state. This guide groups Spectrum UI login, input, password, multi-step, feedback, loading, and modal source for React and Next.js account flows.',
      'These components do not authenticate users by themselves. Connect them to a reviewed identity provider or server-side authentication implementation, validate every request on the server, and avoid exposing account existence through inconsistent messages.',
    ],
    definition: [
      'Authentication UI is the visible boundary around a security-sensitive server workflow. The interface must preserve labels, autocomplete hints, password-manager behavior, error recovery, focus movement, and clear pending states while the server makes the actual decision.',
      'Spectrum UI can supply the local presentation and interaction source. Your application still owns sessions, credentials, OAuth configuration, rate limits, verification, recovery tokens, authorization, and security logging.',
    ],
    whenToUse: [
      {
        title: 'You are implementing sign-in or registration',
        description:
          'Combine labeled inputs, password feedback, and a pending action with server-side validation and identity-provider responses.',
      },
      {
        title: 'A flow spans several verification steps',
        description:
          'Use multi-step structure when later input depends on an earlier verified state, while preserving recovery and back navigation.',
      },
      {
        title: 'Errors need safe, actionable feedback',
        description:
          'Use alert and loading patterns that explain the next action without leaking whether a specific account exists.',
      },
    ],
    componentSlugs: [
      'login',
      'floating-label-input',
      'password-strength',
      'button',
      'loading-button',
      'multistepform',
      'animated-switch',
      'input-model',
      'alert',
    ],
    codeExample: {
      title: 'Collect a new password with visible requirements',
      description:
        'The component handles the input presentation and meter; the form action still validates the submitted password on the server.',
      installCommands: [
        'npx shadcn@latest add @spectrumui/password-strength',
        'npx shadcn@latest add button',
      ],
      code: `'use client';

import { useState } from 'react';
import { PasswordStrengthInput } from '@/components/spectrumui/password-strength';
import { Button } from '@/components/ui/button';

export function CreatePasswordForm() {
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-4">
      <PasswordStrengthInput
        id="new-password"
        name="password"
        value={password}
        onValueChange={setPassword}
      />
      <Button type="submit">Create account</Button>
    </form>
  );
}`,
    },
    guideLinks: [
      {
        title: 'Forms that do not get in the way',
        description: 'Design labels, validation, pending state, and error recovery as one flow.',
        href: '/blog/forms-that-dont-suck',
      },
      {
        title: 'Accessibility from day one',
        description: 'Preserve labels, autocomplete, focus, announcements, and keyboard operation.',
        href: '/blog/accessibility-day-one',
      },
      {
        title: 'React 19 Server Actions guide',
        description: 'Handle form mutations on the server while keeping the UI responsive.',
        href: '/blog/react-19-server-actions-guide',
      },
    ],
    relatedSlugs: ['react-block-library', 'nextjs-ui-library', 'dashboard-components'],
    faqs: [
      {
        question: 'Do Spectrum UI authentication components authenticate users?',
        answer:
          'No. They provide interface source. Credentials, sessions, OAuth, verification, recovery, authorization, and rate limiting must be implemented and validated by your application.',
      },
      {
        question: 'Can the login components work with any identity provider?',
        answer:
          'The local UI can be connected to the provider chosen by your application. Adapt field requirements, OAuth actions, errors, redirects, and session handling to that provider.',
      },
      {
        question: 'Should password strength be checked only in the browser?',
        answer:
          'No. Client feedback helps the user, but the server must enforce the final credential policy and reject invalid submissions independently.',
      },
      {
        question: 'How should authentication errors be presented?',
        answer:
          'Use concise, actionable messages, move focus when appropriate, preserve user input safely, and avoid response differences that reveal whether an account exists.',
      },
    ],
  },
  {
    slug: 'ai-ui-components',
    label: 'AI UI Components',
    metadataTitle: 'React AI UI Components',
    title: 'React AI UI components for prompt and result workflows',
    description:
      'Compose AI application interfaces with Spectrum UI prompt inputs, command navigation, selection, feedback, loading, reactions, and result patterns.',
    keywords: [
      'AI UI components',
      'React AI interface',
      'prompt input component',
      'AI chat UI',
      'generative AI application UI',
    ],
    intro: [
      'AI UI components support prompt entry, context selection, command discovery, response loading, result browsing, feedback, and follow-up actions. This guide maps Spectrum UI inputs, selectors, command navigation, reactions, loading states, avatars, and infinite content patterns to React AI application workflows.',
      'The components do not call a model or implement streaming, persistence, safety, or usage accounting. Connect them to the AI SDK or backend selected by your project and represent pending, partial, completed, empty, and failed states explicitly.',
    ],
    definition: [
      'An AI interface is a stateful application surface, not just a textarea beside a send button. Users need to understand what context is selected, whether a request is running, which output belongs to which prompt, and what can be retried, copied, rated, or continued.',
      'Spectrum UI provides general interface primitives that can be composed for those states. Keep model-specific data and streaming logic outside the visual component unless the component API explicitly owns that behavior.',
    ],
    whenToUse: [
      {
        title: 'Users write prompts or instructions',
        description:
          'Combine an autosizing input with explicit submit, keyboard, disabled, and pending behavior suited to the product.',
      },
      {
        title: 'Users select tools or context',
        description:
          'Command palettes and multiple selectors can expose models, sources, tools, or actions when their labels remain understandable.',
      },
      {
        title: 'Generated results need follow-up',
        description:
          'Use loading, reactions, feedback, infinite content, and copy or retry actions to make result state and next steps explicit.',
      },
    ],
    componentSlugs: [
      'autosize-textarea',
      'multiple-selector',
      'avatar-stack',
      'feedback',
      'loading-button',
      'infinite-scroll',
      'input-model',
      'reaction-bar',
      'kbd-key',
      'spinner',
    ],
    codeExample: {
      title: 'Build a controlled prompt composer',
      description:
        'The autosizing input owns its height behavior while the application owns submission, streaming, persistence, and request state.',
      installCommands: [
        'npx shadcn@latest add @spectrumui/autosize-textarea-demo',
        'npx shadcn@latest add button',
      ],
      code: `'use client';

import { useState } from 'react';
import { AutosizeTextarea } from '@/components/spectrumui/autosize-textarea';
import { Button } from '@/components/ui/button';

export function PromptComposer() {
  const [prompt, setPrompt] = useState('');

  return (
    <form className="flex items-end gap-3">
      <AutosizeTextarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        minHeight={52}
        maxHeight={180}
        aria-label="Prompt"
      />
      <Button type="submit" disabled={!prompt.trim()}>
        Send
      </Button>
    </form>
  );
}`,
    },
    guideLinks: [
      {
        title: 'AI-powered UI development',
        description:
          'Use AI tools while keeping architecture, review, and product decisions explicit.',
        href: '/blog/ai-powered-ui-development',
      },
      {
        title: 'Performance UI engineering',
        description:
          'Measure streaming updates, long result lists, and client rendering under load.',
        href: '/blog/performance-ui-engineering',
      },
      {
        title: 'Set up the Spectrum UI MCP server',
        description: 'Let compatible editors search and install documented components.',
        href: '/docs/mcp',
      },
    ],
    relatedSlugs: ['dashboard-components', 'nextjs-ui-library', 'react-component-library'],
    faqs: [
      {
        question: 'Do Spectrum UI AI components connect to a model provider?',
        answer:
          'No. They are interface source. Choose and configure the model SDK, server route, authentication, persistence, safety controls, and usage tracking separately.',
      },
      {
        question: 'Does the prompt composer implement streaming responses?',
        answer:
          'No. The example controls prompt input only. Your application must manage request state, streamed parts, cancellation, retries, errors, and persisted messages.',
      },
      {
        question: 'Which states should an AI interface show?',
        answer:
          'Represent idle, validating, submitted, streaming, completed, empty, cancelled, rate-limited, and failed states when they can occur in the selected backend.',
      },
      {
        question: 'Can general Spectrum UI components be used in AI applications?',
        answer:
          'Yes. AI products still need ordinary inputs, navigation, status, feedback, profile, overlays, and data display. Compose only the components that match the workflow.',
      },
    ],
  },
];

export interface TopicHubComponentLink {
  slug: string;
  name: string;
  description: string;
  category: string;
  href: string;
}

const componentBySlug = new Map(componentCatalog.map((component) => [component.slug, component]));
const topicHubBySlug = new Map(TOPIC_HUBS.map((hub) => [hub.slug, hub]));

export function getTopicHub(slug: TopicHubSlug) {
  const hub = topicHubBySlug.get(slug);
  if (!hub) throw new Error(`Unknown topic hub: ${slug}`);
  return hub;
}

export function getTopicHubComponents(hub: TopicHub): TopicHubComponentLink[] {
  return hub.componentSlugs.map((slug) => {
    const component = componentBySlug.get(slug);
    if (!component) throw new Error(`Unknown component "${slug}" in topic hub "${hub.slug}"`);

    return {
      ...component,
      href: `/docs/${component.slug}`,
    };
  });
}

export function getRelatedTopicHubs(hub: TopicHub) {
  return hub.relatedSlugs.map(getTopicHub);
}

export function getTopicHubsForComponent(componentSlug: string) {
  return TOPIC_HUBS.flatMap((hub) =>
    hub.componentSlugs.includes(componentSlug)
      ? [
          {
            slug: hub.slug,
            label: hub.label,
            href: topicHubPath(hub.slug),
          },
        ]
      : [],
  );
}

export function getTopicHubLinks() {
  return TOPIC_HUB_LINKS.map((link) => ({
    ...link,
    href: topicHubPath(link.slug),
  }));
}
