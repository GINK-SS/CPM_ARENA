import { create } from 'zustand';
import { CommonStoreState } from './types';

const useCommonStore = create<CommonStoreState>((set) => ({
  isLoading: false,
  isBuffActive: true,
  setIsLoading: (value) => {
    set(() => ({ isLoading: value }));
  },
  setIsBuffActive: () => {
    set((state) => ({ isBuffActive: !state.isBuffActive }));
  },
}));

export default useCommonStore;
