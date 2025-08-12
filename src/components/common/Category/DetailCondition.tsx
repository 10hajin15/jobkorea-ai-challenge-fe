import FilterContent from '@/components/layout/FilterContent';
import TagList from '../TagList';
import { MONEY_CONDITION, WORK_TYPE } from '@/constants/detail';
import { useMemo, useState } from 'react';
import ToggleButton from '../ToggleButton';
import useFilterStore from '@/store/useFilterStore';
import Slider from '../Slider';
import KeyWord from '../KeyWord';

const MoneyInput = () => {
  return (
    <div className="mt-[10px] flex items-center justify-center gap-[4px]">
      <div className="border-gray-border h-[40px] rounded-[4px] border">
        <input
          className="placeholder:text-gray-3 h-full w-full p-[14px] text-end"
          placeholder="0"
          type="number"
        />
      </div>
      <div className="text-body text-gray-2">원 이상</div>
    </div>
  );
};
const DetailCondition = () => {
  const { addFilter, removeFilter } = useFilterStore();

  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([]);
  const [selectedMoneyCondition, setSelectedMoneyCondition] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [includeKeywords, setIncludeKeywords] = useState<string[]>([
    '비서',
    '행복',
    '123',
    '12',
    '14325',
    '424',
    '444',
    '행복32',
  ]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>(['가족같은']);

  const AGE_MIN = 0;
  const AGE_MAX = 80;
  const percent = useMemo(() => ((age - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100, [age]);

  const handleClickWorkType = (tag: string) => {
    if (selectedWorkType.includes(tag)) {
      setSelectedWorkType(selectedWorkType.filter((workType) => workType !== tag));
      removeFilter(tag);
    } else {
      if (selectedWorkType.length >= 7) return;
      setSelectedWorkType([...selectedWorkType, tag]);
      addFilter(tag);
    }
  };

  const handleClickMoneyCondition = (tag: string) => {
    removeFilter(selectedMoneyCondition);
    if (selectedMoneyCondition === tag) {
      setSelectedMoneyCondition('');
    } else {
      setSelectedMoneyCondition(tag);
      addFilter(tag);
    }
  };

  const handleClickGender = (tag: string) => {
    removeFilter(selectedGender);
    if (selectedGender === tag) {
      setSelectedGender('');
    } else {
      setSelectedGender(tag);
      addFilter(tag);
    }
  };

  return (
    <>
      <FilterContent title="고용형태" count={selectedWorkType.length} total={7}>
        <TagList
          items={WORK_TYPE}
          onTagClick={handleClickWorkType}
          activeItems={selectedWorkType}
        />
      </FilterContent>
      <FilterContent title="급여조건">
        <TagList
          items={MONEY_CONDITION}
          onTagClick={handleClickMoneyCondition}
          activeItems={[selectedMoneyCondition]}
        />
        <MoneyInput />
      </FilterContent>
      <FilterContent
        title="성별"
        exceptDetail={{ label: '무관제외', checked: false, onChange: () => {} }}
      >
        <ToggleButton
          options={['남자', '여자']}
          value={selectedGender}
          onChange={handleClickGender}
        />
      </FilterContent>
      <FilterContent
        title="연령"
        exceptDetail={{ label: '무관제외', checked: false, onChange: () => {} }}
      >
        <div className="age-slider mt-[10px] w-full">
          <div className="text-body mb-[8px] flex items-center justify-center gap-[6px]">
            <span className="text-gray-2">{age}</span>
            <span className="text-gray-3">세</span>
          </div>
          <Slider percent={percent} AGE_MIN={AGE_MIN} AGE_MAX={AGE_MAX} age={age} setAge={setAge} />
        </div>
      </FilterContent>
      <FilterContent title="키워드 포함 / 제외">
        <KeyWord
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          setIncludeKeywords={setIncludeKeywords}
          setExcludeKeywords={setExcludeKeywords}
        />
      </FilterContent>
    </>
  );
};

export default DetailCondition;
