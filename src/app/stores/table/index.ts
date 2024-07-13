import { create } from 'zustand';
import { TableStoreState } from './types';

const useTableStore = create<TableStoreState>((set) => ({
  overallLimit: 69,
  isOverallFilter: false,
  isMenu: false,
  isShowHitterLineup: true,
  setOverallLimit: (selectedOverall) => {
    set(() => ({ overallLimit: selectedOverall }));
  },
  openOverallFilter: () => {
    set(() => ({ isOverallFilter: true }));
  },
  closeOverallFilter: () => {
    set(() => ({ isOverallFilter: false }));
  },
  openMenu: () => {
    set(() => ({ isMenu: true }));
  },
  closeMenu: () => {
    set(() => ({ isMenu: false }));
  },
  toggleIsShowHitterLineup: () => {
    set((state) => ({ isShowHitterLineup: !state.isShowHitterLineup }));
  },
}));

export default useTableStore;
