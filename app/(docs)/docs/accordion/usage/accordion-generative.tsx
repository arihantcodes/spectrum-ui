import { Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionStreamingContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

const answers = [
  {
    value: "what",
    question: "What does this component do?",
    answer:
      "It streams the answer in one character at a time, the way a model writes it. The panel opens to the height of the finished text first, so nothing below it jumps while the words arrive.",
  },
  {
    value: "how",
    question: "How is the effect built?",
    answer:
      "A timer reveals a growing slice of the string while a caret trails the last character. The full text sits underneath at zero visibility to reserve the space, and it is the copy a screen reader reads.",
  },
  {
    value: "speed",
    question: "Can I change the pace?",
    answer:
      "Yes. Set speed for milliseconds per character and startDelay for the pause before the first word. Punctuation adds a beat on its own, and a reduced-motion preference skips straight to the finished answer.",
  },
];

export default function AccordionGenerative() {
  return (
    <Accordion
      type="single"
      collapsible
      variant="card"
      className="w-full max-w-lg"
    >
      {answers.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <Sparkles
                aria-hidden="true"
                className="size-4 shrink-0 text-violet-500 dark:text-violet-400"
                strokeWidth={2}
              />
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionStreamingContent text={item.answer} speed={12} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
