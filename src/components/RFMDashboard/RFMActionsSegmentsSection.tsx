import { Accordion } from '../ui/accordion';
import RFMAccordionSection from './RFMAccordionSection';
import { RFMSimulationActionItem } from './RFMSimulationActionItem';
import SegmentToggleGroup from './SegmentToggleGroup';
import { RFMSegmentIds } from '@/types/RFMSegmentId';
import { useRFMSegment } from '@/providers';

/**
 * Linke Spalte des Dashboards: Actions und Segment-Auswahl
 */
export default function RFMActionsSegmentsSection() {
  const { activeSegment, setActiveSegment } = useRFMSegment();
  return (
    <Accordion
      type="multiple"
      className="col-span-3 row-span-1"
      defaultValue={['item-actions', 'item-segments']}
    >
      <RFMAccordionSection
        value="item-actions"
        titleId="rfm-dashboard.accordion.action.title"
      >
        <RFMSimulationActionItem />
      </RFMAccordionSection>

      <RFMAccordionSection
        value="item-segments"
        titleId="rfm-dashboard.accordion.segments.title"
      >
        <SegmentToggleGroup
          defaultValue={activeSegment}
          onValueChange={(val) => {
            if (!val) return;
            setActiveSegment(val as RFMSegmentIds);
          }}
        />
      </RFMAccordionSection>
    </Accordion>
  );
}
