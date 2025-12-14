import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';

export default function RFMCustomerDashboard() {
  return (
    <main
      className={cn(
        tokens.dashboardMaxWidth,
        'w-full h-full mx-auto px-6 pb-6 grid grid-rows-[1fr_auto] grid-cols-1 gap-4 md:overflow-hidden'
      )}
    >
      <div className="flex items-center justify-center bg-muted-item font-extrabold text-muted-foreground">
        {1}
      </div>
      <div className="flex items-center justify-center bg-muted-item font-extrabold text-muted-foreground">
        {2}
      </div>
    </main>
  );
}
