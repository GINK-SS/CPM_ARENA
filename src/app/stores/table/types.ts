export type TableStoreState = {
  isOverallFilter: boolean;
  isMenu: boolean;
  isShowHitterLineup: boolean;
  openOverallFilter: () => void;
  closeOverallFilter: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleIsShowHitterLineup: () => void;
};
