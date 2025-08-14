import Cascader from '@/components/common/Cascader';
import cascaderData from '@/fixtures/cascader-data.json';
import { useCallback, useState } from 'react';
import type { CascaderValue, CascaderOption } from '@/types/cascader';
import SearchInput from '../common/SearchInput';
import FilterChipBar from '../common/FilterChipBar';
import useFilterStore from '@/store/useFilterStore';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';

const JobCategory = () => {
  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const [categoryValue, setCategoryValue] = useState<CascaderValue>({});
  const getSelectedByTab = useFilterStore((s) => s.getSelectedByTab);
  const toggle = useFilterStore((s) => s.toggle);
  const clearTab = useFilterStore((s) => s.clearTab);
  const remove = useFilterStore((s) => s.remove);
  const MAX_SELECTION = 10;

  const handleCategoryChange = useCallback(
    (value: CascaderValue, selectedOptions: CascaderOption[]) => {
      const lastOption = selectedOptions[selectedOptions.length - 1];
      const isLeaf = !lastOption.children || lastOption.children.length === 0;
      const label = lastOption.label;

      setCategoryValue(value);

      if (!isLeaf) return;
      toggle(tabId, { id: lastOption.value, label }, { limit: MAX_SELECTION });

      console.log('Category selected:', value, selectedOptions);
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
        <SearchInput placeholder="업직종을 검색하세요." onSearch={handleSearch} />
      </div>
      <div className="min-h-0 flex-1">
        <Cascader
          options={cascaderData.categories}
          value={categoryValue}
          onChange={handleCategoryChange}
          placeholder={['대분류', '중분류']}
          maxDepth={2}
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

export default JobCategory;
