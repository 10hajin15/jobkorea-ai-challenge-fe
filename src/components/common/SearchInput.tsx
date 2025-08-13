import searchIcon from '@/assets/icons/SearchIcon.svg';
import ClosedIcon from '@/components/icons/ClosedIcon';
import { useState, type ChangeEvent } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchInput = ({ placeholder = '검색어를 입력해주세요.', onSearch }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="border-gray-3 flex h-[42px] w-full items-center gap-[10px] rounded-[4px] border px-[16px]">
      <input
        type="text"
        placeholder={placeholder}
        className="text-body placeholder:text-gray-3 flex-1"
        value={value}
        onChange={handleChange}
      />
      <div className="h-[24px] w-[24px] shrink-0">
        {value ? (
          <button onClick={handleClear} aria-label="clear">
            <ClosedIcon width={20} height={20} color="#D2D2D2" />
          </button>
        ) : (
          <img className="h-[24px] w-[24px]" src={searchIcon} alt="search" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
