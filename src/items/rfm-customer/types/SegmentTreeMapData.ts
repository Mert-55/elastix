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

import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

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

  // 🔴 0: Lost (Kritisch)
  // Grau/Muted, sehr transparent, um nicht zu sehr abzulenken, aber sichtbar "inaktiv".
  if (rounded === 0) {
    return 'var(--muted)';
  }

  // 🟢 5: Champions (Der Anker)
  // Volle Kraft Primary. Keine Transparenz. Das stärkste Element im Chart.
  if (rounded === 5) {
    return 'var(--primary)';
  }

  // 🟢 4: Potential / Loyal
  // Wir mischen 20% Accent hinzu. Das unterscheidet es von Score 5,
  // bleibt aber "voll" und deckend.
  if (rounded === 4) {
    return 'color-mix(in srgb, var(--chart-4), var(--accent) 20%)';
  }

  // 🟡 3: Promising
  // Hier startet der "Fade". Wir mischen 40% Transparenz hinzu.
  // Die Farbe ist noch deutlich erkennbar, aber "leichter".
  if (rounded === 3) {
    return 'color-mix(in srgb, var(--chart-3), transparent 40%)';
  }

  // 🟠 2: At Risk
  // Deutlich transparenter (60% transparent).
  // Das signalisiert visuell: "Diese Gruppe verblasst".
  if (rounded === 2) {
    return 'color-mix(in srgb, var(--destructive), transparent 70%)';
  }

  // 🟠 1: Hibernating
  // Ghost-Mode. 85% transparent. Man sieht nur einen Hauch von Farbe.
  // Wirkt modern und drängt sich nicht auf.
  return 'color-mix(in srgb, var(--chart-2), transparent 85%)';
}
