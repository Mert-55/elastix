import { useActiveDashboard } from '@/app/providers';
import { DashboardId } from '@/common/types/DashboardIds';
import { useDashboardNameValidation } from '@/items/dashboard/hooks/useDashboardNameValidation';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import { useSimulationContext } from '@/items/simulation/controller/SimulationProvider';
import { useEffect, useState } from 'react';
import DashboardMenuEditMode from './DashboardMenuEditMode';
import DashboardMenuViewMode from './DashboardMenuViewMode';

export default function EditableDashboardMenuPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeDashboard } = useActiveDashboard();
  const { activeSimulation, actions } = useSimulationContext();
  const { isEditing, setEditing } = useEditingState();
  const [value, setValue] = useState('');
  const { isValid, message } = useDashboardNameValidation(value);

  // Initialize value from active simulation when editing starts
  useEffect(() => {
    if (
      isEditing &&
      activeDashboard === DashboardId.Simulation &&
      activeSimulation
    ) {
      setValue(activeSimulation.name);
    }
  }, [isEditing, activeDashboard, activeSimulation]);

  const handleSave = async () => {
    if (
      activeDashboard === DashboardId.Simulation &&
      activeSimulation &&
      isValid
    ) {
      await actions.update({
        simulationId: activeSimulation.id,
        name: value,
      });
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      {!isEditing ? (
        <DashboardMenuViewMode onEditClick={() => setEditing(true)}>
          {children}
        </DashboardMenuViewMode>
      ) : (
        <DashboardMenuEditMode
          value={value}
          onChange={setValue}
          isValid={isValid}
          validationMessage={message}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
