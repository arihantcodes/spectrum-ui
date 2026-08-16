import type { FooterCategory } from "./types"

export interface FooterFieldDoc {
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  description: string
}

export interface FooterCatalogEntry {
  /** URL slug under /docs/footer/[slug] */
  slug: string
  /** Exported React component name */
  componentName: string
  /** Source file under components/spectrumui/footers */
  fileName: string
  /** Gallery and docs title */
  title: string
  /** One-line positioning */
  summary: string
  /** Who should copy this footer */
  useCase: string
  /** Industry / visual family used by gallery filters */
  category: FooterCategory
  /** shadcn CLI package name without the @spectrumui/ prefix */
  cli: string
  /** npm packages beyond shadcn primitives */
  dependencies: string[]
  /** shadcn/ui primitives used */
  registryDependencies: string[]
  /** Unique information architecture */
  informationArchitecture: string
  /** Unique layout structure */
  layout: string
  /** Unique motion idea */
  motion: string
  /** Mobile composition strategy */
  mobile: string
  /** Configurable properties documented on the detail page */
  props: FooterFieldDoc[]
}

const SHARED_PROPS: FooterFieldDoc[] = [
  {
    name: "brand",
    type: "FooterBrand",
    description: "Company name, optional tagline, home href, and optional custom logo.",
  },
  {
    name: "groups",
    type: "FooterNavGroup[]",
    description: "Named navigation groups. Each group has a title and link list.",
  },
  {
    name: "socials",
    type: "FooterSocialLink[]",
    description: "Social destinations. Common labels (GitHub, X, LinkedIn) map to icons automatically.",
  },
  {
    name: "legal",
    type: "FooterLegalLink[]",
    description: "Privacy, terms, cookies, and other legal destinations.",
  },
  {
    name: "copyright",
    type: "string",
    description: "Copyright line. Defaults to the current year and brand name.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes on the root footer element.",
  },
]

function withShared(extra: FooterFieldDoc[] = []): FooterFieldDoc[] {
  return [...SHARED_PROPS, ...extra]
}

/**
 * Curated uniqueness matrix for the Spectrum UI footer collection.
 * Every entry must differ in IA, layout, hierarchy, brand, navigation,
 * interaction, mobile composition, background, motion, and use case.
 */
export const FOOTER_CATALOG: FooterCatalogEntry[] = [
  {
    slug: "enterprise-grid",
    componentName: "EnterpriseGridFooter",
    fileName: "enterprise-grid-footer.tsx",
    title: "Enterprise Grid",
    summary: "A structured mega footer for multi-product enterprise marketing sites.",
    useCase:
      "Use on enterprise SaaS marketing sites that need dense, scannable product, solution, industry, and resource navigation without looking like a generic four-column dump.",
    category: "enterprise",
    cli: "enterprise-grid-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Product rail + five labelled directories + utility bar",
    layout: "12-column mega grid with a featured product card in the first column",
    motion: "Staggered column reveal and underline sweep on links",
    mobile: "Featured product first, then disclosure groups, then utility bar",
    props: withShared([
      {
        name: "featured",
        type: "{ title: string; description: string; href: string; label: string }",
        description: "Featured product or solution card in the first column.",
      },
    ]),
  },
  {
    slug: "conversion-saas",
    componentName: "ConversionSaasFooter",
    fileName: "conversion-saas-footer.tsx",
    title: "Conversion SaaS",
    summary: "A minimal SaaS footer that leads with a conversion band, then a slim link row.",
    useCase:
      "Use on product-led SaaS marketing pages where the footer should recapture attention with a trial or demo CTA instead of a large sitemap.",
    category: "saas",
    cli: "conversion-saas-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "CTA-first, then two compact link clusters and legal",
    layout: "Full-width conversion band over a single-row link bar",
    motion: "Submit morphs into a success check; CTA lift on hover",
    mobile: "Full-width CTA and form, then a two-column link wrap",
    props: withShared([
      {
        name: "cta",
        type: "FooterCtaConfig",
        description: "Headline, supporting copy, and primary conversion action.",
      },
      {
        name: "newsletter",
        type: "FooterNewsletterConfig",
        description: "Optional email capture shown beside the primary CTA.",
      },
    ]),
  },
  {
    slug: "developer-cloud",
    componentName: "DeveloperCloudFooter",
    fileName: "developer-cloud-footer.tsx",
    title: "Developer Cloud",
    summary: "A terminal-inspired footer for infrastructure and developer-tool companies.",
    useCase:
      "Use on developer-tool, infrastructure, and platform sites where docs, CLI, status, and API surfaces belong in the last viewport.",
    category: "developer",
    cli: "developer-cloud-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Command prompt + docs/API/status directories",
    layout: "Split terminal pane and monospaced link columns over a status strip",
    motion: "Caret blink in the prompt; live status pulse",
    mobile: "Prompt block first, then disclosure groups, then status strip",
    props: withShared([
      {
        name: "prompt",
        type: "string",
        description: "Command shown in the terminal pane.",
      },
      {
        name: "status",
        type: "FooterStatusItem[]",
        description: "Service status row under the main grid.",
      },
    ]),
  },
  {
    slug: "fintech-trust",
    componentName: "FintechTrustFooter",
    fileName: "fintech-trust-footer.tsx",
    title: "Fintech Trust",
    summary: "A compliance-forward footer with trust badges, legal density, and regulatory copy.",
    useCase:
      "Use on fintech, payments, and banking products that must surface security, licenses, and disclosures as first-class footer content.",
    category: "fintech",
    cli: "fintech-trust-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Trust badge rail + product/legal columns + disclosure strip",
    layout: "Statement-like rules, badge row, four dense columns, serif disclaimer",
    motion: "Badge entrance and quiet hover lift",
    mobile: "Badge wrap, then disclosure groups, then full-width disclaimer",
    props: withShared([
      {
        name: "badges",
        type: "{ label: string; detail: string }[]",
        description: "Compliance and certification badges (SOC 2, PCI, ISO, and similar).",
      },
      {
        name: "disclaimer",
        type: "string",
        description: "Regulatory disclaimer shown in the bottom strip.",
      },
    ]),
  },
  {
    slug: "ai-prompt",
    componentName: "AiPromptFooter",
    fileName: "ai-prompt-footer.tsx",
    title: "AI Prompt",
    summary: "An AI product footer built around an animated command and prompt composer.",
    useCase:
      "Use on AI assistant, copilot, and model-platform marketing sites where the footer should feel like a continuation of the product surface.",
    category: "ai",
    cli: "ai-prompt-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "Prompt composer as the primary action, then compact directories",
    layout: "Centered command field with suggestion chips over a three-column base",
    motion: "Placeholder cycle, chip press, and send-state morph",
    mobile: "Full-width prompt first, chips wrap, then disclosure groups",
    props: withShared([
      {
        name: "suggestions",
        type: "string[]",
        description: "Prompt chips shown under the command field.",
      },
      {
        name: "onPrompt",
        type: "(value: string) => void",
        description: "Called when a prompt is submitted from the composer.",
      },
    ]),
  },
  {
    slug: "product-switcher",
    componentName: "ProductSwitcherFooter",
    fileName: "product-switcher-footer.tsx",
    title: "Product Switcher",
    summary: "A multi-product company footer whose directories change with the selected product.",
    useCase:
      "Use on companies with several named products that should not dump every sitemap into one mega footer.",
    category: "enterprise",
    cli: "product-switcher-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Product switcher driving scoped navigation groups",
    layout: "Vertical product rail (horizontal on mobile) with swapping content pane",
    motion: "Tab indicator slide and content crossfade",
    mobile: "Horizontal product scroller, then the active product's groups",
    props: withShared([
      {
        name: "products",
        type: "{ id: string; name: string; description: string; groups: FooterNavGroup[] }[]",
        description: "Product list. Selecting a product swaps the visible directories.",
      },
    ]),
  },
  {
    slug: "global-network",
    componentName: "GlobalNetworkFooter",
    fileName: "global-network-footer.tsx",
    title: "Global Network",
    summary: "A global enterprise footer with regions, local times, and language selection.",
    useCase:
      "Use on multinational companies that need region, language, and office context beside conventional directories.",
    category: "enterprise",
    cli: "global-network-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Region cards + language control + condensed directories",
    layout: "Office/time cards over a locale control and three link columns",
    motion: "Local-time tick and quiet HQ pulse",
    mobile: "Region accordion with times, then language select, then link groups",
    props: withShared([
      {
        name: "regions",
        type: "FooterRegion[]",
        description: "Offices or regions with IANA timezones for local time.",
      },
      {
        name: "languages",
        type: "{ code: string; label: string }[]",
        description: "Language options for the locale control.",
      },
    ]),
  },
  {
    slug: "editorial",
    componentName: "EditorialFooter",
    fileName: "editorial-footer.tsx",
    title: "Editorial",
    summary: "A magazine-style footer for articles, reports, and resource libraries.",
    useCase:
      "Use on research, media, and thought-leadership sites where the footer should keep readers in the content graph.",
    category: "creative",
    cli: "editorial-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Featured story + recents + topic directories",
    layout: "Masthead, featured article, teaser list, then condensed topics",
    motion: "Image-panel hover crop and teaser underline",
    mobile: "Masthead, featured story, then stacked teasers and topic disclosures",
    props: withShared([
      {
        name: "featured",
        type: "FooterArticle",
        description: "Lead story shown in the editorial panel.",
      },
      {
        name: "articles",
        type: "FooterArticle[]",
        description: "Supporting stories and reports.",
      },
    ]),
  },
  {
    slug: "commerce-platform",
    componentName: "CommercePlatformFooter",
    fileName: "commerce-platform-footer.tsx",
    title: "Commerce Platform",
    summary: "An e-commerce platform footer with category navigation and merchant paths.",
    useCase:
      "Use on marketplace or commerce-platform marketing sites that serve both buyers and sellers.",
    category: "commerce",
    cli: "commerce-platform-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Category cloud + Shop/Sell/Support + payment row",
    layout: "Dense chip cloud over three audience columns and a trust/payment bar",
    motion: "Chip fill on hover and quiet badge entrance",
    mobile: "Category wrap, full-width Sell CTA, then disclosure groups",
    props: withShared([
      {
        name: "categories",
        type: "{ label: string; href: string }[]",
        description: "Browsable commerce categories rendered as chips.",
      },
    ]),
  },
  {
    slug: "developer-docs",
    componentName: "DeveloperDocsFooter",
    fileName: "developer-docs-footer.tsx",
    title: "Developer Docs",
    summary: "A developer-platform footer with documentation jump-off and API status.",
    useCase:
      "Use on API platforms and SDK companies where developers leave a docs page and still need status, references, and support.",
    category: "developer",
    cli: "developer-docs-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "Docs jump field + SDK pills + endpoint status table",
    layout: "Search-like jump control, language pills, compact status table, slim dirs",
    motion: "Field focus expand and status color fade",
    mobile: "Jump field first, pills wrap, stacked status rows, then disclosures",
    props: withShared([
      {
        name: "sdks",
        type: "{ label: string; href: string }[]",
        description: "SDK or language shortcuts.",
      },
      {
        name: "endpoints",
        type: "FooterStatusItem[]",
        description: "API surfaces with operational status.",
      },
    ]),
  },
  {
    slug: "cybersecurity",
    componentName: "CybersecurityFooter",
    fileName: "cybersecurity-footer.tsx",
    title: "Cybersecurity",
    summary: "A security-product footer with trust badges, disclosure, and incident resources.",
    useCase:
      "Use on cybersecurity, identity, and compliance products that need a responsible-disclosure path and visible certifications.",
    category: "security",
    cli: "cybersecurity-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Certification wall + disclosure CTA + security resources",
    layout: "Badge wall, report-vulnerability panel, resource columns, dark ops bar",
    motion: "Shield mark draw-in and status pulse",
    mobile: "Disclosure CTA first, badge grid, then resource disclosures",
    props: withShared([
      {
        name: "certifications",
        type: "{ label: string; detail: string }[]",
        description: "Security certifications and audit marks.",
      },
    ]),
  },
  {
    slug: "creative-studio",
    componentName: "CreativeStudioFooter",
    fileName: "creative-studio-footer.tsx",
    title: "Creative Studio",
    summary: "A typography-forward footer for creative software with restrained motion.",
    useCase:
      "Use on design-tool and creative-suite marketing sites that can carry oversized type without looking decorative.",
    category: "creative",
    cli: "creative-studio-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Oversized wordmark + sparse directories + social",
    layout: "Giant wrapping logotype, marquee of capabilities, large-type links",
    motion: "Marquee that pauses on hover and reduced-motion; letter hover color",
    mobile: "Stacked wordmark, paused capability list, full-width links",
    props: withShared([
      {
        name: "capabilities",
        type: "string[]",
        description: "Words used in the capability marquee.",
      },
    ]),
  },
  {
    slug: "productivity",
    componentName: "ProductivityFooter",
    fileName: "productivity-footer.tsx",
    title: "Productivity",
    summary: "A productivity-platform footer with integrations and use-case entry points.",
    useCase:
      "Use on workspace, notes, and ops tools that sell through integrations and job-to-be-done stories.",
    category: "saas",
    cli: "productivity-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Integration row + use-case cards + slim directories",
    layout: "Logo rail, three use-case panels, then compact columns",
    motion: "Integration marks shift from muted to full color on hover",
    mobile: "Integration wrap, stacked use-case cards, then disclosures",
    props: withShared([
      {
        name: "integrations",
        type: "{ name: string; href: string }[]",
        description: "Integration partners shown in the logo rail.",
      },
      {
        name: "useCases",
        type: "{ title: string; description: string; href: string }[]",
        description: "Job-to-be-done cards.",
      },
    ]),
  },
  {
    slug: "startup-waitlist",
    componentName: "StartupWaitlistFooter",
    fileName: "startup-waitlist-footer.tsx",
    title: "Startup Waitlist",
    summary: "A conversion footer for early-stage products collecting a waitlist or newsletter.",
    useCase:
      "Use on launch pages and early-stage marketing sites where the footer is the last chance to collect an email.",
    category: "saas",
    cli: "startup-waitlist-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "Waitlist as the primary content, social proof, sparse legal",
    layout: "Centered conversion stack with avatar proof and a thin legal row",
    motion: "Form success morph and quiet avatar stagger",
    mobile: "Full-width form and CTA, proof row, legal wrap",
    props: withShared([
      {
        name: "newsletter",
        type: "FooterNewsletterConfig",
        description: "Waitlist or newsletter capture.",
      },
      {
        name: "proofLabel",
        type: "string",
        description: "Social-proof line under the form, e.g. waitlist count.",
      },
    ]),
  },
  {
    slug: "marketplace",
    componentName: "MarketplaceFooter",
    fileName: "marketplace-footer.tsx",
    title: "Marketplace",
    summary: "A marketplace footer with category mosaic tiles and community destinations.",
    useCase:
      "Use on two-sided marketplaces that need browse paths, community, and seller conversion in the last screen.",
    category: "commerce",
    cli: "marketplace-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Category mosaic + community + seller CTA",
    layout: "Tile mosaic with counts, community row, seller panel",
    motion: "Tile lift and count fade-in",
    mobile: "Two-column mosaic, full-width seller CTA, community list",
    props: withShared([
      {
        name: "categories",
        type: "{ label: string; href: string; count: string }[]",
        description: "Marketplace categories with listing counts.",
      },
    ]),
  },
  {
    slug: "open-source",
    componentName: "OpenSourceFooter",
    fileName: "open-source-footer.tsx",
    title: "Open Source",
    summary: "An open-source footer with repository stats and a contributor call to action.",
    useCase:
      "Use on OSS project sites, developer tools with public repos, and foundation marketing pages.",
    category: "community",
    cli: "open-source-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Repo stats + contributor CTA + community/docs directories",
    layout: "Stat counters, contribute panel, activity-style link list",
    motion: "Count-up on enter (disabled when reduced motion)",
    mobile: "Stats row, full-width contribute CTA, then disclosures",
    props: withShared([
      {
        name: "stats",
        type: "{ label: string; value: number }[]",
        description: "Repository statistics such as stars, forks, and contributors.",
      },
    ]),
  },
  {
    slug: "cloud-status",
    componentName: "CloudStatusFooter",
    fileName: "cloud-status-footer.tsx",
    title: "Cloud Status",
    summary: "A cloud-platform footer that presents service status as the primary information.",
    useCase:
      "Use on cloud, observability, and infrastructure platforms where uptime is part of the brand promise.",
    category: "developer",
    cli: "cloud-status-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Service matrix first, then compact platform directories",
    layout: "Status table with regional notes over a slim nav and incident link",
    motion: "Row hover and operational pulse",
    mobile: "Compact status list, incident CTA, then disclosures",
    props: withShared([
      {
        name: "services",
        type: "FooterStatusItem[]",
        description: "Cloud services and their operational state.",
      },
    ]),
  },
  {
    slug: "healthcare-privacy",
    componentName: "HealthcarePrivacyFooter",
    fileName: "healthcare-privacy-footer.tsx",
    title: "Healthcare Privacy",
    summary: "A calm healthtech footer that leads with privacy, HIPAA, and audience paths.",
    useCase:
      "Use on clinical, patient, and health-operations products that must treat privacy as a primary footer message.",
    category: "industry",
    cli: "healthcare-privacy-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Privacy notice + patient/provider split + compliance marks",
    layout: "Soft clinical surface, privacy panel, two audience columns, badge row",
    motion: "Gentle panel reveal; expandable privacy details",
    mobile: "Privacy panel first, audience disclosures, compliance wrap",
    props: withShared([
      {
        name: "privacyNotice",
        type: "string",
        description: "Short privacy statement. Longer copy can live behind the details control.",
      },
    ]),
  },
  {
    slug: "education-platform",
    componentName: "EducationPlatformFooter",
    fileName: "education-platform-footer.tsx",
    title: "Education Platform",
    summary: "An education footer with distinct learner and institution navigation.",
    useCase:
      "Use on EdTech products that sell to both individual learners and schools or universities.",
    category: "industry",
    cli: "education-platform-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Audience toggle driving learner vs institution directories",
    layout: "Two-pane audience switch, catalog links, accreditation row",
    motion: "Audience pane crossfade",
    mobile: "Audience segmented control, then the active pane's links",
    props: withShared([
      {
        name: "learnerGroups",
        type: "FooterNavGroup[]",
        description: "Navigation shown when the Learner audience is active.",
      },
      {
        name: "institutionGroups",
        type: "FooterNavGroup[]",
        description: "Navigation shown when the Institution audience is active.",
      },
    ]),
  },
  {
    slug: "market-data",
    componentName: "MarketDataFooter",
    fileName: "market-data-footer.tsx",
    title: "Market Data",
    summary: "A financial-dashboard footer with a market ticker and data disclaimer.",
    useCase:
      "Use on trading, treasury, and market-data products where delayed quotes and disclosures belong in the chrome.",
    category: "fintech",
    cli: "market-data-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Ticker + product directories + data disclaimer",
    layout: "Tape over three compact columns and a terminal-style disclaimer",
    motion: "Ticker scroll that pauses on hover and reduced-motion",
    mobile: "Wrapping quote chips instead of a tape, then disclosures",
    props: withShared([
      {
        name: "quotes",
        type: "{ symbol: string; price: string; change: number }[]",
        description: "Market quotes rendered in the ticker.",
      },
    ]),
  },
  {
    slug: "bento",
    componentName: "BentoFooter",
    fileName: "bento-footer.tsx",
    title: "Bento",
    summary: "A modular bento-grid footer that treats brand, CTA, nav, and legal as cells.",
    useCase:
      "Use on modern SaaS marketing sites that already use bento language in the page and want the footer to match.",
    category: "experimental",
    cli: "bento-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "Mixed modules: brand, newsletter, nav, social, legal",
    layout: "Asymmetric 12-column bento with unequal cell spans",
    motion: "Cell hover depth and newsletter success",
    mobile: "Reordered stacked cells: CTA, brand, nav, legal",
    props: withShared([
      {
        name: "newsletter",
        type: "FooterNewsletterConfig",
        description: "Newsletter module rendered as a bento cell.",
      },
    ]),
  },
  {
    slug: "typography",
    componentName: "TypographyFooter",
    fileName: "typography-footer.tsx",
    title: "Typography",
    summary: "A typography-led footer where the oversized wordmark is the primary structure.",
    useCase:
      "Use on brand-forward marketing sites that can spend a viewport on type and still need a complete legal and nav close.",
    category: "creative",
    cli: "typography-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Giant wordmark, then a single instrument row of links",
    layout: "Oversized wrapping logotype with a hairline utility row",
    motion: "Letter color cascade on enter; hover on individual glyphs",
    mobile: "Smaller stacked wordmark, wrapping utility links",
    props: withShared(),
  },
  {
    slug: "accordion",
    componentName: "AccordionFooter",
    fileName: "accordion-footer.tsx",
    title: "Accordion",
    summary: "A mobile-first accordion footer that stays usable when expanded on desktop.",
    useCase:
      "Use when the majority of traffic is mobile and a mega grid would create an excessively long page.",
    category: "saas",
    cli: "accordion-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    informationArchitecture: "Collapsible directories with a persistent brand and legal row",
    layout: "Accordion sections that become a multi-column set on desktop",
    motion: "Height spring on open/close, reduced to instant when requested",
    mobile: "One-open-at-a-time disclosures, full-width newsletter, compact legal",
    props: withShared([
      {
        name: "newsletter",
        type: "FooterNewsletterConfig",
        description: "Optional newsletter shown above the accordion.",
      },
    ]),
  },
  {
    slug: "contextual-cta",
    componentName: "ContextualCtaFooter",
    fileName: "contextual-cta-footer.tsx",
    title: "Contextual CTA",
    summary: "A footer preceded by a large pre-footer conversion experience, then a slim bar.",
    useCase:
      "Use on high-intent marketing pages where the last viewport should convert, and the sitemap can stay secondary.",
    category: "saas",
    cli: "contextual-cta-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Pre-footer CTA experience, then a slim legal/nav bar",
    layout: "Split-color conversion band stacked on a single-row footer",
    motion: "CTA entrance and primary-button shine on hover",
    mobile: "Stacked headline and full-width buttons, then wrapping legal",
    props: withShared([
      {
        name: "cta",
        type: "FooterCtaConfig",
        description: "Pre-footer conversion content and actions.",
      },
    ]),
  },
  {
    slug: "experimental-aurora",
    componentName: "ExperimentalAuroraFooter",
    fileName: "experimental-aurora-footer.tsx",
    title: "Experimental Aurora",
    summary: "A premium experimental footer with a restrained animated atmosphere.",
    useCase:
      "Use on flagship brand pages that can afford atmosphere if it stays quiet, accessible, and content-first.",
    category: "experimental",
    cli: "experimental-aurora-footer",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    informationArchitecture: "Sparse premium directories over a legal row",
    layout: "Centered brand, two link clusters, atmospheric mesh background",
    motion: "Slow gradient drift; static when reduced-motion is requested",
    mobile: "Static mesh, stacked brand, full-width links, legal wrap",
    props: withShared(),
  },
]

export const FOOTER_CATEGORIES: { id: FooterCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "enterprise", label: "Enterprise" },
  { id: "saas", label: "SaaS" },
  { id: "developer", label: "Developer" },
  { id: "fintech", label: "Fintech" },
  { id: "ai", label: "AI" },
  { id: "commerce", label: "Commerce" },
  { id: "security", label: "Security" },
  { id: "creative", label: "Creative" },
  { id: "community", label: "Community" },
  { id: "industry", label: "Industry" },
  { id: "experimental", label: "Experimental" },
]

export function getFooterBySlug(slug: string) {
  return FOOTER_CATALOG.find((entry) => entry.slug === slug)
}
