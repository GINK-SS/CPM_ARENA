export type TableStoreState = {
  overallLimit: number;
  isOverallFilter: boolean;
  isMenu: boolean;
  isShowHitterLineup: boolean;
  setOverallLimit: (selectedOverall: number) => void;
  openOverallFilter: () => void;
  closeOverallFilter: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleIsShowHitterLineup: () => void;
};
