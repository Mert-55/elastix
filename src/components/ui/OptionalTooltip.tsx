import type { TooltipProps } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

export function OptionalTooltip({
  children,
  tooltip,
  suppressAsChild = false,
  ...rest
}: OptionalTooltip) {
  if (!tooltip) {
    return <>{children}</>;
  }
  return (
    <Tooltip {...rest}>
      <TooltipTrigger asChild={!suppressAsChild}>{children}</TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
}

export type OptionalTooltip = {
  children: React.ReactNode;
  suppressAsChild?: boolean;
  tooltip?: string;
} & TooltipProps;
