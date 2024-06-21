import { create } from 'zustand';
import { YearStoreState } from './types';

const useYearStore = create<YearStoreState>((set) => ({
  isPopupActive: false,
  selectedYear: null,
  openPopup: () => {
    set(() => ({ isPopupActive: true }));
  },
  closePopup: () => {
    set(() => ({ isPopupActive: false }));
  },
  setYear: (newYear: number) => {
    set(() => ({ selectedYear: newYear }));
  },
}));

export default useYearStore;
