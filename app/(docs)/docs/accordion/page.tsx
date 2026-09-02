import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { AccordionDemo } from "./accordion-demo";
import AccordionCard from "./usage/accordion-card";
import AccordionFilled from "./usage/accordion-filled";
import AccordionGhost from "./usage/accordion-ghost";
import AccordionGenerative from "./usage/accordion-generative";
import Usage from "@/app/(docs)/docs/components/usage";
import { InlineCode } from "@/components/ui/inline-code";
import { P } from "@/components/ui/heading-with-anchor";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content, with four style variants and a streaming answer. A free React and Next.js component built with Radix UI and Tailwind CSS.",
  keywords: [
    "accordion component",
    "React accordion",
    "collapsible component",
    "FAQ component",
    "expandable content",
    "Next.js accordion",
    "accessible accordion",
    "Radix UI accordion",
    "accordion variants",
    "typewriter accordion",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/accordion",
});

const AccordionPage = () => {
  return (
    <SEOWrapper
      componentName="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content, with four style variants and a streaming answer."
      url="https://ui.spectrumhq.in/docs/accordion"
      keywords={[
        "accordion component",
        "React accordion",
        "collapsible component",
        "FAQ component",
        "expandable content",
        "Next.js accordion",
        "accessible accordion",
        "Radix UI accordion",
        "accordion variants",
        "typewriter accordion",
      ]}
    >
      <PageTemplate
        title="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content, with four style variants and a streaming answer."
      >
        <PreviewCodeCard
          path="app/(docs)/docs/accordion/accordion-demo.tsx"
          installCodePath="components/ui/accordion.tsx"
          cli="@spectrumui/accordion"
        >
          {<AccordionDemo />}
        </PreviewCodeCard>

        <PageSubTitle>Variants</PageSubTitle>
        <Usage
          title="Card"
          description={
            <P className="text-muted-foreground">
              <InlineCode>variant=&quot;card&quot;</InlineCode> separates every
              item into its own bordered surface, and the border firms up while
              the panel is open.
            </P>
          }
          path="app/(docs)/docs/accordion/usage/accordion-card.tsx"
          cli="@spectrumui/accordion-card"
        >
          <AccordionCard />
        </Usage>
        <Usage
          title="Filled"
          description={
            <P className="text-muted-foreground">
              <InlineCode>variant=&quot;filled&quot;</InlineCode> drops the
              borders for soft panels. Paired here with{" "}
              <InlineCode>indicator=&quot;plus&quot;</InlineCode>, which morphs
              into a minus on open, and{" "}
              <InlineCode>type=&quot;multiple&quot;</InlineCode> so several
              answers can stay open at once.
            </P>
          }
          path="app/(docs)/docs/accordion/usage/accordion-filled.tsx"
          cli="@spectrumui/accordion-filled"
        >
          <AccordionFilled />
        </Usage>
        <Usage
          title="Ghost"
          description={
            <P className="text-muted-foreground">
              <InlineCode>variant=&quot;ghost&quot;</InlineCode> removes every
              surface and rule, leaving the text to carry the structure — useful
              inside a page that already has its own frame.
            </P>
          }
          path="app/(docs)/docs/accordion/usage/accordion-ghost.tsx"
          cli="@spectrumui/accordion-ghost"
        >
          <AccordionGhost />
        </Usage>
        <Usage
          title="Generating answer"
          description={
            <P className="text-muted-foreground">
              <InlineCode>AccordionStreamingContent</InlineCode> types the
              answer out the way a model writes it. The panel opens to the
              height of the finished text, so nothing below it shifts as the
              words arrive, and screen readers get the complete answer rather
              than one character at a time. Tune it with{" "}
              <InlineCode>speed</InlineCode> and{" "}
              <InlineCode>startDelay</InlineCode>.
            </P>
          }
          path="app/(docs)/docs/accordion/usage/accordion-generative.tsx"
          cli="@spectrumui/accordion-generative"
        >
          <AccordionGenerative />
        </Usage>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default AccordionPage;
