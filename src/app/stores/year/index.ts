import { create } from 'zustand';
import { YearStoreState } from './types';

const useYearStore = create<YearStoreState>((set) => ({
  isShow: false,
  selectedYear: null,
  setShowYearList: () => {
    set((state) => ({ isShow: !state.isShow }));
  },
  closeYearList: () => {
    set(() => ({ isShow: false }));
  },
  setYear: (newYear: number) => {
    set(() => ({ selectedYear: newYear }));
  },
}));

export default useYearStore;
