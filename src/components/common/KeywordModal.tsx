import { useEffect, useState } from 'react';
import Modal from './Modal';
import SearchInput from './SearchInput';
import Chip from './Chip';

interface KeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  includeKeywords: string[];
  excludeKeywords: string[];
  onSave: (nextInclude: string[], nextExclude: string[]) => void;
}

const KeywordModal = ({
  isOpen,
  onClose,
  includeKeywords,
  excludeKeywords,
  onSave,
}: KeywordModalProps) => {
  const [mode, setMode] = useState<'include' | 'exclude'>('include');
  const [inputValue, setInputValue] = useState('');
  const [draftInclude, setDraftInclude] = useState<string[]>(includeKeywords);
  const [draftExclude, setDraftExclude] = useState<string[]>(excludeKeywords);

  useEffect(() => {
    if (isOpen) {
      setDraftInclude(includeKeywords);
      setDraftExclude(excludeKeywords);
      setMode('include');
      setInputValue('');
    }
  }, [isOpen, includeKeywords, excludeKeywords]);

  const handleAdd = () => {
    const value = inputValue.trim();
    if (!value) return;
    if (mode === 'include') {
      if (draftInclude.length >= 20) return;
      setDraftInclude((prev) => (prev.includes(value) ? prev : [value, ...prev]));
    } else {
      if (draftExclude.length >= 100) return;
      setDraftExclude((prev) => (prev.includes(value) ? prev : [value, ...prev]));
    }
    setInputValue('');
  };

  const footer = (
    <button
      type="button"
      onClick={() => {
        onSave(draftInclude, draftExclude);
        onClose();
      }}
      className="bg-gray-1 text-body h-[44px] w-full rounded-[6px] text-white"
    >
      저장하기
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="키워드 포함 / 제외" footer={footer}>
      <div className="flex flex-col gap-[14px]">
        <div className="flex items-center gap-[8px]">
          <label className="flex items-center gap-[6px]">
            <input
              type="radio"
              className="peer sr-only"
              checked={mode === 'include'}
              onChange={() => setMode('include')}
            />
            <span
              className="border-gray-3 peer-checked:border-primary peer-checked:before:bg-primary inline-flex h-[16px] w-[16px] items-center justify-center rounded-full border before:h-[8px] before:w-[8px] before:rounded-full before:bg-transparent before:content-['']"
              aria-hidden
            />
            <span className="text-body text-gray-3 peer-checked:text-primary">포함</span>
          </label>
          <label className="flex items-center gap-[6px]">
            <input
              type="radio"
              className="peer sr-only"
              checked={mode === 'exclude'}
              onChange={() => setMode('exclude')}
            />
            <span
              className="border-gray-3 peer-checked:border-gray-2 peer-checked:before:bg-gray-2 inline-flex h-[16px] w-[16px] items-center justify-center rounded-full border before:h-[8px] before:w-[8px] before:rounded-full before:bg-transparent before:content-['']"
              aria-hidden
            />
            <span className="text-body text-gray-3 peer-checked:text-gray-2">제외</span>
          </label>
        </div>
        <div className="flex w-full items-center gap-[8px]">
          <div className="flex-1">
            <SearchInput
              placeholder="키워드 입력"
              value={inputValue}
              onValueChange={setInputValue}
              showIcon={false}
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-primary h-[42px] rounded-[6px] px-[14px] text-white disabled:opacity-30"
          >
            추가
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center">
          <div className="flex w-[80px] items-center gap-[6px]">
            <span className="text-caption text-gray-2">포함</span>
            <div className="flex items-center">
              <span className="text-caption text-primary">{draftInclude.length}</span>
              <span className="text-caption text-gray-3">/20</span>
            </div>
          </div>
          <div className="scrollbar-hide flex flex-1 items-center gap-[8px] overflow-x-auto">
            {draftInclude.map((kw, i) => (
              <div key={`include-${kw}-${i}`} className="shrink-0">
                <Chip
                  label={kw}
                  color="primary"
                  onRemove={() => setDraftInclude((prev) => prev.filter((k) => k !== kw))}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex w-[80px] items-center gap-[6px]">
            <span className="text-caption text-gray-2">제외</span>
            <div className="flex items-center">
              <span className="text-caption text-primary">{draftExclude.length}</span>
              <span className="text-caption text-gray-3">/100</span>
            </div>
          </div>
          <div className="scrollbar-hide flex flex-1 flex-nowrap items-center gap-[8px] overflow-x-auto">
            {draftExclude.map((kw, i) => (
              <div key={`exclude-${kw}-${i}`} className="shrink-0">
                <Chip
                  key={`exclude-${kw}`}
                  label={kw}
                  color="gray"
                  onRemove={() => setDraftExclude((prev) => prev.filter((k) => k !== kw))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default KeywordModal;
