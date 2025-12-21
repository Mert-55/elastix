import { useActiveDashboard } from '@/app/providers';
import { DashboardId } from '@/common/types/DashboardIds';
import { RFMCustomerDashboard } from '@/items/rfm-customer/components';
import { RFMElasticityDashboard } from '@/items/rfm-elasticity/components';
import { SimulationDashboard } from '@/items/simulation/components';
import { Activity } from 'react';
import DashboardHeader from './DashboardHeader';

export default function Dashboard() {
  const ElasticityDashboardWithActivity = () => (
    <WithActivity dashboardId={DashboardId.RFMElasticity}>
      <RFMElasticityDashboard />
    </WithActivity>
  );
  const CustomerDashboardWithActivity = () => (
    <WithActivity dashboardId={DashboardId.RFMCustomer}>
      <RFMCustomerDashboard />
    </WithActivity>
  );
  const SimulationDashboardWithActivity = () => (
    <WithActivity dashboardId={DashboardId.Simulation}>
      <SimulationDashboard />
    </WithActivity>
  );
  return (
    <Root>
      <DashboardHeader />
      <ElasticityDashboardWithActivity />
      <CustomerDashboardWithActivity />
      <SimulationDashboardWithActivity />
    </Root>
  );
}

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen w-full bg-sidebar p-3 overflow-hidden">
      <div className="grid flex-1 min-h-0 w-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-[var(--radius-xl)] border border-sidebar-border bg-background shadow-lg">
        {children}
      </div>
    </div>
  );
};

const WithActivity = ({
  dashboardId,
  children,
}: {
  dashboardId: DashboardId;
  children: React.ReactNode;
}) => {
  const { activeDashboard } = useActiveDashboard();
  const active = dashboardId === activeDashboard ? 'visible' : 'hidden';
  return <Activity mode={active}>{children}</Activity>;
};
