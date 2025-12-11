import { BaseDashboard, Sidebar } from '@/components';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardIds } from '@/types/DashboardIds';

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
