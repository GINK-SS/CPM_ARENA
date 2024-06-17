export type TableStoreState = {
  overallLimit: number;
  isMenu: boolean;
  setOverallLimit: (selectedOverall: number) => void;
  openMenu: () => void;
  closeMenu: () => void;
};
