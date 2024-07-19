import { create } from 'zustand';
import { CommonStoreState } from './types';

const useCommonStore = create<CommonStoreState>((set) => ({
  isLoading: false,
  setIsLoading: (value) => {
    set(() => ({ isLoading: value }));
  },
}));

export default useCommonStore;
