import { MAIN_TABS } from '@/constants/tab';
import { useTabContext } from './TabContext';
import TabIcon from '@/components/icons/TabIcon';
import { useRef, useEffect, useState } from 'react';

const TabNavigation = () => {
  const { activeTab, setActiveTab } = useTabContext();
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  console.log(activeTab);

  useEffect(() => {
    const activeIndex = MAIN_TABS.findIndex((tab) => tab.tabId === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
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

  const getIndicatorStyle = () => {
    return {
      width: `${indicatorStyle.width}px`,
      left: `${indicatorStyle.left}px`,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[48px] w-full items-center justify-between px-[24px]"
    >
      {MAIN_TABS.map((tab, index) => (
        <div
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          className="relative flex cursor-pointer items-center gap-[4px]"
          key={tab.tabId}
          onClick={() => setActiveTab(tab.tabId)}
        >
          <TabIcon tabId={tab.tabId} isActive={activeTab === tab.tabId} />

          <div
            className={`${activeTab === tab.tabId ? 'text-primary' : 'text-gray-2'} text-caption font-semibold`}
          >
            {tab.label}
          </div>
        </div>
      ))}
      <div
        className="bg-primary absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out"
        style={getIndicatorStyle()}
      />
    </div>
  );
};

export default TabNavigation;
