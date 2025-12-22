import { useFormatText } from '@/common/hooks/useFormatText';
import {
  resolveTranslatableText,
  type TranslatableText,
} from '@/common/types/TranslatableText';
import { SidebarGroupLabel } from '@/common/ui/sidebar';

export default function SidebarCategoryLabel({
  label,
  ...rest
}: SidebarCategoryLabelProps) {
  if (!label) {
    return null;
  }

  const labelText = useFormatText(resolveTranslatableText(label));

  return <SidebarGroupLabel {...rest}>{labelText}</SidebarGroupLabel>;
}

type SidebarCategoryLabelProps = {
  label?: TranslatableText;
} & React.HTMLAttributes<HTMLDivElement>;
