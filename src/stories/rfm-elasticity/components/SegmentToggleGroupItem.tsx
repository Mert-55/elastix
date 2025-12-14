import { useFormatText } from '@/common/hooks/useFormatText';
import { Icon, type IconName } from '@/common/ui/icon';
import { OptionalTooltip } from '@/common/ui/OptionalTooltip';
import { ToggleGroupItem } from '@/common/ui/toggle-group';
import type { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';
import type { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';

export default function SegmentToggleGroupItem({
  segmentId,
  icon,
  ...rest
}: SegmentToggleGroup) {
  const text = useFormatText({ id: `${segmentId}.text` });
  const tooltip = useFormatText({ id: `${segmentId}.tooltip` });

  return (
    <OptionalTooltip tooltip={tooltip} suppressAsChild>
      <ToggleGroupItem
        value={segmentId}
        aria-label={`Toggle ${text}`}
        className="min-w-[140px] justify-center whitespace-nowrap data-[state=on]:[&_svg]:fill-primary-foreground data-[state=on]:[&_svg]:stroke-primary-foreground"
        asChild
        {...rest}
      >
        <span className="flex items-center gap-2">
          <Icon name={icon} />
          {text}
        </span>
      </ToggleGroupItem>
    </OptionalTooltip>
  );
}

export type SegmentToggleGroup = {
  segmentId: RFMSegmentIds;
  icon: IconName;
} & Omit<ToggleGroupItemProps, 'value'>;

//    <OptionalTooltip tooltip={useFormatText({ id: `${segmentId}.tooltip` })}> </OptionalTooltip>
