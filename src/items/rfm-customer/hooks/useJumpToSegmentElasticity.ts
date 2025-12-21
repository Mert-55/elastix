import { useCallback } from 'react';

import { useActiveDashboard } from '@/app/providers';
import { DashboardId } from '@/common/types/DashboardIds';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export function useJumpToSegmentElasticity() {
  const { setActiveDashboard } = useActiveDashboard();

  return useCallback(
    (_targetSegmentId: RFMSegmentIds) => {
      setActiveDashboard(DashboardId.RFMElasticity);
    },
    [setActiveDashboard]
  );
}
