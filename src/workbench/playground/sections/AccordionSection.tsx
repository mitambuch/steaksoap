import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/Accordion';

import { Section, SubLabel } from '../shared';

export function AccordionSection() {
  return (
    <Section number="14" title="accordion / faq">
      <div className="space-y-8">
        <div>
          <SubLabel>single mode (one open at a time)</SubLabel>
          <div className="border-border/50 rounded-lg border px-5">
            <Accordion type="single" defaultOpen="faq-1">
              <AccordionItem value="faq-1">
                <AccordionTrigger>How does the accordion work?</AccordionTrigger>
                <AccordionContent>
                  In single mode, only one item can be open at a time. Clicking another item
                  automatically closes the current one. Use type=&quot;single&quot; for FAQ-style
                  content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I customize the animation?</AccordionTrigger>
                <AccordionContent>
                  Yes. The open/close animation uses CSS grid-rows transition. Adjust the duration
                  in the Accordion component or override with className.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Fully. Uses aria-expanded, aria-controls, and keyboard navigation. Press Enter or
                  Space to toggle, Tab to move between triggers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div>
          <SubLabel>multiple mode (many open)</SubLabel>
          <div className="border-border/50 rounded-lg border px-5">
            <Accordion type="multiple" defaultOpen={['multi-1', 'multi-2']}>
              <AccordionItem value="multi-1">
                <AccordionTrigger>First section</AccordionTrigger>
                <AccordionContent>Multiple items can be open simultaneously.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="multi-2">
                <AccordionTrigger>Second section</AccordionTrigger>
                <AccordionContent>
                  This one starts open too. Try clicking the first.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="multi-3">
                <AccordionTrigger>Third section</AccordionTrigger>
                <AccordionContent>Independent of the others.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Section>
  );
}
