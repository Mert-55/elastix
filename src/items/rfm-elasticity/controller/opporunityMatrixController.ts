import { useEffect, useMemo, useState } from 'react';

import { useGetStockItemsQuery } from '@/services/hostApi';

import type { OpportunityMatrixItem } from '../types/OpportunityMatrixItem';
import { getRFMSegmentById, type RFMSegmentIds } from '../types/RFMSegmentId';
import { mapStockItemsToOpportunityMatrix } from './mappers';

const PAGE_SIZE = 10;

export const useOpportunityMatrix = (activeSegmentId: RFMSegmentIds | null) => {
  const [page, setPage] = useState(0);

  const segmentKey = activeSegmentId
    ? getRFMSegmentById(activeSegmentId)
    : undefined;

  useEffect(() => {
    setPage(0);
  }, [activeSegmentId]);

  const { data, isLoading, isFetching, error } = useGetStockItemsQuery(
    {
      segmentFilter: segmentKey as keyof typeof RFMSegmentIds,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
    { skip: !activeSegmentId }
  );

  const items: OpportunityMatrixItem[] = useMemo(
    () => (data?.items ? mapStockItemsToOpportunityMatrix(data.items) : []),
    [data]
  );

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const nextPage = () =>
    !isFetching && setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => !isFetching && setPage((p) => Math.max(p - 1, 0));
  const goToPage = (p: number) =>
    !isFetching && setPage(Math.max(0, Math.min(p, totalPages - 1)));

  return {
    items,
    page,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    hasNext: page < totalPages - 1,
    hasPrev: page > 0,
    isLoading,
    isFetching,
    error,
  };
};
