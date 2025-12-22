import type { IconName } from '@/common/ui/icon';
import type { TranslatableText } from './TranslatableText';

export type CategoryAction = {
  label?: TranslatableText;
  icon: IconName;
  onClick: () => void;
};
