import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { SegmentData } from '../types/SegmentTreeMapData';

/**
 * Mock data for RFM Customer Segments
 *
 * Realistic e-commerce customer segmentation data:
 * - Champions: High-value, frequent buyers
 * - Loyal Customers: Consistent purchasers
 * - Potential Loyalists: Recent customers with growth potential
 * - At Risk: Previously active, declining engagement
 * - Hibernating: Inactive for extended period
 * - Lost: No recent activity, low recovery chance
 */
export const mockSegmentData: SegmentData[] = [
  {
    id: RFMSegmentIds.Champion,
    name: RFMSegmentIds.Champion,
    value: 125000, // 125k revenue
    score: 5,
    customerCount: 450,
  },
  {
    id: RFMSegmentIds.LoyalCustomers,
    name: RFMSegmentIds.LoyalCustomers,
    value: 89000, // 89k revenue
    score: 4,
    customerCount: 820,
  },
  {
    id: RFMSegmentIds.PotentialLoyalists,
    name: RFMSegmentIds.PotentialLoyalists,
    value: 45000, // 45k revenue
    score: 4,
    customerCount: 1200,
  },
  {
    id: RFMSegmentIds.AtRisk,
    name: RFMSegmentIds.AtRisk,
    value: 62000, // 62k revenue
    score: 2,
    customerCount: 680,
  },
  {
    id: RFMSegmentIds.Hibernating,
    name: RFMSegmentIds.Hibernating,
    value: 28000, // 28k revenue
    score: 1,
    customerCount: 1500,
  },
  {
    id: RFMSegmentIds.Lost,
    name: RFMSegmentIds.Lost,
    value: 15000, // 15k revenue
    score: 0,
    customerCount: 2100,
  },
];
