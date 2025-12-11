import { DashboardIds } from '@/types/DashboardIds';
import { useFormatText } from '@/hooks/useFormatText';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import tokens from '@/constants/tokens';

interface DashboardHeaderProps {
  activeDashboard: DashboardIds;
}

export function DashboardHeader({ activeDashboard }: DashboardHeaderProps) {
  const dashboardTitle = useFormatText({
    id: `dashboard.sidebar.segmentation.${activeDashboard}.title` as any,
  });

  const SidebarControllMenu = () => (
    <div className="inline-flex gap-4">
      <SidebarTrigger />
      <div className="w-px h-6 bg-border" />
      <h1 className="text-lg font-semibold">{dashboardTitle}</h1>
    </div>
  );

  const PreferenceMenu = () => (
    <div className="inline-flex gap-4">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );

  return (
    <header className="flex w-full px-4 py-3 border-b mx-auto justify-center">
      <div
        className={cn(
          tokens.dashboardMaxWidth,
          'flex w-full justify-between  items-baseline'
        )}
      >
        <SidebarControllMenu />
        <PreferenceMenu />
      </div>
    </header>
  );
}
