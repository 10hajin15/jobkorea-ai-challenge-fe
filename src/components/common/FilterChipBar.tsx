import Chip from './Chip';

interface FilterChipBarProps {
  selectedFilters: string[];
  onReset?: () => void;
  onRemove: (filter: string) => void;
}

const FilterChipBar = ({ selectedFilters, onReset, onRemove }: FilterChipBarProps) => {
  return (
    <div className="flex h-[82px] flex-col justify-between rounded-t-[8px] bg-white px-[20px] py-[14px] shadow-[0_-6px_12px_rgba(0,0,0,0.07)]">
      <div className="text-caption flex items-center justify-between">
        <div>
          <span className="text-primary">{selectedFilters.length}</span>
          <span className="text-gray-2">/10</span>
        </div>
        <div className="text-gray-2 cursor-pointer" onClick={onReset}>
          초기화
        </div>
      </div>
      <div className="scrollbar-hide flex flex-nowrap gap-[8px] overflow-x-auto">
        {selectedFilters.map((filter) => (
          <Chip key={filter} label={filter} color="primary" onRemove={() => onRemove(filter)} />
        ))}
      </div>
    </div>
  );
};

export default FilterChipBar;
