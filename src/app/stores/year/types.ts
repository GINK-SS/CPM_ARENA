export type YearStoreState = {
  isShow: boolean;
  selectedYear: number | null;
  yearList: (number | null)[];
  setShowYearList: () => void;
  setYear: (newYear: number) => void;
};
