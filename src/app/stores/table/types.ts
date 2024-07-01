export type TableStoreState = {
  overallLimit: number;
  isMenu: boolean;
  isShowHitterLineup: boolean;
  setOverallLimit: (selectedOverall: number) => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleIsShowHitterLineup: () => void;
};
