import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { RFMSegmentKPIData } from '@/items/rfm-elasticity/types/RFMSegmentKPIData';
import type { ElasticityMetricsResponse } from '@/services/types';

export const mapSegmentKPIFromResponse = (
  response: ElasticityMetricsResponse,
  segmentKey: keyof typeof RFMSegmentIds
): RFMSegmentKPIData => {
  const metrics = response[segmentKey];
  return {
    segmentId: RFMSegmentIds[segmentKey],
    priceSensitivity: metrics.priceSensitivity,
    walletShare: metrics.walletShare,
    churnRisk: metrics.churnRisk,
  };
};
