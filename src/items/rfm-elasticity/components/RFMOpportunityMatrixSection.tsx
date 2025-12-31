import { useRFMSegment } from '@/app/providers';
import { Accordion } from '@/common/ui/accordion';
import { DashboardAccordionSection } from '../../dashboard/components';
import OpportunityMatrix from './OpportunityMatrix';

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
      <DashboardAccordionSection
        value="item-opportunity"
        titleTranslatable="rfm.accordion.opportunity.title"
        className="flex-1 min-h-full"
      >
        <OpportunityMatrix activeSegmentId={activeSegment} />
      </DashboardAccordionSection>
    </Accordion>
  );
}
