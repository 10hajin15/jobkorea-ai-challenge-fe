import { AnimatePresence } from 'framer-motion';
import ToastMessage from './ToastMessage';
import useToastStore from '@/store/useToastStore';

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-14 left-1/2 z-50 w-[90vw] -translate-x-1/2 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
