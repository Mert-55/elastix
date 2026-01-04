import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { SegmentTreeResponse } from '@/services/types';

import type { SegmentData } from '../../types/SegmentTreeMapData';

const segmentKeyToId: Record<string, RFMSegmentIds> = {
  Champion: RFMSegmentIds.Champion,
  LoyalCustomers: RFMSegmentIds.LoyalCustomers,
  PotentialLoyalists: RFMSegmentIds.PotentialLoyalists,
  AtRisk: RFMSegmentIds.AtRisk,
  Hibernating: RFMSegmentIds.Hibernating,
  Lost: RFMSegmentIds.Lost,
};

export const mapSegmentTreeFromResponse = (
  response: SegmentTreeResponse
): SegmentData[] =>
  response.items.map((item) => {
    const segmentId = segmentKeyToId[item.segment] ?? RFMSegmentIds.Lost;
    return {
      id: segmentId,
      name: segmentId,
      value: item.value,
      score: item.score,
      customerCount: item.customerCount,
    };
  });
