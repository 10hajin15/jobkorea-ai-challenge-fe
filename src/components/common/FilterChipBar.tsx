import Chip from './Chip';
import { AnimatePresence, motion } from 'framer-motion';

interface FilterChipBarProps {
  selectedFilters: string[];
  limit?: number;
  onReset?: () => void;
  onRemove: (filter: string) => void;
}

const FilterChipBar = ({ selectedFilters, onReset, onRemove, limit = 10 }: FilterChipBarProps) => {
  return (
    <div className="flex h-[82px] flex-col justify-between rounded-t-[8px] bg-white px-[20px] py-[14px] shadow-[0_-6px_12px_rgba(0,0,0,0.07)]">
      <div className="text-caption flex items-center justify-between">
        <div>
          <span className="text-primary">{selectedFilters.length}</span>
          <span className="text-gray-2">/{limit}</span>
        </div>
        <div className="text-gray-2 cursor-pointer" onClick={onReset}>
          초기화
        </div>
      </div>
      <div className="scrollbar-hide flex flex-nowrap gap-[8px] overflow-x-auto">
        <AnimatePresence initial={false}>
          {selectedFilters.map((filter) => (
            <motion.div
              key={filter}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Chip label={filter} color="primary" onRemove={() => onRemove(filter)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterChipBar;
