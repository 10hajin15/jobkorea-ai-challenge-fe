import type { Dispatch, SetStateAction } from 'react';
import Chip from './Chip';

interface PKeyWord {
  includeKeywords: string[];
  excludeKeywords: string[];
  setIncludeKeywords: Dispatch<SetStateAction<string[]>>;
  setExcludeKeywords: Dispatch<SetStateAction<string[]>>;
}

const KeyWord = ({
  includeKeywords,
  excludeKeywords,
  setIncludeKeywords,
  setExcludeKeywords,
}: PKeyWord) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex gap-[8px]">
        <div className="mb-[6px] flex w-[80px] items-center gap-[6px]">
          <span className="text-caption text-gray-2">포함</span>
          <div className="flex items-center">
            <span className="text-caption text-primary">{includeKeywords.length}</span>
            <span className="text-caption text-gray-3">/20</span>
          </div>
        </div>
        <div className="scrollbar-hide flex flex-1 flex-nowrap items-center gap-[8px] overflow-x-auto">
          {includeKeywords.map((kw, i) => (
            <div key={`include-${kw}-${i}`} className="shrink-0">
              <Chip
                label={kw}
                color="primary"
                onRemove={() => setIncludeKeywords((prev) => prev.filter((k) => k !== kw))}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-[8px]">
        <div className="mb-[6px] flex w-[80px] items-center gap-[6px]">
          <span className="text-caption text-gray-2">제외</span>
          <div className="flex items-center">
            <span className="text-caption text-primary">{excludeKeywords.length}</span>
            <span className="text-caption text-gray-3">/100</span>
          </div>
        </div>
        <div className="scrollbar-hide flex flex-1 flex-nowrap items-center gap-[8px] overflow-x-auto">
          {excludeKeywords.map((kw, i) => (
            <div key={`exclude-${kw}-${i}`} className="shrink-0">
              <Chip
                key={`exclude-${kw}`}
                label={kw}
                color="gray"
                onRemove={() => setExcludeKeywords((prev) => prev.filter((k) => k !== kw))}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="text-body text-gray-2 border-gray-border h-[44px] w-full rounded-[6px] border"
      >
        추가하기
      </button>
    </div>
  );
};

export default KeyWord;
