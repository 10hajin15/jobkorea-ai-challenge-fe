import Chip from './Chip';
import useFilterStore from '@/store/useFilterStore';

const SelectedFilters = () => {
  const { filterList, removeFilter } = useFilterStore();

  return (
    <div className="bg-gray-4 flex h-[72px] flex-col p-[10px]">
      <div className="scrollbar-hide flex flex-1 flex-wrap gap-[8px] overflow-y-auto">
        {filterList.map((filter, i) => (
          <Chip key={i} label={filter} onRemove={() => removeFilter(filter)} />
        ))}
      </div>
    </div>
  );
};

export default SelectedFilters;
