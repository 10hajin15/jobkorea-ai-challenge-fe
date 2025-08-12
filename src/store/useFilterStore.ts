import { create } from 'zustand';

interface FilterStore {
  filterList: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  setFilterList: (filters: string[]) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filterList: [],
  addFilter: (filter) =>
    set((state) => ({
      filterList: [...state.filterList, filter],
    })),
  removeFilter: (filter) =>
    set((state) => ({
      filterList: state.filterList.filter((f) => f !== filter),
    })),
  setFilterList: (filters) => set({ filterList: filters }),
}));

export default useFilterStore;
