import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionCard() {
  return (
    <Accordion
      type="single"
      collapsible
      variant="card"
      className="w-full max-w-lg"
    >
      <AccordionItem value="plans">
        <AccordionTrigger>Can I change plans later?</AccordionTrigger>
        <AccordionContent>
          Yes. Upgrades apply immediately and downgrades take effect at the end
          of the billing period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>How is a seat counted?</AccordionTrigger>
        <AccordionContent>
          A seat is any member who can edit. Viewers and billing contacts are
          free.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invoices">
        <AccordionTrigger>Where do I find invoices?</AccordionTrigger>
        <AccordionContent>
          Every invoice is in billing settings, and a copy is emailed to the
          address on the account.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
