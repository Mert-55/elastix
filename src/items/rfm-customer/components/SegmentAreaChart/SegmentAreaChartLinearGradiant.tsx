import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

interface SegmentAreaChartLinearGradientProps {
  /** RFM segment ID used as gradient definition ID */
  fillRFMSegmentId: RFMSegmentIds;
  /** Segment color from chart config */
  segmentColor: string;
}

/**
 * Linear gradient definition for segment area fill
 * Creates a vertical gradient from 80% opacity at top to 10% at bottom
 */
export default function SegmentAreaChartLinearGradiant({
  fillRFMSegmentId,
  segmentColor,
}: SegmentAreaChartLinearGradientProps) {
  return (
    <linearGradient id={fillRFMSegmentId} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={segmentColor} stopOpacity={0.8} />
      <stop offset="95%" stopColor={segmentColor} stopOpacity={0.1} />
    </linearGradient>
  );
}
