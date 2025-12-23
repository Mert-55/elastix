import type { TranslatableText } from '@/common/types/TranslatableText';
import type {
  TooltipContentProps,
  TooltipProps,
} from '@radix-ui/react-tooltip';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export function OptionalTooltip({
  children,
  tooltip,
  side,
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
      <TooltipContent
        className={destructive ? 'text-destructive' : ''}
        side={side}
      >
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
}

export type OptionalTooltip = {
  children: React.ReactNode;
  suppressAsChild?: boolean;
  tooltip?: string | TranslatableText;
  destructive?: boolean;
  side?: TooltipContentProps['side'];
} & TooltipProps;
