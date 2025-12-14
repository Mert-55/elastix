import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { cn } from '@/common/lib/utils';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/ui/accordion';
import { Icon, type IconName } from '@/common/ui/icon';
import type { AccordionItemProps } from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';

export interface DashboardAccordionSectionProps extends Omit<
  AccordionItemProps,
  'value'
> {
  /** Eindeutige ID für das Accordion Item */
  value: string;
  /** i18n Message ID für den Titel */
  titleId: MessageId;
  /** Optionale Werte für die Übersetzung (z.B. {segment: 'Champions'}) */
  titleValues?: Record<string, string | number>;
  /** Optionales Icon für den Titel */
  icon?: IconName;
  /** Inhalt des Accordion Panels */
  children: ReactNode;
}

/**
 * Generische Accordion Section für das RFM Dashboard
 * Reduziert Wiederholungen bei den verschiedenen AccordionItems
 */
export default function DashboardAccordionSection({
  value,
  titleId,
  titleValues,
  children,
  className,
  icon,
  ...props
}: DashboardAccordionSectionProps) {
  const title = useFormatText({ id: titleId, values: titleValues });

  return (
    <AccordionItem
      value={value}
      className={cn('flex h-full flex-col', className)}
      {...props}
    >
      <AccordionTrigger className="text-base font-semibold tracking-tight">
        <span className="inline-flex items-center gap-2">
          {icon && <Icon name={icon} size={18} />}
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className={'overflow-hidden'}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
