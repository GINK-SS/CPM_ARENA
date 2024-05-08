export type YearStoreState = {
  year: number;
  yearList: (number | null)[];
  setYear: (newYear: number) => void;
};
