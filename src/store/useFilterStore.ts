import { create } from 'zustand';
import type { FilterItem, FilterState, SelectedFilter, TabId } from '@/types/filter';

type ToggleOptions = { limit?: number; group?: string; groupLimit?: number };

interface FilterStore extends FilterState {
  getSelectedByTab: (tabId: TabId) => SelectedFilter[];
  isSelected: (tabId: TabId, id: string) => boolean;

  toggle: (tabId: TabId, item: FilterItem, opts?: ToggleOptions) => boolean;
  add: (tabId: TabId, item: FilterItem, opts?: ToggleOptions) => boolean;
  remove: (tabId: TabId, id: string) => void;

  clearTab: (tabId: TabId) => void;
  reset: () => void;
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

const useFilterStore = create<FilterStore>((set, get, store) => ({
  ...initialState,

  getSelectedByTab: (tabId) => get().byTab[tabId],

  isSelected: (tabId, id) => {
    const list = get().byTab[tabId];
    return list.some((f) => f.item.id === id);
  },

  add: (tabId, item, opts) => {
    const current = get().byTab[tabId];
    if (current.some((f) => f.item.id === item.id)) return false;

    if (opts?.limit !== undefined && current.length >= opts.limit) {
      return false;
    }

    let next = current;

    if (item.group && opts?.group && opts.groupLimit !== undefined) {
      const sameGroup = current.filter((f) => f.item.group === opts.group);
      if (opts.groupLimit === 1) {
        next = current.filter((f) => f.item.group !== opts.group);
      } else if (sameGroup.length >= opts.groupLimit) {
        return false;
      }
    }

    set((state) => {
      const newItem: SelectedFilter = {
        key: makeKey(tabId, item.id),
        tabId,
        item,
        addedAt: Date.now(),
      };
      return {
        byTab: { ...state.byTab, [tabId]: [...next, newItem] },
      };
    });

    return true;
  },

  toggle: (tabId, item, opts) => {
    const exists = get().isSelected(tabId, item.id);
    if (exists) {
      get().remove(tabId, item.id);
      return true;
    } else {
      return get().add(tabId, item, opts);
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

  reset: () => set(store.getInitialState()),
}));

export default useFilterStore;
