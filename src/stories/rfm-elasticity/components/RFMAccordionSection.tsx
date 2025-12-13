import type { ReactNode } from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/common/ui/accordion';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import type { AccordionItemProps } from '@radix-ui/react-accordion';
import { cn } from '@/common/lib/utils';

export interface RFMAccordionSectionProps extends Omit<
  AccordionItemProps,
  'value'
> {
  /** Eindeutige ID für das Accordion Item */
  value: string;
  /** i18n Message ID für den Titel */
  titleId: MessageId;
  /** Optionale Werte für die Übersetzung (z.B. {segment: 'Champions'}) */
  titleValues?: Record<string, string | number>;
  /** Inhalt des Accordion Panels */
  children: ReactNode;
}

/**
 * Generische Accordion Section für das RFM Dashboard
 * Reduziert Wiederholungen bei den verschiedenen AccordionItems
 */
export default function RFMAccordionSection({
  value,
  titleId,
  titleValues,
  children,
  className,
  ...props
}: RFMAccordionSectionProps) {
  const title = useFormatText({ id: titleId, values: titleValues });

  return (
    <AccordionItem
      value={value}
      className={cn('flex h-full flex-col', className)}
      {...props}
    >
      <AccordionTrigger className="text-base font-semibold tracking-tight">
        {title}
      </AccordionTrigger>
      <AccordionContent className={'overflow-hidden'}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
