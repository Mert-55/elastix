import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

import type { SegmentMetricsDTO } from '../dto';

export type ElasticityMetricsResponse = Record<
  keyof typeof RFMSegmentIds,
  SegmentMetricsDTO
>;
