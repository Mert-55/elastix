import SegmentAreaChartLinearGradiant from '@/items/rfm-customer/components/SegmentAreaChart/SegmentAreaChartLinearGradiant';
import { getColorBySegmentId } from '@/items/rfm-customer/config/areaChartConfig';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

/**
 * Container for all gradient definitions used in the area chart
 * Generates one gradient per RFM segment
 */
export default function SegmentAreaChartLinearGradiantDefs() {
  return (
    <defs>
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.Champion}
        segmentColor={getColorBySegmentId(RFMSegmentIds.Champion)}
      />
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.LoyalCustomers}
        segmentColor={getColorBySegmentId(RFMSegmentIds.LoyalCustomers)}
      />
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.PotentialLoyalists}
        segmentColor={getColorBySegmentId(RFMSegmentIds.PotentialLoyalists)}
      />
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.AtRisk}
        segmentColor={getColorBySegmentId(RFMSegmentIds.AtRisk)}
      />
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.Hibernating}
        segmentColor={getColorBySegmentId(RFMSegmentIds.Hibernating)}
      />
      <SegmentAreaChartLinearGradiant
        fillRFMSegmentId={RFMSegmentIds.Lost}
        segmentColor={getColorBySegmentId(RFMSegmentIds.Lost)}
      />
    </defs>
  );
}
