import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  {
    value: "install",
    title: "Install the package",
    body: "Run the CLI command, then import the accordion from your components directory.",
  },
  {
    value: "compose",
    title: "Compose the items",
    body: "Each item takes a trigger and a panel. Values must be unique inside one accordion.",
  },
  {
    value: "theme",
    title: "Theme it",
    body: "Pick a variant, then adjust the Tailwind classes in the copied source to match your tokens.",
  },
];

export default function AccordionGhost() {
  return (
    <Accordion
      type="single"
      collapsible
      variant="ghost"
      indicator="plus"
      className="w-full max-w-lg"
    >
      {sections.map((section, index) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="w-4 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-7">{section.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
