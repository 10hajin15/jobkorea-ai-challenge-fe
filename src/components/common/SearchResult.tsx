import { AnimatePresence, motion } from 'framer-motion';
import { useTabContext } from '@/components/common/Tab/TabContext';
import type { TabId } from '@/types/filter';
import useFilterStore from '@/store/useFilterStore';

interface SearchResultItem {
  id: string;
  fullLabel: string;
  leafLabel: string;
}

interface SearchResultProps {
  keyword: string;
  results: SearchResultItem[];
}

const SearchResult = ({ results }: SearchResultProps) => {
  const { activeTab } = useTabContext();
  const tabId = activeTab as TabId;
  const toggle = useFilterStore((s) => s.toggle);
  const isSelectedFn = useFilterStore((s) => s.isSelected);

  return (
    <div className="border-gray-border scrollbar-hide relative h-full overflow-y-auto border-t">
      <AnimatePresence initial={false}>
        {results.map((item) => {
          const isSelected = isSelectedFn(tabId, item.id);
          return (
            <motion.label
              htmlFor={item.id}
              key={item.id}
              className="has-[:checked]:bg-primary-light-2 flex h-[50px] cursor-pointer items-center gap-[10px] px-[20px]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <input
                id={item.id}
                type="checkbox"
                className="peer sr-only"
                checked={isSelected}
                onChange={() =>
                  toggle(tabId, { id: item.id, label: item.leafLabel }, { limit: 20 })
                }
              />
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
              <div className="text-body peer-checked:text-primary peer-checked:font-semibold">
                {item.fullLabel}
              </div>
            </motion.label>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SearchResult;
