import { Icon, type IconName } from '@/common/ui/icon';
import { SidebarMenuButton } from '@/common/ui/sidebar';

export default function SidebarBackToSimulationHeader({
  title,
  url,
  icon,
}: SimulationItem) {
  return (
    <SidebarMenuButton asChild>
      <a href={url}>
        <Icon name={icon} />
        <span>{title}</span>
      </a>
    </SidebarMenuButton>
  );
}

export type SimulationItem = {
  title: string;
  icon: IconName;
  url?: string;
};
