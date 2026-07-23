import { ROUTES } from "./routes-config";

/**
 * SEO utility functions for Spectrum UI
 */

// Component categories for better organization and SEO
export const componentCategories = {
  layout: ["Container", "Grid", "Stack", "Flex"],
  navigation: ["Navbar", "Sidebar", "Breadcrumb", "Pagination", "Tabs"],
  input: ["Button", "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Slider", "Multiple Selector", "Floating Label Input", "Datetime Picker"],
  display: ["Card", "Table", "List", "Avatar", "Badge", "Tooltip", "Accordion", "Event Calendar"],
  feedback: ["Alert", "Toast", "Progress", "Spinner", "Skeleton", "Loading Button"],
  overlay: ["Modal", "Drawer", "Popover", "Dropdown", "Responsive Modal"],
  media: ["Image", "Video", "Gallery", "Image Preview"],
  advanced: ["Infinite Scroll", "Animated Chart", "Animated Testimonials", "MultiStep Form"],
};

// Get related components based on category
export function getRelatedComponents(componentName: string): Array<{ label: string; url: string }> {
  const related: Array<{ label: string; url: string }> = [];
  
  // Find which category the component belongs to
  for (const [category, components] of Object.entries(componentCategories)) {
    if (components.some(c => c.toLowerCase().includes(componentName.toLowerCase()))) {
      // Get other components in the same category
      const relatedNames = components.filter(c => 
        !c.toLowerCase().includes(componentName.toLowerCase())
      ).slice(0, 3);
      
      // Find URLs from routes
      for (const group of ROUTES) {
        if (group.groupKey === "components") {
          for (const child of group.children) {
            if (relatedNames.some(name => 
              child.label.toLowerCase().includes(name.toLowerCase())
            )) {
              related.push({ label: child.label, url: child.url });
            }
          }
        }
      }
      break;
    }
  }
  
  return related.slice(0, 4);
}

// Generate structured data for components
export function generateComponentStructuredData(component: {
  name: string;
  description: string;
  category?: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${component.name} - React Component`,
    description: component.description,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    codeRepository: "https://github.com/arihantcodes/spectrum-ui",
    author: {
      "@type": "Person",
      name: "Arihant Jain",
      url: "https://ui.spectrumhq.in",
    },
    about: {
      "@type": "Thing",
      name: component.category || "UI Component",
    },
    keywords: [
      component.name,
      "React component",
      "UI component",
      "Tailwind CSS",
      "Next.js",
      ...(component.features || []),
    ].join(", "),
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Component metadata templates for common use cases
export const componentMetadataTemplates = {
  button: {
    keywords: ["button component", "React button", "interactive button", "custom button styles", "click events"],
    category: "input",
  },
  card: {
    keywords: ["card component", "React card", "content container", "card layout", "card design"],
    category: "display",
  },
  modal: {
    keywords: ["modal component", "dialog", "popup", "overlay", "modal window"],
    category: "overlay",
  },
  input: {
    keywords: ["input component", "form input", "text field", "user input", "form control"],
    category: "input",
  },
  accordion: {
    keywords: ["accordion component", "collapsible content", "expandable panel", "FAQ component"],
    category: "display",
  },
  navbar: {
    keywords: ["navigation bar", "header component", "menu", "responsive navigation"],
    category: "navigation",
  },
  // Add more templates as needed
};

// Get component-specific keywords
export function getComponentKeywords(componentName: string): string[] {
  const normalizedName = componentName.toLowerCase().replace(/\s+/g, "-");
  const template = componentMetadataTemplates[normalizedName as keyof typeof componentMetadataTemplates];
  
  const baseKeywords = [
    `${componentName} component`,
    `React ${componentName}`,
    `${componentName} example`,
    `how to use ${componentName}`,
    `${componentName} tutorial`,
  ];
  
  return template?.keywords ? [...baseKeywords, ...template.keywords] : baseKeywords;
}

// Generate SEO-friendly description
export function generateSEODescription(component: {
  name: string;
  shortDescription?: string;
}): string {
  const base = `Learn how to use the ${component.name} component in React. ${component.shortDescription || ''} Built with Tailwind CSS and fully accessible.`;
  return `${base} Copy, paste, and customize for your Next.js applications. Free and open source.`;
}

export function toIsoDate(value: string) {
  const hasNamedMonth = /^[A-Za-z]{3,9}\s+\d{1,2},\s+\d{4}$/.test(value);
  const parsedDate = new Date(hasNamedMonth ? `${value} UTC` : value);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
}

// Generate blog post structured data
export function generateBlogStructuredData(blogPost: {
  title: string;
  description: string;
  author: { name: string; avatar?: string };
  datePublished: string;
  url: string;
  image: string;
  category: string;
}) {
  const datePublished = toIsoDate(blogPost.datePublished) ?? blogPost.datePublished;

  return {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "TechArticle"],
    headline: blogPost.title,
    description: blogPost.description,
    image: blogPost.image,
    url: blogPost.url,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: blogPost.author.name,
      image: blogPost.author.avatar || "https://ui.spectrumhq.in/arihant.jpeg",
      url: "https://ui.spectrumhq.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Spectrum UI",
      url: "https://ui.spectrumhq.in",
      logo: {
        "@type": "ImageObject",
        url: "https://ui.spectrumhq.in/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogPost.url,
    },
    articleSection: blogPost.category,
    keywords: [
      "UI components",
      "React components",
      "Tailwind CSS",
      "Next.js",
      "shadcn/ui",
      "design system",
      "frontend development",
      "web development",
      "UI/UX",
      "component library",
      blogPost.category.toLowerCase(),
    ],
    about: {
      "@type": "Thing",
      name: "UI Component Development",
    },
    mentions: [
      {
        "@type": "SoftwareApplication",
        name: "React",
        url: "https://reactjs.org",
      },
      {
        "@type": "SoftwareApplication", 
        name: "Next.js",
        url: "https://nextjs.org",
      },
      {
        "@type": "SoftwareApplication",
        name: "Tailwind CSS",
        url: "https://tailwindcss.com",
      },
    ],
  };
}

// Generate blog breadcrumb structured data
export function generateBlogBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate blog listing structured data
export function generateBlogListingStructuredData(posts: Array<{
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author: { name: string };
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Spectrum UI Blog",
    description: "Learn about UI components, React development, and design systems with Spectrum UI",
    url: "https://ui.spectrumhq.in/blog",
    publisher: {
      "@type": "Organization",
      name: "Spectrum UI",
      url: "https://ui.spectrumhq.in",
      logo: {
        "@type": "ImageObject",
        url: "https://ui.spectrumhq.in/logo.svg",
      },
    },
    blogPost: posts.map(post => ({
      "@type": ["BlogPosting", "TechArticle"],
      headline: post.title,
      description: post.description,
      url: post.url,
      datePublished: toIsoDate(post.datePublished) ?? post.datePublished,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };
}
