import FilterContent from '@/components/layout/FilterContentLayout';
import TagList from '../common/TagList';
import { MONEY_CONDITION, WORK_TYPE } from '@/constants/detail';
import { useEffect, useMemo, useState } from 'react';
import ToggleButton from '../common/ToggleButton';
import useFilterStore from '@/store/useFilterStore';
import Slider from '../common/Slider';
import KeyWord from '../common/KeyWord';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';
import MoneyInput from '../common/MoneyInput';

const DetailCondition = () => {
  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const { toggle, getSelectedByTab, add, remove } = useFilterStore();

  const [age, setAge] = useState<number>(10);
  const [includeKeywords, setIncludeKeywords] = useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);
  const [moneyValue, setMoneyValue] = useState<string>('');

  const AGE_MIN = 10;
  const AGE_MAX = 80;
  const selectedAge = getSelectedByTab(tabId).find((f) => f.item.group === 'age');
  const percent = useMemo(
    () => (selectedAge ? ((age - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100 : 0),
    [age, selectedAge],
  );

  const handleClearAge = () => {
    if (selectedAge) {
      remove(tabId, selectedAge.item.id);
    }
  };

  const handleClickWorkType = (tag: string) => {
    toggle(
      tabId,
      { id: `employmentType:${tag}`, label: tag, group: 'employmentType' },
      {
        group: 'employmentType',
        groupLimit: 7,
      },
    );
  };

  const handleClickMoneyCondition = (tag: string) => {
    const selected = getSelectedByTab(tabId).find((f) => f.item.group === 'moneyCondition');
    const isDeselecting = selected && selected.item.label === tag;
    toggle(
      tabId,
      { id: `money:${tag}`, label: tag, group: 'moneyCondition' },
      {
        group: 'moneyCondition',
        groupLimit: 1,
      },
    );
    if (isDeselecting) {
      setMoneyValue('');
    }
  };

  const selectedMoneyCondition = getSelectedByTab(tabId).find(
    (f) => f.item.group === 'moneyCondition',
  );
  const selectedMoneyMin = getSelectedByTab(tabId).find((f) => f.item.group === 'moneyMin');
  useEffect(() => {
    if (!selectedMoneyCondition && moneyValue !== '') {
      setMoneyValue('');
    }
  }, [selectedMoneyCondition]);

  useEffect(() => {
    if (!selectedMoneyMin && selectedMoneyCondition && moneyValue !== '0') {
      setMoneyValue('');
    }
  }, [selectedMoneyMin, selectedMoneyCondition]);

  const handleClickGender = (tag: string) => {
    toggle(
      tabId,
      { id: `gender:${tag}`, label: tag, group: 'gender' },
      {
        group: 'gender',
        groupLimit: 1,
      },
    );
  };

  return (
    <>
      <FilterContent
        title="고용형태"
        count={getSelectedByTab(tabId).filter((f) => f.item.group === 'employmentType').length}
        total={7}
      >
        <TagList
          items={WORK_TYPE}
          onTagClick={handleClickWorkType}
          activeItems={getSelectedByTab(tabId)
            .filter((f) => f.item.group === 'employmentType')
            .map((f) => f.item.label)}
        />
      </FilterContent>
      <FilterContent title="급여조건">
        <TagList
          items={MONEY_CONDITION}
          onTagClick={handleClickMoneyCondition}
          activeItems={getSelectedByTab(tabId)
            .filter((f) => f.item.group === 'moneyCondition')
            .map((f) => f.item.label)}
        />
        <MoneyInput
          value={moneyValue}
          onChange={(v) => {
            setMoneyValue(v);
            if (selectedMoneyCondition) {
              const digits = v.replace(/[^0-9]/g, '');
              const id = `moneyMin:${digits || '0'}`;
              const label = digits ? `${digits}원 이상` : '금액 미입력';
              getSelectedByTab(tabId)
                .filter((f) => f.item.group === 'moneyMin')
                .forEach((f) => remove(tabId, f.item.id));
              if (digits) {
                add(tabId, { id, label, group: 'moneyMin' }, { group: 'moneyMin', groupLimit: 1 });
              }
            }
          }}
          disabled={!selectedMoneyCondition}
        />
      </FilterContent>
      <FilterContent
        title="성별"
        exceptDetail={{ label: '무관제외', checked: false, onChange: () => {} }}
      >
        <ToggleButton
          options={['남자', '여자']}
          value={getSelectedByTab(tabId).find((f) => f.item.group === 'gender')?.item.label ?? ''}
          onChange={handleClickGender}
        />
      </FilterContent>
      <FilterContent
        title="연령"
        exceptDetail={{ label: '무관제외', checked: false, onChange: () => {} }}
      >
        <div className="age-slider mt-[10px] w-full">
          <div className="text-body mb-[8px] flex items-center justify-center gap-[6px]">
            {selectedAge ? (
              <>
                <span className="text-gray-2">{age}</span>
                <span className="text-gray-3">세</span>
              </>
            ) : (
              <span className="text-gray-3">미선택</span>
            )}
          </div>
          {selectedAge && (
            <div className="mb-[6px] flex justify-end">
              <button className="text-caption text-gray-2 underline" onClick={handleClearAge}>
                선택 해제
              </button>
            </div>
          )}
          <Slider
            percent={percent}
            AGE_MIN={AGE_MIN}
            AGE_MAX={AGE_MAX}
            age={selectedAge ? age : AGE_MIN}
            setAge={(v) => {
              setAge(v);
              add(
                tabId,
                { id: `age:${v}`, label: `${v}세`, group: 'age' },
                { group: 'age', groupLimit: 1 },
              );
            }}
          />
        </div>
      </FilterContent>
      <FilterContent title="키워드 포함 / 제외">
        <KeyWord
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          setIncludeKeywords={setIncludeKeywords}
          setExcludeKeywords={setExcludeKeywords}
          onSave={(inc, exc) => {
            getSelectedByTab(tabId)
              .filter((f) => f.item.group === 'keywordInclude' || f.item.group === 'keywordExclude')
              .forEach((f) => remove(tabId, f.item.id));

            inc.forEach((kw) => {
              add(
                tabId,
                { id: `keywordInclude:${kw}`, label: kw, group: 'keywordInclude' },
                { group: 'keywordInclude', groupLimit: 1000 },
              );
            });

            exc.forEach((kw) => {
              add(
                tabId,
                { id: `keywordExclude:${kw}`, label: kw, group: 'keywordExclude' },
                { group: 'keywordExclude', groupLimit: 1000 },
              );
            });
          }}
        />
      </FilterContent>
    </>
  );
};

export default DetailCondition;
