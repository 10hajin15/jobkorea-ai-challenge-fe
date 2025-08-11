import type { TChip } from '@/types/chip';
import Chip from './Chip';

const SelectedFilters = ({ chipsData }: { chipsData: TChip[] }) => {
  return (
    <div className="flex h-[100px] flex-col p-[10px]">
      <div className="mb-[10px] flex justify-end">
        <div className="text-caption text-gray-2 cursor-pointer">초기화</div>
      </div>
      <div className="flex flex-1 flex-wrap gap-[10px] overflow-y-auto">
        {chipsData.map((chip) => (
          <Chip key={chip.label} label={chip.label} onRemove={chip.onRemove} />
        ))}
      </div>
    </div>
  );
};

export default SelectedFilters;
