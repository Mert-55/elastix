import { useMemo } from 'react';

import { useGetSegmentTreeQuery } from '@/services/hostApi';

import type { SegmentData } from '../types/SegmentTreeMapData';
import { mapSegmentTreeFromResponse } from './mappers';

export const useSegmentTreeMap = () => {
  const { data, isLoading, error } = useGetSegmentTreeQuery();

  const segments: SegmentData[] = useMemo(
    () => (data ? mapSegmentTreeFromResponse(data) : []),
    [data]
  );

  return { segments, isLoading, error };
};
