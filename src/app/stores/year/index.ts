import { create } from 'zustand';
import { YearStoreState } from './types';

const useYearStore = create<YearStoreState>((set) => ({
  selectedYear: null,
  setYear: (newYear: number) => {
    set(() => ({ selectedYear: newYear }));
  },
}));

export default useYearStore;
