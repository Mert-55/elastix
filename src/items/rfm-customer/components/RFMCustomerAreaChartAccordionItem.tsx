import { Card, CardContent } from '@/common/ui/card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import RFMAreaChart from '@/items/rfm-customer/components/SegmentAreaChart/SegmentAreaChart';

export default function RFMCustomerAreaChartAccordionItem() {
  return (
    <DashboardAccordionSection
      titleId="rfm.customer.area-chart.title"
      icon="revenue-segmentation"
      value="customer-area-chart"
    >
      <Card>
        <CardContent className="flex items-center justify-center text-muted-foreground">
          <RFMAreaChart />
        </CardContent>
      </Card>
    </DashboardAccordionSection>
  );
}
