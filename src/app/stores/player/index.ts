import { create } from 'zustand';

import { FIRST_YEAR } from '@/app/const';

import { Hitter, Pitcher, PlayerStoreState } from './types';

const usePlayerStore = create<PlayerStoreState>((set) => ({
  isShowDetail: false,
  allHitters: new Map(),
  allPitchers: new Map(),
  selectedPlayer: null,
  selectedLineup: [],
  setSelectedLineup: ({ player, action }) => {
    if (!player) {
      set(() => ({ selectedLineup: [] }));
    } else if (action === 'ADD') {
      set((state) => ({ selectedLineup: [...state.selectedLineup, player] }));
    } else if (action === 'DELETE') {
      set((state) => ({ selectedLineup: state.selectedLineup.filter((selected) => selected !== player) }));
    }
  },
  setSelectedPlayer: (player) => {
    set(() => ({ selectedPlayer: player }));
  },
  showDetail: () => {
    set(() => ({ isShowDetail: true }));
  },
  clearDetail: () => {
    set(() => ({ isShowDetail: false }));
  },
  fetchAllHitters: async () => {
    const hitters: Hitter[] = await fetch('/storage/hitters.json').then((res) => res.json());

    set(() => {
      const allHitters: Map<number, Hitter[]> = new Map(
        new Array(42).fill(FIRST_YEAR).map((year, idx) => [year + idx, []])
      );
      hitters.forEach((hitter) => {
        allHitters.get(hitter.year)?.push(hitter);
      });

      return { allHitters };
    });
  },
  fetchAllPitchers: async () => {
    const pitchers: Pitcher[] = await fetch('/storage/pitchers.json').then((res) => res.json());

    set(() => {
      const allPitchers: Map<number, Pitcher[]> = new Map(
        new Array(42).fill(FIRST_YEAR).map((year, idx) => [year + idx, []])
      );
      pitchers.forEach((pitcher) => {
        allPitchers.get(pitcher.year)?.push(pitcher);
      });

      return { allPitchers };
    });
  },
}));

export default usePlayerStore;
