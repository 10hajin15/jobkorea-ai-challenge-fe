import ClosedIcon from '@/components/icons/ClosedIcon';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[320px] rounded-[10px] bg-white p-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
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
      </div>
    </div>
  );
};

export default Modal;
