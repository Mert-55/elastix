import type { ChartConfig } from '@/common/ui/chart';
import type { IconName } from '@/common/ui/icon';
import { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';

/**
 * ChartConfig for TreeMap segments
 * Maps segment IDs to their display configuration
 */
export const chartConfig = {
  value: {
    label: undefined,
  },
  customerCount: {
    label: undefined,
  },
  score: {
    label: undefined,
  },
} satisfies ChartConfig;

/**
 * Border radius for TreeMap tiles (matching --radius-xl)
 */
export const TREEMAP_RADIUS = 4;

/**
 * Label skip size threshold - tiles smaller than this won't show labels
 * Set to 0 to show all labels regardless of tile size
 */
export const LABEL_SKIP_SIZE = 0;

/**
 * Maps segment IDs to their corresponding icon names
 */
export const segmentIconMap: Record<string, IconName> = {
  [RFMSegmentIds.Champion]: 'star',
  [RFMSegmentIds.LoyalCustomers]: 'heart',
  [RFMSegmentIds.PotentialLoyalists]: 'bow-arrow',
  [RFMSegmentIds.AtRisk]: 'shield-alert',
  [RFMSegmentIds.Hibernating]: 'moon',
  [RFMSegmentIds.Lost]: 'heart-off',
};
