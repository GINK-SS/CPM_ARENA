import { create } from 'zustand';
import { TableStoreState } from './types';

const useTableStore = create<TableStoreState>((set) => ({
  isShow: false,
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
  showTable: () => {
    set(() => ({ isShow: true }));
  },
  closeTable: () => {
    set(() => ({ isShow: false }));
  },
}));

export default useTableStore;
