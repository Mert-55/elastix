import { Card, CardContent } from '@/common/ui/card';
import { DashboardAccordionSection } from '@/stories/dashboard/components';
import { mockSegmentData } from '../model/mockSegmentData';
import SegmentTreeMap from './SegmentTreeMap';

export default function RFMCustomerTreeMapAccordionItem() {
  return (
    <DashboardAccordionSection
      titleId="rfm.customer.treemap.title"
      icon="customer-segmentation"
      value="segment-treemap"
    >
      <Card>
        <CardContent className="flex items-center justify-center h-[calc(100%-2rem)] text-muted-foreground">
          <SegmentTreeMap
            data={mockSegmentData}
            onSegmentClick={(segment) =>
              console.log(`Segment clicked: ${segment.name} (${segment.id})`)
            }
          />
        </CardContent>
      </Card>
    </DashboardAccordionSection>
  );
}
