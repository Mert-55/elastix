import { useFormatText } from '@/common/hooks/useFormatText';
import { useMemo } from 'react';

const MIN_LENGTH = 3;

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export function useDashboardNameValidation(value: string): ValidationResult {
  const errorMessage = useFormatText({
    id: 'validation.minLength',
    values: { limit: MIN_LENGTH },
  });

  return useMemo(() => {
    if (value.length < MIN_LENGTH) {
      return {
        isValid: false,
        message: errorMessage,
      };
    }

    return { isValid: true };
  }, [value, errorMessage]);
}
