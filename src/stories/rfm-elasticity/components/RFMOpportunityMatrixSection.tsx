import { Accordion } from '@/common/ui/accordion';
import RFMAccordionSection from './RFMAccordionSection';
import OpportunityMatrix from './OpportunityMatrix';
import { useRFMSegment } from '@/app/providers';

/**
 * Volle Breite: Opportunity Matrix Tabelle für das aktive Segment
 */
export default function RFMOpportunityMatrixSection() {
  const { activeSegment } = useRFMSegment();
  return (
    <Accordion
      type="single"
      value="item-opportunity"
      className="md:col-span-7 md:row-span-2 flex min-h-0 flex-col"
    >
      <RFMAccordionSection
        value="item-opportunity"
        titleId="rfm.accordion.opportunity.title"
        className="flex-1 min-h-full"
      >
        <OpportunityMatrix activeSegmentId={activeSegment} />
      </RFMAccordionSection>
    </Accordion>
  );
}
