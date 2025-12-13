import { Accordion } from '../ui/accordion';
import RFMAccordionSection from './RFMAccordionSection';
import SegmentKPIOverview from './SegmentKPIOverview';
import { useRFMSegment } from '@/providers';

export interface RFMKPISectionProps {
  segmentName: string | null;
}

/**
 * Rechte Spalte des Dashboards: KPI-Übersicht für das aktive Segment
 */
export default function RFMKPISection({ segmentName }: RFMKPISectionProps) {
  const { activeSegment } = useRFMSegment();
  return (
    <Accordion
      type="multiple"
      className="md:col-span-4 min-h-0"
      defaultValue={['item-kpi']}
    >
      <RFMAccordionSection
        value="item-kpi"
        titleId="rfm.accordion.kpi.title"
        titleValues={{ segment: segmentName ?? '' }}
      >
        <SegmentKPIOverview activeSegmentId={activeSegment} />
      </RFMAccordionSection>
    </Accordion>
  );
}
