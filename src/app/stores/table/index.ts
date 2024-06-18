import { create } from 'zustand';
import { TableStoreState } from './types';

const useTableStore = create<TableStoreState>((set) => ({
  overallLimit: 69,
  isMenu: false,
  setOverallLimit: (selectedOverall) => {
    set(() => ({ overallLimit: selectedOverall }));
  },
  openMenu: () => {
    set(() => ({ isMenu: true }));
  },
  closeMenu: () => {
    set(() => ({ isMenu: false }));
  },
}));

export default useTableStore;
