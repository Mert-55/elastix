import { DashboardId } from '@/common/types/DashboardIds';
import { createContext, useContext, useState } from 'react';

export type ActiveDashboardContextType = {
  activeDashboard: DashboardId;
  setActiveDashboard: (dashboardId: DashboardId) => void;
};

const ActiveDashboardContext = createContext<
  ActiveDashboardContextType | undefined
>(undefined);

type ActiveDashboardProviderProps = {
  initialDashboard?: DashboardId;
  children: React.ReactNode;
};

export function ActiveDashboardProvider({
  initialDashboard = DashboardId.RFMElasticity,
  children,
}: ActiveDashboardProviderProps) {
  const [activeDashboard, setActiveDashboard] =
    useState<DashboardId>(initialDashboard);

  return (
    <ActiveDashboardContext.Provider
      value={{ activeDashboard, setActiveDashboard }}
    >
      {children}
    </ActiveDashboardContext.Provider>
  );
}

export function useActiveDashboard() {
  const context = useContext(ActiveDashboardContext);
  if (context === undefined) {
    throw new Error(
      'useActiveDashboard must be used within a ActiveDashboardProvider'
    );
  }
  return context;
}
