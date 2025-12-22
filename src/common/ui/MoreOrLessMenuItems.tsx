import { useFormatText } from '@/common/hooks/useFormatText';
import { Icon } from '@/common/ui/icon';
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/common/ui/sidebar';

export function MoreOrLessMenuItems({
  hiddenItemsCount,
  viewMore,
  onModeChange,
}: {
  hiddenItemsCount: number;
  viewMore: boolean;
  onModeChange: () => void;
}) {
  const MenuItem = ({
    withBadge,
    children,
  }: {
    withBadge?: boolean;
    children: React.ReactNode;
  }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="text-sidebar-foreground/70"
        onClick={onModeChange}
      >
        {children}
      </SidebarMenuButton>
      {withBadge && (
        <SidebarMenuBadge className="bg-accent text-accent-foreground rounded-xl font-mono">
          +{hiddenItemsCount}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );

  const More = () => {
    const moreLabel = useFormatText({ id: 'common.more' });
    return (
      <MenuItem withBadge>
        <Icon name="more-horizontal" className="text-sidebar-foreground/70" />
        {moreLabel}
      </MenuItem>
    );
  };

  const Less = () => {
    const showLessLabel = useFormatText({ id: 'common.showLess' });
    return (
      <MenuItem>
        <Icon name="show-less" className="text-sidebar-foreground/70" />
        {showLessLabel}
      </MenuItem>
    );
  };

  return !viewMore ? <More /> : <Less />;
}
