import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';
import DashboardHeaderMenu from './DashboardHeaderMenu';
import DashboardPreferences from './DashboardPreferences';

export default function DashboardHeader() {
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
        <DashboardHeaderMenu />
        <DashboardPreferences />
      </div>
    </header>
  );
}
