import { DashboardIds } from '@/types/DashboardIds';

import { DashboardHeader } from './DashboardHeader';

export default function Dashboard({
  activeDashboard,
  onSelectDashboard,
}: DashboardProps) {
  return (
    <main className="w-full">
      <DashboardHeader activeDashboard={activeDashboard} />
    </main>
  );
}

export type DashboardProps = {
  activeDashboard: DashboardIds;
  onSelectDashboard: (id: DashboardIds) => void;
};
