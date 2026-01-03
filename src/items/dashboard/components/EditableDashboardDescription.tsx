import { useWithToast } from '@/app/controller/hooks';
import { useSimulationContext } from '@/app/controller/SimulationProvider';
import { useActiveDashboard } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import { DashboardId } from '@/common/types/DashboardIds';
import { Button } from '@/common/ui/button';
import { Textarea } from '@/common/ui/textarea';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import { useEffect, useState } from 'react';

export default function EditableDashboardDescription({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const { activeDashboard } = useActiveDashboard();
  const { activeSimulation, actions } = useSimulationContext();
  const { setEditing } = useEditingState();
  const { withToast } = useWithToast();
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const placeholder = useFormatText({
    id: 'dashboard.editable.description.placeholder',
  });
  const saveText = useFormatText({ id: 'common.save' });
  const cancelText = useFormatText({ id: 'common.cancel' });

  // Initialize description from active simulation
  useEffect(() => {
    if (
      isEditing &&
      activeDashboard === DashboardId.Simulation &&
      activeSimulation
    ) {
      setDescription(activeSimulation.description ?? '');
    }
  }, [isEditing, activeDashboard, activeSimulation]);

  const handleSave = async () => {
    if (activeDashboard === DashboardId.Simulation && activeSimulation) {
      setIsSaving(true);

      const result = await withToast(
        () =>
          actions.update({
            simulationId: activeSimulation.id,
            description: description || null,
          }) as Promise<{ data: unknown } | { error: unknown }>,
        {
          loading: 'Saving description...',
          success: 'Description saved',
          error: 'Failed to save description',
        }
      );

      setIsSaving(false);

      if (result.success) {
        setEditing(false);
      }
    } else {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!isEditing) return null;

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Textarea
        className="w-full flex-1 mx-auto rounded-xl resize-none bg-transparent text-sm leading-5 text-foreground/70 placeholder:foreground/40 focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSaving}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
          {cancelText}
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : saveText}
        </Button>
      </div>
    </div>
  );
}
