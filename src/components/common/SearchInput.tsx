import searchIcon from '@/assets/icons/SearchIcon.svg';
import ClosedIcon from '@/components/icons/ClosedIcon';
import { useEffect, useState, type ChangeEvent } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  showIcon?: boolean;
}

const SearchInput = ({
  placeholder = '검색어를 입력해주세요.',
  onValueChange,
  value,
  showIcon = true,
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onValueChange(newValue);
  };

  const handleClear = () => {
    setInternalValue('');
    onValueChange('');
  };

  return (
    <div className="border-gray-3 flex h-[42px] w-full items-center gap-[10px] rounded-[4px] border px-[16px]">
      <input
        type="text"
        placeholder={placeholder}
        className="text-body placeholder:text-gray-3 flex-1"
        value={internalValue}
        onChange={handleChange}
      />
      {showIcon && (
        <div className="h-[24px] w-[24px] shrink-0">
          {internalValue ? (
            <button onClick={handleClear} aria-label="clear">
              <ClosedIcon width={20} height={20} color="#D2D2D2" />
            </button>
          ) : (
            <img className="h-[24px] w-[24px]" src={searchIcon} alt="search" />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
