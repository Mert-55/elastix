import { Card, CardContent } from '@/common/ui/card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import { mockSegmentData } from '../model/mockSegmentData';
import SegmentTreeMap from './SegmentTreeMap';

export default function RFMCustomerTreeMapAccordionItem() {
  return (
    <DashboardAccordionSection
      titleId="rfm.customer.tree-map.title"
      icon="customer-segmentation"
      value="segment-tree-map"
    >
      <Card>
        <CardContent className="flex items-center justify-center text-muted-foreground">
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
