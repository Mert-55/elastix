import { Button } from '@/common/ui/button';
import { Icon } from '@/common/ui/icon';

export default function DashboardMenuViewMode({
  children,
  onEditClick,
}: DashboardMenuViewModeProps) {
  return (
    <>
      {children}
      <Button
        variant="ghost"
        className="rounded-xl"
        size="icon"
        onClick={onEditClick}
      >
        <Icon name="edit" />
      </Button>
    </>
  );
}

interface DashboardMenuViewModeProps {
  children: React.ReactNode;
  onEditClick: () => void;
}
