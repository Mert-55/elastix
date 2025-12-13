import { DashboardIds } from '@/common/types/DashboardIds';
import { SidebarProvider } from '@/common/ui/sidebar';
import { BaseDashboard } from '@/stories/dashboard/components';
import { Sidebar } from '@/stories/sidebar/components';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar />
      <BaseDashboard
        activeDashboard={DashboardIds.RFM}
        onSelectDashboard={(id) => console.log(id)}
      />
    </SidebarProvider>
  );
}
