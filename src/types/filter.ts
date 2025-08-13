export type TFilterMode = '목록에서 선택' | '직접 선택';

export type TTagClickHandler = (item: string) => void;

export type TabId = 0 | 1 | 2 | 3;

export interface FilterItem {
  id: string;
  label: string;
  group?: string;
}

export interface SelectedFilter {
  key: string; // `${tabId}|${id}`
  tabId: TabId;
  item: FilterItem;
}

export interface FilterState {
  byTab: Record<TabId, SelectedFilter[]>;
}
