import { useFormatText } from '@/common/hooks/useFormatText';
import type { CategoryAction } from '@/common/types/CategoryAction';
import { resolveTranslatableText } from '@/common/types/TranslatableText';
import { Icon } from '@/common/ui/icon';
import { OptionalTooltip } from '@/common/ui/OptionalTooltip';
import { SidebarGroupAction } from '@/common/ui/sidebar';

export default function SidebarCategoryAction({
  action,
}: SidebarCategoryActionProps) {
  return (
    <OptionalTooltip
      tooltip={
        action.label
          ? useFormatText(resolveTranslatableText(action.label))
          : undefined
      }
    >
      <SidebarGroupAction
        onClick={action.onClick}
        className="bg-accent/40 font-mono"
      >
        <Icon
          name={action.icon}
          className="text-primary bg-primary/10 rounded-xl"
        />
      </SidebarGroupAction>
    </OptionalTooltip>
  );
}

type SidebarCategoryActionProps = {
  action: CategoryAction;
};
