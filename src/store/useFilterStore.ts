import { create } from 'zustand';
import type { FilterItem, FilterState, SelectedFilter, TabId } from '@/types/filter';

type ToggleOptions = { limit?: number; group?: string; groupLimit?: number };

interface FilterStore extends FilterState {
  getSelectedByTab: (tabId: TabId) => SelectedFilter[];
  isSelected: (tabId: TabId, id: string) => boolean;

  toggle: (tabId: TabId, item: FilterItem, opts?: ToggleOptions) => void;
  add: (tabId: TabId, item: FilterItem, opts?: ToggleOptions) => void;
  remove: (tabId: TabId, id: string) => void;

  clearTab: (tabId: TabId) => void;
  clearAll: () => void;
}

const makeKey = (tabId: TabId, id: string) => `${tabId}|${id}`;

const initialState: FilterState = {
  byTab: {
    0: [],
    1: [],
    2: [],
    3: [],
  },
};

const useFilterStore = create<FilterStore>((set, get) => ({
  ...initialState,

  getSelectedByTab: (tabId) => get().byTab[tabId],

  isSelected: (tabId, id) => {
    const list = get().byTab[tabId];
    return list.some((f) => f.item.id === id);
  },

  add: (tabId, item, opts) => {
    set((state) => {
      const current = state.byTab[tabId];
      if (current.some((f) => f.item.id === item.id)) return state;

      if (opts?.limit !== undefined && current.length >= opts.limit) return state;

      let next = current;

      if (item.group && opts?.group && opts.groupLimit !== undefined) {
        const sameGroup = current.filter((f) => f.item.group === opts.group);
        if (opts.groupLimit === 1) {
          next = current.filter((f) => f.item.group !== opts.group);
        } else if (sameGroup.length >= opts.groupLimit) {
          return state;
        }
      }

      const newItem: SelectedFilter = { key: makeKey(tabId, item.id), tabId, item };
      return {
        byTab: { ...state.byTab, [tabId]: [...next, newItem] },
      };
    });
  },

  toggle: (tabId, item, opts) => {
    const exists = get().isSelected(tabId, item.id);
    if (exists) {
      get().remove(tabId, item.id);
    } else {
      get().add(tabId, item, opts);
    }
  },

  remove: (tabId, id) => {
    set((state) => ({
      ...state,
      byTab: { ...state.byTab, [tabId]: state.byTab[tabId].filter((f) => f.item.id !== id) },
    }));
  },

  clearTab: (tabId) => {
    set((state) => ({ ...state, byTab: { ...state.byTab, [tabId]: [] } }));
  },

  clearAll: () => set(() => ({ ...initialState })),
}));

export default useFilterStore;
