import Chip from './Chip';
import useFilterStore from '@/store/useFilterStore';

const SelectedFilters = () => {
  const remove = useFilterStore((s) => s.remove);
  const byTab = useFilterStore((s) => s.byTab);
  const all = [...byTab[0], ...byTab[1], ...byTab[2], ...byTab[3]];

  return (
    <div className="bg-gray-4 flex h-[72px] flex-col p-[10px]">
      <div className="scrollbar-hide flex flex-1 flex-wrap gap-[8px] overflow-y-auto">
        {all.map((f) => (
          <Chip key={f.key} label={f.item.label} onRemove={() => remove(f.tabId, f.item.id)} />
        ))}
      </div>
    </div>
  );
};

export default SelectedFilters;
