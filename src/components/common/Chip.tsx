import ClosedIcon from '@/components/icons/ClosedIcon';
import type { ChipProps } from '@/types/chip';
import { motion } from 'framer-motion';

const COLOR_CLASS = {
  primary: 'bg-primary-light-2 text-primary border border-primary-light',
  gray: 'bg-gray-4 text-gray-2 border border-gray-border',
};

const REMOVE_ICON_COLOR_CLASS = {
  primary: '#ff501b',
  gray: '#6a6a6a',
};

const Chip = ({ label, color = 'gray', onRemove }: ChipProps) => {
  return (
    <motion.div
      className={`${COLOR_CLASS[color]} inline-flex h-[22px] shrink-0 items-center gap-[6px] rounded-[4px] px-[10px] whitespace-nowrap`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <span className="text-caption leading-[12px] whitespace-nowrap">{label}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        aria-label="remove"
        className="flex items-center justify-center"
      >
        <ClosedIcon
          className="cursor-pointer"
          color={REMOVE_ICON_COLOR_CLASS[color]}
          width={12}
          height={12}
        />
      </button>
    </motion.div>
  );
};

export default Chip;
