import { useCallback } from 'react';

import { useActiveDashboard, useRFMSegment } from '@/app/providers';
import { DashboardId } from '@/common/types/DashboardIds';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export function useJumpToSegmentElasticity() {
  const { setActiveDashboard } = useActiveDashboard();
  const { setActiveSegment } = useRFMSegment();

  return useCallback(
    (targetSegmentId: RFMSegmentIds) => {
      setActiveSegment(targetSegmentId);
      setActiveDashboard(DashboardId.RFMElasticity);
    },
    [setActiveDashboard, setActiveSegment]
  );
}
