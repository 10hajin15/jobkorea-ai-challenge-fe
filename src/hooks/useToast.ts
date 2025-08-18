import useToastStore from '@/store/useToastStore';
import type { ToastOptions } from '@/types/toast';

export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastStore();

  return {
    success: (message: string, options?: Omit<ToastOptions, 'type'>) =>
      addToast(message, { ...options, type: 'success' }),
    error: (message: string, options?: Omit<ToastOptions, 'type'>) =>
      addToast(message, { ...options, type: 'error' }),
    warning: (message: string, options?: Omit<ToastOptions, 'type'>) =>
      addToast(message, { ...options, type: 'warning' }),
    info: (message: string, options?: Omit<ToastOptions, 'type'>) =>
      addToast(message, { ...options, type: 'info' }),
    remove: removeToast,
    clear: clearToasts,
  };
};
