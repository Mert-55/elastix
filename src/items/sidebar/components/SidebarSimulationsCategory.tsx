import { useWithToast } from '@/app/controller/hooks';
import { useSimulationContext } from '@/app/controller/SimulationProvider';
import { useActiveDashboard } from '@/app/providers';
import type { CategoryAction } from '@/common/types';
import { DashboardId } from '@/common/types/DashboardIds';
import { SidebarGroupContent, SidebarMenu } from '@/common/ui/sidebar';
import { SidebarMenuActionItem } from '@/common/ui/SidebarMenuActionItem';
import EditPriceDifferenceDialog from '@/items/sidebar/components/EditPriceDifferenceDialog';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';
import SimulationActionsDropdown from '@/items/sidebar/components/SimulationActionsDropdown';
import StockItemPickerDialog from '@/items/simulation/components/StockItemPickerDialog';
import { useState } from 'react';

export default function SidebarSimulationsCategory() {
  const {
    simulations,
    activeSimulationId,
    setActiveSimulationId,
    isLoading,
    actions,
  } = useSimulationContext();
  const { setActiveDashboard } = useActiveDashboard();
  const { withToast, showSuccess } = useWithToast();

  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [stockPickerOpen, setStockPickerOpen] = useState(false);
  const [targetSimulationId, setTargetSimulationId] = useState<string | null>(
    null
  );

  const targetSimulation = simulations.find((s) => s.id === targetSimulationId);

  const handleAddSimulation = async () => {
    await withToast(
      () =>
        actions.create({
          name: `Untitled Simulation ${simulations.length + 1}`,
          stockItemRef: '',
          priceRange: [-20, 20, 5],
        }) as Promise<{ data: unknown } | { error: unknown }>,
      {
        loading: 'Creating simulation...',
        success: 'Simulation created',
        error: 'Failed to create simulation',
      }
    );
  };

  const handleEditConfig = (simulationId: string) => {
    setTargetSimulationId(simulationId);
    setConfigDialogOpen(true);
  };

  const handleChangeStockItem = (simulationId: string) => {
    setTargetSimulationId(simulationId);
    setStockPickerOpen(true);
  };

  const handleDelete = async (simulationId: string) => {
    await withToast(
      () =>
        actions.remove(simulationId) as Promise<
          { data: unknown } | { error: unknown }
        >,
      {
        loading: 'Deleting simulation...',
        success: 'Simulation deleted',
        error: 'Failed to delete simulation',
      }
    );
    if (activeSimulationId === simulationId) {
      const remaining = simulations.filter((s) => s.id !== simulationId);
      setActiveSimulationId(remaining[0]?.id ?? null);
    }
  };

  const handleSaveConfig = async (settings: {
    lowerBound: number;
    upperBound: number;
    step: number;
  }) => {
    if (targetSimulationId) {
      await withToast(
        () =>
          actions.update({
            simulationId: targetSimulationId,
            priceRange: [
              settings.lowerBound,
              settings.upperBound,
              settings.step,
            ],
          }) as Promise<{ data: unknown } | { error: unknown }>,
        {
          loading: 'Saving configuration...',
          success: 'Configuration saved',
          error: 'Failed to save configuration',
        }
      );
    }
    setConfigDialogOpen(false);
    setTargetSimulationId(null);
  };

  const handleSelectStockItem = async (stockItemRef: string) => {
    if (targetSimulationId && targetSimulation) {
      // Since PUT endpoint doesn't support stockItemRef updates,
      // we create a new simulation with the selected stock item and delete the old one
      try {
        await actions.create({
          name: targetSimulation.name,
          stockItemRef,
          priceRange: [
            targetSimulation.priceRange.from,
            targetSimulation.priceRange.to,
            targetSimulation.priceRange.step,
          ],
          description: targetSimulation.description,
        });
        await actions.remove(targetSimulationId);
        showSuccess('Stock item changed');
      } catch (error) {
        console.error('Failed to update stock item:', error);
      }
    }
    setStockPickerOpen(false);
    setTargetSimulationId(null);
  };

  const simulationsAction: CategoryAction = {
    icon: 'plus',
    label: 'dashboard.sidebar.simulations.add',
    onClick: handleAddSimulation,
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <SidebarGroupCategory
        groupAction={simulationsAction}
        label={simulationsLabel}
      >
        <SidebarGroupContent>
          <SidebarMenu>
            {simulations.map((simulation) => (
              <SidebarMenuActionItem
                key={simulation.id}
                icon="elasticity-segmentation"
                label={simulation.name}
                isActive={activeSimulationId === simulation.id}
                onSelect={() => {
                  setActiveSimulationId(simulation.id);
                  setActiveDashboard(DashboardId.Simulation);
                }}
              >
                <SimulationActionsDropdown
                  onEditConfig={() => handleEditConfig(simulation.id)}
                  onChangeStockItem={() => handleChangeStockItem(simulation.id)}
                  onDelete={() => handleDelete(simulation.id)}
                />
              </SidebarMenuActionItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroupCategory>

      <EditPriceDifferenceDialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        itemName={targetSimulation?.name ?? ''}
        onSave={handleSaveConfig}
        initialSettings={
          targetSimulation
            ? {
                lowerBound: targetSimulation.priceRange.from,
                upperBound: targetSimulation.priceRange.to,
                step: targetSimulation.priceRange.step,
              }
            : undefined
        }
      />

      <StockItemPickerDialog
        open={stockPickerOpen}
        onOpenChange={setStockPickerOpen}
        onSelect={handleSelectStockItem}
      />
    </>
  );
}

const simulationsLabel = 'dashboard.sidebar.simulations.label';
