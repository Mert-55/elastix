import {
  ActiveDashboardProvider,
  RFMSegmentProvider,
  useActiveDashboard,
} from '@/app/providers';
import { DashboardId } from '@/common/types/DashboardIds';
import { RFMCustomerDashboard } from '@/stories/rfm-customer/components';
import { RFMElasticityDashboard } from '@/stories/rfm-elasticity/components';
import { Activity } from 'react';
import BaseDashboardHeader from './BaseDashboardHeader';

function BaseDashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-screen w-full bg-sidebar p-3 overflow-hidden">
      <div className="grid flex-1 min-h-0 w-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-[var(--radius-xl)] border border-sidebar-border bg-background shadow-lg">
        <RFMSegmentProvider>
          <ActiveDashboardProvider>{children}</ActiveDashboardProvider>
        </RFMSegmentProvider>
      </div>
    </div>
  );
}

export default function BaseDashboard() {
  const { activeDashboard } = useActiveDashboard();

  const RFMElasticityDashboardWithActivity = () => (
    <Activity
      mode={getDashboardActivityMode(
        DashboardId.RFMElasticity,
        activeDashboard
      )}
    >
      <RFMElasticityDashboard />
    </Activity>
  );

  const RFMCustomeDashboardWithActivity = () => (
    <Activity
      mode={getDashboardActivityMode(DashboardId.RFMCustomer, activeDashboard)}
    >
      <RFMCustomerDashboard />
    </Activity>
  );

  return (
    <BaseDashboardWrapper>
      <BaseDashboardHeader />
      <RFMElasticityDashboardWithActivity />
      <RFMCustomeDashboardWithActivity />
    </BaseDashboardWrapper>
  );
}

const getDashboardActivityMode = (
  dashboardId: DashboardId,
  activeDashboard: DashboardId
) => (dashboardId === activeDashboard ? 'visible' : 'hidden');
