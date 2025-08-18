import Chip from './Chip';
import useFilterStore from '@/store/useFilterStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

const SelectedFilters = () => {
  const remove = useFilterStore((s) => s.remove);
  const byTab = useFilterStore((s) => s.byTab);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const all = useMemo(() => {
    const merged = [...byTab[0], ...byTab[1], ...byTab[2], ...byTab[3]];
    return merged.slice().sort((a, b) => (a.addedAt ?? 0) - (b.addedAt ?? 0));
  }, [byTab]);

  const prevCountRef = useRef<number>(all.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const didIncrease = prevCountRef.current < all.length;
    if (didIncrease) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
    prevCountRef.current = all.length;
  }, [all]);

  return (
    <div className="bg-gray-4 flex h-[72px] flex-col p-[10px]">
      <div
        ref={containerRef}
        className="scrollbar-hide flex flex-1 flex-wrap gap-[8px] overflow-y-auto"
      >
        <AnimatePresence initial={false}>
          {all.map((f) => (
            <motion.div
              key={f.key}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Chip label={f.item.label} onRemove={() => remove(f.tabId, f.item.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectedFilters;
