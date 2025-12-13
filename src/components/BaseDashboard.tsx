import { DashboardIds } from '@/types/DashboardIds';
import { RFMSegmentProvider } from '@/providers';

import { DashboardHeader } from './BaseDashboardHeader';
import RFMDashboard from './RFMDashboard/RFMDashboard';

function BaseDashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-screen w-full bg-sidebar p-3 overflow-hidden">
      <div className="grid flex-1 min-h-0 w-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-[var(--radius-xl)] border border-sidebar-border bg-background shadow-lg">
        <RFMSegmentProvider>{children}</RFMSegmentProvider>
      </div>
    </div>
  );
}

export default function BaseDashboard({
  activeDashboard,
  // onSelectDashboard,
}: BaseDashboardProps) {
  return (
    <BaseDashboardWrapper>
      <DashboardHeader activeDashboard={activeDashboard} />
      <RFMDashboard />
    </BaseDashboardWrapper>
  );
}

export type BaseDashboardProps = {
  activeDashboard: DashboardIds;
  onSelectDashboard: (id: DashboardIds) => void;
};
