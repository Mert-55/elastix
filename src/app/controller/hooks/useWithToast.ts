import { useCallback } from 'react';
import { toast } from 'sonner';

type ToastMessages = {
  loading?: string;
  success?: string;
  error?: string;
};

type ActionResult<T> = Promise<
  { data: T; error?: undefined } | { error: unknown; data?: undefined }
>;

/**
 * Hook that wraps async actions with toast notifications.
 * Provides consistent feedback for create/update/delete operations.
 */
export function useWithToast() {
  const withToast = useCallback(
    async <T>(
      action: () => ActionResult<T>,
      messages: ToastMessages = {}
    ): Promise<{ success: boolean; data?: T; error?: unknown }> => {
      const {
        loading = 'Processing...',
        success = 'Operation completed',
        error = 'Operation failed',
      } = messages;

      const toastId = toast.loading(loading);

      try {
        const result = await action();

        if ('error' in result && result.error) {
          toast.error(error, { id: toastId });
          return { success: false, error: result.error };
        }

        toast.success(success, { id: toastId });
        return { success: true, data: result.data };
      } catch (err) {
        toast.error(error, { id: toastId });
        return { success: false, error: err };
      }
    },
    []
  );

  /**
   * Show a warning toast (for insufficient data, etc.)
   */
  const showWarning = useCallback((message: string, description?: string) => {
    toast.warning(message, { description, duration: 5000 });
  }, []);

  /**
   * Show an info toast
   */
  const showInfo = useCallback((message: string, description?: string) => {
    toast.info(message, { description });
  }, []);

  /**
   * Show a success toast
   */
  const showSuccess = useCallback((message: string, description?: string) => {
    toast.success(message, { description });
  }, []);

  /**
   * Show an error toast
   */
  const showError = useCallback((message: string, description?: string) => {
    toast.error(message, { description });
  }, []);

  return {
    withToast,
    showWarning,
    showInfo,
    showSuccess,
    showError,
  };
}
