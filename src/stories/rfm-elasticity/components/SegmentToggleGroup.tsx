import { ScrollArea, ScrollBar } from '@/common/ui/scroll-area';
import { ToggleGroup } from '@/common/ui/toggle-group';
import { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import SegmentToggleGroupItem from './SegmentToggleGroupItem';

export default function SegmentToggleGroup({
  ...base
}: Omit<ToggleGroupSingleProps, 'type'>) {
  return (
    <ScrollArea className="w-full rounded-md whitespace-nowrap" type="always">
      <ToggleGroup
        type="single"
        orientation="horizontal"
        className="flex w-max py-3"
        defaultValue={RFMSegmentIds.Champion}
        {...base}
      >
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Champion}
          icon="star"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.LoyalCustomers}
          icon="heart"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.PotentialLoyalists}
          icon="bow-arrow"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.AtRisk}
          icon="shield-alert"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Hibernating}
          icon="moon"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Lost}
          icon="heart-off"
        />
      </ToggleGroup>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
