import type { RFMSegmentIds } from './RFMSegmentId';

export type RiskLevel = 'low' | 'medium' | 'high';

export const getRiskLevel = (value: number): RiskLevel => {
  if (value < 35) return 'low';
  if (value < 65) return 'medium';
  return 'high';
};

export interface RFMSegmentKPIData {
  segmentId: RFMSegmentIds;
  priceSensitivity: number;
  walletShare: number;
  churnRisk: number;
}

export type RFMSegmentKPIDataMap = Record<RFMSegmentIds, RFMSegmentKPIData>;
