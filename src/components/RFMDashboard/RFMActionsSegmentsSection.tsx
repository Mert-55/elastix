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
      defaultValue={['item-actions', 'item-segments']}
      className="md:col-span-3"
    >
      <div>
        <RFMAccordionSection
          value="item-actions"
          titleId="rfm.accordion.action.title"
        >
          <RFMSimulationActionItem />
        </RFMAccordionSection>

        <RFMAccordionSection
          value="item-segments"
          titleId="rfm.accordion.segments.title"
        >
          <SegmentToggleGroup
            value={activeSegment}
            onValueChange={(val) => {
              if (!val) return;
              setActiveSegment(val as RFMSegmentIds);
            }}
          />
        </RFMAccordionSection>
      </div>
    </Accordion>
  );
}
