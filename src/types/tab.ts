import type { TabId } from '@/types/filter';

export interface TabContextValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}
