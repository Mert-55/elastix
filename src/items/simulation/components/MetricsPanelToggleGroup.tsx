import { useFormatText } from '@/common/hooks/useFormatText';
import { Icon } from '@/common/ui/icon';
import { ToggleGroup, ToggleGroupItem } from '@/common/ui/toggle-group';
import type { MetricsMode } from '@/items/simulation/types';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

type MetricsPanelToggleGroupProps = Omit<
  ToggleGroupSingleProps,
  'type' | 'value' | 'onValueChange'
> & {
  value: MetricsMode;
  onValueChange: (value: MetricsMode) => void;
};

export default function MetricsPanelToggleGroup({
  value,
  onValueChange,
  ...restProps
}: MetricsPanelToggleGroupProps) {
  const revenueLabel = useFormatText({
    id: 'simulation.metricsPanel.tabs.revenue.label',
  });
  const quantityLabel = useFormatText({
    id: 'simulation.metricsPanel.tabs.quantity.label',
  });

  const handleValueChange = (newValue: string) => {
    // Prevent deselection - only update if a valid value is selected
    if (newValue === 'revenue' || newValue === 'quantity') {
      onValueChange(newValue);
    }
  };

  return (
    <ToggleGroup
      type="single"
      orientation="horizontal"
      className="flex w-max py-4"
      value={value}
      onValueChange={handleValueChange}
      {...restProps}
    >
      <ToggleGroupItem
        value="revenue"
        aria-label={`Toggle ${revenueLabel}`}
        className="min-w-[140px] justify-center whitespace-nowrap data-[state=on]:[&_svg]:fill-primary-foreground data-[state=on]:[&_svg]:stroke-primary-foreground"
        asChild
      >
        <span className="flex items-center gap-2">
          <Icon name="percent" />
          {revenueLabel}
        </span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="quantity"
        aria-label={`Toggle ${quantityLabel}`}
        className="min-w-[140px] justify-center whitespace-nowrap data-[state=on]:[&_svg]:fill-primary-foreground data-[state=on]:[&_svg]:stroke-primary-foreground"
        asChild
      >
        <span className="flex items-center gap-2">
          <Icon name="boxes" />
          {quantityLabel}
        </span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
