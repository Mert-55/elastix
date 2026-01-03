import { ActiveDashboardProvider } from '@/app/providers/ActiveDashboardProvider';
import { I18nProvider } from '@/app/providers/I18nProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SidebarProvider } from '@/common/ui/sidebar';
import { TooltipProvider } from '@/common/ui/tooltip';
import { PriceSimulationProvider } from '@/items/simulation/hooks/PriceSimulationProvider';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nProvider>
        <TooltipProvider>
          <ActiveDashboardProvider>
            <PriceSimulationProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </PriceSimulationProvider>
          </ActiveDashboardProvider>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default AppProvider;
