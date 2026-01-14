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

/**
 * Maps segment types to their corresponding health scores (0-5).
 * Champions are healthiest (5), Lost are lowest (0).
 */
const segmentToScore: Record<RFMSegmentIds, number> = {
  [RFMSegmentIds.Champion]: 5,
  [RFMSegmentIds.LoyalCustomers]: 4,
  [RFMSegmentIds.PotentialLoyalists]: 3,
  [RFMSegmentIds.AtRisk]: 2,
  [RFMSegmentIds.Hibernating]: 1,
  [RFMSegmentIds.Lost]: 0,
};

export const mapSegmentTreeFromResponse = (
  response: SegmentTreeResponse
): SegmentData[] =>
  response.items.map((item) => {
    const segmentId = segmentKeyToId[item.segment] ?? RFMSegmentIds.Lost;
    // Use segment-based score instead of API score (which may be elasticity value)
    const healthScore = segmentToScore[segmentId];
    return {
      id: segmentId,
      name: segmentId,
      value: item.value,
      score: healthScore,
      customerCount: item.customerCount,
    };
  });
