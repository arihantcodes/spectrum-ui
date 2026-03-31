import type React from "react"
import spectrumUiDevelopmentSpeed from "@/content/blog/spectrum-ui-development-speed"
import shadcnCustomizationGuide from "@/content/blog/shadcn-customization-guide"
import nextjsServerComponentsGuide from "@/content/blog/nextjs-server-components-guide"
import commonUiUxMistakes from "@/content/blog/common-ui-ux-mistakes"
import scalableDesignSystem from "@/content/blog/scalable-design-system"
import designEngineerPlaybook from "@/content/blog/design-engineer-playbook"
import figmaToFunctionalWorkflow from "@/content/blog/figma-to-functional-workflow"
import designSystemsEngineersLove from "@/content/blog/design-systems-engineers-love"
import artOfPrototyping from "@/content/blog/art-of-prototyping"
import motionDesignForEngineers from "@/content/blog/motion-design-for-engineers"
import designTokensSingleSource from "@/content/blog/design-tokens-single-source"
import accessibilityDayOne from "@/content/blog/accessibility-day-one"
import psychologyOfUi from "@/content/blog/psychology-of-ui"
import collaborationPatternsDesignEngineering from "@/content/blog/collaboration-patterns-design-engineering"
import futureOfDesignEngineering from "@/content/blog/future-of-design-engineering"
import responsiveDesignModernCss from "@/content/blog/responsive-design-modern-css"
import tailwindTipsTricks from "@/content/blog/tailwind-tips-tricks"
import componentApiDesign from "@/content/blog/component-api-design"
import darkModeDoneRight from "@/content/blog/dark-mode-done-right"
import microInteractionsGuide from "@/content/blog/micro-interactions-guide"
import designEngineerTools2026 from "@/content/blog/design-engineer-tools-2026"
import typographyForDevelopers from "@/content/blog/typography-for-developers"
import cssGridLayouts from "@/content/blog/css-grid-layouts"
import performanceUiEngineering from "@/content/blog/performance-ui-engineering"
import designEngineerInterviewPrep from "@/content/blog/design-engineer-interview-prep"
import storybookDesignSystems from "@/content/blog/storybook-design-systems"
import colorSystemsWebApps from "@/content/blog/color-systems-web-apps"
import formsThatDontSuck from "@/content/blog/forms-that-dont-suck"
import designHandoffChecklist from "@/content/blog/design-handoff-checklist"
import spacingSystemsUi from "@/content/blog/spacing-systems-ui"
import tailwindCssV4MigrationGuide from "@/content/blog/tailwind-css-v4-migration-guide"
import aiPoweredUiDevelopment from "@/content/blog/ai-powered-ui-development"
import react19ServerActionsGuide from "@/content/blog/react-19-server-actions-guide"
import viewTransitionsApiGuide from "@/content/blog/view-transitions-api-guide"
import buildingProductionComponentLibrary from "@/content/blog/building-production-component-library"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: {
    name: string
    role?: string
    avatar?: string
  }
  date: string
  readTime: string
  icon: string
  category?: string
  content: React.ReactNode
}

const blogPosts: Record<string, BlogPost> = {
  "spectrum-ui-development-speed": {
    slug: "spectrum-ui-development-speed",
    ...spectrumUiDevelopmentSpeed,
  },
  "shadcn-customization-guide": {
    slug: "shadcn-customization-guide",
    ...shadcnCustomizationGuide,
  },
  "nextjs-server-components-guide": {
    slug: "nextjs-server-components-guide",
    ...nextjsServerComponentsGuide,
  },
  "common-ui-ux-mistakes": {
    slug: "common-ui-ux-mistakes",
    ...commonUiUxMistakes,
  },
  "scalable-design-system": {
    slug: "scalable-design-system",
    ...scalableDesignSystem,
  },
  "design-engineer-playbook": {
    slug: "design-engineer-playbook",
    ...designEngineerPlaybook,
  },
  "figma-to-functional-workflow": {
    slug: "figma-to-functional-workflow",
    ...figmaToFunctionalWorkflow,
  },
  "design-systems-engineers-love": {
    slug: "design-systems-engineers-love",
    ...designSystemsEngineersLove,
  },
  "art-of-prototyping": {
    slug: "art-of-prototyping",
    ...artOfPrototyping,
  },
  "motion-design-for-engineers": {
    slug: "motion-design-for-engineers",
    ...motionDesignForEngineers,
  },
  "design-tokens-single-source": {
    slug: "design-tokens-single-source",
    ...designTokensSingleSource,
  },
  "accessibility-day-one": {
    slug: "accessibility-day-one",
    ...accessibilityDayOne,
  },
  "psychology-of-ui": {
    slug: "psychology-of-ui",
    ...psychologyOfUi,
  },
  "collaboration-patterns-design-engineering": {
    slug: "collaboration-patterns-design-engineering",
    ...collaborationPatternsDesignEngineering,
  },
  "future-of-design-engineering": {
    slug: "future-of-design-engineering",
    ...futureOfDesignEngineering,
  },
  "responsive-design-modern-css": {
    slug: "responsive-design-modern-css",
    ...responsiveDesignModernCss,
  },
  "tailwind-tips-tricks": {
    slug: "tailwind-tips-tricks",
    ...tailwindTipsTricks,
  },
  "component-api-design": {
    slug: "component-api-design",
    ...componentApiDesign,
  },
  "dark-mode-done-right": {
    slug: "dark-mode-done-right",
    ...darkModeDoneRight,
  },
  "micro-interactions-guide": {
    slug: "micro-interactions-guide",
    ...microInteractionsGuide,
  },
  "design-engineer-tools-2026": {
    slug: "design-engineer-tools-2026",
    ...designEngineerTools2026,
  },
  "typography-for-developers": {
    slug: "typography-for-developers",
    ...typographyForDevelopers,
  },
  "css-grid-layouts": {
    slug: "css-grid-layouts",
    ...cssGridLayouts,
  },
  "performance-ui-engineering": {
    slug: "performance-ui-engineering",
    ...performanceUiEngineering,
  },
  "design-engineer-interview-prep": {
    slug: "design-engineer-interview-prep",
    ...designEngineerInterviewPrep,
  },
  "storybook-design-systems": {
    slug: "storybook-design-systems",
    ...storybookDesignSystems,
  },
  "color-systems-web-apps": {
    slug: "color-systems-web-apps",
    ...colorSystemsWebApps,
  },
  "forms-that-dont-suck": {
    slug: "forms-that-dont-suck",
    ...formsThatDontSuck,
  },
  "design-handoff-checklist": {
    slug: "design-handoff-checklist",
    ...designHandoffChecklist,
  },
  "spacing-systems-ui": {
    slug: "spacing-systems-ui",
    ...spacingSystemsUi,
  },
  "tailwind-css-v4-migration-guide": {
    slug: "tailwind-css-v4-migration-guide",
    ...tailwindCssV4MigrationGuide,
  },
  "ai-powered-ui-development": {
    slug: "ai-powered-ui-development",
    ...aiPoweredUiDevelopment,
  },
  "react-19-server-actions-guide": {
    slug: "react-19-server-actions-guide",
    ...react19ServerActionsGuide,
  },
  "view-transitions-api-guide": {
    slug: "view-transitions-api-guide",
    ...viewTransitionsApiGuide,
  },
  "building-production-component-library": {
    slug: "building-production-component-library",
    ...buildingProductionComponentLibrary,
  },
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = Object.values(blogPosts)
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return blogPosts[slug] || null
}
