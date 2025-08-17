import ClosedIcon from '@/components/icons/ClosedIcon';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
          <motion.div
            className="relative z-10 w-[320px] rounded-[10px] bg-white p-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="mb-[14px] flex items-center justify-between">
              {title ? <div className="text-header font-semibold">{title}</div> : <div />}
              <div className="flex justify-end">
                <button aria-label="close" onClick={onClose}>
                  <ClosedIcon width={20} height={20} color="#6a6a6a" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">{children}</div>
            {footer && <div className="mt-[14px]">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
