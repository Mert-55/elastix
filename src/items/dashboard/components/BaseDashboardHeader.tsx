import { useFormatText } from '@/common/hooks/useFormatText';
import { SidebarTrigger } from '@/common/ui/sidebar';

import tokens from '@/app/config/tokens';
import { useActiveDashboard } from '@/app/providers';
import { cn } from '@/common/lib/utils';
import { LanguageSelector } from '@/common/ui/LanguageSelector';
import { ThemeToggle } from '@/common/ui/ThemeToggle';

export default function BaseDashboardHeader() {
  const { activeDashboard } = useActiveDashboard();
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
    <div className="flex inline-flex gap-4">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );

  return (
    <header
      className={'col-span-1 w-full px-4 py-3 border-b px-auto items-center'}
    >
      <div
        className={cn(
          tokens.dashboardMaxWidth,
          'flex w-full justify-between items-baseline mx-auto'
        )}
      >
        <SidebarControllMenu />
        <PreferenceMenu />
      </div>
    </header>
  );
}
