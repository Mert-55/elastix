import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  ActiveDashboardProvider,
  I18nProvider,
  ThemeProvider,
} from '@/app/providers';
import { SidebarProvider } from '@/common/ui/sidebar';
import { TooltipProvider } from '@/common/ui/tooltip.tsx';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import App from './App.tsx';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nProvider>
        <TooltipProvider>
          <ActiveDashboardProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </ActiveDashboardProvider>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>
);
