import type { MessageId } from '@/common/i18n';
import type { TooltipProps } from '@radix-ui/react-tooltip';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export function OptionalTooltip({
  children,
  tooltip,
  suppressAsChild = false,
  destructive = false,
  ...rest
}: OptionalTooltip) {
  const tooltipText = useMemo(() => {
    if (!tooltip) return undefined;
    if (typeof tooltip === 'string') return tooltip;
    return undefined;
  }, [tooltip]);

  if (!tooltipText) {
    return children;
  }

  return (
    <Tooltip {...rest}>
      <TooltipTrigger asChild={!suppressAsChild}>{children}</TooltipTrigger>
      <TooltipContent className={destructive ? 'text-destructive' : ''}>
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
}

export type OptionalTooltip = {
  children: React.ReactNode;
  suppressAsChild?: boolean;
  tooltip?:
    | string
    | { id: MessageId; values?: Record<string, string | number> };
  destructive?: boolean;
} & TooltipProps;
