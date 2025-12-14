/**
 * TreeMap Data Types for Customer Segmentation Dashboard
 *
 * API Contract for TreeMap Endpoint
 * ---------------------------------
 * GET /api/v1/segments/treemap
 *
 * Response:
 * {
 *   "timestamp": "2025-12-14T10:30:00Z",
 *   "segments": [
 *     {
 *       "id": "champion",
 *       "name": "Champions",
 *       "value": 125000,
 *       "score": 5,
 *       "customerCount": 450
 *     }
 *   ]
 * }
 */

import type { RFMSegmentIds } from '@/stories/rfm-elasticity/types/RFMSegmentId';

/**
 * Single customer segment data for treemap visualization
 */
export interface SegmentData {
  /** Unique segment identifier */
  id: RFMSegmentIds;
  /** Display name of the segment */
  name: string;
  /** Monetary value (revenue contribution) - determines tile SIZE */
  value: number;
  /** Health score (0-5) - determines tile COLOR */
  score: number;
  /** Number of customers in this segment */
  customerCount: number;
}

/**
 * API Response structure for treemap endpoint
 */
export interface SegmentTreeMapResponse {
  /** ISO-8601 timestamp of data generation */
  timestamp: string;
  /** Array of segment data */
  segments: SegmentData[];
}

/**
 * Nivo TreeMap compatible data structure
 * Nivo expects a hierarchical structure with children array
 */
export interface TreeMapNode {
  id: string;
  name: string;
  value?: number;
  score?: number;
  customerCount?: number;
  children?: TreeMapNode[];
}

/**
 * Transform API response to Nivo TreeMap format
 */
export function transformToTreeMapData(segments: SegmentData[]): TreeMapNode {
  return {
    id: 'root',
    name: 'Customer Segments',
    children: segments.map((segment) => ({
      id: segment.id,
      name: segment.name,
      value: segment.value,
      score: segment.score,
      customerCount: segment.customerCount,
    })),
  };
}

/**
 * Get color for segment based on health score (0-5)
 * Champions to Potential (3-5): Primary-based colors
 * At Risk to Hibernating (1-2): Secondary-based colors
 * Lost (0): Destructive color
 */
export function getSegmentColor(score: number): string {
  const rounded = Math.max(0, Math.min(5, Math.round(score)));

  // Critical state: Lost segment
  if (rounded === 0) return 'var(--destructive)';

  // Champions..Potential (3-5): primary tones.
  // Mix with muted (not background) so the result stays usable in both light & dark.
  if (rounded >= 3) {
    const intensityByScore: Record<number, number> = {
      3: 76,
      4: 84,
      5: 92,
    };
    const intensity = intensityByScore[rounded] ?? 84;
    return `color-mix(in oklab, var(--primary) ${intensity}%, var(--muted) ${100 - intensity}%)`;
  }

  // At Risk..Hibernating (1-2): secondary tones.
  const intensityByScore: Record<number, number> = {
    1: 66,
    2: 78,
  };
  const intensity = intensityByScore[rounded] ?? 72;
  return `color-mix(in oklab, var(--secondary) ${intensity}%, var(--muted) ${100 - intensity}%)`;
}
