import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { cn } from '@/common/lib/utils';

export default function MetricsDisplay({
  currentValue,
  lowerBound,
  upperBound,
}: MetricsDisplayProps) {
  const isDecrease = currentValue < 0;
  const labelId: MessageId = isDecrease
    ? 'simulation.metricsPanel.slider.priceDecrease.label'
    : 'simulation.metricsPanel.slider.priceIncrease.label';

  const valueLabel = useFormatText({ id: labelId });
  const rangeLabel = useFormatText({
    id: 'simulation.metricsPanel.slider.priceRange.label',
    values: { fromNumber: lowerBound, toNumber: upperBound },
  });

  return (
    <div className="flex flex-col items-start py-2">
      <span className="font-thin">
        <span
          className={cn(
            'font-bold text-primary',
            isDecrease && 'text-destructive'
          )}
        >
          {currentValue}%{'\t'}
        </span>
        {valueLabel}
      </span>
      <span className="font-mono text-secondary-foreground">{rangeLabel}</span>
    </div>
  );
}

type MetricsDisplayProps = {
  currentValue: number;
  lowerBound: number;
  upperBound: number;
};
