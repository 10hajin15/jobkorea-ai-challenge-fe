import { useCallback, useState } from 'react';
import Cascader from '../common/Cascader';
import type { CascaderValue, CascaderOption } from '@/types/cascader';
import cascaderData from '@/fixtures/cascader-data.json';
import SearchInput from '../common/SearchInput';
import FilterChipBar from '../common/FilterChipBar';
import useFilterStore from '@/store/useFilterStore';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';

const WorkLocation = () => {
  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const [locationValue, setLocationValue] = useState<CascaderValue>({});
  const getSelectedByTab = useFilterStore((s) => s.getSelectedByTab);
  const toggle = useFilterStore((s) => s.toggle);
  const clearTab = useFilterStore((s) => s.clearTab);
  const remove = useFilterStore((s) => s.remove);
  const MAX_SELECTION = 10;

  const handleLocationChange = useCallback(
    (value: CascaderValue, selectedOptions: CascaderOption[]) => {
      const lastOption = selectedOptions[selectedOptions.length - 1];
      const isLeaf = !lastOption.children || lastOption.children.length === 0;
      const label = lastOption.label;

      setLocationValue(value);

      if (!isLeaf) return;
      toggle(tabId, { id: lastOption.value, label }, { limit: MAX_SELECTION });
    },
    [tabId, toggle],
  );

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleReset = () => {
    clearTab(tabId);
  };

  const handleRemove = (label: string) => {
    const current = getSelectedByTab(tabId);
    const found = current.find((f) => f.item.label === label);
    if (found) remove(tabId, found.item.id);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="px-[30px] py-[14px]">
        <SearchInput placeholder="지역명을 검색하세요." onValueChange={handleSearch} />
      </div>
      <div className="min-h-0 flex-1">
        <Cascader
          options={cascaderData.locations}
          value={locationValue}
          onChange={handleLocationChange}
          placeholder={['시/도', '시/군/구', '동/면']}
          selectedLeafLabels={getSelectedByTab(tabId).map((f) => f.item.label)}
        />
      </div>
      {getSelectedByTab(tabId).length > 0 && (
        <FilterChipBar
          selectedFilters={getSelectedByTab(tabId).map((f) => f.item.label)}
          onReset={handleReset}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default WorkLocation;
