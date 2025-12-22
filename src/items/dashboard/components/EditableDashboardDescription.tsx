import { useFormatText } from '@/common/hooks/useFormatText';
import { Textarea } from '@/common/ui/textarea';

export default function EditableDashboardDescription({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  return isEditing ? (
    <div className="w-full h-full p-1 shadow-xl">
      <Textarea
        className={
          'w-full h-full mx-auto rounded-xl resize-none bg-transparent text-sm leading-5 text-foreground/70 placeholder:foreground/40 focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
        }
        placeholder={useFormatText({
          id: 'dashboard.editable.description.placeholder',
        })}
      />
    </div>
  ) : null;
}
