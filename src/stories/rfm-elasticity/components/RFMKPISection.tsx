import { useRFMSegment } from '@/app/providers';
import { Accordion } from '@/common/ui/accordion';
import { DashboardAccordionSection } from '../../dashboard/components';
import SegmentKPIOverview from './SegmentKPIOverview';

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
      <DashboardAccordionSection
        value="item-kpi"
        titleId="rfm.accordion.kpi.title"
        titleValues={{ segment: segmentName ?? '' }}
      >
        <SegmentKPIOverview activeSegmentId={activeSegment} />
      </DashboardAccordionSection>
    </Accordion>
  );
}
