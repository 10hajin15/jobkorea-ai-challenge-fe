import { motion } from 'framer-motion';
import type { Toast } from '@/types/toast';
import useToastStore from '@/store/useToastStore';

interface ToastProps {
  toast: Toast;
}

const ToastMessage = ({ toast }: ToastProps) => {
  const { removeToast } = useToastStore();

  const handleClose = () => {
    removeToast(toast.id);
  };

  const getToastStyles = () => {
    const baseStyles = 'flex items-center justify-between p-4 rounded-lg shadow-lg w-full';

    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white`;
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-white`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500 text-white`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={getToastStyles()}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{getIcon()}</span>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>

      <button
        onClick={handleClose}
        className="ml-4 text-white transition-colors hover:text-gray-200"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default ToastMessage;
