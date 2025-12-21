import { SidebarTrigger } from '@/common/ui/sidebar';
import DashboardTitle from './DashboardTitle';

export default function DashboardHeaderMenu() {
  return (
    <div className="flex inline-flex items-center gap-4">
      <SidebarTrigger />
      <div className="w-px h-6 bg-border" />
      <DashboardTitle />
    </div>
  );
}
