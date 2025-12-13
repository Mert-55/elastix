import { useIntl } from 'react-intl';

import type { MessageId } from '@/app/i18n';

interface UseFormatTextOptions {
  id: MessageId;
  values?: Record<string, string | number>;
}

export function useFormatText({ id, values }: UseFormatTextOptions): string {
  const intl = useIntl();
  return intl.formatMessage({ id }, values);
}
