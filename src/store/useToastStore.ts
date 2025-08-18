import { create } from 'zustand';
import type { Toast, ToastOptions } from '@/types/toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (message: string, options: ToastOptions = {}) => {
    const { type = 'info', duration = 2000 } = options;

    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      duration,
      createdAt: Date.now(),
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(newToast.id);
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;
