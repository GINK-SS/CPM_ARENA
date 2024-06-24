export type YearStoreState = {
  isPopupActive: boolean;
  selectedYear: number | null;
  openPopup: () => void;
  closePopup: () => void;
  setYear: (newYear: number) => void;
};
