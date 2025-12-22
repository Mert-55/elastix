import type { MessageId } from '@/common/i18n';

export function resolveTranslatableText(message: TranslatableText): {
  id: MessageId;
  values?: Record<string, string | number>;
} {
  if (typeof message === 'string') {
    return { id: message };
  }

  return { id: message.id, values: message.values };
}

export type TranslatableText =
  | MessageId
  | {
      id: MessageId;
      values?: Record<string, string | number>;
    };
