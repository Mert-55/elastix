import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

/**
 * Data node for segment area chart
 * Contains customer count or revenue values for each RFM segment at a specific date
 */
export type SegmentAreaChartNode = {
  /** Champion segment value */
  [RFMSegmentIds.Champion]: number;
  /** Loyal customers segment value */
  [RFMSegmentIds.LoyalCustomers]: number;
  /** Potential loyalists segment value */
  [RFMSegmentIds.PotentialLoyalists]: number;
  /** At risk segment value */
  [RFMSegmentIds.AtRisk]: number;
  /** Hibernating segment value */
  [RFMSegmentIds.Hibernating]: number;
  /** Lost customers segment value */
  [RFMSegmentIds.Lost]: number;
  /** Date in MM/DD/YYYY format */
  date: string;
};
