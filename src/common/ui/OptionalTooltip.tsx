import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import type { TooltipProps } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export function OptionalTooltip({
  children,
  tooltip,
  suppressAsChild = false,
  ...rest
}: OptionalTooltip) {
  const tooltipText =
    typeof tooltip === 'string'
      ? tooltip
      : tooltip
        ? useFormatText(tooltip)
        : undefined;

  if (!tooltipText) {
    return <>{children}</>;
  }

  return (
    <Tooltip {...rest}>
      <TooltipTrigger asChild={!suppressAsChild}>{children}</TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}

export type OptionalTooltip = {
  children: React.ReactNode;
  suppressAsChild?: boolean;
  tooltip?:
    | string
    | { id: MessageId; values?: Record<string, string | number> };
} & TooltipProps;
