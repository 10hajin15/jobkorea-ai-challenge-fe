import { useCallback, useMemo, useState } from 'react';
import Cascader from '../common/Cascader';
import type { CascaderValue, CascaderOption } from '@/types/cascader';
import cascaderData from '@/fixtures/cascader-data.json';
import SearchInput from '../common/SearchInput';
import FilterChipBar from '../common/FilterChipBar';
import useFilterStore from '@/store/useFilterStore';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';
import SearchResult from '../common/SearchResult';
import { flattenLeafPaths } from '@/utils/cascader';
import { useToast } from '@/hooks/useToast';

const WorkLocation = () => {
  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const [locationValue, setLocationValue] = useState<CascaderValue>({});
  const [keyword, setKeyword] = useState('');
  const byTab = useFilterStore((s) => s.byTab);
  const toggle = useFilterStore((s) => s.toggle);
  const clearTab = useFilterStore((s) => s.clearTab);
  const remove = useFilterStore((s) => s.remove);
  const { warning } = useToast();
  const MAX_SELECTION = 10;

  const handleLocationChange = useCallback(
    (value: CascaderValue, selectedOptions: CascaderOption[]) => {
      const lastOption = selectedOptions[selectedOptions.length - 1];
      const isLeaf = !lastOption.children || lastOption.children.length === 0;
      const label = lastOption.label;

      setLocationValue(value);

      if (!isLeaf) return;

      const success = toggle(tabId, { id: lastOption.value, label }, { limit: MAX_SELECTION });
      if (!success) {
        warning(`최대 ${MAX_SELECTION}개까지 선택할 수 있습니다.`);
      }
    },
    [tabId, toggle, warning],
  );

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const searchResults = useMemo(() => {
    const q = keyword.trim();
    if (!q) return [] as { id: string; fullLabel: string; leafLabel: string }[];
    const qLower = q.toLowerCase();
    const flattened = flattenLeafPaths(cascaderData.locations);
    return flattened.filter((item) =>
      item.pathLabels.some((lbl) => lbl.toLowerCase().includes(qLower)),
    );
  }, [keyword]);

  const handleReset = () => {
    clearTab(tabId);
  };

  const handleRemove = (label: string) => {
    const current = byTab[tabId];
    const found = current.find((f) => f.item.label === label);
    if (found) remove(tabId, found.item.id);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-[30px] py-[14px]">
        <SearchInput placeholder="지역명을 검색하세요." onValueChange={handleSearch} />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {keyword ? (
          <SearchResult keyword={keyword} results={searchResults} />
        ) : (
          <Cascader
            options={cascaderData.locations}
            value={locationValue}
            onChange={handleLocationChange}
            placeholder={['시/도', '시/군/구', '동/면']}
            maxDepth={3}
            selectedLeafLabels={byTab[tabId].map((f) => f.item.label)}
          />
        )}
      </div>
      {byTab[tabId].length > 0 && (
        <FilterChipBar
          selectedFilters={byTab[tabId].map((f) => f.item.label)}
          onReset={handleReset}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default WorkLocation;
