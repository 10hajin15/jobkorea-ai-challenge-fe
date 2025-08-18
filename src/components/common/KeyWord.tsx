import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import Chip from './Chip';
import KeywordModal from './KeywordModal';

interface PKeyWord {
  includeKeywords: string[];
  excludeKeywords: string[];
  setIncludeKeywords: Dispatch<SetStateAction<string[]>>;
  setExcludeKeywords: Dispatch<SetStateAction<string[]>>;
  onSave?: (include: string[], exclude: string[]) => void;
}

const KeyWord = ({
  includeKeywords,
  excludeKeywords,
  setIncludeKeywords,
  setExcludeKeywords,
  onSave = () => {},
}: PKeyWord) => {
  const [open, setOpen] = useState(false);
  const includeScrollRef = useRef<HTMLDivElement | null>(null);
  const excludeScrollRef = useRef<HTMLDivElement | null>(null);
  const prevIncludeCountRef = useRef<number>(includeKeywords.length);
  const prevExcludeCountRef = useRef<number>(excludeKeywords.length);

  useEffect(() => {
    const container = includeScrollRef.current;
    if (!container) return;
    const didIncrease = prevIncludeCountRef.current < includeKeywords.length;
    if (didIncrease) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
    prevIncludeCountRef.current = includeKeywords.length;
  }, [includeKeywords]);

  useEffect(() => {
    const container = excludeScrollRef.current;
    if (!container) return;
    const didIncrease = prevExcludeCountRef.current < excludeKeywords.length;
    if (didIncrease) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
    prevExcludeCountRef.current = excludeKeywords.length;
  }, [excludeKeywords]);
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex">
        <div className="flex w-[80px] items-center gap-[6px]">
          <span className="text-caption text-gray-2">포함</span>
          <div className="flex items-center">
            <span className="text-caption text-primary">{includeKeywords.length}</span>
            <span className="text-caption text-gray-3">/20</span>
          </div>
        </div>
        <div
          ref={includeScrollRef}
          className="scrollbar-hide flex flex-1 flex-nowrap items-center gap-[8px] overflow-x-auto"
        >
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
      <div className="flex">
        <div className="flex w-[80px] items-center gap-[6px]">
          <span className="text-caption text-gray-2">제외</span>
          <div className="flex items-center">
            <span className="text-caption text-primary">{excludeKeywords.length}</span>
            <span className="text-caption text-gray-3">/100</span>
          </div>
        </div>
        <div
          ref={excludeScrollRef}
          className="scrollbar-hide flex flex-1 flex-nowrap items-center gap-[8px] overflow-x-auto"
        >
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
        onClick={() => setOpen(true)}
      >
        추가하기
      </button>
      <KeywordModal
        isOpen={open}
        onClose={() => setOpen(false)}
        includeKeywords={includeKeywords}
        excludeKeywords={excludeKeywords}
        onSave={(inc, exc) => {
          setIncludeKeywords(inc);
          setExcludeKeywords(exc);
          onSave(inc, exc);
        }}
      />
    </div>
  );
};

export default KeyWord;
