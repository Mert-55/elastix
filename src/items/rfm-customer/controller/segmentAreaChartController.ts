import { useMemo } from 'react';

import { useGetRevenueTimeSeriesQuery } from '@/services/hostApi';

import type { SegmentAreaChartNode } from '../types/SegmentAreaChartNode';
import { mapAreaChartFromResponse } from './mappers';

export const useSegmentAreaChart = () => {
  const { data, isLoading, error } = useGetRevenueTimeSeriesQuery();

  const chartData: SegmentAreaChartNode[] = useMemo(
    () => (data ? mapAreaChartFromResponse(data) : []),
    [data]
  );

  return { chartData, isLoading, error };
};
