import { MAIN_TABS } from '@/constants/tab';
import { useTabContext } from './TabContext';
import TabIcon from '@/components/icons/TabIcon';
import { useRef, useEffect, useState } from 'react';
import type { TabId } from '@/types/filter';
import { motion } from 'framer-motion';

const TabNavigation = () => {
  const { activeTab, setActiveTab } = useTabContext();
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    const container = containerRef.current;

    if (activeTabElement && container) {
      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const tabWidth = tabRect.width;
      const tabLeft = tabRect.left - containerRect.left;

      setIndicatorStyle({
        width: 74,
        left: tabLeft + (tabWidth - 74) / 2,
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="border-gray-border relative flex h-[44px] w-full items-center justify-between border-b px-[24px]"
    >
      {MAIN_TABS.map((tab, index) => (
        <motion.div
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          className="relative flex cursor-pointer items-center gap-[4px]"
          key={tab.tabId}
          onClick={() => setActiveTab(tab.tabId as TabId)}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        >
          <TabIcon tabId={tab.tabId} isActive={activeTab === tab.tabId} />
          <div
            className={`${activeTab === tab.tabId ? 'text-primary' : 'text-gray-2'} text-caption font-semibold`}
          >
            {tab.label}
          </div>
        </motion.div>
      ))}
      <motion.div
        className="bg-primary absolute bottom-[-1px] h-0.5 rounded-full"
        initial={false}
        animate={{ width: indicatorStyle.width, left: indicatorStyle.left }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default TabNavigation;
