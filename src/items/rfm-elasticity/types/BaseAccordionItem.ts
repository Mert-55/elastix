import type { AccordionItemProps } from '@radix-ui/react-accordion';

export type BaseAccordionItem = { value?: string } & Omit<
  AccordionItemProps,
  'value'
>;
