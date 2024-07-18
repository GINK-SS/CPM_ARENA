import { create } from 'zustand';
import { TableStoreState } from './types';

const useTableStore = create<TableStoreState>((set) => ({
  isOverallFilter: false,
  isMenu: false,
  isShowHitterLineup: true,
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
