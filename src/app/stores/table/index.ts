import { create } from 'zustand';
import { TableStoreState } from './types';

const useTableStore = create<TableStoreState>((set) => ({
  isShow: false,
  showTable: () => {
    set(() => ({ isShow: true }));
  },
}));

export default useTableStore;
