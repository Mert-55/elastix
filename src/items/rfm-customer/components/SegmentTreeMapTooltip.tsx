import { useIntl } from 'react-intl';

import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { cn } from '@/common/lib/utils';
import {
  ChartProvider,
  ChartTooltipContent,
  type ChartConfig,
} from '@/common/ui/chart';
import { Icon, type IconName } from '@/common/ui/icon';

import { getSegmentColor } from '../types/SegmentTreeMapData';

export interface SegmentTreeMapTooltipProps {
  config: ChartConfig;
  segmentIcon?: IconName;
  name: string;
  value: number;
  score?: number;
  customerCount?: number;
  className?: string;
}

/**
 * Custom Tooltip for TreeMap segments
 * Styled exactly like shadcn/ui ChartTooltipContent
 * Shows segment name, revenue, customer count, and health score
 */
export function SegmentTreeMapTooltip({
  config,
  segmentIcon,
  name,
  value,
  score,
  customerCount,
  className,
}: SegmentTreeMapTooltipProps) {
  const intl = useIntl();

  const revenueLabel = useFormatText({ id: 'rfm.customer.tooltip.revenue' });
  const customersLabel = useFormatText({
    id: 'rfm.customer.tooltip.customers',
  });
  const healthLabel = useFormatText({ id: 'rfm.customer.tooltip.health' });

  const indicatorColor =
    score !== undefined ? getSegmentColor(score) : 'var(--muted)';

  const scoreLabelId = score !== undefined ? getScoreLabelId(score) : undefined;
  const scoreLabel = scoreLabelId
    ? useFormatText({ id: scoreLabelId })
    : undefined;
  const scoreValue =
    score !== undefined && scoreLabel
      ? `${scoreLabel} (${score}/5)`
      : undefined;

  const formattedRevenue = intl.formatNumber(Number(value), {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const formattedCustomerCount =
    customerCount !== undefined
      ? intl.formatNumber(Number(customerCount), {
          maximumFractionDigits: 0,
        })
      : undefined;

  // Recharts-like payload so ChartTooltipContent can render it.
  // NOTE: set name/dataKey to config keys, so ChartTooltipContent can map labels.
  const payload: Array<any> = [
    {
      name: 'value',
      dataKey: 'value',
      value: formattedRevenue,
      color: indicatorColor,
      payload: { fill: indicatorColor },
    },
    ...(customerCount !== undefined
      ? [
          {
            name: 'customerCount',
            dataKey: 'customerCount',
            value: formattedCustomerCount,
            color: indicatorColor,
            payload: { fill: indicatorColor },
          },
        ]
      : []),
    ...(scoreValue !== undefined
      ? [
          {
            name: 'score',
            dataKey: 'score',
            value: scoreValue,
            color: indicatorColor,
            payload: { fill: indicatorColor },
          },
        ]
      : []),
  ];

  const configWithLabels: ChartConfig = {
    ...config,
    value: { ...config.value, label: revenueLabel },
    customerCount: { ...config.customerCount, label: customersLabel },
    score: { ...config.score, label: healthLabel },
  };

  return (
    <ChartProvider config={configWithLabels}>
      <ChartTooltipContent
        active={true}
        className={cn(
          'min-w-[14rem] max-w-[22rem] [&_.tabular-nums]:whitespace-nowrap [&_.tabular-nums]:text-right',
          className
        )}
        indicator="dot"
        cursor={false}
        label={name}
        labelFormatter={(label) => (
          <span className="inline-flex items-center gap-2">
            {segmentIcon ? <Icon name={segmentIcon} size={16} /> : null}
            {label}
          </span>
        )}
        payload={payload}
      />
    </ChartProvider>
  );
}

/**
 * Convert numeric score to human-readable label
 */
function getScoreLabelId(score: number): MessageId {
  // NOTE: This is kept as a pure helper. Display strings are resolved via i18n
  // in the calling scope.
  const keyMap: Record<number, MessageId> = {
    5: 'rfm.customer.score.excellent',
    4: 'rfm.customer.score.good',
    3: 'rfm.customer.score.average',
    2: 'rfm.customer.score.belowAverage',
    1: 'rfm.customer.score.poor',
    0: 'rfm.customer.score.critical',
  };

  return keyMap[Math.round(score)] || 'rfm.customer.score.unknown';
}
