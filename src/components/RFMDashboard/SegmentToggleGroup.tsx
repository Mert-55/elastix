import { RFMSegmentIds } from '@/types/RFMSegmentId';
import { ToggleGroup } from '../ui/toggle-group';
import SegmentToggleGroupItem from './SegmentToggleGroupItem';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export default function SegmentToggleGroup({
  ...base
}: Omit<ToggleGroupSingleProps, 'type'>) {
  return (
    <ScrollArea
      className="w-full rounded-md border whitespace-nowrap bg-card/10 "
      type="always"
    >
      <ToggleGroup
        type="single"
        orientation="horizontal"
        className="flex w-max py-3"
        defaultValue={RFMSegmentIds.Champion}
        {...base}
      >
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Champion}
          icon="customer-segmentation"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.LoyalCustomers}
          icon="customer-segmentation"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.PotentialLoyalists}
          icon="customer-segmentation"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.AtRisk}
          icon="customer-segmentation"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Hibernating}
          icon="customer-segmentation"
        />
        <SegmentToggleGroupItem
          segmentId={RFMSegmentIds.Lost}
          icon="customer-segmentation"
        />
      </ToggleGroup>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
