import { ActiveDashboardProvider } from '@/app/providers/ActiveDashboardProvider';
import { I18nProvider } from '@/app/providers/I18nProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SidebarProvider } from '@/common/ui/sidebar';
import { Toaster } from '@/common/ui/sonner';
import { TooltipProvider } from '@/common/ui/tooltip';
import { SimulationProvider } from '@/items/simulation/controller/SimulationProvider';
import { PriceSimulationProvider } from '@/items/simulation/hooks/PriceSimulationProvider';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nProvider>
        <TooltipProvider>
          <SimulationProvider>
            <ActiveDashboardProvider>
              <PriceSimulationProvider>
                <SidebarProvider>
                  {children}
                  <Toaster position="bottom-right" richColors closeButton />
                </SidebarProvider>
              </PriceSimulationProvider>
            </ActiveDashboardProvider>
          </SimulationProvider>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default AppProvider;
