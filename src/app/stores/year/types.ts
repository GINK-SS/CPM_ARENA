export type YearStoreState = {
  isShow: boolean;
  selectedYear: number | null;
  setShowYearList: () => void;
  closeYearList: () => void;
  setYear: (newYear: number) => void;
};
