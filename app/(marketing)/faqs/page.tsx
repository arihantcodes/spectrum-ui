import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container max-w-4xl mx-auto space-y-12 py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about Spectrum UI.
        </p>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full text-left">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is this a component library?</AccordionTrigger>
            <AccordionContent>
              No. Spectrum UI is not a component library. It&apos;s a collection
              of re-usable components that you can copy and paste into your
              projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I use this in my project?</AccordionTrigger>
            <AccordionContent>
              Yes. Free to use for personal and commercial projects. No
              attribution required.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
            <AccordionContent>
              You can use these components in any framework that supports React.
              This includes Next.js, Gatsby, and others.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I use this with JavaScript?</AccordionTrigger>
            <AccordionContent>
              Yes. You can use these components in your JavaScript projects. We
              use TypeScript for type checking and documentation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
