import { DashboardIds } from '@/types/DashboardIds';
import { RFMSegmentProvider } from '@/providers';

import { DashboardHeader } from './BaseDashboardHeader';
import RFMDashboard from './RFMDashboard/RFMDashboard';

export default function BaseDashboard({
  activeDashboard,
  // onSelectDashboard,
}: BaseDashboardProps) {
  return (
    <div className="w-full">
      <DashboardHeader activeDashboard={activeDashboard} />
      <RFMSegmentProvider>
        <RFMDashboard />
      </RFMSegmentProvider>
    </div>
  );
}

export type BaseDashboardProps = {
  activeDashboard: DashboardIds;
  onSelectDashboard: (id: DashboardIds) => void;
};
