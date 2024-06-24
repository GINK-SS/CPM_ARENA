import { create } from 'zustand';
import { BuffStoreState } from './types';

const useBuffStore = create<BuffStoreState>((set) => ({
  currentBuff: {
    teams: [0, 0, 0, 0, 0],
    all_star: 0,
    golden_glove: 0,
    mvp: 0,
  },
  setBuff: ({ player, teamIdx, action }) => {
    if (action === 'ADD') {
      set((state) => ({
        currentBuff: {
          teams: [
            ...state.currentBuff.teams.slice(0, teamIdx),
            state.currentBuff.teams[teamIdx] + 1,
            ...state.currentBuff.teams.slice(teamIdx + 1),
          ],
          all_star: state.currentBuff.all_star + (player.all_star ? 1 : 0),
          golden_glove: state.currentBuff.golden_glove + (player.golden_glove ? 1 : 0),
          mvp: state.currentBuff.mvp + (player.mvp_korea || player.mvp_league ? 1 : 0),
        },
      }));

      return;
    }

    set((state) => ({
      currentBuff: {
        teams: [
          ...state.currentBuff.teams.slice(0, teamIdx),
          state.currentBuff.teams[teamIdx] - 1,
          ...state.currentBuff.teams.slice(teamIdx + 1),
        ],
        all_star: state.currentBuff.all_star - (player.all_star ? 1 : 0),
        golden_glove: state.currentBuff.golden_glove - (player.golden_glove ? 1 : 0),
        mvp: state.currentBuff.mvp - (player.mvp_korea || player.mvp_league ? 1 : 0),
      },
    }));
  },
  clearBuff: () => {
    set(() => ({
      currentBuff: {
        teams: [0, 0, 0, 0, 0],
        all_star: 0,
        golden_glove: 0,
        mvp: 0,
      },
    }));
  },
}));

export default useBuffStore;
