import { useMemo } from 'react';

import {
  getRFMSegmentById,
  type RFMSegmentIds,
} from '@/items/rfm-elasticity/types/RFMSegmentId';
import { useGetElasticityMetricsQuery } from '@/services/hostApi';

import { mapSegmentKPIFromResponse } from './mappers/segmentKPIMapper';

export const useSegmentKPIOverview = (
  activeSegmentId: RFMSegmentIds | null
) => {
  const { data, isLoading, error } = useGetElasticityMetricsQuery();

  const kpiData = useMemo(() => {
    if (!activeSegmentId || !data) return null;
    const segmentKey = getRFMSegmentById(activeSegmentId);
    return mapSegmentKPIFromResponse(
      data,
      segmentKey as keyof typeof RFMSegmentIds
    );
  }, [data, activeSegmentId]);

  return { kpiData, isLoading, error };
};
