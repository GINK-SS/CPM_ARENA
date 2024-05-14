export type TableStoreState = {
  isShow: boolean;
  overallLimit: number;
  isMenu: boolean;
  setOverallLimit: (selectedOverall: number) => void;
  openMenu: () => void;
  closeMenu: () => void;
  showTable: () => void;
  closeTable: () => void;
};
