import type { TabContextValue } from '@/types/tab';
import type { TabId } from '@/types/filter';
import { createContext, useContext, useState } from 'react';

const TabContext = createContext<TabContextValue | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabId>(0);

  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
};
