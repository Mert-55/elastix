import { useDashboardNameValidation } from '@/items/dashboard/hooks/useDashboardNameValidation';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import { useState } from 'react';
import DashboardMenuEditMode from './DashboardMenuEditMode';
import DashboardMenuViewMode from './DashboardMenuViewMode';

export default function EditableDashboardMenuPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEditing, setEditing } = useEditingState();
  const [value, setValue] = useState('');
  const { isValid, message } = useDashboardNameValidation(value);

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
          onSave={() => setEditing(false)}
        />
      )}
    </div>
  );
}
