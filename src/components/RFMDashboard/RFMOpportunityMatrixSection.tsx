import { Accordion } from '../ui/accordion';
import RFMAccordionSection from './RFMAccordionSection';
import OpportunityMatrix from './OpportunityMatrix';
import { useRFMSegment } from '@/providers';

/**
 * Volle Breite: Opportunity Matrix Tabelle für das aktive Segment
 */
export default function RFMOpportunityMatrixSection() {
  const { activeSegment } = useRFMSegment();
  return (
    <Accordion
      type="multiple"
      className="col-span-7"
      defaultValue={['item-opportunity']}
    >
      <RFMAccordionSection
        value="item-opportunity"
        titleId="rfm-dashboard.accordion.opportunity.title"
      >
        <OpportunityMatrix activeSegmentId={activeSegment} />
      </RFMAccordionSection>
    </Accordion>
  );
}
