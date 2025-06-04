import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/UI/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";

export default function IntroductionPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Spectrum UI</h1>
        <p className="text-xl text-muted-foreground">
          Beautifully designed components built with Aceternity UI ,ShadCN UI
          and MAGIC UI a that you can copy and paste into your apps. Accessible.
          Customizable. Open Source.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/docs/installation">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com/arihantcodes/spectrum-ui">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Introduction</h2>
        <div className="text-muted-foreground space-y-4">
          <p>
            Spectrum UI is a collection of re-usable components built using{" "}
            <Link
              href="https://ui.aceternity.com/"
              className="font-medium underline underline-offset-4"
            >
              Aceternity UI
            </Link>{" "}
            <Link
              href="https://magicui.design/"
              className="font-medium underline underline-offset-4"
            >
              Magic UI
            </Link>{" "}
            and{" "}
            <Link
              href="https://ui.shadcn.com"
              className="font-medium underline underline-offset-4"
            >
              ShadCN UI
            </Link>{" "}
            that you can copy and paste into your apps.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">
                What do you mean by copy and paste?
              </h3>
              <p>
                Spectrum UI is not a component library. It&apos;s a collection
                of re-usable components that you can copy and paste into your
                projects.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">What? Why?</h3>
              <p>
                The goal is to give you a set of beautiful, accessible, and
                customizable components that you can use in your projects. Use
                this as a reference implementation or copy and paste the code
                into your project and customize it to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
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

      {/* Credits Section */}
      <div className="space-y-4 ">
        <h2 className="text-3xl font-bold tracking-tight">Credits</h2>
        <p className="text-muted-foreground gap-4">
          Built with{" "}
          <Link
            href="https://ui.aceternity.com/"
            className="font-medium underline underline-offset-4 mr-2"
          >
            Aceternity UI
          </Link>
          ,{" "}
          <Link
            href="https://magicui.design/"
            className="font-medium underline underline-offset-4"
          >
            Magic UI
          </Link>
          ,{" "}
          <Link
            href="https://ui.shadcn.com"
            className="font-medium underline underline-offset-4"
          >
            ShadCN UI
          </Link>
          ,{" "}
          <Link
            href="https://nextjs.org"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </Link>
          , and{" "}
          <Link
            href="https://www.typescriptlang.org"
            className="font-medium underline underline-offset-4"
          >
            TypeScript
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
