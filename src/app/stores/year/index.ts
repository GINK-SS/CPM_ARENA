import { create } from 'zustand';
import { YearStoreState } from './types';

const useYearStore = create<YearStoreState>((set) => ({
  isShow: false,
  selectedYear: null,
  yearList: [
    2020,
    2021,
    2022,
    2023,
    null,
    null,
    null,
    null,
    null,
    null,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    1990,
    1991,
    1992,
    1993,
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    null,
    null,
    1982,
    1983,
    1984,
    1985,
    1986,
    1987,
    1988,
    1989,
  ],
  setShowYearList: () => {
    set((state) => ({ isShow: !state.isShow }));
  },
  closeYearList: () => {
    set(() => ({ isShow: false }));
  },
  setYear: (newYear: number) => {
    set(() => ({ selectedYear: newYear }));
  },
}));

export default useYearStore;
