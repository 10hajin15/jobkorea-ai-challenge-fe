import type { SelectedFilter } from '@/types/filter';

interface SearchResultProps {
  keyword: string;
  filterItems: SelectedFilter[];
}

const SearchResult = ({ filterItems }: SearchResultProps) => {
  return (
    <div className="border-gray-border scrollbar-hide h-full overflow-y-auto border-t">
      {filterItems.map((filterItem) => {
        return (
          <label
            htmlFor={filterItem.item.id}
            key={filterItem.item.id}
            className="has-[:checked]:bg-primary-light-2 flex h-[50px] cursor-pointer items-center gap-[10px] px-[20px]"
          >
            <input id={filterItem.item.id} type="checkbox" className="peer sr-only" />
            <div className="border-gray-3 peer-checked:border-primary peer-checked:bg-primary flex h-[18px] w-[18px] items-center justify-center rounded border peer-checked:[&>svg]:block">
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden"
                aria-hidden
              >
                <path
                  d="M1 4.5L4.5 8L11 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-body">{filterItem.item.label}</div>
          </label>
        );
      })}
    </div>
  );
};

export default SearchResult;
