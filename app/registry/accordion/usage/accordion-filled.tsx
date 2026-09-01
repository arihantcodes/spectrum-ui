import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionFilled() {
  return (
    <Accordion
      type="multiple"
      variant="filled"
      indicator="plus"
      defaultValue={["shipping"]}
      className="w-full max-w-lg"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Orders leave the warehouse within two business days and arrive in
          three to seven, depending on the destination.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Unopened items can go back within 30 days. We cover return postage on
          anything that arrived damaged.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          Two years against manufacturing defects, transferable if the product
          changes hands.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
