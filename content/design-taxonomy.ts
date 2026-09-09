/**
 * Spectrum Design — sections and category taxonomy.
 *
 * This is the single source of truth for /design routing and its SEO copy.
 * It lives in code rather than the database on purpose: category pages are the
 * primary organic-traffic engine, so every one of them must be statically
 * generatable and must render its intro copy even when the gallery is empty or
 * Supabase is unreachable. Items reference these slugs as text[].
 *
 * Intro copy is 150-250 words per the content plan and must stay unique per
 * page — it is the indexable body of a category route.
 */

export type DesignSectionSlug =
  | "feed"
  | "websites"
  | "og-images"
  | "app-screenshots"
  | "app-icons"
  | "showcase";

export type DesignLayout = "masonry" | "uniform" | "icons";

export interface DesignCategory {
  slug: string;
  name: string;
  /** Indexable intro copy for /design/<section>/c/<slug>. */
  intro: string;
}

export interface DesignSection {
  slug: DesignSectionSlug;
  /** Route path. The main feed lives at /design, the rest are nested. */
  path: string;
  name: string;
  /** One-line description shown in the page header and used as meta description. */
  description: string;
  layout: DesignLayout;
  /** Fixed aspect ratio for uniform grids; null lets masonry use intrinsic size. */
  aspectRatio: number | null;
  categories: DesignCategory[];
}

const cat = (slug: string, name: string, intro: string): DesignCategory => ({
  slug,
  name,
  intro,
});

export const DESIGN_SECTIONS: DesignSection[] = [
  {
    slug: "feed",
    path: "/design",
    name: "Design Inspiration",
    description:
      "A curated feed of interface, product and motion design worth studying.",
    layout: "masonry",
    aspectRatio: null,
    categories: [
      cat(
        "web",
        "Web",
        "Web design inspiration collected from products and studios shipping real work. Each entry links back to the original source so you can study the live implementation rather than a static export. Look for how layout systems hold up across breakpoints, where designers spend their type budget, and which interactions survive contact with production. The strongest web work tends to be quiet: a considered grid, restrained colour, and one or two moments of motion placed where they carry meaning. Use this as a reference library when you are stuck on structure, not just surface.",
      ),
      cat(
        "interface",
        "Interface",
        "Interface design inspiration focused on the dense, working parts of software: tables, forms, settings, empty states and navigation. These are the screens users actually live in, and they reward craft that never shows up in a hero shot. Pay attention to how spacing establishes hierarchy without borders, how disabled and loading states are handled, and where designers chose a boring pattern because it was the correct one. Every item links to its source and is tagged with the Spectrum UI components that could rebuild it.",
      ),
      cat(
        "branding",
        "Branding",
        "Brand and identity design inspiration: wordmarks, logo systems, colour palettes and the typographic rules that hold them together. Strong identity work reads at every size and survives being reproduced badly, so look at how these marks behave when they are small, monochrome or moving. The best systems here define a small number of decisions precisely rather than a large number loosely. Useful when you are establishing a visual language for a product and need to see how others resolved the same constraints.",
      ),
      cat(
        "product",
        "Product",
        "Product design inspiration showing complete flows rather than isolated screens: onboarding, checkout, upgrade paths and the transitions between them. Individual screens are easy; sequences are where design gets hard, because state has to persist and the user has to stay oriented. Study where these flows reduce steps, where they deliberately add friction, and how they communicate progress. Each item is attributed to its original creator and links back to the source post.",
      ),
      cat(
        "typography",
        "Typography",
        "Typography inspiration for interfaces and editorial layouts: type scales, pairings, optical sizing and the spacing decisions that make text comfortable to read. Most interface typography fails in the same few ways — line length too long, leading too tight, too many weights — so it is worth studying work that gets the fundamentals right before reaching for anything expressive. Look at how these examples handle numerals, long strings and small sizes, which is where type systems usually break.",
      ),
      cat(
        "motion",
        "Motion",
        "Motion design inspiration for interfaces: transitions, micro-interactions, loading states and gesture-driven animation. Good motion is usually invisible — it explains where something came from and where it went, and it gets out of the way. Watch the timing and easing rather than the effect: most of the quality in these examples comes from durations under 300ms and curves that decelerate. Note also which of them respect reduced-motion, because that is the difference between polish and an accessibility problem.",
      ),
      cat(
        "illustration",
        "Illustration",
        "Illustration inspiration for product surfaces: empty states, onboarding, error pages and marketing sites. Product illustration has a harder job than editorial illustration because it has to carry a house style across dozens of scenes and still render legibly at small sizes. Study how these systems constrain palette and line weight so that new scenes can be drawn later without redesigning the whole set.",
      ),
      cat(
        "3d",
        "3D",
        "3D design inspiration for interfaces and marketing: rendered product shots, spatial scenes and real-time WebGL work. Look at how lighting and material choices carry hierarchy, and at where the 3D is doing real communicative work rather than decoration. For anything real-time, the interesting constraint is budget — how much fidelity survives once it has to run at 60fps on a mid-range laptop.",
      ),
      cat(
        "editorial",
        "Editorial",
        "Editorial design inspiration: long-form layouts, article typography, pull quotes and the pacing of text and image. Editorial work is a useful corrective to interface design because it optimises for sustained reading rather than task completion. Study measure, leading and the vertical rhythm between elements, then note how little decoration the best examples need.",
      ),
    ],
  },
  {
    slug: "websites",
    path: "/design/websites",
    name: "Websites",
    description: "Full-page screenshots of websites worth studying.",
    layout: "uniform",
    aspectRatio: 16 / 10,
    categories: [
      cat("ai", "AI", "Website design inspiration from AI products and research labs. This category moves fast and the conventions are still forming, which makes it a useful place to watch positioning problems get solved in public: how to explain a model, how to demo something non-deterministic, and how to build trust around output quality. Note how many of these sites lead with an interactive demo rather than a description."),
      cat("saas", "SaaS", "SaaS website design inspiration: landing pages, pricing, feature tours and docs entry points. The job is consistently the same — explain a product quickly to someone who arrived from a link — so the differences in approach are instructive. Look at how pricing pages handle tier comparison, and how feature sections avoid becoming an undifferentiated wall of cards."),
      cat("agency", "Agency", "Agency and studio website inspiration, where the site is itself the portfolio piece. These tend to push further on motion and layout than product sites can afford to, so they are a good place to find techniques worth borrowing selectively. Watch for how case studies are structured, which is usually the hardest content problem an agency site has."),
      cat("portfolio", "Portfolio", "Personal portfolio design inspiration from designers and engineers. The constraint here is that the work has to speak while the site stays out of the way, and the best examples resolve that with restraint rather than novelty. Useful for seeing how people sequence projects and write about their own contribution."),
      cat("ecommerce", "Ecommerce", "Ecommerce website inspiration: product pages, collection grids, cart and checkout. Conversion pressure makes this category unusually rigorous — most decisions here have been tested. Study how imagery is cropped and sequenced, how variant selection is handled, and how much information is deferred rather than shown."),
      cat("startup", "Startup", "Early-stage startup website inspiration. These sites are usually built fast under real constraints, which makes them a realistic reference for small teams. Look at how they establish credibility without a customer logo wall, and how they handle a product that is still changing weekly."),
      cat("finance", "Finance", "Fintech and finance website inspiration, where trust and clarity dominate every other consideration. Numbers, security signals and regulatory copy all have to be legible without making the page feel like a disclosure document. Watch how these sites use restraint and tabular figures to feel precise."),
    ],
  },
  {
    slug: "og-images",
    path: "/design/og-images",
    name: "OG Images",
    description: "Open Graph cards that actually earn the click.",
    layout: "uniform",
    aspectRatio: 1.91,
    categories: [
      cat("saas", "SaaS", "Open Graph card inspiration from SaaS products. An OG image gets read at thumbnail size in a crowded feed, so the entire design problem is legibility under compression. The examples that work commit to one message and set it large; the ones that fail try to reproduce the landing page. Note how many use a consistent template so that every shared URL reinforces the same identity."),
      cat("editorial", "Editorial", "Editorial and blog OG card inspiration. These have to carry a headline of unpredictable length, which makes them a type-setting problem more than a layout one. Study how the strongest examples handle long titles without shrinking text into illegibility, and how author and publication are given just enough presence."),
      cat("developer-tools", "Developer Tools", "OG cards from developer tools and open source projects. This category leans on monospace, terminal motifs and code fragments, which read well at small sizes because of their strong horizontal rhythm. Useful reference if you are generating cards dynamically and need a template that survives arbitrary repo names."),
    ],
  },
  {
    slug: "app-screenshots",
    path: "/design/app-screenshots",
    name: "App Screenshots",
    description: "App Store screenshot sets and the stories they tell.",
    layout: "uniform",
    aspectRatio: 9 / 19.5,
    categories: [
      cat("productivity", "Productivity", "App Store screenshot inspiration from productivity apps. A screenshot set is a five-panel pitch seen mostly by people swiping fast, so sequencing matters more than any individual frame. Study which apps lead with the outcome rather than the interface, and how captions carry the argument when the UI alone cannot."),
      cat("health", "Health", "Health and fitness app screenshot inspiration. These sets have to communicate progress and habit over time, which is hard to show in static frames. Look at how data visualisation is simplified for the store listing, and how tone is set through colour and photography."),
      cat("finance", "Finance", "Finance app screenshot inspiration. Trust is the whole job here, and it is usually established through precision: aligned figures, restrained colour, and screens that look like they were photographed rather than illustrated. Note how sensitive data is plausibly faked without looking fake."),
    ],
  },
  {
    slug: "app-icons",
    path: "/design/app-icons",
    name: "App Icons",
    description: "iOS and macOS icons, studied at the size they are actually seen.",
    layout: "icons",
    aspectRatio: 1,
    categories: [
      cat("productivity", "Productivity", "Productivity app icon inspiration. An icon is read at roughly 60 pixels on a crowded home screen, so it has to resolve to a single recognisable shape and one dominant colour. The best examples here would still be identifiable as a silhouette. Study how few elements the strongest icons contain."),
      cat("social", "Social", "Social app icon inspiration. This category competes hardest for recognition, which pushes designs toward bold single glyphs and saturated brand colour. Useful for seeing how a mark stays distinct when every competitor is reaching for the same visual strategy."),
      cat("developer", "Developer", "Developer tool icon inspiration. These skew toward abstract marks, terminal references and monochrome palettes, and they often need to work on both light and dark system backgrounds. Note how depth is used sparingly to keep them legible at small sizes."),
    ],
  },
  {
    slug: "showcase",
    path: "/design/showcase",
    name: "Built with Spectrum",
    description: "Real products shipped with Spectrum UI components.",
    layout: "masonry",
    aspectRatio: null,
    categories: [
      cat("saas", "SaaS", "SaaS products built with Spectrum UI. Each case study lists the components used and links straight to their documentation with copy-paste install commands, so you can go from a screenshot you like to the source in one step. This is the part of the gallery no other inspiration site can reproduce: the work and the building blocks are in the same place."),
      cat("ai", "AI", "AI products built with Spectrum UI, many of them using the AI Assistants block set. Useful for seeing how the streaming, reasoning-trace and tool-call surfaces behave inside a real product rather than a demo. Every entry links to the components that back it."),
      cat("portfolio", "Portfolio", "Personal sites and portfolios built with Spectrum UI. These tend to use the animated and motion components most heavily, which makes them a good reference for how much motion is too much. Each links to the components used."),
    ],
  },
];

export const DESIGN_SECTION_MAP = new Map(
  DESIGN_SECTIONS.map((s) => [s.slug, s]),
);

export function findDesignSection(slug: string): DesignSection | undefined {
  return DESIGN_SECTION_MAP.get(slug as DesignSectionSlug);
}

export function findDesignCategory(
  section: DesignSectionSlug,
  categorySlug: string,
): DesignCategory | undefined {
  return DESIGN_SECTION_MAP.get(section)?.categories.find(
    (c) => c.slug === categorySlug,
  );
}

/** Route for a category page. Real routes, never query strings — this is the SEO engine. */
export function designCategoryPath(
  section: DesignSection,
  categorySlug: string,
): string {
  return section.slug === "feed"
    ? `/design/c/${categorySlug}`
    : `${section.path}/c/${categorySlug}`;
}

/** Facet vocabulary. Cross-cuts every section; used for filtering, not routing. */
export const DESIGN_FACETS = {
  style: ["minimal", "playful", "brutalist", "abstract", "editorial", "retro"],
  color: ["dark", "light", "gradient", "monochrome", "vivid", "pastel"],
  interaction: ["transitions", "scroll", "hover", "drag", "3d", "parallax"],
} as const;
