import { Card, CardContent } from '@/common/ui/card';
import { Skeleton } from '@/common/ui/skeleton';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import { useSegmentTreeMap } from '../controller';
import SegmentTreeMap from './SegmentTreeMap';

function TreeMapSkeleton() {
  return (
    <div className="w-full h-[300px] p-4">
      <div className="flex gap-2 h-full">
        <Skeleton className="flex-[3] h-full rounded-xl" />
        <div className="flex-[2] flex flex-col gap-2">
          <Skeleton className="flex-1 rounded-xl" />
          <Skeleton className="flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function RFMCustomerTreeMapAccordionItem() {
  const { segments, isLoading } = useSegmentTreeMap();

  return (
    <DashboardAccordionSection
      titleTranslatable="rfm.customer.tree-map.title"
      icon="customer-segmentation"
      value="segment-tree-map"
    >
      <Card>
        <CardContent className="flex items-center justify-center text-muted-foreground">
          {isLoading ? (
            <TreeMapSkeleton />
          ) : (
            <SegmentTreeMap
              data={segments}
              onSegmentClick={(segment) =>
                console.log(`Segment clicked: ${segment.name} (${segment.id})`)
              }
            />
          )}
        </CardContent>
      </Card>
    </DashboardAccordionSection>
  );
}
