import { create } from 'zustand';
import { PlayerStoreState } from './types';

const usePlayerStore = create<PlayerStoreState>((set) => ({
  isShow: false,
  isShowDetail: false,
  allTeams: [],
  allHitters: [],
  allPitchers: [],
  selectedTeams: [],
  selectedPlayer: null,
  selectedLineUp: {
    players: [],
    count: {
      hitters: 0,
      pitchers: 0,
      teams: [0, 0, 0, 0, 0],
      all_star: 0,
      golden_glove: 0,
      mvp: 0,
    },
  },
  setSelectedLineUp: (player, action) => {
    if (!player) {
      set(() => ({
        selectedLineUp: {
          players: [],
          count: {
            hitters: 0,
            pitchers: 0,
            teams: [0, 0, 0, 0, 0],
            all_star: 0,
            golden_glove: 0,
            mvp: 0,
          },
        },
      }));

      return;
    }

    if (action === 'DELETE') {
      set((state) => ({
        selectedLineUp: {
          ...state.selectedLineUp,
          players: state.selectedLineUp.players.filter((curr) => curr !== player),
          count: {
            hitters: !!player.batting_all ? state.selectedLineUp.count.hitters - 1 : state.selectedLineUp.count.hitters,
            pitchers: !!player.pitch_all
              ? state.selectedLineUp.count.pitchers - 1
              : state.selectedLineUp.count.pitchers,
            teams: [
              ...state.selectedLineUp.count.teams.slice(0, state.selectedTeams.indexOf(player.team)),
              state.selectedLineUp.count.teams[state.selectedTeams.indexOf(player.team)] - 1,
              ...state.selectedLineUp.count.teams.slice(state.selectedTeams.indexOf(player.team) + 1),
            ],
            all_star: player.all_star ? state.selectedLineUp.count.all_star - 1 : state.selectedLineUp.count.all_star,
            golden_glove: player.golden_glove
              ? state.selectedLineUp.count.golden_glove - 1
              : state.selectedLineUp.count.golden_glove,
            mvp:
              player.mvp_korea || player.mvp_league
                ? state.selectedLineUp.count.mvp - 1
                : state.selectedLineUp.count.mvp,
          },
        },
      }));

      return;
    }
    set((state) => ({
      selectedLineUp: {
        ...state.selectedLineUp,
        players: [...state.selectedLineUp.players, player],
        count: {
          hitters: !!player.batting_all ? state.selectedLineUp.count.hitters + 1 : state.selectedLineUp.count.hitters,
          pitchers: !!player.pitch_all ? state.selectedLineUp.count.pitchers + 1 : state.selectedLineUp.count.pitchers,
          teams: [
            ...state.selectedLineUp.count.teams.slice(0, state.selectedTeams.indexOf(player.team)),
            state.selectedLineUp.count.teams[state.selectedTeams.indexOf(player.team)] + 1,
            ...state.selectedLineUp.count.teams.slice(state.selectedTeams.indexOf(player.team) + 1),
          ],
          all_star: player.all_star ? state.selectedLineUp.count.all_star + 1 : state.selectedLineUp.count.all_star,
          golden_glove: player.golden_glove
            ? state.selectedLineUp.count.golden_glove + 1
            : state.selectedLineUp.count.golden_glove,
          mvp:
            player.mvp_korea || player.mvp_league ? state.selectedLineUp.count.mvp + 1 : state.selectedLineUp.count.mvp,
        },
      },
    }));
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
  closeTeamList: () => {
    set(() => ({ isShow: false }));
  },
  setShowTeamList: () => {
    set((state) => ({ isShow: !state.isShow }));
  },
  setTeams: ({ id, index, action }) => {
    if (action === 'ADD' && index < 5) {
      set((state) => ({
        selectedTeams: [...state.selectedTeams, id],
      }));

      if (index === 4) {
        set(() => ({ isShow: false }));
      }
    } else if (action === 'DELETE') {
      set((state) => ({ selectedTeams: state.selectedTeams.filter((team) => team !== id) }));
    }
  },
  setSelectedTeamsReset: () => {
    set(() => ({ selectedTeams: [] }));
  },
  fetchAllTeams: async () => {
    set({ allTeams: await fetch('/storage/teams.json').then((res) => res.json()) });
  },
  fetchAllHitters: async () => {
    set({ allHitters: await fetch('/storage/hitters.json').then((res) => res.json()) });
  },
  fetchAllPitchers: async () => {
    set({ allPitchers: await fetch('/storage/pitchers.json').then((res) => res.json()) });
  },
}));

export default usePlayerStore;
