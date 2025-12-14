import { useRFMSegment } from '@/app/providers';
import { Accordion } from '@/common/ui/accordion';
import { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';
import { DashboardAccordionSection } from '../../dashboard/components';
import RFMSimulationActionItem from './RFMSimulationActionItem';
import SegmentToggleGroup from './SegmentToggleGroup';

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
        <DashboardAccordionSection
          value="item-actions"
          titleId="rfm.accordion.action.title"
        >
          <RFMSimulationActionItem />
        </DashboardAccordionSection>

        <DashboardAccordionSection
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
        </DashboardAccordionSection>
      </div>
    </Accordion>
  );
}
