import type { MessageId } from '@/common/i18n';
import { useMemo } from 'react';

const MIN_LENGTH = 3;

export type ValidationResult = {
  isValid: boolean;
  message?: { id: MessageId; values?: Record<string, string | number> };
};

export function useDashboardNameValidation(value: string): ValidationResult {
  return useMemo(() => {
    if (value.length < MIN_LENGTH) {
      return {
        isValid: false,
        message: { id: 'validation.minLength', values: { limit: MIN_LENGTH } },
      };
    }

    return { isValid: true };
  }, [value]);
}
